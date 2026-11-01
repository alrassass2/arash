import React, { useState, useEffect } from 'react';
import { INITIAL_ARTICLES, Article } from './data/articlesData';
import { COMPANY_DATA } from './data/companyData';
import { DEPARTMENTS } from './data/categoriesData';
import { Header } from './components/Header';
import { Ticker } from './components/Ticker';
import { HeroSlider } from './components/HeroSlider';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { DepartmentsGrid } from './components/DepartmentsGrid';
import { ArticlesList } from './components/ArticlesList';
import { ProjectsGallery } from './components/ProjectsGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AreasServed } from './components/AreasServed';
import { GoogleMapsSection } from './components/GoogleMapsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActionButtons } from './components/FloatingActionButtons';
import { ArticleModal } from './components/ArticleModal';
import { QuoteModal } from './components/QuoteModal';
import { CmsAdminModal } from './components/CmsAdminModal';
import { StaticPages } from './components/StaticPages';
import { AiAssistant } from './components/AiAssistant';
import { matchesArabicSearch } from './utils/arabicSearch';

export default function App() {
  // Articles state initialized from LocalStorage or Default Imported Articles
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('abuarish_glass_articles_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback to initial
    }
    return INITIAL_ARTICLES;
  });

  // Navigation & View state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteDefaultService, setQuoteDefaultService] = useState<string>('الواجهات الزجاجية');
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [isAssistantModalOpen, setIsAssistantModalOpen] = useState<boolean>(false);

  // Sync articles state to LocalStorage
  const handleSaveArticles = (updatedArticles: Article[]) => {
    setArticles(updatedArticles);
    try {
      localStorage.setItem('abuarish_glass_articles_v2', JSON.stringify(updatedArticles));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleResetArticles = () => {
    setArticles(INITIAL_ARTICLES);
    try {
      localStorage.removeItem('abuarish_glass_articles_v2');
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  };

  // Scroll to top on tab change
  const navigateToTab = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtering articles with letter-sensitive, normalized Arabic search
  const filteredArticles = articles.filter((art) => {
    const queryMatches =
      searchQuery === '' ||
      matchesArabicSearch(art.title, searchQuery) ||
      matchesArabicSearch(art.plainText, searchQuery) ||
      matchesArabicSearch(art.department, searchQuery) ||
      art.categories.some((c) => matchesArabicSearch(c, searchQuery));

    const matchesDept = selectedDept === 'all' || art.department === selectedDept;

    const matchesTag =
      selectedTag === '' || art.categories.some((c) => matchesArabicSearch(c, selectedTag));

    return queryMatches && matchesDept && matchesTag;
  });

  const handleSelectDepartment = (deptName: string) => {
    setSelectedDept(deptName);
    setSelectedTag('');
    setSearchQuery('');
    setCurrentTab('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
    setCurrentTab('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (serviceName?: string) => {
    if (serviceName) setQuoteDefaultService(serviceName);
    setIsQuoteModalOpen(true);
  };

  // Handle section anchors & tab navigation seamlessly
  const handleNavigate = (target: string, deptName?: string) => {
    if (deptName) {
      handleSelectDepartment(deptName);
      return;
    }

    if (target.startsWith('#')) {
      const sectionId = target.slice(1);
      if (currentTab !== 'home') {
        setCurrentTab('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    setCurrentTab(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-sky-500 selection:text-white">
      {/* 1. Top Bar & Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={navigateToTab}
        onOpenCms={() => setIsCmsOpen(true)}
        onOpenQuoteModal={() => handleOpenQuote()}
        onSelectDepartment={handleSelectDepartment}
        onNavigateSection={handleNavigate}
      />

      {/* 2. Breaking Service Ticker */}
      <Ticker />

      {/* 3. Main Views Content */}
      <main className="flex-1 pb-20 sm:pb-8">
        {currentTab === 'home' && (
          <>
            {/* Hero Slider with Real Showcase Imagery */}
            <HeroSlider
              onOpenQuoteModal={() => handleOpenQuote()}
              onExploreDepartment={handleSelectDepartment}
            />

            {/* Quick Search & Source Tags Filtering Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-30 mb-8">
              <SearchAndFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedDept={selectedDept}
                setSelectedDept={setSelectedDept}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                resultsCount={filteredArticles.length}
                onOpenQuoteModal={() => handleOpenQuote()}
                onSelectArticle={(articleId) => {
                  const art = articles.find((a) => a.id === articleId);
                  if (art) setSelectedArticle(art);
                }}
              />
            </div>

            {/* Core 6 Coordinated Departments Grid */}
            <DepartmentsGrid
              onSelectDepartment={handleSelectDepartment}
              onOpenQuoteModal={() => handleOpenQuote()}
              onViewAllDepartments={() => navigateToTab('departments')}
              limit={6}
            />

            {/* Latest Articles & Guides */}
            <ArticlesList
              articles={filteredArticles}
              onReadArticle={(art) => setSelectedArticle(art)}
              onSelectTag={handleSelectTag}
              title="أحدث المقالات والدراسات الفنية للزجاج السيكوريت"
              subtitle="دليل شامل مستخرج من مشاريعنا بجيزان وأبو عريش لمساعدتك في اختيار أنسب أنواع الزجاج والمواصفات"
            />

            {/* Real Projects Showcase */}
            <ProjectsGallery />

            {/* Why Choose Us & Technical Superiority */}
            <WhyChooseUs onOpenQuoteModal={() => handleOpenQuote()} />

            {/* Geographic Coverage */}
            <AreasServed onOpenQuoteModal={() => handleOpenQuote()} />

            {/* Contact & Consultation Form */}
            <ContactSection />

            {/* Official Google Maps Integration */}
            <GoogleMapsSection />
          </>
        )}

        {currentTab === 'departments' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <h1 className="text-3xl font-black text-slate-900">
                الأقسام والخدمات المتخصصة
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                استعرض تفاصيل خدمات الزجاج السيكوريت والواجهات والاستركشر والأبواب والمطابخ بجيزان وأبو عريش
              </p>
            </div>
            <DepartmentsGrid
              onSelectDepartment={handleSelectDepartment}
              onOpenQuoteModal={() => handleOpenQuote()}
              limit={10}
            />
          </div>
        )}

        {currentTab === 'articles' && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <h1 className="text-3xl font-black text-slate-900">
                جميع المقالات والأرشيف الكامل ({articles.length} مقال)
              </h1>
              <p className="text-slate-600 text-sm mt-1">
                جميع المقالات والموضوعات التقنية المستوردة بكامل نصوصها وصورها وتصنيفاتها
              </p>

              <div className="mt-6">
                <SearchAndFilterBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedDept={selectedDept}
                  setSelectedDept={setSelectedDept}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                  resultsCount={filteredArticles.length}
                  onOpenQuoteModal={() => handleOpenQuote()}
                  onSelectArticle={(articleId) => {
                    const art = articles.find((a) => a.id === articleId);
                    if (art) setSelectedArticle(art);
                  }}
                />
              </div>
            </div>

            <ArticlesList
              articles={filteredArticles}
              onReadArticle={(art) => setSelectedArticle(art)}
              onSelectTag={handleSelectTag}
              title={`المقالات المعروضة (${filteredArticles.length})`}
              subtitle="انقر على أي مقال لقراءة النص الأصلي الكامل وتصفح معرض الصور"
            />
          </div>
        )}

        {currentTab === 'projects' && (
          <div className="py-8">
            <ProjectsGallery />
            <ContactSection />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="py-8 space-y-8">
            <ContactSection />
            <GoogleMapsSection />
          </div>
        )}

        {(currentTab === 'about' ||
          currentTab === 'privacy' ||
          currentTab === 'terms' ||
          currentTab === 'sitemap') && (
          <StaticPages
            tab={currentTab}
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onSelectDepartment={handleSelectDepartment}
            onOpenQuoteModal={() => handleOpenQuote()}
          />
        )}
      </main>

      {/* 4. Complete Footer */}
      <Footer
        setCurrentTab={navigateToTab}
        onSelectDepartment={handleSelectDepartment}
        onSelectTag={handleSelectTag}
      />

      {/* 5. Sticky Floating Call-To-Action Buttons */}
      <FloatingActionButtons onOpenAssistant={() => setIsAssistantModalOpen(true)} />

      {/* 6. Full Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        allArticles={articles}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onOpenQuoteModal={() => handleOpenQuote(selectedArticle?.department)}
      />

      {/* 7. Free Inspection Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultService={quoteDefaultService}
      />

      {/* 8. Full CMS Management Modal */}
      <CmsAdminModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        articles={articles}
        onSaveArticles={handleSaveArticles}
        onResetArticles={handleResetArticles}
      />

      {/* 9. Floating AI Assistant Modal */}
      <AiAssistant
        mode="modal"
        isOpen={isAssistantModalOpen}
        onClose={() => setIsAssistantModalOpen(false)}
        onOpenQuoteModal={() => {
          setIsAssistantModalOpen(false);
          handleOpenQuote();
        }}
        onSelectArticle={(articleId) => {
          setIsAssistantModalOpen(false);
          const art = articles.find((a) => a.id === articleId);
          if (art) setSelectedArticle(art);
        }}
      />
    </div>
  );
}
