import React, { useEffect, useRef, useState } from 'react';
import { Volume2, User, Globe, Languages } from 'lucide-react';
import type { Message } from '../../services/conversationManager';
import { sounds } from '../../services/soundEffects';
import { lookupWord } from '../../services/dictionaryService';
import type { WordDefinition } from '../../services/dictionaryService';

interface Props {
  messages: Message[];
  isListening: boolean;
  interimTranscript: string;
  onReplaySpeech: (text: string) => void;
  onSelectWord?: (wordDef: WordDefinition) => void;
}

export const ChatBox: React.FC<Props> = ({
  messages,
  isListening,
  interimTranscript,
  onReplaySpeech,
  onSelectWord
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Default to showing full Arabic translations, with a toggle for learners
  const [showSubtitles, setShowSubtitles] = useState(true);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, interimTranscript]);

  const handleWordClick = (rawWord: string) => {
    sounds.playClick();
    const def = lookupWord(rawWord);
    if (def && onSelectWord) {
      onSelectWord(def);
    }
  };

  // Render text with interactive clickable words
  const renderInteractiveText = (text: string) => {
    // Match words (letters, apostrophes, hyphens) vs non-word tokens (spaces, punctuation)
    const tokens = text.split(/(\s+|[.,!?;:"()]+)/);

    return tokens.map((token, index) => {
      // Check if token contains letters
      const isWord = /[a-zA-Z]/.test(token);

      if (!isWord) {
        return <span key={index}>{token}</span>;
      }

      return (
        <span
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            handleWordClick(token);
          }}
          title="اضغط لمعرفة ترجمة ونطق هذه الكلمة"
          className="inline-block cursor-pointer px-0.5 rounded transition-all hover:bg-amber-500/25 hover:text-amber-300 underline decoration-dotted decoration-amber-500/60 underline-offset-4 active:scale-95"
        >
          {token}
        </span>
      );
    });
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* Chat Toolbar: Subtitle Toggle & Tap-to-Translate Hint */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-1.5 mb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
          <Languages className="w-3.5 h-3.5" />
          <span>المحادثة التفاعلية (اضغط أي كلمة لترجمتها)</span>
        </div>

        {/* Global Subtitles Toggle */}
        <button
          onClick={() => {
            sounds.playClick();
            setShowSubtitles(!showSubtitles);
          }}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border transition-all cursor-pointer ${
            showSubtitles
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-slate-800/70 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
          title="تبديل إظهار الترجمة الكاملة للرسائل"
        >
          <Globe className="w-3 h-3" />
          <span>{showSubtitles ? 'الترجمة العربية: مفعّلة' : 'الترجمة العربية: مخفية'}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="w-full flex-1 max-h-[380px] sm:max-h-[460px] overflow-y-auto px-1 sm:px-3 py-2 space-y-3 scroll-smooth scrollbar-thin scrollbar-thumb-slate-700"
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
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-lg ${
                  isCharles
                    ? msg.isCorrectionNotice
                      ? 'bg-gradient-to-br from-rose-950/85 to-slate-900 border border-rose-500/50 text-rose-100'
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

                {/* Main English Message Content with Tap-to-Translate Words */}
                <div className="text-xs sm:text-sm font-english leading-relaxed font-medium select-text">
                  {renderInteractiveText(msg.text)}
                </div>

                {/* Full Arabic Translation (If enabled & available) */}
                {showSubtitles && msg.arabicTranslation && (
                  <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-[11px] sm:text-xs text-amber-200/90 font-medium leading-relaxed flex items-start gap-1.5 bg-slate-950/30 -mx-1 px-2 py-1.5 rounded-lg">
                    <span className="shrink-0 text-amber-400 font-bold text-[10px] uppercase tracking-wider">
                      ترجمة:
                    </span>
                    <span>{msg.arabicTranslation}</span>
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
    </div>
  );
};
