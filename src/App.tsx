import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MrCharlesAvatar, AVATAR_EMOTIONS_LIST } from './components/Avatar/MrCharlesAvatar';
import type { AvatarEmotion, EmotionMeta } from './components/Avatar/MrCharlesAvatar';
import { Navbar } from './components/Header/Navbar';
import { ChatBox } from './components/Dialogue/ChatBox';
import { WordTranslationModal } from './components/Dialogue/WordTranslationModal';
import { VoiceControls } from './components/Controls/VoiceControls';
import { PronunciationChallengeCard } from './components/Challenge/PronunciationChallengeCard';
import { ScenarioSelectorModal } from './components/Scenarios/ScenarioSelectorModal';
import { SettingsModal } from './components/Settings/SettingsModal';
import { LevelAndTrackModal } from './components/Levels/LevelAndTrackModal';
import { DataQualityModal } from './components/DataQuality/DataQualityModal';
import { JobInterviewModal } from './components/Interview/JobInterviewModal';
import {
  Volume2,
  Radio,
  Play,
  MessageSquare,
  UserCheck,
  Languages,
  Database,
  Store,
  Briefcase,
  Sparkles,
  ChevronLeft,
  X
} from 'lucide-react';

import { useSpeechSynthesis, useSpeechRecognition } from './services/speechEngine';
import { sounds } from './services/soundEffects';
import {
  detectPronunciationTrap,
  CONVERSATION_SCENARIOS
} from './services/pronunciationDictionary';
import type {
  PronunciationTrap,
  ScenarioTopic,
  ScenarioCategory
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
import type { DataQualityTerm } from './services/dataQualityService';
import type { InterviewTrack } from './services/jobInterviewService';

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
  const [emotion, setEmotion] = useState<AvatarEmotion>('happy');
  const lastExpressiveEmotionRef = useRef<AvatarEmotion>('happy');

  const [scenario, setScenario] = useState<ScenarioTopic>(CONVERSATION_SCENARIOS[0]);
  const [scenarioModalCategory, setScenarioModalCategory] = useState<ScenarioCategory>('all');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTrap, setActiveTrap] = useState<PronunciationTrap | null>(null);
  const [lastCharlesSpeech, setLastCharlesSpeech] = useState<string>('');

  // New Specialized Section Modals State
  const [showDataQualityModal, setShowDataQualityModal] = useState(false);
  const [showJobInterviewModal, setShowJobInterviewModal] = useState(false);

  // Active Live Job Interview Session State
  const [activeInterviewTrack, setActiveInterviewTrack] = useState<InterviewTrack | null>(null);
  const [interviewQuestionIdx, setInterviewQuestionIdx] = useState<number>(0);

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

  // Global Audio Unlocker on any user gesture
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      unlockAudio();
    };
    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, [unlockAudio]);

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

  // Helper to play matching sound effect for an emotion
  const triggerEmotionSound = useCallback((em: AvatarEmotion) => {
    switch (em) {
      case 'happy':
        sounds.playHappyChime();
        break;
      case 'angry':
        sounds.playMonoclePop();
        sounds.playSteamWhistle();
        break;
      case 'excited':
      case 'proud':
        sounds.playFanfare();
        break;
      case 'surprised':
        sounds.playSurpriseGasp();
        break;
      case 'sad':
        sounds.playSadSigh();
        break;
      case 'laughing':
        sounds.playChuckle();
        break;
      default:
        sounds.playClick();
        break;
    }
  }, []);

  // Helper to execute Charles speaking aloud while preserving his facial emotion!
  const speakCharles = useCallback(
    (textToSpeak: string, targetEmotion: AvatarEmotion = 'happy') => {
      unlockAudio();
      stopListening(); // Mute mic while Charles speaks to avoid hearing himself
      setLastCharlesSpeech(textToSpeak);
      lastExpressiveEmotionRef.current = targetEmotion;
      setEmotion(targetEmotion);

      speak(textToSpeak, {
        rate: speechRate,
        onStart: () => setEmotion(targetEmotion),
        onEnd: () => {
          // Keep the expressive emotion visible on the Avatar face!
          setEmotion(targetEmotion);
          if (isLiveMode) {
            setTimeout(() => {
              sounds.playClick();
              startListening();
            }, 550);
          }
        }
      });
    },
    [speak, speechRate, isLiveMode, startListening, stopListening, unlockAudio]
  );

  // Interactive Emotion Trigger when user clicks an emotion button on the Avatar Emotion Bar
  const handleTriggerAvatarEmotion = (meta: EmotionMeta) => {
    unlockAudio();
    lastExpressiveEmotionRef.current = meta.id;
    setEmotion(meta.id);
    triggerEmotionSound(meta.id);

    const emotionMsg: Message = {
      id: 'emotion-' + Date.now(),
      sender: 'charles',
      text: meta.sampleLineEn,
      arabicTranslation: `(${meta.labelAr}): ${meta.sampleLineAr}`,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, emotionMsg]);

    // Speak with slight pitch/rate modulation matching the emotion
    const emotionRate =
      meta.id === 'excited'
        ? Math.min(1.1, speechRate + 0.08)
        : meta.id === 'sad'
        ? Math.max(0.75, speechRate - 0.1)
        : speechRate;

    stopListening();
    setLastCharlesSpeech(meta.sampleLineEn);
    speak(meta.sampleLineEn, {
      rate: emotionRate,
      onStart: () => setEmotion(meta.id),
      onEnd: () => setEmotion(meta.id)
    });
  };

  // Initial Scenario Greeting
  const playGreeting = useCallback(
    (sc: ScenarioTopic, shouldSpeakAloud: boolean = false) => {
      const greetingText = sc.initialGreeting || currentLevel.initialGreeting;
      const greetingMsg: Message = {
        id: 'initial-' + Date.now(),
        sender: 'charles',
        text: greetingText,
        arabicTranslation: `سيناريو (${sc.title}) جاهز! المستوى الحالي: (${currentLevel.id}: ${currentLevel.titleAr}) • التخصص: (${currentDomain.nameAr}).`,
        timestamp: new Date()
      };
      setMessages([greetingMsg]);
      setLastCharlesSpeech(greetingMsg.text);

      if (shouldSpeakAloud) {
        speakCharles(greetingMsg.text, 'happy');
      }
    },
    [speakCharles, currentLevel, currentDomain]
  );

  // On first load, display the message and speak if unlocked
  const initialGreetingDone = useRef(false);
  useEffect(() => {
    if (!initialGreetingDone.current) {
      initialGreetingDone.current = true;
      playGreeting(scenario, isUnlocked);
    }
  }, [scenario, playGreeting, isUnlocked]);

  // Handle Turn-taking: When user speech recognition finishes, process it
  useEffect(() => {
    if (!isListening && transcript.trim().length > 0) {
      const captured = transcript.trim();
      setTranscript('');
      handleUserSpeech(captured);
    }
  }, [isListening, transcript]);

  // Manual Trigger to Start Live Voice Conversation
  const handleStartLiveConversation = () => {
    unlockAudio();
    sounds.playClick();
    speakCharles(scenario.initialGreeting || currentLevel.initialGreeting, 'happy');
  };

  // Word Translation Click Handler (Tap-to-Translate)
  const handleSelectWord = (def: WordDefinition) => {
    setSelectedWordDef(def);
    setShowWordModal(true);
  };

  // Single word or sample phrase audio pronunciation
  const handleSpeakSingleWord = (word: string, rate: number = 0.75) => {
    unlockAudio();
    speak(word, { rate });
  };

  // Practice a Digital Data Quality Term directly with Mr. Mangory
  const handlePracticeDataQualityTerm = (term: DataQualityTerm) => {
    const dqScenario = CONVERSATION_SCENARIOS.find((s) => s.id === 'digital-data-quality');
    if (dqScenario) {
      setScenario(dqScenario);
    }
    const dqDomain = getDomainById('data-quality');
    setCurrentDomain(dqDomain);

    const promptText = `Let us practice the Digital Data Quality term "${term.termEn}" (${term.phonetic})! ${term.definitionEn} For example: "${term.exampleEn}" Now, repeat "${term.termEn}" or use it in a sentence!`;
    const promptAr = `دعنا نتدرب على مصطلح جودة البيانات الرقمية (${term.termEn} - ${term.termAr})! النطق: ${term.pronunciationHintAr}. المعنى: ${term.definitionAr}. انطق المصطلح بصوتك الآن!`;

    const msg: Message = {
      id: 'dq-term-' + Date.now(),
      sender: 'charles',
      text: promptText,
      arabicTranslation: promptAr,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, msg]);
    sounds.playHappyChime();
    speakCharles(promptText, 'excited');
  };

  // Start an Interactive Live Job Interview Track
  const handleStartLiveInterviewTrack = (track: InterviewTrack, questionIdx: number = 0) => {
    setActiveInterviewTrack(track);
    setInterviewQuestionIdx(questionIdx);

    const interviewSc = CONVERSATION_SCENARIOS.find((s) => s.id === 'job-interview');
    if (interviewSc) {
      setScenario(interviewSc);
    }

    const q = track.questions[questionIdx] || track.questions[0];
    const introText = `Welcome to the ${track.titleEn}! Question ${q.stepNumber}: ${q.questionEn}`;
    const introAr = `مرحباً بك في (${track.titleAr})! السؤال ${q.stepNumber}: ${q.questionAr} (استخدم الكلمات المفتاحية: ${q.powerKeywords.join(', ')})`;

    const msg: Message = {
      id: 'interview-q-' + Date.now(),
      sender: 'charles',
      text: introText,
      arabicTranslation: introAr,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, msg]);
    sounds.playFanfare();
    speakCharles(introText, 'proud');
  };

  // Advance to Next Question in Active Job Interview
  const handleNextInterviewQuestion = () => {
    if (!activeInterviewTrack) return;
    const nextIdx = (interviewQuestionIdx + 1) % activeInterviewTrack.questions.length;
    setInterviewQuestionIdx(nextIdx);
    const q = activeInterviewTrack.questions[nextIdx];

    const qText = `Splendid! Let us move to Interview Question ${q.stepNumber}: ${q.questionEn}`;
    const qAr = `ممتاز! لننتقل إلى السؤال ${q.stepNumber} في المقابلة الشخصية: ${q.questionAr}`;

    const msg: Message = {
      id: 'interview-next-' + Date.now(),
      sender: 'charles',
      text: qText,
      arabicTranslation: qAr,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, msg]);
    sounds.playBellDing();
    speakCharles(qText, 'excited');
  };

  // Core User Input Handler (Speech Recognition or Text Input)
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

    // 2. CHECK IF USER JUST PRACTICED/SOLVED ACTIVE TRAP WORD
    if (activeTrap) {
      const cleanUser = userText.toLowerCase();
      const targetClean = activeTrap.word.toLowerCase();

      const isCorrect =
        cleanUser.includes(targetClean) ||
        cleanUser.includes(targetClean.replace('-', ' ')) ||
        (cleanUser.length < 25 && targetClean.includes(cleanUser));

      if (isCorrect) {
        sounds.playBellDing();
        sounds.playFanfare();
        triggerCelebrationConfetti();

        setPoints((p) => p + 50);
        setStreak((s) => s + 1);

        const currentTrap = activeTrap;
        setActiveTrap(null);

        const praiseText = `${currentTrap.successQuote} You pronounced "${currentTrap.word}" with true Oxford distinction! Now, what other noble thought shall we discuss?`;
        const praiseArabic = `رائع جداً! لقد أتقنت نطق كلمة (${currentTrap.word}) بفصاحة ملكية! ما الفكرة النبيلة الأخرى التي تحب أن نناقشها؟`;

        const charlesPraiseMsg: Message = {
          id: 'charles-' + Date.now(),
          sender: 'charles',
          text: praiseText,
          arabicTranslation: praiseArabic,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, charlesPraiseMsg]);
        speakCharles(praiseText, 'proud');
        return;
      }
    }

    // 3. CHECK FOR PRONUNCIATION TRAPS IN SPOKEN USER TEXT
    const detectedTrap = detectPronunciationTrap(userText);

    if (detectedTrap) {
      sounds.playMonoclePop();
      sounds.playSteamWhistle();
      setActiveTrap(detectedTrap);
    } else {
      sounds.playBellDing();
      setPoints((p) => p + 10);
    }

    // 4. GENERATE RESPONSE (COMBINING EMOTIONAL CORRECTION + DIRECT ANSWER TO USER'S TOPIC!)
    try {
      let replyText = '';
      let replyArabic = '';
      let replyEmotion: AvatarEmotion = detectedTrap ? 'angry' : 'happy';

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
        replyEmotion = detectedTrap ? 'angry' : geminiResult.emotion;
      } else {
        const generated = generateCharlesResponse(
          userText,
          scenario,
          currentLevel.id,
          currentDomain.id,
          detectedTrap
        );
        replyText = generated.replyText;
        replyArabic = generated.arabicTranslation;
        replyEmotion = generated.emotion;
      }

      const charlesReplyMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: replyText,
        arabicTranslation: replyArabic,
        isCorrectionNotice: !!detectedTrap,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesReplyMsg]);

      triggerEmotionSound(replyEmotion);
      speakCharles(replyText, replyEmotion);
    } catch {
      const fallback = generateCharlesResponse(
        userText,
        scenario,
        currentLevel.id,
        currentDomain.id,
        detectedTrap
      );
      const charlesReplyMsg: Message = {
        id: 'charles-' + Date.now(),
        sender: 'charles',
        text: fallback.replyText,
        arabicTranslation: fallback.arabicTranslation,
        isCorrectionNotice: !!detectedTrap,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, charlesReplyMsg]);
      speakCharles(fallback.replyText, fallback.emotion);
    }
  };

  const handleSelectScenario = (sc: ScenarioTopic) => {
    setScenario(sc);
    setActiveTrap(null);
    if (sc.id !== 'job-interview') {
      setActiveInterviewTrack(null);
    }
    playGreeting(sc, isUnlocked);
  };

  const handleSelectLevel = (lvl: SpeakingLevel) => {
    setCurrentLevel(lvl);
    setActiveTrap(null);
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
      speakCharles(domainMsg.text, 'excited');
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
      onStart: () => setEmotion('happy'),
      onEnd: () => setEmotion('proud')
    });
  };

  // Dynamic suggested prompts based on active scenario, interview, level & domain
  const activeInterviewQuestion =
    activeInterviewTrack && activeInterviewTrack.questions[interviewQuestionIdx];

  const dynamicPrompts = activeInterviewQuestion
    ? [
        activeInterviewQuestion.sampleAnswerEn,
        ...scenario.suggestedPrompts.slice(0, 2)
      ]
    : [
        ...scenario.suggestedPrompts.slice(0, 3),
        ...currentDomain.samplePrompts.slice(0, 2)
      ];

  // Latest message from Charles for quick preview in Mobile Avatar mode
  const latestCharlesMsg = [...messages].reverse().find((m) => m.sender === 'charles');

  // Helper for current emotion badge text
  const currentEmotionMeta = AVATAR_EMOTIONS_LIST.find((e) => e.id === emotion);

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
        onOpenScenarios={() => {
          setScenarioModalCategory('all');
          setShowScenarioModal(true);
        }}
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

      {/* ============================================================== */}
      {/* QUICK HUB BAR: DATA QUALITY • STORES/GROCERIES/CAFÉS • JOB INTERVIEW */}
      {/* ============================================================== */}
      <div className="w-full bg-[#0A1228]/95 border-b border-slate-800/90 px-2 sm:px-5 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* 1. Digital Data Quality Section Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowDataQualityModal(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>📊 قسم جودة البيانات الرقمية</span>
            </button>

            {/* 2. Everyday Places: Stores, Groceries & Cafés Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setScenarioModalCategory('places');
                setShowScenarioModal(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Store className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>🏪 المتاجر والبقالات والمقاهي</span>
            </button>

            {/* Quick Place Switchers (Grocery / Store / Café) */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              {[
                { id: 'grocery-supermarket', label: '🛒 البقالة' },
                { id: 'retail-shopping-store', label: '🛍️ المتجر' },
                { id: 'cafe-coffee-shop', label: '☕ المقهى' }
              ].map((pl) => {
                const isSelected = scenario.id === pl.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => {
                      sounds.playClick();
                      const found = CONVERSATION_SCENARIOS.find((s) => s.id === pl.id);
                      if (found) handleSelectScenario(found);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
                    }`}
                  >
                    {pl.label}
                  </button>
                );
              })}
            </div>

            {/* 3. Job Interview Section Button */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowJobInterviewModal(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/40 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>💼 قسم المقابلة الشخصية للتوظيف</span>
            </button>
          </div>
        </div>
      </div>

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
            <span>الأفاتار والمشاعر</span>
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
                  {scenario.title} • {currentLevel.titleAr}
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
        {/* ACTIVE LIVE JOB INTERVIEW SIMULATOR BANNER (When in Interview Mode) */}
        {/* ============================================================== */}
        {activeInterviewTrack && activeInterviewQuestion && (
          <div className="w-full max-w-2xl bg-gradient-to-r from-indigo-950/95 via-slate-900 to-indigo-950/95 border-2 border-indigo-500/50 rounded-2xl p-3.5 sm:p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeInterviewTrack.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-indigo-300">
                      لجنة المقابلة الشخصية: {activeInterviewTrack.titleAr}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold">
                      سؤال {activeInterviewQuestion.stepNumber} من {activeInterviewTrack.questions.length}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleNextInterviewQuestion}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                >
                  <span>السؤال التالي</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveInterviewTrack(null)}
                  title="إنهاء وضع المقابلة"
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs sm:text-sm font-english font-bold text-amber-300">
                "{activeInterviewQuestion.questionEn}"
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                {activeInterviewQuestion.questionAr}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1">
                <span className="text-[10px] text-indigo-300 font-semibold">
                  💡 كلمات مفتاحية يُنصح بذكرها في إجابتك:
                </span>
                {activeInterviewQuestion.powerKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-english px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 1: AVATAR STAGE & EMOTION CONTROL BAR */}
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
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-md bg-gradient-to-r ${
                currentEmotionMeta
                  ? currentEmotionMeta.colorClass
                  : isListening
                  ? 'from-indigo-500 to-blue-600 text-white animate-pulse'
                  : 'from-slate-800 to-slate-900 text-amber-400 border border-amber-500/30'
              }`}
            >
              {isListening
                ? '👂 مستر منقوري يستمع لك الآن (تحدث بالإنجليزية)...'
                : currentEmotionMeta
                ? currentEmotionMeta.badgeTextAr
                : '☕ مستر منقوري في انتظارك'}
            </span>

            {/* Live Audio Waves when Speaking */}
            {isSpeaking && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/40">
                <span className="inline-block w-1.5 h-3 bg-amber-400 animate-bounce"></span>
                <span className="inline-block w-1.5 h-4 bg-amber-400 animate-bounce [animation-delay:0.15s]"></span>
                <span className="inline-block w-1.5 h-2 bg-amber-400 animate-bounce [animation-delay:0.3s]"></span>
                <span className="inline-block w-1.5 h-4 bg-amber-400 animate-bounce [animation-delay:0.1s]"></span>
                <span>ينطق الآن</span>
              </span>
            )}
          </div>

          {/* SVG Character (Clickable to Re-hear Speech) */}
          <div
            onClick={() => {
              if (lastCharlesSpeech) {
                speakCharles(lastCharlesSpeech, emotion);
              } else {
                handleTestVoice();
              }
            }}
            title="اضغط على مستر منقوري لسماع صوته مباشرة"
            className="cursor-pointer group relative"
          >
            <MrCharlesAvatar
              emotion={emotion}
              isSpeaking={isSpeaking}
              isListening={isListening}
              size="lg"
            />
          </div>

          {/* ============================================================== */}
          {/* INTERACTIVE AVATAR EMOTIONS PANEL (فرح • غضب • حماس • اندهاش • حزن • فخر • ضحك • تفكير) */}
          {/* ============================================================== */}
          <div className="mt-2 w-full max-w-2xl bg-slate-900/80 border border-slate-800/90 rounded-2xl p-2.5 shadow-lg">
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>تفعيل مشاعر وانفعالات مستر منقوري الحية (اضغط لتجربة أي شعور بالصوت والحركة):</span>
              </span>
              {lastCharlesSpeech && (
                <button
                  onClick={() => speakCharles(lastCharlesSpeech, emotion)}
                  className="hidden sm:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-semibold border border-amber-500/30 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3 text-amber-400" />
                  <span>إعادة سماع كلامه ({speechRate}x)</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {AVATAR_EMOTIONS_LIST.map((em) => {
                const isSelected = emotion === em.id;
                return (
                  <button
                    key={em.id}
                    onClick={() => handleTriggerAvatarEmotion(em)}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-[11px] font-bold transition-all active:scale-95 cursor-pointer border ${
                      isSelected
                        ? `bg-gradient-to-br ${em.colorClass} shadow-md scale-[1.03]`
                        : 'bg-slate-800/70 hover:bg-slate-800 text-slate-300 border-slate-700/70'
                    }`}
                  >
                    <span className="text-base sm:text-lg leading-none mb-0.5">{em.emoji}</span>
                    <span className="truncate max-w-full text-[10px]">{em.labelAr.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

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
          className={`w-full max-w-2xl flex-1 flex-col justify-center space-y-3 ${
            mobileTab === 'chat' ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Active Pronunciation Practice Card (Non-blocking banner) */}
          {activeTrap && (
            <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
              <PronunciationChallengeCard
                trap={activeTrap}
                onListenSample={handleListenSample}
                onRetry={() => startListening()}
              />
            </div>
          )}

          {/* Full Interactive Chat Box with Tap-to-Translate */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-2 sm:p-4 shadow-xl backdrop-blur-sm flex flex-col">
            <ChatBox
              messages={messages}
              isListening={isListening}
              interimTranscript={transcript}
              onReplaySpeech={(txt) => speakCharles(txt, emotion)}
              onSelectWord={handleSelectWord}
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 5. CONTROLS SECTION (Fixed Dock on Mobile, Embedded on Desktop) */}
        {/* ============================================================== */}
        <div className="fixed md:static bottom-0 left-0 right-0 z-30 bg-[#070D1E]/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t md:border-t-0 border-slate-800/80 px-2 sm:px-4 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] w-full">
          {/* Hands-Free Live Notice */}
          {isLiveMode && (
            <div className="text-center mb-1 text-[11px] text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>
                المحادثة المباشرة مفعلة ({scenario.title}): تحدث بحرية وسيجيبك مستر منقوري بصوته ومشاعره الحية!
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

      {/* Digital Data Quality Section Modal */}
      <DataQualityModal
        isOpen={showDataQualityModal}
        onClose={() => setShowDataQualityModal(false)}
        onSpeakText={handleSpeakSingleWord}
        onPracticeTermWithCharles={handlePracticeDataQualityTerm}
        onStartDataQualityScenario={() => {
          const dqSc = CONVERSATION_SCENARIOS.find((s) => s.id === 'digital-data-quality');
          if (dqSc) handleSelectScenario(dqSc);
          setCurrentDomain(getDomainById('data-quality'));
        }}
      />

      {/* Job Interview Simulator Modal */}
      <JobInterviewModal
        isOpen={showJobInterviewModal}
        onClose={() => setShowJobInterviewModal(false)}
        onSpeakText={handleSpeakSingleWord}
        onStartLiveInterviewTrack={handleStartLiveInterviewTrack}
        onSendAnswerToChat={(ans) => handleUserSpeech(ans)}
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

      {/* Scenario Modal (With Places / Data Quality / Interview Categories) */}
      <ScenarioSelectorModal
        isOpen={showScenarioModal}
        onClose={() => setShowScenarioModal(false)}
        selectedScenarioId={scenario.id}
        onSelectScenario={handleSelectScenario}
        initialCategory={scenarioModalCategory}
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
