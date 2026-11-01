import React from 'react';
import {
  Building2,
  Layers,
  DoorOpen,
  Maximize2,
  Grid,
  Shield,
  Utensils,
  Sparkles,
  Bath,
  Wrench,
  ArrowLeft,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { DEPARTMENTS, DepartmentInfo } from '../data/categoriesData';

interface DepartmentsGridProps {
  onSelectDepartment: (deptName: string) => void;
  onOpenQuoteModal: () => void;
  onViewAllDepartments?: () => void;
  limit?: number;
}

export const DepartmentsGrid: React.FC<DepartmentsGridProps> = ({
  onSelectDepartment,
  onOpenQuoteModal,
  onViewAllDepartments,
  limit = 6,
}) => {
  const displayedDepartments = limit ? DEPARTMENTS.slice(0, limit) : DEPARTMENTS;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'DoorOpen':
        return <DoorOpen className="w-5 h-5" />;
      case 'Maximize2':
        return <Maximize2 className="w-5 h-5" />;
      case 'Grid':
        return <Grid className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Bath':
        return <Bath className="w-5 h-5" />;
      case 'Wrench':
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  return (
    <section id="departments" className="py-12 sm:py-16 bg-slate-100/70 border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold text-sky-600 tracking-wider uppercase block mb-2">
            خدمات متكاملة بمعايير هندسية
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-balance">
            أهم 6 خدمات رئيسية في زجاج سكريت ابوعريش
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            نلبي كافة احتياجات الفلل والمحلات والمباني التجارية في أبو عريش وجيزان بأفضل أنواع الزجاج السيكوريت والحلول المعمارية المعاصرة.
          </p>
        </div>

        {/* The 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedDepartments.map((dept: DepartmentInfo) => (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col group"
            >
              {/* Department Image Header */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.name}
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
                <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-slate-900 to-sky-950 text-white font-bold text-sm">
                  {dept.name}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 right-4 left-4 flex items-center justify-between text-white pointer-events-none">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-sky-600/90 rounded-lg text-white backdrop-blur-xs">
                      {getIcon(dept.iconName)}
                    </div>
                    <h3 className="font-bold text-lg text-white">{dept.name}</h3>
                  </div>
                </div>
              </div>

              {/* Department Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {dept.shortDesc}
                </p>

                {/* Key features bullets */}
                <div className="space-y-1.5 pt-1">
                  {dept.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Specs quick view */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                  {dept.specs.map((sp, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium">{sp.label}:</span>
                      <span className="font-semibold text-slate-800">{sp.value}</span>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onSelectDepartment(dept.name)}
                    className="flex-1 py-2 px-3 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>مقالات وتفاصيل القسم</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onOpenQuoteModal}
                    className="py-2 px-3 text-xs font-bold text-slate-700 hover:text-white hover:bg-slate-900 border border-slate-200 rounded-lg transition-colors"
                  >
                    طلب تسعير
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Departments Button if limited */}
        {limit && limit < DEPARTMENTS.length && onViewAllDepartments && (
          <div className="mt-10 text-center">
            <button
              onClick={onViewAllDepartments}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-xl border border-slate-300 shadow-xs hover:border-sky-400 transition-all"
            >
              <span>استعراض كافة الأقسام والخدمات ({DEPARTMENTS.length} أقسام كاملة)</span>
              <ChevronDown className="w-4 h-4 text-sky-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
