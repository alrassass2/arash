import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, FileText, SlidersHorizontal } from 'lucide-react';
import { Article } from '../data/articlesData';
import { ArticleCard } from './ArticleCard';

interface ArticlesListProps {
  articles: Article[];
  onReadArticle: (article: Article) => void;
  onSelectTag: (tag: string) => void;
  title?: string;
  subtitle?: string;
}

export const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  onReadArticle,
  onSelectTag,
  title = 'مقالات ودليل الزجاج السيكوريت',
  subtitle = 'مقالات شاملة تشرح مواصفات وتركيب وصيانة الزجاج السيكوريت والاستركشر والأبواب في جيزان وأبو عريش',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'latest' | 'longest'>('latest');
  const itemsPerPage = 6;

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortBy === 'longest') {
      return b.plainText.length - a.plainText.length;
    }
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const currentArticles = sortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="articles" className="py-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>ترتيب حسب:</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => {
                  setSortBy('latest');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  sortBy === 'latest'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الأحدث نشراً
              </button>
              <button
                onClick={() => {
                  setSortBy('longest');
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  sortBy === 'longest'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الأكثر تفصيلاً
              </button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {currentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onReadArticle={onReadArticle}
                onSelectTag={onSelectTag}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">لا توجد مقالات مطابقة</h3>
            <p className="text-sm text-slate-500 mt-1">
              يرجى تجربة كلمات بحث أخرى أو تغيير القسم المحدد.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="الصفحة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  pageNum === currentPage
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="الصفحة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
