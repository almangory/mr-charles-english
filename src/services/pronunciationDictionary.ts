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
    explanation: "حرف P صامت تماماً في هذه الكلمة (فاتورة/إيصال المتجر). تُنطق: ri-SEET.",
    audioSampleText: "receipt. You do not pronounce the P. It is receipt."
  },
  aisle: {
    word: "aisle",
    phonetic: "/aɪl/",
    arabicHint: "آيْلْ (حرفا A و S صامتان، مثل كلمة I'll)",
    commonMistakes: ["ay-zil", "ais-le", "izle", "eyezil"],
    angryQuote: "Ais-le?! Bless my grocery basket! Are you lost in the supermarket?! The 'S' in aisle is completely silent! It sounds just like 'I'll'! Say: EYE-ul!",
    successQuote: "Magnificent! Now you can stroll down the supermarket aisle with royal grace!",
    explanation: "كلمة aisle (ممر في البقالة أو المتجر أو الطائرة) حرف S فيها صامت تماماً وتُنطق: EYE-ul.",
    audioSampleText: "aisle. The S is completely silent: aisle."
  },
  espresso: {
    word: "espresso",
    phonetic: "/ɛˈsprɛsoʊ/",
    arabicHint: "إِسْ-بْرِيسُّو (بالسين S وليس إكسبريسو بالـ X!)",
    commonMistakes: ["expresso", "ex-presso", "ekspresso"],
    angryQuote: "EX-presso?! Stop the café music immediately! It is a cup of coffee, NOT a high-speed express train! There is NO 'X' in espresso! Say: es-PRESS-oh!",
    successQuote: "Ah, bellissimo and jolly good! A true barista's pronunciation of espresso!",
    explanation: "في المقاهي، لا تقل أبداً Expresso بحرف X، بل انطقها بالسين الواضحة: es-PRESS-oh.",
    audioSampleText: "espresso. No X sound at all: espresso."
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
    explanation: "كلمة desert تعني الصحراء (DEZ-ert)، بينما dessert تعني الحلوى في المقهى أو المطعم (dih-ZURT).",
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
    explanation: "تُنطق كمقطع واحد سريع (كأنها Close)، ولا تُنطق أبداً cloth-es مقطعين عند التسوق في المتاجر.",
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
    successQuote: "Healthy and crisp! Even the vegetables in the grocery store are clapping!",
    explanation: "في البقالة، تُختصر الكلمة لثلاثة مقاطع: VEJ-tuh-bul.",
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
    explanation: "فرق كبير بين Beach (شاطئ) و Peach (خوخ في البقالة).",
    audioSampleText: "peach. Juicy fruit: peach."
  },
  accuracy: {
    word: "accuracy",
    phonetic: "/ˈækjərəsi/",
    arabicHint: "أَكْ-يُورَ-سِي (دقة البيانات، التشديد في أول الكلمة)",
    commonMistakes: ["a-kyoo-ray-see", "acuracy", "ak-yoor-a-see"],
    angryQuote: "Hold the data pipeline! Your pronunciation of ACCURACY lacked accuracy! Place the stress right at the very beginning: AK-yuh-ruh-see!",
    successQuote: "One hundred percent data accuracy! Your phonetics pass every governance audit!",
    explanation: "من أهم مصطلحات جودة البيانات الرقمية، تُنطق بتشديد المقطع الأول: AK-yuh-ruh-see.",
    audioSampleText: "accuracy. Stress the first syllable: accuracy."
  },
  hierarchy: {
    word: "hierarchy",
    phonetic: "/ˈhaɪərɑːrki/",
    arabicHint: "هَايْ-رَارْ-كِي (تنتهي بصوت الكاف K)",
    commonMistakes: ["hi-rar-tchi", "heerarky", "hier-archy"],
    angryQuote: "Hi-rar-CHY?! By the Royal Data Governance Board, the 'CH' in hierarchy is a crisp Greek 'K'! Say: HIGH-uh-rahr-kee!",
    successQuote: "Supreme! You sit at the very top of the linguistic hierarchy!",
    explanation: "في هيكلة البيانات والمؤسسات، CH في hierarchy تُنطق كافاً: HIGH-uh-rahr-kee.",
    audioSampleText: "hierarchy. Hard K at the end: hierarchy."
  }
};

