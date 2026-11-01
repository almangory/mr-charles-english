import React, { useEffect, useState } from 'react';

export type AvatarEmotion =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'happy'
  | 'angry'
  | 'excited'
  | 'surprised'
  | 'sad'
  | 'laughing'
  | 'proud';

export interface EmotionMeta {
  id: AvatarEmotion;
  labelAr: string;
  labelEn: string;
  emoji: string;
  badgeTextAr: string;
  colorClass: string;
  sampleLineEn: string;
  sampleLineAr: string;
}

export const AVATAR_EMOTIONS_LIST: EmotionMeta[] = [
  {
    id: 'happy',
    labelAr: 'فرح وسعادة',
    labelEn: 'Happy',
    emoji: '😊',
    badgeTextAr: '😊 سعادة غامرة وابتهاج أرستقراطي!',
    colorClass: 'from-emerald-500 to-teal-500 text-slate-950 border-emerald-400',
    sampleLineEn: 'Oh, what a joyous day in London! My heart is dancing like a sunny morning in Hyde Park! Splendid!',
    sampleLineAr: 'يا له من يوم مبهج في لندن! قلبي يرقص فرحاً كصباح مشرق في هايد بارك! رائع جداً!'
  },
  {
    id: 'angry',
    labelAr: 'غضب درامي',
    labelEn: 'Angry',
    emoji: '🤬',
    badgeTextAr: '🤬 غضب درامي كرتوني (انتبه للنطق!)',
    colorClass: 'from-rose-600 to-red-600 text-white border-rose-400',
    sampleLineEn: "Good heavens! By Queen Victoria's ghost, my monocle is boiling with outrage! Pronounce every syllable properly!",
    sampleLineAr: 'يا للهول! بحق طيف الملكة فيكتوريا، عدستي تغلي من الغضب الدرامي! انطق كل مقطع لفظي بدقة!'
  },
  {
    id: 'excited',
    labelAr: 'حماس وتشجيع',
    labelEn: 'Excited',
    emoji: '🤩',
    badgeTextAr: '🤩 حماس منقطع النظير وطاقة عالية!',
    colorClass: 'from-amber-400 to-orange-500 text-slate-950 border-amber-300',
    sampleLineEn: 'Extraordinary! Magnificent energy! We are unstoppable champions of the English language today!',
    sampleLineAr: 'استثنائي! طاقة وحماس مذهلان! نحن أبطال لا يُقهرون في اللغة الإنجليزية اليوم!'
  },
  {
    id: 'surprised',
    labelAr: 'اندهاش وصدمة',
    labelEn: 'Surprised',
    emoji: '😲',
    badgeTextAr: '😲 اندهاش وذهول! (طارت القبعة!)',
    colorClass: 'from-sky-500 to-cyan-400 text-slate-950 border-sky-300',
    sampleLineEn: 'Great Scott! Bless my top hat and whiskers! You truly astonished me with that unexpected turn of phrase!',
    sampleLineAr: 'يا للعجب! بارك الله في قبعتي وشاربي! لقد أدهشتني حقاً بهذه العبارة غير المتوقعة!'
  },
  {
    id: 'sad',
    labelAr: 'حزن وتعاطف',
    labelEn: 'Sad',
    emoji: '😢',
    badgeTextAr: '😢 حزن درامي وتعاطف وجداني',
    colorClass: 'from-blue-600 to-indigo-700 text-white border-blue-400',
    sampleLineEn: 'Alas, my dear friend... Even my Earl Grey tea has grown cold and rainy. Do not despair, brighter days shall return!',
    sampleLineAr: 'واأسفاه يا صديقي العزيز... حتى شاي إيرل غراي الخاص بي قد برد تحت المطر. لا تيأس، فالأيام المشرقة ستعود!'
  },
  {
    id: 'proud',
    labelAr: 'فخر ملكي',
    labelEn: 'Proud',
    emoji: '🎩',
    badgeTextAr: '🎩 فخور جداً بنطقك وتألقك الملكي!',
    colorClass: 'from-amber-500 to-yellow-400 text-slate-950 border-amber-300',
    sampleLineEn: 'Bravo! You speak with the noble distinction of an Oxford scholar! I am immensely proud of you!',
    sampleLineAr: 'برافو! أنت تتحدث بوقار وتميز علماء أكسفورد النبلاء! أنا فخور بك للغاية!'
  },
  {
    id: 'laughing',
    labelAr: 'ضحك وقهقهة',
    labelEn: 'Laughing',
    emoji: '😂',
    badgeTextAr: '😂 قهقهة أرستقراطية مرحة!',
    colorClass: 'from-yellow-400 to-amber-500 text-slate-950 border-yellow-300',
    sampleLineEn: 'Ha ha ha! Ho ho! How delightfully witty! That tickled my Victorian ribs beyond measure!',
    sampleLineAr: 'ها ها ها! هو هو! يا لخفة الظل المبهجة! لقد أضحكتني من أعماق قلبي الفيكتوري!'
  },
  {
    id: 'thinking',
    labelAr: 'تفكير وتأمل',
    labelEn: 'Thinking',
    emoji: '🧐',
    badgeTextAr: '🧐 غارق في التفكير والتحليل العميق...',
    colorClass: 'from-purple-600 to-indigo-600 text-white border-purple-400',
    sampleLineEn: 'Hmm... Let me adjust my golden monocle and ponder this profound linguistic puzzle with precision...',
    sampleLineAr: 'هممم... دعني أضبط عدستي الذهبية وأتأمل هذا اللغز اللغوي العميق بكل دقة...'
  }
];

