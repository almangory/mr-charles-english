import React from 'react';
import { X, Check, ChevronRight } from 'lucide-react';
import { CONVERSATION_SCENARIOS } from '../../services/pronunciationDictionary';
import type { ScenarioTopic } from '../../services/pronunciationDictionary';
import { sounds } from '../../services/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedScenarioId: string;
  onSelectScenario: (scenario: ScenarioTopic) => void;
}

export const ScenarioSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedScenarioId,
  onSelectScenario
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c1328] border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                اختر موضوع المحادثة مع مستر تشارلز
              </h2>
              <p className="text-xs text-amber-400/80">
                حدد السيناريو الذي ترغب في التدرب عليه اليوم
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Cards List */}
        <div className="my-4 space-y-3">
          {CONVERSATION_SCENARIOS.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;

            return (
              <div
                key={sc.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectScenario(sc);
                  onClose();
                }}
                className={`group cursor-pointer rounded-2xl p-4 border transition-all duration-200 active:scale-98 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/80 ring-1 ring-amber-500/50 shadow-lg'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 shrink-0">
                      {sc.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-amber-300 transition-colors">
                          {sc.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            sc.level === 'Beginner'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : sc.level === 'Intermediate'
                              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {sc.level}
                        </span>
                      </div>
                      <div className="text-xs font-english text-slate-400 mt-0.5">
                        {sc.titleEn}
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        {sc.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pt-1">
                    {isSelected ? (
                      <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </span>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
