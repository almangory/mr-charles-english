import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MrCharlesAvatar } from './components/Avatar/MrCharlesAvatar';
import type { AvatarEmotion } from './components/Avatar/MrCharlesAvatar';
import { Navbar } from './components/Header/Navbar';
import { ChatBox } from './components/Dialogue/ChatBox';
import { VoiceControls } from './components/Controls/VoiceControls';
import { PronunciationChallengeCard } from './components/Challenge/PronunciationChallengeCard';
import { ScenarioSelectorModal } from './components/Scenarios/ScenarioSelectorModal';
import { SettingsModal } from './components/Settings/SettingsModal';

import { useSpeechSynthesis, useSpeechRecognition } from './services/speechEngine';
import { sounds } from './services/soundEffects';
import {
  detectPronunciationTrap,
  CONVERSATION_SCENARIOS
} from './services/pronunciationDictionary';
import type {
  PronunciationTrap,
  ScenarioTopic
} from './services/pronunciationDictionary';
import {
  calculateRank,
  generateCharlesResponse,
  triggerCelebrationConfetti
} from './services/conversationManager';
import type { Message } from './services/conversationManager';
import { askGeminiCharles } from './services/geminiService';

export const App: React.FC = () => {
  // Speech Hooks
  const {
    speak,
    stop: stopSpeaking,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice
  } = useSpeechSynthesis();

  const {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    error: speechError
  } = useSpeechRecognition();

  // App State
  const [emotion, setEmotion] = useState<AvatarEmotion>('idle');
  const [scenario, setScenario] = useState<ScenarioTopic>(CONVERSATION_SCENARIOS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTrap, setActiveTrap] = useState<PronunciationTrap | null>(null);
  const [pendingUserQuery, setPendingUserQuery] = useState<string>('');

  // Gamification Stats
  const [points, setPoints] = useState<number>(() => {
    return parseInt(localStorage.getItem('mr_charles_points') || '40', 10);
  });
  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem('mr_charles_streak') || '1', 10);
  });

  // Settings State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState(0.95);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);

  // Sync sounds singleton
  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // Persist points
  useEffect(() => {
    localStorage.setItem('mr_charles_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('mr_charles_streak', streak.toString());
  }, [streak]);

  // Initial Scenario Greeting on Mount or Switch
  const initialGreetingDone = useRef(false);
  const playGreeting = useCallback(
    (sc: ScenarioTopic) => {
      setMessages([
        {
          id: 'initial-' + Date.now(),
          sender: 'charles',
          text: sc.initialGreeting,
          arabicTranslation: 'مستر تشارلز يرحب بك في هذا السيناريو! تحدث معه بالإنجليزية أو اختر أحد المقترحات أدناه.',
          timestamp: new Date()
        }
      ]);
      setEmotion('speaking');
      speak(sc.initialGreeting, {
        rate: speechRate,
        onEnd: () => setEmotion('idle')
      });
    },
    [speak, speechRate]
  );

  useEffect(() => {
    if (!initialGreetingDone.current) {
      initialGreetingDone.current = true;
      playGreeting(scenario);
    }
  }, [scenario, playGreeting]);

  // When speech recognition ends with transcript, process it
  useEffect(() => {
    if (!isListening && transcript.trim().length > 0) {
      const captured = transcript.trim();
      setTranscript('');
      handleUserSpeech(captured);
    }
  }, [isListening, transcript]);

  // When user is listening, update avatar
  useEffect(() => {
    if (isListening) {
      setEmotion('listening');
    } else if (!isSpeaking && !activeTrap) {
      setEmotion('idle');
    }
  }, [isListening, isSpeaking, activeTrap]);

  // Handle User Input (from Speech OR Typing)
  const handleUserSpeech = async (userText: string) => {
    if (!userText.trim()) return;

    stopSpeaking();

    // 1. Append User Message
    const userMsg: Message = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);

    setEmotion('thinking');

    // 2. CHECK IF CURRENTLY IN CHALLENGE MODE
    if (activeTrap) {
      const cleanUser = userText.toLowerCase();
      const targetClean = activeTrap.word.toLowerCase();

      // Check if user spoke the corrected word
      const isCorrect =
        cleanUser.includes(targetClean) ||
        cleanUser.includes(targetClean.replace('-', ' ')) ||
        (cleanUser.length < 25 && targetClean.includes(cleanUser));

      if (isCorrect) {
        // VICTORY! Correct pronunciation achieved!
        sounds.playBellDing();
        sounds.playFanfare();
        triggerCelebrationConfetti();

        setEmotion('proud');
        setPoints((p) => p + 50);
        setStreak((s) => s + 1);

        const currentPending = pendingUserQuery;
        const currentTrap = activeTrap;
        setActiveTrap(null);
        setPendingUserQuery('');

        // Charles congratulates and answers the previous query
        const followUp = currentPending
          ? ` Splendid! Now, regarding your question about "${currentPending}": `
          : ' ';
        const successSpeech = currentTrap.successQuote + followUp;

        let finalReply = successSpeech;
        if (currentPending) {
          const answer = generateCharlesResponse(currentPending, scenario);
          finalReply += answer.replyText;
        }

        const charlesSuccessMsg: Message = {
          id: 'charles-' + Date.now(),
          sender: 'charles',
          text: finalReply,
          arabicTranslation: 'رائع جداً! لقد نطقت الكلمة بشكل مثالي، وها هو مستر تشارلز يجيب عن سؤالك الأصلي!',
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, charlesSuccessMsg]);

        speak(finalReply, {
          rate: speechRate,
          onStart: () => setEmotion('proud'),
          onEnd: () => setEmotion('idle')
        });
        return;
      } else {
        // FAILED RETRY
        sounds.playDramaticFail();
        setEmotion('laughing');

        const retrySpeech = `Confound it, not quite! You must pronounce it as: ${activeTrap.word}! Listen carefully: ${activeTrap.phonetic}. Once more, with gusto!`;
        const charlesRetryMsg: Message = {
          id: 'charles-' + Date.now(),
          sender: 'charles',
          text: retrySpeech,
          arabicTranslation: `لم تضبطها تماماً بعد! تذكر: النطق هو ${activeTrap.arabicHint}. كررها ثانية!`,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, charlesRetryMsg]);

        speak(retrySpeech, {
          rate: speechRate,
          onStart: () => setEmotion('laughing'),
          onEnd: () => setEmotion('angry')
        });
        return;
      }
    }

    // 3. NORMAL CONVERSATION MODE: CHECK FOR PRONUNCIATION TRAP
    const detectedTrap = detectPronunciationTrap(userText);

    if (detectedTrap) {
      // TRAP TRIGGERED! Enter dramatic comic rage
      sounds.playSteamWhistle();
      sounds.playMonoclePop();

      setActiveTrap(detectedTrap);
      setPendingUserQuery(userText);
      setEmotion('angry');

      const scoldingText = `${detectedTrap.angryQuote} You must now pronounce the word "${detectedTrap.word}" correctly before we proceed!`;

      const charlesAngryMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: scoldingText,
        isCorrectionNotice: true,
        arabicTranslation: `صدمة درامية لمستر تشارلز! لقد وقعت في فخ كلمة: ${detectedTrap.word}. انظر بطاقة التحدي بالأسفل لتصحيحها فوراً!`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesAngryMsg]);

      speak(scoldingText, {
        rate: speechRate,
        onStart: () => setEmotion('angry'),
        onEnd: () => setEmotion('angry') // stay visibly outraged until corrected
      });
      return;
    }

    // 4. CLEAN PRONUNCIATION: REWARD & ANSWER
    sounds.playBellDing();
    setPoints((p) => p + 15);

    try {
      let replyText = '';
      let replyEmotion: AvatarEmotion = 'proud';

      if (apiKey.trim()) {
        // Query Gemini API
        const geminiResult = await askGeminiCharles(
          apiKey,
          userText,
          messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: m.text
          }))
        );
        replyText = geminiResult.reply;
        replyEmotion = geminiResult.emotion;
      } else {
        // Scenario response
        const fallback = generateCharlesResponse(userText, scenario);
        replyText = fallback.replyText;
        replyEmotion = fallback.emotion;
      }

      const charlesReplyMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: replyText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesReplyMsg]);

      setEmotion(replyEmotion);
      speak(replyText, {
        rate: speechRate,
        onStart: () => setEmotion(replyEmotion),
        onEnd: () => setEmotion('idle')
      });
    } catch {
      // In case of any API error, fallback to scenario engine
      const fallback = generateCharlesResponse(userText, scenario);
      setEmotion(fallback.emotion);
      const charlesReplyMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: fallback.replyText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesReplyMsg]);
      speak(fallback.replyText, {
        rate: speechRate,
        onEnd: () => setEmotion('idle')
      });
    }
  };

  const handleSelectScenario = (sc: ScenarioTopic) => {
    setScenario(sc);
    setActiveTrap(null);
    setPendingUserQuery('');
    playGreeting(sc);
  };

  const handleListenSample = (sampleText: string) => {
    speak(sampleText, { rate: 0.85 });
  };

  const handleResetStats = () => {
    setPoints(0);
    setStreak(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070D1E] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* 1. Header Navbar */}
      <Navbar
        points={points}
        streak={streak}
        rankTitle={calculateRank(points)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenScenarios={() => setShowScenarioModal(true)}
        currentScenarioTitle={scenario.title}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col items-center justify-between gap-4">
        {/* Error notification if mic blocked */}
        {speechError && (
          <div className="w-full max-w-lg bg-rose-950/80 border border-rose-500/60 rounded-xl px-4 py-2.5 text-xs text-rose-200 text-center shadow-lg">
            ⚠️ {speechError}
          </div>
        )}

        {/* 2. Avatar Presentation Stage */}
        <div className="flex flex-col items-center justify-center relative w-full pt-1 pb-2">
          {/* Avatar Emotion Indicator Tag */}
          <div className="mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-md ${
                emotion === 'angry'
                  ? 'bg-rose-600/90 text-white animate-bounce'
                  : emotion === 'laughing'
                  ? 'bg-amber-500 text-slate-950'
                  : emotion === 'proud'
                  ? 'bg-emerald-500 text-slate-950'
                  : emotion === 'listening'
                  ? 'bg-indigo-500 text-white animate-pulse'
                  : emotion === 'thinking'
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-amber-400 border border-amber-500/30'
              }`}
            >
              {emotion === 'angry' && '🤬 غضب درامي كرتوني (نطق خاطئ!)'}
              {emotion === 'laughing' && '😂 قهقهة أرستقراطية مرحة!'}
              {emotion === 'proud' && '🎩 فخور جداً بنطقك السليم!'}
              {emotion === 'listening' && '👂 مستر تشارلز يصغي إليك...'}
              {emotion === 'thinking' && '🧐 يفكر في الإجابة...'}
              {emotion === 'speaking' && '🗣️ مستر تشارلز يتحدث الآن'}
              {emotion === 'idle' && '☕ مستر تشارلز في انتظارك'}
            </span>
          </div>

          {/* SVG Character */}
          <MrCharlesAvatar
            emotion={emotion}
            isSpeaking={isSpeaking}
            isListening={isListening}
            size="lg"
          />
        </div>

        {/* 3. Challenge Mode Active Notice OR Chat History */}
        <div className="w-full max-w-2xl flex-1 flex flex-col justify-center">
          {activeTrap ? (
            <PronunciationChallengeCard
              trap={activeTrap}
              onListenSample={handleListenSample}
              onRetry={() => startListening()}
            />
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-2 sm:p-4 shadow-xl backdrop-blur-sm flex flex-col">
              <ChatBox
                messages={messages}
                isListening={isListening}
                interimTranscript={transcript}
                onReplaySpeech={(txt) => speak(txt, { rate: speechRate })}
              />
            </div>
          )}
        </div>

        {/* 4. Controls Section */}
        <div className="w-full">
          <VoiceControls
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            onSendTextMessage={handleUserSpeech}
            suggestedPrompts={scenario.suggestedPrompts}
            disabled={isSpeaking}
          />
        </div>
      </main>

      {/* Modals */}
      <ScenarioSelectorModal
        isOpen={showScenarioModal}
        onClose={() => setShowScenarioModal(false)}
        selectedScenarioId={scenario.id}
        onSelectScenario={handleSelectScenario}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        apiKey={apiKey}
        onSaveApiKey={(key) => {
          setApiKey(key);
          localStorage.setItem('gemini_api_key', key);
        }}
        voices={voices}
        selectedVoice={selectedVoice}
        onSelectVoice={setSelectedVoice}
        speechRate={speechRate}
        onSelectRate={setSpeechRate}
        onResetStats={handleResetStats}
      />
    </div>
  );
};

export default App;
