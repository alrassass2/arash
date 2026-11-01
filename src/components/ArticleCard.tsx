import React from 'react';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { Article } from '../data/articlesData';

interface ArticleCardProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  onSelectTag?: (tag: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadArticle,
  onSelectTag,
}) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col group">
      {/* Thumbnail */}
      <div
        className="relative h-48 bg-slate-900 cursor-pointer overflow-hidden"
        onClick={() => onReadArticle(article)}
      >
        {article.mainImage ? (
          <img
            src={article.mainImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'flex';
              }
            }}
          />
        ) : null}
        <div
          className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-sky-950 text-sky-300 font-bold text-sm p-4 text-center ${
            article.mainImage ? 'hidden' : 'flex'
          }`}
        >
          <span className="text-base text-white">زجاج سكريت ابوعريش</span>
          <span className="text-xs text-sky-400 font-normal mt-1">{article.department}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        {/* Unboxed Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="text-sky-700 font-semibold">{article.department}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span>{article.publishedAt}</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{article.readTimeMinutes} دقائق قراءة</span>
          </span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onReadArticle(article)}
          className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors cursor-pointer leading-snug line-clamp-2"
        >
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags / Keywords (Unboxed quiet text or subtle inline tags) */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
          <span className="text-slate-400 font-medium">الوسوم:</span>
          {article.categories.slice(0, 3).map((tag, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTag && onSelectTag(tag)}
              className="text-slate-600 hover:text-sky-600 transition-colors"
            >
              #{tag}
              {idx < Math.min(article.categories.length, 3) - 1 ? ' · ' : ''}
            </button>
          ))}
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <button
            onClick={() => onReadArticle(article)}
            className="w-full py-2.5 px-3 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-sky-600 hover:text-white rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-sky-50 group-hover:text-sky-700"
          >
            <span>قراءة المقال الكامل ومواصفات الزجاج</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
