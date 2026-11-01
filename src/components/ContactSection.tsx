import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'أبو عريش',
    service: 'الواجهات الزجاجية',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Direct WhatsApp formulation so customer can immediately message
    const msg = `مرحباً ${COMPANY_DATA.name}، أرغب بطلب معاينة ورفع مقاسات:
الاسم: ${formData.name}
الجوال: ${formData.phone}
المدينة: ${formData.city}
الخدمة المطلوبة: ${formData.service}
التفاصيل: ${formData.details || 'لا توجد ملاحظات إضافية'}`;

    window.open(`https://wa.me/${COMPANY_DATA.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-600 tracking-wider uppercase block mb-2">
            تواصل وطلب معاينة فورية
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-balance">
            اتصل بنا أو اطلب زيارة المعاينة الهندسية
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            فريقنا الفني في {COMPANY_DATA.name} جاهز للرد على استفساراتكم وتقديم المشورة الفنية وعروض الأسعار في أبو عريش وجيزان وضواحيها.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              قنوات التواصل الرسمية
            </h3>

            <div className="space-y-4">
              <a
                href={`tel:${COMPANY_DATA.phonePrimary}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 transition-colors group border border-slate-100"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">الاتصال المباشر (الرقم الرئيسي)</span>
                  <span className="text-base font-bold text-slate-900 group-hover:text-sky-700" dir="ltr">
                    {COMPANY_DATA.phonePrimary}
                  </span>
                </div>
              </a>

              <a
                href={COMPANY_DATA.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 transition-colors group border border-emerald-100/60"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-emerald-700 font-medium block">محادثة واتساب سريعة</span>
                  <span className="text-base font-bold text-emerald-950 group-hover:text-emerald-700" dir="ltr">
                    +{COMPANY_DATA.whatsapp}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">أوقات العمل واستقبال الطلبات</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                    {COMPANY_DATA.workingHours}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">العنوان والموقع</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                    {COMPANY_DATA.addressText}
                  </span>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 block mb-2 font-medium">حسابات التواصل الاجتماعي:</span>
              <div className="flex items-center gap-2">
                <a
                  href={COMPANY_DATA.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={COMPANY_DATA.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                >
                  Twitter / X
                </a>
                <a
                  href={COMPANY_DATA.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-pink-600 hover:text-white text-xs font-semibold text-slate-700 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Inspection / Quote Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              طلب معاينة هندسية مجانية لموقعك بأبو عريش وجيزان
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
              املأ البيانات التالية وسيتم التواصل معك مباشرة لتحديد موعد الزيارة ورفع المقاسات بدقة.
            </p>

            {formSubmitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">
                  تم إرسال طلبك بنجاح!
                </h4>
                <p className="text-sm text-emerald-700 max-w-md mx-auto">
                  شكراً لتواصلك مع {COMPANY_DATA.name}. تم فتح محادثة واتساب لتأكيد موعد المعاينة وسيتواصل معك مهندس الموقع قريباً.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-3 px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800"
                >
                  إرسال طلب آخر
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      الاسم الكريم *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: محمد الغامدي"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      رقم الجوال *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="05XXXXXXXX"
                      dir="ltr"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      المدينة / المحافظة
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                    >
                      {COMPANY_DATA.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      نوع الخدمة أو العمل
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                    >
                      <option value="الواجهات الزجاجية">الواجهات الزجاجية للمباني والمحلات</option>
                      <option value="استركشر زجاج">استركشر زجاج كارتن وول</option>
                      <option value="أبواب زجاجية">أبواب زجاج سيكوريت / أوتوماتيكية</option>
                      <option value="بلكونات زجاجية">بلكونات زجاج بدون إطارات</option>
                      <option value="كبائن الشاور والحمامات">كبائن شاور وزجاج حمامات</option>
                      <option value="مكاتب وقواطع">مكاتب وقواطع زجاجية داخلية</option>
                      <option value="نوافذ ودرابزين">درابزين زجاجي ونوافذ حرارية</option>
                      <option value="المرايا والديكورات">مرايا ديكورية جدارية وليد</option>
                      <option value="مطابخ ألمنيوم وزجاج">مطابخ ألمنيوم وزجاج حديثة</option>
                      <option value="صيانة واجهات وأبواب">خدمات الصيانة والتركيب الفوري</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    تفاصيل إضافية أو المقاسات التقريبية (اختياري)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="اكتب أي ملاحظات مثل: مساحة الواجهة التقريبية، الحي بأبو عريش، الوقت المناسب للاتصال..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد طلب المعاينة وإرسال عبر واتساب</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
