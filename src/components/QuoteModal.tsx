import React, { useState } from 'react';
import { X, Phone, MessageCircle, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'الواجهات الزجاجية',
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'أبو عريش',
    service: defaultService,
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const msg = `طلب معاينة هندسية من موقع ${COMPANY_DATA.name}:
الاسم: ${formData.name}
الجوال: ${formData.phone}
المدينة: ${formData.city}
الخدمة: ${formData.service}
ملاحظات: ${formData.notes || 'معاينة عامة'}`;

    window.open(`https://wa.me/${COMPANY_DATA.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>معاينة هندسية مجانية</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            طلب معاينة ورفع مقاسات بأبو عريش
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            فريق {COMPANY_DATA.name} يصلك في أبو عريش وجيزان وضواحيها لمعاينة الموقع وتحديد المقاسات بدقة.
          </p>
        </div>

        {formSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              تم إرسال طلبك بنجاح!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto">
              سيتواصل معك الفني المتخصص لتأكيد الموعد المناسب لزيارتك في أقرب وقت.
            </p>
            <button
              onClick={() => {
                setFormSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800"
            >
              إغلاق النافذة
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                الاسم الكريم *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="الاسم الثلاثي"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المدينة
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                >
                  {COMPANY_DATA.cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                نوع الخدمة
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
              >
                <option value="الواجهات الزجاجية">الواجهات الزجاجية</option>
                <option value="استركشر زجاج">استركشر زجاج</option>
                <option value="أبواب زجاجية">أبواب زجاج سيكوريت</option>
                <option value="بلكونات زجاجية">بلكونات زجاج بدون إطارات</option>
                <option value="كبائن الشاور">كبائن شاور وحمامات</option>
                <option value="مكاتب وقواطع">مكاتب وقواطع زجاجية</option>
                <option value="درابزين ونوافذ">درابزين زجاجي ونوافذ</option>
                <option value="مرايا ديكورية">مرايا ديكورية وليد</option>
                <option value="مطابخ ألمنيوم">مطابخ ألمنيوم وزجاج</option>
                <option value="صيانة زجاج">صيانة وتركيب</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ملاحظات أو مواصفات (اختياري)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="مثال: عدد 2 باب سيكوريت لمحل تجاري بأبو عريش..."
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>إرسال الطلب عبر واتساب</span>
              </button>

              <a
                href={`tel:${COMPANY_DATA.phonePrimary}`}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-600" />
                <span>أو الاتصال المباشر: {COMPANY_DATA.phonePrimary}</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
