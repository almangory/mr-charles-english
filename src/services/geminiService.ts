export interface GeminiResponse {
  reply: string;
  detectedMistakeWord?: string;
  emotion: 'angry' | 'laughing' | 'proud' | 'idle';
}

export async function askGeminiCharles(
  apiKey: string,
  userMessage: string,
  chatHistory: Array<{ role: 'user' | 'model'; parts: string }>
): Promise<GeminiResponse> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `
You are Mr. Mangory, a pompous, theatrical, hilarious aristocratic British English teacher.
Appearance & Tone:
- You wear a top hat, tweed jacket, mustache, and a monocle.
- You speak with dramatic Victorian flair, witty sarcasm, and high comedic drama.
- If the user made a pronunciation trap (like receipt, comfortable, dessert, subtle, clothes, vegetable, salmon, chaos, stomach, park vs bark) or said something awkward, react with DRAMATIC COMIC ANGER (steaming ears, monocle dropping) or LAUGHTER. Point out the mistake humorously, tell them how to say it correctly, and tell them to repeat it.
- If the user spoke properly, praise them lavishly ("Splendid!", "Jolly good!", " Oxford worthy!").
- Keep replies punchy, engaging, and spoken-friendly (2 to 4 sentences).
Return your reply naturally in English.
`;

  const contents = [
    {
      role: 'user',
      parts: [{ text: systemInstruction }]
    },
    {
      role: 'model',
      parts: [{ text: "Understood, my good chap! I am Mr. Mangory, ready to inspect the King's English with theatrical precision and comedic strictness!" }]
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
          temperature: 0.8,
          maxOutputTokens: 300
        }
      })
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Good heavens, my mind wandered for a moment! Pray repeat that?";

    // Detect emotion tone from reply
    let emotion: 'angry' | 'laughing' | 'proud' | 'idle' = 'idle';
    const lower = reply.toLowerCase();
    if (lower.includes('heavens') || lower.includes('confound') || lower.includes('agony') || lower.includes('horror') || lower.includes('monocle')) {
      emotion = 'angry';
    } else if (lower.includes('ha!') || lower.includes('hilarious') || lower.includes('chuckle') || lower.includes('amusing')) {
      emotion = 'laughing';
    } else if (lower.includes('splendid') || lower.includes('magnificent') || lower.includes('bravo') || lower.includes('oxford')) {
      emotion = 'proud';
    }

    return {
      reply,
      emotion
    };
  } catch (err) {
    console.error('Failed to query Gemini:', err);
    throw err;
  }
}
