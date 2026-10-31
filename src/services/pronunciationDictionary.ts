export interface PronunciationTrap {
  word: string;
  phonetic: string;
  arabicHint: string;
  commonMistakes: string[];
  angryQuote: string;
  successQuote: string;
  explanation: string;
  audioSampleText: string;
}

export const PRONUNCIATION_TRAPS: Record<string, PronunciationTrap> = {
  receipt: {
    word: "receipt",
    phonetic: "/rɪˈsiːt/",
    arabicHint: "رِي-سِيتْ (بدون نطق حرف P نهائياً)",
    commonMistakes: ["re-seept", "reseept", "receept", "recipe", "recept"],
    angryQuote: "Good heavens! Did you just pronounce the 'P' in receipt?! By Queen Victoria's ghost, the 'P' has been dead and silent for four hundred years! It is re-SEET!",
    successQuote: "Splendid! Simply brilliant! The 'P' remains properly buried, and your receipt is spotless!",
    explanation: "حرف P صامت تماماً في هذه الكلمة. تُنطق: ri-SEET.",
    audioSampleText: "receipt. You do not pronounce the P. It is receipt."
  },
  comfortable: {
    word: "comfortable",
    phonetic: "/ˈkʌmftərbəl/",
    arabicHint: "كَمْف-تَر-بُلْ (3 مقاطع فقط وليس 4)",
    commonMistakes: ["com-for-ta-ble", "comfort-able", "comfor-table"],
    angryQuote: "Com-for-ta-ble?! What agony to my ears! Nobody in the civilized kingdom stretches it into four syllables! It is three crisp, elegant syllables: KUMF-ter-bul!",
    successQuote: "Ahhh! Now that feels truly comfortable! Spoken like an Oxford scholar!",
    explanation: "تُنطق في ثلاثة مقاطع سريعة: KUMF-ter-bul وليس com-for-ta-ble.",
    audioSampleText: "comfortable. Three syllables: comfortable."
  },
  dessert: {
    word: "dessert",
    phonetic: "/dɪˈzɜːrt/",
    arabicHint: "دِ-زِيرْتْ (الحلوى، بالتشديد على المقطع الثاني)",
    commonMistakes: ["desert", "dezert", "desser"],
    angryQuote: "Hold your horses! Did you just order a DESERT?! A Sahara of dry hot sand and scorpions for your dinner?! You desire des-SERT with two S's, sweet as pudding! Say: dih-ZURT!",
    successQuote: "Delicious! That sounded sweet and glorious! Now you shall have your pudding!",
    explanation: "كلمة desert تعني الصحراء (DEZ-ert)، بينما dessert تعني الحلوى (dih-ZURT).",
    audioSampleText: "dessert. Put the stress at the end: dessert."
  },
  subtle: {
    word: "subtle",
    phonetic: "/ˈsʌt.əl/",
    arabicHint: "سَتَلْ (حرف B صامت تماماً)",
    commonMistakes: ["sub-tle", "subtle", "sub-tal"],
    angryQuote: "Sub-tle?! Confound it! The 'B' in subtle is so wonderfully subtle that IT DOES NOT EXIST! It fled the scene! Say: SUT-ul!",
    successQuote: "Magnificent! Elegant and properly subtle!",
    explanation: "حرف B صامت تماماً. تُنطق ببساطة: SUT-ul.",
    audioSampleText: "subtle. The B is completely silent: subtle."
  },
  wednesday: {
    word: "wednesday",
    phonetic: "/ˈwɛnzdeɪ/",
    arabicHint: "وِينْز-دِي (بدون نطق حرف D)",
    commonMistakes: ["wed-nes-day", "wednes-day", "wednesday"],
    angryQuote: "Wed-nes-day?! What on earth is a Wed-nes-day?! The 'D' took a holiday to the Bahamas! It is crisp and simple: WENZ-day!",
    successQuote: "Jolly good! Now your week can proceed with dignity!",
    explanation: "حرف D صامت. تُنطق: WENZ-day.",
    audioSampleText: "Wednesday. It sounds like Wenz-day."
  },
  clothes: {
    word: "clothes",
    phonetic: "/kloʊðz/ or /kloʊz/",
    arabicHint: "كْلُوزْ (مقطع واحد مثل كلمة Close)",
    commonMistakes: ["cloth-es", "cloths", "clothees"],
    angryQuote: "Cloth-es?! Are you an ancient Victorian monk reciting incantations?! It is ONE single syllable! It rhymes with 'close the door'! Say: CLOTHES!",
    successQuote: "Exquisite! You wear the King's English with style!",
    explanation: "تُنطق كمقطع واحد سريع (كأنها Close)، ولا تُنطق أبداً cloth-es مقطعين.",
    audioSampleText: "clothes. Just one syllable, like close."
  },
  island: {
    word: "island",
    phonetic: "/ˈaɪlənd/",
    arabicHint: "آي-لَنْدْ (حرف S صامت تماماً)",
    commonMistakes: ["is-land", "is land", "izland"],
    angryQuote: "IS-land?! Bless my monocle! Did someone drop ice down your collar?! The 'S' is dead in the water! It is an EYE-lund!",
    successQuote: "Bravo! You have navigated the choppy seas of English phonetics!",
    explanation: "حرف S صامت تماماً في Island. تُنطق EYE-lund.",
    audioSampleText: "island. The S is silent: island."
  },
  recipe: {
    word: "recipe",
    phonetic: "/ˈrɛsɪpi/",
    arabicHint: "رِي-سِي-بِي (3 مقاطع)",
    commonMistakes: ["re-sipe", "re-cipe", "resipe"],
    angryQuote: "Re-sipe?! What concoction are you brewing?! It does NOT rhyme with pipe! It is an Italian delight: RES-i-pee!",
    successQuote: "Deliciously pronounced! My chef's hat is off to you!",
    explanation: "تُنطق بثلاثة مقاطع: RES-i-pee وليس مقطعاً واحداً مثل pipe.",
    audioSampleText: "recipe. Three syllables: recipe."
  },
  vegetable: {
    word: "vegetable",
    phonetic: "/ˈvɛdʒtəbəl/",
    arabicHint: "فِيجْ-تَبُلْ (3 مقاطع وليس 4)",
    commonMistakes: ["ve-ge-ta-ble", "vegeta-ble", "vegetable"],
    angryQuote: "Ve-ge-ta-ble?! Great Scott! You just stretched that broccoli into the next century! Three syllables only: VEJ-tuh-bul!",
    successQuote: "Healthy and crisp! Even the vegetables are clapping!",
    explanation: "تُختصر الكلمة لثلاثة مقاطع: VEJ-tuh-bul.",
    audioSampleText: "vegetable. Fast and crisp: vegetable."
  },
  salmon: {
    word: "salmon",
    phonetic: "/ˈsæmən/",
    arabicHint: "سَامُونْ (حرف L صامت تماماً)",
    commonMistakes: ["sal-mon", "salmon", "sal-mun"],
    angryQuote: "Did you utter the 'L' in salmon?! The fish is leaping out of the river in sheer horror! The 'L' is silent! Say: SAM-un!",
    successQuote: "Fresh as a Scottish morning! Perfection!",
    explanation: "حرف L صامت في salmon. تُنطق SAM-un.",
    audioSampleText: "salmon. The L is silent: salmon."
  },
  chaos: {
    word: "chaos",
    phonetic: "/ˈkeɪɒs/",
    arabicHint: "كِي-أُوسْ (تبدأ بصوت الكاف K)",
    commonMistakes: ["cha-os", "tcha-os", "chaws"],
    angryQuote: "Cha-os?! That truly is linguistic CHAOS! The 'CH' here is a grand Greek 'K'! Say: KAY-oss!",
    successQuote: "Order is restored to the realm! Outstanding!",
    explanation: "حرفا CH يُنطقان كافاً (K) مثل chemistry. تُنطق: KAY-oss.",
    audioSampleText: "chaos. It starts with a hard K: chaos."
  },
  stomach: {
    word: "stomach",
    phonetic: "/ˈstʌmək/",
    arabicHint: "سْتَمَكْ (تنتهي بصوت K)",
    commonMistakes: ["sto-match", "stomash", "stomatch"],
    angryQuote: "Sto-match?! My own stomach is turning! The end is a solid 'K'! Say: STUM-uk!",
    successQuote: "Robust and healthy! Well spoken, sir!",
    explanation: "تنتهي الكلمة بصوت الكاف K وليس تش Ch. تُنطق: STUM-uk.",
    audioSampleText: "stomach. It ends with a K sound: stomach."
  },
  iron: {
    word: "iron",
    phonetic: "/ˈaɪən/",
    arabicHint: "آيِيرْنْ (حرف R هادئ ومختفٍ)",
    commonMistakes: ["eye-ron", "ay-ron", "e-ron"],
    angryQuote: "Eye-ron?! You are not smelting steel in a forge! It is smooth and gentlemanly: EYE-urn!",
    successQuote: "Smooth as silk! Splendid work!",
    explanation: "تُنطق EYE-urn بدون تشديد مفرط على الراء.",
    audioSampleText: "iron. Smooth and gentlemanly: iron."
  },
  park: {
    word: "park",
    phonetic: "/pɑːrk/",
    arabicHint: "بَارْكْ (بحرف P الانفجاري وليس B)",
    commonMistakes: ["bark", "barc"],
    angryQuote: "Did you say BARK?! A dog barks! A gentleman PARKS his Rolls-Royce in the PARK with a crisp, explosive 'P'! Blow some air on your hand: P-P-PARK!",
    successQuote: "Magnificent explosive P! The Rolls-Royce is parked with honor!",
    explanation: "انتبه للفرق بين P و B. صوت P يخرج بنفخة هواء واضحة.",
    audioSampleText: "park. Crisp P with air: park."
  },
  peaches: {
    word: "peach",
    phonetic: "/piːtʃ/",
    arabicHint: "بِيتْشْ (بحرف P)",
    commonMistakes: ["beach", "beatch"],
    angryQuote: "You want to eat a BEACH?! A sandy seashore with pebbles?! You want a PEACH, the juicy fruit! P-P-PEACH!",
    successQuote: "Sweet and juicy! That was a true PEACH!",
    explanation: "فرق كبير بين Beach (شاطئ) و Peach (خوخ).",
    audioSampleText: "peach. Juicy fruit: peach."
  }
};

