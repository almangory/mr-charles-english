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

// Master Conversational Engine: Emotional Correction + Direct Answer (Even Off-Topic!)
export function generateCharlesResponse(
  userQuery: string,
  _scenario?: ScenarioTopic,
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
  let initialEmotion: AvatarEmotion = 'proud';

  if (detectedTrap) {
    initialEmotion = 'angry';
    correctionText = `${detectedTrap.angryQuote} Take note: ${detectedTrap.word} is pronounced ${detectedTrap.phonetic}!`;
    correctionArabic = `⚠️ صدمة درامية لمستر منقوري بسبب نطق كلمة (${detectedTrap.word})! انتبه: النطق هو ${detectedTrap.arabicHint}.`;
  }

  // 2. Answer the user's actual question or statement (EVEN IF COMPLETELY OFF-TOPIC!)
  let answerText = '';
  let answerArabic = '';

  // === A. Personal Questions about Mr. Mangory ===
  if (query.includes('who are you') || query.includes('what is your name') || query.includes('your name')) {
    answerText =
      "I am Mr. Mangory (مستر منقوري)! Born in the misty heart of Victorian London, educated at Oxford, and fueled entirely by Earl Grey tea, crumpets, and grammatical perfection! At your gracious service!";
    answerArabic =
      "أنا مستر منقوري! وُلدت في قلب لندن الفيكتورية، وتعلمت في أكسفورد، وطاقتي مستمدة بالكامل من شاي إيرل غراي والفطائر الإنجليزية والدقة النحوية! في خدمتك دائماً!";
  } else if (query.includes('how old are you') || query.includes('your age')) {
    answerText =
      "Good heavens, what an inquisitive inquiry! A true English gentleman never reveals his precise vintage. Let us simply say I have witnessed centuries of linguistic blunders and refined every one of them!";
    answerArabic =
      "يا للهول، يا له من استفسار فضولي! الجنتلمان الإنجليزي الحقيقي لا يكشف عن عمره بدقة أبداً. دعنا نقول فقط إنني شهدت قروناً من العثرات اللغوية وقمت بتصحيحها جميعاً!";
  } else if (query.includes('are you real') || query.includes('are you human') || query.includes('are you ai') || query.includes('robot')) {
    answerText =
      "Real? Real in spirit, intellect, and aristocratic wit, my dear fellow! Whether crafted of clockwork gears or modern silicon, my dedication to the King's English is absolute!";
    answerArabic =
      "حقيقي؟ حقيقي بالروح والفكر والدعابة الأرستقراطية يا عزيزي! وسواء كنت مصنوعاً من تروس الساعة العتيقة أو رقائق السيليكون الحديثة، فإن إخلاصي للإنجليزية الملكية مطلق!";
  }

  // === B. Sports & Athletics (Off-topic common subject) ===
  else if (query.includes('football') || query.includes('messi') || query.includes('ronaldo') || query.includes('soccer') || query.includes('barcelona') || query.includes('real madrid') || query.includes('cricket')) {
    answerText =
      "Ah, athletics! While cricket at Lord's and rowing along the River Thames are the traditional pastimes of distinction, I cannot deny the drama of a thrilling football match! Tell me, are you a clinical striker or a defensive maestro?";
    answerArabic =
      "آه، الرياضة! بينما لعبة الكريكيت والتجديف في نهر التايمز هما الهوايتان التقليديتان للنبلاء، لا يمكنني إنكار الإثارة في مباراة كرة القدم! أخبرني، هل أنت مهاجم قناص أم مايسترو دفاعي؟";
  }

  // === C. Food, Drinks & Coffee (Off-topic) ===
  else if (query.includes('coffee') || query.includes('pizza') || query.includes('burger') || query.includes('shawarma') || query.includes('sweet') || query.includes('chocolate') || query.includes('restaurant')) {
    answerText =
      "Gastronomy! A splendid subject close to every discerning palate! Though coffee has its charms, nothing in the civilized empire surpasses a fresh porcelain pot of Earl Grey tea paired with warm scones! What is your favorite cuisine?";
    answerArabic =
      "فن الطهي والمأكولات! موضوع بديع قريب من كل ذائقة رفيعة! ومع أن القهوة لها سحرها، إلا أنه لا شيء في الإمبراطورية يضاهي إبريق الخزف لشاي إيرل غراي مع الكعك الإنجليزي الدافئ! ما هو طبقك المفضل؟";
  }

  // === D. Technology, Computers & AI (Off-topic) ===
  else if (query.includes('computer') || query.includes('programming') || query.includes('python') || query.includes('javascript') || query.includes('code') || query.includes('phone') || query.includes('app')) {
    answerText =
      "Marvelous modern technology! Writing elegant, clean code is remarkably like composing high-level English prose: precision, syntax, and discipline are paramount! What fascinating project are you engineering?";
    answerArabic =
      "يا لها من تكنولوجيا حديثة مبهرة! كتابة الشفرة البرمجية الأنيقة تشبه إلى حد كبير نظم النثر الإنجليزي الرفيع: فالدقة وبناء الجمل والانضباط أمور لا غنى عنها! ما المشروع الرائع الذي تعمل على هندسته؟";
  }

  // === E. Movies, Music & Arts ===
  else if (query.includes('movie') || query.includes('film') || query.includes('song') || query.includes('music') || query.includes('cinema') || query.includes('art') || query.includes('actor')) {
    answerText =
      "Ah, the fine arts! Shakespeare's sonnets, timeless theatrical masterpieces, and majestic melodies stir the noble heart! A cultured soul must always nurture their imagination. What artistic creation inspires you most?";
    answerArabic =
      "آه، الفنون الرفيعة! سوناتات شكسبير والروائع المسرحية الخالدة والألحان المهيبة تحرك القلوب النبيلة! الروح المتحضرة تغذي خيالها دائماً. ما العمل الفني الذي يلهمك أكثر؟";
  }

  // === F. Weather & Climate ===
  else if (query.includes('weather') || query.includes('rain') || query.includes('hot') || query.includes('cold') || query.includes('sun') || query.includes('winter') || query.includes('summer')) {
    answerText =
      "The weather! A classic British topic of polite banter! Over here it is drizzling with philosophical gloom, yet we carry our brollies with stiff upper lip composure. How is the temperature and sky in your region?";
    answerArabic =
      "الطقس! الموضوع البريطاني الكلاسيكي للحديث الودي! هنا تمطر برذاذ من الكآبة الفلسفية، ومع ذلك نحمل مظلاتنا بكل رباطة جأش ووقار. كيف هي درجات الحرارة والسماء في منطقتك؟";
  }

  // === G. Sudan & Travel ===
  else if (query.includes('sudan') || query.includes('khartoum') || query.includes('nile') || query.includes('travel') || query.includes('london') || query.includes('trip') || query.includes('fly')) {
    answerText =
      "The grandeur of travel! From the confluence of the two Niles to the historic bells of Westminster, traversing the globe enriches the mind! An articulate traveler with polished English is embraced in every royal palace! Where do you dream of journeying next?";
    answerArabic =
      "روعة السفر والترحال! من ملتقى النيلين الخالد إلى أجراس وستمنستر التاريخية، يجوب المرء العالم ليثري مداركه! والمسافر الفصيح بإنجليزيته المصقولة مرحب به في كل مجلس. إلى أين تحلم بالسفر تالياً؟";
  }

  // === H. Feelings, Life & Philosophy ===
  else if (query.includes('tired') || query.includes('happy') || query.includes('sad') || query.includes('bored') || query.includes('life') || query.includes('love') || query.includes('hard') || query.includes('easy')) {
    answerText =
      "A profound reflection upon the human condition! Life is an epic journey of challenges and triumphs. Keep your chin held high, maintain a brisk stride, and let eloquence illuminate your path! Tell me more about what is in your heart!";
    answerArabic =
      "تأمل عميق في أحوال النفس الإنسانية! الحياة رحلة ملحمية من التحديات والانتصارات. ارفع رأسك عالياً، واثبت في خطاك، ودع الفصاحة تنير دربك! أخبرني المزيد عما يجيش في خاطرك!";
  }

  // === I. Primary Kids Context (Levels 1 - 4) ===
  else if (level.id <= 4) {
    const kidsStarters = [
      {
        text: "You are doing such a brilliant job speaking English with me! I am clapping with joy! What is your favorite toy or game to play?",
        arabic: "أنت تقوم بعمل رائع ومبهر جداً في التحدث معي بالإنجليزية! أنا أصفق لك بفرح! ما هي لعبتك المفضلة التي تحب أن تلعبها؟"
      },
      {
        text: "That was wonderful, my little superstar! Your voice brings sunshine into my Victorian study! Tell me, what animal or color do you love the most?",
        arabic: "كان هذا رائعاً يا بطلي الصغير المتألق! صوتك يدخل البهجة والضياء إلى غرفتي الفيكتورية! أخبرني، ما هو الحيوان أو اللون المفضل لديك؟"
      },
      {
        text: "Hooray! Big golden stars for your cheerful effort! Keep speaking proudly and clearly! Can you tell me what you did today?",
        arabic: "يا سلام! نجوم ذهبية كبيرة لجهدك المبهج! واصل التحدث بكل ثقة ووضوح! هل تخبرني ماذا فعلت اليوم؟"
      }
    ];
    const picked = kidsStarters[Math.floor(Math.random() * kidsStarters.length)];
    answerText = picked.text;
    answerArabic = picked.arabic;
  }

  // === J. Specialized Domains (Levels 9 - 12) ===
  else if (level.id >= 9 && domain.id !== 'general') {
    if (domain.id === 'tech') {
      answerText = `Spoken with true engineering rigour! When architecting systems around ${domain.keywords.slice(0, 2).join(' and ')}, precision in language mirrors precision in code. How do you approach scalability in this domain?`;
      answerArabic = `حديث يتسم بالانضباط الهندسي الرفيع! عند تصميم الأنظمة المرتكزة على هذه المفاهيم، فإن دقة الكلمات تعكس دقة الشفرة البرمجية. كيف تضمن قابلية التوسع هنا؟`;
    } else if (domain.id === 'medicine') {
      answerText = `Exemplary clinical intellect! Navigating complex cases involving ${domain.keywords.slice(0, 2).join(' and ')} demands acute observational acumen and flawless terminology. What differential diagnosis would you formulate?`;
      answerArabic = `فراسة سريرية نموذجية! التعامل مع الحالات الطبية المعقدة يتطلب دقة ملاحظة ومصطلحات لا تشوبها شائبة. ما التشخيص التفريقي الذي ستضعه هنا؟`;
    } else if (domain.id === 'business') {
      answerText = `A formidable commercial proposition! In top-tier boardrooms, commanding the discourse around ${domain.keywords.slice(0, 2).join(' and ')} guarantees strategic leverage. What are your projected unit economics?`;
      answerArabic = `طرح تجاري رفيع المستوى! في مجالس الإدارة الرفيعة، إتقان الحديث حول هذه المفاهيم يضمن أعلى نفوذ استراتيجي. ما توقعاتك لاقتصاديات الوحدة؟`;
    } else {
      answerText = `A sharp, professional perspective in the field of ${domain.nameEn}! Your eloquence commands attention. Pray expand upon your thesis!`;
      answerArabic = `منظور مهني دقيق وواثق في مجال ${domain.nameAr}! فصاحتك تفرض الاحترام. تفضل بالتوسع في طرحك!`;
    }
  }

  // === K. General Intelligent Fallback for ANY Random or Off-Topic Statement ===
  else {
    const generalOffTopicPicks = [
      {
        text: "A truly captivating thought! You expressed that with delightful clarity. As an English gentleman, I appreciate anyone who articulates their mind with conviction. Pray tell me, what inspired that line of thought?",
        arabic: "فكرة آسرة حقاً! لقد عبرت عنها بوضوح يبعث على البهجة. كجنتلمان إنجليزي، أقدر كل من يعبر عن رأيه بقناعة وثقة. أخبرني بربك، ما الذي ألهمك هذا التفكير؟"
      },
      {
        text: "Most intriguing! Even when our conversation wanders into unexpected avenues, your command of expression remains pleasing to my ears! Continue, my dear chap, I am all ears!",
        arabic: "مثير للاهتمام للغاية! حتى عندما تنعطف محادثتنا نحو مسارات غير متوقعة، فإن تحكمك في التعبير يطرب أذني! تابع يا صديقي العزيز، كلي آذان صاغية!"
      },
      {
        text: "Capital! A mind that leaps boldly from topic to topic is the mark of lively intellect! Let us explore this further—what is your ultimate perspective on the matter?",
        arabic: "ممتاز جداً! العقل الذي يقفز بجرأة وذكاء بين الموضوعات هو علامة الفطنة الحية! دعنا نستكشف هذا أكثر، ما رأيك النهائي في هذا الأمر؟"
      }
    ];
    const picked = generalOffTopicPicks[Math.floor(Math.random() * generalOffTopicPicks.length)];
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
    emotion: initialEmotion,
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
