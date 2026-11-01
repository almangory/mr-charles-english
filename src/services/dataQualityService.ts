export type DataQualityCategory = 'dimensions' | 'operations' | 'governance';

export interface DataQualityTerm {
  id: string;
  termEn: string;
  termAr: string;
  category: DataQualityCategory;
  categoryLabelAr: string;
  phonetic: string;
  pronunciationHintAr: string;
  definitionAr: string;
  definitionEn: string;
  exampleEn: string;
  exampleAr: string;
  practicePrompt: string;
  icon: string;
}

export const DATA_QUALITY_CATEGORIES: Array<{
  id: 'all' | DataQualityCategory;
  labelAr: string;
  labelEn: string;
  icon: string;
}> = [
  { id: 'all', labelAr: 'كل المصطلحات (20)', labelEn: 'All Terms', icon: '📊' },
  { id: 'dimensions', labelAr: 'أبعاد الجودة الستة', labelEn: '6 Core Dimensions', icon: '🎯' },
  { id: 'operations', labelAr: 'التنقية والمعالجة (ETL)', labelEn: 'Cleansing & ETL', icon: '🧹' },
  { id: 'governance', labelAr: 'حوكمة وأمن البيانات', labelEn: 'Data Governance', icon: '🏛️' }
];

export const DIGITAL_DATA_QUALITY_TERMS: DataQualityTerm[] = [
  // ================= 1. THE 6 CORE DIMENSIONS OF DATA QUALITY =================
  {
    id: 'accuracy',
    termEn: 'Data Accuracy',
    termAr: 'دقة البيانات وصحتها',
    category: 'dimensions',
    categoryLabelAr: 'أبعاد الجودة الستة',
    phonetic: '/ˈækjərəsi/',
    pronunciationHintAr: 'أَكْ-يُورَ-سِي (بتفخيم خفيف للمقطع الأول)',
    definitionAr: 'مدى مطابقة البيانات المخزنة للواقع الفعلي والحقيقي دون أخطاء إملائية أو رقمية.',
    definitionEn: 'The degree to which data correctly reflects the real-world object or event being described.',
    exampleEn: 'High data accuracy ensures that customer billing addresses match their real physical locations.',
    exampleAr: 'تضمن دقة البيانات العالية مطابقة عناوين فواتير العملاء لمواقعهم الفعلية الحقيقية.',
    practicePrompt: 'How do we verify data accuracy across our customer database?',
    icon: '🎯'
  },
  {
    id: 'completeness',
    termEn: 'Data Completeness',
    termAr: 'اكتمال وشمولية البيانات',
    category: 'dimensions',
    categoryLabelAr: 'أبعاد الجودة الستة',
    phonetic: '/kəmˈpliːtnəs/',
    pronunciationHintAr: 'كَمْ-بْلِيتْ-نِسْ (بحرف P واضح ومنفوخ)',
    definitionAr: 'توفر كافة الحقول والقيم المطلوبة في السجل وعدم وجود خلايا مفقودة أو فارغة (Null).',
    definitionEn: 'The proportion of stored data against the potential of "100% complete" with zero missing mandatory fields.',
    exampleEn: 'We achieved ninety-nine percent data completeness after eliminating missing phone numbers.',
    exampleAr: 'حققنا نسبة اكتمال للبيانات بلغت 99% بعد معالجة أرقام الهواتف المفقودة.',
    practicePrompt: 'Our dataset suffers from low completeness due to missing email fields.',
    icon: '🧩'
  },
  {
    id: 'consistency',
    termEn: 'Data Consistency',
    termAr: 'اتساق وتناغم البيانات',
    category: 'dimensions',
    categoryLabelAr: 'أبعاد الجودة الستة',
    phonetic: '/kənˈsɪstənsi/',
    pronunciationHintAr: 'كَنْ-سِيسْ-تَنْ-سِي',
    definitionAr: 'تطابق نفس المعلومة وعدم تعارضها عند وجودها في أكثر من جدول أو نظام برمجي داخل المؤسسة.',
    definitionEn: 'The absence of difference when comparing two or more representations of the same data across systems.',
    exampleEn: 'Data consistency requires that a client status in the CRM matches the accounting ledger.',
    exampleAr: 'يتطلب اتساق البيانات أن تتطابق حالة العميل في نظام المبيعات مع سجل المحاسبة.',
    practicePrompt: 'We must enforce data consistency between our cloud warehouse and local records.',
    icon: '⚖️'
  },
  {
    id: 'timeliness',
    termEn: 'Data Timeliness',
    termAr: 'التوقيت المناسب وحداثة البيانات',
    category: 'dimensions',
    categoryLabelAr: 'أبعاد الجودة الستة',
    phonetic: '/ˈtaɪmlinəs/',
    pronunciationHintAr: 'تَايْمْ-لِي-نِسْ',
    definitionAr: 'مدى حداثة البيانات وتوفرها في اللحظة المناسبة لاتخاذ القرار قبل أن تصبح قديمة.',
    definitionEn: 'The degree to which data represent reality from the required point in time for decision-making.',
    exampleEn: 'Real-time analytics relies heavily on data timeliness and low latency.',
    exampleAr: 'تعتمد التحليلات اللحظية بشكل كبير على حداثة البيانات والتوقيت المناسب.',
    practicePrompt: 'Why is data timeliness critical for financial fraud detection?',
    icon: '⏱️'
  },
  {
    id: 'validity',
    termEn: 'Data Validity',
    termAr: 'صلاحية البيانات ومطابقة القواعد',
    category: 'dimensions',
    categoryLabelAr: 'أبعاد الجودة الستة',
    phonetic: '/vəˈlɪdəti/',
    pronunciationHintAr: 'فَ-لِي-دِتِي (التشديد على المقطع الثاني)',
    definitionAr: 'التزام البيانات بالصيغة والنوع والنطاق المسموح به (مثل صيغة التاريخ ISO أو رمز الدولة).',
    definitionEn: 'Conformity of data values to defined business rules, syntax, data types, and acceptable ranges.',
    exampleEn: 'Strict schema rules guarantee data validity before any record enters the database.',
    exampleAr: 'تضمن قواعد المخطط الصارمة صلاحية البيانات قبل دخول أي سجل إلى قاعدة البيانات.',
    practicePrompt: 'Let us implement automated checks to ensure data validity on user forms.',
    icon: '✅'
  },
  {
    id: 'uniqueness',
    termEn: 'Data Uniqueness',
    termAr: 'تفرد البيانات وعدم التكرار',
    category: 'dimensions',
    categoryLabelAr: 'أبعاد الجودة الستة',
    phonetic: '/juˈniːknəs/',
    pronunciationHintAr: 'يُو-نِيكْ-نِسْ',
    definitionAr: 'ضمان تسجيل كل كيان أو مستخدم مرة واحدة فقط دون أي سجلات مكررة أو متداخلة.',
    definitionEn: 'Ensuring that no entity or record exists more than once within the dataset.',
    exampleEn: 'Primary keys and national IDs enforce data uniqueness across all tables.',
    exampleAr: 'تفرض المفاتيح الأساسية وأرقام الهوية الوطنية تفرد البيانات عبر جميع الجداول.',
    practicePrompt: 'How do we maintain data uniqueness when merging two legacy databases?',
    icon: '💎'
  },

  // ================= 2. DATA CLEANSING & ENGINEERING OPERATIONS =================
  {
    id: 'data-cleansing',
    termEn: 'Data Cleansing (Scrubbing)',
    termAr: 'تنظيف وتنقية البيانات',
    category: 'operations',
    categoryLabelAr: 'التنقية والمعالجة (ETL)',
    phonetic: '/ˈdeɪtə ˈklɛnzɪŋ/',
    pronunciationHintAr: 'دِي-تَا كْلِينْ-زِينْغْ',
    definitionAr: 'عملية اكتشاف وتصحيح أو حذف السجلات التالفة أو غير الدقيقة أو المشوهة من قاعدة البيانات.',
    definitionEn: 'The process of detecting and correcting or removing corrupt, inaccurate, or irrelevant records.',
    exampleEn: 'Automated data cleansing removed three thousand malformed rows before training the AI model.',
    exampleAr: 'أزالت عملية تنظيف البيانات الآلية ثلاثة آلاف صف مشوه قبل تدريب نموذج الذكاء الاصطناعي.',
    practicePrompt: 'What are the best practices for automated data cleansing in Python?',
    icon: '🧹'
  },
  {
    id: 'deduplication',
    termEn: 'Deduplication',
    termAr: 'إزالة التكرار ودمج النظائر',
    category: 'operations',
    categoryLabelAr: 'التنقية والمعالجة (ETL)',
    phonetic: '/ˌdiːˌdjuːplɪˈkeɪʃən/',
    pronunciationHintAr: 'دِي-دْيُو-بْلِي-كِي-شَنْ',
    definitionAr: 'تقنية فحص قواعد البيانات لحذف النسخ المكررة من نفس السجل والاحتفاظ بنسخة ذهبية واحدة.',
    definitionEn: 'The technique of eliminating redundant copies of repeating data records.',
    exampleEn: 'Fuzzy matching algorithms accelerated customer deduplication by eighty percent.',
    exampleAr: 'سرّعت خوارزميات المطابقة الذكية عملية إزالة تكرار العملاء بنسبة ثمانين بالمائة.',
    practicePrompt: 'We ran a deduplication pipeline to merge duplicate patient profiles.',
    icon: '✂️'
  },
  {
    id: 'data-profiling',
    termEn: 'Data Profiling',
    termAr: 'توصيف وفحص خصائص البيانات',
    category: 'operations',
    categoryLabelAr: 'التنقية والمعالجة (ETL)',
    phonetic: '/ˈdeɪtə ˈproʊfaɪlɪŋ/',
    pronunciationHintAr: 'دِي-تَا بْرُو-فَايْ-لِينْغْ',
    definitionAr: 'تحليل مصدر البيانات إحصائياً لفهم بنيته، توزيع القيم، نسبة الفراغات، واكتشاف العيوب الخفية.',
    definitionEn: 'Examining data from an existing source to collect statistics and informative summaries about its quality.',
    exampleEn: 'Initial data profiling revealed unexpected null values in the transaction timestamp column.',
    exampleAr: 'كشف توصيف البيانات الأولي عن قيم فارغة غير متوقعة في عمود التوقيت الزمني للمعاملات.',
    practicePrompt: 'Always perform thorough data profiling before designing a new warehouse schema.',
    icon: '🔍'
  },
  {
    id: 'anomaly-detection',
    termEn: 'Anomaly Detection (Outliers)',
    termAr: 'اكتشاف الشذوذ والقيم المتطرفة',
    category: 'operations',
    categoryLabelAr: 'التنقية والمعالجة (ETL)',
    phonetic: '/əˈnɒməli dɪˈtɛkʃən/',
    pronunciationHintAr: 'أَ-نُومَ-لِي دِي-تِيكْ-شَنْ',
    definitionAr: 'رصد النقاط أو السجلات الشاذة التي تنحرف بشكل مريب عن النمط الطبيعي للبيانات.',
    definitionEn: 'Identifying rare items, events, or observations which deviate significantly from the majority of the data.',
    exampleEn: 'Statistical anomaly detection flagged a sensor reading of five hundred degrees as an outlier.',
    exampleAr: 'رصد نظام اكتشاف الشذوذ الإحصائي قراءة مستشعر بدرجة 500 كقيمة متطرفة خاطئة.',
    practicePrompt: 'How does anomaly detection prevent corrupt metrics from skewing executive reports?',
    icon: '🚨'
  },
  {
    id: 'schema-validation',
    termEn: 'Schema Validation',
    termAr: 'التحقق من المخطط الهيكلي',
    category: 'operations',
    categoryLabelAr: 'التنقية والمعالجة (ETL)',
    phonetic: '/ˈskiːmə ˌvælɪˈdeɪʃən/',
    pronunciationHintAr: 'سْكِي-مَا فَا-لِي-دِي-شَنْ (تبدأ بصوت الكاف K)',
    definitionAr: 'فحص هيكل البيانات الواردة (JSON/SQL) للتأكد من تطابق أسماء الحقول وأنواعها مع العقد المحدد.',
    definitionEn: 'Verifying that incoming data conforms strictly to the expected structural schema and data types.',
    exampleEn: 'Strict API schema validation rejects any payload missing the required user identifier.',
    exampleAr: 'يرفض التحقق الصارم من المخطط الهيكلي أي حزمة بيانات تفتقر لمعرف المستخدم المطلوب.',
    practicePrompt: 'We enforce strict schema validation at the API gateway level.',
    icon: '📐'
  },
  {
    id: 'standardization',
    termEn: 'Data Standardization',
    termAr: 'توحيد معايير وصيغ البيانات',
    category: 'operations',
    categoryLabelAr: 'التنقية والمعالجة (ETL)',
    phonetic: '/ˌstændərdəˈzeɪʃən/',
    pronunciationHintAr: 'سْتَانْ-دَر-دَاي-زِي-شَنْ',
    definitionAr: 'تحويل البيانات الواردة من مصادر متعددة إلى صيغة قياسية موحدة (مثل توحيد التواريخ والعملات).',
    definitionEn: 'Transforming data from various sources into a common, uniform format and representation.',
    exampleEn: 'Data standardization converted all regional phone numbers into the international E.164 format.',
    exampleAr: 'حولت عملية توحيد معايير البيانات جميع أرقام الهواتف المحلية إلى الصيغة الدولية الموحدة.',
    practicePrompt: 'Data standardization is essential when integrating global branch offices.',
    icon: '📏'
  },
  {
    id: 'etl-pipeline',
    termEn: 'ETL Pipeline',
    termAr: 'خط أنابيب استخراج وتحويل وتحميل البيانات',
    category: 'operations',
    categoryLabelAr: 'التنقية والمعالجة (ETL)',
    phonetic: '/ˌiː.tiːˈɛl ˈpaɪplaɪn/',
    pronunciationHintAr: 'إِي-تِي-إِلْ بَايْبْ-لَايْنْ',
    definitionAr: 'المسار الآلي الذي يستخرج البيانات (Extract)، ينقيها ويحولها (Transform)، ثم يحملها في المستودع (Load).',
    definitionEn: 'Automated workflow that extracts data from sources, transforms/cleanses it, and loads it into a target warehouse.',
    exampleEn: 'Our nightly ETL pipeline embeds quality gates that halt execution if error thresholds are exceeded.',
    exampleAr: 'يتضمن خط أنابيب ETL الليلي بوابات جودة توقف التنفيذ إذا تجاوزت الأخطاء الحد المسموح.',
    practicePrompt: 'How do you monitor data quality inside a real-time ETL pipeline?',
    icon: '⚙️'
  },

  // ================= 3. DATA GOVERNANCE & ARCHITECTURE =================
  {
    id: 'data-governance',
    termEn: 'Data Governance',
    termAr: 'حوكمة البيانات الرقمية',
    category: 'governance',
    categoryLabelAr: 'حوكمة وأمن البيانات',
    phonetic: '/ˈdeɪtə ˈɡʌvərnəns/',
    pronunciationHintAr: 'دِي-تَا غَ-فَرْ-نَنْسْ',
    definitionAr: 'الإطار المؤسسي الشامل من السياسات والأدوار والمعايير التي تضمن جودة وأمن وموثوقية البيانات.',
    definitionEn: 'The overall management of the availability, usability, integrity, and security of enterprise data.',
    exampleEn: 'Strong data governance establishes clear accountability for every dataset in the organization.',
    exampleAr: 'تُرسي حوكمة البيانات القوية مسؤولية واضحة عن كل مجموعة بيانات داخل المؤسسة.',
    practicePrompt: 'Let us discuss the pillars of an enterprise data governance framework.',
    icon: '🏛️'
  },
  {
    id: 'data-lineage',
    termEn: 'Data Lineage',
    termAr: 'سلسلة نسب وتتبع مصدر البيانات',
    category: 'governance',
    categoryLabelAr: 'حوكمة وأمن البيانات',
    phonetic: '/ˈdeɪtə ˈlɪniɪdʒ/',
    pronunciationHintAr: 'دِي-تَا لِينْ-يِيدْجْ',
    definitionAr: 'تتبع دورة حياة البيانات كاملة: من أين نشأت، وكيف انتقلت، وما التحويلات التي طرأت عليها.',
    definitionEn: 'Tracking the complete lifecycle of data from its origin through all transformations to its final consumption.',
    exampleEn: 'End-to-end data lineage allowed us to trace the dashboard discrepancy back to a source table.',
    exampleAr: 'سمح لنا تتبع سلسلة نسب البيانات الشامل باكتشاف مصدر التضارب في لوحة المؤشرات وإرجاعه للجدول الأصلي.',
    practicePrompt: 'Why do regulatory audits require transparent data lineage?',
    icon: '🧬'
  },
  {
    id: 'data-integrity',
    termEn: 'Data Integrity',
    termAr: 'سلامة وتكامل البيانات المرجعي',
    category: 'governance',
    categoryLabelAr: 'حوكمة وأمن البيانات',
    phonetic: '/ˈdeɪtə ɪnˈtɛɡrɪti/',
    pronunciationHintAr: 'دِي-تَا إِنْ-تِيغْ-رِي-تِي',
    definitionAr: 'حفاظ البيانات على صحتها وترابطها العلائقي وعدم تعرضها للتلف أو التعديل غير المصرح به.',
    definitionEn: 'The maintenance of, and the assurance of, data accuracy and relational consistency over its entire life-cycle.',
    exampleEn: 'Foreign key constraints safeguard referential data integrity across relational databases.',
    exampleAr: 'تحمي قيود المفاتيح الأجنبية سلامة وتكامل البيانات المرجعي عبر قواعد البيانات العلائقية.',
    practicePrompt: 'Compromising data integrity can invalidate months of analytical research.',
    icon: '🛡️'
  },
  {
    id: 'metadata',
    termEn: 'Metadata Management',
    termAr: 'إدارة البيانات الوصفية (بيانات عن البيانات)',
    category: 'governance',
    categoryLabelAr: 'حوكمة وأمن البيانات',
    phonetic: '/ˈmɛtədeɪtə/',
    pronunciationHintAr: 'مِي-تَا-دِي-تَا',
    definitionAr: 'البيانات التي تصف خصائص البيانات الأخرى (مثل اسم المالك، تاريخ الإنشاء، نوع العمود، ومعناه التجاري).',
    definitionEn: 'Data that provides context and information about other data, such as definitions, ownership, and sensitivity.',
    exampleEn: 'A searchable metadata catalog empowers analysts to discover trusted datasets rapidly.',
    exampleAr: 'يمكّن فهرس البيانات الوصفية القابل للبحث المحللين من اكتشاف مجموعات البيانات الموثوقة بسرعة.',
    practicePrompt: 'How does proper metadata management improve team productivity?',
    icon: '🏷️'
  },
  {
    id: 'master-data',
    termEn: 'Master Data Management (MDM)',
    termAr: 'إدارة البيانات الرئيسية الموحدة',
    category: 'governance',
    categoryLabelAr: 'حوكمة وأمن البيانات',
    phonetic: '/ˈmɑːstər ˈdeɪtə/',
    pronunciationHintAr: 'مَاسْ-تَرْ دِي-تَا مَا-نِيدْجْ-مِنْتْ',
    definitionAr: 'منهجية توحيد البيانات الجوهرية للمؤسسة (العملاء، المنتجات، الموظفين) في سجل ذهبي واحد معتمد.',
    definitionEn: 'Creating one single master reference point for critical business entities like customers, products, and vendors.',
    exampleEn: 'Implementing Master Data Management eliminated conflicting customer records across twelve departments.',
    exampleAr: 'قضى تطبيق إدارة البيانات الرئيسية على تضارب سجلات العملاء عبر اثني عشر قسماً.',
    practicePrompt: 'We are creating a Golden Record using Master Data Management.',
    icon: '👑'
  },
  {
    id: 'data-stewardship',
    termEn: 'Data Stewardship',
    termAr: 'الإشراف والوصاية على جودة البيانات',
    category: 'governance',
    categoryLabelAr: 'حوكمة وأمن البيانات',
    phonetic: '/ˈdeɪtə ˈstjuːərdʃɪp/',
    pronunciationHintAr: 'دِي-تَا سْتْيُو-وَرْدْ-شِيبْ',
    definitionAr: 'الدور الإشرافي المسؤول يومياً عن مراقبة جودة البيانات وتعريف مصطلحات الأعمال وحل مشكلاتها.',
    definitionEn: 'The tactical role responsible for overseeing data quality, definitions, and compliance on a day-to-day basis.',
    exampleEn: 'Effective data stewardship bridges the gap between IT engineers and business executives.',
    exampleAr: 'يجسر الإشراف الفعال على البيانات الفجوة بين مهندسي التقنية والمديرين التنفيذيين.',
    practicePrompt: 'What are the daily responsibilities of a Data Steward?',
    icon: '🧭'
  },
  {
    id: 'data-drift',
    termEn: 'Data Drift & Decay',
    termAr: 'انحراف وتقادم البيانات بمرور الزمن',
    category: 'governance',
    categoryLabelAr: 'حوكمة وأمن البيانات',
    phonetic: '/ˈdeɪtə drɪft/',
    pronunciationHintAr: 'دِي-تَا دْرِيفْتْ',
    definitionAr: 'التغير التدريجي في خصائص البيانات أو تقادمها بمرور الوقت مما يؤدي لتراجع دقة النماذج والتقارير.',
    definitionEn: 'Unexpected changes in data distribution or gradual degradation of data accuracy over time.',
    exampleEn: 'Continuous observability alerts our team whenever data drift threatens model accuracy.',
    exampleAr: 'تنبه المراقبة المستمرة فريقنا كلما هدد انحراف البيانات دقة النموذج.',
    practicePrompt: 'How do we detect and mitigate data drift in production systems?',
    icon: '📉'
  }
];
