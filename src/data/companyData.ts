export interface CompanyInfo {
  name: string;
  nameEn: string;
  slogan: string;
  description: string;
  logoUrl: string;
  phonePrimary: string;
  phoneSecondary: string;
  phoneFormatted: string;
  whatsapp: string;
  whatsappLink: string;
  googleMapsShareUrl: string;
  googleMapsShortUrl: string;
  googleMapsEmbedUrl: string;
  googleMapsTitle: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  addressText: string;
  cities: string[];
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  workingHours: string;
  email: string;
  guarantees: {
    title: string;
    desc: string;
  }[];
  metrics: {
    value: string;
    label: string;
    sublabel: string;
  }[];
}

export const COMPANY_DATA: CompanyInfo = {
  name: "زجاج سكريت ابوعريش",
  nameEn: "Securit Glass Abu Arish",
  slogan: "الريادة في تصنيع وتركيب الزجاج السيكوريت والواجهات المعمارية بأبو عريش وجيزان",
  description: "المؤسسة الرائدة المتخصصة في تنفيذ الواجهات الزجاجية، زجاج الاستركشر، الأبواب السيكوريت الأوتوماتيكية والسحابة، بلكونات بدون إطارات، كبائن الشاور الفاخرة، درابزين السلالم، ومطابخ الألمنيوم والزجاج في أبو عريش، جيزان وكافة محافظات المنطقة.",
  logoUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXEkplhf6jeH_8LcGMSndMiDEFeZpk0ChM2ZHNGuhQQRCeZG1uBIOYO2rQNCE6cz0FHLJ_adBrmPIEtDFtPCIRYvbWBZGGlH3_4mARA9z54UGcw8GedV0uQtHfi5GgJKgWoRIw0K51EIkJOQjCd_tVLhE5vccJXccQ9daOQPDPjHm5jxOpuMq9zUji/s320/%D8%B4%D8%B9%D8%A7%D8%B1%20%D8%B2%D8%AC%D8%A7%D8%AC%20%D8%B3%D9%83%D8%B1%D9%8A%D8%AA%20%D8%A7%D8%A8%D9%88%20%D8%B9%D8%B1%D9%8A%D8%B4.png",
  phonePrimary: "0506806283",
  phoneSecondary: "0538403993",
  phoneFormatted: "+966 50 680 6283",
  whatsapp: "966506806283",
  whatsappLink: "https://wa.me/966506806283",
  googleMapsShareUrl: "https://maps.app.goo.gl/5z3Fw1zqyeTVFJ3m8",
  googleMapsShortUrl: "https://maps.app.goo.gl/5z3Fw1zqyeTVFJ3m8",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14903546.801014509!2d45.07408335!3d24.222141999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1607f5cded0df935%3A0x964814b95700208a!2z2LLYrNin2Kwg2LPZg9ix2YrYqiDYp9io2YjYudix2YrYtA!5e0!3m2!1sar!2s!4v1793456419425!5m2!1sar!2s",
  googleMapsTitle: "زجاج سكريت ابوعريش",
  coordinates: {
    lat: 16.83094,
    lng: 42.6140423
  },
  addressText: "طريق الملك فيصل، منطقة جازان - أبو عريش / جيزان",
  cities: [
    "أبو عريش",
    "جيزان",
    "صبيا",
    "صامطة",
    "بيش",
    "أحد المسارحة",
    "الدرب",
    "ضمد",
    "العارضة",
    "جزر فرسان"
  ],
  social: {
    facebook: "https://www.facebook.com/alemad.glass/",
    twitter: "https://x.com/alemad_glass",
    instagram: "https://www.instagram.com/alemad_glass/"
  },
  workingHours: "السبت - الخميس: 8:00 ص - 10:00 م | الجمعة: 4:00 م - 10:00 م",
  email: "info@1-sa.store",
  guarantees: [
    {
      title: "زجاج سيكوريت معتمد 10 مم و 12 مم",
      desc: "معالجة حرارية بمعايير سلامة عالمية تضمن أقصى درجات المقاومة للصدمات والحرارة العالية."
    },
    {
      title: "إكسسوارات ستانلس ستيل 304 و 316",
      desc: "مفصلات ومقابض وقطاعات مقاومة للرطوبة وصدأ السواحل البحرية بأعلى متانة."
    },
    {
      title: "معاينة هندسية ورفع مقاسات مجاناً",
      desc: "فريق فني متخصص يصلك فوراً في أبو عريش وجيزان لرفع المقاسات وتقديم الاستشارة."
    },
    {
      title: "ضمان كتابي شامل وسرعة بالتنفيذ",
      desc: "ضمان يصل إلى 5 سنوات على جودة التركيب وسلامة المفصلات مع خدمة صيانة دورية سريعة."
    }
  ],
  metrics: [
    { value: "+1,250", label: "مشروع منجز", sublabel: "واجهات، بلكونات، وأبواب سيكوريت" },
    { value: "100%", label: "زجاج سيكوريت أصلي", sublabel: "معالج حرارياً ومقاوم للكسر" },
    { value: "5 سنوات", label: "ضمان التركيب", sublabel: "ضمان شامل معتمد وموثق" },
    { value: "24/7", label: "دعم واستجابة سريعة", sublabel: "فريق صيانة وطوارئ بأبو عريش وجيزان" }
  ]
};
