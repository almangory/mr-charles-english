import { useState, useEffect, useRef, useCallback } from 'react';

// ================= SPEECH SYNTHESIS (TTS) =================
export interface TTSOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
}

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Prioritize British English male voices for Mr. Charles
      const britishMale = availableVoices.find(
        (v) =>
          v.lang.startsWith('en-GB') &&
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('george') ||
            v.name.toLowerCase().includes('oliver') ||
            v.name.toLowerCase().includes('daniel') ||
            v.name.toLowerCase().includes('uk english'))
      );

      const anyBritish = availableVoices.find((v) => v.lang.startsWith('en-GB'));
      const anyEnglish = availableVoices.find((v) => v.lang.startsWith('en'));

      setSelectedVoice(britishMale || anyBritish || anyEnglish || availableVoices[0] || null);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  const speak = useCallback(
    (text: string, options?: TTSOptions) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      window.speechSynthesis.cancel(); // Cancel any existing speech

      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.lang = selectedVoice?.lang || 'en-GB';
      utterance.rate = options?.rate ?? 0.95; // Slightly measured gentlemanly cadence
      utterance.pitch = options?.pitch ?? 1.05; // Expressive tone

      utterance.onstart = () => {
        setIsSpeaking(true);
        options?.onStart?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        options?.onEnd?.();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        options?.onEnd?.();
      };

      window.speechSynthesis.speak(utterance);
    },
    [selectedVoice]
  );

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    voices,
    selectedVoice,
    setSelectedVoice
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
