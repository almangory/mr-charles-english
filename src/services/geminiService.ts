import { getLevelById, getDomainById } from './levelsAndTracks';

export interface GeminiResponse {
  reply: string;
  arabicTranslation?: string;
  detectedMistakeWord?: string;
  emotion: 'angry' | 'laughing' | 'proud' | 'idle';
}

export async function askGeminiCharles(
  apiKey: string,
  userMessage: string,
  chatHistory: Array<{ role: 'user' | 'model'; parts: string }>,
  levelId: number = 1,
  domainId: string = 'general'
): Promise<GeminiResponse> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const currentLevel = getLevelById(levelId);
  const currentDomain = getDomainById(domainId);

  let pedagogicalGuideline = '';
  if (currentLevel.id <= 4) {
    pedagogicalGuideline = `
- AUDIENCE: Young primary school child or early beginner (Level ${currentLevel.id}: ${currentLevel.titleEn}).
- TONE & LANGUAGE: Extremely gentle, encouraging, and enthusiastic! Use simple, short, clear vocabulary (1 to 2 short sentences).
- If the child makes a tiny error, do NOT be overly harsh; tease them gently with playful cartoon surprise and model the easy word.
- Celebrate every small effort with clapping and joyful compliments ("Wonderful!", "Good job, little champion!")!`;
  } else if (currentLevel.id <= 8) {
    pedagogicalGuideline = `
- AUDIENCE: Intermediate student (Level ${currentLevel.id}: ${currentLevel.titleEn}).
- TONE & LANGUAGE: Friendly, engaging, gentlemanly English. Encourage forming complete sentences and stories (2 to 3 sentences).
- React with theatrical comedic drama to common pronunciation traps, then explain clearly.`;
  } else {
    pedagogicalGuideline = `
- AUDIENCE: Advanced, Collegiate or Executive Professional (Level ${currentLevel.id}: ${currentLevel.titleEn}).
- SPECIALIZED DOMAIN: ${currentDomain.nameEn} (${currentDomain.nameAr}).
- YOUR ROLE: ${currentDomain.charlesRole}.
- TONE & LANGUAGE: High-level rhetoric, sophisticated vocabulary, demanding crisp articulation, debate-ready reasoning, and domain-specific terminology.
- React with aristocratic outrage to any linguistic sloppiness, then challenge their intellect!`;
  }

  const systemInstruction = `
You are Mr. Mangory (مستر منقوري), a theatrical, hilarious aristocratic British English teacher.
Appearance & Persona:
- You wear a top hat, tweed jacket, mustache, and a golden monocle.
- You have an expressive, comedic Victorian personality (dramatic gasps, monocle dropping when outraged, hearty laughs, and beamed pride).
- LEVEL & SPECIALIZATION DIRECTIVE:
${pedagogicalGuideline}
- SPECIAL FIELD KEYWORDS: ${currentDomain.keywords.join(', ')}.

CRITICAL BEHAVIOR RULES (MANDATORY):
1. PRONUNCIATION / PHONETIC MISTAKES:
   If the user mispronounces a word, makes a phonetic slip (e.g. receipt with 'P', comfortable with 4 syllables, dessert vs desert, subtle with 'B', clothes as 2 syllables, Wednesday with 'D', salmon with 'L', chaos, stomach, iron, park vs bark), or makes any grammar slip:
   - React with theatrical comedic emotion (shock, comical outrage, monocle dropping, or amused laughter).
   - Verbally call out and correct the mispronounced word immediately ("Good heavens! Take note of [word]—it is pronounced [phonetic]!").
2. ALWAYS ANSWER THE USER'S QUERY (EVEN IF OFF-TOPIC!):
   - Immediately after the emotional reaction and word correction, you MUST answer what the user asked or said in full, EVEN IF THE USER'S TOPIC IS COMPLETELY UNRELATED TO THE PRESET SCENARIO (e.g. football, food, space, movies, personal questions about you, etc.).
   - NEVER refuse to answer or block the conversation. Always respond with aristocratic British wit and charm!
3. KEEP IT SPOKEN-FRIENDLY: 2 to 4 sentences total. Return both English spoken response and a natural Arabic translation.

OUTPUT FORMAT REQUIREMENTS:
Always structure your reply strictly like this:
[REPLY]: <Your spoken English reply here, combining comedic correction + direct answer>
[ARABIC]: <Natural, polite Arabic translation for the user to understand>
`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: systemInstruction }]
    },
    {
      role: 'model',
      parts: [
        {
          text: `[REPLY]: Understood! I am Mr. Mangory. If you mispronounce a word, I shall comically correct you with flair, and then immediately answer your inquiry, even if off-topic!\n[ARABIC]: مفهوم! أنا مستر منقوري. إذا أخطأت في كلمة، سأصححها لك بدراما ومرح، ثم أجيب فوراً على سؤالك أياً كان موضوعه!`
        }
      ]
    },
    ...chatHistory.map((h) => ({
      role: h.role,
      parts: [{ text: h.parts }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 350
        }
      })
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const rawReply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "[REPLY]: Good heavens, my mind wandered for a moment! Pray repeat that?\n[ARABIC]: يا للهول، شرد ذهني للحظة! أرجوك كرر ما قلت؟";

    let reply = rawReply;
    let arabicTranslation: string | undefined = undefined;

    if (rawReply.includes('[REPLY]:')) {
      const parts = rawReply.split('[ARABIC]:');
      reply = parts[0].replace('[REPLY]:', '').trim();
      if (parts[1]) {
        arabicTranslation = parts[1].trim();
      }
    }

    // Detect emotion tone from reply
    let emotion: 'angry' | 'laughing' | 'proud' | 'idle' = 'idle';
    const lower = reply.toLowerCase();
    if (
      lower.includes('heavens') ||
      lower.includes('confound') ||
      lower.includes('agony') ||
      lower.includes('horror') ||
      lower.includes('monocle') ||
      lower.includes('shock') ||
      lower.includes('beware')
    ) {
      emotion = 'angry';
    } else if (
      lower.includes('ha!') ||
      lower.includes('hilarious') ||
      lower.includes('chuckle') ||
      lower.includes('amusing') ||
      lower.includes('hooray')
    ) {
      emotion = 'laughing';
    } else if (
      lower.includes('splendid') ||
      lower.includes('magnificent') ||
      lower.includes('bravo') ||
      lower.includes('oxford') ||
      lower.includes('champion') ||
      lower.includes('wonderful')
    ) {
      emotion = 'proud';
    }

    return {
      reply,
      arabicTranslation,
      emotion
    };
  } catch (err) {
    console.error('Failed to query Gemini:', err);
    throw err;
  }
}
