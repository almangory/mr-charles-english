import React, { useState } from 'react';
import { X, Volume2, Sparkles, Search, MessageSquare, Database, CheckCircle2 } from 'lucide-react';
import {
  DIGITAL_DATA_QUALITY_TERMS,
  DATA_QUALITY_CATEGORIES
} from '../../services/dataQualityService';
import type { DataQualityTerm, DataQualityCategory } from '../../services/dataQualityService';
import { sounds } from '../../services/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSpeakText: (text: string, rate?: number) => void;
  onPracticeTermWithCharles: (term: DataQualityTerm) => void;
  onStartDataQualityScenario: () => void;
}

export const DataQualityModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSpeakText,
  onPracticeTermWithCharles,
  onStartDataQualityScenario
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | DataQualityCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTerms = DIGITAL_DATA_QUALITY_TERMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCat;
    return (
      matchesCat &&
      (item.termEn.toLowerCase().includes(q) ||
        item.termAr.includes(q) ||
        item.definitionAr.includes(q) ||
        item.definitionEn.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-slate-900 via-[#0b1528] to-[#070d19] border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shrink-0">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-xl font-extrabold text-slate-100">
                  قسم جودة البيانات الرقمية ومصطلحاتها
                </h2>
                <span className="text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Digital Data Quality & Governance
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تعلم وانطق أهم 20 مصطلحاً في جودة البيانات الرقمية، التنقية (Cleansing)، وحوكمة البيانات مع مستر منقوري
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Action Banner + Search & Filter Bar */}
        <div className="my-3 space-y-2.5 shrink-0">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-2.5 sm:px-4">
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <Database className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                يمكنك الاستماع للنطق الصوتي لكل مصطلح أو بدء محاورة حية كاملة في مختبر جودة البيانات!
              </span>
            </div>
            <button
              onClick={() => {
                sounds.playClick();
                onStartDataQualityScenario();
                onClose();
              }}
              className="shrink-0 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>ابدأ حوار جودة البيانات مع مستر منقوري</span>
            </button>
          </div>

          {/* Search & Category Tabs */}
          <div className="flex flex-col md:flex-row gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مصطلح بالعربية أو الإنجليزية (مثال: Accuracy, دقة، Lineage, تكرار)..."
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {DATA_QUALITY_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-500 text-slate-950 shadow-md'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.labelAr}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Terms Grid List */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 md:grid-cols-2 gap-3 scrollbar-thin scrollbar-thumb-slate-700">
          {filteredTerms.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/75 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between gap-3 transition-all shadow-md"
            >
              <div>
                {/* Top Row: Icon, Term En/Ar, Category */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl p-1.5 rounded-xl bg-slate-800 border border-slate-700">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="font-english font-extrabold text-sm sm:text-base text-emerald-400">
                        {item.termEn}
                      </h3>
                      <div className="font-bold text-xs sm:text-sm text-slate-100">
                        {item.termAr}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0">
                    {item.categoryLabelAr}
                  </span>
                </div>

                {/* Phonetic & Arabic Pronunciation Hint */}
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                    {item.phonetic}
                  </span>
                  <span className="text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded">
                    🗣️ النطق: <strong className="text-amber-200">{item.pronunciationHintAr}</strong>
                  </span>
                </div>

                {/* Arabic & English Definition */}
                <p className="mt-2.5 text-xs text-slate-200 leading-relaxed">
                  {item.definitionAr}
                </p>
                <p className="mt-1 text-[11px] font-english text-slate-400 leading-relaxed">
                  {item.definitionEn}
                </p>

                {/* Example Box */}
                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>مثال تطبيقي في بيئة العمل:</span>
                    </span>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSpeakText(item.exampleEn, 0.9);
                      }}
                      className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>استمع للمثال</span>
                    </button>
                  </div>
                  <div className="text-xs font-english text-slate-100 font-medium">
                    "{item.exampleEn}"
                  </div>
                  <div className="text-[11px] text-amber-200/80">
                    {item.exampleAr}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onSpeakText(item.termEn, 0.7);
                  }}
                  className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-bold border border-slate-700 transition-all active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>نطق بطيء</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onSpeakText(`${item.termEn}. ${item.exampleEn}`, 0.95);
                  }}
                  className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] font-bold border border-slate-700 transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>نطق طبيعي</span>
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onPracticeTermWithCharles(item);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 text-[11px] font-bold transition-all active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>تدرب بالحوار</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
