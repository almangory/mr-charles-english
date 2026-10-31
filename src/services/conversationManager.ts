import confetti from 'canvas-confetti';
import type { ScenarioTopic } from './pronunciationDictionary';
import type { AvatarEmotion } from '../components/Avatar/MrCharlesAvatar';

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

// Interactive Scenario Fallback Responses
export function generateCharlesResponse(
  userQuery: string,
  _scenario?: ScenarioTopic
): { replyText: string; emotion: AvatarEmotion } {
  const query = userQuery.toLowerCase();

  // Weather questions
  if (query.includes('weather') || query.includes('rain') || query.includes('sun')) {
    return {
      replyText:
        "Ah, the British weather! It is predictably dreadful, drizzling with melancholy! But a true gentleman carries an umbrella and maintains stiff upper lip composure. How is the weather where you reside?",
      emotion: 'idle'
    };
  }

  // Tea questions
  if (query.includes('tea') || query.includes('milk') || query.includes('scone') || query.includes('earl grey')) {
    return {
      replyText:
        "Capital question! Rule of thumb: Warm the porcelain teapot first, steep the loose Earl Grey for precisely four minutes, and NEVER add sugar like a barbarian! A splash of whole milk afterwards, and you have heaven in a cup!",
      emotion: 'proud'
    };
  }

  // Job interview / Career
  if (query.includes('job') || query.includes('interview') || query.includes('hire') || query.includes('experience')) {
    return {
      replyText:
        "Fascinating! Confidence without arrogance is the hallmark of distinction. In an interview, maintain steady eye contact, pronounce your consonants like sharp rapiers, and explain how you solve crises with calm intellect!",
      emotion: 'idle'
    };
  }

  // Greetings
  if (query.includes('hello') || query.includes('hi') || query.includes('good morning') || query.includes('charles')) {
    return {
      replyText:
        "Jolly good day to you, my dear chap! Your greeting was polite and civilized. What grand topic shall we conquer today in the realm of the King's English?",
      emotion: 'proud'
    };
  }

  // How are you
  if (query.includes('how are you') || query.includes('how do you do')) {
    return {
      replyText:
        "I am feeling exceptionally splendid, thank you! Sitting comfortably with my favorite book and piping hot tea. How fares your day, my ambitious student?",
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

  // Food / Dining
  if (query.includes('food') || query.includes('eat') || query.includes('dinner') || query.includes('lunch')) {
    return {
      replyText:
        "Superb! If you are in London, a classic Sunday roast with Yorkshire pudding is essential! And remember: table manners reflect the soul!",
      emotion: 'idle'
    };
  }

  // Generic witty responses
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
