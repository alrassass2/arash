import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { ALL_KEYWORDS } from '../data/keywordsData';
import { DEPARTMENTS } from '../data/categoriesData';

interface SearchAndFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  resultsCount: number;
  onOpenQuoteModal?: () => void;
  onSelectArticle?: (articleId: string) => void;
}

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDept,
  setSelectedDept,
  selectedTag,
  setSelectedTag,
  resultsCount,
  onOpenQuoteModal,
  onSelectArticle,
}) => {
  const hasActiveFilters = searchQuery !== '' || selectedDept !== 'all' || selectedTag !== '';

  const handleReset = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setSelectedTag('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      {/* Search Input Box */}
      <div className="relative mb-5">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث في المقالات والخدمات: زجاج سكريت، استركشر، أبواب، بلكونات، كبائن شاور..."
          className="w-full pl-10 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-sm sm:text-base font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
            aria-label="مسح البحث"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Departments Segmented Tabs */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-sky-600" />
            <span>الأقسام الرئيسية العشرة:</span>
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs text-rose-600 hover:underline font-semibold"
            >
              إعادة ضبط الفلاتر
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDept === 'all'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            جميع الأقسام ({resultsCount})
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDept === dept.name
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Keywords / Tags Bar */}
      <div>
        <span className="text-[11px] font-bold text-slate-500 block mb-2">
          الكلمات المفتاحية والتسميات الشائعة (مستخرجة من المصدر الرسمي):
        </span>
        <div className="flex flex-wrap items-center gap-1.5 max-h-28 overflow-y-auto pt-1">
          {ALL_KEYWORDS.slice(0, 35).map((kw, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTag(selectedTag === kw.name ? '' : kw.name)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer border ${
                selectedTag === kw.name
                  ? 'bg-sky-50 text-sky-700 border-sky-300 font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {kw.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
