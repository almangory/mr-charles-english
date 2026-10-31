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

  // Helper to find the best British/English voice
  const findBestVoice = (availableVoices: SpeechSynthesisVoice[]) => {
    // 1. Natural British male voices
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

    // 2. Any British voice
    const anyBritish = availableVoices.find((v) => v.lang.startsWith('en-GB'));
    if (anyBritish) return anyBritish;

    // 3. Any English voice
    const anyEnglish = availableVoices.find((v) => v.lang.startsWith('en'));
    if (anyEnglish) return anyEnglish;

    return availableVoices[0] || null;
  };

  // Load voices
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

    // Chrome keep-alive: prevent speech from pausing on long text
    const keepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 4500);

    return () => clearInterval(keepAliveTimer);
  }, []);

  // Unlock audio context on first user interaction
  const unlockAudio = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.resume();
      setIsUnlocked(true);
    } catch {}
  }, []);

  const speak = useCallback(
    (text: string, options?: TTSOptions) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        return;
      }

      // Resume in case browser paused it
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      window.speechSynthesis.cancel(); // Cancel any existing speech cleanly

      const utterance = new SpeechSynthesisUtterance(text);

      // Dynamically select voice if not yet loaded
      const currentVoices = window.speechSynthesis.getVoices();
      const voiceToUse = selectedVoice || findBestVoice(currentVoices);

      if (voiceToUse) {
        utterance.voice = voiceToUse;
        utterance.lang = voiceToUse.lang;
      } else {
        utterance.lang = 'en-GB';
      }

      utterance.rate = options?.rate ?? 0.95;
      utterance.pitch = options?.pitch ?? 1.05;
      utterance.volume = options?.volume ?? 1.0;

      // Retain reference to prevent Chrome GC bug
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
        console.warn('Speech synthesis utterance error:', e);
        cleanup();
        options?.onEnd?.();
      };

      // Speak
      window.speechSynthesis.speak(utterance);

      // Force resume immediately for Chrome/Edge
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    },
    [selectedVoice]
  );

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
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
interface IWindowSpeechRecognition extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const win = window as unknown as IWindowSpeechRecognition;
    const SpeechRecognitionAPI = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US'; // English listener

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let currentText = '';
      for (let i = 0; i < event.results.length; i++) {
        currentText += event.results[i][0].transcript;
      }
      setTranscript(currentText);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        setError('يرجى منح الإذن للمتصفح باستخدام الميكروفون للبدء في التحدث.');
      } else if (event.error !== 'no-speech') {
        setError(`خطأ في التعرف على الصوت: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      setTranscript('');
      recognitionRef.current.start();
    } catch {
      // If already started, stop and restart
      recognitionRef.current.stop();
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch {}
      }, 100);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.stop();
    } catch {}
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    isSupported,
    error
  };
}
