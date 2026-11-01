import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  ChevronDown,
  Layers,
  Building2,
  Sparkles,
  Clock,
  Wrench,
  DoorOpen,
  Bath,
  FileText,
  Image as ImageIcon,
  HelpCircle,
  Download,
  Info,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';
import { DEPARTMENTS } from '../data/categoriesData';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCms?: () => void;
  onOpenQuoteModal: () => void;
  onSelectDepartment?: (deptName: string) => void;
  onNavigateSection?: (target: string, deptName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenQuoteModal,
  onSelectDepartment,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesAccordionOpen, setMobileServicesAccordionOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (target: string, deptName?: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (onNavigateSection) {
      onNavigateSection(target, deptName);
    } else {
      if (deptName && onSelectDepartment) {
        onSelectDepartment(deptName);
      } else {
        setCurrentTab(target.replace('#', ''));
      }
    }
  };

  // Top core navigation items
  const mainNavItems = [
    { id: 'home', label: 'الرئيسية', target: 'home' },
    { id: 'departments', label: 'خدمات السيكوريت', target: '#departments', hasDropdown: true },
    { id: 'projects', label: 'أعمالنا ومشاريعنا', target: '#projects' },
    { id: 'articles', label: 'المقالات والأرشيف', target: '#articles' },
    { id: 'why-us', label: 'لماذا تختارنا', target: '#why-us' },
    { id: 'location', label: 'موقعنا بالخريطة', target: '#location' },
    { id: 'contact', label: 'اتصل بنا', target: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* 1. Top micro bar for quick contact and location */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-3 sm:px-6 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3">
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>أبو عريش - طريق الملك فيصل، جازان</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>ضمان معتمد 5 سنوات · معاينة مجانية</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:${COMPANY_DATA.phonePrimary}`}
              className="hover:text-sky-300 transition-colors flex items-center gap-1 font-bold text-white tracking-wide"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-sky-400 shrink-0" />
              <span>{COMPANY_DATA.phonePrimary}</span>
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={COMPANY_DATA.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 text-emerald-400 font-bold"
            >
              <MessageCircle className="w-3 h-3 shrink-0" />
              <span>واتساب</span>
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={COMPANY_DATA.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-400 font-medium hidden xs:flex"
            >
              <MapPin className="w-3 h-3 shrink-0" />
              <span>موقعنا</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          {/* Brand Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="text-right flex items-center gap-2.5 sm:gap-3 focus:outline-hidden group cursor-pointer"
              title="العودة للصفحة الرئيسية - زجاج سكريت ابوعريش"
            >
              <img
                src={COMPANY_DATA.logoUrl}
                alt="شعار زجاج سكريت ابوعريش"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-105 rounded-lg"
                loading="eager"
              />
              <div className="leading-tight">
                <span className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight block">
                  زجاج سكريت <span className="text-sky-600">ابوعريش</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-wider uppercase block truncate max-w-[140px] sm:max-w-none">
                  Securit Glass · Abu Arish
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-sm font-semibold text-slate-700">
            {mainNavItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.id} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      className={`inline-flex items-center gap-1 py-1 px-2 rounded-lg transition-colors cursor-pointer ${
                        currentTab === 'departments' || servicesDropdownOpen
                          ? 'text-sky-600 font-bold bg-sky-50'
                          : 'hover:text-sky-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesDropdownOpen ? 'rotate-180 text-sky-600' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Services Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div
                        onMouseLeave={() => setServicesDropdownOpen(false)}
                        className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="text-[11px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                          أقسام الزجاج السيكوريت المعتمدة
                        </div>
                        <div className="grid grid-cols-1 gap-1 mt-1">
                          {DEPARTMENTS.slice(0, 8).map((dept) => (
                            <button
                              key={dept.id}
                              onClick={() => handleNavClick('#departments', dept.name)}
                              className="w-full text-right flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors group cursor-pointer"
                            >
                              <span className="group-hover:translate-x-[-2px] transition-transform">
                                {dept.name}
                              </span>
                              <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md group-hover:bg-sky-100 group-hover:text-sky-700 transition-colors">
                                تصفح
                              </span>
                            </button>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between px-1">
                          <button
                            onClick={() => handleNavClick('departments')}
                            className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors py-1 px-2"
                          >
                            عرض كافة الـ 10 أقسام ←
                          </button>
                          <button
                            onClick={onOpenQuoteModal}
                            className="text-[11px] font-bold bg-sky-600 text-white px-2.5 py-1 rounded-lg hover:bg-sky-700 transition-colors"
                          >
                            طلب معاينة
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.target)}
                  className={`whitespace-nowrap transition-colors py-1 px-2 rounded-lg cursor-pointer ${
                    currentTab === item.id
                      ? 'text-sky-600 font-bold bg-sky-50 border-b-2 border-sky-600'
                      : 'hover:text-sky-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Free Quote Button */}
            <button
              onClick={onOpenQuoteModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-sky-600 rounded-xl hover:bg-sky-700 active:scale-95 transition-all shadow-xs shadow-sky-600/30 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>معاينة مجانية</span>
            </button>

            {/* Direct Phone Call Button */}
            <a
              href={`tel:${COMPANY_DATA.phonePrimary}`}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all rounded-xl shadow-xs shadow-emerald-600/20 whitespace-nowrap"
              title="اتصال مباشر"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-white animate-pulse shrink-0" />
              <span className="hidden lg:inline text-emerald-100 font-normal text-xs mr-0.5">اتصال:</span>
              <span className="font-mono tracking-tight">{COMPANY_DATA.phonePrimary}</span>
            </a>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 rounded-xl hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-hidden cursor-pointer"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer (Off-Canvas overlay) */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer container (slides from right for Arabic RTL) */}
          <div className="relative mr-auto ml-0 w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <img
                  src={COMPANY_DATA.logoUrl}
                  alt="شعار"
                  className="w-9 h-9 object-contain rounded-lg"
                />
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    زجاج سكريت <span className="text-sky-600">ابوعريش</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    طريق الملك فيصل · جازان
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Fast Action Bar */}
            <div className="p-3 bg-sky-50/70 border-b border-sky-100 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-sky-700 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>طلب معاينة مجاناً</span>
              </button>
              <a
                href={COMPANY_DATA.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>محادثة واتساب</span>
              </a>
            </div>

            {/* Drawer Scrollable Links List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Primary Navigation Sections */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                  أقسام الموقع الرئيسية
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                      currentTab === 'home'
                        ? 'bg-sky-50 text-sky-700 font-black'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>الرئيسية (الواجهة الكاملة)</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('#projects')}
                    className="w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>معرض الأعمال والمشاريع المنجزة</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('#articles')}
                    className="w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>المقالات والأرشيف الفني للزجاج</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('#why-us')}
                    className="w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>معايير الجودة والضمان المعتمد (5 سنوات)</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('#areas')}
                    className="w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>نطاق التغطية (أبو عريش، جيزان، صبيا، صامطة)</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('#location')}
                    className="w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>موقع الورشة والمعرض على خرائط Google</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('about')}
                    className={`w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                      currentTab === 'about'
                        ? 'bg-sky-50 text-sky-700 font-bold'
                        : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <Info className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>من نحن وسجل الخبرة والاعتمادات</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="w-full text-right flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>اتصل بنا وطلب عرض السعر المباشر</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Glass Services List */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => setMobileServicesAccordionOpen(!mobileServicesAccordionOpen)}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-700 py-2 px-1 hover:text-sky-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-600" />
                    <span>خدمات وأقسام الزجاج السيكوريت (10 خدمات)</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileServicesAccordionOpen ? 'rotate-180 text-sky-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {mobileServicesAccordionOpen && (
                  <div className="grid grid-cols-1 gap-1.5 mt-2 pr-2">
                    {DEPARTMENTS.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => handleNavClick('#departments', dept.name)}
                        className="text-right flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-sky-50 hover:text-sky-700 rounded-xl text-xs font-semibold text-slate-700 transition-colors group cursor-pointer"
                      >
                        <span>{dept.name}</span>
                        <span className="text-[10px] text-sky-600 font-bold">معاينة ←</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Archive Download Button */}
              <div className="pt-2 border-t border-slate-200">
                <a
                  href="/aboarsh-project.zip"
                  download="aboarsh-project.zip"
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>تحميل حزمة المشروع المحدثة (ZIP)</span>
                  </div>
                  <span className="text-[10px] bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded">
                    1.8 MB
                  </span>
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              <a
                href={`tel:${COMPANY_DATA.phonePrimary}`}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-black text-white bg-slate-900 rounded-xl shadow-xs hover:bg-slate-800 transition-colors"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>اتصال فوري: {COMPANY_DATA.phonePrimary}</span>
              </a>
              <p className="text-[10px] text-center text-slate-500 font-medium">
                أوقات العمل: يومياً 8:00 ص - 10:00 م · خدمة الصيانة والطوارئ 24/7
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
