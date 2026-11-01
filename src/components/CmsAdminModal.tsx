import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Download,
  RotateCcw,
  CheckCircle2,
  FileText,
  Search,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { Article } from '../data/articlesData';
import { DEPARTMENTS } from '../data/categoriesData';

interface CmsAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSaveArticles: (updated: Article[]) => void;
  onResetArticles: () => void;
}

export const CmsAdminModal: React.FC<CmsAdminModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSaveArticles,
  onResetArticles,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'export'>('list');
  const [searchFilter, setSearchFilter] = useState('');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('الواجهات الزجاجية');
  const [excerpt, setExcerpt] = useState('');
  const [fullContentHtml, setFullContentHtml] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [author, setAuthor] = useState('زجاج سكريت ابوعريش');

  if (!isOpen) return null;

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleStartEdit = (art: Article) => {
    setEditingArticleId(art.id);
    setTitle(art.title);
    setDepartment(art.department);
    setExcerpt(art.excerpt);
    setFullContentHtml(art.fullContentHtml);
    setMainImage(art.mainImage);
    setCategoriesInput(art.categories.join(', '));
    setAuthor(art.author);
    setActiveTab('add');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const categories = categoriesInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const plainText = fullContentHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    if (editingArticleId) {
      // Edit existing
      const updated = articles.map((a) => {
        if (a.id === editingArticleId) {
          return {
            ...a,
            title,
            department,
            excerpt: excerpt || plainText.slice(0, 180) + '...',
            fullContentHtml,
            plainText,
            mainImage: mainImage || a.mainImage,
            images: mainImage && !a.images.includes(mainImage) ? [mainImage, ...a.images] : a.images,
            categories: categories.length > 0 ? categories : a.categories,
            author,
            readTimeMinutes: Math.max(2, Math.ceil(plainText.split(/\s+/).length / 150))
          };
        }
        return a;
      });
      onSaveArticles(updated);
      showStatus('تم تحديث المقال بنجاح!');
    } else {
      // Create new
      const newArt: Article = {
        id: `art-custom-${Date.now()}`,
        slug: `article-${Date.now()}-${encodeURIComponent(title.slice(0, 30).replace(/\s+/g, '-'))}`,
        title,
        department,
        excerpt: excerpt || plainText.slice(0, 180) + '...',
        fullContentHtml: fullContentHtml || `<p>${excerpt}</p>`,
        plainText,
        mainImage: mainImage || 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWc6oPzL283Z93iY28qE-5vF1pI-r4A7_c_A/s1600/%D9%88%D8%A7%D8%AC%D9%87%D8%A7%D8%AA%20%D8%B2%D8%AC%D8%A7%D8%AC.jpg',
        images: mainImage ? [mainImage] : [],
        categories: categories.length > 0 ? categories : ['زجاج سكريت ابوعريش', department],
        publishedAt: new Date().toISOString().split('T')[0],
        originalUrl: 'https://www.1-sa.store/',
        author,
        readTimeMinutes: Math.max(2, Math.ceil(plainText.split(/\s+/).length / 150))
      };
      onSaveArticles([newArt, ...articles]);
      showStatus('تمت إضافة المقال الجديد بنجاح!');
    }

    // Reset Form
    setEditingArticleId(null);
    setTitle('');
    setExcerpt('');
    setFullContentHtml('');
    setMainImage('');
    setCategoriesInput('');
    setActiveTab('list');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً؟')) {
      const filtered = articles.filter((a) => a.id !== id);
      onSaveArticles(filtered);
      showStatus('تم حذف المقال بنجاح.');
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(articles, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `glass1_articles_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showStatus('تم تصدير ملف النسخة الاحتياطية JSON بنجاح.');
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.includes(searchFilter) ||
      a.department.includes(searchFilter) ||
      a.categories.some((c) => c.includes(searchFilter))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold">
              CMS
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                لوحة إدارة المحتوى والمقالات - زجاج سكريت ابوعريش
              </h2>
              <p className="text-xs text-slate-300">
                إضافة وتعديل وحذف المقالات والوسوم والصور مع حفظ فوري على المتصفح
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('list');
                setEditingArticleId(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              جميع المقالات ({articles.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('add');
                if (!editingArticleId) {
                  setTitle('');
                  setExcerpt('');
                  setFullContentHtml('');
                  setMainImage('');
                  setCategoriesInput('');
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'add'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{editingArticleId ? 'تعديل المقال الحالي' : 'إضافة مقال جديد'}</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'export'
                  ? 'bg-sky-600 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>النسخ الاحتياطي والتصدير</span>
            </button>
          </div>

          {statusMessage && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{statusMessage}</span>
            </span>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="بحث في المقالات للإدارة والتعديل..."
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                        {art.mainImage ? (
                          <img
                            src={art.mainImage}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileText className="w-6 h-6 text-slate-400 m-3" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {art.title}
                        </h4>
                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="text-sky-600 font-semibold">{art.department}</span>
                          <span>·</span>
                          <span>{art.publishedAt}</span>
                          <span>·</span>
                          <span>{art.categories.length} وسوم</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleStartEdit(art)}
                        className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleSaveArticle} className="space-y-4 max-w-3xl mx-auto">
              <div className="bg-sky-50 border border-sky-100 p-3 rounded-xl text-xs text-sky-800 font-medium">
                {editingArticleId
                  ? 'أنت الآن في وضع تعديل المقال المحدد.'
                  : 'إضافة مقال جديد ومزامنته فوراً في أرشيف الموقع والصفحة الرئيسية.'}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  عنوان المقال *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: تركيب واجهات زجاج استركشر في جيزان..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    القسم التابع له *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 focus:outline-hidden"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الكاتب أو الجهة الناشرة
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رابط الصورة الرئيسية للمقال (URL)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={mainImage}
                    onChange={(e) => setMainImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    dir="ltr"
                  />
                  {mainImage && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img src={mainImage} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الوسوم والكلمات المفتاحية (مفصولة بفاصلة)
                </label>
                <input
                  type="text"
                  value={categoriesInput}
                  onChange={(e) => setCategoriesInput(e.target.value)}
                  placeholder="زجاج سكريت جيزان, واجهات زجاجية, استركشر, أبواب سيكوريت..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  مقتطف قصير (المعاينة بالبطاقة)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="وصف مختصر للمقال يظهر في بطاقات البحث والصفحة الرئيسية..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  محتوى المقال الكامل (يدعم نصوص وتنسيقات HTML)
                </label>
                <textarea
                  rows={8}
                  required
                  value={fullContentHtml}
                  onChange={(e) => setFullContentHtml(e.target.value)}
                  placeholder="اكتب المحتوى الكامل للمقال هنا، مع العناوين والفقرات ومواصفات الزجاج..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-xs transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingArticleId ? 'حفظ التعديلات' : 'نشر المقال الجديد'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('list');
                    setEditingArticleId(null);
                  }}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm"
                >
                  إلغاء
                </button>
              </div>
            </form>
          )}

          {activeTab === 'export' && (
            <div className="max-w-xl mx-auto space-y-6 text-center py-6">
              <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center mx-auto">
                <Download className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">
                  تصدير بيانات المحتوى والمقالات
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  يمكنك تحميل جميع المقالات والوسوم والصور المحفوظة كملف JSON كامل للاحتفاظ بنسخة احتياطية أو نقلها لأي نظام إدارة محتوى خارجي.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleExportJson}
                  className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل نسخة احتياطية (JSON)</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('هل ترغب حقاً باستعادة بيانات المقالات الأصلية المستوردة من الموقع المصدر؟ سيتم إلغاء أي تعديلات محلية.')) {
                      onResetArticles();
                      showStatus('تمت استعادة البيانات الأصلية بنجاح.');
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>استعادة البيانات الأصلية</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