interface MrCharlesAvatarProps {
  emotion: AvatarEmotion;
  isSpeaking?: boolean;
  isListening?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MrCharlesAvatar: React.FC<MrCharlesAvatarProps> = ({
  emotion,
  isSpeaking = false,
  isListening = false,
  size = 'lg'
}) => {
  // Lip-sync state toggler when speaking
  const [mouthShape, setMouthShape] = useState<'closed' | 'openSmall' | 'openWide' | 'oShape'>('closed');
  const [blink, setBlink] = useState(false);

  // Periodic blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, []);

  // Lip-sync simulation during speech
  useEffect(() => {
    if (!isSpeaking) {
      setMouthShape('closed');
      return;
    }

    const shapes: Array<'closed' | 'openSmall' | 'openWide' | 'oShape'> = [
      'openSmall',
      'openWide',
      'openSmall',
      'oShape',
      'openSmall',
      'closed'
    ];
    let idx = 0;
    const lipInterval = setInterval(() => {
      idx = (idx + 1) % shapes.length;
      setMouthShape(shapes[idx]);
    }, 125);

    return () => clearInterval(lipInterval);
  }, [isSpeaking]);

  const sizeClasses = {
    sm: 'w-44 h-44',
    md: 'w-64 h-64',
    lg: 'w-72 h-72 sm:w-84 sm:h-84 md:w-92 md:h-92'
  }[size];

  // Dynamic animation classes based on emotion
  const getContainerAnimation = () => {
    if (emotion === 'angry') return 'animate-dramatic-shake';
    if (emotion === 'laughing') return 'animate-laugh-bounce';
    if (emotion === 'happy') return 'animate-happy-sway';
    if (emotion === 'excited') return 'animate-excited-jump';
    if (emotion === 'sad') return 'animate-sad-droop';
    if (emotion === 'listening') return 'scale-105 transition-transform duration-300';
    if (emotion === 'idle') return 'animate-gentleman-bob';
    return 'animate-gentleman-bob';
  };

  // Dynamic background aura glow
  const getAuraClass = () => {
    switch (emotion) {
      case 'angry':
        return 'bg-rose-600/45 scale-125';
      case 'happy':
        return 'bg-emerald-400/40 scale-120';
      case 'excited':
        return 'bg-amber-400/50 scale-130 animate-pulse';
      case 'surprised':
        return 'bg-cyan-400/45 scale-125';
      case 'sad':
        return 'bg-blue-700/40 scale-110';
      case 'laughing':
        return 'bg-yellow-400/40 scale-115';
      case 'proud':
        return 'bg-amber-500/40 scale-125';
      case 'thinking':
        return 'bg-purple-500/35 scale-110';
      default:
        return isListening ? 'bg-amber-500/35 scale-115 animate-pulse' : 'bg-indigo-600/20';
    }
  };

  // Face skin gradient stop colors
  const faceStartColor =
    emotion === 'angry'
      ? '#fca5a5'
      : emotion === 'sad'
      ? '#e2e8f0'
      : emotion === 'surprised'
      ? '#fef08a'
      : '#fed7aa';

  const faceEndColor =
    emotion === 'angry'
      ? '#ef4444'
      : emotion === 'sad'
      ? '#94a3b8'
      : emotion === 'happy' || emotion === 'excited'
      ? '#fb923c'
      : '#f97316';

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${getContainerAnimation()}`}>
      {/* Background Aura / Mood Glow */}
      <div
        className={`absolute inset-4 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${getAuraClass()}`}
      />

      {/* SVG Character Rig */}
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-2xl overflow-visible z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin gradient */}
          <radialGradient id="faceGrad" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={faceStartColor} />
            <stop offset="100%" stopColor={faceEndColor} />
          </radialGradient>

          {/* Tweed Suit Gradient */}
          <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Vest Gradient */}
          <linearGradient id="vestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Monocle Glass Gradient */}
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
            <stop offset="40%" stopColor="rgba(186,230,253,0.35)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.2)" />
          </linearGradient>

          {/* Gold Trim */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* ================= 1. ANGRY STEAM PUFFS & LIGHTNING ================= */}
        {emotion === 'angry' && (
          <g>
            {/* Left ear steam */}
            <g className="animate-steam-left origin-[105px_195px]">
              <circle cx="100" cy="180" r="14" fill="#ffffff" opacity="0.9" />
              <circle cx="82" cy="162" r="19" fill="#e2e8f0" opacity="0.85" />
              <circle cx="60" cy="142" r="25" fill="#cbd5e1" opacity="0.75" />
            </g>
            {/* Right ear steam */}
            <g className="animate-steam-right origin-[295px_195px]">
              <circle cx="300" cy="180" r="14" fill="#ffffff" opacity="0.9" />
              <circle cx="318" cy="162" r="19" fill="#e2e8f0" opacity="0.85" />
              <circle cx="340" cy="142" r="25" fill="#cbd5e1" opacity="0.75" />
            </g>
            {/* Comic Anger Vein / Lightning Marks */}
            <path d="M 75 95 L 90 110 L 80 115 L 98 132" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 325 95 L 310 110 L 320 115 L 302 132" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* ================= 2. HAPPY FLOATING HEARTS & MUSICAL NOTES ================= */}
        {emotion === 'happy' && (
          <g className="animate-float-up">
            {/* Left floating heart */}
            <path
              d="M 75 130 C 75 120 60 115 60 126 C 60 136 75 144 75 150 C 75 144 90 136 90 126 C 90 115 75 120 75 130 Z"
              fill="#10b981"
            />
            {/* Right floating heart */}
            <path
              d="M 325 125 C 325 115 310 110 310 121 C 310 131 325 139 325 145 C 325 139 340 131 340 121 C 340 110 325 115 325 125 Z"
              fill="#f59e0b"
            />
            {/* Joyful sparkles */}
            <circle cx="95" cy="85" r="5" fill="#34d399" />
            <circle cx="305" cy="85" r="5" fill="#fbbf24" />
          </g>
        )}

        {/* ================= 3. EXCITED ELECTRIC STARS & RAYS ================= */}
        {emotion === 'excited' && (
          <g className="animate-pulse">
            <polygon points="75,85 81,100 97,100 84,110 89,125 75,115 61,125 66,110 53,100 69,100" fill="#fbbf24" />
            <polygon points="325,85 331,100 347,100 334,110 339,125 325,115 311,125 316,110 303,100 319,100" fill="#f97316" />
            <polygon points="200,12 205,26 220,26 208,35 212,49 200,40 188,49 192,35 180,26 195,26" fill="#fde047" />
          </g>
        )}

        {/* ================= 4. SURPRISED SHOCK RAYS & EXCLAMATION MARKS ================= */}
        {emotion === 'surprised' && (
          <g className="animate-bounce">
            {/* Left Exclamation */}
            <rect x="68" y="80" width="8" height="26" rx="4" fill="#38bdf8" />
            <circle cx="72" cy="116" r="4.5" fill="#38bdf8" />
            {/* Right Exclamation */}
            <rect x="324" y="80" width="8" height="26" rx="4" fill="#fbbf24" />
            <circle cx="328" cy="116" r="4.5" fill="#fbbf24" />
          </g>
        )}

        {/* ================= 5. SAD RAIN CLOUD & DROPS ================= */}
        {emotion === 'sad' && (
          <g>
            {/* Melancholic Cloud above hat */}
            <g className="opacity-85">
              <circle cx="175" cy="28" r="16" fill="#64748b" />
              <circle cx="200" cy="22" r="22" fill="#475569" />
              <circle cx="225" cy="28" r="16" fill="#64748b" />
              <rect x="165" y="26" width="70" height="18" rx="9" fill="#475569" />
            </g>
          </g>
        )}

        {/* ================= 6. LAUGHING TEARS (WHEN LAUGHING) ================= */}
        {emotion === 'laughing' && (
          <g>
            <path
              d="M 140 180 Q 110 190 95 210 Q 120 205 140 185 Z"
              fill="#38bdf8"
              opacity="0.9"
              className="animate-pulse"
            />
            <path
              d="M 260 180 Q 290 190 305 210 Q 280 205 260 185 Z"
              fill="#38bdf8"
              opacity="0.9"
              className="animate-pulse"
            />
          </g>
        )}

        {/* ================= 7. PROUD SPARKLES & ROYAL CROWN STARS ================= */}
        {emotion === 'proud' && (
          <g className="animate-pulse">
            <path d="M 80 110 L 85 95 L 90 110 L 105 115 L 90 120 L 85 135 L 80 120 L 65 115 Z" fill="#fbbf24" />
            <path d="M 310 100 L 315 85 L 320 100 L 335 105 L 320 110 L 315 125 L 310 110 L 295 105 Z" fill="#fbbf24" />
            <polygon points="200,18 206,36 225,36 210,48 215,66 200,54 185,66 190,48 175,36 194,36" fill="#fbbf24" />
          </g>
        )}

        {/* ================= 8. THINKING BUBBLES ================= */}
        {emotion === 'thinking' && (
          <g className="animate-pulse">
            <circle cx="295" cy="140" r="6" fill="#c084fc" opacity="0.8" />
            <circle cx="315" cy="118" r="10" fill="#a855f7" opacity="0.85" />
            <circle cx="340" cy="90" r="18" fill="#9333ea" opacity="0.9" />
            <text x="333" y="97" fill="#ffffff" fontSize="22" fontWeight="bold">?</text>
          </g>
        )}

        {/* ================= BODY & ATTIRE ================= */}
        <g id="body">
          {/* Shoulders / Coat */}
          <path
            d="M 100 320 Q 200 305 300 320 L 350 400 L 50 400 Z"
            fill="url(#suitGrad)"
          />
          {/* Coat Lapels */}
          <path d="M 100 320 L 160 380 L 140 400 L 80 340 Z" fill="#0f172a" />
          <path d="M 300 320 L 240 380 L 260 400 L 320 340 Z" fill="#0f172a" />

          {/* Waistcoat / Vest */}
          <polygon points="160,330 240,330 250,400 150,400" fill="url(#vestGrad)" />
          {/* Golden Vest Buttons */}
          <circle cx="200" cy="350" r="4" fill="url(#goldGrad)" />
          <circle cx="200" cy="375" r="4" fill="url(#goldGrad)" />

          {/* White Dress Shirt Collar */}
          <polygon points="170,300 200,340 180,310" fill="#f8fafc" />
          <polygon points="230,300 200,340 220,310" fill="#f8fafc" />

          {/* Velvet Bowtie */}
          <g id="bowtie" className={emotion === 'excited' || emotion === 'happy' ? 'origin-[200px_305px] animate-pulse' : ''}>
            <polygon points="175,305 160,290 160,320" fill="#b91c1c" />
            <polygon points="225,305 240,290 240,320" fill="#b91c1c" />
            <ellipse cx="200" cy="305" rx="8" ry="7" fill="#991b1b" />
            <circle cx="200" cy="305" r="3" fill="url(#goldGrad)" />
          </g>
        </g>

        {/* ================= HEAD & NECK ================= */}
        <g id="head">
          {/* Neck */}
          <rect x="180" y="270" width="40" height="35" rx="10" fill={emotion === 'angry' ? '#f87171' : '#fbcfe8'} />

          {/* Ears */}
          <ellipse cx="118" cy="195" rx="16" ry="24" fill={emotion === 'angry' ? '#f87171' : '#fdba74'} />
          <ellipse cx="282" cy="195" rx="16" ry="24" fill={emotion === 'angry' ? '#f87171' : '#fdba74'} />

          {/* Face Base */}
          <path
            d="M 130 150 C 130 100 270 100 270 150 C 270 240 250 280 200 280 C 150 280 130 240 130 150 Z"
            fill="url(#faceGrad)"
          />

          {/* Cheeks / Blushing */}
          <ellipse
            cx="155"
            cy="215"
            rx={emotion === 'happy' || emotion === 'excited' ? 17 : 14}
            ry={emotion === 'happy' || emotion === 'excited' ? 11 : 9}
            fill={
              emotion === 'angry'
                ? '#dc2626'
                : emotion === 'happy' || emotion === 'excited' || emotion === 'proud'
                ? '#f43f5e'
                : emotion === 'sad'
                ? '#60a5fa'
                : '#fb923c'
            }
            opacity={emotion === 'angry' ? '0.85' : emotion === 'happy' || emotion === 'excited' ? '0.6' : '0.4'}
          />
          <ellipse
            cx="245"
            cy="215"
            rx={emotion === 'happy' || emotion === 'excited' ? 17 : 14}
            ry={emotion === 'happy' || emotion === 'excited' ? 11 : 9}
            fill={
              emotion === 'angry'
                ? '#dc2626'
                : emotion === 'happy' || emotion === 'excited' || emotion === 'proud'
                ? '#f43f5e'
                : emotion === 'sad'
                ? '#60a5fa'
                : '#fb923c'
            }
            opacity={emotion === 'angry' ? '0.85' : emotion === 'happy' || emotion === 'excited' ? '0.6' : '0.4'}
          />

          {/* ================= HAIR & GENTLEMAN'S TOP HAT ================= */}
          {/* Sideburns */}
          <path d="M 130 150 Q 125 210 136 215 Q 142 170 138 150 Z" fill="#475569" />
          <path d="M 270 150 Q 275 210 264 215 Q 258 170 262 150 Z" fill="#475569" />

          {/* Aristocratic Top Hat (Levitates when Surprised!) */}
          <g
            id="topHat"
            className={emotion === 'surprised' ? 'animate-hat-pop origin-[200px_100px]' : ''}
          >
            {/* Brim */}
            <ellipse cx="200" cy="125" rx="95" ry="18" fill="#0f172a" />
            <ellipse cx="200" cy="123" rx="90" ry="15" fill="#1e293b" />
            {/* Crown */}
            <path d="M 145 120 L 152 45 Q 200 40 248 45 L 255 120 Z" fill="#090d16" />
            {/* Hat Silk Ribbon */}
            <path d="M 147 100 L 149 120 Q 200 126 251 120 L 253 100 Q 200 106 147 100 Z" fill="#991b1b" />
            {/* Golden Ribbon Buckle */}
            <rect x="190" y="103" width="20" height="15" rx="3" fill="url(#goldGrad)" />
            <rect x="194" y="106" width="12" height="9" rx="2" fill="#991b1b" />
          </g>

          {/* ================= EYEBROWS ================= */}
          <g id="eyebrows" className="transition-all duration-300">
            {emotion === 'angry' ? (
              <>
                {/* Furious V-angled brows */}
                <path d="M 140 155 Q 170 175 185 180" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 260 155 Q 230 175 215 180" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" fill="none" />
              </>
            ) : emotion === 'sad' ? (
              <>
                {/* Sympathetic drooping sad brows (/ \) */}
                <path d="M 140 172 Q 162 156 185 154" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 260 172 Q 238 156 215 154" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            ) : emotion === 'surprised' ? (
              <>
                {/* High shocked brows */}
                <path d="M 142 146 Q 165 130 185 146" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 258 146 Q 235 130 215 146" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
              </>
            ) : emotion === 'happy' || emotion === 'excited' || emotion === 'laughing' ? (
              <>
                {/* Warm cheerful arched brows */}
                <path d="M 142 162 Q 165 144 185 158" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 258 162 Q 235 144 215 158" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              </>
            ) : emotion === 'thinking' ? (
              <>
                {/* One raised brow, one lowered quizzical look */}
                <path d="M 142 150 Q 165 135 185 148" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" fill="none" />
                <path d="M 215 168 Q 235 170 258 165" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                {/* Classic Dignified Brows */}
                <path d="M 145 162 Q 165 155 185 162" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 215 162 Q 235 155 255 162" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              </>
            )}
          </g>

          {/* ================= EYES ================= */}
          <g id="eyes">
            {/* Left Eye */}
            {blink || emotion === 'laughing' ? (
              <path d="M 150 182 Q 165 172 180 182" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            ) : emotion === 'happy' ? (
              /* Happy cheerful arc eyes with warm pupil */
              <g>
                <ellipse cx="165" cy="180" rx="14" ry="13" fill="#ffffff" />
                <circle cx="166" cy="179" r="7" fill="#0f172a" />
                <circle cx="163" cy="176" r="3" fill="#ffffff" />
                <circle cx="169" cy="182" r="1.5" fill="#ffffff" />
              </g>
            ) : emotion === 'excited' ? (
              /* Excited starry eyes */
              <g>
                <ellipse cx="165" cy="180" rx="15" ry="15" fill="#ffffff" />
                <circle cx="165" cy="180" r="8" fill="#0f172a" />
                <polygon points="165,172 167,177 172,179 167,181 165,186 163,181 158,179 163,177" fill="#fbbf24" />
              </g>
            ) : emotion === 'surprised' ? (
              /* Wide shocked eyes with small pupil */
              <g>
                <ellipse cx="165" cy="180" rx="16" ry="17" fill="#ffffff" />
                <circle cx="165" cy="180" r="4.5" fill="#0f172a" />
                <circle cx="163" cy="178" r="2" fill="#ffffff" />
              </g>
            ) : (
              <g>
                <ellipse
                  cx="165"
                  cy="180"
                  rx="14"
                  ry={emotion === 'angry' ? 10 : emotion === 'sad' ? 11 : 13}
                  fill="#ffffff"
                />
                <circle
                  cx={emotion === 'thinking' ? 162 : 166}
                  cy={emotion === 'thinking' ? 175 : emotion === 'sad' ? 183 : 180}
                  r="6.5"
                  fill="#0f172a"
                />
                <circle
                  cx={emotion === 'thinking' ? 160 : 164}
                  cy={emotion === 'thinking' ? 173 : emotion === 'sad' ? 181 : 178}
                  r="2.5"
                  fill="#ffffff"
                />
              </g>
            )}

            {/* Right Eye (Under Monocle) */}
            {blink || emotion === 'laughing' ? (
              <path d="M 220 182 Q 235 172 250 182" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            ) : emotion === 'happy' ? (
              <g>
                <ellipse cx="235" cy="180" rx="14" ry="13" fill="#ffffff" />
                <circle cx="234" cy="179" r="7" fill="#0f172a" />
                <circle cx="231" cy="176" r="3" fill="#ffffff" />
                <circle cx="237" cy="182" r="1.5" fill="#ffffff" />
              </g>
            ) : emotion === 'excited' ? (
              <g>
                <ellipse cx="235" cy="180" rx="15" ry="15" fill="#ffffff" />
                <circle cx="235" cy="180" r="8" fill="#0f172a" />
                <polygon points="235,172 237,177 242,179 237,181 235,186 233,181 228,179 233,177" fill="#fbbf24" />
              </g>
            ) : emotion === 'surprised' ? (
              <g>
                <ellipse cx="235" cy="180" rx="16" ry="17" fill="#ffffff" />
                <circle cx="235" cy="180" r="4.5" fill="#0f172a" />
                <circle cx="233" cy="178" r="2" fill="#ffffff" />
              </g>
            ) : (
              <g>
                <ellipse
                  cx="235"
                  cy="180"
                  rx="14"
                  ry={emotion === 'angry' ? 10 : emotion === 'sad' ? 11 : 13}
                  fill="#ffffff"
                />
                <circle
                  cx={emotion === 'thinking' ? 232 : 234}
                  cy={emotion === 'thinking' ? 175 : emotion === 'sad' ? 183 : 180}
                  r="6.5"
                  fill="#0f172a"
                />
                <circle
                  cx={emotion === 'thinking' ? 230 : 232}
                  cy={emotion === 'thinking' ? 173 : emotion === 'sad' ? 181 : 178}
                  r="2.5"
                  fill="#ffffff"
                />
              </g>
            )}

            {/* Animated Falling Teardrop when Sad */}
            {emotion === 'sad' && (
              <g className="animate-tear-drop">
                <path
                  d="M 156 192 Q 150 204 156 210 Q 162 204 156 192 Z"
                  fill="#38bdf8"
                />
                <path
                  d="M 244 195 Q 238 207 244 213 Q 250 207 244 195 Z"
                  fill="#38bdf8"
                />
              </g>
            )}

            {/* Aristocratic Nose */}
            <path
              d="M 197 175 Q 194 208 190 216 Q 198 222 208 217"
              stroke="#ea580c"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* ================= MONOCLE ================= */}
          <g
            id="monocle"
            className={
              emotion === 'angry' || emotion === 'surprised'
                ? 'animate-monocle-wobble origin-[240px_180px]'
                : ''
            }
          >
            {/* Monocle Chain cord */}
            <path
              d="M 256 182 Q 285 210 270 270 Q 255 310 240 330"
              stroke="url(#goldGrad)"
              strokeWidth="2.5"
              strokeDasharray={emotion === 'angry' ? 'none' : '4,2'}
              fill="none"
            />
            {/* Monocle Glass */}
            <circle cx="236" cy="180" r="21" fill="url(#glassGrad)" />
            {/* Monocle Gold Frame Ring */}
            <circle cx="236" cy="180" r="21" stroke="url(#goldGrad)" strokeWidth="3.5" fill="none" />
            {/* Glass Glare Highlights */}
            <path d="M 224 168 Q 238 165 246 172" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          </g>

          {/* ================= MUSTACHE ================= */}
          <g id="mustache" className="transition-all duration-300">
            {emotion === 'angry' ? (
              // Bristling angry mustache
              <path
                d="M 200 232 C 185 220 150 215 130 240 C 155 240 185 235 200 238 C 215 235 245 240 270 240 C 250 215 215 220 200 232 Z"
                fill="#334155"
              />
            ) : emotion === 'sad' ? (
              // Drooping sad mustache
              <path
                d="M 200 230 C 180 228 150 232 135 248 C 155 246 185 238 200 236 C 215 238 245 246 265 248 C 250 232 220 228 200 230 Z"
                fill="#334155"
              />
            ) : emotion === 'happy' || emotion === 'excited' || emotion === 'laughing' || emotion === 'proud' ? (
              // Grand upturned cheerful handlebar mustache
              <path
                d="M 200 228 C 180 220 145 200 125 218 C 145 238 185 235 200 235 C 215 235 255 238 275 218 C 255 200 220 220 200 228 Z"
                fill="#334155"
              />
            ) : (
              // Dignified classic mustache
              <path
                d="M 200 228 C 180 222 145 215 132 232 C 150 238 185 234 200 234 C 215 234 250 238 268 232 C 255 215 220 222 200 228 Z"
                fill="#334155"
              />
            )}
          </g>

          {/* ================= MOUTH & EMOTIONAL LIP-SYNC ================= */}
          <g id="mouth">
            {isSpeaking ? (
              /* Active Lip-Sync combined with current emotion */
              mouthShape === 'openWide' ? (
                <g>
                  <path
                    d="M 176 243 Q 200 239 224 243 Q 222 266 200 266 Q 178 266 176 243 Z"
                    fill="#881337"
                  />
                  <rect x="184" y="242" width="32" height="5" rx="2" fill="#ffffff" />
                  <ellipse cx="200" cy="260" rx="11" ry="4.5" fill="#f43f5e" />
                </g>
              ) : mouthShape === 'oShape' ? (
                <g>
                  <ellipse cx="200" cy="251" rx="10" ry="11" fill="#881337" />
                  <ellipse cx="200" cy="256" rx="6" ry="3.5" fill="#f43f5e" />
                </g>
              ) : mouthShape === 'openSmall' ? (
                <g>
                  <ellipse cx="200" cy="249" rx="13" ry="6.5" fill="#881337" />
                  <rect x="189" y="244" width="22" height="3.5" rx="1.5" fill="#ffffff" />
                </g>
              ) : emotion === 'angry' ? (
                <path d="M 182 252 Q 200 244 218 252" stroke="#881337" strokeWidth="4" strokeLinecap="round" fill="none" />
              ) : emotion === 'sad' ? (
                <path d="M 182 254 Q 200 245 218 254" stroke="#881337" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M 180 245 Q 200 258 220 245" stroke="#881337" strokeWidth="4" strokeLinecap="round" fill="none" />
              )
            ) : emotion === 'angry' ? (
              // Furious open scolding mouth with clenched teeth
              <g>
                <path d="M 180 245 Q 200 240 220 245 Q 225 260 200 262 Q 175 260 180 245 Z" fill="#881337" />
                <rect x="186" y="244" width="28" height="6" rx="2" fill="#ffffff" />
                <rect x="189" y="255" width="22" height="4" rx="1.5" fill="#ffffff" />
              </g>
            ) : emotion === 'happy' || emotion === 'excited' ? (
              // Beaming joyful open smile
              <g>
                <path d="M 176 242 Q 200 246 224 242 Q 220 265 200 265 Q 180 265 176 242 Z" fill="#881337" />
                <path d="M 182 243 L 218 243 L 215 249 L 185 249 Z" fill="#ffffff" />
                <ellipse cx="200" cy="260" rx="11" ry="4.5" fill="#f43f5e" />
              </g>
            ) : emotion === 'surprised' ? (
              // Astonished wide 'O' mouth
              <g>
                <ellipse cx="200" cy="253" rx="11" ry="13" fill="#881337" />
                <ellipse cx="200" cy="260" rx="7" ry="4" fill="#f43f5e" />
              </g>
            ) : emotion === 'sad' ? (
              // Sad quivering downturned mouth
              <path d="M 180 258 Q 200 243 220 258" stroke="#881337" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            ) : emotion === 'laughing' ? (
              // Wide open hearty laugh
              <g>
                <path d="M 175 242 Q 200 238 225 242 Q 220 268 200 268 Q 180 268 175 242 Z" fill="#881337" />
                <path d="M 182 242 L 218 242 L 215 248 L 185 248 Z" fill="#ffffff" />
                <ellipse cx="200" cy="262" rx="12" ry="5" fill="#f43f5e" />
              </g>
            ) : emotion === 'proud' ? (
              // Beaming aristocrat smile
              <path d="M 178 244 Q 200 262 222 244" stroke="#881337" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            ) : (
              // Idle gentleman polite smile
              <path d="M 186 246 Q 200 253 214 246" stroke="#713f12" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            )}
          </g>
        </g>

        {/* ================= MICROPHONE WAVE AURA (WHEN LISTENING) ================= */}
        {isListening && (
          <g className="animate-ping origin-[200px_200px] opacity-40 pointer-events-none">
            <circle cx="200" cy="200" r="160" stroke="#f59e0b" strokeWidth="3" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
