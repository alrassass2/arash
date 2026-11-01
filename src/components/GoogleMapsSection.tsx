import React from 'react';
import { MapPin, ExternalLink, Navigation, Phone, Clock, Compass } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const GoogleMapsSection: React.FC = () => {
  const embedUrl = COMPANY_DATA.googleMapsEmbedUrl;

  return (
    <section id="location" className="py-12 sm:py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-sky-600 tracking-wider uppercase block mb-2">
            موقعنا الجغرافي الرسمي الموثق
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-balance">
            موقع {COMPANY_DATA.name} على خرائط Google
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            تفضل بزيارة ورشتنا ومعرضنا بأبو عريش أو احصل على الاتجاهات مباشرة عبر تطبيق خرائط Google لتنفيذ مشاريع الزجاج السيكوريت والواجهات.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Business Profile Details Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm border border-slate-800">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>الملف التجاري المعتمد على الخريطة</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {COMPANY_DATA.googleMapsTitle}
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>طريق الملك فيصل، أبو عريش - منطقة جازان</span>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{COMPANY_DATA.workingHours}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span dir="ltr">{COMPANY_DATA.phonePrimary} / {COMPANY_DATA.phoneSecondary}</span>
                </div>

                <div className="flex items-center gap-3 text-sky-300">
                  <Compass className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>خدمة فورية ومعاينة مجانية بأبو عريش وجيزان</span>
                </div>
              </div>
            </div>

            {/* Official Links & Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <a
                href={COMPANY_DATA.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/30 active:scale-95 transition-all"
              >
                <span>فتح {COMPANY_DATA.googleMapsTitle} في خرائط Google</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${COMPANY_DATA.coordinates.lat},${COMPANY_DATA.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/20 transition-all"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>احصل على اتجاهات القيادة للموقع</span>
              </a>
            </div>
          </div>

          {/* Enhanced Map Embed Frame */}
          <div className="lg:col-span-7 bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 min-h-[380px] sm:min-h-[440px] shadow-sm relative group">
            <iframe
              src={embedUrl}
              title={`موقع ${COMPANY_DATA.googleMapsTitle} على خرائط Google`}
              className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            {/* Overlay badge on bottom of map */}
            <div className="absolute bottom-3 right-3 left-3 sm:left-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 border border-slate-200 shadow-md flex items-center justify-between sm:justify-start gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>{COMPANY_DATA.googleMapsTitle}</span>
              </div>
              <a
                href={COMPANY_DATA.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-800 text-[11px] underline"
              >
                عرض الخريطة الكبيرة ←
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
