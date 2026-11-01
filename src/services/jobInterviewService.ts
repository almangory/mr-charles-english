export interface InterviewQuestionItem {
  id: string;
  stepNumber: number;
  questionEn: string;
  questionAr: string;
  interviewerNoteAr: string;
  powerKeywords: string[];
  sampleAnswerEn: string;
  sampleAnswerAr: string;
}

export interface InterviewTrack {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: string;
  badgeAr: string;
  descriptionAr: string;
  questions: InterviewQuestionItem[];
}

export const JOB_INTERVIEW_TRACKS: InterviewTrack[] = [
  {
    id: 'general-hr',
    titleAr: 'المقابلة الشخصية العامة (HR & السلوكية)',
    titleEn: 'General HR & Behavioral Interview',
    icon: '💼',
    badgeAr: 'أساسي لكل الوظائف',
    descriptionAr: 'الأسئلة الأكثر شيوعاً في كافة مقابلات التوظيف: التعريف بالنفس، نقاط القوة، التعامل مع ضغوط العمل، ولماذا نختارك.',
    questions: [
      {
        id: 'hr-1',
        stepNumber: 1,
        questionEn: 'Welcome! Please have a seat. Could you start by telling me about yourself and your professional journey?',
        questionAr: 'أهلاً بك! تفضل بالجلوس. هل يمكنك البدء بالتحدث عن نفسك وعن مسيرتك المهنية باختصار؟',
        interviewerNoteAr: 'ركز على خبراتك العملية، مهاراتك الأساسية، وما الذي يثير شغفك في هذا الدور الوظيفي.',
        powerKeywords: ['experienced', 'dedicated', 'passionate', 'track record', 'expertise'],
        sampleAnswerEn: 'Certainly! I am a dedicated professional with a strong track record in problem-solving and teamwork. Over the past years, I have developed deep expertise in delivering accurate results under tight deadlines.',
        sampleAnswerAr: 'بكل سرور! أنا مهني متفانٍ ولدي سجل قوي في حل المشكلات والعمل الجماعي. خلال السنوات الماضية، طورت خبرة عميقة في تقديم نتائج دقيقة ضمن المواعيد النهائية الضيقة.'
      },
      {
        id: 'hr-2',
        stepNumber: 2,
        questionEn: 'What would you consider to be your greatest professional strength, and how has it helped you succeed?',
        questionAr: 'ما هي أعظم نقطة قوة مهنية لديك في رأيك، وكيف ساعدتك على تحقيق النجاح؟',
        interviewerNoteAr: 'اذكر مهارة حقيقية مدعومة بمثال عملي (مثل الدقة، القيادة، أو التواصل الفعال).',
        powerKeywords: ['analytical thinking', 'attention to detail', 'adaptability', 'proactive', 'efficiency'],
        sampleAnswerEn: 'My greatest strength is my sharp attention to detail combined with proactive communication. It allows me to spot subtle errors early and keep the entire team aligned.',
        sampleAnswerAr: 'أعظم نقاط قوتي هي دقتي الشديدة في التفاصيل مع التواصل الاستباقي. فهذا يمكنني من اكتشاف الأخطاء الدقيقة مبكراً وإبقاء الفريق بأكمله على توافق تام.'
      },
      {
        id: 'hr-3',
        stepNumber: 3,
        questionEn: 'Tell me about a challenging situation or conflict you faced at work, and how you resolved it calmly.',
        questionAr: 'حدثني عن موقف صعب أو تحدٍ واجهته في العمل، وكيف تمكنت من حله بهدوء واحترافية؟',
        interviewerNoteAr: 'استخدم منهجية STAR: الموقف (Situation)، المهمة (Task)، الإجراء (Action)، والنتيجة (Result).',
        powerKeywords: ['resolved', 'collaborated', 'prioritized', 'prevented chaos', 'measurable outcome'],
        sampleAnswerEn: 'When our project faced a sudden deadline shift, I prevented chaos by reorganizing our daily priorities and collaborating closely with stakeholders, delivering the project on time.',
        sampleAnswerAr: 'عندما واجه مشروعنا تغييراً مفاجئاً في موعد التسليم، منعت الفوضى عبر إعادة تنظيم أولوياتنا اليومية والتعاون الوثيق مع أصحاب المصلحة، وسلمنا المشروع في موعده.'
      },
      {
        id: 'hr-4',
        stepNumber: 4,
        questionEn: 'How do you handle high-pressure deadlines when multiple urgent tasks arrive simultaneously?',
        questionAr: 'كيف تتعامل مع ضغط العمل والمواعيد النهائية عندما تتزاحم عليك عدة مهام عاجلة في نفس الوقت؟',
        interviewerNoteAr: 'أظهر قدرتك على ترتيب الأولويات والهدوء تحت الضغط دون التضحية بالجودة.',
        powerKeywords: ['time management', 'structured approach', 'composure', 'critical path', 'quality assurance'],
        sampleAnswerEn: 'I maintain calm composure and use a structured approach to evaluate urgency versus impact. I communicate transparently with my manager and execute the critical path first.',
        sampleAnswerAr: 'أحافظ على رباطة جأشي وأستخدم نهجاً منظماً لتقييم درجة الأهمية مقابل التأثير. أتواصل بشفافية مع مديري وأنفذ المسار الحرج أولاً.'
      },
      {
        id: 'hr-5',
        stepNumber: 5,
        questionEn: 'Why do you want to join our organization specifically, and what value will you bring in your first ninety days?',
        questionAr: 'لماذا ترغب في الانضمام إلى مؤسستنا تحديداً، وما القيمة التي ستضيفها خلال أول 90 يوماً؟',
        interviewerNoteAr: 'اربط بين طموحك ورؤية الشركة، ووضح خطتك السريعة لإحداث أثر إيجابي.',
        powerKeywords: ['innovation', 'contribute', 'immediate impact', 'strategic goals', 'continuous improvement'],
        sampleAnswerEn: 'I admire your commitment to excellence and innovation. In my first ninety days, I will master your workflows, streamline operations, and contribute to your strategic goals.',
        sampleAnswerAr: 'أنا معجب بالتزامكم بالتميز والابتكار. في أول تسعين يوماً لي، سأتقن مسارات العمل لديكم، وأبسط العمليات، وأساهم بفاعلية في أهدافكم الاستراتيجية.'
      },
      {
        id: 'hr-6',
        stepNumber: 6,
        questionEn: 'Finally, where do you see your career in five years, and do you have any questions for me?',
        questionAr: 'ختاماً، أين ترى مسيرتك المهنية بعد خمس سنوات، وهل لديك أي أسئلة لي؟',
        interviewerNoteAr: 'أظهر طموحك للنمو داخل المؤسسة، واطرح سؤالاً ذكياً يعكس اهتمامك بثقافة العمل.',
        powerKeywords: ['leadership', 'long-term growth', 'mentorship', 'company culture', 'success metrics'],
        sampleAnswerEn: 'In five years, I envision myself growing into a leadership role here while mentoring junior colleagues. Could you tell me how you measure success for this position?',
        sampleAnswerAr: 'بعد خمس سنوات، أتطلع للنمو في دور قيادي هنا مع توجيه الزملاء الجدد. هل يمكنك إخباري كيف تقيسون النجاح المتميز في هذا المنصب؟'
      }
    ]
  },
  {
    id: 'data-quality-interview',
    titleAr: 'مقابلة أخصائي جودة البيانات الرقمية وحوكمتها',
    titleEn: 'Digital Data Quality & Governance Specialist',
    icon: '📊',
    badgeAr: 'تخصص جودة البيانات',
    descriptionAr: 'مقابلة تخصصية دقيقة تركز على أبعاد جودة البيانات الستة، تنقية البيانات (Data Cleansing)، الـ ETL، وحوكمة البيانات.',
    questions: [
      {
        id: 'dq-1',
        stepNumber: 1,
        questionEn: 'How do you define Digital Data Quality, and which of the six core dimensions do you prioritize first?',
        questionAr: 'كيف تعرّف جودة البيانات الرقمية، وأيّاً من أبعاد الجودة الستة تضع في صدارة أولوياتك؟',
        interviewerNoteAr: 'استعرض الأبعاد الستة: Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness.',
        powerKeywords: ['data accuracy', 'completeness', 'consistency', 'validity', 'uniqueness', 'timeliness'],
        sampleAnswerEn: 'Digital data quality measures how fit data is for its intended purpose. I prioritize accuracy, completeness, and consistency first because reliable analytics depend on trustworthy foundations.',
        sampleAnswerAr: 'تقيس جودة البيانات الرقمية مدى ملاءمة البيانات للغرض المخصص لها. أضع الدقة والاكتمال والاتساق في المقدمة لأن التحليلات الموثوقة تعتمد على أسس سليمة.'
      },
      {
        id: 'dq-2',
        stepNumber: 2,
        questionEn: 'Walk me through how you conduct Data Profiling and Data Cleansing on a messy legacy dataset.',
        questionAr: 'اشرح لي خطوة بخطوة كيف تجري توصيف البيانات (Data Profiling) وتنقيتها (Data Cleansing) لقاعدة بيانات قديمة ومشوهة.',
        interviewerNoteAr: 'تحدث عن فحص القيم الفارغة، إزالة التكرار (Deduplication)، وتوحيد المعايير (Standardization).',
        powerKeywords: ['data profiling', 'data cleansing', 'deduplication', 'standardization', 'null values'],
        sampleAnswerEn: 'First, I perform data profiling to assess null values and outliers. Next, I build automated data cleansing rules for standardization and deduplication before loading.',
        sampleAnswerAr: 'أولاً، أقوم بتوصيف البيانات لتقييم القيم الفارغة والشاذة. بعد ذلك، أبني قواعد تنقية آلية لتوحيد الصيغ وإزالة التكرار قبل التحميل.'
      },
      {
        id: 'dq-3',
        stepNumber: 3,
        questionEn: 'Why is Data Lineage critical for enterprise Data Governance and regulatory compliance?',
        questionAr: 'لماذا تُعد سلسلة نسب البيانات (Data Lineage) حيوية جداً لحوكمة البيانات والامتثال التنظيمي؟',
        interviewerNoteAr: 'وضح كيف يساعد تتبع مصدر البيانات في كشف الأخطاء سريعاً وبناء الثقة في التقارير.',
        powerKeywords: ['data lineage', 'data governance', 'traceability', 'root cause analysis', 'metadata'],
        sampleAnswerEn: 'Data lineage provides full traceability from source to dashboard. When an anomaly appears, lineage enables rapid root cause analysis and guarantees regulatory compliance.',
        sampleAnswerAr: 'توفر سلسلة نسب البيانات إمكانية تتبع كاملة من المصدر إلى لوحة المؤشرات. وعند ظهور أي شذوذ، تمكننا من تحليل السبب الجذري بسرعة وضمان الامتثال.'
      },
      {
        id: 'dq-4',
        stepNumber: 4,
        questionEn: 'How do you prevent bad data from entering an ETL pipeline in real time?',
        questionAr: 'كيف تمنع البيانات التالفة من الدخول إلى خط أنابيب البيانات (ETL Pipeline) في الوقت الفعلي؟',
        interviewerNoteAr: 'اذكر التحقق من المخطط (Schema Validation)، بوابات الجودة، واكتشاف الشذوذ (Anomaly Detection).',
        powerKeywords: ['schema validation', 'ETL pipeline', 'anomaly detection', 'data integrity', 'quarantine'],
        sampleAnswerEn: 'I implement strict schema validation and automated anomaly detection gates inside the ETL pipeline to quarantine invalid records and protect data integrity.',
        sampleAnswerAr: 'أطبق التحقق الصارم من المخطط الهيكلي وبوابات اكتشاف الشذوذ الآلية داخل خط أنابيب ETL لعزل السجلات غير الصالحة وحماية سلامة البيانات.'
      }
    ]
  },
  {
    id: 'tech-software',
    titleAr: 'مقابلة هندسة البرمجيات وتقنية المعلومات',
    titleEn: 'Software Engineering & IT Interview',
    icon: '💻',
    badgeAr: 'تقني وهندسي',
    descriptionAr: 'مقابلة تقنية للمبرمجين ومهندسي النظم: معمارية الأنظمة، الأداء، قواعد البيانات، وأمن المعلومات.',
    questions: [
      {
        id: 'tech-1',
        stepNumber: 1,
        questionEn: 'Tell me about the most complex software architecture or technical system you have built recently.',
        questionAr: 'حدثني عن أكثر معمارية برمجية أو نظام تقني معقد قمت ببنائه مؤخراً.',
        interviewerNoteAr: 'اذكر التقنيات المستخدمة، كيف ضمنت السرعة، وقابلية التوسع (Scalability).',
        powerKeywords: ['scalable architecture', 'low latency', 'microservices', 'cloud-native', 'high availability'],
        sampleAnswerEn: 'I recently architected a cloud-native web platform with edge caching and strict database indexing, reducing API latency by sixty percent under heavy traffic.',
        sampleAnswerAr: 'قمت مؤخراً بهندسة منصة ويب سحابية مع التخزين المؤقت الطرفي وفهرسة دقيقة لقاعدة البيانات، مما خفض زمن الاستجابة بنسبة ستين بالمائة.'
      },
      {
        id: 'tech-2',
        stepNumber: 2,
        questionEn: 'How do you ensure code quality, security, and zero regressions before deploying to production?',
        questionAr: 'كيف تضمن جودة الكود، والأمان السيبراني، وعدم حدوث أعطال قبل النشر في بيئة الإنتاج؟',
        interviewerNoteAr: 'تحدث عن مراجعة الكود، الاختبارات الآلية، وفحص الثغرات الأمنية.',
        powerKeywords: ['automated testing', 'code review', 'CI/CD pipeline', 'security audit', 'type safety'],
        sampleAnswerEn: 'We enforce strict type safety, peer code reviews, automated end-to-end testing, and security audits in our CI/CD pipeline before every release.',
        sampleAnswerAr: 'نفرض سلامة الأنواع الصارمة، ومراجعة الكود بين الزملاء، والاختبارات الشاملة الآلية، والتدقيق الأمني قبل كل إصدار.'
      },
      {
        id: 'tech-3',
        stepNumber: 3,
        questionEn: 'Describe how you diagnose and resolve a sudden production bottleneck or database slowdown.',
        questionAr: 'صف لي كيف تشخص وتعالج اختناقاً مفاجئاً في الأداء أو بطئاً في قاعدة البيانات أثناء التشغيل الحي.',
        interviewerNoteAr: 'ركز على تحليل الاستعلامات، الكاش، ومراقبة السجلات (Observability).',
        powerKeywords: ['query optimization', 'indexing', 'caching strategy', 'observability', 'bottleneck'],
        sampleAnswerEn: 'I inspect observability metrics and query execution plans to isolate the bottleneck, then apply targeted indexing and caching strategies to restore peak performance.',
        sampleAnswerAr: 'أفحص مؤشرات المراقبة وخطط تنفيذ الاستعلامات لعزل موطن الاختناق، ثم أطبق فهرسة موجهة واستراتيجيات تخزين مؤقت لاستعادة الأداء الأقصى.'
      }
    ]
  },
  {
    id: 'customer-sales',
    titleAr: 'مقابلة المبيعات وخدمة العملاء وإدارة المتاجر',
    titleEn: 'Retail, Sales & Customer Excellence Interview',
    icon: '🏪',
    badgeAr: 'مبيعات وضيافة',
    descriptionAr: 'مقابلة لوظائف إدارة المتاجر، المبيعات، الكافيهات، وخدمة العملاء الراقية.',
    questions: [
      {
        id: 'cs-1',
        stepNumber: 1,
        questionEn: 'How do you welcome a customer and create an unforgettable first impression in a store or café?',
        questionAr: 'كيف ترحب بالعميل وتصنع انطباعاً أولياً لا يُنسى في المتجر أو المقهى؟',
        interviewerNoteAr: 'أبرز اللباقة، الابتسامة، والاستماع النشط لاحتياجات العميل.',
        powerKeywords: ['warm hospitality', 'active listening', 'attentive service', 'welcoming atmosphere', 'customer satisfaction'],
        sampleAnswerEn: 'I greet every guest with a warm smile, attentive eye contact, and active listening to understand their exact preferences and deliver five-star hospitality.',
        sampleAnswerAr: 'أحيي كل ضيف بابتسامة دافئة واهتمام صادق واستماع فعال لفهم تفضيلاته بدقة وتقديم ضيافة من فئة الخمس نجوم.'
      },
      {
        id: 'cs-2',
        stepNumber: 2,
        questionEn: 'Tell me how you would handle an upset customer who received the wrong order or wants a refund.',
        questionAr: 'أخبرني كيف ستتعامل مع عميل غاضب استلم طلباً خاطئاً أو يطالب باسترداد المبلغ؟',
        interviewerNoteAr: 'الأهم هو التعاطف، الاعتذار اللبق، وتقديم حل فوري يحول العميل الغاضب إلى عميل دائم.',
        powerKeywords: ['empathy', 'sincere apology', 'swift resolution', 'receipt', 'customer loyalty'],
        sampleAnswerEn: 'I listen with genuine empathy, offer a sincere apology without making excuses, and provide a swift replacement or refund with a receipt to earn their lasting loyalty.',
        sampleAnswerAr: 'أستمع بتعاطف حقيقي، وأقدم اعتذاراً صادقاً دون اختلاق أعذار، وأوفر استبدالاً فورياً أو استرداداً للمبلغ مع الإيصال لكسب ولائهم الدائم.'
      }
    ]
  }
];
