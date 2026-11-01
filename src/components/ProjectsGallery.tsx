import React, { useState } from 'react';
import { Maximize2, X, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

export const ProjectsGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; category: string } | null>(null);

  const projects = [
    {
      id: 1,
      title: 'واجهات استركشر زجاجية مزدوجة لمبنى تجاري',
      category: 'الواجهات والاستركشر',
      location: 'طريق الملك فيصل، أبو عريش',
      image: '/src/assets/images/hero_glass_facade_1793454868293.jpg'
    },
    {
      id: 2,
      title: 'إغلاق بلكونة زجاجية بنظام السحب القابل للطي',
      category: 'البلكونات الزجاجية',
      location: 'حي الأندلس، أبو عريش',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHgozg-THGe1eY7Td7ZXCZZckNb87XOKVJIauDm6wP-XxWntTNxc-fPOcBbMx5xcgME9zEI-O89WFfh_LAVHVDGLw3b1we0nqk6xNLkGx_maSvgAoKWn9jswlusGb_yYmUihdM_shtj56mC43pi80TjJ-ppbHQtnWQ_8P3CBHVL527OEQlERjQgy0U/s1600/%D8%A8%D9%84%D9%83%D9%88%D9%86%D8%A7%D8%AA4.jpg'
    },
    {
      id: 3,
      title: 'أبواب زجاج سيكوريت 12 مم أوتوماتيكية بحساسات',
      category: 'الأبواب الزجاجية',
      location: 'مركز تجاري، أبو عريش',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivr3OtcJXeiF6qx1haGOW_4RhykBkMF-5YA5dm0hHFBy_6U6Vj77nrCkquyP8OvsW8ICnyunu0iTpRKB4dU0LfxZP01BVH6JIDWo1IbIorhab0TJi_kMw1vfy8Q-x4tOpvbU8wxfASJk5Y2_qI2hpIX7jjDOMyOPBop6WDy5MbMj8p0X3lD6KUPEbZ/s1600/%D9%88%D8%A7%D8%AC%D9%87%D8%A76.jpg'
    },
    {
      id: 4,
      title: 'كبائن شاور زجاجية سيكوريت مع إكسسوارات ستيل أسود',
      category: 'كبائن الشاور والمرايا',
      location: 'فيلا سكنية، أبو عريش',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjt2t2nUqomtPcOi8j21L0gOihneqADZ_YF9Ss0ySNYAAk6PvNLzULHZe3v69eXx1Pcn2Anbzc3iCSQiS9amIv5WWBmhOs5CId8cz343TLx4con7DNL2qjiLSPdYCLAZk5ua0PYZ7oTO9XUCqLvI7OQcolZCWds0CwPAIzpxlVi0eaUL-LxcMLzjEXa/s1600/%D8%AD%D9%85%D8%A7%D9%85%D8%A7%D8%AA1.jpg'
    },
    {
      id: 5,
      title: 'قواطع مكاتب زجاجية عازلة للصوت بتصميم مثلج',
      category: 'المكاتب والقواطع',
      location: 'مقر شركة، أبو عريش',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCPOJse0dllbRDIh7MyYbVvwWIkFHV0G0rXv2YMVokBmn8HoUTxiTT-henCuIdi5dmTFNVvzKm1AoQiSXfV6MM2od66ovBx1URgsUkwH-6zloZjq9dhNyhshQNsjxc2oMYmGz7GDI1rrWm6CLeHBnwljwj3r4zciKGz_hO0KasIb7zZAUNgyIWUBP7/s1600/%D9%85%D9%83%D8%A7%D8%AA%D8%A8%20%D8%B2%D8%AC%D8%A7%D8%AC%D9%8A%D8%A9.jpg'
    },
    {
      id: 6,
      title: 'درابزين زجاجي مودرن لدرج داخلي بنظام سبايدر',
      category: 'الدرابزين والنوافذ',
      location: 'فيلا مودرن، أبو عريش',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgrJwy60j9udQAYIT2C8o8CeW7Vys6mAX3MV2gjCh-8EL0qGqiKz1gMSACY8EwEkAChFt5DUjvUL8yUbFGb6PHaCbDMDL0pWBHnuXolVLnnYFHidTEvlqtUwTAdf8m5iUnY9NoB_MaeAKxRp94pAZqI2jc98-CP-UoMLDebJvuYeWzGDaTY__diz4O1/s1600/%D8%B3%D9%84%D8%A7%D9%84%D9%85%207.jpg'
    },
    {
      id: 7,
      title: 'تفصيل مطبخ ألمنيوم دبل مع واجهات زجاج سيكوريت',
      category: 'المطابخ والألمنيوم',
      location: 'شقة فاخرة، جيزان',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSMl-V8pqRQ7wZIr6QFIYOKYbNSM3c4pABjf4Bnazc363bpOxLZPtRSx7p9AeVmJyuCIOhsoE1dC6mwJ1KQ9Qu4-VeKFPbcWxYqQD2Kf4lB59BjBSWGE_zm6o1d6ObJOOdFH2sGLarcvzpp2ita1LprDA9a5j-vkMvXZk7YIqW1VpCbOYGBInl1xAk/s1600/%D9%85%D8%B7%D8%A7%D8%A8%D8%AE%20%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%88%D9%85.jpg'
    },
    {
      id: 8,
      title: 'مرايا جدارية ديكورية بإضاءة LED مخفية للمداخل',
      category: 'كبائن الشاور والمرايا',
      location: 'مجلس ضيوف، أبو عريش',
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi800aL4Pe-TDIJzM5fMIRpVg3820rAkIF7sfsyWRa8qvcu-nbSY796WZ_YqvqPfej3c9wFJ27uSMrC7UPw6NDNEoEeQAtjhNYDtjHYC3H29nP3cRhKrSw001lhtoaFoJlIOPlbOosYOIMrstxtRG0nJ5q0YzMf0lPwwICeJe6gjCB6J6eqL8GiQFsq/s1600/%D9%85%D8%B1%D8%A7%D9%8A%D8%A7%202.jpg'
    }
  ];

  const categories = [
    { id: 'all', label: 'كافة الأعمال' },
    { id: 'الواجهات والاستركشر', label: 'الواجهات والاستركشر' },
    { id: 'البلكونات الزجاجية', label: 'البلكونات الزجاجية' },
    { id: 'الأبواب الزجاجية', label: 'الأبواب السيكوريت' },
    { id: 'كبائن الشاور والمرايا', label: 'الشاور والمرايا' },
    { id: 'المكاتب والقواطع', label: 'القواطع والمكاتب' },
    { id: 'الدرابزين والنوافذ', label: 'الدرابزين والنوافذ' },
    { id: 'المطابخ والألمنيوم', label: 'المطابخ' },
  ];

  const filtered = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-12 sm:py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold text-sky-600 tracking-wider uppercase block mb-2">
            معرض الأعمال والتشطيبات
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight text-balance">
            مشاريع وأعمال زجاج سكريت ابوعريش
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            نماذج حقيقية من مشاريع واجهات المباني، قواطع المكاتب، البلكونات بدون إطارات، وكبائن الشاور المنفذة بأيدي فنيين محترفين.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="group relative bg-slate-950 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 aspect-4/3 cursor-pointer"
              onClick={() => setLightboxImage({ url: proj.image, title: proj.title, category: proj.category })}
            >
              <img
                src={proj.image}
                alt={proj.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-semibold px-2 py-1 bg-white/20 backdrop-blur-xs rounded-md">
                    {proj.category}
                  </span>
                  <div className="p-1.5 rounded-lg bg-black/40 text-white/80 group-hover:text-white group-hover:bg-sky-600 transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-white leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">{proj.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-5 bg-slate-900 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-sky-400 block mb-1">
                  {lightboxImage.category}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {lightboxImage.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${COMPANY_DATA.phonePrimary}`}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>طلب مثل هذا العمل</span>
                </a>
                <a
                  href={COMPANY_DATA.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
