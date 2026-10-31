export type StageCategory = 'primary' | 'intermediate' | 'advanced';

export interface SpeakingLevel {
  id: number; // 1 to 12
  titleAr: string;
  titleEn: string;
  stageAr: string;
  stageCategory: StageCategory;
  ageRecommendation: string;
  descriptionAr: string;
  targetPacing: number; // 0.75 for L1 -> 1.05 for L12
  starterPrompts: string[];
  initialGreeting: string;
}

export interface CareerDomain {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  descriptionAr: string;
  keywords: string[];
  samplePrompts: string[];
  charlesRole: string;
}

// ================= THE 12 SPEAKING LEVELS =================
export const SPEAKING_LEVELS: SpeakingLevel[] = [
  // --- المرحلة الابتدائية التأسيسية (1 - 4) ---
  {
    id: 1,
    titleAr: "المستوى 1: الحروف والألوان والتحيات",
    titleEn: "Level 1: ABCs, Colors & Greetings",
    stageAr: "ابتدائي تأسيسي (Grade 1)",
    stageCategory: "primary",
    ageRecommendation: "6 - 7 سنوات / مبتدئ تماماً",
    descriptionAr: "ردود بكلمة واحدة أو كلمتين: نطق الألوان، الأرقام البسيطة، والترحيب بلطف شديد.",
    targetPacing: 0.75,
    starterPrompts: [
      "Hello Mr. Mangory!",
      "I see a red apple.",
      "My favorite color is blue.",
      "Can you count: one, two, three?"
    ],
    initialGreeting: "Hello, little star! Welcome to Level 1! I am Mr. Mangory, and I am very happy to meet you! Can you say: 'Hello Mr. Mangory'?"
  },
  {
    id: 2,
    titleAr: "المستوى 2: عائلتي وألعابي المفضلة",
    titleEn: "Level 2: My Family & Toys",
    stageAr: "ابتدائي (Grade 2)",
    stageCategory: "primary",
    ageRecommendation: "7 - 8 سنوات",
    descriptionAr: "جمل بسيطة من 3 إلى 4 كلمات: التحدث عن الأب والأم، الألعاب، وحيواناتي المفضلة.",
    targetPacing: 0.78,
    starterPrompts: [
      "I have a fast toy car.",
      "This is my mom and dad.",
      "I love my cute puppy.",
      "I see five green balls."
    ],
    initialGreeting: "Jolly good! Welcome to Level 2! Tell me, what is your favorite toy to play with at home?"
  },
  {
    id: 3,
    titleAr: "المستوى 3: مدرستي وأدواتي وحيواناتي",
    titleEn: "Level 3: My School & Pets",
    stageAr: "ابتدائي (Grade 3)",
    stageCategory: "primary",
    ageRecommendation: "8 - 9 سنوات",
    descriptionAr: "السؤال والجواب البسيط: ماذا يوجد في حقيبتك؟ وماذا تفعل في المدرسة؟",
    targetPacing: 0.8,
    starterPrompts: [
      "I have pencils in my schoolbag.",
      "My teacher is very helpful.",
      "I see a big black cat.",
      "Do you like eating apples?"
    ],
    initialGreeting: "Splendid day, young student! Tell me: what wonderful things do you have inside your schoolbag today?"
  },
  {
    id: 4,
    titleAr: "المستوى 4: يومي وطعامي المفضل",
    titleEn: "Level 4: Daily Routine & Food",
    stageAr: "ابتدائي (Grade 4)",
    stageCategory: "primary",
    ageRecommendation: "9 - 10 سنوات",
    descriptionAr: "التعبير عن الأفعال اليومية والطعام الصحي والوجبات والوقت ببساطة ووضوح.",
    targetPacing: 0.83,
    starterPrompts: [
      "I eat fresh vegetables and rice.",
      "I wake up early in the morning.",
      "My favorite dessert is strawberry cake.",
      "Can I drink a glass of milk?"
    ],
    initialGreeting: "Good morning, my dear friend! What delicious food did you eat today, and what is your favorite meal?"
  },

  // --- المرحلة المتوسطة وبناء الجمل (5 - 8) ---
  {
    id: 5,
    titleAr: "المستوى 5: الهوايات والرياضة والأصدقاء",
    titleEn: "Level 5: Hobbies, Sports & Friends",
    stageAr: "متوسط (Grade 5 - 6)",
    stageCategory: "intermediate",
    ageRecommendation: "10 - 12 سنة",
    descriptionAr: "ربط الجمل باستخدام (and, but, because) والتحدث عن العطلة الأسبوعية والأنشطة.",
    targetPacing: 0.88,
    starterPrompts: [
      "I play football with my friends on Wednesday.",
      "I enjoy swimming because it makes me strong.",
      "My friend gave me a nice book.",
      "What sport do you like to watch, Mr. Mangory?"
    ],
    initialGreeting: "Welcome to Level 5! Time to stretch our conversational wings. Tell me: what thrilling hobbies do you enjoy during the weekend?"
  },
  {
    id: 6,
    titleAr: "المستوى 6: السفر والطقس والاستكشاف",
    titleEn: "Level 6: Travel, Weather & Exploration",
    stageAr: "متوسط (Grade 6 - 7)",
    stageCategory: "intermediate",
    ageRecommendation: "11 - 13 سنة",
    descriptionAr: "صياغة زمن الماضي والمستقبل، وصف الرحلات، حالة الطقس، وشراء التذاكر.",
    targetPacing: 0.9,
    starterPrompts: [
      "The weather in London was quite chilly yesterday.",
      "I bought a train ticket and asked for a receipt.",
      "We visited an amazing museum on the island.",
      "Where would you recommend I travel next summer?"
    ],
    initialGreeting: "Ah, the adventurous spirit! Tell me: where in the world have you traveled, or what exciting city do you dream of exploring?"
  },
  {
    id: 7,
    titleAr: "المستوى 7: سرد القصص والتعبير عن المشاعر",
    titleEn: "Level 7: Storytelling & Expressing Opinions",
    stageAr: "متوسط (Grade 7 - 8)",
    stageCategory: "intermediate",
    ageRecommendation: "12 - 14 سنة",
    descriptionAr: "سرد قصة قصيرة مرتبة، التعبير عن المشاعر، والمقارنة بين أمرين بتفصيل ممتع.",
    targetPacing: 0.92,
    starterPrompts: [
      "In my opinion, reading books is more rewarding than movies.",
      "Yesterday, a very funny thing happened at school.",
      "I felt so proud when our team won the competition.",
      "Why do you think stories inspire people, Mr. Mangory?"
    ],
    initialGreeting: "A mind without stories is like tea without leaves! Tell me a memorable story or an unexpected incident that occurred recently!"
  },
  {
    id: 8,
    titleAr: "المستوى 8: الحوار اليومي وحل المشكلات",
    titleEn: "Level 8: Daily Fluency & Problem Solving",
    stageAr: "متوسط متقدم (Grade 8 - 9)",
    stageCategory: "intermediate",
    ageRecommendation: "13 - 15 سنة",
    descriptionAr: "المناقشة اللبقة، الاتفاق والاختلاف بأدب، اقتراح حلول للمشاكل، واستخدام مصطلحات شائعة.",
    targetPacing: 0.95,
    starterPrompts: [
      "If we want to protect the environment, we must reduce plastic waste.",
      "I politely disagree, because teamwork is more important than solo work.",
      "How can we resolve subtle misunderstandings between friends?",
      "What is the most effective habit for learning languages?"
    ],
    initialGreeting: "Splendid! Let us tackle real-world thinking: what is a challenge in your community that you would love to solve?"
  },

  // --- المرحلة الثانوية والجامعية والمهنية المتقدمة (9 - 12) ---
  {
    id: 9,
    titleAr: "المستوى 9: التفكير النقدي والمناظرات",
    titleEn: "Level 9: Critical Thinking & Debates",
    stageAr: "ثانوي (Grade 10 - 11)",
    stageCategory: "advanced",
    ageRecommendation: "15 - 17 سنة",
    descriptionAr: "بناء حجج إقناع قوية، مناقشة القضايا العالمية والذكاء الاصطناعي والتأثير الاجتماعي.",
    targetPacing: 0.98,
    starterPrompts: [
      "Artificial intelligence will fundamentally reshape human productivity.",
      "We must evaluate the ethical boundaries of emerging technologies.",
      "Cultural traditions provide stability amidst rapid modern change.",
      "Should social media platforms be regulated by independent boards?"
    ],
    initialGreeting: "Welcome to the debate arena! Choose a side and present your thesis: does technology connect society or isolate the individual?"
  },
  {
    id: 10,
    titleAr: "المستوى 10: الإعداد الجامعي والبحث الأكاديمي",
    titleEn: "Level 10: Academic English & Research",
    stageAr: "ثانوي ختامي وجامعي (Grade 12 & University)",
    stageCategory: "advanced",
    ageRecommendation: "17 - 21 سنة",
    descriptionAr: "اللغة الأكاديمية الرسمية: مراجعة الأدبيات، تحليل الفرضيات، وتلخيص الأوراق العلمية.",
    targetPacing: 1.0,
    starterPrompts: [
      "The empirical data demonstrates a direct correlation between sleep and cognition.",
      "Our experimental methodology controlled for extraneous variables.",
      "This literature review highlights prominent gaps in modern economics.",
      "Can you review the logical structure of my research hypothesis?"
    ],
    initialGreeting: "Good day, scholar! What academic hypothesis, philosophical dilemma, or research inquiry shall we scrutinize today?"
  },
  {
    id: 11,
    titleAr: "المستوى 11: بيئة العمل الاحترافية والمقابلات",
    titleEn: "Level 11: Executive Workplace & Interviews",
    stageAr: "مهني وتطوير وظيفي (Career & Executive)",
    stageCategory: "advanced",
    ageRecommendation: "الخريجون والمهنيون",
    descriptionAr: "المقابلات الوظيفية التنفيذية، إدارة الاجتماعات، التفاوض، وتقديم العروض التقديمية.",
    targetPacing: 1.02,
    starterPrompts: [
      "I spearheaded cross-functional initiatives that increased client retention by twenty percent.",
      "We navigated complex regulatory frameworks without compromising our release schedule.",
      "How do you negotiate win-win outcomes during high-stakes deadlock?",
      "Let us conduct a mock executive leadership interview."
    ],
    initialGreeting: "Please take a seat in the boardroom. Let us examine your strategic achievements and leadership acumen. What is on your agenda?"
  },
  {
    id: 12,
    titleAr: "المستوى 12: الطلاقة الدبلوماسية والقيادة العليا",
    titleEn: "Level 12: Diplomatic Fluency & Master Rhetoric",
    stageAr: "إتقان استراتيجي ودبلوماسي (Mastery & Diplomacy)",
    stageCategory: "advanced",
    ageRecommendation: "مستوى القيادة العليا (C2 Native Mastery)",
    descriptionAr: "بلاغة استثنائية، استخدام الكنايات والمجاز الرفيع، المناورة اللغوية، والمفاوضات الدبلوماسية.",
    targetPacing: 1.05,
    starterPrompts: [
      "Diplomatic statecraft requires navigating strategic ambiguity while safeguarding vital national interests.",
      "The nuance of multilateral diplomacy lies in harmonizing divergent geopolitical agendas.",
      "True leadership articulates clarity in the midst of unprecedented institutional chaos.",
      "Let us engage in high-level diplomatic discourse on global trade accords."
    ],
    initialGreeting: "Greetings, your Excellency! Only the most formidable rhetoricians dare converse at Level 12. Let us explore the finest nuances of the King's English!"
  }
];

