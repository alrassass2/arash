import React from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  ExternalLink,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { DEPARTMENTS } from '../data/categoriesData';
import { ALL_KEYWORDS } from '../data/keywordsData';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onSelectDepartment: (deptName: string) => void;
  onSelectTag: (tag: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  onSelectDepartment,
  onSelectTag,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800 text-right">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_DATA.logoUrl}
                alt="شعار زجاج سكريت ابوعريش"
                className="w-11 h-11 object-contain shrink-0 drop-shadow-sm bg-white/5 p-1 rounded-lg border border-slate-700/50"
                loading="lazy"
              />
              <div className="leading-tight">
                <span className="text-xl font-black text-white tracking-tight block">
                  زجاج سكريت <span className="text-sky-400">ابوعريش</span>
                </span>
                <span className="text-xs text-slate-400 font-medium tracking-wider uppercase block">
                  Securit Glass · Abu Arish
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              المؤسسة المتخصصة في تنفيذ أعمال الزجاج السيكوريت، واجهات الاستركشر، الأبواب الزجاجية والأوتوماتيكية، بلكونات بدون إطارات، كبائن الشاور ومطابخ الألمنيوم والزجاج في أبو عريش وجيزان.
            </p>

            <div className="pt-1 flex flex-col gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ضمان شامل حتى 5 سنوات</span>
              </span>

              {/* Designer Button: تصميم ALRASSASS */}
              <a
                href="https://wa.me/967774632249?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A7%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AD%D8%B5%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D9%85%D9%88%D9%82%D8%B9%20%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A"
                target="_blank"
                rel="noopener noreferrer"
                title="تطوير وتصميم الموقع - ALRASSASS"
                aria-label="تصميم ALRASSASS - فتح محادثة واتساب لطلب موقع الكتروني"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/30 transition-all duration-200 w-fit shadow-xs hover:shadow-emerald-500/20 group"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>تصميم ALRASSASS</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-200 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 2: The 10 Departments */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              الأقسام والخدمات الرئيسية
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {DEPARTMENTS.slice(0, 7).map((dept) => (
                <li key={dept.id}>
                  <button
                    onClick={() => onSelectDepartment(dept.name)}
                    className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
                    <span>{dept.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCurrentTab('departments')}
                  className="text-sky-400 hover:text-sky-300 font-semibold text-xs mt-1 block"
                >
                  عرض جميع الأقسام العشرة ←
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Google Maps */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              بيانات التواصل والموقع
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>طريق الملك فيصل، منطقة جازان - أبو عريش / جيزان</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_DATA.phonePrimary}`}
                  className="hover:text-white transition-colors"
                  dir="ltr"
                >
                  {COMPANY_DATA.phonePrimary} / {COMPANY_DATA.phoneSecondary}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={COMPANY_DATA.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 font-medium transition-colors"
                >
                  مراسلة فورية عبر واتساب
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={COMPANY_DATA.googleMapsShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>موقعنا على خرائط Google ({COMPANY_DATA.googleMapsTitle})</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Keywords & Tags Cloud */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              كلمات دلالية ووسوم
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto scrollbar-none">
              {ALL_KEYWORDS.slice(0, 24).map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectTag(kw.name)}
                  className="text-[11px] px-2 py-0.5 bg-slate-900 hover:bg-sky-950 text-slate-400 hover:text-sky-300 rounded border border-slate-800 transition-colors"
                >
                  #{kw.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-right">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <div>
              جميع الحقوق محفوظة © {new Date().getFullYear()} مؤسسة{' '}
              <span className="text-slate-300 font-bold">{COMPANY_DATA.name}</span>. النطاق الرسمي:{' '}
              <a href="https://www.1-sa.store/" className="text-sky-400 hover:underline font-medium">
                1-sa.store
              </a>
            </div>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a
              href="https://wa.me/967774632249?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%20%D8%A7%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%AD%D8%B5%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D9%85%D9%88%D9%82%D8%B9%20%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A"
              target="_blank"
              rel="noopener noreferrer"
              title="تصميم وتطوير المواقع"
              className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <span>تصميم ALRASSASS</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <button onClick={() => setCurrentTab('about')} className="hover:text-white transition-colors">
              من نحن
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('departments')} className="hover:text-white transition-colors">
              خدماتنا
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('articles')} className="hover:text-white transition-colors">
              المقالات
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('privacy')} className="hover:text-white transition-colors">
              سياسة الخصوصية
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('terms')} className="hover:text-white transition-colors">
              شروط الاستخدام
            </button>
            <span>·</span>
            <button onClick={() => setCurrentTab('sitemap')} className="hover:text-white transition-colors">
              خريطة الموقع
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
