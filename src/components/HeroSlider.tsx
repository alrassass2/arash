import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, ChevronRight, ChevronLeft, Shield, Wrench, Award, Clock } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface HeroSliderProps {
  onOpenQuoteModal: () => void;
  onExploreDepartment: (deptName: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenQuoteModal,
  onExploreDepartment,
}) => {
  const slides = [
    {
      title: 'واجهات زجاجية واستركشر معماري فاخر',
      subtitle: 'تنفيذ واجهات المباني والمحلات والفلل بأعلى معايير الأمان وعزل الحرارة في أبو عريش وجيزان',
      image: '/src/assets/images/hero_glass_facade_1793454868293.jpg',
      badge: 'الريادة في الواجهات والاستركشر',
      dept: 'الواجهات الزجاجية'
    },
    {
      title: 'بلكونات زجاجية بانورامية بدون إطارات',
      subtitle: 'أنظمة زجاج سيكوريت قابلة للطي والسحب برؤية كاملة 100% وحماية تامة من الغبار والرياح',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHgozg-THGe1eY7Td7ZXCZZckNb87XOKVJIauDm6wP-XxWntTNxc-fPOcBbMx5xcgME9zEI-O89WFfh_LAVHVDGLw3b1we0nqk6xNLkGx_maSvgAoKWn9jswlusGb_yYmUihdM_shtj56mC43pi80TjJ-ppbHQtnWQ_8P3CBHVL527OEQlERjQgy0U/s1600/%D8%A8%D9%84%D9%83%D9%88%D9%86%D8%A7%D8%AA4.jpg',
      badge: 'إغلاق شرفات حديث وعصري',
      dept: 'بلكونات زجاجية'
    },
    {
      title: 'أبواب زجاج سيكوريت ذكية وسحابة',
      subtitle: 'أبواب أوتوماتيكية بالحساسات الذكية وماكينات أرضية هيدروليكية إيطالية للمحلات والشركات',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivr3OtcJXeiF6qx1haGOW_4RhykBkMF-5YA5dm0hHFBy_6U6Vj77nrCkquyP8OvsW8ICnyunu0iTpRKB4dU0LfxZP01BVH6JIDWo1IbIorhab0TJi_kMw1vfy8Q-x4tOpvbU8wxfASJk5Y2_qI2hpIX7jjDOMyOPBop6WDy5MbMj8p0X3lD6KUPEbZ/s1600/%D9%88%D8%A7%D8%AC%D9%87%D8%A76.jpg',
      badge: 'أنظمة أبواب متطورة',
      dept: 'أبواب زجاجية'
    },
    {
      title: 'كبائن شاور فاخرة ومرايا ديكورية مودرن',
      subtitle: 'تصاميم زجاجية عازلة للمياه وإكسسوارات ستانلس ستيل 304 مع مرايا ليد بلجيكية نقية',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjt2t2nUqomtPcOi8j21L0gOihneqADZ_YF9Ss0ySNYAAk6PvNLzULHZe3v69eXx1Pcn2Anbzc3iCSQiS9amIv5WWBmhOs5CId8cz343TLx4con7DNL2qjiLSPdYCLAZk5ua0PYZ7oTO9XUCqLvI7OQcolZCWds0CwPAIzpxlVi0eaUL-LxcMLzjEXa/s1600/%D8%AD%D9%85%D8%A7%D9%85%D8%A7%D8%AA1.jpg',
      badge: 'فخامة الحمامات والديكورات',
      dept: 'كبائن الشاور والحمامات'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Slides Viewport */}
      <div className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Gradient Overlay */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Deep rich gradient scrims to ensure high contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center py-16">
              <div className="max-w-2xl text-right space-y-4 sm:space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30 backdrop-blur-xs">
                  {slide.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight text-balance">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${COMPANY_DATA.phonePrimary}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm sm:text-base font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/30 active:scale-95 transition-all"
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span>اتصل الآن: {COMPANY_DATA.phonePrimary}</span>
                  </a>

                  <a
                    href={COMPANY_DATA.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm sm:text-base font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>طلب عبر واتساب</span>
                  </a>

                  <a
                    href={COMPANY_DATA.googleMapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm sm:text-base font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xs transition-all"
                  >
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>{COMPANY_DATA.googleMapsTitle} على الخريطة</span>
                  </a>

                  <button
                    onClick={() => onExploreDepartment(slide.dept)}
                    className="text-xs sm:text-sm text-sky-300 hover:text-white underline underline-offset-4 py-2 px-1"
                  >
                    تفاصيل قسم {slide.dept} ←
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows & Indicators */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-30 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-xs transition-all"
          aria-label="السابق"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-xs transition-all"
          aria-label="التالي"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 mr-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-6 bg-sky-500' : 'w-2 bg-slate-600'
              }`}
              aria-label={`شريحة ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges Strip (Adjacent Proof) */}
      <div className="relative z-20 border-t border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-right">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">زجاج سيكوريت معتمد</h4>
                <p className="text-xs text-slate-400">سماكات 10 مم و 12 مم أصلية</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">إكسسوارات ستانلس 304</h4>
                <p className="text-xs text-slate-400">مقاومة تامة للصدأ والرطوبة</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">معاينة ورفع مقاسات</h4>
                <p className="text-xs text-slate-400">خدمة مجانية بأبو عريش وجيزان</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">ضمان شامل معتمد</h4>
                <p className="text-xs text-slate-400">ضمان كتابي على التركيب والملحقات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
