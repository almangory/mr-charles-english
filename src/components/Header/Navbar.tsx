import React from 'react';
import { Crown, Flame, Settings, Volume2, VolumeX, BookOpen, Radio } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

interface Props {
  points: number;
  streak: number;
  rankTitle: string;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onOpenScenarios: () => void;
  currentScenarioTitle: string;
  isLiveMode: boolean;
  onToggleLiveMode: () => void;
}

export const Navbar: React.FC<Props> = ({
  points,
  streak,
  rankTitle,
  soundEnabled,
  onToggleSound,
  onOpenSettings,
  onOpenScenarios,
  currentScenarioTitle,
  isLiveMode,
  onToggleLiveMode
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0B132B]/90 backdrop-blur-md border-b border-amber-500/20 px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Scenario Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg text-lg sm:text-xl">
            🎩
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-sm sm:text-base text-slate-100 tracking-wide">
                مستر تشارلز
              </h1>
              <span className="hidden xs:inline-block text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30">
                Live English Coach
              </span>
            </div>
            {/* Active Scenario Pill Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onOpenScenarios();
              }}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-400/90 hover:text-amber-300 font-medium transition-colors cursor-pointer"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              <span className="truncate max-w-[110px] sm:max-w-xs">{currentScenarioTitle}</span>
              <span className="text-[10px] text-slate-400 underline">تغيير</span>
            </button>
          </div>
        </div>

        {/* Live Conversation Mode Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onToggleLiveMode();
            }}
            title="تبديل وضع المحادثة المباشرة التلقائية (تحدث ويجيبك بصوته ثم يستمع لك تلقائياً)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer ${
              isLiveMode
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white ring-2 ring-emerald-400/50 shadow-emerald-900/50 animate-pulse'
                : 'bg-slate-800/90 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-500/40'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isLiveMode ? 'animate-spin' : ''}`} />
            <span>{isLiveMode ? 'المحادثة الحية: مفعلة 🟢' : 'تفعيل المحادثة المباشرة'}</span>
          </button>
        </div>

        {/* Stats: Posh Points & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Points Pill */}
          <div
            title={`مستواك الحالي: ${rankTitle}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-inner"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-english font-black text-xs sm:text-sm text-amber-300">
              {points}
            </span>
            <span className="text-[10px] text-amber-400/70 font-semibold">
              XP
            </span>
          </div>

          {/* Streak Pill */}
          <div
            title="مرات التدريب المستمر"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/90 border border-orange-500/40"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-english font-bold text-xs sm:text-sm text-orange-300">
              {streak}
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            title={soundEnabled ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors border border-slate-700/80 active:scale-95 cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenSettings();
            }}
            title="الإعدادات ومفتاح الذكاء الاصطناعي"
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors border border-slate-700/80 active:scale-95 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
