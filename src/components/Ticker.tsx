import React from 'react';
import { Sparkles, PhoneCall } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const Ticker: React.FC = () => {
  const updates = [
    '✨ خصومات خاصة على تركيب واجهات الاستركشر والزجاج السيكوريت للمباني والمحلات في أبو عريش وجيزان',
    '🚪 أحدث أنظمة الأبواب الزجاجية الأوتوماتيكية بالحساسات الذكية وماكينات هيدروليكية أصلية بأبو عريش',
    '🏢 إغلاق البلكونات والشرفات بنظام الزجاج القابل للطي والسحب بدون إطارات بانوراما كاملة',
    '🚿 تفصيل كبائن شاور زجاجية سيكوريت عازلة للمياه وإكسسوارات ستانلس ستيل 304 ضد الصدأ',
    '🍳 تصاميم مطابخ ألمنيوم وزجاج سيكوريت عصرية مقاومة للحرارة والزيوت',
    '⚡ خدمة صيانة وطوارئ سريعة لكافة أنواع الأبواب والواجهات الزجاجية في أبو عريش ومنطقة جازان',
    `📞 اتصل بـ ${COMPANY_DATA.name} الآن للحصول على معاينة ورفع مقاسات مجاني: ${COMPANY_DATA.phonePrimary}`
  ];

  return (
    <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white overflow-hidden py-2 border-b border-sky-800/40 select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 bg-sky-600 text-white px-3 py-1 rounded-md text-xs font-bold shrink-0 ml-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>أحدث الخدمات</span>
        </div>

        <div className="overflow-hidden relative w-full flex items-center">
          <div className="flex items-center gap-12 whitespace-nowrap animate-[marquee_35s_linear_infinite] text-xs sm:text-sm text-slate-200">
            {updates.concat(updates).map((text, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span>{text}</span>
                <span className="text-sky-400 font-bold">·</span>
              </span>
            ))}
          </div>
        </div>

        <a
          href={`tel:${COMPANY_DATA.phonePrimary}`}
          className="hidden md:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md text-xs font-bold text-sky-300 transition-colors shrink-0 mr-3 border border-white/10"
        >
          <PhoneCall className="w-3 h-3" />
          <span>معاينة فورية</span>
        </a>
      </div>
    </div>
  );
};
