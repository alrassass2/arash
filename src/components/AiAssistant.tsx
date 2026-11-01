import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  FileText,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Lock,
  Layers,
  HelpCircle,
  X,
} from 'lucide-react';
import { getGroundedAnswer, AssistantResponse } from '../utils/aiAssistantEngine';
import { COMPANY_DATA } from '../data/companyData';
import {
  INSTANT_QA_BANK,
  INSTANT_QA_CATEGORIES,
  InstantQA,
} from '../data/instantQABank';
import {
  secureGetItem,
  secureSetItem,
  secureRemoveItem,
} from '../utils/securityCrypto';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  responseMeta?: AssistantResponse;
  timestamp: string;
}

interface AiAssistantProps {
  mode?: 'inline' | 'modal';
  isOpen?: boolean;
  onClose?: () => void;
  onOpenQuoteModal?: () => void;
  onSelectArticle?: (articleId: string) => void;
}

const STORAGE_KEY = 'chat_history_v3';

export const AiAssistant: React.FC<AiAssistantProps> = ({
  mode = 'inline',
  isOpen = true,
  onClose,
  onOpenQuoteModal,
  onSelectArticle,
}) => {
  // Encrypted persistent messages loaded from secure local storage
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = secureGetItem<Message[]>(STORAGE_KEY, []);
    if (saved && saved.length > 0) {
      return saved;
    }
    return [
      {
        id: 'welcome',
        sender: 'assistant',
        text: `مرحباً بك! أنا **المساعد الذكي لمؤسسة زجاج سكريت ابوعريش**.

يسعدني تزويدك بـ **ردود فورية موثقة** مستخرجة مباشرة من قاعدة بيانات الموقع، حول:
• **المعاينة ورفع المقاسات المجانية** بأبو عريش وجيزان
• **سماكات الزجاج السيكوريت (10 و 12 مم)** والاستركشر
• تفصيل **كبائن الشاور** وحمامات بدون تسريب
• **بلكونات زجاجية قابلة للطي** ودرابزين ستانلس ستيل
• صيانة وضبط **ماكينات الأبواب الأرضية** (دورما وإيطالي)
• **الضمان المعتمد حتى 5 سنوات** وتفاصيل الأسعار

اختر من بنك الأسئلة الفورية أدناه أو اكتب استفسارك مباشرة:`,
        timestamp: 'الآن',
      },
    ];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('popular');
  const [showQABank, setShowQABank] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Securely persist encrypted messages whenever updated
  useEffect(() => {
    secureSetItem(STORAGE_KEY, messages);
  }, [messages]);

  // Filtered instant Q&As for the active category
  const currentCategoryQAs = INSTANT_QA_BANK.filter(
    (item) => item.category === activeCategory
  );

  // Handle Instant QA click (Zero latency response)
  const handleInstantQAClick = (qa: InstantQA) => {
    const userMsg: Message = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: qa.question,
      timestamp: new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const assistantMsg: Message = {
      id: 'ast_' + Date.now(),
      sender: 'assistant',
      text: qa.answer,
      responseMeta: {
        answer: qa.answer,
        suggestedAction: qa.suggestedAction,
        actionLabel: qa.actionLabel,
        actionUrl: qa.actionUrl,
      },
      timestamp: new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
  };

  // Send query via server-side secure API proxy with instant local fallback
  const handleSendMessage = async (customQuery?: string) => {
    const query = (customQuery || inputQuery).trim();
    if (!query) return;

    const userMsg: Message = {
      id: 'usr_' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customQuery) setInputQuery('');
    setIsTyping(true);

    try {
      // 1. Attempt secure server-side call
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const assistantMsg: Message = {
            id: 'ast_' + Date.now(),
            sender: 'assistant',
            text: data.reply,
            responseMeta: getGroundedAnswer(query),
            timestamp: new Date().toLocaleTimeString('ar-SA', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          setMessages((prev) => [...prev, assistantMsg]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Network/offline fallback
    }

    // 2. Instant local grounded engine fallback
    setTimeout(() => {
      const groundedResp = getGroundedAnswer(query);
      const assistantMsg: Message = {
        id: 'ast_' + Date.now(),
        sender: 'assistant',
        text: groundedResp.answer,
        responseMeta: groundedResp,
        timestamp: new Date().toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 300);
  };

  const handleResetChat = () => {
    secureRemoveItem(STORAGE_KEY);
    setMessages([
      {
        id: 'welcome_reset',
        sender: 'assistant',
        text: `تم إعادة ضبط المحادثة وتشفير الجلسة الجديدة. يمكنك استعراض الأسئلة الفورية أو الاستفسار عن أي خدمة للزجاج السيكوريت بأبو عريش وجيزان.`,
        timestamp: 'الآن',
      },
    ]);
  };

  const renderFormattedText = (rawText: string) => {
    const parts = rawText.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-extrabold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // If in modal mode and closed, do not render
  if (mode === 'modal' && !isOpen) {
    return null;
  }

  const content = (
    <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-sky-800/40 relative overflow-hidden flex flex-col max-h-[85vh]">
      {/* Decorative ambient blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar / Header */}
      <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-sky-500/30 to-indigo-600/30 border border-sky-400/40 flex items-center justify-center text-sky-300 shadow-inner">
              <Bot className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-sm sm:text-base text-white">
                المساعد الذكي لزجاج سكريت ابوعريش
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                <Lock className="w-2.5 h-2.5" />
                <span>محادثة مشفرة وآمنة</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              ردود فورية موثقة من الموقع للأسعار والمواصفات والضمان والمعاينة المجانية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetChat}
            title="إعادة ضبط المحادثة"
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {mode === 'inline' ? (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isExpanded ? 'طي المساعد' : 'توسيع المساعد'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Body */}
      {(mode === 'modal' || isExpanded) && (
        <div className="flex-1 flex flex-col min-h-0 relative z-10 pt-3 space-y-3">
          {/* Encryption & Privacy Assurance Strip */}
          <div className="flex items-center justify-between text-[11px] text-slate-300 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
            <div className="flex items-center gap-1.5 text-sky-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>تشفير المفاتيح والدردشة وسجل الأسئلة محلياً (End-to-End Privacy)</span>
            </div>
            <button
              onClick={() => setShowQABank(!showQABank)}
              className="text-amber-300 hover:text-amber-200 font-semibold underline flex items-center gap-1 text-[11px]"
            >
              <HelpCircle className="w-3 h-3" />
              <span>{showQABank ? 'إخفاء بنك الأسئلة' : 'عرض بنك الأسئلة الفورية'}</span>
            </button>
          </div>

          {/* Instant Q&A Bank Drawer */}
          {showQABank && (
            <div className="bg-slate-950/70 border border-white/10 rounded-2xl p-3 shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>بنك الأسئلة والأجوبة الفورية (اختر أي سؤال للرد اللحظي):</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {currentCategoryQAs.length} أسئلة جاهزة
                </span>
              </div>

              {/* Category tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none mb-2">
                {INSTANT_QA_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white/10 text-slate-300 hover:bg-white/15'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Instant Questions Pills */}
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-thin">
                {currentCategoryQAs.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleInstantQAClick(item)}
                    className="text-xs bg-white/10 hover:bg-sky-600/40 text-slate-100 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/15 transition-all text-right hover:border-sky-400 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                    <span>{item.question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversation Messages */}
          <div className="flex-1 bg-slate-950/80 rounded-2xl p-3 sm:p-4 border border-white/10 overflow-y-auto space-y-3.5 min-h-[160px] max-h-[360px] scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-br-none shadow-md'
                      : 'bg-white text-slate-900 rounded-bl-none shadow-lg border border-slate-100'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Contextual Action Buttons in Assistant Message */}
                  {msg.sender === 'assistant' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-2">
                      <a
                        href={`tel:${COMPANY_DATA.phonePrimary}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>اتصال فوري ({COMPANY_DATA.phonePrimary})</span>
                      </a>

                      <a
                        href={COMPANY_DATA.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>واتساب</span>
                      </a>

                      <a
                        href={COMPANY_DATA.googleMapsShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>موقعنا بالخريطة</span>
                      </a>

                      {onOpenQuoteModal && (
                        <button
                          onClick={onOpenQuoteModal}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>طلب تسعير ومعاينة مجانية</span>
                        </button>
                      )}
                    </div>
                  )}

                  <span
                    className={`text-[10px] block mt-1.5 ${
                      msg.sender === 'user' ? 'text-sky-200 text-left' : 'text-slate-400 text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 bg-white text-slate-700 rounded-2xl rounded-bl-none p-3 w-fit shadow-xs border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-500 font-medium mr-1.5">
                  جاري تحضير الرد الفوري من قاعدة بيانات الموقع...
                </span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* User Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 shrink-0 pt-1"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="اكتب سؤالك هنا: كم سعر المتر؟ هل المعاينة مجانية؟ ما أنواع الأبواب والضمان؟..."
              className="flex-1 bg-white/10 text-white placeholder:text-slate-400 border border-white/20 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-400 focus:bg-white/15 transition-all"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:hover:bg-sky-500 text-white px-4 sm:px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>إرسال</span>
              <Send className="w-4 h-4 rotate-180" />
            </button>
          </form>
        </div>
      )}
    </div>
  );

  if (mode === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="w-full max-w-2xl">{content}</div>
      </div>
    );
  }

  // Inline mode (placed at the end of the filter)
  return <div className="mt-5 pt-5 border-t border-slate-200">{content}</div>;
};
