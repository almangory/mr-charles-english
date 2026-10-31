import React, { useEffect, useState } from 'react';

export type AvatarEmotion =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'angry'
  | 'laughing'
  | 'proud';

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
    }, 3800);
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
    }, 130);

    return () => clearInterval(lipInterval);
  }, [isSpeaking]);

  const sizeClasses = {
    sm: 'w-44 h-44',
    md: 'w-64 h-64',
    lg: 'w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96'
  }[size];

  // Dynamic animation classes based on emotion
  const getContainerAnimation = () => {
    if (emotion === 'angry') return 'animate-dramatic-shake';
    if (emotion === 'laughing') return 'animate-laugh-bounce';
    if (emotion === 'listening') return 'scale-105 transition-transform duration-300';
    if (emotion === 'idle') return 'animate-gentleman-bob';
    return '';
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeClasses} ${getContainerAnimation()}`}>
      {/* Background Aura / Mood Glow */}
      <div
        className={`absolute inset-4 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
          emotion === 'angry'
            ? 'bg-rose-600/40 scale-125'
            : emotion === 'laughing'
            ? 'bg-amber-400/35 scale-110'
            : emotion === 'proud'
            ? 'bg-emerald-400/35 scale-125'
            : isListening
            ? 'bg-amber-500/30 scale-115 animate-pulse'
            : 'bg-indigo-600/20'
        }`}
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
            <stop offset="0%" stopColor={emotion === 'angry' ? '#fca5a5' : '#fed7aa'} />
            <stop offset="100%" stopColor={emotion === 'angry' ? '#ef4444' : '#f97316'} />
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
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="40%" stopColor="rgba(186,230,253,0.3)" />
            <stop offset="100%" stopColor="rgba(14,165,233,0.2)" />
          </linearGradient>

          {/* Gold Trim */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* ================= STEAM PUFFS (WHEN ANGRY) ================= */}
        {emotion === 'angry' && (
          <g>
            {/* Left ear steam */}
            <g className="animate-steam-left origin-[105px_195px]">
              <circle cx="100" cy="180" r="14" fill="#ffffff" opacity="0.9" />
              <circle cx="85" cy="165" r="18" fill="#e2e8f0" opacity="0.85" />
              <circle cx="65" cy="150" r="24" fill="#cbd5e1" opacity="0.75" />
            </g>
            {/* Right ear steam */}
            <g className="animate-steam-right origin-[295px_195px]">
              <circle cx="300" cy="180" r="14" fill="#ffffff" opacity="0.9" />
              <circle cx="315" cy="165" r="18" fill="#e2e8f0" opacity="0.85" />
              <circle cx="335" cy="150" r="24" fill="#cbd5e1" opacity="0.75" />
            </g>
          </g>
        )}

        {/* ================= LAUGHING TEARS (WHEN LAUGHING) ================= */}
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

        {/* ================= PROUD SPARKLES & STARS ================= */}
        {emotion === 'proud' && (
          <g className="animate-pulse">
            {/* Sparkle 1 */}
            <path d="M 80 110 L 85 95 L 90 110 L 105 115 L 90 120 L 85 135 L 80 120 L 65 115 Z" fill="#fbbf24" />
            {/* Sparkle 2 */}
            <path d="M 310 100 L 315 85 L 320 100 L 335 105 L 320 110 L 315 125 L 310 110 L 295 105 Z" fill="#fbbf24" />
            {/* Top Star */}
            <polygon points="200,20 206,38 225,38 210,50 215,68 200,56 185,68 190,50 175,38 194,38" fill="#fbbf24" />
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
          <g id="bowtie">
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
            rx="14"
            ry="9"
            fill={emotion === 'angry' ? '#dc2626' : emotion === 'proud' ? '#f472b6' : '#fb923c'}
            opacity={emotion === 'angry' ? '0.85' : '0.4'}
          />
          <ellipse
            cx="245"
            cy="215"
            rx="14"
            ry="9"
            fill={emotion === 'angry' ? '#dc2626' : emotion === 'proud' ? '#f472b6' : '#fb923c'}
            opacity={emotion === 'angry' ? '0.85' : '0.4'}
          />

          {/* ================= HAIR & GENTLEMAN'S TOP HAT ================= */}
          {/* Sideburns */}
          <path d="M 130 150 Q 125 210 136 215 Q 142 170 138 150 Z" fill="#475569" />
          <path d="M 270 150 Q 275 210 264 215 Q 258 170 262 150 Z" fill="#475569" />

          {/* Aristocratic Top Hat */}
          <g id="topHat">
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
                <path d="M 140 155 Q 170 175 185 180" stroke="#1e293b" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                <path d="M 260 155 Q 230 175 215 180" stroke="#1e293b" strokeWidth="5.5" strokeLinecap="round" fill="none" />
              </>
            ) : emotion === 'laughing' ? (
              <>
                {/* High arched amused brows */}
                <path d="M 142 165 Q 165 145 185 162" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 258 165 Q 235 145 215 162" stroke="#1e293b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
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
              <path d="M 150 182 Q 165 175 180 182" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            ) : (
              <g>
                <ellipse cx="165" cy="180" rx="14" ry={emotion === 'angry' ? 10 : 13} fill="#ffffff" />
                <circle cx={emotion === 'thinking' ? 162 : 166} cy={emotion === 'thinking' ? 175 : 180} r="6.5" fill="#0f172a" />
                <circle cx={emotion === 'thinking' ? 160 : 164} cy={emotion === 'thinking' ? 173 : 178} r="2.5" fill="#ffffff" />
              </g>
            )}

            {/* Right Eye (Under Monocle) */}
            {blink || emotion === 'laughing' ? (
              <path d="M 220 182 Q 235 175 250 182" stroke="#0f172a" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            ) : (
              <g>
                <ellipse cx="235" cy="180" rx="14" ry={emotion === 'angry' ? 10 : 13} fill="#ffffff" />
                <circle cx={emotion === 'thinking' ? 232 : 234} cy={emotion === 'thinking' ? 175 : 180} r="6.5" fill="#0f172a" />
                <circle cx={emotion === 'thinking' ? 230 : 232} cy={emotion === 'thinking' ? 173 : 178} r="2.5" fill="#ffffff" />
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
            className={emotion === 'angry' ? 'animate-monocle-wobble origin-[240px_180px]' : ''}
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
            ) : emotion === 'laughing' || emotion === 'proud' ? (
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

          {/* ================= MOUTH & LIP-SYNC ================= */}
          <g id="mouth">
            {emotion === 'angry' ? (
              // Furious open scolding mouth with clenched teeth
              <g>
                <path d="M 180 245 Q 200 240 220 245 Q 225 260 200 262 Q 175 260 180 245 Z" fill="#881337" />
                {/* Top teeth */}
                <rect x="186" y="244" width="28" height="6" rx="2" fill="#ffffff" />
                {/* Bottom teeth */}
                <rect x="189" y="255" width="22" height="4" rx="1.5" fill="#ffffff" />
              </g>
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
            ) : isSpeaking ? (
              // Live Lip-sync shapes
              mouthShape === 'openWide' ? (
                <ellipse cx="200" cy="249" rx="14" ry="10" fill="#881337" />
              ) : mouthShape === 'oShape' ? (
                <circle cx="200" cy="249" r="8" fill="#881337" />
              ) : mouthShape === 'openSmall' ? (
                <ellipse cx="200" cy="248" rx="11" ry="5" fill="#881337" />
              ) : (
                <path d="M 186 248 Q 200 252 214 248" stroke="#881337" strokeWidth="3" strokeLinecap="round" fill="none" />
              )
            ) : (
              // Idle gentleman mouth
              <path d="M 188 247 Q 200 250 212 247" stroke="#713f12" strokeWidth="3" strokeLinecap="round" fill="none" />
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
