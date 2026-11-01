import React from 'react';
import { Phone, MessageCircle, MapPin, Bot, Sparkles } from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData';

interface FloatingActionButtonsProps {
  onOpenAssistant?: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onOpenAssistant,
}) => {
  return (
    <>
      {/* Desktop / Tablet Floating Dock (bottom-left) */}
      <aside
        aria-label="قنوات الاتصال السريع والمساعد الذكي"
        className="hidden sm:flex fixed bottom-6 left-6 z-40 items-center gap-2.5 pointer-events-auto"
      >
        {/* AI Assistant Quick Trigger */}
        {onOpenAssistant && (
          <button
            onClick={onOpenAssistant}
            aria-label="فتح المساعد الذكي لزجاج سكريت ابوعريش"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-700 to-indigo-800 hover:from-sky-600 hover:to-indigo-700 text-white rounded-2xl shadow-xl shadow-indigo-950/25 active:scale-95 transition-all text-xs font-black border border-sky-400/40 cursor-pointer group"
          >
            <div className="relative">
              <Bot className="w-4 h-4 text-sky-200 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
            </div>
            <span className="whitespace-nowrap">المساعد الذكي</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        )}

        {/* Direct Phone Call Button */}
        <a
          href={`tel:${COMPANY_DATA.phonePrimary}`}
          aria-label={`اتصال فوري: ${COMPANY_DATA.phonePrimary}`}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl shadow-xl shadow-sky-950/20 active:scale-95 transition-all text-xs font-bold border border-sky-400/30"
          dir="ltr"
        >
          <Phone className="w-4 h-4 text-white animate-pulse" />
          <span className="whitespace-nowrap font-mono">{COMPANY_DATA.phonePrimary}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={COMPANY_DATA.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="مراسلة عبر واتساب"
          className="flex items-center justify-center gap-1.5 px-3.5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-950/20 active:scale-95 transition-all text-xs font-bold border border-emerald-400/30"
        >
          <MessageCircle className="w-4 h-4 text-white" />
          <span className="whitespace-nowrap">واتساب</span>
        </a>

        {/* Google Maps Button */}
        <a
          href={COMPANY_DATA.googleMapsShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="موقعنا على خرائط Google"
          className="flex items-center justify-center p-3 bg-slate-900/90 hover:bg-slate-800 text-white rounded-2xl shadow-xl shadow-slate-950/20 active:scale-95 transition-all text-xs font-bold border border-slate-700/60 backdrop-blur-md"
          title="موقع الورشة على خرائط Google"
        >
          <MapPin className="w-4 h-4 text-amber-400" />
        </a>
      </aside>

      {/* Mobile Sticky Quick Action Bar (Full width, safe-area inset aware) */}
      <nav
        aria-label="شريط الوصول السريع للجوال"
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-2xl px-3 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-2"
      >
        {/* Call Now (Primary prominent CTA) */}
        <a
          href={`tel:${COMPANY_DATA.phonePrimary}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-600 active:bg-sky-700 text-white rounded-xl shadow-xs text-xs font-bold tracking-tight"
          dir="ltr"
        >
          <Phone className="w-3.5 h-3.5 text-white animate-pulse shrink-0" />
          <span className="truncate">اتصال: {COMPANY_DATA.phonePrimary}</span>
        </a>

        {/* WhatsApp */}
        <a
          href={COMPANY_DATA.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 py-2.5 px-3 bg-emerald-600 active:bg-emerald-700 text-white rounded-xl shadow-xs text-xs font-bold shrink-0"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          <span>واتساب</span>
        </a>

        {/* AI Assistant */}
        {onOpenAssistant && (
          <button
            onClick={onOpenAssistant}
            className="flex items-center justify-center gap-1 py-2.5 px-2.5 bg-gradient-to-r from-indigo-900 to-sky-800 active:from-indigo-950 text-white rounded-xl text-xs font-bold shadow-xs shrink-0 cursor-pointer"
            aria-label="المساعد الذكي"
          >
            <Bot className="w-3.5 h-3.5 text-sky-200 shrink-0" />
            <span className="text-[11px]">مساعد</span>
          </button>
        )}

        {/* Google Maps Pin */}
        <a
          href={COMPANY_DATA.googleMapsShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-slate-100 active:bg-slate-200 text-slate-800 rounded-xl shrink-0"
          aria-label="موقعنا على الخريطة"
        >
          <MapPin className="w-4 h-4 text-amber-600" />
        </a>
      </nav>
    </>
  );
};
