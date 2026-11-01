export interface WordDefinition {
  word: string;
  translationAr: string;
  phonetic?: string;
  partOfSpeech?: string;
  exampleEn?: string;
  exampleAr?: string;
  culturalNote?: string;
}

// Built-in Comprehensive Instant Dictionary (100% offline, zero-delay, 250+ essential words)
export const CORE_DICTIONARY: Record<string, WordDefinition> = {
  // --- Greetings & Politeness (تحيات وأدب إنجليزي) ---
  hello: { word: "hello", translationAr: "مرحباً / أهلاً", phonetic: "/həˈloʊ/", partOfSpeech: "تحية" },
  hi: { word: "hi", translationAr: "أهلاً (غير رسمي)", phonetic: "/haɪ/", partOfSpeech: "تحية" },
  good: { word: "good", translationAr: "جيد / طيب / حميد", phonetic: "/ɡʊd/", partOfSpeech: "صفة" },
  morning: { word: "morning", translationAr: "صباح", phonetic: "/ˈmɔːrnɪŋ/", partOfSpeech: "اسم" },
  afternoon: { word: "afternoon", translationAr: "بعد الظهر", phonetic: "/ˌæftərˈnuːn/", partOfSpeech: "اسم" },
  evening: { word: "evening", translationAr: "مساء", phonetic: "/ˈiːvnɪŋ/", partOfSpeech: "اسم" },
  night: { word: "night", translationAr: "ليل / ليلة", phonetic: "/naɪt/", partOfSpeech: "اسم" },
  please: { word: "please", translationAr: "من فضلك / رجاءً", phonetic: "/pliːz/", partOfSpeech: "أداة أدب" },
  thank: { word: "thank", translationAr: "يشكر / يمتن", phonetic: "/θæŋk/", partOfSpeech: "فعل" },
  thanks: { word: "thanks", translationAr: "شكراً جزيلاً", phonetic: "/θæŋks/", partOfSpeech: "تعبير شكر" },
  welcome: { word: "welcome", translationAr: "أهلاً بك / على الرحب والسعة", phonetic: "/ˈwɛlkəm/", partOfSpeech: "تحية" },
  sorry: { word: "sorry", translationAr: "آسف / اعتذر", phonetic: "/ˈsɑːri/", partOfSpeech: "اعتذار" },
  pardon: { word: "pardon", translationAr: "معذرة / عفوك", phonetic: "/ˈpɑːrdən/", partOfSpeech: "اعتذار مهذب" },
  sir: { word: "sir", translationAr: "سيدي / يا حضرة المحترم", phonetic: "/sɜːr/", partOfSpeech: "لقب احترام" },
  madam: { word: "madam", translationAr: "سيدتي الفاضلة", phonetic: "/ˈmædəm/", partOfSpeech: "لقب احترام" },
  chap: { word: "chap", translationAr: "رجل / رفيق (تعبير بريطاني ودود)", phonetic: "/tʃæp/", partOfSpeech: "عامية بريطانية" },
  cheerio: { word: "cheerio", translationAr: "إلى اللقاء / مع السلامة (بريطاني)", phonetic: "/ˌtʃɪəriˈoʊ/", partOfSpeech: "وداع" },
  splendid: { word: "splendid", translationAr: "بديع / رائع للغاية", phonetic: "/ˈsplɛndɪd/", partOfSpeech: "صفة ثناء" },
  magnificent: { word: "magnificent", translationAr: "مهيب / باهر وعظيم", phonetic: "/mæɡˈnɪfɪsənt/", partOfSpeech: "صفة" },
  jolly: { word: "jolly", translationAr: "مرح / مسرور جداً (بريطاني)", phonetic: "/ˈdʒɑːli/", partOfSpeech: "صفة" },
  monocle: { word: "monocle", translationAr: "عدسة العين الواحدة الأرستقراطية", phonetic: "/ˈmɑːnəkəl/", partOfSpeech: "اسم" },

  // --- Pronouns & Basics (ضمائر وأساسيات) ---
  i: { word: "I", translationAr: "أنا", phonetic: "/aɪ/", partOfSpeech: "ضمير متكلم" },
  you: { word: "you", translationAr: "أنتَ / أنتِ / أنتم", phonetic: "/juː/", partOfSpeech: "ضمير مخاطب" },
  he: { word: "he", translationAr: "هو", phonetic: "/hiː/", partOfSpeech: "ضمير غائب" },
  she: { word: "she", translationAr: "هي", phonetic: "/ʃiː/", partOfSpeech: "ضمير غائب" },
  it: { word: "it", translationAr: "هو / هي (لغير العاقل)", phonetic: "/ɪt/", partOfSpeech: "ضمير" },
  we: { word: "we", translationAr: "نحن", phonetic: "/wiː/", partOfSpeech: "ضمير متكلم جمع" },
  they: { word: "they", translationAr: "هم / هن", phonetic: "/ðeɪ/", partOfSpeech: "ضمير غائب جمع" },
  my: { word: "my", translationAr: "لي / خاصتي (ملكية)", phonetic: "/maɪ/", partOfSpeech: "ضمير ملكية" },
  your: { word: "your", translationAr: "لكَ / لكِ / ملككم", phonetic: "/jɔːr/", partOfSpeech: "ضمير ملكية" },
  his: { word: "his", translationAr: "له / ملكه", phonetic: "/hɪz/", partOfSpeech: "ضمير ملكية" },
  her: { word: "her", translationAr: "لها / ملكها", phonetic: "/hɜːr/", partOfSpeech: "ضمير ملكية" },
  our: { word: "our", translationAr: "لنا / ملكنا", phonetic: "/ˈaʊər/", partOfSpeech: "ضمير ملكية" },
  their: { word: "their", translationAr: "لهم / ملكهم", phonetic: "/ðɛər/", partOfSpeech: "ضمير ملكية" },

  // --- Common Verbs (الأفعال الشائعة) ---
  is: { word: "is", translationAr: "يكون (للمفرد الغائب)", phonetic: "/ɪz/", partOfSpeech: "فعل كينونة" },
  am: { word: "am", translationAr: "أكون (مع الضمير I)", phonetic: "/æm/", partOfSpeech: "فعل كينونة" },
  are: { word: "are", translationAr: "تكون / نكون / يكونون", phonetic: "/ɑːr/", partOfSpeech: "فعل كينونة" },
  was: { word: "was", translationAr: "كانَ / كنتُ (ماضٍ)", phonetic: "/wʌz/", partOfSpeech: "فعل كينونة ماضٍ" },
  were: { word: "were", translationAr: "كانوا / كنا / كنتَ (ماضٍ جمع)", phonetic: "/wɜːr/", partOfSpeech: "فعل كينونة ماضٍ" },
  have: { word: "have", translationAr: "يملك / يتناول / عنده", phonetic: "/hæv/", partOfSpeech: "فعل" },
  has: { word: "has", translationAr: "يملك (مع المفرد)", phonetic: "/hæz/", partOfSpeech: "فعل" },
  had: { word: "had", translationAr: "كان يملك (ماضٍ)", phonetic: "/hæd/", partOfSpeech: "فعل ماضٍ" },
  do: { word: "do", translationAr: "يفعل / يقوم بـ", phonetic: "/duː/", partOfSpeech: "فعل" },
  does: { word: "does", translationAr: "يفعل (مع المفرد)", phonetic: "/dʌz/", partOfSpeech: "فعل" },
  did: { word: "did", translationAr: "فعلَ (ماضٍ)", phonetic: "/dɪd/", partOfSpeech: "فعل ماضٍ" },
  say: { word: "say", translationAr: "يقول", phonetic: "/seɪ/", partOfSpeech: "فعل" },
  said: { word: "said", translationAr: "قالَ (ماضٍ)", phonetic: "/sɛd/", partOfSpeech: "فعل ماضٍ" },
  speak: { word: "speak", translationAr: "يتحدث / يتكلم", phonetic: "/spiːk/", partOfSpeech: "فعل" },
  spoke: { word: "spoke", translationAr: "تحدثَ (ماضٍ)", phonetic: "/spoʊk/", partOfSpeech: "فعل ماضٍ" },
  talk: { word: "talk", translationAr: "يتحاور / يتبادل الكلام", phonetic: "/tɔːk/", partOfSpeech: "فعل" },
  listen: { word: "listen", translationAr: "يستمع بإنصات (T صامتة)", phonetic: "/ˈlɪsən/", partOfSpeech: "فعل" },
  hear: { word: "hear", translationAr: "يسمع", phonetic: "/hɪər/", partOfSpeech: "فعل" },
  see: { word: "see", translationAr: "يرى / يشاهد", phonetic: "/siː/", partOfSpeech: "فعل" },
  look: { word: "look", translationAr: "ينظر / يبدو", phonetic: "/lʊk/", partOfSpeech: "فعل" },
  go: { word: "go", translationAr: "يذهب", phonetic: "/ɡoʊ/", partOfSpeech: "فعل" },
  went: { word: "went", translationAr: "ذهبَ (ماضٍ)", phonetic: "/wɛnt/", partOfSpeech: "فعل ماضٍ" },
  come: { word: "come", translationAr: "يأتي / يحضر", phonetic: "/kʌm/", partOfSpeech: "فعل" },
  came: { word: "came", translationAr: "أتى (ماضٍ)", phonetic: "/keɪm/", partOfSpeech: "فعل ماضٍ" },
  like: { word: "like", translationAr: "يحب / يعجبه / مثل", phonetic: "/laɪk/", partOfSpeech: "فعل/حرف" },
  love: { word: "love", translationAr: "يعشق / يحب بشدة", phonetic: "/lʌv/", partOfSpeech: "فعل/اسم" },
  want: { word: "want", translationAr: "يريد / يرغب", phonetic: "/wɑːnt/", partOfSpeech: "فعل" },
  need: { word: "need", translationAr: "يحتاج إلى", phonetic: "/niːd/", partOfSpeech: "فعل" },
  know: { word: "know", translationAr: "يعرف / يعلم (K صامتة)", phonetic: "/noʊ/", partOfSpeech: "فعل" },
  think: { word: "think", translationAr: "يفكر / يعتقد", phonetic: "/θɪŋk/", partOfSpeech: "فعل" },
  learn: { word: "learn", translationAr: "يتعلم", phonetic: "/lɜːrn/", partOfSpeech: "فعل" },
  teach: { word: "teach", translationAr: "يعلّم / يدرّس", phonetic: "/tiːtʃ/", partOfSpeech: "فعل" },
  help: { word: "help", translationAr: "يساعد / عون", phonetic: "/hɛlp/", partOfSpeech: "فعل/اسم" },
  play: { word: "play", translationAr: "يلعب / يعزف", phonetic: "/pleɪ/", partOfSpeech: "فعل" },
  work: { word: "work", translationAr: "يعمل / عمل", phonetic: "/wɜːrk/", partOfSpeech: "فعل/اسم" },
  read: { word: "read", translationAr: "يقرأ", phonetic: "/riːd/", partOfSpeech: "فعل" },
  write: { word: "write", translationAr: "يكتب (W صامتة)", phonetic: "/raɪt/", partOfSpeech: "فعل" },
  understand: { word: "understand", translationAr: "يفهم / يستوعب", phonetic: "/ˌʌndərˈstænd/", partOfSpeech: "فعل" },
  try: { word: "try", translationAr: "يحاول / يجرب", phonetic: "/traɪ/", partOfSpeech: "فعل" },
  start: { word: "start", translationAr: "يبدأ / بداية", phonetic: "/stɑːrt/", partOfSpeech: "فعل" },
  stop: { word: "stop", translationAr: "يتوقف / يقف", phonetic: "/stɑːp/", partOfSpeech: "فعل" },
  repeat: { word: "repeat", translationAr: "يكرر / يعيد", phonetic: "/rɪˈpiːt/", partOfSpeech: "فعل" },

  // --- Questions & Connectors (أدوات استفهام وروابط) ---
  what: { word: "what", translationAr: "ماذا / ما", phonetic: "/wʌt/", partOfSpeech: "أداة استفهام" },
  why: { word: "why", translationAr: "لماذا / لِمَ", phonetic: "/waɪ/", partOfSpeech: "أداة استفهام" },
  when: { word: "when", translationAr: "متى / عندما", phonetic: "/wɛn/", partOfSpeech: "أداة استفهام" },
  where: { word: "where", translationAr: "أين / حيث", phonetic: "/wɛər/", partOfSpeech: "أداة استفهام" },
  who: { word: "who", translationAr: "مَن (للعاقل)", phonetic: "/huː/", partOfSpeech: "أداة استفهام" },
  how: { word: "how", translationAr: "كيف / كم", phonetic: "/haʊ/", partOfSpeech: "أداة استفهام" },
  which: { word: "which", translationAr: "أيّ / أيّهما", phonetic: "/wɪtʃ/", partOfSpeech: "أداة استفهام" },
  because: { word: "because", translationAr: "لأنّ / بسبب", phonetic: "/bɪˈkɔːz/", partOfSpeech: "أداة ربط" },
  and: { word: "and", translationAr: "و (حرف عطف)", phonetic: "/ænd/", partOfSpeech: "حرف عطف" },
  but: { word: "but", translationAr: "ولكن / غير أن", phonetic: "/bʌt/", partOfSpeech: "أداة استدراك" },
  or: { word: "or", translationAr: "أو / أم", phonetic: "/ɔːr/", partOfSpeech: "حرف عطف" },
  if: { word: "if", translationAr: "إذا / لو / إن", phonetic: "/ɪf/", partOfSpeech: "أداة شرط" },
  so: { word: "so", translationAr: "لذلك / جداً", phonetic: "/soʊ/", partOfSpeech: "رابط/ظرف" },
  very: { word: "very", translationAr: "جداً / للغاية", phonetic: "/ˈvɛri/", partOfSpeech: "ظرف توكيد" },
  now: { word: "now", translationAr: "الآن / في هذا الوقت", phonetic: "/naʊ/", partOfSpeech: "ظرف زمان" },
  today: { word: "today", translationAr: "اليوم", phonetic: "/təˈdeɪ/", partOfSpeech: "ظرف زمان" },
  here: { word: "here", translationAr: "هنا", phonetic: "/hɪər/", partOfSpeech: "ظرف مكان" },
  there: { word: "there", translationAr: "هناك", phonetic: "/ðɛər/", partOfSpeech: "ظرف مكان" },

  // --- Colors & Numbers (Level 1) ---
  red: { word: "red", translationAr: "أحمر", phonetic: "/rɛd/", partOfSpeech: "لون/صفة" },
  blue: { word: "blue", translationAr: "أزرق", phonetic: "/bluː/", partOfSpeech: "لون/صفة" },
  green: { word: "green", translationAr: "أخضر", phonetic: "/ɡriːn/", partOfSpeech: "لون/صفة" },
  yellow: { word: "yellow", translationAr: "أصفر", phonetic: "/ˈjɛloʊ/", partOfSpeech: "لون/صفة" },
  black: { word: "black", translationAr: "أسود", phonetic: "/blæk/", partOfSpeech: "لون/صفة" },
  white: { word: "white", translationAr: "أبيض", phonetic: "/waɪt/", partOfSpeech: "لون/صفة" },
  orange: { word: "orange", translationAr: "برتقالي / برتقالة", phonetic: "/ˈɔːrɪndʒ/", partOfSpeech: "اسم/صفة" },
  purple: { word: "purple", translationAr: "بنفسجي / أرجواني", phonetic: "/ˈpɜːrpəl/", partOfSpeech: "اسم/صفة" },
  pink: { word: "pink", translationAr: "وردي / زَهري", phonetic: "/pɪŋk/", partOfSpeech: "اسم/صفة" },
  brown: { word: "brown", translationAr: "بني", phonetic: "/braʊn/", partOfSpeech: "اسم/صفة" },
  color: { word: "color", translationAr: "لون", phonetic: "/ˈkʌlər/", partOfSpeech: "اسم" },
  colors: { word: "colors", translationAr: "ألوان", phonetic: "/ˈkʌlərz/", partOfSpeech: "اسم جمع" },
  one: { word: "one", translationAr: "واحد (1)", phonetic: "/wʌn/", partOfSpeech: "رقم" },
  two: { word: "two", translationAr: "اثنان (2)", phonetic: "/tuː/", partOfSpeech: "رقم" },
  three: { word: "three", translationAr: "ثلاثة (3)", phonetic: "/θriː/", partOfSpeech: "رقم" },
  four: { word: "four", translationAr: "أربعة (4)", phonetic: "/fɔːr/", partOfSpeech: "رقم" },
  five: { word: "five", translationAr: "خمسة (5)", phonetic: "/faɪv/", partOfSpeech: "رقم" },
  six: { word: "six", translationAr: "ستة (6)", phonetic: "/sɪks/", partOfSpeech: "رقم" },
  seven: { word: "seven", translationAr: "سبعة (7)", phonetic: "/ˈsɛvən/", partOfSpeech: "رقم" },
  eight: { word: "eight", translationAr: "ثمانية (8)", phonetic: "/eɪt/", partOfSpeech: "رقم" },
  nine: { word: "nine", translationAr: "تسعة (9)", phonetic: "/naɪn/", partOfSpeech: "رقم" },
  ten: { word: "ten", translationAr: "عشرة (10)", phonetic: "/tɛn/", partOfSpeech: "رقم" },

  // --- Animals & Toys (Level 2) ---
  cat: { word: "cat", translationAr: "قطة", phonetic: "/kæt/", partOfSpeech: "اسم" },
  dog: { word: "dog", translationAr: "كلب", phonetic: "/dɔːɡ/", partOfSpeech: "اسم" },
  puppy: { word: "puppy", translationAr: "جرو صغير", phonetic: "/ˈpʌpi/", partOfSpeech: "اسم" },
  bird: { word: "bird", translationAr: "طائر / عصفور", phonetic: "/bɜːrd/", partOfSpeech: "اسم" },
  fish: { word: "fish", translationAr: "سمكة", phonetic: "/fɪʃ/", partOfSpeech: "اسم" },
  lion: { word: "lion", translationAr: "أسد", phonetic: "/ˈlaɪən/", partOfSpeech: "اسم" },
  animal: { word: "animal", translationAr: "حيوان", phonetic: "/ˈænɪməl/", partOfSpeech: "اسم" },
  animals: { word: "animals", translationAr: "حيوانات", phonetic: "/ˈænɪməlz/", partOfSpeech: "اسم جمع" },
  toy: { word: "toy", translationAr: "لعبة", phonetic: "/tɔɪ/", partOfSpeech: "اسم" },
  ball: { word: "ball", translationAr: "كرة", phonetic: "/bɔːl/", partOfSpeech: "اسم" },
  car: { word: "car", translationAr: "سيارة", phonetic: "/kɑːr/", partOfSpeech: "اسم" },
  doll: { word: "doll", translationAr: "دمية", phonetic: "/dɑːl/", partOfSpeech: "اسم" },
  mom: { word: "mom", translationAr: "أمي / والدة", phonetic: "/mɑːm/", partOfSpeech: "اسم" },
  dad: { word: "dad", translationAr: "أبي / والد", phonetic: "/dæd/", partOfSpeech: "اسم" },
  family: { word: "family", translationAr: "عائلة / أسرة", phonetic: "/ˈfæməli/", partOfSpeech: "اسم" },
  brother: { word: "brother", translationAr: "أخ", phonetic: "/ˈbrʌðər/", partOfSpeech: "اسم" },
  sister: { word: "sister", translationAr: "أخت", phonetic: "/ˈsɪstər/", partOfSpeech: "اسم" },
  house: { word: "house", translationAr: "منزل / دار", phonetic: "/haʊs/", partOfSpeech: "اسم" },
  room: { word: "room", translationAr: "غرفة", phonetic: "/ruːm/", partOfSpeech: "اسم" },

  // --- School & Routine (Level 3 - 4) ---
  school: { word: "school", translationAr: "مدرسة", phonetic: "/skuːl/", partOfSpeech: "اسم" },
  book: { word: "book", translationAr: "كتاب", phonetic: "/bʊk/", partOfSpeech: "اسم" },
  pen: { word: "pen", translationAr: "قلم حبر", phonetic: "/pɛn/", partOfSpeech: "اسم" },
  pencil: { word: "pencil", translationAr: "قلم رصاص", phonetic: "/ˈpɛnsəl/", partOfSpeech: "اسم" },
  teacher: { word: "teacher", translationAr: "معلم / أستاذ", phonetic: "/ˈtiːtʃər/", partOfSpeech: "اسم" },
  student: { word: "student", translationAr: "طالب / تلميذ", phonetic: "/ˈstjuːdənt/", partOfSpeech: "اسم" },
  class: { word: "class", translationAr: "فصل دراسي / حصة", phonetic: "/klæs/", partOfSpeech: "اسم" },
  schoolbag: { word: "schoolbag", translationAr: "حقيبة مدرسية", phonetic: "/ˈskuːlbæɡ/", partOfSpeech: "اسم" },
  apple: { word: "apple", translationAr: "تفاحة", phonetic: "/ˈæpəl/", partOfSpeech: "اسم" },
  banana: { word: "banana", translationAr: "موزة", phonetic: "/bəˈnænə/", partOfSpeech: "اسم" },
  water: { word: "water", translationAr: "ماء", phonetic: "/ˈwɔːtər/", partOfSpeech: "اسم" },
  milk: { word: "milk", translationAr: "حليب", phonetic: "/mɪlk/", partOfSpeech: "اسم" },
  tea: { word: "tea", translationAr: "شاي إنجليزي فاخر", phonetic: "/tiː/", partOfSpeech: "مشروب أرستقراطي" },
  coffee: { word: "coffee", translationAr: "قهوة", phonetic: "/ˈkɔːfi/", partOfSpeech: "اسم" },
  cup: { word: "cup", translationAr: "فنجان / كوب", phonetic: "/kʌp/", partOfSpeech: "اسم" },
  food: { word: "food", translationAr: "طعام / أكل", phonetic: "/fuːd/", partOfSpeech: "اسم" },
  breakfast: { word: "breakfast", translationAr: "وجبة الإفطار", phonetic: "/ˈbrɛkfəst/", partOfSpeech: "اسم" },
  lunch: { word: "lunch", translationAr: "وجبة الغداء", phonetic: "/lʌntʃ/", partOfSpeech: "اسم" },
  dinner: { word: "dinner", translationAr: "وجبة العشاء", phonetic: "/ˈdɪnər/", partOfSpeech: "اسم" },
  vegetable: { word: "vegetable", translationAr: "خضار (3 مقاطع: VEJ-tuh-buhl)", phonetic: "/ˈvɛdʒtəbəl/", partOfSpeech: "فخ نطقي شائع" },
  vegetables: { word: "vegetables", translationAr: "خضروات", phonetic: "/ˈvɛdʒtəbəlz/", partOfSpeech: "اسم جمع" },
  dessert: { word: "dessert", translationAr: "حلوى بعد الوجبة (التشديد على المقطع 2)", phonetic: "/dɪˈzɜːrt/", partOfSpeech: "اسم" },
  desert: { word: "desert", translationAr: "صحراء قاحلة (التشديد على الأول)", phonetic: "/ˈdɛzərt/", partOfSpeech: "اسم" },

  // --- Intermediate & Common Traps (Level 5 - 8) ---
  comfortable: { word: "comfortable", translationAr: "مريح (3 مقاطع فقط: KUMF-tuh-buhl)", phonetic: "/ˈkʌmftərbəl/", partOfSpeech: "فخ نطقي بريطاني" },
  receipt: { word: "receipt", translationAr: "إيصال / فاتورة (P صامتة تماماً!)", phonetic: "/rɪˈsiːt/", partOfSpeech: "اسم" },
  recipe: { word: "recipe", translationAr: "وصفة طهي (3 مقاطع: REH-si-pee)", phonetic: "/ˈrɛsɪpi/", partOfSpeech: "اسم" },
  subtle: { word: "subtle", translationAr: "دقيق / خفي (B صامتة!)", phonetic: "/ˈsʌt.əl/", partOfSpeech: "صفة" },
  clothes: { word: "clothes", translationAr: "ملابس (مقطع واحد كأنها close)", phonetic: "/kloʊðz/", partOfSpeech: "اسم جمع" },
  island: { word: "island", translationAr: "جزيرة (S صامتة كلياً)", phonetic: "/ˈaɪlənd/", partOfSpeech: "اسم" },
  wednesday: { word: "wednesday", translationAr: "يوم الأربعاء (D صامتة: WENZ-day)", phonetic: "/ˈwɛnzdeɪ/", partOfSpeech: "اسم" },
  salmon: { word: "salmon", translationAr: "سمك السلمون (L صامتة: SAM-un)", phonetic: "/ˈsæmən/", partOfSpeech: "اسم" },
  chaos: { word: "chaos", translationAr: "فوضى عارمة (تنطق كاف: KAY-oss)", phonetic: "/ˈkeɪɒs/", partOfSpeech: "اسم" },
  stomach: { word: "stomach", translationAr: "معدة / بطن (تنتهي بكاف)", phonetic: "/ˈstʌmək/", partOfSpeech: "اسم" },
  schedule: { word: "schedule", translationAr: "جدول مواعيد", phonetic: "/ˈʃɛdjuːl/ (UK) أو /ˈskɛdʒuːl/", partOfSpeech: "اسم" },
  weather: { word: "weather", translationAr: "الطقس / الجو", phonetic: "/ˈwɛðər/", partOfSpeech: "اسم" },
  travel: { word: "travel", translationAr: "سفر / يسافر", phonetic: "/ˈtrævəl/", partOfSpeech: "فعل/اسم" },
  london: { word: "london", translationAr: "لندن (عاصمة بريطانيا)", phonetic: "/ˈlʌndən/", partOfSpeech: "اسم علم" },
  english: { word: "english", translationAr: "اللغة الإنجليزية / إنجليزي", phonetic: "/ˈɪŋɡlɪʃ/", partOfSpeech: "لغة/صفة" },
  language: { word: "language", translationAr: "لغة / لسان", phonetic: "/ˈlæŋɡwɪdʒ/", partOfSpeech: "اسم" },
  practice: { word: "practice", translationAr: "ممارسة / تمرين مستمر", phonetic: "/ˈpræktɪs/", partOfSpeech: "اسم/فعل" },
  accent: { word: "accent", translationAr: "لهجة / نبرة صوتية", phonetic: "/ˈæksɛnt/", partOfSpeech: "اسم" },
  pronounce: { word: "pronounce", translationAr: "ينطق / يلفظ الكلمة", phonetic: "/prəˈnaʊns/", partOfSpeech: "فعل" },
  pronunciation: { word: "pronunciation", translationAr: "طريقة النطق واللفظ", phonetic: "/prəˌnʌnsiˈeɪʃən/", partOfSpeech: "اسم" },
  voice: { word: "voice", translationAr: "صوت بشري", phonetic: "/vɔɪs/", partOfSpeech: "اسم" },
  speech: { word: "speech", translationAr: "كلام / خطاب منطوق", phonetic: "/spiːtʃ/", partOfSpeech: "اسم" },
  sound: { word: "sound", translationAr: "صوت مسموع", phonetic: "/saʊnd/", partOfSpeech: "اسم/فعل" },
  word: { word: "word", translationAr: "كلمة / مفردة", phonetic: "/wɜːrd/", partOfSpeech: "اسم" },
  words: { word: "words", translationAr: "كلمات", phonetic: "/wɜːrdz/", partOfSpeech: "اسم جمع" },
  sentence: { word: "sentence", translationAr: "جملة تامة", phonetic: "/ˈsɛntəns/", partOfSpeech: "اسم" },
  question: { word: "question", translationAr: "سؤال / استفسار", phonetic: "/ˈkwɛstʃən/", partOfSpeech: "اسم" },
  answer: { word: "answer", translationAr: "إجابة / يرد (W صامتة)", phonetic: "/ˈænsər/", partOfSpeech: "اسم/فعل" },
  idea: { word: "idea", translationAr: "فكرة", phonetic: "/aɪˈdiːə/", partOfSpeech: "اسم" },
  story: { word: "story", translationAr: "قصة / رواية", phonetic: "/ˈstɔːri/", partOfSpeech: "اسم" },
  friend: { word: "friend", translationAr: "صديق / رفيق", phonetic: "/frɛnd/", partOfSpeech: "اسم" },
  opinion: { word: "opinion", translationAr: "رأي / وجهة نظر", phonetic: "/əˈpɪnjən/", partOfSpeech: "اسم" },
  problem: { word: "problem", translationAr: "مشكلة", phonetic: "/ˈprɑːbləm/", partOfSpeech: "اسم" },
  challenge: { word: "challenge", translationAr: "تحدٍّ", phonetic: "/ˈtʃælɪndʒ/", partOfSpeech: "اسم" },
  champion: { word: "champion", translationAr: "بطل / فائز متفوق", phonetic: "/ˈtʃæmpiən/", partOfSpeech: "اسم" },
  smart: { word: "smart", translationAr: "ذكي / أنيق", phonetic: "/smɑːrt/", partOfSpeech: "صفة" },
  polite: { word: "polite", translationAr: "مهذب / لبق", phonetic: "/pəˈlaɪt/", partOfSpeech: "صفة" },
  gentleman: { word: "gentleman", translationAr: "جنتلمان / رجل شهم مهذب", phonetic: "/ˈdʒɛntəlmən/", partOfSpeech: "اسم" },

  // --- Tech & AI Domain (الذكاء الاصطناعي وهندسة البرمجيات) ---
  database: { word: "database", translationAr: "قاعدة بيانات", phonetic: "/ˈdeɪtəbeɪs/", partOfSpeech: "اسم تقني" },
  latency: { word: "latency", translationAr: "زمن التأخير / سرعة الاستجابة", phonetic: "/ˈleɪtənsi/", partOfSpeech: "اسم تقني" },
  cache: { word: "cache", translationAr: "ذاكرة التخزين المؤقت (تنطق CASH)", phonetic: "/kæʃ/", partOfSpeech: "اسم تقني" },
  architecture: { word: "architecture", translationAr: "معمارية النظام / البنية البرمجية", phonetic: "/ˈɑːrkɪtɛktʃər/", partOfSpeech: "اسم تقني" },
  algorithm: { word: "algorithm", translationAr: "خوارزمية حسابية", phonetic: "/ˈælɡəˌrɪðəm/", partOfSpeech: "اسم تقني" },
  microservices: { word: "microservices", translationAr: "خدمات مصغرة مستقلة", phonetic: "/ˈmaɪkroʊˌsɜːrvɪsɪz/", partOfSpeech: "اسم تقني" },
  frontend: { word: "frontend", translationAr: "واجهة المستخدم الأمامية", phonetic: "/ˈfrʌntˌɛnd/", partOfSpeech: "اسم تقني" },
  backend: { word: "backend", translationAr: "الأنظمة والخدمات الخلفية", phonetic: "/ˈbækˌɛnd/", partOfSpeech: "اسم تقني" },
  framework: { word: "framework", translationAr: "إطار عمل برمجي", phonetic: "/ˈfreɪmwɜːrk/", partOfSpeech: "اسم تقني" },
  asynchronous: { word: "asynchronous", translationAr: "غير متزامن (Async)", phonetic: "/eɪˈsɪŋkrənəs/", partOfSpeech: "صفة تقنية" },
  server: { word: "server", translationAr: "خادم / سيرفر", phonetic: "/ˈsɜːrvər/", partOfSpeech: "اسم تقني" },
  cloud: { word: "cloud", translationAr: "الحوسبة السحابية / سحابة", phonetic: "/klaʊd/", partOfSpeech: "اسم تقني" },
  code: { word: "code", translationAr: "شفرة برمجية / كود", phonetic: "/koʊd/", partOfSpeech: "اسم" },
  system: { word: "system", translationAr: "نظام / منظومة", phonetic: "/ˈsɪstəm/", partOfSpeech: "اسم" },

  // --- Medicine & Healthcare Domain (الطب والرعاية الصحية) ---
  patient: { word: "patient", translationAr: "مريض / صبور", phonetic: "/ˈpeɪʃənt/", partOfSpeech: "اسم/صفة" },
  symptom: { word: "symptom", translationAr: "عَرَض مرضي", phonetic: "/ˈsɪmptəm/", partOfSpeech: "اسم طبي" },
  symptoms: { word: "symptoms", translationAr: "أعراض مرضية", phonetic: "/ˈsɪmptəmz/", partOfSpeech: "اسم جمع" },
  diagnosis: { word: "diagnosis", translationAr: "تشخيص طبي دقيق", phonetic: "/ˌdaɪəɡˈnoʊsɪs/", partOfSpeech: "اسم طبي" },
  prescription: { word: "prescription", translationAr: "وصفة علاجية / روشتة", phonetic: "/prɪˈskrɪpʃən/", partOfSpeech: "اسم طبي" },
  anesthesia: { word: "anesthesia", translationAr: "تخدير طبي جراحي", phonetic: "/ˌænəsˈθiːʒə/", partOfSpeech: "اسم طبي" },
  chronic: { word: "chronic", translationAr: "مزمن (مستمر لفترة طويلة)", phonetic: "/ˈkrɑːnɪk/", partOfSpeech: "صفة طبية" },
  clinical: { word: "clinical", translationAr: "سريري / إكلينيكي", phonetic: "/ˈklɪnɪkəl/", partOfSpeech: "صفة طبية" },
  dosage: { word: "dosage", translationAr: "جرعة دوائية مقدرة", phonetic: "/ˈdoʊsɪdʒ/", partOfSpeech: "اسم طبي" },
  hospital: { word: "hospital", translationAr: "مستشفى", phonetic: "/ˈhɑːspɪtl/", partOfSpeech: "اسم" },
  doctor: { word: "doctor", translationAr: "طبيب / دكتور", phonetic: "/ˈdɑːktər/", partOfSpeech: "اسم" },
  nurse: { word: "nurse", translationAr: "ممرض / ممرضة", phonetic: "/nɜːrs/", partOfSpeech: "اسم" },

  // --- Business & Startups (إدارة الأعمال والشركات) ---
  revenue: { word: "revenue", translationAr: "إيرادات / دخل مالي", phonetic: "/ˈrɛvənuː/", partOfSpeech: "مصطلح مالي" },
  valuation: { word: "valuation", translationAr: "تقييم مالي للشركة", phonetic: "/ˌvæljuˈeɪʃən/", partOfSpeech: "مصطلح تجاري" },
  pitch: { word: "pitch", translationAr: "عرض تقديمي للمستثمرين", phonetic: "/pɪtʃ/", partOfSpeech: "اسم/فعل" },
  roi: { word: "ROI", translationAr: "العائد على الاستثمار", phonetic: "/ˌɑːr.oʊˈaɪ/", partOfSpeech: "مصطلح مالي" },
  customer: { word: "customer", translationAr: "عميل / زبون", phonetic: "/ˈkʌstəmər/", partOfSpeech: "اسم" },
  investor: { word: "investor", translationAr: "مستثمر مالي", phonetic: "/ɪnˈvɛstər/", partOfSpeech: "اسم" },
  negotiation: { word: "negotiation", translationAr: "مفاوضات تجارية", phonetic: "/nɪˌɡoʊʃiˈeɪʃən/", partOfSpeech: "اسم" },
  strategy: { word: "strategy", translationAr: "استراتيجية / خطة محكمة", phonetic: "/ˈstrætədʒi/", partOfSpeech: "اسم" },
  market: { word: "market", translationAr: "سوق تجاري", phonetic: "/ˈmɑːrkɪt/", partOfSpeech: "اسم" },
  company: { word: "company", translationAr: "شركة / مؤسسة", phonetic: "/ˈkʌmpəni/", partOfSpeech: "اسم" },

  // --- Law & Diplomacy (القانون والدبلوماسية) ---
  contract: { word: "contract", translationAr: "عقد قانوني ملزم", phonetic: "/ˈkɑːntrækt/", partOfSpeech: "مصطلح قانوني" },
  clause: { word: "clause", translationAr: "بند / فقرة قانونية", phonetic: "/klɔːz/", partOfSpeech: "مصطلح قانوني" },
  jurisdiction: { word: "jurisdiction", translationAr: "اختصاص قضائي / ولاية المحكمة", phonetic: "/ˌdʒʊərɪsˈdɪkʃən/", partOfSpeech: "مصطلح قانوني" },
  treaty: { word: "treaty", translationAr: "معاهدة دولية رسمية", phonetic: "/ˈtriːti/", partOfSpeech: "اسم سياسي" },
  diplomacy: { word: "diplomacy", translationAr: "دبلوماسية وسياسة دولية", phonetic: "/dɪˈploʊməsi/", partOfSpeech: "اسم" },
  arbitration: { word: "arbitration", translationAr: "تحكيم قضائي وفض نزاعات", phonetic: "/ˌɑːrbɪˈtreɪʃən/", partOfSpeech: "مصطلح قانوني" },
  court: { word: "court", translationAr: "محكمة قضائية", phonetic: "/kɔːrt/", partOfSpeech: "اسم" },
  law: { word: "law", translationAr: "قانون / تشريع", phonetic: "/lɔː/", partOfSpeech: "اسم" },

  // --- Tourism & Aviation (السياحة والضيافة) ---
  airport: { word: "airport", translationAr: "مطار دولي", phonetic: "/ˈɛərpɔːrt/", partOfSpeech: "اسم" },
  flight: { word: "flight", translationAr: "رحلة طيران جوية", phonetic: "/flaɪt/", partOfSpeech: "اسم" },
  hotel: { word: "hotel", translationAr: "فندق / نُزُل", phonetic: "/hoʊˈtɛl/", partOfSpeech: "اسم" },
  concierge: { word: "concierge", translationAr: "مسؤول خدمة النزلاء VIP", phonetic: "/kɒnsiˈɛərʒ/", partOfSpeech: "مصطلح ضيافة" },
  itinerary: { word: "itinerary", translationAr: "جدول / مسار وتفاصيل الرحلة", phonetic: "/aɪˈtɪnərɛri/", partOfSpeech: "اسم" },
  customs: { word: "customs", translationAr: "الجمارك ومراقبة الحدود", phonetic: "/ˈkʌstəmz/", partOfSpeech: "اسم جمع" },
  ticket: { word: "ticket", translationAr: "تذكرة سفر", phonetic: "/ˈtɪkɪt/", partOfSpeech: "اسم" },
  passport: { word: "passport", translationAr: "جواز سفر", phonetic: "/ˈpæspɔːrt/", partOfSpeech: "اسم" },

  // --- Engineering (الهندسة والعمارة) ---
  blueprints: { word: "blueprints", translationAr: "مخططات هندسية تفصيلية", phonetic: "/ˈbluːprɪnts/", partOfSpeech: "اسم هندسي" },
  concrete: { word: "concrete", translationAr: "خرسانة مسلحة / ملموس", phonetic: "/ˈkɑːnkriːt/", partOfSpeech: "اسم/صفة" },
  integrity: { word: "integrity", translationAr: "سلامة وتكامل البيانات / نزاهة", phonetic: "/ɪnˈtɛɡrɪti/", partOfSpeech: "مصطلح جودة بيانات" },
  structural: { word: "structural", translationAr: "هيكلي / إنشائي", phonetic: "/ˈstrʌktʃərəl/", partOfSpeech: "صفة هندسية" },
  tolerance: { word: "tolerance", translationAr: "نسبة التفاوت المسموح بها هندسياً", phonetic: "/ˈtɑːlərəns/", partOfSpeech: "مصطلح هندسي" },
  bridge: { word: "bridge", translationAr: "جسر / كوبري", phonetic: "/brɪdʒ/", partOfSpeech: "اسم" },
  design: { word: "design", translationAr: "تصميم / يخطط", phonetic: "/dɪˈzaɪn/", partOfSpeech: "اسم/فعل" },

  // --- Digital Data Quality (جودة البيانات الرقمية وحوكمتها) ---
  accuracy: { word: "accuracy", translationAr: "دقة البيانات وصحتها", phonetic: "/ˈækjərəsi/", partOfSpeech: "بُعد جودة بيانات" },
  completeness: { word: "completeness", translationAr: "اكتمال وشمولية البيانات (بدون حقول مفقودة)", phonetic: "/kəmˈpliːtnəs/", partOfSpeech: "بُعد جودة بيانات" },
  consistency: { word: "consistency", translationAr: "اتساق وتناغم البيانات عبر الأنظمة", phonetic: "/kənˈsɪstənsi/", partOfSpeech: "بُعد جودة بيانات" },
  timeliness: { word: "timeliness", translationAr: "حداثة البيانات وتوفرها في الوقت المناسب", phonetic: "/ˈtaɪmlinəs/", partOfSpeech: "بُعد جودة بيانات" },
  validity: { word: "validity", translationAr: "صلاحية البيانات ومطابقتها للقواعد والصيغ", phonetic: "/vəˈlɪdəti/", partOfSpeech: "بُعد جودة بيانات" },
  uniqueness: { word: "uniqueness", translationAr: "تفرد البيانات وعدم تكرار السجلات", phonetic: "/juˈniːknəs/", partOfSpeech: "بُعد جودة بيانات" },
  cleansing: { word: "cleansing", translationAr: "تنظيف وتنقية البيانات من الأخطاء", phonetic: "/ˈklɛnzɪŋ/", partOfSpeech: "عملية بيانات" },
  scrubbing: { word: "scrubbing", translationAr: "تنقية وفرك البيانات التالفة", phonetic: "/ˈskrʌbɪŋ/", partOfSpeech: "عملية بيانات" },
  deduplication: { word: "deduplication", translationAr: "إزالة السجلات المكررة ودمجها", phonetic: "/ˌdiːˌdjuːplɪˈkeɪʃən/", partOfSpeech: "عملية بيانات" },
  profiling: { word: "profiling", translationAr: "توصيف وفحص خصائص البيانات إحصائياً", phonetic: "/ˈproʊfaɪlɪŋ/", partOfSpeech: "عملية بيانات" },
  lineage: { word: "lineage", translationAr: "سلسلة نسب وتتبع مصدر ومسار البيانات", phonetic: "/ˈlɪniɪdʒ/", partOfSpeech: "حوكمة بيانات" },
  governance: { word: "governance", translationAr: "حوكمة البيانات وإدارتها المؤسسية", phonetic: "/ˈɡʌvərnəns/", partOfSpeech: "حوكمة بيانات" },
  metadata: { word: "metadata", translationAr: "البيانات الوصفية (بيانات تصف البيانات)", phonetic: "/ˈmɛtədeɪtə/", partOfSpeech: "حوكمة بيانات" },
  anomaly: { word: "anomaly", translationAr: "شذوذ أو قيمة متطرفة غير طبيعية في البيانات", phonetic: "/əˈnɒməli/", partOfSpeech: "مصطلح بيانات" },
  outliers: { word: "outliers", translationAr: "القيم المتطرفة الشاذة إحصائياً", phonetic: "/ˈaʊtlaɪərz/", partOfSpeech: "مصطلح بيانات" },
  schema: { word: "schema", translationAr: "المخطط الهيكلي لقاعدة البيانات", phonetic: "/ˈskiːmə/", partOfSpeech: "مصطلح بيانات" },
  validation: { word: "validation", translationAr: "التحقق من الصحة والمطابقة", phonetic: "/ˌvælɪˈdeɪʃən/", partOfSpeech: "مصطلح بيانات" },
  standardization: { word: "standardization", translationAr: "توحيد معايير وصيغ البيانات", phonetic: "/ˌstændərdəˈzeɪʃən/", partOfSpeech: "عملية بيانات" },
  stewardship: { word: "stewardship", translationAr: "الإشراف والوصاية على جودة البيانات", phonetic: "/ˈstjuːərdʃɪp/", partOfSpeech: "حوكمة بيانات" },
  pipeline: { word: "pipeline", translationAr: "خط أنابيب نقل ومعالجة البيانات", phonetic: "/ˈpaɪplaɪn/", partOfSpeech: "هندسة بيانات" },
  etl: { word: "ETL", translationAr: "استخراج وتحويل وتحميل البيانات (Extract, Transform, Load)", phonetic: "/ˌiː.tiːˈɛl/", partOfSpeech: "هندسة بيانات" },
  drift: { word: "drift", translationAr: "انحراف وتغير خصائص البيانات بمرور الزمن", phonetic: "/drɪft/", partOfSpeech: "مصطلح بيانات" },
  null: { word: "null", translationAr: "قيمة فارغة أو مفقودة في الحقل", phonetic: "/nʌl/", partOfSpeech: "مصطلح برمجي" },
  duplicate: { word: "duplicate", translationAr: "نسخة مكررة / سجل مزدوج", phonetic: "/ˈdjuːplɪkət/", partOfSpeech: "اسم/صفة" },
  dataset: { word: "dataset", translationAr: "مجموعة بيانات", phonetic: "/ˈdeɪtəsɛt/", partOfSpeech: "اسم" },
  warehouse: { word: "warehouse", translationAr: "مستودع البيانات المركزي", phonetic: "/ˈwɛərhaʊs/", partOfSpeech: "اسم" },
  hierarchy: { word: "hierarchy", translationAr: "التسلسل الهرمي للبيانات أو الإدارة", phonetic: "/ˈhaɪərɑːrki/", partOfSpeech: "اسم" },

  // --- Stores, Groceries & Cafés (المتاجر والبقالات والمقاهي) ---
  aisle: { word: "aisle", translationAr: "ممر في البقالة أو السوبرماركت (حرف S صامت!)", phonetic: "/aɪl/", partOfSpeech: "اسم مكان" },
  grocery: { word: "grocery", translationAr: "بقالة / مواد تموينية وغذائية", phonetic: "/ˈɡroʊsəri/", partOfSpeech: "اسم" },
  groceries: { word: "groceries", translationAr: "مقاضي ومشتريات البقالة", phonetic: "/ˈɡroʊsəriz/", partOfSpeech: "اسم جمع" },
  supermarket: { word: "supermarket", translationAr: "سوبرماركت / متجر تموين كبير", phonetic: "/ˈsuːpərmɑːrkɪt/", partOfSpeech: "اسم" },
  cashier: { word: "cashier", translationAr: "أمين الصندوق / الكاشير", phonetic: "/kæˈʃɪər/", partOfSpeech: "اسم مهنة" },
  discount: { word: "discount", translationAr: "خصم / تخفيض في السعر", phonetic: "/ˈdɪskaʊnt/", partOfSpeech: "اسم" },
  refund: { word: "refund", translationAr: "استرداد المبلغ المدفوع", phonetic: "/ˈriːfʌnd/", partOfSpeech: "اسم/فعل" },
  exchange: { word: "exchange", translationAr: "استبدال السلعة بأخرى", phonetic: "/ɪksˈtʃeɪndʒ/", partOfSpeech: "فعل/اسم" },
  fitting: { word: "fitting", translationAr: "قياس الملابس (Fitting Room: غرفة القياس)", phonetic: "/ˈfɪtɪŋ/", partOfSpeech: "اسم/صفة" },
  size: { word: "size", translationAr: "مقاس / حجم", phonetic: "/saɪz/", partOfSpeech: "اسم" },
  medium: { word: "medium", translationAr: "مقاس متوسط (M)", phonetic: "/ˈmiːdiəm/", partOfSpeech: "صفة" },
  organic: { word: "organic", translationAr: "عضوي وطبيعي طازج", phonetic: "/ɔːrˈɡænɪk/", partOfSpeech: "صفة" },
  espresso: { word: "espresso", translationAr: "قهوة إسبريسو مركزة (بدون حرف X!)", phonetic: "/ɛˈsprɛsoʊ/", partOfSpeech: "مشروب مقهى" },
  latte: { word: "latte", translationAr: "قهوة لاتيه بالحليب", phonetic: "/ˈlɑːteɪ/", partOfSpeech: "مشروب مقهى" },
  croissant: { word: "croissant", translationAr: "فطيرة كرواسون فرنسية", phonetic: "/ˈkwæsɒ̃/", partOfSpeech: "مخبوزات" },
  takeaway: { word: "takeaway", translationAr: "طلب سفري (خارج المقهى/المطعم)", phonetic: "/ˈteɪkəweɪ/", partOfSpeech: "مصطلح مقاهي" },
  barista: { word: "barista", translationAr: "مُعدّ القهوة المختصة في المقهى", phonetic: "/bəˈriːstə/", partOfSpeech: "اسم" },
  bill: { word: "bill", translationAr: "فاتورة الحساب في المقهى أو المطعم", phonetic: "/bɪl/", partOfSpeech: "اسم" },
  basket: { word: "basket", translationAr: "سلة التسوق", phonetic: "/ˈbæskɪt/", partOfSpeech: "اسم" },

  // --- Job Interview Vocabulary (مصطلحات المقابلة الشخصية للتوظيف) ---
  interview: { word: "interview", translationAr: "مقابلة شخصية للتوظيف", phonetic: "/ˈɪntərvjuː/", partOfSpeech: "اسم/فعل" },
  candidate: { word: "candidate", translationAr: "مرشح للوظيفة", phonetic: "/ˈkændɪdət/", partOfSpeech: "اسم" },
  strengths: { word: "strengths", translationAr: "نقاط القوة والتميز المهني", phonetic: "/strɛŋkθs/", partOfSpeech: "اسم جمع" },
  weaknesses: { word: "weaknesses", translationAr: "نقاط الضعف أو مجالات التطوير", phonetic: "/ˈwiːknəsɪz/", partOfSpeech: "اسم جمع" },
  deadline: { word: "deadline", translationAr: "موعد نهائي للتسليم", phonetic: "/ˈdɛdlaɪn/", partOfSpeech: "اسم" },
  deadlines: { word: "deadlines", translationAr: "المواعيد النهائية للتسليم", phonetic: "/ˈdɛdlaɪnz/", partOfSpeech: "اسم جمع" },
  leadership: { word: "leadership", translationAr: "القيادة وإدارة الفرق", phonetic: "/ˈliːdərʃɪp/", partOfSpeech: "اسم" },
  expertise: { word: "expertise", translationAr: "خبرة تخصصية عميقة", phonetic: "/ˌɛkspɜːrˈtiːz/", partOfSpeech: "اسم" },
  spearheaded: { word: "spearheaded", translationAr: "قادَ وتصدر المبادرة بنجاح", phonetic: "/ˈspɪərhɛdɪd/", partOfSpeech: "فعل ماضٍ قوي" },
  collaborated: { word: "collaborated", translationAr: "تعاونَ وعمل بشكل مشترك مع الفريق", phonetic: "/kəˈlæbəreɪtɪd/", partOfSpeech: "فعل ماضٍ" },
  resolved: { word: "resolved", translationAr: "حلّ وعالج المشكلة جذرياً", phonetic: "/rɪˈzɒlvd/", partOfSpeech: "فعل ماضٍ" },
  salary: { word: "salary", translationAr: "الراتب والأجر الشهري", phonetic: "/ˈsæləri/", partOfSpeech: "اسم" }
};

