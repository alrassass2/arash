import React from 'react';
import { MapPin, Navigation, Phone } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface AreasServedProps {
  onOpenQuoteModal: () => void;
}

export const AreasServed: React.FC<AreasServedProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="areas" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-sky-600 tracking-wider uppercase block mb-2">
            نطاق التغطية والخدمة الفعلي
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-balance">
            مناطق تقديم خدمات {COMPANY_DATA.name}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            نغطي محافظة أبو عريش ومدينة جيزان وكافة محافظات منطقة جازان بفريق فني متنقل وورشة تصنيع مجهزة بأحدث ماكينات قص وشطف ومعالجة الزجاج السيكوريت.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {COMPANY_DATA.cities.map((city, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all text-center space-y-1.5"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-800">{city}</h3>
              <p className="text-[11px] text-slate-500">معاينة وتركيب فوري</p>
            </div>
          ))}
        </div>

        {/* Service Callout Banner */}
        <div className="bg-white rounded-2xl border border-sky-100 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
              <Navigation className="w-4 h-4" />
              <span>هل موقع مشروعك أو منزلك خارج هذه المدن؟</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              نصلك في أي موقع داخل أبو عريش ومنطقة جازان والقرى المجاورة. اتصل بنا لترتيب موعد المعاينة وتحديد موعد زيارة الفنيين لرفع المقاسات بدقة.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-all whitespace-nowrap"
            >
              طلب معاينة لموقعي
            </button>
            <a
              href={`tel:${COMPANY_DATA.phonePrimary}`}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>{COMPANY_DATA.phonePrimary}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
