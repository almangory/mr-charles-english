import { useState, useEffect, useRef, useCallback } from 'react';

// ================= SPEECH SYNTHESIS (TTS) =================
export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

// Persistent array to prevent Chrome GC bug cutting off utterances
const activeUtterances: SpeechSynthesisUtterance[] = [];

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const speakTimeoutRef = useRef<number | null>(null);

  // Helper to find the best British/English voice
  const findBestVoice = useCallback((availableVoices: SpeechSynthesisVoice[]) => {
    if (!availableVoices || availableVoices.length === 0) return null;

    // 1. Natural / Premium British male voices (Mr. Mangory persona)
    const britishMale = availableVoices.find(
      (v) =>
        v.lang.startsWith('en-GB') &&
        (v.name.toLowerCase().includes('natural') ||
          v.name.toLowerCase().includes('male') ||
          v.name.toLowerCase().includes('george') ||
          v.name.toLowerCase().includes('oliver') ||
          v.name.toLowerCase().includes('daniel') ||
          v.name.toLowerCase().includes('ryan') ||
          v.name.toLowerCase().includes('uk english'))
    );
    if (britishMale) return britishMale;

    // 2. Any British English voice
    const anyBritish = availableVoices.find((v) => v.lang.startsWith('en-GB') || v.lang === 'en_GB');
    if (anyBritish) return anyBritish;

    // 3. Any English voice (en-US, en-AU, etc.)
    const anyEnglish = availableVoices.find((v) => v.lang.startsWith('en'));
    if (anyEnglish) return anyEnglish;

    return availableVoices[0] || null;
  }, []);

  // Load voices and keep updated
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setSelectedVoice((current) => current || findBestVoice(availableVoices));
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    // Chrome keep-alive timer: prevent long speech from freezing
    const keepAliveTimer = setInterval(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }
    }, 4000);

    return () => {
      clearInterval(keepAliveTimer);
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
    };
  }, [findBestVoice]);

  // Unlock audio context on user gesture (plays silent audio buffer to unblock browser autoplay restrictions)
  const unlockAudio = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      if ('speechSynthesis' in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }

      // Web Audio API silent click to unlock iOS/Android/Chrome audio contexts
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        gain.gain.value = 0.001; // virtually silent
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(0);
        osc.stop(ctx.currentTime + 0.05);
      }

      setIsUnlocked(true);
    } catch (e) {
      console.warn('Audio unlock warning:', e);
      setIsUnlocked(true);
    }
  }, []);

  // Resilient speak function
  const speak = useCallback(
    (text: string, options?: TTSOptions) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        return;
      }

      // Unlock on every speak attempt
      unlockAudio();

      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current);
      }

      // Safe cancel if already active
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
      }

      // Small 35ms timeout avoids the known Chromium cancel/speak collision race condition
      speakTimeoutRef.current = window.setTimeout(() => {
        try {
          const cleanText = text.replace(/[*#_~`]/g, '').trim();
          if (!cleanText) return;

          const utterance = new SpeechSynthesisUtterance(cleanText);

          // Voice selection
          const currentVoices = window.speechSynthesis.getVoices();
          const voiceToUse = selectedVoice || findBestVoice(currentVoices);

          if (voiceToUse) {
            utterance.voice = voiceToUse;
            utterance.lang = voiceToUse.lang;
          } else {
            utterance.lang = 'en-GB';
          }

          utterance.rate = options?.rate ?? 0.95;
          utterance.pitch = options?.pitch ?? 1.02;
          utterance.volume = options?.volume ?? 1.0;

          // Prevent Chrome garbage collector from destroying utterance prematurely
          activeUtterances.push(utterance);

          utterance.onstart = () => {
            setIsSpeaking(true);
            setIsUnlocked(true);
            options?.onStart?.();
          };

          const cleanup = () => {
            setIsSpeaking(false);
            const idx = activeUtterances.indexOf(utterance);
            if (idx !== -1) {
              activeUtterances.splice(idx, 1);
            }
          };

          utterance.onend = () => {
            cleanup();
            options?.onEnd?.();
          };

          utterance.onerror = (e) => {
            // 'interrupted' or 'canceled' are benign when new speech takes over
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
              console.warn('Speech synthesis utterance error:', e);
            }
            cleanup();
            options?.onEnd?.();
          };

          window.speechSynthesis.speak(utterance);

          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
        } catch (err) {
          console.error('Failed to execute window.speechSynthesis.speak:', err);
          setIsSpeaking(false);
          options?.onEnd?.();
        }
      }, 35);
    },
    [selectedVoice, findBestVoice, unlockAudio]
  );

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
    window.speechSynthesis.cancel();
    activeUtterances.length = 0;
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice,
    unlockAudio,
    isUnlocked
  };
}

// ================= SPEECH RECOGNITION (STT) =================
interface IWindow extends Window {
  webkitSpeechRecognition?: unknown;
  SpeechRecognition?: unknown;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
  };
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setError('متصفحك لا يدعم التعرف على الصوت. يُفضل استخدام متصفح Google Chrome أو Edge.');
      return;
    }

    try {
      // Cast constructor
      const Recognition = SpeechRecognitionClass as { new (): SpeechRecognitionInstance };
      const recog = new Recognition();

      recog.continuous = false; // Turn-by-turn conversational flow
      recog.interimResults = true;
      recog.lang = 'en-US'; // English listener

      recog.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recog.onresult = (event: SpeechRecognitionEvent) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recog.onerror = (e: { error: string }) => {
        if (e.error === 'no-speech') {
          // No sound detected - natural pause, ignore
          return;
        }
        if (e.error === 'not-allowed') {
          setError('يرجى السماح بصلاحية الميكروفون في المتصفح للتحدث مع مستر منقوري.');
        } else {
          setError(`تنبيه الميكروفون: ${e.error}`);
        }
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recog;
    } catch (err) {
      console.error('Failed to initialize Speech Recognition:', err);
      setError('تعذر تهيئة التعرف على الصوت.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      setTranscript('');
      setError(null);
      recognitionRef.current.start();
    } catch {
      // If already started, safely restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current?.start(), 100);
      } catch {}
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {}
  }, []);

  return {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    error
  };
}
