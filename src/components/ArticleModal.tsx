import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Share2,
  Phone,
  MessageCircle,
  Check,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Article } from '../data/articlesData';
import { COMPANY_DATA } from '../data/companyData';

interface ArticleModalProps {
  article: Article | null;
  allArticles: Article[];
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenQuoteModal: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  allArticles,
  onClose,
  onSelectArticle,
  onOpenQuoteModal,
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.department === article.department)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`${article.title} - ${COMPANY_DATA.name}`);
  const currentUrl = encodeURIComponent(window.location.href);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 my-auto">
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-sky-600 font-bold">{article.department}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTimeMinutes} دقائق قراءة</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="نسخ الرابط"
              className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Article Header */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {article.title}
            </h1>

            {/* Unboxed Metadata (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{article.author}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>تاريخ النشر: {article.publishedAt}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>وقت القراءة المقدر: {article.readTimeMinutes} دقائق</span>
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {article.mainImage && (
            <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-sm max-h-96">
              <img
                src={article.mainImage}
                alt={article.title}
                className="w-full h-full object-cover max-h-96"
              />
            </div>
          )}

          {/* Full Rich HTML Content with safe link handling */}
          <div
            className="article-rich-content pt-2"
            onClick={(e) => {
              const target = (e.target as HTMLElement).closest('a');
              if (target) {
                target.setAttribute('target', '_blank');
                target.setAttribute('rel', 'noopener noreferrer');
              }
            }}
            dangerouslySetInnerHTML={{ __html: article.fullContentHtml }}
          />

          {/* Additional Article Images Gallery if any */}
          {article.images.length > 1 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                معرض صور العمل والتنفيذ
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {article.images.slice(1, 7).map((imgUrl, i) => (
                  <div key={i} className="rounded-xl overflow-hidden bg-slate-100 h-32 border border-slate-200">
                    <img
                      src={imgUrl}
                      alt={`${article.title} - صورة ${i + 2}`}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 block mb-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-sky-600" />
              <span>الكلمات المفتاحية والتصنيفات:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {article.categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                >
                  #{cat}
                </span>
              ))}
            </div>
          </div>

          {/* Share Block */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-700">مشاركة هذا المقال:</span>
            <div className="flex items-center gap-2">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors"
              >
                واتساب
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                منصة X
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
              >
                فيسبوك
              </a>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="max-w-xl space-y-2">
              <h3 className="text-lg sm:text-xl font-bold">
                هل ترغب في تنفيذ هذا العمل لمشروعك في جيزان أو أبو عريش؟
              </h3>
              <p className="text-xs sm:text-sm text-sky-200 leading-relaxed">
                يقدم لك فريق {COMPANY_DATA.name} معاينة فنية مجانية بالموقع مع رفع مقاسات دقيق وعرض سعر تفصيلي يشمل الضمان الشامل بأبو عريش وجيزان.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:${COMPANY_DATA.phonePrimary}`}
                className="px-5 py-2.5 bg-white text-slate-900 hover:bg-sky-50 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md"
              >
                <Phone className="w-4 h-4 text-sky-600" />
                <span>اتصال فوري: {COMPANY_DATA.phonePrimary}</span>
              </a>
              <a
                href={COMPANY_DATA.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل عبر واتساب</span>
              </a>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteModal();
                }}
                className="px-4 py-2.5 bg-sky-600/40 hover:bg-sky-600 text-white border border-sky-400/40 rounded-xl text-xs sm:text-sm font-semibold"
              >
                طلب معاينة مجانية
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                مقالات ذات صلة في قسم {article.department}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 cursor-pointer transition-colors space-y-2 group"
                  >
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-sky-600 line-clamp-2">
                      {rel.title}
                    </h4>
                    <span className="text-[11px] text-sky-600 font-medium flex items-center gap-1">
                      <span>عرض المقال</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
