import React from 'react';
import { ShieldCheck, Award, CheckCircle2, ChevronLeft } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { DEPARTMENTS } from '../data/categoriesData';
import { Article } from '../data/articlesData';

interface StaticPagesProps {
  tab: 'about' | 'privacy' | 'terms' | 'sitemap';
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectDepartment: (deptName: string) => void;
  onOpenQuoteModal: () => void;
}

export const StaticPages: React.FC<StaticPagesProps> = ({
  tab,
  articles,
  onSelectArticle,
  onSelectDepartment,
  onOpenQuoteModal,
}) => {
  if (tab === 'about') {
    return (
      <div className="py-12 sm:py-16 bg-white min-h-[70vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase block">
              عن المؤسسة
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              نبذة عن مؤسسة {COMPANY_DATA.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              رواد تصنيع وتركيب أعمال الزجاج السيكوريت والواجهات المعمارية في أبو عريش، جيزان وكافة محافظات منطقة جازان.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 leading-loose space-y-6 text-sm sm:text-base">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-2">من نحن؟</h2>
              <p>
                تأسست مؤسسة <strong className="text-sky-700">{COMPANY_DATA.name}</strong> بهدف تقديم حلول معمارية وهندسية فائقة الجودة في مجالات الزجاج المقوى (السيكوريت والتمبرد)، الواجهات الزجاجية الاستركشر، الأبواب الزجاجية الأوتوماتيكية، البلكونات بدون إطارات، درابزين السلالم، كبائن الشاور الفاخرة، ومطابخ الألمنيوم والزجاج في أبو عريش وجيزان.
              </p>
              <p className="mt-3">
                نمتلك ورشة عمل مجهزة بأحدث آلات القص الدقيق، الشطف بالليزر CNC، وأفران التقسية الحرارية المعتمدة، ويعمل لدينا طاقم فني وهندسي ذو خبرة عريقة يضمن دقة التنفيذ والالتزام بأعلى معايير السلامة وكود البناء السعودي.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-sky-600 font-bold">
                  <Award className="w-5 h-5" />
                  <h3>رؤيتنا وقيمنا</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  أن نكون الخيار الأول والموثوق للمطورين وأصحاب المنازل والشركات في أبو عريش ومنطقة جازان للحلول الزجاجية الحديثة، مع الالتزام التام بالشفافية والمصداقية ومواعيد التسليم الدقيقة.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <h3>معايير الأمان والجودة</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  استخدام الزجاج السيكوريت الأصلي المقاوم للصدمات بدرجات حرارة تفوق 600 مئوية، مع تزويد كافة التركيبات بإكسسوارات ستانلس ستيل عيار 304 و 316 المقاومة للتآكل والأملاح.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4">
              <h3 className="text-lg font-bold text-sky-300">خدماتنا الميدانية المجانية</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>زيارة ومعاينة ميدانية مجانية في أبو عريش، جيزان وكافة محافظات جازان.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>رفع هندسي دقيق للمقاسات بأحدث أجهزة الليزر الرقمية.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>تقديم عروض أسعار تفصيلية ومخططات تنفيذ واضحة قبل البدء.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ضمان كتابي رسمي معتمد على الزجاج وسلامة التركيب والمفصلات.</span>
                </li>
              </ul>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenQuoteModal}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 font-bold rounded-xl text-xs text-white"
                >
                  طلب معاينة هندسية لموقعك
                </button>
                <a
                  href={`tel:${COMPANY_DATA.phonePrimary}`}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 font-bold rounded-xl text-xs text-white border border-white/20"
                >
                  اتصال: {COMPANY_DATA.phonePrimary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (tab === 'privacy') {
    return (
      <div className="py-12 sm:py-16 bg-white min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              سياسة الخصوصية وحماية البيانات
            </h1>
            <p className="text-xs text-slate-500">
              آخر تحديث: {new Date().getFullYear()} م
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. جمع المعلومات</h2>
              <p>
                نلتزم في مؤسسة {COMPANY_DATA.name} بحماية خصوصية زوار ومستخدمي موقعنا. عند تقديم طلب معاينة أو استفسار، نقوم بجمع الاسم ورقم الجوال والمدينة وتفاصيل الخدمة المطلوبة حصراً لغرض التواصل معك وتقديم الخدمة المطلوبة.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. استخدام المعلومات</h2>
              <p>
                تُستخدم معلومات التواصل لتنسيق مواعيد المعاينة، إرسال عروض الأسعار، وتزويدك بالاستشارات الفنية ذات الصلة بمشروعك. نحن لا نبيع ولا نشارك أي بيانات شخصية مع أطراف ثالثة.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. أمان الاتصال والروابط</h2>
              <p>
                يتم تشغيل الموقع وفق أعلى معايير الأمان وتشفير HTTPS. كافة روابط الاتصال المباشر والواتساب تُحوّل العميل بأمان تام ومباشر إلى القنوات الرسمية للمؤسسة.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  if (tab === 'terms') {
    return (
      <div className="py-12 sm:py-16 bg-white min-h-[70vh]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              شروط الاستخدام والضمان
            </h1>
            <p className="text-xs text-slate-500">
              مؤسسة {COMPANY_DATA.name} - أبو عريش / جيزان
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">1. شروط تقديم الخدمة والتركيب</h2>
              <p>
                يتم رفع المقاسات واعتماد المخطط التنفيذي بموافقة العميل، وتلتزم المؤسسة بتوريد وتركيب الزجاج السيكوريت والإكسسوارات المحددة في عرض السعر الرسمي دون أي تغيير في المواصفات المتفق عليها.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">2. الضمان وجودة المواد</h2>
              <p>
                يحصل العميل على ضمان كتابي يمتد حتى 5 سنوات على جودة التركيبات المعتمدة، وسنتين إلى ثلاث سنوات على الماكينات الهيدروليكية والإكسسوارات، ضد عيوب التصنيع وسوء التركيب، مع توفير صيانة دورية فورية.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">3. حقوق الملكية الفكرية</h2>
              <p>
                كافة النصوص والمعلومات والبيانات والصور الخاصة بمؤسسة {COMPANY_DATA.name} هي ملكية حصرية للمؤسسة ونشاطها التجاري.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // tab === 'sitemap'
  return (
    <div className="py-12 sm:py-16 bg-white min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            خريطة موقع {COMPANY_DATA.name} (Sitemap)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            فهرس تفصيلي لجميع الأقسام، الخدمات، والمقالات المتاحة في الموقع بأبو عريش وجيزان
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
          {/* Departments */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              الأقسام والخدمات الرئيسية (10 أقسام):
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              {DEPARTMENTS.map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => onSelectDepartment(d.name)}
                    className="hover:text-sky-600 transition-colors flex items-center gap-1.5 text-slate-700"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-sky-500" />
                    <span>{d.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links & Contact */}
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
                الصفحات الرئيسية:
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li>• الصفحة الرئيسية للموقع</li>
                <li>• معرض المشاريع والأعمال المنفذة</li>
                <li>• صفحة من نحن ورؤية المؤسسة</li>
                <li>• صفحة التواصل وطلب المعاينة المجانية</li>
                <li>• موقعنا المعتمد على خرائط Google ({COMPANY_DATA.googleMapsTitle})</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-3">
                أحدث المقالات المتاحة ({articles.length} مقال):
              </h2>
              <ul className="space-y-2 text-xs text-slate-600 max-h-60 overflow-y-auto">
                {articles.map((art) => (
                  <li key={art.id}>
                    <button
                      onClick={() => onSelectArticle(art)}
                      className="hover:text-sky-600 transition-colors text-right flex items-start gap-1"
                    >
                      <span className="text-sky-500">•</span>
                      <span>{art.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
