import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MrCharlesAvatar } from './components/Avatar/MrCharlesAvatar';
import type { AvatarEmotion } from './components/Avatar/MrCharlesAvatar';
import { Navbar } from './components/Header/Navbar';
import { ChatBox } from './components/Dialogue/ChatBox';
import { WordTranslationModal } from './components/Dialogue/WordTranslationModal';
import { VoiceControls } from './components/Controls/VoiceControls';
import { PronunciationChallengeCard } from './components/Challenge/PronunciationChallengeCard';
import { ScenarioSelectorModal } from './components/Scenarios/ScenarioSelectorModal';
import { SettingsModal } from './components/Settings/SettingsModal';
import { LevelAndTrackModal } from './components/Levels/LevelAndTrackModal';
import { Volume2, Radio, Play, MessageSquare, UserCheck, Languages } from 'lucide-react';

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
import {
  getLevelById,
  getDomainById
} from './services/levelsAndTracks';
import type {
  SpeakingLevel,
  CareerDomain
} from './services/levelsAndTracks';
import { lookupWord } from './services/dictionaryService';
import type { WordDefinition } from './services/dictionaryService';

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

  // Levels (1 to 12) & Career Domain State
  const [currentLevel, setCurrentLevel] = useState<SpeakingLevel>(() => {
    const savedLevelId = parseInt(localStorage.getItem('mr_mangory_level_id') || '1', 10);
    return getLevelById(savedLevelId);
  });

  const [currentDomain, setCurrentDomain] = useState<CareerDomain>(() => {
    const savedDomainId = localStorage.getItem('mr_mangory_domain_id') || 'general';
    return getDomainById(savedDomainId);
  });

  const [showLevelModal, setShowLevelModal] = useState(false);

  // App General State
  const [emotion, setEmotion] = useState<AvatarEmotion>('idle');
  const [scenario, setScenario] = useState<ScenarioTopic>(CONVERSATION_SCENARIOS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTrap, setActiveTrap] = useState<PronunciationTrap | null>(null);
  const [pendingUserQuery, setPendingUserQuery] = useState<string>('');
  const [lastCharlesSpeech, setLastCharlesSpeech] = useState<string>('');

  // Mobile Parallel Layout State ('avatar' | 'chat')
  const [mobileTab, setMobileTab] = useState<'avatar' | 'chat'>('avatar');

  // Word Translation Popover State (Tap-to-Translate)
  const [selectedWordDef, setSelectedWordDef] = useState<WordDefinition | null>(null);
  const [showWordModal, setShowWordModal] = useState<boolean>(false);

  // Live Mode: Direct continuous hands-free dialogue!
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true);

  // Gamification Stats
  const [points, setPoints] = useState<number>(() => {
    return parseInt(localStorage.getItem('mr_charles_points') || '40', 10);
  });
  const [streak, setStreak] = useState<number>(() => {
    return parseInt(localStorage.getItem('mr_charles_streak') || '1', 10);
  });

  // Settings State - Speed automatically adapts to Level's targetPacing!
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [speechRate, setSpeechRate] = useState(() => currentLevel.targetPacing);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showScenarioModal, setShowScenarioModal] = useState(false);

  // Sync sounds singleton
  useEffect(() => {
    sounds.enabled = soundEnabled;
  }, [soundEnabled]);

  // Persist levels & domains
  useEffect(() => {
    localStorage.setItem('mr_mangory_level_id', currentLevel.id.toString());
    setSpeechRate(currentLevel.targetPacing);
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem('mr_mangory_domain_id', currentDomain.id);
  }, [currentDomain]);

  // Persist points & streak
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
        text: currentLevel.initialGreeting || sc.initialGreeting,
        arabicTranslation: `مستر منقوري جاهز لمستوى (${currentLevel.id}: ${currentLevel.titleAr}) في مجال (${currentDomain.nameAr}).`,
        timestamp: new Date()
      };
      setMessages([greetingMsg]);
      setLastCharlesSpeech(greetingMsg.text);

      if (shouldSpeakAloud) {
        setEmotion('speaking');
        speak(greetingMsg.text, {
          rate: speechRate,
          onStart: () => setEmotion('speaking'),
          onEnd: () => {
            setEmotion('idle');
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
    [speak, speechRate, isLiveMode, startListening, currentLevel, currentDomain]
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
    speakCharles(currentLevel.initialGreeting || scenario.initialGreeting, 'speaking');
  };

  // Word Translation Click Handler
  const handleSelectWord = (def: WordDefinition) => {
    setSelectedWordDef(def);
    setShowWordModal(true);
  };

  // Single word audio pronunciation (slow / normal)
  const handleSpeakSingleWord = (word: string, rate: number = 0.72) => {
    unlockAudio();
    speak(word, { rate });
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
        let finalArabic = 'رائع جداً! لقد نطقت الكلمة بشكل مثالي، وها هو مستر منقوري يجيب عن سؤالك الأصلي!';

        if (currentPending) {
          const answer = generateCharlesResponse(
            currentPending,
            scenario,
            currentLevel.id,
            currentDomain.id
          );
          finalReply += answer.replyText;
          finalArabic += ` (${answer.arabicTranslation})`;
        }

        const charlesSuccessMsg: Message = {
          id: 'charles-' + Date.now(),
          sender: 'charles',
          text: finalReply,
          arabicTranslation: finalArabic,
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
      // TRAP TRIGGERED!
      sounds.playSteamWhistle();
      sounds.playMonoclePop();

      setActiveTrap(detectedTrap);
      setPendingUserQuery(userText);

      // On mobile, automatically show the challenge if user is on avatar tab
      if (mobileTab === 'avatar') {
        setMobileTab('chat');
      }

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

      speakCharles(scoldingText, 'angry');
      return;
    }

    // 4. CLEAN PRONUNCIATION: REWARD & ANSWER ALOUD ACCORDING TO LEVEL & DOMAIN
    sounds.playBellDing();
    setPoints((p) => p + 15);

    try {
      let replyText = '';
      let replyArabic = '';
      let replyEmotion: AvatarEmotion = 'proud';

      if (apiKey.trim()) {
        const geminiResult = await askGeminiCharles(
          apiKey,
          userText,
          messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: m.text
          })),
          currentLevel.id,
          currentDomain.id
        );
        replyText = geminiResult.reply;
        replyArabic = geminiResult.arabicTranslation || '';
        replyEmotion = geminiResult.emotion;
      } else {
        const fallback = generateCharlesResponse(
          userText,
          scenario,
          currentLevel.id,
          currentDomain.id
        );
        replyText = fallback.replyText;
        replyArabic = fallback.arabicTranslation;
        replyEmotion = fallback.emotion;
      }

      const charlesReplyMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: replyText,
        arabicTranslation: replyArabic,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesReplyMsg]);

      // Speak reply aloud!
      speakCharles(replyText, replyEmotion);
    } catch {
      const fallback = generateCharlesResponse(
        userText,
        scenario,
        currentLevel.id,
        currentDomain.id
      );
      const charlesReplyMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: fallback.replyText,
        arabicTranslation: fallback.arabicTranslation,
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

  const handleSelectLevel = (lvl: SpeakingLevel) => {
    setCurrentLevel(lvl);
    setActiveTrap(null);
    setPendingUserQuery('');
    setSpeechRate(lvl.targetPacing);

    const levelGreetingMsg: Message = {
      id: 'lvl-switch-' + Date.now(),
      sender: 'charles',
      text: lvl.initialGreeting,
      arabicTranslation: `تم التبديل بنجاح إلى (${lvl.titleAr})! سرعة النطق تم ضبطها تلقائياً على ${lvl.targetPacing}x.`,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, levelGreetingMsg]);
    if (isUnlocked) {
      speakCharles(lvl.initialGreeting, 'proud');
    }
  };

  const handleSelectDomain = (dom: CareerDomain) => {
    setCurrentDomain(dom);
    const domainMsg: Message = {
      id: 'dom-switch-' + Date.now(),
      sender: 'charles',
      text: `Splendid! We have tuned our discourse to ${dom.nameEn}. Let us discuss ${dom.keywords.slice(0, 3).join(', ')} with professional distinction!`,
      arabicTranslation: `تم اعتماد تخصص: (${dom.nameAr})! سيوظف مستر منقوري مصطلحات ومقابلات هذا المجال.`,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, domainMsg]);
    if (isUnlocked) {
      speakCharles(domainMsg.text, 'proud');
    }
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

  // Dynamic suggested prompts: combine level starters and career domain starters!
  const dynamicPrompts = [
    ...currentLevel.starterPrompts.slice(0, 3),
    ...currentDomain.samplePrompts.slice(0, 2)
  ];

  // Latest message from Charles for quick preview in Mobile Avatar mode
  const latestCharlesMsg = [...messages].reverse().find((m) => m.sender === 'charles');

  return (
    <div className="flex flex-col min-h-screen bg-[#070D1E] text-slate-100 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden">
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
        currentLevelId={currentLevel.id}
        currentLevelTitle={currentLevel.titleAr}
        currentDomainIcon={currentDomain.icon}
        currentDomainName={currentDomain.nameAr}
        onOpenLevels={() => setShowLevelModal(true)}
      />

      {/* 2. Mobile View Switcher (Parallel Layout for Mobile Phones < md) */}
      <div className="md:hidden sticky top-14 z-20 bg-[#070D1E]/95 backdrop-blur-md px-3 pt-2 pb-1 border-b border-slate-800">
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              sounds.playClick();
              setMobileTab('avatar');
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mobileTab === 'avatar'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>الأفاتار المباشر</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setMobileTab('chat');
            }}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
              mobileTab === 'chat'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>الدردشة والترجمة</span>
            {activeTrap && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute top-1.5 right-2" />
            )}
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-amber-300">
              {messages.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col items-center justify-between gap-3 sm:gap-4 pb-36 md:pb-6">
        {/* Error notification if mic blocked */}
        {speechError && (
          <div className="w-full max-w-lg bg-rose-950/80 border border-rose-500/60 rounded-xl px-4 py-2.5 text-xs text-rose-200 text-center shadow-lg">
            ⚠️ {speechError}
          </div>
        )}

        {/* Direct Live Audio Activation Banner (If not yet activated) */}
        {!isUnlocked && (
          <div className="w-full max-w-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-slate-950 rounded-2xl p-3 sm:p-4 shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl">🎙️</span>
              <div>
                <h3 className="font-bold text-xs sm:text-sm">
                  المحادثة المباشرة مع مستر منقوري جاهزة!
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-900 font-medium">
                  المستوى الحالي: {currentLevel.titleAr} • {currentDomain.nameAr}
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

        {/* ============================================================== */}
        {/* VIEW 1: AVATAR STAGE (Always visible on Desktop, Tabbed on Mobile) */}
        {/* ============================================================== */}
        <div
          className={`flex-col items-center justify-center relative w-full pt-1 pb-1 ${
            mobileTab === 'avatar' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Avatar Emotion & Audio Indicator Tag */}
          <div className="mb-2 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {/* Level & Domain badge */}
            <button
              onClick={() => setShowLevelModal(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800/90 text-amber-300 border border-amber-500/40 hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
            >
              <span>{currentDomain.icon}</span>
              <span>{currentLevel.stageAr.split(' ')[0]} (مستوى {currentLevel.id})</span>
              <span className="text-slate-400">⚡</span>
            </button>

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
              <span>أعد سماع كلام مستر منقوري بصوته ({speechRate}x)</span>
            </button>
          )}

          {/* MOBILE ONLY: Floating live subtitle speech card with clickable words */}
          {latestCharlesMsg && (
            <div className="md:hidden w-full max-w-md mt-3 px-1">
              <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3 shadow-lg">
                <div className="flex items-center justify-between text-[11px] text-amber-400/90 font-semibold mb-1">
                  <span>آخر ما قاله مستر منقوري:</span>
                  <button
                    onClick={() => setMobileTab('chat')}
                    className="text-[10px] text-indigo-300 underline"
                  >
                    عرض المحادثة كاملة 💬
                  </button>
                </div>
                <div className="text-xs font-english leading-relaxed text-slate-100">
                  {latestCharlesMsg.text.split(/(\s+|[.,!?;:"()]+)/).map((tok, idx) => {
                    const isWord = /[a-zA-Z]/.test(tok);
                    if (!isWord) return <span key={idx}>{tok}</span>;
                    return (
                      <span
                        key={idx}
                        onClick={() => {
                          sounds.playClick();
                          const def = lookupWord(tok);
                          if (def) handleSelectWord(def);
                        }}
                        className="inline-block cursor-pointer px-0.5 rounded text-amber-200 hover:text-amber-400 underline decoration-dotted decoration-amber-500/50"
                      >
                        {tok}
                      </span>
                    );
                  })}
                </div>
                {latestCharlesMsg.arabicTranslation && (
                  <div className="mt-2 pt-1.5 border-t border-slate-800 text-[11px] text-amber-300/90 flex items-start gap-1">
                    <Languages className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span>{latestCharlesMsg.arabicTranslation}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* VIEW 2: CHAT BOX & CHALLENGE (Always visible on Desktop, Tabbed on Mobile) */}
        {/* ============================================================== */}
        <div
          className={`w-full max-w-2xl flex-1 flex-col justify-center ${
            mobileTab === 'chat' ? 'flex' : 'hidden md:flex'
          }`}
        >
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
                onSelectWord={handleSelectWord}
              />
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* 5. CONTROLS SECTION (Fixed Dock on Mobile, Embedded on Desktop) */}
        {/* ============================================================== */}
        <div className="fixed md:static bottom-0 left-0 right-0 z-30 bg-[#070D1E]/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t md:border-t-0 border-slate-800/80 px-2 sm:px-4 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] w-full">
          {/* Hands-Free Live Notice */}
          {isLiveMode && !activeTrap && (
            <div className="text-center mb-1 text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>
                المحادثة المباشرة مفعلة لمستوى {currentLevel.id}: تحدث وسيجيبك مستر منقوري بصوته، ثم يستمع لك تلقائياً!
              </span>
            </div>
          )}

          <VoiceControls
            isListening={isListening}
            onStartListening={startListening}
            onStopListening={stopListening}
            onSendTextMessage={handleUserSpeech}
            suggestedPrompts={dynamicPrompts}
            disabled={isSpeaking}
          />
        </div>
      </main>

      {/* Word Translation Popover Modal */}
      <WordTranslationModal
        wordDef={selectedWordDef}
        isOpen={showWordModal}
        onClose={() => setShowWordModal(false)}
        onSpeakWord={handleSpeakSingleWord}
      />

      {/* Level & Career Track Modal */}
      <LevelAndTrackModal
        isOpen={showLevelModal}
        onClose={() => setShowLevelModal(false)}
        selectedLevelId={currentLevel.id}
        selectedDomainId={currentDomain.id}
        onSelectLevel={handleSelectLevel}
        onSelectDomain={handleSelectDomain}
      />

      {/* Scenario Modal */}
      <ScenarioSelectorModal
        isOpen={showScenarioModal}
        onClose={() => setShowScenarioModal(false)}
        selectedScenarioId={scenario.id}
        onSelectScenario={handleSelectScenario}
      />

      {/* Settings Modal */}
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