export type ScenarioCategory = 'all' | 'places' | 'data-quality' | 'interview' | 'royal';

export interface ScenarioTopic {
  id: string;
  title: string;
  titleEn: string;
  icon: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: ScenarioCategory;
  suggestedPrompts: string[];
  initialGreeting: string;
}

export const CONVERSATION_SCENARIOS: ScenarioTopic[] = [
  // ================= EVERYDAY PLACES: STORES, GROCERIES & CAFÉS =================
  {
    id: "grocery-supermarket",
    title: "البقالة والسوبرماركت (شراء المقاضي)",
    titleEn: "Grocery Store & Supermarket",
    icon: "🛒",
    description: "محادثات البقالة اليومية: شراء الخضروات والفواكه الطازجة، السؤال عن الممرات (Aisles)، الأسعار، والدفع عند الكاشير.",
    level: "Beginner",
    category: "places",
    suggestedPrompts: [
      "Excuse me, which aisle has fresh organic vegetables and milk?",
      "How much is a kilo of fresh salmon and sweet peaches?",
      "Are these strawberries fresh today, and do you have whole wheat bread?",
      "I will pay by card; may I have my receipt and a paper bag, please?"
    ],
    initialGreeting: "Welcome to Mangory's Royal Groceries & Supermarket! Fresh produce in aisle one, finest cheeses in aisle two! Tell me, my friend, what delicious items are on your shopping list today?"
  },
  {
    id: "retail-shopping-store",
    title: "المتاجر والتسوق وشراء الملابس",
    titleEn: "Retail Store & Boutique Shopping",
    icon: "🛍️",
    description: "التسوق في المتاجر والمولات: السؤال عن المقاسات والألوان، غرفة القياس، التخفيضات، واستبدال المشتريات.",
    level: "Beginner",
    category: "places",
    suggestedPrompts: [
      "Excuse me, do you have these comfortable clothes in a medium size?",
      "Where is the fitting room so I can try this jacket on?",
      "Is there a discount on this item, and what is your refund policy?",
      "I would like to exchange this shirt; here is my original receipt."
    ],
    initialGreeting: "Welcome to our flagship London Boutique! Every garment here is tailored to perfection. Are you looking for comfortable casual clothes, an interview suit, or a special gift today?"
  },
  {
    id: "cafe-coffee-shop",
    title: "المقاهي والكافيهات وطلب المشروبات",
    titleEn: "Specialty Café & Coffee House",
    icon: "☕",
    description: "طلب القهوة المختصة (إسبريسو، لاتيه)، المخبوزات والحلوى (Dessert)، للجلوس أو السفري (Takeaway)، وطلب الحساب.",
    level: "Beginner",
    category: "places",
    suggestedPrompts: [
      "Good morning! May I have a double espresso and a warm croissant, please?",
      "Can I get an iced latte with oat milk for takeaway?",
      "What is your most popular chocolate dessert today?",
      "Could we have the bill and the Wi-Fi password, please?"
    ],
    initialGreeting: "Ah, the rich aroma of freshly roasted beans and Earl Grey! Welcome to Café Mangory! Would you care for a crisp espresso, a creamy latte, or a sweet dessert for dine-in or takeaway?"
  },
  {
    id: "restaurant-dining",
    title: "المطعم والحجز وطلب الوجبات",
    titleEn: "Fine Dining & Restaurant Ordering",
    icon: "🍽️",
    description: "حجز طاولة في مطعم، قراءة قائمة الطعام (Menu)، طلب الأطباق الرئيسية، السؤال عن المكونات، وطلب الفاتورة.",
    level: "Intermediate",
    category: "places",
    suggestedPrompts: [
      "Good evening, I would like a table for two near the window, please.",
      "What is the chef's special recipe for grilled salmon tonight?",
      "May we order fresh vegetable soup as a starter and chocolate dessert?",
      "Everything was delicious! Could you bring the bill and receipt, please?"
    ],
    initialGreeting: "Good evening and welcome to The Royal Savoy Dining Room! Your table by the window is ready. Have you perused our menu, or shall I recommend the chef's signature salmon and vegetable dish?"
  },

  // ================= DIGITAL DATA QUALITY & GOVERNANCE =================
  {
    id: "digital-data-quality",
    title: "قسم ومختبر جودة البيانات الرقمية وحوكمتها",
    titleEn: "Digital Data Quality & Governance Lab",
    icon: "📊",
    description: "إتقان مصطلحات جودة البيانات الرقمية: الدقة (Accuracy)، الاكتمال (Completeness)، الاتساق، التنقية (Cleansing)، والـ Data Lineage.",
    level: "Advanced",
    category: "data-quality",
    suggestedPrompts: [
      "How do we measure data accuracy, completeness, and consistency?",
      "We built an automated data cleansing and deduplication ETL pipeline.",
      "Why is end-to-end data lineage essential for data governance?",
      "Strict schema validation and anomaly detection protect our data integrity."
    ],
    initialGreeting: "Welcome to the Digital Data Quality & Governance Command Center! Here, a single null value or duplicate record is high treason! Which dimension shall we audit today: accuracy, completeness, consistency, or data lineage?"
  },

  // ================= JOB INTERVIEW & CAREER =================
  {
    id: "job-interview",
    title: "إجراء مقابلة شخصية للتوظيف",
    titleEn: "Executive & HR Job Interview",
    icon: "💼",
    description: "تدرب على المقابلات الشخصية للتوظيف: عرف بنفسك، اعرض نقاط قوتك وإنجازاتك بمنهجية STAR، وتحدث بثقة أمام لجنة التوظيف.",
    level: "Intermediate",
    category: "interview",
    suggestedPrompts: [
      "I am a dedicated professional with strong expertise in problem-solving.",
      "I am very comfortable leading complex projects under tight deadlines.",
      "I improved data accuracy by thirty percent and prevented operational chaos.",
      "Could you tell me more about the company culture and growth opportunities?"
    ],
    initialGreeting: "Please, have a seat in our interview suite. I have your CV right here before me. Let us begin with the classic opener: tell me about yourself, your key strengths, and why we should select you for this role!"
  },

  // ================= ROYAL & PRONUNCIATION SCENARIOS =================
  {
    id: "free-talk",
    title: "محادثة حرة شاملة مع مستر منقوري",
    titleEn: "Free Banter with Mr. Mangory",
    icon: "🎩",
    description: "تحدث معه في أي موضوع يخطر ببالك: يومك، الرياضة، التقنية، السفر، أو الحياة اليومية!",
    level: "Beginner",
    category: "royal",
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
    description: "تعلم آداب شرب الشاي، الجدل الأزلي حول وضع الحليب أولاً، والحديث الإنجليزي المهذب.",
    level: "Intermediate",
    category: "royal",
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
    description: "أخطر الكلمات التي يعاني منها الجميع: receipt, aisle, espresso, subtle, vegetable, chaos, salmon, accuracy!",
    level: "Advanced",
    category: "royal",
    suggestedPrompts: [
      "I found subtle chaos in Wednesday's recipe.",
      "Walk down the grocery aisle to get an espresso and a receipt.",
      "High data accuracy sits at the top of our governance hierarchy.",
      "She folded her comfortable clothes on the quiet island."
    ],
    initialGreeting: "Aha! You dare enter the Pronunciation Gauntlet?! Let us see if your tongue can conquer the silent letters and sneaky syllables without making my monocle explode! Choose a challenge!"
  },
  {
    id: "travel-london",
    title: "السياحة والتنقل في لندن والمطار",
    titleEn: "London Underground & Travel Survival",
    icon: "🚇",
    description: "شراء تذاكر القطار، المطار، حجز الفنادق، السؤال عن الاتجاهات، والتجول في لندن.",
    level: "Beginner",
    category: "places",
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
    const regex = new RegExp(`\\b${key}\\b`, 'i');
    if (regex.test(clean)) {
      return trap;
    }
    for (const mistake of trap.commonMistakes) {
      if (clean.includes(mistake.toLowerCase())) {
        return trap;
      }
    }
  }
  return null;
}