export interface ScenarioTopic {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  suggestedPrompts: string[];
  initialGreeting: string;
}

export const CONVERSATION_SCENARIOS: ScenarioTopic[] = [
  {
    id: "free-talk",
    title: "محادثة حرة مع مستر منقوري",
    titleEn: "Free Banter with Mr. Mangory",
    icon: "🎩",
    description: "تحدث معه عن يومك، الطقس الإنجليزي، أو اسأله أي سؤال يخطر ببالك!",
    level: "Beginner",
    suggestedPrompts: [
      "Hello Mr. Mangory, how is the weather today?",
      "Can you give me a receipt for my tea?",
      "I feel very comfortable in this chair.",
      "What is your favorite dessert?"
    ],
    initialGreeting: "Ah, splendid day! I am Mr. Mangory, at your gracious service. Do speak clearly, my friend, and remember: Queen's English only! What is on your mind today?"
  },
  {
    id: "tea-etiquette",
    title: "حفلة الشاي الملكية والآداب",
    titleEn: "The Aristocratic Tea Party",
    icon: "🫖",
    description: "تعلم آداب شرب الشاي، الجدل الأزلي حول وضع الحليب أولاً، والحديث المهذب.",
    level: "Intermediate",
    suggestedPrompts: [
      "May I have some Earl Grey tea with milk, please?",
      "Should I put the milk before the tea, or after?",
      "What is the secret recipe for these delicious scones?",
      "Shall we have salmon sandwiches or cucumber?"
    ],
    initialGreeting: "Welcome to High Tea! Rule number one: Pinky finger relaxed, spine upright, and never slurp your Earl Grey! Now, shall we discuss scones or would you prefer a cucumber sandwich?"
  },
  {
    id: "tongue-twisters",
    title: "تحدي فخاخ النطق القاتلة",
    titleEn: "The Pronunciation Gauntlet",
    icon: "⚡",
    description: "أخطر الكلمات التي يعاني منها الجميع: receipt, subtle, vegetable, chaos, salmon!",
    level: "Advanced",
    suggestedPrompts: [
      "I found subtle chaos in Wednesday's recipe.",
      "The comfortable island had delicious dessert.",
      "Please park your car before eating fresh salmon.",
      "She folded her clothes on the quiet island."
    ],
    initialGreeting: "Aha! You dare enter the Pronunciation Gauntlet?! Let us see if your tongue can conquer the silent letters and sneaky syllables without making my monocle explode! Choose a challenge!"
  },
  {
    id: "job-interview",
    title: "مقابلة عمل مع اللورد منقوري",
    titleEn: "Job Interview with Lord Mangory",
    icon: "💼",
    description: "تدرب على اللغة الإنجليزية الرسمية واعرض مهاراتك بثقة وأناقة دبلوماسية.",
    level: "Intermediate",
    suggestedPrompts: [
      "I am very comfortable leading complex projects.",
      "I can adapt my schedule to meet company deadlines.",
      "I managed crisis situations without any chaos.",
      "Could you tell me more about the company culture?"
    ],
    initialGreeting: "Please, have a seat. I have reviewed your portfolio. Let us see how well you articulate your vision without mumbling or stuttering. Tell me: why should we bestow this prestigious role upon you?"
  },
  {
    id: "travel-london",
    title: "السياحة والتنقل في لندن",
    titleEn: "London Underground & Travel Survival",
    icon: "🚇",
    description: "شراء تذاكر القطار، حجز الفنادق، السؤال عن الاتجاهات، وطلب الطعام.",
    level: "Beginner",
    suggestedPrompts: [
      "Excuse me, how can I get a receipt for the train ticket?",
      "Is this train stopping at Piccadilly Circus on Wednesday?",
      "Can you recommend a comfortable hotel near the river?",
      "Where can I buy traditional fish and chips?"
    ],
    initialGreeting: "Mind the gap, traveler! London is buzzing today. Are you lost near Big Ben or trying to navigate the Tube? Ask away, but do speak with proper volume!"
  }
];

// Helper to detect if a spoken transcript contains any of our known tricky words
export function detectPronunciationTrap(spokenText: string): PronunciationTrap | null {
  const clean = spokenText.toLowerCase();
  for (const [key, trap] of Object.entries(PRONUNCIATION_TRAPS)) {
    // Check if the target word is in the transcript OR if any of its typical misheard spellings occurred
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(clean)) {
      return trap;
    }
    // Also check typical misrecognitions
    for (const mistake of trap.commonMistakes) {
      if (clean.includes(mistake.toLowerCase())) {
        return trap;
      }
    }
  }
  return null;
}
