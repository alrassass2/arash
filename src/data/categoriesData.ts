export interface DepartmentInfo {
  id: string;
  name: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  iconName: string;
  image: string;
}

export const DEPARTMENTS: DepartmentInfo[] = [
  {
    id: "facades",
    name: "الواجهات الزجاجية",
    slug: "glass-facades",
    shortDesc: "تصميم وتنفيذ واجهات زجاجية للمحلات والمباني والفلل بأحدث التقنيات الهندسية.",
    fullDesc: "نقدم في زجاج سكريت ابوعريش حلولاً متكاملة للواجهات الزجاجية للمحلات التجارية، المعارض، الفلل والعمائر السكنية في أبو عريش وجيزان. نعتمد على زجاج سيكوريت عالي المقاومة وقطاعات ألمنيوم متينة تعزل الحرارة والصوت وتمنح المبنى طابعاً معمارياً فخماً.",
    features: [
      "مقاومة فائقة للرياح والحرارة العالية والرطوبة",
      "زجاج سيكوريت سماكة 10 مم و 12 مم معتمد",
      "خيارات زجاج عاكس، شفاف، ملون أو مثلج",
      "إكسسوارات وهياكل تثبيت مخفية أو ظاهرة عصرية"
    ],
    specs: [
      { label: "سماكة الزجاج", value: "10 مم - 12 مم سيكوريت" },
      { label: "نوع القطاع", value: "ألمنيوم ثقيل معالج حرارياً" },
      { label: "عزل الصوت والحرارة", value: "عزل حراري وصوتي بنسبة تصل إلى 85%" }
    ],
    iconName: "Building2",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzLwFPFYJqjgZG5vZtjDMm2eQINfE1Wb8Za9PoH2MeOVdwKR6jsMCmKSpCMmKO-m0kW5MD_TEtBGDTBVM_2FGGGWiI4V-McD9USE4m6fV4kLu7r0W4u2c8EuSfpgHG-AXJKh5cHpRyQhoh7ZEtmbZR06rIx_7ne66XxHOr_JybICt31Nc51tIwcqFQ/s1600/%D8%A7%D9%84%D9%88%D8%A7%D8%AC%D9%87%D8%A7%D8%AA%204.jpg"
  },
  {
    id: "curtain-wall",
    name: "استركشر زجاج",
    slug: "structural-glass",
    shortDesc: "واجهات استركشر زجاجية بدون فواصل معدنية بارزة للمباني التجارية والأبراج.",
    fullDesc: "تنفيذ واجهات زجاج استركشر (Curtain Wall) بأحدث الأنظمة الإنشائية التي توفر إطلالة بانورامية ساحرة بدون قطاعات ألمنيوم ظاهرة من الخارج. يتميز هذا النظام بقدرته الفائقة على عزل مياه الأمطار والحرارة المرتفعة لمنطقة جازان وأبو عريش.",
    features: [
      "تصميم بانورامي موحد بدون فواصل معدنية خارجية",
      "زجاج دبل جلاس عازل للحرارة والصوت",
      "سيليكون إنشائي معتمد ومقاوم للعوامل الجوية",
      "مطابقة لمواصفات كود البناء السعودي"
    ],
    specs: [
      { label: "نوع الزجاج", value: "دبل سيكوريت (6+12+6 مم)" },
      { label: "نظام التثبيت", value: "هيكل استركشر هيكلي معزول" },
      { label: "معامل العزل", value: "Low-E عاكس للأشعة فوق البنفسجية" }
    ],
    iconName: "Layers",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgd31uzsj3szKbDdn-RNYfrFNDpr76pQOnEi37DP18obtanUTP0epwwQz2oI5XHYkUfnvhzGYYf3Nnj2Xy5z4PDY3gmYlPyyai5BnbgsXPtbvnBZyURWVEMvIHqglOQTUtMlkr3gj6XWvpt0rXujN4g61fZeR_R42iL205zIfnsx9tcK7z-U0sIg7IH/s320/%D9%84%D9%88%D8%AD%D8%A9%20%D9%85%D8%AD%D9%84%20%D8%A7%D8%A8%D9%88%D8%B9%D8%B1%D9%8A%D8%B4%202.webp"
  },
  {
    id: "doors",
    name: "أبواب زجاجية",
    slug: "glass-doors",
    shortDesc: "أبواب زجاج سيكوريت مفصلية وسحابة وأوتوماتيكية بحساسات للمحلات والشركات.",
    fullDesc: "نصمم ونركب جميع أنواع الأبواب الزجاجية السيكوريت: أبواب محلات تجارية، أبواب فلل داخلية وخارجية، أبواب سحابة توفر المساحة، وأبواب أوتوماتيكية ذكية تعمل بالحساسات والحركة في أبو عريش، مع ماكينات أرضية هيدروليكية إيطالية تدوم طويلاً.",
    features: [
      "ماكينات أرضية هيدروليكية إيطالية عالية التحمل",
      "أنظمة فتح أوتوماتيكية بالحساسات الذكية",
      "مقابض ستانلس ستيل فاخرة بأشكال وأطوال متعددة",
      "أقفال أمان سفلية وعلوية ضد السرقة"
    ],
    specs: [
      { label: "سماكة الزجاج", value: "10 مم أو 12 مم سيكوريت مقوى" },
      { label: "نوع الحركة", value: "مفصلي / سحاب سلايدنج / أوتوماتيكي ذكي" },
      { label: "الضمان", value: "ضمان 3 سنوات على الماكينات والإكسسوارات" }
    ],
    iconName: "DoorOpen",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivr3OtcJXeiF6qx1haGOW_4RhykBkMF-5YA5dm0hHFBy_6U6Vj77nrCkquyP8OvsW8ICnyunu0iTpRKB4dU0LfxZP01BVH6JIDWo1IbIorhab0TJi_kMw1vfy8Q-x4tOpvbU8wxfASJk5Y2_qI2hpIX7jjDOMyOPBop6WDy5MbMj8p0X3lD6KUPEbZ/s1600/%D9%88%D8%A7%D8%AC%D9%87%D8%A76.jpg"
  },
  {
    id: "balconies",
    name: "بلكونات زجاجية",
    slug: "glass-balconies",
    shortDesc: "بلكونات زجاجية بدون إطارات وأنظمة إغلاق الشرفات البانورامية الحديثة.",
    fullDesc: "نظام إغلاق وتسييج البلكونات بالزجاج السيكوريت بدون إطارات رأسية يوفر لك رؤية بانورامية كاملة للمناظر الخارجية مع حماية المنزل من الغبار، الرياح، والضوضاء، وقابلية طي الزجاج وسحبه بالكامل عند الرغبة.",
    features: [
      "نظام زجاج قابل للطي والسحب بزاوية 90 درجة",
      "إغلاق محكم يمنع دخول الأتربة ومياه الأمطار",
      "حماية وأمان كامل للأطفال والعائلة",
      "عزل صوتي فائق يمنحك هدوءاً داخلياً تاماً"
    ],
    specs: [
      { label: "نوع الزجاج", value: "زجاج سيكوريت معالج 10 مم" },
      { label: "المسارات", value: "مسار ألمنيوم علوي وسفلي معزول" },
      { label: "نظام الطي", value: "فتح كلي أو جزئي سلس وسهل التنظيف" }
    ],
    iconName: "Maximize2",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHgozg-THGe1eY7Td7ZXCZZckNb87XOKVJIauDm6wP-XxWntTNxc-fPOcBbMx5xcgME9zEI-O89WFfh_LAVHVDGLw3b1we0nqk6xNLkGx_maSvgAoKWn9jswlusGb_yYmUihdM_shtj56mC43pi80TjJ-ppbHQtnWQ_8P3CBHVL527OEQlERjQgy0U/s1600/%D8%A8%D9%84%D9%83%D9%88%D9%86%D8%A7%D8%AA4.jpg"
  },
  {
    id: "partitions",
    name: "مكاتب وقواطع",
    slug: "office-partitions",
    shortDesc: "قواطع زجاجية للمكاتب والشركات تمنح بيئة العمل اتساعاً وخصوصية راقية.",
    fullDesc: "تنفيذ قواطع زجاج سيكوريت لتقسيم المساحات الإدارية والمكاتب والشركات في أبو عريش وجيزان. تمنح القواطع الزجاجية إحساساً بالرحابة والشفافية وتسمح بتوزيع الإضاءة الطبيعية مع إمكانية إضافة تصاميم الساندبلاست المثلج للخصوصية.",
    features: [
      "فواصل عصرية تزيد من أناقة المكاتب والشركات",
      "خيارات زجاج سادة أو مثلج برسومات وشعارات مخصصة",
      "عزل صوتي يحقق الخصوصية اللازمة للاجتماعات",
      "إمكانية دمج أبواب زجاجية مدمجة بأنظمة هيدروليكية"
    ],
    specs: [
      { label: "الزجاج", value: "10 مم أو 12 مم سيكوريت آمن" },
      { label: "التثبيت", value: "نظام U-Channel نحيف أو كلبسات ستيل" },
      { label: "الديكور", value: "استيكر مثلج / حفر رملي لشعار الشركة" }
    ],
    iconName: "Grid",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCPOJse0dllbRDIh7MyYbVvwWIkFHV0G0rXv2YMVokBmn8HoUTxiTT-henCuIdi5dmTFNVvzKm1AoQiSXfV6MM2od66ovBx1URgsUkwH-6zloZjq9dhNyhshQNsjxc2oMYmGz7GDI1rrWm6CLeHBnwljwj3r4zciKGz_hO0KasIb7zZAUNgyIWUBP7/s1600/%D9%85%D9%83%D8%A7%D8%AA%D8%A8%20%D8%B2%D8%AC%D8%A7%D8%AC%D9%8A%D8%A9.jpg"
  },
  {
    id: "handrails",
    name: "نوافذ ودرابزين",
    slug: "windows-handrails",
    shortDesc: "درابزين زجاجي للسلالم والشرفات ونوافذ حرارية عازلة للصوت والغبار.",
    fullDesc: "تفصيل وتركيب درابزين زجاجي مودرن للدرج الداخلي والخارجي، مسابح، وممرات الفلل بأبو عريش. كما نقدم تفصيل شبابيك ونوافذ ألمنيوم دبل جلاس عازلة للحرارة بتصاميم سحابة وقلابة تناسب أحدث المخططات المعمارية.",
    features: [
      "درابزين زجاجي مثبت بمسامير سبايدر أو قطاع ألمنيوم أرضي مخفي",
      "هاندريل علوي ستانلس ستيل أو خشبي أنيق",
      "نوافذ ألمنيوم بزجاج دبل حراري يوفر استهلاك التكييف",
      "أعلى درجات الأمان والمتانة لتحمل الأوزان والصدمات"
    ],
    specs: [
      { label: "نوع الدرابزين", value: "زجاج سيكوريت مقوى 12 مم أو لمينيتيد" },
      { label: "الستانلس ستيل", value: "عيار 304 و 316 المقاوم للأملاح" },
      { label: "الشبابيك", value: "زجاج حراري دبل عازل بنسبة 90%" }
    ],
    iconName: "Shield",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrJwy60j9udQAYIT2C8o8CeW7Vys6mAX3MV2gjCh-8EL0qGqiKz1gMSACY8EwEkAChFt5DUjvUL8yUbFGb6PHaCbDMDL0pWBHnuXolVLnnYFHidTEvlqtUwTAdf8m5iUnY9NoB_MaeAKxRp94pAZqI2jc98-CP-UoMLDebJvuYeWzGDaTY__diz4O1/s1600/%D8%B3%D9%84%D8%A7%D9%84%D9%85%207.jpg"
  },
  {
    id: "kitchens",
    name: "مطابخ",
    slug: "aluminum-kitchens",
    shortDesc: "تفصيل مطابخ ألمنيوم وزجاج حديثة بتصاميم راقية وألوان عصرية متنوعة.",
    fullDesc: "نصمم ونفصل مطابخ ألمنيوم عصرية مدمجة بالزجاج السيكوريت المقاوم للحرارة والزيوت في أبو عريش. نوفر خزائن زجاجية أنيقة، أرفف مضيئة، ومفصلات هيدروليكية ذات إغلاق ناعم تدوم لسنوات طويلة دون تأثر بالرطوبة.",
    features: [
      "ألمنيوم ثقيل معالج ضد الصدأ وحشرات المطبخ",
      "واجهات أبواب زجاجية سيكوريت عاكسة أو ملونة",
      "مفصلات وسكك إيطالية بنظام الإغلاق الهادئ Soft Close",
      "استغلال ذكي للمساحات وتصاميم تلائم كل مقاس"
    ],
    specs: [
      { label: "هيكل المطبخ", value: "ألمنيوم دبل ثقيل عالي الكثافة" },
      { label: "أبواب الخزائن", value: "زجاج سيكوريت مدعم بإطار ألمنيوم" },
      { label: "مقاومة الحرارة", value: "مقاومة تامة لبخار الطبخ والحرارة المرتفعة" }
    ],
    iconName: "Utensils",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSMl-V8pqRQ7wZIr6QFIYOKYbNSM3c4pABjf4Bnazc363bpOxLZPtRSx7p9AeVmJyuCIOhsoE1dC6mwJ1KQ9Qu4-VeKFPbcWxYqQD2Kf4lB59BjBSWGE_zm6o1d6ObJOOdFH2sGLarcvzpp2ita1LprDA9a5j-vkMvXZk7YIqW1VpCbOYGBInl1xAk/s1600/%D9%85%D8%B7%D8%A7%D8%A8%D8%AE%20%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%88%D9%85.jpg"
  },
  {
    id: "mirrors",
    name: "المرايا والديكورات الزجاجية",
    slug: "mirrors-decor",
    shortDesc: "تفصيل مرايا جدارية ومداخل وصالات بإضاءة LED مخفية وأشكال هندسية راقية.",
    fullDesc: "نقدم تشكيلات استثنائية من المرايا الديكورية المقصوصة بتقنية CNC لغرف النوم، المداخل، المغاسل، الصالات، والنوادي الرياضية في أبو عريش وجيزان. نستخدم مرايا بلجيكية نقية خالية من التشوهات مع خيارات إضاءة LED ذكية تعمل باللمس.",
    features: [
      "مرايا بلجيكية عالية النقاء مقاومة للرطوبة وتغير اللون",
      "قص كمبيوتر CNC بحواف مشطوفة ليزر بدقة متناهية",
      "إضاءة LED مدمجة مع مفاتيح تعمل باللمس وإزالة الضباب",
      "تصاميم جدارية شطف هندسي (بانوهات مرايا مضلعة)"
    ],
    specs: [
      { label: "نوع المرآة", value: "مرايا بلجيكية فضية نقية 6 مم" },
      { label: "الشطف", value: "شطف ليزر 1 سم إلى 3 سم عالي الدقة" },
      { label: "الإضاءة", value: "شريط LED كوري مع محول ضد الرطوبة" }
    ],
    iconName: "Sparkles",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi800aL4Pe-TDIJzM5fMIRpVg3820rAkIF7sfsyWRa8qvcu-nbSY796WZ_YqvqPfej3c9wFJ27uSMrC7UPw6NDNEoEeQAtjhNYDtjHYC3H29nP3cRhKrSw001lhtoaFoJlIOPlbOosYOIMrstxtRG0nJ5q0YzMf0lPwwICeJe6gjCB6J6eqL8GiQFsq/s1600/%D9%85%D8%B1%D8%A7%D9%8A%D8%A7%202.jpg"
  },
  {
    id: "showers",
    name: "كبائن الشاور والحمامات",
    slug: "shower-cabins",
    shortDesc: "كبائن شاور زجاجية سيكوريت عازلة للمياه بتصاميم مفصلية وسحابة حديثة.",
    fullDesc: "تفصيل كبائن شاور زجاجية زاوية ومستقيمة تلائم جميع مقاسات الحمامات في أبو عريش وجيزان. تمنع تسرب المياه نهائياً وتمنح الحمام مظهراً فندقياً فخماً، مع استخدام زجاج سيكوريت معالج وإكسسوارات ستانلس ستيل أصلية مقاومة للرطوبة.",
    features: [
      "زجاج سيكوريت 8 مم و 10 مم مقاوم للصدمات والحرارة",
      "ربرات وسيليكون مضاد للبكتيريا والعفن والفطريات",
      "إكسسوارات ستانلس ستيل ذهبي مطفي، أسود مات، أو كروم",
      "تصاميم سحابة بدون شفة أرضية لتسهيل الحركة والتنظيف"
    ],
    specs: [
      { label: "سماكة الزجاج", value: "8 مم أو 10 مم سيكوريت شفاف أو مثلج" },
      { label: "القطاعات", value: "ستانلس ستيل 304 مقاوم لصدأ الرطوبة" },
      { label: "عزل المياه", value: "عزل محكم 100% بشرائط سيليكون مغناطيسية" }
    ],
    iconName: "Bath",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjt2t2nUqomtPcOi8j21L0gOihneqADZ_YF9Ss0ySNYAAk6PvNLzULHZe3v69eXx1Pcn2Anbzc3iCSQiS9amIv5WWBmhOs5CId8cz343TLx4con7DNL2qjiLSPdYCLAZk5ua0PYZ7oTO9XUCqLvI7OQcolZCWds0CwPAIzpxlVi0eaUL-LxcMLzjEXa/s1600/%D8%AD%D9%85%D8%A7%D9%85%D8%A7%D8%AA1.jpg"
  },
  {
    id: "maintenance",
    name: "خدمات الصيانة والتركيب",
    slug: "maintenance-service",
    shortDesc: "صيانة فورية للواجهات والأبواب الزجاجية وتغيير الماكينات والمفصلات التالفة.",
    fullDesc: "فريق طوارئ وصيانة متنقل جاهز للوصول إليك في أي مكان بأبو عريش وجيزان لإصلاح الأبواب الزجاجية السيكوريت، صيانة الماكينات الأرضية الهيدروليكية، وزن الأبواب الساقطة، استبدال الزجاج المكسور، وتغيير الإكسسوارات والمقابض.",
    features: [
      "خدمة استجابة سريعة للأعطال الطارئة في المحلات والشركات",
      "قطع غيار وماكينات أرضية إيطالية وأصلية مع الضمان",
      "تعديل ووزن ميلان الأبواب الزجاجية وإصلاح الاحتكاك",
      "إعادة عزل الواجهات وتغيير ربلات وسيليكون تسريب المياه"
    ],
    specs: [
      { label: "سرعة الاستجابة", value: "فريق طوارئ يصل خلال وقت قياسي" },
      { label: "قطع الغيار", value: "ماكينات ومفصلات ومقابض أصلية 100%" },
      { label: "الضمان على الصيانة", value: "ضمان كتابي على جميع قطع الغيار والتركيب" }
    ],
    iconName: "Wrench",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiWldGSqxXUIqoreUGJHCGyJCHl0V3hFPc6PhgTnDDmkik7UB_jXC7Ad5D7FKER7XJcW_0jV3t9m71WQhM5LnFb53W-J82ju-VsL2IKH05IdLbDHp47WRUfwuXmx_itOBFFZjZ-vZSW_oJGPTHhnEiT3bUaESLvaTTj-_FI-_B1til5tB0mxFVzmdY1/s1600/%D8%B2%D8%AC%D8%A7%D8%AC%20%D8%B3%D9%83%D8%B1%D9%8A%D8%AA.jpg"
  }
];
