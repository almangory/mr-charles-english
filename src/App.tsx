import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MrCharlesAvatar } from './components/Avatar/MrCharlesAvatar';
import type { AvatarEmotion } from './components/Avatar/MrCharlesAvatar';
import { Navbar } from './components/Header/Navbar';
import { ChatBox } from './components/Dialogue/ChatBox';
import { VoiceControls } from './components/Controls/VoiceControls';
import { PronunciationChallengeCard } from './components/Challenge/PronunciationChallengeCard';
import { ScenarioSelectorModal } from './components/Scenarios/ScenarioSelectorModal';
import { SettingsModal } from './components/Settings/SettingsModal';
import { Volume2, Radio, Play } from 'lucide-react';

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
    setSelectedVoice,
    unlockAudio,
    isUnlocked
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
  const [lastCharlesSpeech, setLastCharlesSpeech] = useState<string>('');

  // Live Mode: Direct continuous hands-free dialogue!
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true);

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

  // Initial Scenario Greeting
  const playGreeting = useCallback(
    (sc: ScenarioTopic, shouldSpeakAloud: boolean = false) => {
      const greetingMsg: Message = {
        id: 'initial-' + Date.now(),
        sender: 'charles',
        text: sc.initialGreeting,
        arabicTranslation: 'مستر منقوري يرحب بك! تحدث معه بالإنجليزية وسيرد عليك بصوته مباشرة.',
        timestamp: new Date()
      };
      setMessages([greetingMsg]);
      setLastCharlesSpeech(sc.initialGreeting);

      if (shouldSpeakAloud) {
        setEmotion('speaking');
        speak(sc.initialGreeting, {
          rate: speechRate,
          onStart: () => setEmotion('speaking'),
          onEnd: () => {
            setEmotion('idle');
            // If in Live Mode, turn on mic automatically after greeting!
            if (isLiveMode) {
              setTimeout(() => {
                sounds.playClick();
                startListening();
              }, 400);
            }
          }
        });
      }
    },
    [speak, speechRate, isLiveMode, startListening]
  );

  // On first load, display the message
  const initialGreetingDone = useRef(false);
  useEffect(() => {
    if (!initialGreetingDone.current) {
      initialGreetingDone.current = true;
      playGreeting(scenario, false);
    }
  }, [scenario, playGreeting]);

  // Handle Turn-taking: When user speech recognition finishes, process it
  useEffect(() => {
    if (!isListening && transcript.trim().length > 0) {
      const captured = transcript.trim();
      setTranscript('');
      handleUserSpeech(captured);
    }
  }, [isListening, transcript]);

  // Sync avatar posture with listening state
  useEffect(() => {
    if (isListening) {
      setEmotion('listening');
    } else if (!isSpeaking && !activeTrap) {
      setEmotion('idle');
    }
  }, [isListening, isSpeaking, activeTrap]);

  // Helper to execute Charles speaking and trigger auto-listening turn
  const speakCharles = useCallback(
    (textToSpeak: string, targetEmotion: AvatarEmotion = 'speaking') => {
      unlockAudio();
      stopListening(); // Mute mic while Charles speaks to avoid hearing himself
      setLastCharlesSpeech(textToSpeak);

      speak(textToSpeak, {
        rate: speechRate,
        onStart: () => setEmotion(targetEmotion),
        onEnd: () => {
          setEmotion('idle');
          // If in Live Mode, automatically activate the mic for the user's turn!
          if (isLiveMode) {
            setTimeout(() => {
              sounds.playClick();
              startListening();
            }, 500);
          }
        }
      });
    },
    [speak, speechRate, isLiveMode, startListening, stopListening, unlockAudio]
  );

  // Manual Trigger to Start Live Voice Conversation
  const handleStartLiveConversation = () => {
    unlockAudio();
    sounds.playClick();
    speakCharles(scenario.initialGreeting, 'speaking');
  };

  // Handle User Input (Speech or Text)
  const handleUserSpeech = async (userText: string) => {
    if (!userText.trim()) return;

    stopSpeaking();
    unlockAudio();

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

      const isCorrect =
        cleanUser.includes(targetClean) ||
        cleanUser.includes(targetClean.replace('-', ' ')) ||
        (cleanUser.length < 25 && targetClean.includes(cleanUser));

      if (isCorrect) {
        // VICTORY! Correct pronunciation achieved!
        sounds.playBellDing();
        sounds.playFanfare();
        triggerCelebrationConfetti();

        setPoints((p) => p + 50);
        setStreak((s) => s + 1);

        const currentPending = pendingUserQuery;
        const currentTrap = activeTrap;
        setActiveTrap(null);
        setPendingUserQuery('');

        const followUp = currentPending
          ? ` Splendid! Now, regarding your question about "${currentPending}": `
          : ' ';
        let finalReply = currentTrap.successQuote + followUp;

        if (currentPending) {
          const answer = generateCharlesResponse(currentPending, scenario);
          finalReply += answer.replyText;
        }

        const charlesSuccessMsg: Message = {
          id: 'charles-' + Date.now(),
          sender: 'charles',
          text: finalReply,
          arabicTranslation: 'رائع جداً! لقد نطقت الكلمة بشكل مثالي، وها هو مستر منقوري يجيب عن سؤالك الأصلي!',
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, charlesSuccessMsg]);

        // Charles speaks aloud!
        speakCharles(finalReply, 'proud');
        return;
      } else {
        // FAILED RETRY
        sounds.playDramaticFail();

        const retrySpeech = `Confound it, not quite! You must pronounce it as: ${activeTrap.word}! Listen carefully: ${activeTrap.phonetic}. Once more, with gusto!`;
        const charlesRetryMsg: Message = {
          id: 'charles-' + Date.now(),
          sender: 'charles',
          text: retrySpeech,
          arabicTranslation: `لم تضبطها تماماً بعد! تذكر: النطق هو ${activeTrap.arabicHint}. كررها ثانية!`,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, charlesRetryMsg]);

        speakCharles(retrySpeech, 'laughing');
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

      const scoldingText = `${detectedTrap.angryQuote} You must now pronounce the word "${detectedTrap.word}" correctly before we proceed!`;

      const charlesAngryMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: scoldingText,
        isCorrectionNotice: true,
        arabicTranslation: `صدمة درامية لمستر منقوري! لقد وقعت في فخ كلمة: ${detectedTrap.word}. انظر بطاقة التحدي بالأسفل لتصحيحها فوراً!`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesAngryMsg]);

      // Speak scolding aloud with angry emotion!
      speakCharles(scoldingText, 'angry');
      return;
    }

    // 4. CLEAN PRONUNCIATION: REWARD & ANSWER ALOUD
    sounds.playBellDing();
    setPoints((p) => p + 15);

    try {
      let replyText = '';
      let replyEmotion: AvatarEmotion = 'proud';

      if (apiKey.trim()) {
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

      // Speak reply aloud!
      speakCharles(replyText, replyEmotion);
    } catch {
      const fallback = generateCharlesResponse(userText, scenario);
      const charlesReplyMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: fallback.replyText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesReplyMsg]);
      speakCharles(fallback.replyText, fallback.emotion);
    }
  };

  const handleSelectScenario = (sc: ScenarioTopic) => {
    setScenario(sc);
    setActiveTrap(null);
    setPendingUserQuery('');
    playGreeting(sc, isUnlocked);
  };

  const handleListenSample = (sampleText: string) => {
    unlockAudio();
    speak(sampleText, { rate: 0.85 });
  };

  const handleResetStats = () => {
    setPoints(0);
    setStreak(0);
  };

  const handleTestVoice = () => {
    unlockAudio();
    speak("Jolly good! My voice is crystal clear and at your noble service! Let us speak the King's English!", {
      rate: speechRate,
      onStart: () => setEmotion('speaking'),
      onEnd: () => setEmotion('proud')
    });
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
        isLiveMode={isLiveMode}
        onToggleLiveMode={() => {
          setIsLiveMode(!isLiveMode);
          if (!isLiveMode && !isListening && !isSpeaking) {
            startListening();
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col items-center justify-between gap-4">
        {/* Error notification if mic blocked */}
        {speechError && (
          <div className="w-full max-w-lg bg-rose-950/80 border border-rose-500/60 rounded-xl px-4 py-2.5 text-xs text-rose-200 text-center shadow-lg">
            ⚠️ {speechError}
          </div>
        )}

        {/* 2. Direct Live Audio Activation Banner (If not yet activated) */}
        {!isUnlocked && (
          <div className="w-full max-w-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-slate-950 rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl">🎙️</span>
              <div>
                <h3 className="font-bold text-xs sm:text-sm">
                  المحادثة المباشرة مع مستر منقوري جاهزة!
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-900 font-medium">
                  اضغط لبدء الصوت المباشر وسينطق مستر منقوري بصوته فوراً
                </p>
              </div>
            </div>
            <button
              onClick={handleStartLiveConversation}
              className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current text-amber-400" />
              <span>ابدأ التحدث حياً</span>
            </button>
          </div>
        )}

        {/* 3. Avatar Presentation Stage */}
        <div className="flex flex-col items-center justify-center relative w-full pt-1 pb-1">
          {/* Avatar Emotion & Audio Indicator Tag */}
          <div className="mb-2 flex items-center gap-2">
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
                  : emotion === 'speaking'
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                  : 'bg-slate-800 text-amber-400 border border-amber-500/30'
              }`}
            >
              {emotion === 'angry' && '🤬 غضب درامي كرتوني (نطق خاطئ!)'}
              {emotion === 'laughing' && '😂 قهقهة أرستقراطية مرحة!'}
              {emotion === 'proud' && '🎩 فخور جداً بنطقك السليم!'}
              {emotion === 'listening' && '👂 مستر منقوري يستمع لك الآن (تحدث بالإنجليزية)...'}
              {emotion === 'thinking' && '🧐 يفكر في الإجابة...'}
              {emotion === 'speaking' && '🗣️ مستر منقوري ينطق بصوته الآن!'}
              {emotion === 'idle' && '☕ مستر منقوري في انتظارك'}
            </span>

            {/* Live Audio Waves when Speaking */}
            {isSpeaking && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/40">
                <span className="inline-block w-1.5 h-3 bg-amber-400 animate-bounce"></span>
                <span className="inline-block w-1.5 h-4 bg-amber-400 animate-bounce [animation-delay:0.15s]"></span>
                <span className="inline-block w-1.5 h-2 bg-amber-400 animate-bounce [animation-delay:0.3s]"></span>
                <span className="inline-block w-1.5 h-4 bg-amber-400 animate-bounce [animation-delay:0.1s]"></span>
                <span>صوت حي</span>
              </span>
            )}
          </div>

          {/* SVG Character (Clickable to Re-hear Speech) */}
          <div
            onClick={() => {
              if (lastCharlesSpeech) {
                speakCharles(lastCharlesSpeech, emotion);
              }
            }}
            title="اضغط على مستر منقوري لإعادة سماع كلامه بصوته"
            className="cursor-pointer group"
          >
            <MrCharlesAvatar
              emotion={emotion}
              isSpeaking={isSpeaking}
              isListening={isListening}
              size="lg"
            />
          </div>

          {/* Quick Repeat Button under Avatar */}
          {lastCharlesSpeech && (
            <button
              onClick={() => speakCharles(lastCharlesSpeech, emotion)}
              className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-amber-300/90 hover:text-amber-200 text-xs font-semibold border border-amber-500/30 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>أعد سماع كلام مستر منقوري بصوته</span>
            </button>
          )}
        </div>

        {/* 4. Challenge Mode Active Notice OR Chat History */}
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
                onReplaySpeech={(txt) => speakCharles(txt, 'speaking')}
              />
            </div>
          )}
        </div>

        {/* 5. Controls Section */}
        <div className="w-full">
          {/* Hands-Free Notice */}
          {isLiveMode && !activeTrap && (
            <div className="text-center mb-1 text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>وضع التحدث التلقائي المباشر مفعل: تحدث وسيرد مستر تشارلز بصوته، ثم يستمع لك تلقائياً!</span>
            </div>
          )}

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
        onTestVoice={handleTestVoice}
      />
    </div>
  );
};

export default App;
