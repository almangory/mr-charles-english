import confetti from 'canvas-confetti';
import type { ScenarioTopic } from './pronunciationDictionary';
import type { AvatarEmotion } from '../components/Avatar/MrCharlesAvatar';
import { getLevelById, getDomainById } from './levelsAndTracks';

export interface Message {
  id: string;
  sender: 'user' | 'charles';
  text: string;
  arabicTranslation?: string;
  isCorrectionNotice?: boolean;
  timestamp: Date;
}

export interface UserStats {
  poshPoints: number;
  streak: number;
  correctedWordsCount: number;
  rankTitle: string;
}

export function calculateRank(points: number): string {
  if (points < 60) return 'متدرب مبتدئ (Tea Novice)';
  if (points < 180) return 'تلميذ الشاي الأنيق (Polite Apprentice)';
  if (points < 350) return 'جنتلمان إنجليزي (Posh Gentleman)';
  if (points < 600) return 'فارس البلاط الملكي (Royal Knight of Grammar)';
  return "لورد الطلاقة الإنجليزية (Master of the King's English 👑)";
}

// Interactive Scenario & Level & Domain-Aware Fallback Responses
export function generateCharlesResponse(
  userQuery: string,
  _scenario?: ScenarioTopic,
  levelId: number = 1,
  domainId: string = 'general'
): { replyText: string; emotion: AvatarEmotion } {
  const query = userQuery.toLowerCase();
  const level = getLevelById(levelId);
  const domain = getDomainById(domainId);

  // ================= 1. PRIMARY SCHOOL / EARLY KIDS (LEVELS 1 - 4) =================
  if (level.id <= 4) {
    if (query.includes('hello') || query.includes('hi') || query.includes('mangory')) {
      return {
        replyText: "Hello, my little superstar! It is so wonderful to hear your cheerful voice! Are you ready to play with English words?",
        emotion: 'proud'
      };
    }
    if (query.includes('red') || query.includes('blue') || query.includes('green') || query.includes('color') || query.includes('yellow')) {
      return {
        replyText: "Ooh! What a beautiful, bright color! Just like a sparkling rainbow! Can you tell me your other favorite color?",
        emotion: 'proud'
      };
    }
    if (query.includes('cat') || query.includes('dog') || query.includes('bird') || query.includes('puppy') || query.includes('animal')) {
      return {
        replyText: "Aha! Animals are amazing! A cat says meow, and a little puppy wags its tail! Do you have a pet at home?",
        emotion: 'proud'
      };
    }
    if (query.includes('apple') || query.includes('banana') || query.includes('food') || query.includes('milk') || query.includes('ice cream')) {
      return {
        replyText: "Yummy! That sounds so tasty and sweet! Fresh healthy food gives you big energy to learn and play!",
        emotion: 'proud'
      };
    }
    if (query.includes('car') || query.includes('toy') || query.includes('ball') || query.includes('game')) {
      return {
        replyText: "Yay! Playing games is so much fun! You are doing such a brilliant job speaking English!",
        emotion: 'proud'
      };
    }
    // Kids General Encouragement
    const kidsPraise = [
      "Good job, little champion! That was spoken so clearly and nicely! Tell me what else you like!",
      "Hooray! You are learning so fast, my young friend! Can you say another sentence for Mr. Mangory?",
      "Splendid! A big golden star for your wonderful English! Keep speaking proudly!"
    ];
    return {
      replyText: kidsPraise[Math.floor(Math.random() * kidsPraise.length)],
      emotion: 'proud'
    };
  }

  // ================= 2. SPECIALIZED PROFESSIONAL DOMAINS (LEVELS 9 - 12) =================
  if (level.id >= 9) {
    if (domain.id === 'tech') {
      if (query.includes('database') || query.includes('latency') || query.includes('cache') || query.includes('api')) {
        return {
          replyText: "A rigorous architectural inquiry! Optimizing database connection pooling and deploying edge KV caching dramatically reduces P99 latency. How do you handle cache invalidation across distributed nodes?",
          emotion: 'proud'
        };
      }
      return {
        replyText: "Spoken like a seasoned software engineer! Writing scalable, decoupled microservices with comprehensive automated testing is the gold standard of modern engineering. Pray elaborate on your tech stack!",
        emotion: 'proud'
      };
    }

    if (domain.id === 'medicine') {
      if (query.includes('patient') || query.includes('pain') || query.includes('symptom') || query.includes('treatment')) {
        return {
          replyText: "A crucial clinical scenario! Prioritizing differential diagnosis while ensuring empathetic patient communication is essential in emergency triage. What laboratory biomarkers would you investigate first?",
          emotion: 'proud'
        };
      }
      return {
        replyText: "Remarkable clinical acumen! Precision in medical terminology paired with active listening saves lives. What clinical case study shall we dissect next?",
        emotion: 'proud'
      };
    }

    if (domain.id === 'business') {
      if (query.includes('market') || query.includes('revenue') || query.includes('roi') || query.includes('customer') || query.includes('pitch')) {
        return {
          replyText: "Capital strategic analysis! Demonstrating strong unit economics and a scalable customer acquisition flywheel is what truly convinces top-tier venture capitalists. What is your projected runway?",
          emotion: 'proud'
        };
      }
      return {
        replyText: "Sharp commercial intellect! In business negotiations, discovering the counterparty's unstated priorities yields the ultimate strategic leverage. Pray continue your proposal!",
        emotion: 'proud'
      };
    }

    if (domain.id === 'tourism') {
      return {
        replyText: "Exquisite hospitality! Discerning global travelers expect seamless white-glove concierge service and impeccable British etiquette. How do you tailor VIP itineraries for royal delegations?",
        emotion: 'proud'
      };
    }

    if (domain.id === 'law') {
      return {
        replyText: "A formidable legal argument! Ensuring bilateral enforceability and minimizing jurisdictional ambiguities under international arbitration treaties protects sovereign client interests. What precedents support your stance?",
        emotion: 'proud'
      };
    }

    if (domain.id === 'engineering') {
      return {
        replyText: "Robust structural analysis! Balancing tensile strength tolerances with seismic damping parameters is the hallmark of master architecture. What safety factor did your team calibrate for this design?",
        emotion: 'proud'
      };
    }
  }

  // ================= 3. INTERMEDIATE & GENERAL CONVERSATION (LEVELS 5 - 8) =================
  // Weather
  if (query.includes('weather') || query.includes('rain') || query.includes('sun')) {
    return {
      replyText:
        "Ah, the British weather! It is predictably dreadful, drizzling with melancholy! But a true gentleman carries an umbrella and maintains stiff upper lip composure. How is the weather where you reside?",
      emotion: 'idle'
    };
  }

  // Tea
  if (query.includes('tea') || query.includes('milk') || query.includes('scone') || query.includes('earl grey')) {
    return {
      replyText:
        "Capital question! Rule of thumb: Warm the porcelain teapot first, steep the loose Earl Grey for precisely four minutes, and NEVER add sugar like a barbarian! A splash of whole milk afterwards, and you have heaven in a cup!",
      emotion: 'proud'
    };
  }

  // Job / Career
  if (query.includes('job') || query.includes('interview') || query.includes('hire') || query.includes('experience')) {
    return {
      replyText:
        "Fascinating! Confidence without arrogance is the hallmark of distinction. In an interview, maintain steady eye contact, pronounce your consonants like sharp rapiers, and explain how you solve crises with calm intellect!",
      emotion: 'idle'
    };
  }

  // Greetings
  if (query.includes('hello') || query.includes('hi') || query.includes('good morning') || query.includes('mangory') || query.includes('charles')) {
    return {
      replyText:
        "Jolly good day to you, my dear chap! I am Mr. Mangory. Your greeting was polite and civilized. What grand topic shall we conquer today in the realm of the King's English?",
      emotion: 'proud'
    };
  }

  // Travel & London
  if (query.includes('london') || query.includes('train') || query.includes('ticket') || query.includes('hotel')) {
    return {
      replyText:
        "Ah, London! Mind the gap between the train and the platform! Do take a stroll along Westminster and admire Big Ben, but beware of pigeons in Trafalgar Square!",
      emotion: 'idle'
    };
  }

  // Default Intermediate Witty Responses
  const fallbacks = [
    {
      replyText:
        "Indeed! An intriguing thought. You expressed that with admirable clarity. Tell me more, what led you to that conclusion?",
      emotion: 'proud' as AvatarEmotion
    },
    {
      replyText:
        "Fascinating perspective! One could almost believe you spent a semester punting on the river in Cambridge. Pray continue!",
      emotion: 'idle' as AvatarEmotion
    },
    {
      replyText:
        "Well spoken! My monocle remains securely on my face, which means your pronunciation was civilized and pleasing to my ears!",
      emotion: 'proud' as AvatarEmotion
    }
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Fire celebratory confetti
export function triggerCelebrationConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#ec4899']
  });
}
