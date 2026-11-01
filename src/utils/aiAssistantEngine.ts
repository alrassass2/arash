import { COMPANY_DATA } from '../data/companyData';
import { DEPARTMENTS } from '../data/categoriesData';
import { INITIAL_ARTICLES } from '../data/articlesData';
import { ALL_KEYWORDS } from '../data/keywordsData';
import { normalizeArabic, matchesArabicSearch } from './arabicSearch';

export interface AssistantResponse {
  answer: string;
  sourceArticles?: {
    id: string;
    title: string;
  }[];
  suggestedAction?: 'call' | 'whatsapp' | 'maps' | 'quote';
  actionLabel?: string;
  actionUrl?: string;
}

/**
 * Knowledge Base Grounding & Smart QA Engine for زجاج سكريت ابوعريش
 */
export function getGroundedAnswer(userQuery: string): AssistantResponse {
  const query = normalizeArabic(userQuery);

  // 1. Phone / Contact / WhatsApp Queries
  if (
    query.includes('رقم') ||
    query.includes('اتصال') ||
    query.includes('تواصل') ||
    query.includes('واتس') ||
    query.includes('هاتف') ||
    query.includes('جوال') ||
    query.includes('phone') ||
    query.includes('contact')
  ) {
    return {
      answer: `يسعدنا تواصلك المباشر مع فريق **زجاج سكريت ابوعريش** في أي وقت:
• **رقم الاتصال المباشر:** ${COMPANY_DATA.phonePrimary} أو ${COMPANY_DATA.phoneSecondary}
• **رقم الواتساب الفوري:** ${COMPANY_DATA.phonePrimary}
• **أوقات العمل:** السبت إلى الخميس من 8:00 صباحاً حتى 10:00 مساءً، وخدمة الطوارئ والصيانة متاحة 24/7 بأبو عريش وجيزان.`,
      suggestedAction: 'whatsapp',
      actionLabel: 'تحدث معنا عبر الواتساب فوراً',
      actionUrl: COMPANY_DATA.whatsappLink,
    };
  }

  // 2. Free Inspection / Measurements Queries
  if (
    query.includes('معاين') ||
    query.includes('مقاس') ||
    query.includes('متر') && query.includes('رفع') ||
    query.includes('كشف') ||
    query.includes('زيار') ||
    query.includes('مجاني')
  ) {
    return {
      answer: `نعم، خدمة **المعاينة ورفع المقاسات الهندسية مجانية 100% وبدون أي التزام** في كافة أحياء **أبو عريش** ومدينة **جيزان** والمناطق المجاورة!

يقوم الفني المختص بزيارة موقعك لمعاينة المكان، وأخذ المقاسات الدقيقة بالليزر، واقتراح أنسب أنواع الزجاج وسماكته وإكسسوارات التثبيت، مع تقديم عرض سعر تفصيلي شامل التوريد والتركيب والضمان.`,
      suggestedAction: 'call',
      actionLabel: `طلب معاينة مجانية (${COMPANY_DATA.phonePrimary})`,
      actionUrl: `tel:${COMPANY_DATA.phonePrimary}`,
    };
  }

  // 3. Prices & Costs Queries
  if (
    query.includes('سعر') ||
    query.includes('اسعار') ||
    query.includes('تكلف') ||
    query.includes('بكم') ||
    query.includes('متر') ||
    query.includes('كم يكلف')
  ) {
    return {
      answer: `تختلف أسعار الزجاج السيكوريت بناءً على المواصفات الفنية المعتمدة للمشروع:
1. **سماكة الزجاج:** زجاج 10 مم وزجاج 12 مم مقسى حرارياً (Tempered Glass).
2. **نوع النظام:** (واجهات استركشر دبل جلاس عازل، أبواب فريم لس بدون إطار، بلكونات زجاجية، كبائن شاور).
3. **نوع الإكسسوارات:** ماكينات أرضية هيدروليكية أصلية (دورما أو إيطالي)، قطاعات ألمنيوم ثقيلة، ومفصلات ستانلس ستيل 304 المقاوم للصدأ.

نضمن لك **أفضل سعر منافس في أبو عريش وجيزان مع أعلى جودة تصنيع وضمان رسمي حتى 5 سنوات**. اتصل بنا أو اطلب معاينة مجانية لرفع المقاسات وسنقدم لك تسعيرة فورية تناسب ميزانيتك.`,
      suggestedAction: 'quote',
      actionLabel: 'طلب عرض سعر تفصيلي',
    };
  }

  // 4. Location & Google Maps
  if (
    query.includes('موقع') ||
    query.includes('مكان') ||
    query.includes('عنوان') ||
    query.includes('خريط') ||
    query.includes('فين') ||
    query.includes('وين') ||
    query.includes('ابوعريش') ||
    query.includes('أبو عريش') ||
    query.includes('جيزان') ||
    query.includes('جازان')
  ) {
    return {
      answer: `موقع ورشتنا ومعرضنا يقع في **أبو عريش، طريق الملك فيصل، منطقة جازان**.

نخدم أيضاً كافة مدن ومحافظات المنطقة: (أبو عريش، جيزان، صبيا، صامطة، بيش، أحد المسارحة، ضمد، العارضة، الدرب).
يمكنك الضغط على الرابط أدناه لفتح ملفنا التجاري المعتمد على خرائط Google والحصول على اتجاهات القيادة المباشرة.`,
      suggestedAction: 'maps',
      actionLabel: 'عرض موقعنا على خرائط Google',
      actionUrl: COMPANY_DATA.googleMapsShareUrl,
    };
  }

  // 5. Shower Cabins Queries
  if (
    query.includes('شاور') ||
    query.includes('حمام') ||
    query.includes('دوش') ||
    query.includes('كبائن') ||
    query.includes('كابين')
  ) {
    const showerDept = DEPARTMENTS.find(d => d.id === 'showers');
    return {
      answer: `نتميز في **زجاج سكريت ابوعريش** بتفصيل وتركيب **كبائن الشاور ودورات المياه** بأعلى المواصفات:
• **الزجاج:** سيكوريت مقسى 8 مم أو 10 مم، معالج بتقنية النانو ضد تراكم الأملاح وبقع الصابون.
• **الأنظمة:** كبائن زاوية، كبائن مستقيمة، أبواب سحب جرارة للمساحات الضيقة، أو أبواب مفصلية.
• **الإكسسوارات:** مفصلات ومقابض ومجاري ستانلس ستيل 304 أصلي 100% مقاوم للصدأ ورطوبة المياه.
• **العزل:** ربلات وجوانات مغناطيسية تمنع خروج قطرة ماء واحدة خارج منطقة الاستحمام.`,
      suggestedAction: 'call',
      actionLabel: `طلب تفصيل كابينة شاور (${COMPANY_DATA.phonePrimary})`,
      actionUrl: `tel:${COMPANY_DATA.phonePrimary}`,
    };
  }

  // 6. Glass Doors & Maintenance
  if (
    query.includes('باب') ||
    query.includes('أبواب') ||
    query.includes('ماكين') ||
    query.includes('مفصل') ||
    query.includes('صيان') ||
    query.includes('تصليح') ||
    query.includes('سحاب') ||
    query.includes('اوتوماتيك') ||
    query.includes('رادار')
  ) {
    return {
      answer: `نوفر حلولاً شاملة للأبواب الزجاجية وخدمات الصيانة السريعة:
• **تركيب أبواب جديدة:** أبواب زجاج سيكوريت 10 مم و 12 مم، أبواب سحابة للمحلات والمكاتب، وأبواب أوتوماتيكية بحساسات الحركة ورادار ذكي.
• **خدمة الصيانة وضبط الأبواب:** ضبط الماكينات الأرضية الهيدروليكية، تبديل ماكينات (Dorma أو إيطالي)، معالجة هبوط الأبواب أو احتكاكها بالأرضية، وتغيير المقابض والأقفال الفولاذية.
• **طوارئ الزجاج المكسور:** استبدال سريع للزجاج السيكوريت المتضرر خلال وقت قياسي بأبو عريش وجيزان.`,
      suggestedAction: 'call',
      actionLabel: `حجز فني صيانة أبواب (${COMPANY_DATA.phonePrimary})`,
      actionUrl: `tel:${COMPANY_DATA.phonePrimary}`,
    };
  }

  // 7. Balconies & Handrails
  if (
    query.includes('بلكون') ||
    query.includes('شرف') ||
    query.includes('درابزين') ||
    query.includes('سلم') ||
    query.includes('سلالم') ||
    query.includes('طي')
  ) {
    return {
      answer: `أنظمة **البلكونات الزجاجية والدرابزين** المودرن لدينا مصممة لتوفر أقصى درجات الأمان والجمال:
• **بلكونات زجاج سيكوريت قابلة للطي:** نظام تركي / أوروبي بدون إطارات رأسية، يسمح بفتح البلكونة بالكامل أو إغلاقها بإحكام لعزل الغبار والرياح والأمطار.
• **درابزين الدرج والمسابح:** زجاج سيكوريت 12 مم أو لمينيتيد آمن، مثبت ببراغي سبايدر ستانلس ستيل 316 أو قطاعات أرضية ألمنيوم مخفية ومودرن.
• **الأمان:** قدرة تحمل عالية للصدمات وضغط الرياح مع حواف مصقولة بأعلى دقة تحافظ على سلامة الأطفال.`,
      suggestedAction: 'whatsapp',
      actionLabel: 'استفسر عبر الواتساب عن البلكونات والدرابزين',
      actionUrl: COMPANY_DATA.whatsappLink,
    };
  }

  // 8. Facades & Curtain Walls / Structure
  if (
    query.includes('واجه') ||
    query.includes('استركشر') ||
    query.includes('كارتن') ||
    query.includes('معرض') ||
    query.includes('محل') ||
    query.includes('كلادينج')
  ) {
    return {
      answer: `متخصصون في **تنفيذ الواجهات الزجاجية واستركشر الزجاج (Curtain Wall)** للمباني التجارية، المعارض، والفلل:
• **أنظمة الاستركشر:** زجاج دبل جلاس (مزدوج) عازل حرارياً ومقاوم للأشعة فوق البنفسجية، بدون فواصل ألمنيوم ظاهرة من الخارج لتوفير رؤية بانورامية راقية.
• **واجهات المحلات التجارية:** زجاج سيكوريت شفاف فائق النقاء (Extra Clear) بسماكة 10 و 12 مم مع أقفال أرضية وإكسسوارات ستيل.
• **الاعتماد:** مطابقة تامة لاشتراطات كود البناء السعودي مع عزل حراري يقلل استهلاك التكييف بنسبة تصل إلى 40%.`,
      suggestedAction: 'quote',
      actionLabel: 'طلب دراسة وتسعير واجهات زجاجية',
    };
  }

  // 9. Warranty Questions
  if (
    query.includes('ضمان') ||
    query.includes('جود') ||
    query.includes('اعتماد') ||
    query.includes('شهادة')
  ) {
    return {
      answer: `نمنح عملاءنا في **زجاج سكريت ابوعريش** ضماناً كتابياً معتمداً:
• **ضمان يصل إلى 5 سنوات** على أعمال التركيب والهياكل وتثبيت الواجهات.
• **ضمان 3 سنوات** على الماكينات الهيدروليكية الأصلية والإكسسوارات الستانلس ستيل.
• **ضمان ضد تسريب المياه والغبار** على فواصل السيليكون الإنشائي والربلات المانعة للتسرب.
• التزام تام بخدمة ما بعد البيع والصيانة الدورية عند الطلب.`,
      suggestedAction: 'call',
      actionLabel: `اتصل بفريق خدمة العملاء (${COMPANY_DATA.phonePrimary})`,
      actionUrl: `tel:${COMPANY_DATA.phonePrimary}`,
    };
  }

  // 10. Dynamic Semantic Search in Articles & Keywords
  const matchedArticles = INITIAL_ARTICLES.filter((art) => {
    const artText = (art.title + ' ' + art.plainText + ' ' + art.department).toLowerCase();
    const words = query.split(/\s+/).filter(w => w.length > 2);
    return words.some(w => artText.includes(w));
  }).slice(0, 3);

  if (matchedArticles.length > 0) {
    const titlesList = matchedArticles.map(a => `• **${a.title}** (قسم: ${a.department})`).join('\n');
    return {
      answer: `بناءً على قاعدة بيانات ومقالات **زجاج سكريت ابوعريش**، وجدنا تفاصيل مطابقة لسؤالك:

${titlesList}

يمكننا تزويدك بكافة المواصفات الفنية لطلبك، وتنسيق موعد لمعاينة الموقع في أبو عريش أو جيزان مجاناً. هل تود التحدث المباشر مع المهندس المختص؟`,
      sourceArticles: matchedArticles.map(a => ({ id: a.id, title: a.title })),
      suggestedAction: 'whatsapp',
      actionLabel: 'تواصل معنا مباشرة عبر الواتساب',
      actionUrl: COMPANY_DATA.whatsappLink,
    };
  }

  // Default Fallback
  return {
    answer: `أهلاً بك في **زجاج سكريت ابوعريش**! نحن متواجدون لخدمتك في جميع أعمال الزجاج السيكوريت، الواجهات الزجاجية والاستركشر، كبائن الشاور، الأبواب الأوتوماتيكية، بلكونات بدون إطارات، والدرابزين في أبو عريش وجيزان.

نوفر لك **معاينة ورفع مقاسات مجانية**، مع ضمان رسمي يصل إلى 5 سنوات. يمكنك الاتصال بنا مباشرة على **${COMPANY_DATA.phonePrimary}** أو مراسلتنا عبر الواتساب للاستفسار الفوري.`,
    suggestedAction: 'call',
    actionLabel: `اتصال مباشر (${COMPANY_DATA.phonePrimary})`,
    actionUrl: `tel:${COMPANY_DATA.phonePrimary}`,
  };
}
