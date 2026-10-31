import React, { useEffect, useRef } from 'react';
import { Volume2, User } from 'lucide-react';
import type { Message } from '../../services/conversationManager';
import { sounds } from '../../services/soundEffects';

interface Props {
  messages: Message[];
  isListening: boolean;
  interimTranscript: string;
  onReplaySpeech: (text: string) => void;
}

export const ChatBox: React.FC<Props> = ({
  messages,
  isListening,
  interimTranscript,
  onReplaySpeech
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, interimTranscript]);

  return (
    <div
      ref={scrollRef}
      className="w-full flex-1 max-h-[380px] sm:max-h-[460px] overflow-y-auto px-2 sm:px-4 py-3 space-y-3 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700"
    >
      {messages.map((msg) => {
        const isCharles = msg.sender === 'charles';

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-2 sm:gap-3 transition-all ${
              isCharles ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Sender Avatar Icon */}
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 flex items-center justify-center text-sm shadow-md border ${
                isCharles
                  ? 'bg-amber-600/30 border-amber-500/50 text-amber-300'
                  : 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300'
              }`}
            >
              {isCharles ? '🎩' : <User className="w-4 h-4" />}
            </div>

            {/* Bubble Container */}
            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-lg ${
                isCharles
                  ? msg.isCorrectionNotice
                    ? 'bg-gradient-to-br from-rose-950/80 to-slate-900 border border-rose-500/50 text-rose-100'
                    : 'bg-gradient-to-br from-slate-900 via-slate-900 to-[#121c3b] border border-amber-500/30 text-slate-100'
                  : 'bg-gradient-to-br from-indigo-900/80 to-indigo-950 border border-indigo-500/40 text-indigo-50'
              }`}
            >
              {/* Header Label */}
              <div className="flex items-center justify-between gap-3 text-[11px] mb-1 opacity-75">
                <span className="font-semibold text-amber-400">
                  {isCharles ? 'مستر منقوري (Mr. Mangory)' : 'أنت (You)'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {/* Main English Message Content */}
              <p className="text-xs sm:text-sm font-english leading-relaxed font-medium select-text">
                {msg.text}
              </p>

              {/* Arabic translation / coaching comment */}
              {msg.arabicTranslation && (
                <div className="mt-2 pt-1.5 border-t border-slate-700/60 text-[11px] sm:text-xs text-amber-200/90 font-medium">
                  {msg.arabicTranslation}
                </div>
              )}

              {/* Speaker Replay Button for Charles */}
              {isCharles && (
                <button
                  onClick={() => {
                    sounds.playClick();
                    onReplaySpeech(msg.text);
                  }}
                  title="استمع لنطق مستر منقوري"
                  className="mt-2 flex items-center gap-1 text-[10px] text-amber-400/80 hover:text-amber-300 font-medium transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>إعادة الاستماع بصوت مستر منقوري</span>
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Live Interim Speech Recognition Wave / Bubble */}
      {isListening && (
        <div className="flex items-start gap-2 sm:gap-3 flex-row-reverse animate-pulse">
          <div className="w-8 h-8 rounded-full bg-indigo-500/30 border border-indigo-400/50 flex items-center justify-center text-indigo-300">
            <User className="w-4 h-4" />
          </div>
          <div className="bg-indigo-950/70 border border-dashed border-indigo-400/60 rounded-2xl px-4 py-2 text-indigo-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2 mb-1 text-[11px] text-indigo-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span>مستر منقوري يستمع إليك الآن...</span>
            </div>
            <div className="font-english italic font-medium text-slate-100">
              {interimTranscript || 'تحدث بالإنجليزية الآن...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
