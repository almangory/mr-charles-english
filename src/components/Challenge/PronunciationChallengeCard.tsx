import React from 'react';
import { Volume2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import type { PronunciationTrap } from '../../services/pronunciationDictionary';
import { sounds } from '../../services/soundEffects';

interface Props {
  trap: PronunciationTrap;
  onListenSample: (text: string) => void;
  onRetry: () => void;
}

export const PronunciationChallengeCard: React.FC<Props> = ({
  trap,
  onListenSample,
  onRetry
}) => {
  return (
    <div className="relative w-full max-w-lg mx-auto bg-gradient-to-b from-rose-950/90 via-slate-900/95 to-slate-900 border-2 border-rose-500/80 rounded-2xl p-5 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertTriangle className="w-5 h-5 animate-bounce" />
          <span className="font-bold text-sm tracking-wide">
            تحدي نطق مستر منقوري الفوري! ⚠️
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/40">
          الكلمة المستهدفة
        </span>
      </div>

      {/* Target Word Display */}
      <div className="my-4 text-center">
        <div className="text-3xl sm:text-4xl font-extrabold tracking-wider text-amber-300 font-english drop-shadow-md">
          {trap.word}
        </div>
        <div className="text-sm sm:text-base font-english text-emerald-400 mt-1 font-semibold">
          {trap.phonetic}
        </div>
        <div className="inline-block mt-2 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs sm:text-sm text-slate-200">
          💡 {trap.arabicHint}
        </div>
      </div>

      {/* Explanation Quote */}
      <p className="text-xs sm:text-sm text-rose-200/90 text-center bg-rose-950/50 p-2.5 rounded-xl border border-rose-800/40 leading-relaxed">
        {trap.explanation}
      </p>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => {
            sounds.playClick();
            onListenSample(trap.audioSampleText);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>استمع للنطق الإنجليزي الصحيح</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            onRetry();
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-600 transition-all active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة الاستماع لما قلته</span>
        </button>
      </div>

      {/* Challenge Instruction Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-amber-400 font-semibold text-center">
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
        <span>انطق كلمة "{trap.word}" الآن بشكل سليم حتى يرضى مستر منقوري ويجيب عن سؤالك!</span>
      </div>
    </div>
  );
};
