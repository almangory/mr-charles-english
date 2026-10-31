import React, { useState } from 'react';
import { Mic, MicOff, Send, Keyboard, Sparkles } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

interface Props {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  onSendTextMessage: (text: string) => void;
  suggestedPrompts: string[];
  disabled?: boolean;
}

export const VoiceControls: React.FC<Props> = ({
  isListening,
  onStartListening,
  onStopListening,
  onSendTextMessage,
  suggestedPrompts,
  disabled = false
}) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [typedText, setTypedText] = useState('');

  const handleMicClick = () => {
    sounds.playClick();
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  const handleSubmitText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedText.trim()) return;
    sounds.playClick();
    onSendTextMessage(typedText.trim());
    setTypedText('');
  };

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-2 space-y-3">
      {/* Quick Suggested Prompts Carousel */}
      {suggestedPrompts.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="shrink-0 text-[10px] sm:text-xs text-amber-400/80 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>مقترحات للبدء:</span>
          </span>
          {suggestedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                sounds.playClick();
                onSendTextMessage(p);
              }}
              className="shrink-0 text-[11px] font-english px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-amber-500/50 transition-all active:scale-95 shadow-sm"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Main Microphone Button Bar */}
      <div className="flex items-center justify-center gap-4">
        {/* Toggle Text Input Mode Button */}
        <button
          onClick={() => {
            sounds.playClick();
            setShowTextInput(!showTextInput);
          }}
          title={showTextInput ? 'إخفاء لوحة المفاتيح' : 'الكتابة عبر لوحة المفاتيح'}
          className={`p-3 rounded-2xl border transition-all active:scale-95 ${
            showTextInput
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border-slate-700'
          }`}
        >
          <Keyboard className="w-5 h-5" />
        </button>

        {/* Big Central Glowing Mic Button */}
        <div className="relative">
          {/* Outer Pulsing Wave Ring */}
          {isListening && (
            <span className="absolute -inset-3 rounded-full bg-amber-500/30 animate-ping opacity-75 pointer-events-none" />
          )}

          <button
            onClick={handleMicClick}
            disabled={disabled}
            className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full font-bold text-slate-950 shadow-2xl transition-all duration-300 active:scale-90 ${
              isListening
                ? 'bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 ring-4 ring-rose-400/50 text-white scale-105'
                : 'bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 hover:scale-105 ring-4 ring-amber-500/30'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
            ) : (
              <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-slate-950" />
            )}
          </button>
        </div>

        {/* Status text or info */}
        <div className="w-12 text-center text-[11px] font-semibold text-slate-400">
          {isListening ? (
            <span className="text-rose-400 animate-pulse">يستمع...</span>
          ) : (
            <span>اضغط للتحدث</span>
          )}
        </div>
      </div>

      {/* Fallback Text Input Drawer */}
      {showTextInput && (
        <form
          onSubmit={handleSubmitText}
          className="flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-1.5 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <input
            type="text"
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="اكتب باللغة الإنجليزية هنا واضغط إرسال..."
            className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm font-english text-slate-100 placeholder:text-slate-500 focus:outline-none"
            dir="ltr"
          />
          <button
            type="submit"
            disabled={!typedText.trim()}
            className="p-2 sm:px-4 sm:py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">إرسال</span>
          </button>
        </form>
      )}
    </div>
  );
};
