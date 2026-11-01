import React from 'react';
import { ShieldCheck, Sparkles, Clock, Wrench, CheckCircle2 } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface WhyChooseUsProps {
  onOpenQuoteModal: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenQuoteModal }) => {
  return (
    <section id="why-us" className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right Column: Proposition & Guarantees */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-sky-400 tracking-wider uppercase block mb-2">
                معايير الجودة والأمان
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                لماذا يفضل عملاؤنا اختيار {COMPANY_DATA.name} في أبو عريش وجيزان؟
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                نجمع بين دقة التصنيع الهندسي وجودة الخامات المعتمدة، لنقدم لعملائنا في أبو عريش ومنطقة جازان حلولاً زجاجية فائقة التحمل تدوم لعشرات السنين دون أي تنازل عن الجمالية المعمارية.
              </p>
            </div>

            {/* 4 Core Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {COMPANY_DATA.guarantees.map((guar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/30 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <h3 className="font-bold text-sm text-white">{guar.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pr-6">
                    {guar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-sky-600/30 active:scale-95 transition-all"
              >
                احجز معاينة مجانية الآن
              </button>
              <span className="text-xs text-slate-400">
                فريق هندسي متخصص يصلك إلى موقع المشروع بأبو عريش
              </span>
            </div>
          </div>

          {/* Left Column: Quantitative Metrics */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6">
              <div className="border-b border-slate-700/80 pb-4">
                <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider block">
                  إحصائيات الإنجاز
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  أرقام تثبت الثقة في أبو عريش وجازان
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {COMPANY_DATA.metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-sky-400 tabular-nums">
                      {m.value}
                    </div>
                    <div className="font-bold text-sm text-white">{m.label}</div>
                    <div className="text-xs text-slate-400 leading-tight">
                      {m.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700/80 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    مطابقة لكود البناء السعودي
                  </div>
                  <div className="text-xs text-slate-400">
                    ضمان جودة الزجاج المعالج حرارياً والمفصلات الإيطالية
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
