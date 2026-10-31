import React from 'react';
import { Volume2, X, Sparkles, BookOpen } from 'lucide-react';
import type { WordDefinition } from '../../services/dictionaryService';
import { sounds } from '../../services/soundEffects';

interface Props {
  wordDef: WordDefinition | null;
  isOpen: boolean;
  onClose: () => void;
  onSpeakWord: (word: string, rate?: number) => void;
}

export const WordTranslationModal: React.FC<Props> = ({
  wordDef,
  isOpen,
  onClose,
  onSpeakWord
}) => {
  if (!isOpen || !wordDef) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md bg-gradient-to-b from-[#111A35] to-[#0A0F24] border border-amber-500/40 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 text-slate-100 animate-in slide-in-from-bottom sm:zoom-in-95 duration-250 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1.5 bg-slate-700/80 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>قاموس مستر منقوري الفوري (Tap-to-Translate)</span>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Word Display Section */}
        <div className="py-4 text-center space-y-2">
          {/* English Word */}
          <h2 className="text-3xl sm:text-4xl font-extrabold font-english tracking-wide text-amber-400 capitalize">
            {wordDef.word}
          </h2>

          {/* Phonetics & Part of Speech Badge */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {wordDef.phonetic && (
              <span className="font-mono text-sm px-2.5 py-0.5 rounded-md bg-slate-800/90 text-indigo-300 border border-slate-700">
                {wordDef.phonetic}
              </span>
            )}
            {wordDef.partOfSpeech && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                {wordDef.partOfSpeech}
              </span>
            )}
          </div>

          {/* Arabic Translation (Highlighted) */}
          <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 shadow-inner">
            <div className="text-xs text-amber-400/80 font-bold mb-1">
              الترجمة والمعنى بالعربية:
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {wordDef.translationAr}
            </div>
          </div>
        </div>

        {/* Audio Pronunciation Controls */}
        <div className="grid grid-cols-2 gap-2.5 my-3">
          {/* Slow British Pronunciation (0.75x) */}
          <button
            onClick={() => {
              sounds.playClick();
              onSpeakWord(wordDef.word, 0.72);
            }}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-amber-600/30 hover:bg-amber-600/40 text-amber-300 border border-amber-500/40 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>نطق بطيء (0.7x)</span>
          </button>

          {/* Normal Speed (1.0x) */}
          <button
            onClick={() => {
              sounds.playClick();
              onSpeakWord(wordDef.word, 1.0);
            }}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-200 border border-indigo-500/40 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>نطق طبيعي (1.0x)</span>
          </button>
        </div>

        {/* Tip / Footer info */}
        <div className="text-[11px] text-slate-400 text-center mt-3 pt-2 border-t border-slate-800">
          💡 اضغط على أي كلمة في المحادثة لترجمتها فورياً وسماع نطقها الدقيق
        </div>
      </div>
    </div>
  );
};
