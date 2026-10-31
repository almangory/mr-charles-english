import React, { useState } from 'react';
import { X, Key, Volume2, Gauge, Trash2, ShieldCheck, Check, Play } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onSelectVoice: (voice: SpeechSynthesisVoice) => void;
  speechRate: number;
  onSelectRate: (rate: number) => void;
  onResetStats: () => void;
  onTestVoice: () => void;
}

export const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
  voices,
  selectedVoice,
  onSelectVoice,
  speechRate,
  onSelectRate,
  onResetStats,
  onTestVoice
}) => {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    sounds.playClick();
    onSaveApiKey(keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-[#0c1328] border-2 border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                إعدادات مستر منقوري الذكية
              </h2>
              <p className="text-xs text-amber-400/80">
                التحكم في الصوت ومحرك المحادثة المباشرة
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

        <div className="my-5 space-y-5">
          {/* Section 1: Voice Selection & Test */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Volume2 className="w-4 h-4" />
                <span className="font-bold text-xs sm:text-sm">
                  صوت مستر منقوري (المتصفح)
                </span>
              </div>
              <button
                onClick={() => {
                  sounds.playClick();
                  onTestVoice();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>اختبار الصوت الآن</span>
              </button>
            </div>

            <select
              value={selectedVoice?.name || ''}
              onChange={(e) => {
                const voice = voices.find((v) => v.name === e.target.value);
                if (voice) {
                  sounds.playClick();
                  onSelectVoice(voice);
                }
              }}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {voices
                .filter((v) => v.lang.startsWith('en'))
                .map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))}
            </select>
            <p className="text-[11px] text-slate-400">
              💡 يفضل اختيار أصوات بريطانية (en-GB مثل Oliver, George, Daniel, Google UK English) لتجربة أرستقراطية ممتعة.
            </p>
          </div>

          {/* Section 2: Speech Rate Slider */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Gauge className="w-4 h-4" />
                <span>سرعة نطق مستر منقوري</span>
              </div>
              <span className="font-english font-bold text-slate-300">
                {speechRate}x
              </span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.2"
              step="0.05"
              value={speechRate}
              onChange={(e) => onSelectRate(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>هادئ وواضح (0.7x)</span>
              <span>طبيعي أرستقراطي (0.95x)</span>
              <span>سريع (1.2x)</span>
            </div>
          </div>

          {/* Section 3: Optional Gemini API Key */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Key className="w-4 h-4" />
              <span className="font-bold text-xs sm:text-sm">
                مفتاح Google Gemini API (اختياري لمحادثات حرة غير محدودة)
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              يعمل التطبيق افتراضياً بنسبة 100% بدون أي مفاتيح عبر محرك الحوار المدمج. إذا أردت فتح حوار حر لا نهائي، ضع مفتاح Gemini المجاني هنا:
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                dir="ltr"
              />
              <button
                onClick={handleSaveKey}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : 'حفظ'}
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>يتم حفظ المفتاح محلياً على متصفحك فقط ولا يُرسل لأي خادم وسيط.</span>
            </div>
          </div>

          {/* Section 4: Reset stats */}
          <div className="pt-2 flex justify-between items-center text-xs">
            <span className="text-slate-400">إعادة تعيين النقاط والـ Streak:</span>
            <button
              onClick={() => {
                if (confirm('هل أنت متأكد من رغبتك في تصفير نقاطك؟')) {
                  sounds.playClick();
                  onResetStats();
                }
              }}
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold p-2 rounded-xl hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>تصفير النقاط</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
