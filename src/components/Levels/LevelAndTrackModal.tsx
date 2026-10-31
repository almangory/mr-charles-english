import React, { useState } from 'react';
import { X, Check, Award, Briefcase, GraduationCap, Baby, BookOpen, ChevronLeft } from 'lucide-react';
import {
  SPEAKING_LEVELS,
  CAREER_DOMAINS
} from '../../services/levelsAndTracks';
import type {
  SpeakingLevel,
  CareerDomain
} from '../../services/levelsAndTracks';
import { sounds } from '../../services/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedLevelId: number;
  selectedDomainId: string;
  onSelectLevel: (level: SpeakingLevel) => void;
  onSelectDomain: (domain: CareerDomain) => void;
}

export const LevelAndTrackModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedLevelId,
  selectedDomainId,
  onSelectLevel,
  onSelectDomain
}) => {
  const [activeTab, setActiveTab] = useState<'levels' | 'domains'>('levels');

  if (!isOpen) return null;

  const primaryLevels = SPEAKING_LEVELS.filter((l) => l.stageCategory === 'primary');
  const intermediateLevels = SPEAKING_LEVELS.filter((l) => l.stageCategory === 'intermediate');
  const advancedLevels = SPEAKING_LEVELS.filter((l) => l.stageCategory === 'advanced');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0a1124] border-2 border-amber-500/40 rounded-3xl p-4 sm:p-6 shadow-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">🧭</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                مستويات المخاطبة والتخصص المهني
              </h2>
              <p className="text-xs text-amber-400/90">
                خصص مستوى نطق وسرعة ومصطلحات مستر منقوري بما يناسبك
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

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 my-3.5 p-1 rounded-2xl bg-slate-800/80 border border-slate-700/80 shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('levels');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'levels'
                ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>مستويات المخاطبة (1 إلى 12)</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('domains');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'domains'
                ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.01]'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>المجال المهني أو الجامعي (7 مجالات)</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
          {activeTab === 'levels' ? (
            <>
              {/* Stage 1: Primary School (Levels 1 - 4) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 px-1">
                  <Baby className="w-4 h-4 text-emerald-400" />
                  <span>المرحلة الابتدائية والتأسيس المبكر (مستويات 1 - 4)</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (نطق هادئ وبطيء، جمل قصيرة، وتشجيع مرح للأطفال)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {primaryLevels.map((lvl) => {
                    const isSelected = lvl.id === selectedLevelId;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => {
                          sounds.playClick();
                          onSelectLevel(lvl);
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer active:scale-98 ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 ring-1 ring-emerald-400 shadow-lg'
                            : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-mono">
                              {lvl.id}
                            </span>
                            <span>{lvl.stageAr}</span>
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />}
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-100">
                          {lvl.titleAr}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {lvl.descriptionAr}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stage 2: Intermediate (Levels 5 - 8) */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400 px-1">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <span>المرحلة المتوسطة وتكوين الجمل والقصص (مستويات 5 - 8)</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (سرعة طبيعية، ربط الجمل، سرد الأحداث وحل المشكلات)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {intermediateLevels.map((lvl) => {
                    const isSelected = lvl.id === selectedLevelId;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => {
                          sounds.playClick();
                          onSelectLevel(lvl);
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer active:scale-98 ${
                          isSelected
                            ? 'bg-sky-500/15 border-sky-500 ring-1 ring-sky-400 shadow-lg'
                            : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-sky-400 flex items-center gap-1">
                            <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 flex items-center justify-center text-[10px] font-mono">
                              {lvl.id}
                            </span>
                            <span>{lvl.stageAr}</span>
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-sky-400 stroke-[3]" />}
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-100">
                          {lvl.titleAr}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {lvl.descriptionAr}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stage 3: Advanced, Collegiate & Executive (Levels 9 - 12) */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 px-1">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>المرحلة الثانوية والجامعية والمهنية المتقدمة (مستويات 9 - 12)</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    (مناظرات نقدية، أبحاث أكاديمية، مقابلات عمل وطلاقة دبلوماسية رفيعة)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {advancedLevels.map((lvl) => {
                    const isSelected = lvl.id === selectedLevelId;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => {
                          sounds.playClick();
                          onSelectLevel(lvl);
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer active:scale-98 ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-400 shadow-lg'
                            : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[10px] font-mono">
                              {lvl.id}
                            </span>
                            <span>{lvl.stageAr}</span>
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-100">
                          {lvl.titleAr}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {lvl.descriptionAr}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Domains / Tracks Selection */
            <div className="space-y-3">
              <p className="text-xs text-slate-300 px-1 leading-relaxed">
                حدد مجالك التخصصي ليقوم مستر منقوري بمحاكاتك بمصطلحات مجالك، ومقابلاتك المهنية، ونقاشاتك الأكاديمية:
              </p>
              <div className="space-y-2.5">
                {CAREER_DOMAINS.map((dom) => {
                  const isSelected = dom.id === selectedDomainId;
                  return (
                    <div
                      key={dom.id}
                      onClick={() => {
                        sounds.playClick();
                        onSelectDomain(dom);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 active:scale-98 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-400 shadow-lg'
                          : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800'
                      }`}
                    >
                      <span className="text-2xl p-2 rounded-xl bg-slate-800/90 border border-slate-700/80 shrink-0">
                        {dom.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                            <span>{dom.nameAr}</span>
                            <span className="text-xs font-english text-amber-400/80">({dom.nameEn})</span>
                          </h4>
                          {isSelected && <Check className="w-4 h-4 text-amber-400 stroke-[3] shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {dom.descriptionAr}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {dom.keywords.slice(0, 5).map((kw, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-english px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Apply Button */}
        <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span>حفظ واعتماد المستوى</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
