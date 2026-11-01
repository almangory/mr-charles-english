import confetti from 'canvas-confetti';
import type { ScenarioTopic, PronunciationTrap } from './pronunciationDictionary';
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

export interface CharlesResponseResult {
  replyText: string;
  emotion: AvatarEmotion;
  arabicTranslation: string;
  correctionNotice?: string;
  arabicCorrection?: string;
}

// Master Conversational Engine: Emotional Correction + Direct Answer (With Full Scenario & Emotion Intelligence!)
export function generateCharlesResponse(
  userQuery: string,
  scenario?: ScenarioTopic,
  levelId: number = 1,
  domainId: string = 'general',
  detectedTrap?: PronunciationTrap | null
): CharlesResponseResult {
  const query = userQuery.toLowerCase().trim();
  const level = getLevelById(levelId);
  const domain = getDomainById(domainId);

  // 1. Prepare Emotional Correction Segment if a trap word or mistake was detected
  let correctionText = '';
  let correctionArabic = '';
  let chosenEmotion: AvatarEmotion = 'happy';

  if (detectedTrap) {
    chosenEmotion = 'angry';
    correctionText = `${detectedTrap.angryQuote} Take note: "${detectedTrap.word}" is pronounced ${detectedTrap.phonetic}!`;
    correctionArabic = `⚠️ صدمة درامية لمستر منقوري بسبب نطق كلمة (${detectedTrap.word})! انتبه: النطق الصحيح هو ${detectedTrap.arabicHint}.`;
  }

  // 2. Answer the user's actual question or statement with rich context & emotion
  let answerText = '';
  let answerArabic = '';

  // === A. DIGITAL DATA QUALITY & GOVERNANCE (قسم جودة البيانات الرقمية) ===
  if (
    query.includes('data quality') ||
    query.includes('accuracy') ||
    query.includes('completeness') ||
    query.includes('consistency') ||
    query.includes('timeliness') ||
    query.includes('validity') ||
    query.includes('uniqueness') ||
    query.includes('cleansing') ||
    query.includes('deduplication') ||
    query.includes('lineage') ||
    query.includes('governance') ||
    query.includes('metadata') ||
    query.includes('anomaly') ||
    query.includes('schema') ||
    query.includes('etl') ||
    query.includes('profiling') ||
    query.includes('null') ||
    domain.id === 'data-quality' ||
    scenario?.id === 'digital-data-quality'
  ) {
    if (!detectedTrap) chosenEmotion = 'excited';

    if (query.includes('lineage') || query.includes('governance') || query.includes('metadata')) {
      answerText =
        "Magnificent data governance insight! End-to-end Data Lineage and a rich Metadata catalog give us complete traceability from raw source tables to executive dashboards. How do you enforce data stewardship across your teams?";
      answerArabic =
        "نظرة ثاقبة ومبهرة في حوكمة البيانات! إن تتبع سلسلة نسب البيانات (Data Lineage) وفهرس البيانات الوصفية يمنحاننا شفافية كاملة من الجداول المصدرية حتى لوحات القيادة. كيف تطبقون الإشراف على البيانات في فرقكم؟";
    } else if (query.includes('cleansing') || query.includes('deduplication') || query.includes('etl') || query.includes('profiling') || query.includes('anomaly') || query.includes('null')) {
      answerText =
        "Spot-on engineering! Automated Data Profiling, Data Cleansing, and Deduplication inside the ETL pipeline eliminate null values and outliers before they ever corrupt our analytics warehouse! What validation rules do you run first?";
      answerArabic =
        "هندسة دقيقة في الصميم! إن توصيف البيانات الآلي وتنقيتها وإزالة التكرار داخل خط أنابيب ETL يقضي على القيم الفارغة والشاذة قبل أن تفسد مستودع التحليلات! ما قواعد التحقق التي تشغلونها أولاً؟";
    } else {
      answerText =
        "Brilliant command of Digital Data Quality! When the Six Core Dimensions—Accuracy, Completeness, Consistency, Timeliness, Validity, and Uniqueness—stand in harmony, our database becomes a fortress of truth! Which dimension are you auditing next?";
      answerArabic =
        "إتقان باهر لمصطلحات جودة البيانات الرقمية! عندما تتناغم أبعاد الجودة الستة: الدقة، الاكتمال، الاتساق، التوقيت المناسب، الصلاحية، والتفرد، تصبح قاعدة بياناتنا حصناً للحقيقة! أي بُعد ستقوم بتدقيقه تالياً؟";
    }
  }

  // === B. GROCERY STORE & SUPERMARKET (المخاطبات في البقالات والسوبرماركت) ===
  else if (
    query.includes('aisle') ||
    query.includes('grocery') ||
    query.includes('supermarket') ||
    query.includes('kilo') ||
    query.includes('milk') ||
    query.includes('bread') ||
    query.includes('organic') ||
    query.includes('strawberry') ||
    query.includes('strawberries') ||
    query.includes('cashier') ||
    query.includes('bag') ||
    scenario?.id === 'grocery-supermarket'
  ) {
    if (!detectedTrap) chosenEmotion = 'happy';
    answerText =
      "Right this way in our Royal Grocery Store! Fresh organic vegetables, ripe peaches, and farm milk are located in Aisle Three! At the cashier counter, you may pay by contactless card and receive your crisp receipt in a paper bag. Would you like anything from the bakery section?";
    answerArabic =
      "تفضل من هنا في بقالتنا الملكية! الخضروات العضوية الطازجة والخوخ الناضج والحليب الطازج موجودة في الممر الثالث (Aisle 3)! وعند الكاشير يمكنك الدفع بالبطاقة واستلام إيصالك في كيس ورقي. هل ترغب في شيء من قسم المخبوزات؟";
  }

  // === C. RETAIL STORES & BOUTIQUE SHOPPING (المخاطبات في المتاجر والتسوق) ===
  else if (
    query.includes('size') ||
    query.includes('medium') ||
    query.includes('large') ||
    query.includes('fitting room') ||
    query.includes('jacket') ||
    query.includes('shirt') ||
    query.includes('discount') ||
    query.includes('refund') ||
    query.includes('exchange') ||
    query.includes('clothes') ||
    scenario?.id === 'retail-shopping-store'
  ) {
    if (!detectedTrap) chosenEmotion = 'excited';
    answerText =
      "Splendid choice of attire! We certainly have that in a comfortable medium size, and the fitting room is just to your right. Better yet, there is a twenty percent seasonal discount today, and with your receipt you enjoy a thirty-day exchange or refund guarantee! Shall I wrap it up for you?";
    answerArabic =
      "اختيار رائع وأنيق للغاية! يتوفر لدينا بالتأكيد مقاس متوسط (Medium) مريح، وغرفة القياس على يمينك مباشرة. والأجمل أن هناك خصماً موسمياً بنسبة 20% اليوم، ومع الفاتورة تتمتع بضمان استبدال أو استرجاع لمدة 30 يوماً! هل أغلفها لك؟";
  }

  // === D. CAFÉS, COFFEE SHOPS & BAKERIES (المخاطبات في المقاهي والكافيهات) ===
  else if (
    query.includes('espresso') ||
    query.includes('latte') ||
    query.includes('croissant') ||
    query.includes('cappuccino') ||
    query.includes('oat milk') ||
    query.includes('takeaway') ||
    query.includes('wi-fi') ||
    query.includes('wifi') ||
    query.includes('cafe') ||
    query.includes('coffee') ||
    query.includes('dessert') ||
    scenario?.id === 'cafe-coffee-shop'
  ) {
    if (!detectedTrap) chosenEmotion = 'happy';
    answerText =
      "Coming right up at Café Mangory! One silky double espresso, an iced oat-milk latte, and a buttery warm croissant fresh from the oven! Our Wi-Fi password is 'PoshTea1890'. Will that be for dine-in by the sunny window or takeaway?";
    answerArabic =
      "حاضر فوراً في مقهى منقوري! دبل إسبريسو غني، ولاتيه مثلج بحليب الشوفان، وكرواسون دافئ بالزبدة خرج للتو من الفرن! كلمة مرور الواي فاي هي 'PoshTea1890'. هل تفضله للجلوس في المقهى بجوار النافذة المشرقة أم سفري (Takeaway)؟";
  }

  // === E. JOB INTERVIEW SECTION (قسم إجراء المقابلة الشخصية للتوظيف) ===
  else if (
    query.includes('interview') ||
    query.includes('strength') ||
    query.includes('weakness') ||
    query.includes('deadline') ||
    query.includes('hire') ||
    query.includes('track record') ||
    query.includes('experience') ||
    query.includes('collaborated') ||
    query.includes('resolved') ||
    query.includes('salary') ||
    query.includes('company culture') ||
    scenario?.id === 'job-interview' ||
    domain.id === 'job-interview-domain'
  ) {
    if (!detectedTrap) chosenEmotion = 'proud';
    answerText =
      "Impressive articulation for a job interview! You structured your achievement with executive poise and clear measurable impact. Now, for my next interview question: tell me about a time you faced an unexpected crisis or tight deadline—how did you collaborate with your team to resolve it?";
    answerArabic =
      "صياغة مبهرة جداً في المقابلة الشخصية! لقد عرضت إنجازك بثقة تنفيذية وأثر قابل للقياس. والآن إلى سؤالي التالي في لجنة التوظيف: حدثني عن موقف واجهت فيه أزمة غير متوقعة أو موعداً نهائياً ضيقاً، كيف تعاونت مع فريقك لحله؟";
  }

  // === F. Emotional Empathy: Sadness / Fatigue / Frustration ===
  else if (
    query.includes('sad') ||
    query.includes('tired') ||
    query.includes('exhausted') ||
    query.includes('depressed') ||
    query.includes('crying') ||
    query.includes('difficult') ||
    query.includes('lonely') ||
    query.includes('failed')
  ) {
    if (!detectedTrap) chosenEmotion = 'sad';
    answerText =
      "Oh, my dear friend, my heart truly aches to hear that... Even the grandest souls feel weary under London's grey rain. Take a deep, gentle breath—you are never alone, and I believe in your brilliance with all my heart!";
    answerArabic =
      "آه يا صديقي العزيز، يؤلمني قلبي حقاً لسماع ذلك... حتى أعظم النفوس تشعر بالتعب أحياناً تحت مطر لندن الرمادي. خذ نفساً عميقاً وهادئاً؛ لست وحدك أبداً، وأنا أؤمن بذكائك وتألقك من كل قلبي!";
  }

  // === G. Emotional Surprise / Astonishment ===
  else if (
    query.includes('wow') ||
    query.includes('surprise') ||
    query.includes('unbelievable') ||
    query.includes('shock') ||
    query.includes('secret') ||
    query.includes('million') ||
    query.includes('miracle')
  ) {
    if (!detectedTrap) chosenEmotion = 'surprised';
    answerText =
      "Great Scott! My top hat nearly flew straight through the ceiling! What an astonishing revelation! Pray tell me every single detail at once!";
    answerArabic =
      "يا للعجب! كادت قبعتي العالية أن تطير وتخترق السقف من شدة الدهشة! يا له من خبر مذهل! أخبرني بكل التفاصيل حالاً!";
  }

  // === H. Humor, Jokes & Laughter ===
  else if (
    query.includes('joke') ||
    query.includes('funny') ||
    query.includes('haha') ||
    query.includes('laugh') ||
    query.includes('comedy')
  ) {
    if (!detectedTrap) chosenEmotion = 'laughing';
    answerText =
      "Ha ha ha! Ho ho! Splendid wit, my dear fellow! Nothing brightens a Victorian afternoon quite like a hearty aristocratic chuckle! Tell me another one!";
    answerArabic =
      "ها ها ها! هو هو! دعابة بديعة وخفة ظل رائعة يا صديقي! لا شيء يبهج الظهيرة مثل قهقهة أرستقراطية من القلب! أخبرني بطرفة أخرى!";
  }

  // === I. Personal Questions about Mr. Mangory ===
  else if (query.includes('who are you') || query.includes('what is your name') || query.includes('your name')) {
    if (!detectedTrap) chosenEmotion = 'proud';
    answerText =
      "I am Mr. Mangory (مستر منقوري)! Born in the misty heart of Victorian London, educated at Oxford, and fueled entirely by Earl Grey tea, crumpets, and grammatical perfection! At your gracious service!";
    answerArabic =
      "أنا مستر منقوري! وُلدت في قلب لندن الفيكتورية، وتعلمت في أكسفورد، وطاقتي مستمدة بالكامل من شاي إيرل غراي والفطائر الإنجليزية والدقة النحوية! في خدمتك دائماً!";
  }

  // === J. Primary Kids Context (Levels 1 - 4) ===
  else if (level.id <= 4) {
    if (!detectedTrap) chosenEmotion = 'happy';
    const kidsStarters = [
      {
        text: "You are doing such a brilliant job speaking English with me! I am smiling with so much joy! What is your favorite toy or game to play?",
        arabic: "أنت تقوم بعمل رائع ومبهر جداً في التحدث معي بالإنجليزية! أنا أبتسم بفرح كبير! ما هي لعبتك المفضلة التي تحب أن تلعبها؟"
      },
      {
        text: "That was wonderful, my little superstar! Your voice brings sunshine into my heart! Tell me, what animal or fruit do you love the most?",
        arabic: "كان هذا رائعاً يا بطلي الصغير المتألق! صوتك يدخل البهجة والضياء إلى قلبي! أخبرني، ما هو الحيوان أو الفاكهة المفضلة لديك؟"
      }
    ];
    const picked = kidsStarters[Math.floor(Math.random() * kidsStarters.length)];
    answerText = picked.text;
    answerArabic = picked.arabic;
  }

  // === K. General Intelligent Fallback ===
  else {
    const emotionsPool: AvatarEmotion[] = ['happy', 'proud', 'excited', 'laughing'];
    if (!detectedTrap) {
      chosenEmotion = emotionsPool[Math.floor(Math.random() * emotionsPool.length)];
    }
    const generalPicks = [
      {
        text: "A truly captivating thought! You expressed that with delightful clarity and confidence. Pray tell me, what inspired that perspective?",
        arabic: "فكرة آسرة حقاً! لقد عبرت عنها بوضوح وثقة تبعث على البهجة. أخبرني بربك، ما الذي ألهمك هذه النظرة؟"
      },
      {
        text: "Magnificent expression! Your command of the English language is growing sharper with every sentence! Let us explore this further—what is your next move?",
        arabic: "تعبير مهيب ورائع! إتقانك للغة الإنجليزية يزداد تألقاً مع كل جملة! دعنا نستكشف هذا أكثر، ما هي خطوتك القادمة؟"
      }
    ];
    const picked = generalPicks[Math.floor(Math.random() * generalPicks.length)];
    answerText = picked.text;
    answerArabic = picked.arabic;
  }

  // 3. COMBINE: CORRECTION FIRST + DIRECT ANSWER SECOND!
  let finalReply = '';
  let finalArabic = '';

  if (correctionText) {
    finalReply = `${correctionText}\n\nNow, regarding your thoughts: ${answerText}`;
    finalArabic = `${correctionArabic}\n\n(وفيما يخص حديثك): ${answerArabic}`;
  } else {
    finalReply = answerText;
    finalArabic = answerArabic;
  }

  return {
    replyText: finalReply,
    arabicTranslation: finalArabic,
    emotion: chosenEmotion,
    correctionNotice: correctionText,
    arabicCorrection: correctionArabic
  };
}

// Fire celebratory confetti
export function triggerCelebrationConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#10b981', '#3b82f6', '#ec4899']
    });
  } catch {}
}