// ================= THE 7 SPECIALIZED CAREER DOMAINS =================
export const CAREER_DOMAINS: CareerDomain[] = [
  {
    id: "general",
    nameAr: "عام ومدرسي (General & Academic)",
    nameEn: "General & School",
    icon: "🎓",
    descriptionAr: "المواضيع الحياتية العامة، الدراسة المدرسية، الهوايات، والطلاقة اليومية.",
    keywords: ["daily life", "school", "friends", "family", "hobbies", "travel", "culture"],
    samplePrompts: [
      "How can I improve my English fluency each day?",
      "What is your secret to staying disciplined in school?",
      "Tell me about the history of British afternoon tea."
    ],
    charlesRole: "An intellectual, encouraging Victorian gentleman and mentor."
  },
  {
    id: "tech",
    nameAr: "التقنية والبرمجة والذكاء الاصطناعي",
    nameEn: "Tech, Software & AI",
    icon: "💻",
    descriptionAr: "مصطلحات هندسة البرمجيات، مقابلات العمل التقنية، هندسة الأنظمة، والحوسبة السحابية.",
    keywords: ["API", "database", "fullstack", "React", "Cloudflare", "latency", "async", "cache", "architecture", "LLM"],
    samplePrompts: [
      "How do we optimize edge caching to reduce database latency?",
      "I am designing an event-driven microservices architecture.",
      "Let us conduct a Senior Software Engineer technical interview."
    ],
    charlesRole: "A sharp, aristocratic Chief Technology Officer who demands clean code, zero latency, and Oxford-level tech precision."
  },
  {
    id: "medicine",
    nameAr: "الطب والرعاية الصحية والصيدلة",
    nameEn: "Medicine & Healthcare",
    icon: "🏥",
    descriptionAr: "التواصل بين الطبيب والمريض، تشخيص الأعراض، المصطلحات السريرية، والرعاية الطبية.",
    keywords: ["diagnosis", "symptoms", "prescription", "dosage", "anesthesia", "clinical", "triage", "chronic", "patient care"],
    samplePrompts: [
      "The patient presents with acute abdominal pain and mild fever.",
      "How do you communicate a difficult medical diagnosis with empathy?",
      "Let us simulate a doctor-patient clinical consultation."
    ],
    charlesRole: "A distinguished Royal Physician with uncompromising standards of medical terminology and compassionate bedside manners."
  },
  {
    id: "business",
    nameAr: "إدارة الأعمال والمالية وريادة الأعمال",
    nameEn: "Business, Finance & Startups",
    icon: "💼",
    descriptionAr: "عروض الاستثمار (Pitching)، التدفقات النقدية، التسويق الاستراتيجي، ومفاوضات الصفقات.",
    keywords: ["ROI", "pitch deck", "venture capital", "cash flow", "market share", "valuation", "KPI", "acquisition", "revenue"],
    samplePrompts: [
      "Our customer acquisition cost fell by thirty percent while lifetime value grew.",
      "We are raising our seed round to scale into international markets.",
      "Let us negotiate the terms of a joint venture distribution agreement."
    ],
    charlesRole: "A veteran City of London investment banker and venture capitalist with razor-sharp financial acumen."
  },
  {
    id: "tourism",
    nameAr: "السياحة والضيافة والطيران",
    nameEn: "Tourism, Aviation & Hospitality",
    icon: "✈️",
    descriptionAr: "خدمة كبار الشخصيات، الفندقة العالمية، حجوزات الطيران، وإرشاد المسافرين الدوليين.",
    keywords: ["boarding pass", "concierge", "itinerary", "first class", "check-in", "hospitality", "excursion", "customs"],
    samplePrompts: [
      "Welcome aboard our flight to London Heathrow; please fasten your seatbelts.",
      "I would like to arrange an exclusive private gallery tour for our hotel guests.",
      "How do you handle demanding international travelers with five-star grace?"
    ],
    charlesRole: "The ultimate aristocratic Chief Concierge of the Savoy and international flight ambassador."
  },
  {
    id: "law",
    nameAr: "القانون والدبلوماسية والعلاقات الدولية",
    nameEn: "Law, Diplomacy & Policy",
    icon: "⚖️",
    descriptionAr: "صياغة العقود، البروتوكول الدبلوماسي، المعاهدات الدولية، والمرافعات القانونية.",
    keywords: ["indemnity", "jurisdiction", "treaty", "confidentiality clause", "arbitration", "bilateral accord", "sovereignty"],
    samplePrompts: [
      "The contract includes an ironclad dispute resolution and arbitration clause.",
      "Both sovereign delegations reached a historic bilateral accord.",
      "How do diplomats navigate geopolitical tension without escalating conflict?"
    ],
    charlesRole: "A King's Counsel barrister and veteran Ambassador of His Majesty's Diplomatic Service."
  },
  {
    id: "engineering",
    nameAr: "الهندسة والعمارة والتصنيع",
    nameEn: "Engineering & Architecture",
    icon: "🏗️",
    descriptionAr: "مواصفات التصميم الهندسي، سلامة المنشآت، إدارة المواقع، وتكنولوجيا المواد الحديثة.",
    keywords: ["structural integrity", "blueprints", "reinforced concrete", "tolerance", "seismic load", "CAD", "specifications"],
    samplePrompts: [
      "The structural foundation was reinforced to withstand high seismic activity.",
      "We analyzed the tensile strength of the composite materials under load.",
      "Let us review the architectural blueprints for the new eco-friendly tower."
    ],
    charlesRole: "A master Fellow of the Royal Academy of Engineering who insists on mathematical perfection and structural majesty."
  }
];

export function getLevelById(id: number): SpeakingLevel {
  return SPEAKING_LEVELS.find((l) => l.id === id) || SPEAKING_LEVELS[0];
}

export function getDomainById(id: string): CareerDomain {
  return CAREER_DOMAINS.find((d) => d.id === id) || CAREER_DOMAINS[0];
}
