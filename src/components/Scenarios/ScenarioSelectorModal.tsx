import React, { useState, useEffect } from 'react';
import { X, Check, ChevronRight } from 'lucide-react';
import { CONVERSATION_SCENARIOS } from '../../services/pronunciationDictionary';
import type { ScenarioTopic, ScenarioCategory } from '../../services/pronunciationDictionary';
import { sounds } from '../../services/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedScenarioId: string;
  onSelectScenario: (scenario: ScenarioTopic) => void;
  initialCategory?: ScenarioCategory;
}

const CATEGORY_TABS: Array<{ id: ScenarioCategory; labelAr: string; icon: string }> = [
  { id: 'all', labelAr: 'كل السيناريوهات', icon: '🌟' },
  { id: 'places', labelAr: 'المتاجر والبقالات والمقاهي', icon: '🏪' },
  { id: 'data-quality', labelAr: 'جودة البيانات الرقمية', icon: '📊' },
  { id: 'interview', labelAr: 'المقابلات الوظيفية', icon: '💼' },
  { id: 'royal', labelAr: 'المجالس وتحديات النطق', icon: '🎩' }
];

export const ScenarioSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedScenarioId,
  onSelectScenario,
  initialCategory = 'all'
}) => {
  const [activeCategory, setActiveCategory] = useState<ScenarioCategory>(initialCategory);

  useEffect(() => {
    if (isOpen) {
      setActiveCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const filteredScenarios = CONVERSATION_SCENARIOS.filter((sc) =>
    activeCategory === 'all' ? true : sc.category === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c1328] border-2 border-amber-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">🏪</span>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-100">
                الأماكن اليومية ومواضيع المحادثة (المتاجر، البقالات، المقاهي والمزيد)
              </h2>
              <p className="text-xs text-amber-400/90">
                اختر المكان أو الموقف الحياتي للتدرب على المخاطبة الحية مع مستر منقوري
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-slate-800/80 shrink-0">
          {CATEGORY_TABS.map((tab) => {
            const isTabActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(tab.id);
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isTabActive
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.labelAr}</span>
              </button>
            );
          })}
        </div>

        {/* Scenario Cards List */}
        <div className="my-3 space-y-2.5 overflow-y-auto pr-1 flex-1 scrollbar-thin scrollbar-thumb-slate-700">
          {filteredScenarios.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;

            return (
              <div
                key={sc.id}
                onClick={() => {
                  sounds.playClick();
                  onSelectScenario(sc);
                  onClose();
                }}
                className={`group cursor-pointer rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 active:scale-98 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/80 ring-1 ring-amber-500/50 shadow-lg'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 shrink-0">
                      {sc.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
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
                      <div className="text-xs font-english text-amber-400/80 mt-0.5 font-medium">
                        {sc.titleEn}
                      </div>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {sc.description}
                      </p>

                      {/* Sample phrase pills preview */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {sc.suggestedPrompts.slice(0, 2).map((p, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-english px-2 py-0.5 rounded-md bg-slate-950/60 text-slate-300 border border-slate-800"
                          >
                            💬 "{p}"
                          </span>
                        ))}
                      </div>
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