// Look up a word (strips punctuation, tests singular/plural/lower case and common affixes)
export function lookupWord(rawWord: string): WordDefinition | null {
  const clean = rawWord.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean || clean.length < 1) return null;

  // Direct hit in dictionary
  if (CORE_DICTIONARY[clean]) {
    return CORE_DICTIONARY[clean];
  }

  // Singularize if ends with 'ies' -> 'y' (hobbies -> hobby)
  if (clean.endsWith('ies') && CORE_DICTIONARY[clean.slice(0, -3) + 'y']) {
    const base = CORE_DICTIONARY[clean.slice(0, -3) + 'y'];
    return { ...base, word: clean, translationAr: `(جمع): ${base.translationAr}` };
  }

  // Singularize if ends with 'es' or 's'
  if (clean.endsWith('es') && CORE_DICTIONARY[clean.slice(0, -2)]) {
    const base = CORE_DICTIONARY[clean.slice(0, -2)];
    return { ...base, word: clean, translationAr: `(جمع): ${base.translationAr}` };
  }
  if (clean.endsWith('s') && CORE_DICTIONARY[clean.slice(0, -1)]) {
    const base = CORE_DICTIONARY[clean.slice(0, -1)];
    return { ...base, word: clean, translationAr: `(جمع): ${base.translationAr}` };
  }

  // Stem 'ing' (continuous verb)
  if (clean.endsWith('ing')) {
    const stem = clean.slice(0, -3);
    if (CORE_DICTIONARY[stem]) {
      const base = CORE_DICTIONARY[stem];
      return { ...base, word: clean, translationAr: `(فعل مستمر): ${base.translationAr}` };
    }
    // doubled consonant: running -> run
    if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2] && CORE_DICTIONARY[stem.slice(0, -1)]) {
      const base = CORE_DICTIONARY[stem.slice(0, -1)];
      return { ...base, word: clean, translationAr: `(فعل مستمر): ${base.translationAr}` };
    }
  }

  // Stem 'ed' (past verb)
  if (clean.endsWith('ed')) {
    const stem = clean.slice(0, -2);
    if (CORE_DICTIONARY[stem]) {
      const base = CORE_DICTIONARY[stem];
      return { ...base, word: clean, translationAr: `(فعل ماضٍ): ${base.translationAr}` };
    }
    if (CORE_DICTIONARY[clean.slice(0, -1)]) {
      const base = CORE_DICTIONARY[clean.slice(0, -1)];
      return { ...base, word: clean, translationAr: `(فعل ماضٍ): ${base.translationAr}` };
    }
  }

  // Stem 'ly' (adverb)
  if (clean.endsWith('ly') && CORE_DICTIONARY[clean.slice(0, -2)]) {
    const base = CORE_DICTIONARY[clean.slice(0, -2)];
    return { ...base, word: clean, translationAr: `(بشكل/بصفة): ${base.translationAr}`, partOfSpeech: "حال (Adverb)" };
  }

  // Fallback for general unmapped English words
  return {
    word: clean,
    translationAr: `مفردة إنجليزية (${clean})`,
    phonetic: `/${clean}/`,
    partOfSpeech: "مفردة محادثة"
  };
}
