import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Bot,
  Building2,
  ShieldCheck,
  MessageCircleHeart,
  Film,
  Clock,
  Users,
  Globe2,
  Stethoscope,
  Scissors,
  ShoppingBag,
  Compass,
  AlertTriangle,
  HeartHandshake,
  MessagesSquare,
  BellRing,
  Languages,
  CheckCircle2,
  Send,
  Phone,
  Calendar,
  Share2,
  Heart,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  Search,
  Star,
  MapPin,
  Check,
  MoveHorizontal,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
});

interface FeatureMeta {
  category: "social" | "health" | "services" | "safety";
  categoryAr: string;
  categoryEn: string;
  icon: LucideIcon;
  accentColor: string; // Tailwind color string for glow & badge
  accentHex: string;
  chipsEn: string[];
  chipsAr: string[];
}

const metaMap: Record<string, FeatureMeta> = {
  "social-feed": {
    category: "social",
    categoryAr: "المجتمع والمحتوى",
    categoryEn: "Social & Community",
    icon: MessageCircleHeart,
    accentColor: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    accentHex: "#f59e0b",
    chipsEn: ["Pure Pet Feed", "Photo & Video Moments", "Zero Clutter"],
    chipsAr: ["خلاصة نقية للأليف", "صور ويوميات", "مجتمع محب للحيوانات"],
  },
  reels: {
    category: "social",
    categoryAr: "الميديا والريلز",
    categoryEn: "Media & Reels",
    icon: Film,
    accentColor: "from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/30",
    accentHex: "#f43f5e",
    chipsEn: ["Vertical Short Video", "Exclusive Pet Audio", "Funny & Adorable"],
    chipsAr: ["فيديوهات رأسية قصيرة", "أصوات أليفة حصرية", "مقاطع طريفة وتدريب"],
  },
  stories: {
    category: "social",
    categoryAr: "القصص واليوميات",
    categoryEn: "Moments & Stories",
    icon: Clock,
    accentColor: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
    accentHex: "#eab308",
    chipsEn: ["24h Daily Updates", "Instant Capture", "Closer to Friends"],
    chipsAr: ["يوميات 24 ساعة", "توثيق سريع وسهل", "أقرب لأصدقاء الأليف"],
  },
  "vet-discovery": {
    category: "health",
    categoryAr: "الرعاية والطب",
    categoryEn: "Health & Clinics",
    icon: Stethoscope,
    accentColor: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    accentHex: "#10b981",
    chipsEn: ["Licensed Vets", "Clinical Specialties", "Fast Bookings"],
    chipsAr: ["أطباء مرخصون وموثقون", "تخصصات دقيقة", "حجز كشف واستشارة"],
  },
  marketplace: {
    category: "services",
    categoryAr: "المتاجر والمستلزمات",
    categoryEn: "Marketplace & Products",
    icon: ShoppingBag,
    accentColor: "from-indigo-500/20 to-blue-500/10 text-indigo-400 border-indigo-500/30",
    accentHex: "#6366f1",
    chipsEn: ["Wholesome Nutrition", "Toys & Accessories", "Trusted Pet Shops"],
    chipsAr: ["أغذية فائقة الجودة", "ألعاب ومستلزمات", "متاجر محلية موثوقة"],
  },
  grooming: {
    category: "services",
    categoryAr: "الخدمات والسبا",
    categoryEn: "Grooming & Wellness",
    icon: Scissors,
    accentColor: "from-purple-500/20 to-fuchsia-500/10 text-purple-400 border-purple-500/30",
    accentHex: "#a855f7",
    chipsEn: ["Luxury Spa Baths", "Haircuts & De-shedding", "Salon & Mobile"],
    chipsAr: ["حمامات سبا فاخرة", "قص شعر وتخفيف تساقط", "خدمة صالون أو منزلية"],
  },
  "lost-found": {
    category: "safety",
    categoryAr: "طوارئ SOS والأمان",
    categoryEn: "Emergency & Safety",
    icon: AlertTriangle,
    accentColor: "from-red-500/20 to-rose-500/10 text-red-400 border-red-500/30",
    accentHex: "#ef4444",
    chipsEn: ["Geo-Radius SOS Alert", "Pet Photos & Marks", "Instant Community Broadcast"],
    chipsAr: ["تنبيه SOS بنطاق جغرافي", "صور وعلامات مميزة", "استجابة سريعة من المجتمع"],
  },
  adoption: {
    category: "safety",
    categoryAr: "التبني الإنساني",
    categoryEn: "Compassionate Adoption",
    icon: HeartHandshake,
    accentColor: "from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/30",
    accentHex: "#ec4899",
    chipsEn: ["100% Free Adoption", "Rescue & Rehabilitation", "Verified Caring Homes"],
    chipsAr: ["تبني إنساني مجاني 100%", "شبكة إنقاذ وتأهيل", "بيوت آمنة وموثقة"],
  },
  "nearby-places": {
    category: "services",
    categoryAr: "الاستكشاف والخريطة",
    categoryEn: "Nearby Places",
    icon: Compass,
    accentColor: "from-sky-500/20 to-cyan-500/10 text-sky-400 border-sky-500/30",
    accentHex: "#0ea5e9",
    chipsEn: ["Pet Parks", "24/7 Vet Pharmacies", "Live Distance & Radar"],
    chipsAr: ["حدائق صديقة للأليف", "صيدليات بيطرية 24 ساعة", "مسافات وخريطة حية"],
  },
  groups: {
    category: "social",
    categoryAr: "المجموعات ونوادي السلالات",
    categoryEn: "Groups & Packs",
    icon: Users,
    accentColor: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
    accentHex: "#3b82f6",
    chipsEn: ["Breed Circles", "Local Walks", "Special Interests"],
    chipsAr: ["نوادي السلالات", "جولات المشي بالحي", "مجتمعات اهتمام مشتركة"],
  },
  notifications: {
    category: "safety",
    categoryAr: "الإشعارات والتذكيرات",
    categoryEn: "Reminders & Alerts",
    icon: BellRing,
    accentColor: "from-yellow-500/20 to-amber-500/10 text-yellow-400 border-yellow-500/30",
    accentHex: "#eab308",
    chipsEn: ["Vaccine Reminders", "Missing Pet Radar", "Booking Confirmations"],
    chipsAr: ["تذكير مواعيد التطعيمات", "رادار الأليف المفقود", "تأكيدات الحجز الفورية"],
  },
  "global-community": {
    category: "social",
    categoryAr: "المجتمع العالمي",
    categoryEn: "Global Community",
    icon: Globe2,
    accentColor: "from-teal-500/20 to-emerald-500/10 text-teal-400 border-teal-500/30",
    accentHex: "#14b8a6",
    chipsEn: ["International Network", "Pet Culture", "Compassionate Care"],
    chipsAr: ["شبكة إقليمية وعالمية", "ثقافة حب الأليف", "رعاية بالرفق والوعي"],
  },
  "pet-hotels": {
    category: "services",
    categoryAr: "فنادق واستضافة الأليف",
    categoryEn: "Pet Hotels & Boarding",
    icon: Building2,
    accentColor: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    accentHex: "#f59e0b",
    chipsEn: ["Climate-Controlled Suites", "Daily Photo/Video Updates", "WhatsApp Coordination"],
    chipsAr: ["أجنحة مكيفة ومجهزة", "تحديثات يومية وتصوير", "تواصل مباشر واتساب"],
  },
  "ai-assistant": {
    category: "health",
    categoryAr: "مساعد الذكاء الاصطناعي",
    categoryEn: "Waneesi AI Assistant",
    icon: Bot,
    accentColor: "from-emerald-500/20 to-cyan-500/10 text-emerald-400 border-emerald-500/30",
    accentHex: "#10b981",
    chipsEn: ["24/7 Smart Guidance", "Initial Symptom Check", "Nutrition & Behavior Tips"],
    chipsAr: ["إجابات ذكية 24/7", "فحص أعراض أولية", "نصائح تغذية وسلوك"],
  },
  "pet-health": {
    category: "health",
    categoryAr: "السجل الصحي وبطاقة التطعيم",
    categoryEn: "Health Passport",
    icon: ShieldCheck,
    accentColor: "from-teal-500/20 to-emerald-500/10 text-teal-400 border-teal-500/30",
    accentHex: "#0d9488",
    chipsEn: ["Digital Vaccine Passport", "Booster Alerts", "Doctor-Shared Records"],
    chipsAr: ["شهادات تطعيم رقمية", "تنبيهات الجرعات القادمة", "سجل طبي يشارك مع الطبيب"],
  },
  chats: {
    category: "safety",
    categoryAr: "المحادثات والتواصل الفوري",
    categoryEn: "Direct In-App Chat",
    icon: MessagesSquare,
    accentColor: "from-violet-500/20 to-purple-500/10 text-violet-400 border-violet-500/30",
    accentHex: "#8b5cf6",
    chipsEn: ["1-on-1 Secure Chat", "Clinic Inquiries", "Hotel Booking Chat"],
    chipsAr: ["مراسلة مباشرة 1-on-1", "استفسار من العيادات", "تنسيق حجز الفنادق"],
  },
  multilingual: {
    category: "social",
    categoryAr: "تعدد اللغات الكامل",
    categoryEn: "Multi-Language",
    icon: Languages,
    accentColor: "from-sky-500/20 to-blue-500/10 text-sky-400 border-sky-500/30",
    accentHex: "#0284c7",
    chipsEn: ["Arabic • English • French", "Instant Switch", "Medical Terms Localized"],
    chipsAr: ["عربي • إنجليزي • فرنسي", "تبديل فوري", "توطين طبي دقيق"],
  },
};

const defaultMeta: FeatureMeta = {
  category: "social",
  categoryAr: "مميزات ونيسي",
  categoryEn: "Waneesi Features",
  icon: Sparkles,
  accentColor: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
  accentHex: "#f59e0b",
  chipsEn: ["Fully Integrated", "Mobile First", "Care Focused"],
  chipsAr: ["مدمج بالكامل", "مصمم للهاتف", "رعاية متكاملة"],
};

export function FeaturesPage() {
  const { lang, t } = usePrefs();
  const ar = lang === "ar";
  const ArrowIcon = ar ? ArrowLeft : ArrowRight;

  const features = t.features.items;
  const total = features.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play state
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Phone Drag / Swipe state
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPointerXRef = useRef<number | null>(null);

  const activeFeature = features[currentIndex] ?? features[0];
  const activeMeta = metaMap[activeFeature.id] ?? defaultMeta;
  const ActiveIcon = activeMeta.icon;

  const ribbonRef = useRef<HTMLDivElement>(null);

  // Smooth slide change function
  const changeSlide = (newIndex: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setSlideDirection(dir);
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  // Navigation handlers
  const handleNext = () => {
    changeSlide((currentIndex + 1) % total, "next");
  };

  const handlePrev = () => {
    changeSlide((currentIndex - 1 + total) % total, "prev");
  };

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return;
    const dir = idx > currentIndex ? "next" : "prev";
    changeSlide(idx, dir);
  };

  // Auto-Play horizontal carousel interval (every 4.5s)
  useEffect(() => {
    if (!isAutoPlay || isHovered || isDragging) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, isDragging, currentIndex, total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        if (ar) handlePrev();
        else handleNext();
      } else if (e.key === "ArrowLeft") {
        if (ar) handleNext();
        else handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ar, total, currentIndex, isAnimating]);

  // Auto scroll active chip in selector ribbon
  useEffect(() => {
    if (ribbonRef.current) {
      const activeBtn = ribbonRef.current.querySelector(
        `[data-index="${currentIndex}"]`
      ) as HTMLElement | null;
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentIndex]);

  // Phone Pointer Drag / Touch Swipe Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(true);
    startPointerXRef.current = e.clientX;
    setDragX(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || startPointerXRef.current === null) return;
    const delta = e.clientX - startPointerXRef.current;
    // Damped drag resistance
    const dampedDelta = Math.sign(delta) * Math.min(Math.abs(delta), 130);
    setDragX(dampedDelta);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 45;

    if (Math.abs(dragX) > threshold) {
      if (dragX < -threshold) {
        // Dragged left
        if (ar) handlePrev();
        else handleNext();
      } else if (dragX > threshold) {
        // Dragged right
        if (ar) handleNext();
        else handlePrev();
      }
    }
    setDragX(0);
    startPointerXRef.current = null;
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragX(0);
    startPointerXRef.current = null;
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background min-h-screen selection:bg-amber-500/20 selection:text-amber-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-extrabold text-primary shadow-xs backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {ar
                ? "منظومة ونيسي الكاملة • كل ما يحتاجه أليفك"
                : "The Waneesi Ecosystem • Engineered for Pet Life"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {ar ? "عالم أليفك.. مصمم بعناية واحترافية" : t.features.title}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {ar
              ? "استكشف كل المميزات والخدمات الذكية والطبية والفندقية المصممة في مكان واحد لتوفير راحة بال وسعادة حقيقية لأليفك."
              : t.features.subtitle}
          </p>
        </div>

        {/* 17-Features Showcase Widget */}
        <section
          aria-label={ar ? "معرض مميزات تطبيق ونيسي" : "Waneesi Features Showcase"}
          className="relative max-w-6xl mx-auto w-full space-y-5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Quick Selector Ribbon (1 to 17) */}
          <div className="relative">
            <div
              ref={ribbonRef}
              className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1 text-start"
            >
              {features.map((feat, idx) => {
                const isActive = idx === currentIndex;
                const meta = metaMap[feat.id] ?? defaultMeta;
                const Icon = meta.icon;
                return (
                  <button
                    key={feat.id}
                    data-index={idx}
                    onClick={() => handleSelect(idx)}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                        : "bg-card/80 text-foreground/75 hover:text-foreground hover:bg-muted/80 border-border/80"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      #{String(idx + 1).padStart(2, "0")} {feat.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Expansive Showcase Card */}
          <div className="relative rounded-3xl bg-card border border-border/90 shadow-2xl overflow-hidden transition-all duration-300">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-32 -end-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: activeMeta.accentHex }}
            />
            <div
              className="absolute -bottom-32 -start-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: activeMeta.accentHex }}
            />

            {/* Top Toolbar: Progress, Auto-play toggle & Arrow Navigation */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3.5 border-b border-border/70 bg-muted/20 backdrop-blur-sm">
              {/* Feature Counter & Category */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-black text-primary">
                  <span>{ar ? "الميزة" : "Feature"}</span>
                  <span className="font-mono font-bold">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </span>

                <span className="hidden sm:inline-block text-xs font-semibold text-muted-foreground border-s border-border ps-3">
                  {ar ? activeMeta.categoryAr : activeMeta.categoryEn}
                </span>
              </div>

              {/* Center/End: Auto-play toggle & Navigation Arrows */}
              <div className="flex items-center gap-2">
                {/* Auto-Play Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsAutoPlay((prev) => !prev)}
                  title={
                    isAutoPlay
                      ? ar
                        ? "إيقاف العرض التلقائي مؤقتًا"
                        : "Pause Auto-play"
                      : ar
                        ? "تشغيل العرض التلقائي"
                        : "Start Auto-play"
                  }
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                    isAutoPlay
                      ? "bg-primary/10 text-primary border-primary/30"
                      : "bg-card text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  {isAutoPlay ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">
                        {ar ? "تلقائي شغال" : "Auto-Play ON"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">
                        {ar ? "تشغيل تلقائي" : "Play Auto"}
                      </span>
                    </>
                  )}
                </button>

                {/* Previous Feature Button */}
                <button
                  type="button"
                  onClick={ar ? handleNext : handlePrev}
                  aria-label={ar ? "الميزة السابقة" : "Previous Feature"}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-card hover:bg-muted border border-border flex items-center justify-center text-foreground hover:text-primary transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 rtl:hidden" />
                  <ChevronRight className="w-5 h-5 ltr:hidden" />
                </button>

                {/* Next Feature Button */}
                <button
                  type="button"
                  onClick={ar ? handlePrev : handleNext}
                  aria-label={ar ? "الميزة التالية" : "Next Feature"}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-card hover:bg-muted border border-border flex items-center justify-center text-foreground hover:text-primary transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 rtl:hidden" />
                  <ChevronLeft className="w-5 h-5 ltr:hidden" />
                </button>
              </div>
            </div>

            {/* Linear Progress Bar */}
            <div className="w-full bg-muted/40 h-1 overflow-hidden relative">
              <div
                className="h-full bg-primary transition-all duration-400 ease-out"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>

            {/* Custom Animations: Text from Right/Left based on language, Mockup dropping from Top, all contained inside the card */}
            <style>{`
              @keyframes waneesiTextSlideRtl {
                0% {
                  opacity: 0;
                  transform: translateX(45px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              @keyframes waneesiTextSlideLtr {
                0% {
                  opacity: 0;
                  transform: translateX(-45px);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
                }
              }
              @keyframes waneesiMockupDropTop {
                0% {
                  opacity: 0;
                  transform: translateY(-50px) scale(0.97);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              .animate-feature-text-rtl {
                animation: waneesiTextSlideRtl 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
              .animate-feature-text-ltr {
                animation: waneesiTextSlideLtr 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
              .animate-feature-mockup-drop {
                animation: waneesiMockupDropTop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>

            {/* Card Content: 2-Column Responsive Split Contained inside Card */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-12 items-center overflow-hidden">
              {/* Column 1: Feature Detailed Content (7 cols on desktop) - Slides in from Right (AR) or Left (EN) */}
              <div
                key={`feature-text-${currentIndex}`}
                className={`lg:col-span-7 space-y-6 text-start overflow-hidden will-change-transform ${
                  ar ? "animate-feature-text-rtl" : "animate-feature-text-ltr"
                }`}
              >
                {/* Icon Squircle & Tag */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-md bg-gradient-to-br transition-colors duration-300 ${activeMeta.accentColor}`}
                  >
                    <ActiveIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-muted-foreground block">
                      #{String(currentIndex + 1).padStart(2, "0")} • {activeFeature.tag}
                    </span>
                    <span className="text-xs font-semibold text-primary">
                      {ar ? activeMeta.categoryAr : activeMeta.categoryEn}
                    </span>
                  </div>
                </div>

                {/* Title & Quote */}
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-snug">
                    {activeFeature.title}
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-primary italic">
                    "{activeFeature.quote}"
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Highlight Chips / Multilingual Flags */}
                {activeFeature.id === "multilingual" ? (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-foreground block">
                      {ar ? "اللغات المدعومة رسمياً داخل المنظومة:" : "Officially Supported Languages:"}
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-muted/80 border border-border shadow-xs">
                        <img
                          src="/flags/flag-egypt.jpg"
                          alt="Egypt"
                          className="w-5 h-3.5 rounded-xs object-cover border border-black/10 shadow-xs"
                        />
                        <span className="text-xs font-bold text-foreground">العربية (مصر)</span>
                        <Check className="w-3.5 h-3.5 text-primary ms-1" />
                      </div>
                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-muted/80 border border-border shadow-xs">
                        <img
                          src="/flags/flag-britain.jpg"
                          alt="Britain"
                          className="w-5 h-3.5 rounded-xs object-cover border border-black/10 shadow-xs"
                        />
                        <span className="text-xs font-bold text-foreground">English (UK)</span>
                        <Check className="w-3.5 h-3.5 text-primary ms-1" />
                      </div>
                      <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-muted/80 border border-border shadow-xs">
                        <img
                          src="/flags/flag-france.jpg"
                          alt="France"
                          className="w-5 h-3.5 rounded-xs object-cover border border-black/10 shadow-xs"
                        />
                        <span className="text-xs font-bold text-foreground">Français (France)</span>
                        <Check className="w-3.5 h-3.5 text-primary ms-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {(ar ? activeMeta.chipsAr : activeMeta.chipsEn).map((chip, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-muted text-xs font-bold text-foreground/90 border border-border/70"
                      >
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                        <span>{chip}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Controls & App Status */}
                <div className="pt-6 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{ar ? "مدمجة بالكامل في تطبيق ونيسي" : "Integrated in Waneesi App"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={ar ? handleNext : handlePrev}
                      className="px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 text-xs font-bold text-foreground transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <ChevronRight className="w-3.5 h-3.5 rtl:hidden" />
                      <ChevronRight className="w-3.5 h-3.5 ltr:hidden" />
                      <span>{ar ? "السابق" : "Prev"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={ar ? handlePrev : handleNext}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
                    >
                      <span>{ar ? "الميزة التالية" : "Next"}</span>
                      <ChevronLeft className="w-3.5 h-3.5 rtl:hidden" />
                      <ChevronLeft className="w-3.5 h-3.5 ltr:hidden" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 2: Mobile Phone Mockup Frame (5 cols on desktop) - Drops in from Top */}
              <div className="lg:col-span-5 flex flex-col justify-center items-center overflow-hidden">
                {/* Drag / Swipe Helper Indicator */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/80 border border-border text-[11px] font-bold text-muted-foreground mb-3 select-none">
                  <MoveHorizontal className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span>
                    {ar ? "اسحب الهاتف يمينًا أو يسارًا للتنقل" : "Swipe phone left or right to switch"}
                  </span>
                </div>

                {/* Drop animation wrapper on feature change */}
                <div
                  key={`mockup-drop-${currentIndex}`}
                  className="animate-feature-mockup-drop w-full flex justify-center overflow-hidden will-change-transform"
                >
                  {/* Phone Container with Native Pointer Drag */}
                  <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                    style={{
                      transform: `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`,
                      transition: isDragging
                        ? "none"
                        : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                      cursor: isDragging ? "grabbing" : "grab",
                      touchAction: "pan-y",
                    }}
                    className="w-full max-w-[310px] sm:max-w-[330px] rounded-[44px] bg-neutral-950 p-2.5 sm:p-3 border-[6px] sm:border-[8px] border-neutral-800 shadow-2xl relative select-none will-change-transform"
                  >
                    {/* Outer Frame Buttons */}
                    <div className="absolute -left-[10px] top-24 w-1 h-8 bg-neutral-700 rounded-s-md" />
                    <div className="absolute -left-[10px] top-36 w-1 h-8 bg-neutral-700 rounded-s-md" />
                    <div className="absolute -right-[10px] top-28 w-1 h-12 bg-neutral-700 rounded-e-md" />

                    {/* Inner Phone Screen Content */}
                    <div className="w-full h-[520px] rounded-[34px] bg-neutral-900 overflow-hidden relative flex flex-col justify-between text-neutral-100 shadow-inner">
                      {/* Status Bar */}
                      <div className="pt-2 px-6 flex items-center justify-between text-[10px] font-bold text-neutral-400 relative z-20">
                        <span>9:41</span>
                        {/* Dynamic Island */}
                        <div className="w-20 h-4 bg-black rounded-full mx-auto" />
                        <div className="flex items-center gap-1">
                          <span className="text-[9px]">5G</span>
                          <div className="w-4 h-2 border border-neutral-400 rounded-2xs p-0.5">
                            <div className="w-full h-full bg-neutral-300 rounded-3xs" />
                          </div>
                        </div>
                      </div>

                      {/* Feature-Specific Mobile Screen Mockup Content */}
                      <div className="flex-1 overflow-hidden px-3 py-2 flex flex-col relative z-10 text-start">
                        <FeatureScreenPreview featureId={activeFeature.id} ar={ar} />
                      </div>

                      {/* Bottom Home Indicator */}
                      <div className="pb-2 pt-1 flex justify-center relative z-20">
                        <div className="w-28 h-1 bg-neutral-500/50 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clean, Non-Crowded Mobile-Friendly Bottom CTA */}
        <div className="rounded-3xl bg-[#0b1a23] text-white p-8 sm:p-12 text-center space-y-6 max-w-4xl mx-auto shadow-xl border border-white/10 relative overflow-hidden">
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-center justify-center gap-3">
            <div className="p-2 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                className="h-8 w-auto object-contain"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {ar
                ? "كل هذه المميزات بانتظارك في تطبيق ونيسي"
                : "Experience All These Features in One App"}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
              {ar
                ? "وفر لأليفك الرعاية الصحية، والمحادثات المباشرة، وحجز الفنادق، وخلاصة اجتماعية خالية من أي إعلانات مزعجة."
                : "Give your pet verified healthcare, direct messaging, boarding reservations, and a dedicated social community."}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <span>{ar ? "الانضمام لقائمة الإطلاق المبكر" : "Join Early-Access VIP List"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 backdrop-blur text-xs font-semibold text-white/90">
                <img
                  src="/icons/apple-logo.png"
                  alt="Apple"
                  className="w-3.5 h-3.5 object-contain brightness-0 invert"
                />
                <span>iOS</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 backdrop-blur text-xs font-semibold text-white/90">
                <img
                  src="/icons/google.png"
                  alt="Android"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span>Android</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponent: Dedicated High-Fidelity Mobile Screen Previews for all 17 features
function FeatureScreenPreview({ featureId, ar }: { featureId: string; ar: boolean }) {
  switch (featureId) {
    case "social-feed":
      return (
        <div className="space-y-3 h-full flex flex-col justify-between py-1">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-xs font-black text-white">Waneesi Feed</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
              {ar ? "يوميات جديدة" : "New Post"}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-xs font-bold text-amber-300">
                🐱
              </div>
              <div>
                <p className="text-xs font-bold text-white">سارة & مشمش</p>
                <p className="text-[9px] text-neutral-400">قبل ساعتين • القاهرة</p>
              </div>
            </div>
            <p className="text-[11px] text-neutral-200 leading-snug">
              أول زيارة لمشمش في حديقة الأليف بعد إتمام التطعيم السنوي! 🐾❤️
            </p>
            <div className="h-32 rounded-xl bg-neutral-900 border border-neutral-700/50 overflow-hidden relative flex items-center justify-center">
              <img
                src="/brand/Add_New_pet.png"
                alt="Pet Moment"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-2 end-2 px-2 py-0.5 rounded-md bg-black/60 text-[9px] text-white">
                Golden Cat • 1y
              </div>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[10px] pt-1 border-t border-neutral-700/50">
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <Heart className="w-3.5 h-3.5 fill-rose-400" /> 248
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> 34
              </span>
              <span className="flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> مشاركة
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-neutral-800/50 border border-neutral-700/40 flex items-center gap-2 text-[10px] text-neutral-400">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              +
            </div>
            <span>{ar ? "شارك لحظة جديدة لأليفك..." : "Share a moment..."}</span>
          </div>
        </div>
      );

    case "reels":
      return (
        <div className="relative h-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 flex flex-col justify-between p-3">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
          <img
            src="/brand/groupscreen_cover.png"
            alt="Pet Reel"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 flex items-center justify-between text-xs font-bold text-white">
            <span className="px-2 py-0.5 rounded-full bg-black/50 border border-white/20 text-[10px]">
              Reels
            </span>
            <Volume2 className="w-4 h-4 text-white" />
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div className="space-y-1.5 max-w-[70%]">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">
                  🐕
                </div>
                <span className="text-xs font-bold text-white">@rocky_adventures</span>
              </div>
              <p className="text-[11px] text-neutral-200 line-clamp-2">
                سرعة روكي لما يسمع صوت فتح علبة التريتس 😂⚡
              </p>
              <div className="flex items-center gap-1 text-[9px] text-amber-300">
                <Play className="w-2.5 h-2.5" />
                <span>Waneesi Original Sound • Pet Beats</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 text-white text-[10px]">
              <div className="flex flex-col items-center">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>14.8K</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageSquare className="w-5 h-5 text-neutral-200" />
                <span>420</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 className="w-5 h-5 text-neutral-200" />
                <span>مشاركة</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "stories":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-3">
          {/* Stories Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-neutral-800">
            {["روكي", "لونا", "مشمش", "سيمبا"].map((name, i) => (
              <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-rose-500">
                  <div className="w-full h-full rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs">
                    🐾
                  </div>
                </div>
                <span className="text-[9px] text-neutral-300 font-medium">{name}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 rounded-2xl bg-neutral-800/60 border border-neutral-700/60 p-3 flex flex-col justify-between relative overflow-hidden">
            <div className="w-full flex gap-1 mb-2">
              <div className="h-0.5 flex-1 bg-amber-400 rounded-full" />
              <div className="h-0.5 flex-1 bg-neutral-600 rounded-full" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-white">روكي الذهبي</span>
              <span className="text-[9px] text-neutral-400">منذ 3 ساعات</span>
            </div>
            <div className="my-auto text-center py-6">
              <p className="text-lg">🐶✨</p>
              <p className="text-xs font-bold text-amber-300 mt-1">يوم ممتع في العيادة وفحص شامل ممتاز!</p>
            </div>
            <div className="p-2 rounded-xl bg-neutral-900/90 border border-neutral-700/50 flex items-center justify-between text-[10px] text-neutral-400">
              <span>أرسل ردًا سريعًا...</span>
              <Send className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>
        </div>
      );

    case "vet-discovery":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2 text-neutral-400 text-[10px]">
            <Search className="w-3.5 h-3.5" />
            <span>{ar ? "البحث عن عيادة أو دكتور بيطري..." : "Search vet clinics..."}</span>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">مستشفى كايرو فيت التخصصي</h4>
                  <p className="text-[9px] text-neutral-400">مصر الجديدة، القاهرة • مفتوح 24/7</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                ★ 4.9
              </span>
            </div>

            <div className="flex flex-wrap gap-1 text-[9px]">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300">جراحة وطوارئ</span>
              <span className="px-2 py-0.5 rounded-md bg-neutral-700 text-neutral-300">أشعة وسونار</span>
              <span className="px-2 py-0.5 rounded-md bg-neutral-700 text-neutral-300">تطعيمات</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-neutral-950 font-bold text-[10px] text-center">
                حجز موعد كشف
              </button>
              <button className="py-2 rounded-xl bg-neutral-700 text-white font-medium text-[10px] text-center flex items-center justify-center gap-1">
                <Phone className="w-3 h-3" /> اتصال فوري
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>أكثر من 350 طبيب وعيادة بيطرية معتمدة بمصر</span>
          </div>
        </div>
      );

    case "marketplace":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-xs font-bold text-white">سوق ونيسي للمستلزمات</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold">
              توصيل سريع
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="p-2.5 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 flex flex-col justify-between">
              <div className="w-full h-16 rounded-xl bg-neutral-900 border border-neutral-700/40 flex items-center justify-center text-xl">
                🥫
              </div>
              <div>
                <p className="text-[10px] font-bold text-white line-clamp-1">طعام جاف عالي البروتين</p>
                <p className="text-[9px] text-neutral-400">سالمون وخضار • 3 كجم</p>
                <p className="text-xs font-bold text-amber-400 mt-1">380 ج.م</p>
              </div>
              <button className="w-full py-1 rounded-lg bg-indigo-500 text-white text-[9px] font-bold mt-1">
                إضافة للسلة
              </button>
            </div>

            <div className="p-2.5 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 flex flex-col justify-between">
              <div className="w-full h-16 rounded-xl bg-neutral-900 border border-neutral-700/40 flex items-center justify-center text-xl">
                🎾
              </div>
              <div>
                <p className="text-[10px] font-bold text-white line-clamp-1">كرة تفاعلية ذكية للكلاب</p>
                <p className="text-[9px] text-neutral-400">مقاومة للعض وصوتية</p>
                <p className="text-xs font-bold text-amber-400 mt-1">140 ج.م</p>
              </div>
              <button className="w-full py-1 rounded-lg bg-indigo-500 text-white text-[9px] font-bold mt-1">
                إضافة للسلة
              </button>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-neutral-800/60 border border-neutral-700/40 flex items-center justify-between text-[10px] text-neutral-300">
            <span>سلة المشتريات (2 منتج)</span>
            <span className="font-bold text-amber-400">520 ج.م</span>
          </div>
        </div>
      );

    case "grooming":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">باقة السبا والعناية الملكية</h4>
                <p className="text-[9px] text-purple-300 font-medium">صالون معتمد أو زيارة منزلية</p>
              </div>
            </div>

            <ul className="text-[10px] text-neutral-300 space-y-1 pt-1 border-t border-neutral-700/50">
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-purple-400" /> حمام طبي عطري وشامبو خاص بالمعطف
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-purple-400" /> قص أظافر وتنظيف أذن احترافي
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-purple-400" /> تسريح وتخفيف تساقط الشعر وتصفيف
              </li>
            </ul>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">تبدأ من 250 ج.م</span>
              <button className="px-3 py-1.5 rounded-xl bg-purple-500 text-white font-bold text-[10px]">
                اختيار الموعد المناسب
              </button>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>متاح حجز فوري خلال 24 ساعة بمحافظتك</span>
          </div>
        </div>
      );

    case "lost-found":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>طوارئ SOS: أليف مفقود عاجل</span>
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-red-500 text-white">نطاق 5 كم</span>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-red-500/30 space-y-2">
            <div className="h-28 rounded-xl bg-neutral-900 overflow-hidden relative border border-neutral-700 flex items-center justify-center">
              <img
                src="/brand/Alert_the_Veterinarian.png"
                alt="Lost Pet"
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">الاسم: ماكس (Max) • هاسكي سيبيري</h4>
              <p className="text-[9px] text-neutral-300">المكان: التجمع الخامس، بالقرب من شارع التسعين</p>
              <p className="text-[9px] text-amber-300 font-bold mt-0.5">علامة فارقة: طوق أزرق، عين عسلية وعين زرقاء</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-[10px] text-center flex items-center justify-center gap-1">
                <Phone className="w-3 h-3" /> اتصال فوري بالمالك
              </button>
              <button className="py-2 rounded-xl bg-neutral-700 text-white font-bold text-[10px] text-center">
                تقديم معلومات
              </button>
            </div>
          </div>

          <p className="text-[9px] text-neutral-400 text-center">
            يصل البلاغ لجميع مستخدمي ونيسي في محيط 5-10 كم فورياً
          </p>
        </div>
      );

    case "adoption":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="text-xs font-bold text-white">تبني مجاني وإنساني</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 font-bold">
              بدون مقابل
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2">
            <div className="h-28 rounded-xl bg-neutral-900 overflow-hidden relative border border-neutral-700 flex items-center justify-center">
              <img
                src="/brand/Favorites_adoption.png"
                alt="Adoption Pet"
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">سيمبا • جرو بلدي هجين (4 أشهر)</h4>
              <p className="text-[9px] text-neutral-400">تم إنقاذه وتلقى كافة التطعيمات الأساسية</p>
              <div className="flex gap-1.5 mt-1 text-[9px]">
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">مفحوص طبياً ✓</span>
                <span className="px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-300">أليف وودود</span>
              </div>
            </div>
            <button className="w-full py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-[10px] text-center">
              تقديم طلب تبني وتواصل مع الملجأ
            </button>
          </div>

          <div className="text-[9px] text-neutral-400 text-center">
            تخضع جميع طلبات التبني لتقييم الأمان لضمان رعاية دائمة
          </div>
        </div>
      );

    case "nearby-places":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="h-32 rounded-2xl bg-neutral-950 border border-neutral-700 overflow-hidden relative flex items-center justify-center">
            <img
              src="/brand/location.png"
              alt="Map Preview"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            <div className="absolute bottom-2 start-2 px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-neutral-700 text-[10px] font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>محيط القاهرة والجيزة</span>
            </div>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  🌳
                </span>
                <div>
                  <p className="font-bold text-white">حديقة الأليف بالمعادي</p>
                  <p className="text-[8px] text-neutral-400">مساحة خضراء مجهزة</p>
                </div>
              </div>
              <span className="font-bold text-sky-400">650 م</span>
            </div>

            <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  💊
                </span>
                <div>
                  <p className="font-bold text-white">صيدلية فيت كير 24 ساعة</p>
                  <p className="text-[8px] text-neutral-400">أدوية بيطرية وتطعيمات</p>
                </div>
              </div>
              <span className="font-bold text-sky-400">1.2 كم</span>
            </div>
          </div>
        </div>
      );

    case "groups":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="h-28 rounded-2xl bg-neutral-900 border border-neutral-700 overflow-hidden relative">
            <img
              src="/brand/groupscreen_cover.png"
              alt="Group Cover"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute bottom-2 start-2 end-2 flex items-center justify-between text-white">
              <div>
                <h4 className="text-xs font-bold">رابطة محبي القطط بمصر 🐾</h4>
                <p className="text-[9px] text-neutral-300">18,400 عضو • 45 منشور اليوم</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs">
                👤
              </div>
              <div>
                <p className="text-[10px] font-bold text-white">م/ عمر خالد</p>
                <p className="text-[8px] text-neutral-400">منشور مثبت بالمجموعة</p>
              </div>
            </div>
            <p className="text-[10px] text-neutral-300 leading-snug">
              تجمع مربي القطط والكلاب الجمعة القادمة بحديقة الأزهر للتوعية بالتطعيمات واللعب المشترك.
            </p>
          </div>

          <button className="w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-[10px] text-center">
            الانضمام للمجموعة والمشاركة
          </button>
        </div>
      );

    case "notifications":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
            <span className="text-xs font-bold text-white">مركز الإشعارات</span>
            <span className="text-[9px] text-amber-400 font-bold">3 جديدة</span>
          </div>

          <div className="space-y-2 flex-1">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  💉 تذكير تطعيم مهم
                </span>
                <span className="text-[8px] text-neutral-400">منذ ساعة</span>
              </div>
              <p className="text-[9px] text-neutral-200">
                موعد جرعة السعار التنشيطية لأليفك 'روكي' غداً الساعة 5:00 م.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-white flex items-center gap-1">
                  🏨 تأكيد حجز الفندق
                </span>
                <span className="text-[8px] text-neutral-400">أمس</span>
              </div>
              <p className="text-[9px] text-neutral-300">
                تم تأكيد إقامة 'لونا' في جناح بيتس بارادايس لمدة 3 ليالٍ.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700/60 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  🩺 استشارة الطبيب
                </span>
                <span className="text-[8px] text-neutral-400">منذ يومين</span>
              </div>
              <p className="text-[9px] text-neutral-300">
                تم إرفاق الروشتة الطبية وتحديث الوزن في سجلك الصحي.
              </p>
            </div>
          </div>
        </div>
      );

    case "global-community":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500/20 to-neutral-900 border border-teal-500/30 text-center space-y-1">
            <Globe2 className="w-8 h-8 text-teal-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">عالم واحد يجمعه حب الأليف</h4>
            <p className="text-[9px] text-teal-200">شبكة تجمع مربي الحيوانات من مصر والعالم</p>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2 text-[10px]">
              <span className="text-sm">🇪🇬</span>
              <div className="flex-1">
                <p className="font-bold text-white">القاهرة، مصر</p>
                <p className="text-[8px] text-neutral-400">قصة إنقاذ وتأهيل قطة شوارع بنجاح</p>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2 text-[10px]">
              <span className="text-sm">🇬🇧</span>
              <div className="flex-1">
                <p className="font-bold text-white">London, UK</p>
                <p className="text-[8px] text-neutral-400">Winter coat care guide for retrievers</p>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center gap-2 text-[10px]">
              <span className="text-sm">🇫🇷</span>
              <div className="flex-1">
                <p className="font-bold text-white">Paris, France</p>
                <p className="text-[8px] text-neutral-400">Conseils d'alimentation équilibrée</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "pet-hotels":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="h-28 rounded-2xl bg-neutral-900 border border-neutral-700 overflow-hidden relative">
            <img
              src="/brand/splash_pet_hotel.png"
              alt="Pet Hotel"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-2 start-2 end-2 flex items-center justify-between text-white">
              <div>
                <h4 className="text-xs font-bold">فندق وسبا بيتس دريم 🏨</h4>
                <p className="text-[9px] text-amber-300">أجنحة مكيفة ومراقبة حية 24/7</p>
              </div>
              <span className="text-[10px] font-bold text-amber-400">★ 5.0</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2">
            <div className="grid grid-cols-2 gap-1.5 text-[9px] text-neutral-300">
              <span className="flex items-center gap-1">✓ كاميرات متابعة حية</span>
              <span className="flex items-center gap-1">✓ إشراف طبي بيطري</span>
              <span className="flex items-center gap-1">✓ تصوير ويوميات واتساب</span>
              <span className="flex items-center gap-1">✓ ساحات لعب عشبية</span>
            </div>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">350 ج.م / الليلة</span>
              <button className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-[10px]">
                طلب حجز إقامة
              </button>
            </div>
          </div>

          <div className="text-[9px] text-neutral-400 text-center">
            تواصل فوري مع إدارة الفندق والتأكد من الغرف المتاحة
          </div>
        </div>
      );

    case "ai-assistant":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">مساعد ونيسي الذكي</h4>
                <p className="text-[8px] text-emerald-400">متصل 24/7 لرعاية أليفك</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 flex-1 overflow-hidden text-[10px]">
            {/* User Message */}
            <div className="ms-auto max-w-[85%] p-2.5 rounded-2xl rounded-te-xs bg-amber-500/20 border border-amber-500/30 text-amber-200">
              أليفي امتنع عن الأكل من الصباح وحرارته تبدو مرتفعة، ماذا أفعل؟
            </div>

            {/* AI Response */}
            <div className="me-auto max-w-[90%] p-2.5 rounded-2xl rounded-ts-xs bg-neutral-800 border border-neutral-700 text-neutral-200 space-y-1">
              <p className="font-bold text-emerald-400 text-[10px]">سلامة أليفك! 🐾</p>
              <p className="text-[9px] leading-relaxed">
                ارتفاع الحرارة مع فقدان الشهية قد يدل على نزلة أو عدوى. وفّر له ماء نظيف ولا تقدم أي أدوية بشرية.
              </p>
              <div className="pt-1">
                <button className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[8px] font-bold border border-emerald-500/30">
                  عرض أقرب 3 عيادات بيطرية طوارئ الآن ←
                </button>
              </div>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-between text-[10px] text-neutral-400">
            <span>اكتب استفسارك الطبي أو السلوكي...</span>
            <Send className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>
      );

    case "pet-health":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">روكي (Rocky)</h4>
                  <p className="text-[9px] text-neutral-400">Golden Retriever • سنة و 4 أشهر</p>
                </div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-bold">
                سجل موثق ✓
              </span>
            </div>

            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700/60 text-[9px] space-y-1">
              <div className="flex justify-between text-neutral-300">
                <span>تطعيم السعار (Rabies):</span>
                <span className="text-emerald-400 font-bold">سارٍ حتى 11/2026</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>التطعيم الثماني (DHPP):</span>
                <span className="text-emerald-400 font-bold">مكتمل بالجرعة التنشيطية</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>الوزن الحالي:</span>
                <span className="text-amber-400 font-bold">28.5 كجم</span>
              </div>
            </div>

            <button className="w-full py-1.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-neutral-950 font-bold text-[10px] text-center">
              مشاركة السجل مع الطبيب البيطري
            </button>
          </div>

          <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[9px] text-teal-300 text-center">
            شهادات تطعيم رقمية معتمدة تغنيك عن الدفاتر الورقية
          </div>
        </div>
      );

    case "chats":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center text-xs font-bold">
                🩺
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">عيادة د. أسامة البيطرية</h4>
                <p className="text-[8px] text-emerald-400">متصل الآن • رد خلال دقائق</p>
              </div>
            </div>
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
          </div>

          <div className="space-y-2 flex-1 overflow-hidden text-[10px]">
            <div className="ms-auto max-w-[85%] p-2 rounded-2xl rounded-te-xs bg-amber-500/20 text-amber-200">
              مساء الخير دكتور، هل يمكن تأكيد حجز موعد تطعيم غداً الساعة 6 مساءً؟
            </div>

            <div className="me-auto max-w-[85%] p-2 rounded-2xl rounded-ts-xs bg-neutral-800 text-neutral-200 space-y-1">
              <p>أهلاً بك! تم تأكيد الموعد غداً الساعة 6:00 م بعيادة التجمع.</p>
              <p className="text-[8px] text-neutral-400">يرجى إحضار أليفك صائم ساعتين قبل الفحص.</p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-between text-[10px] text-neutral-400">
            <span>اكتب رسالتك للعيادة...</span>
            <Send className="w-3.5 h-3.5 text-violet-400" />
          </div>
        </div>
      );

    case "multilingual":
      return (
        <div className="h-full flex flex-col justify-between py-1 space-y-2.5">
          <div className="p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Languages className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">لغة التطبيق • Language</h4>
                <p className="text-[9px] text-neutral-400">توطين كامل للمصطلحات والخدمات</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <img
                    src="/flags/flag-egypt.jpg"
                    alt="Egypt"
                    className="w-5 h-3.5 rounded-xs object-cover"
                  />
                  <span className="font-bold text-white">العربية (جمهورية مصر العربية)</span>
                </div>
                <Check className="w-3.5 h-3.5 text-sky-400" />
              </div>

              <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700/60 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <img
                    src="/flags/flag-britain.jpg"
                    alt="Britain"
                    className="w-5 h-3.5 rounded-xs object-cover"
                  />
                  <span className="text-neutral-300">English (United Kingdom)</span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-700/60 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <img
                    src="/flags/flag-france.jpg"
                    alt="France"
                    className="w-5 h-3.5 rounded-xs object-cover"
                  />
                  <span className="text-neutral-300">Français (France)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-neutral-400 text-center">
            تبديل فوري لاتجاه الواجهة (RTL / LTR) مع ترجمة بيطرية دقيقة
          </div>
        </div>
      );

    default:
      return (
        <div className="h-full flex items-center justify-center text-center p-4">
          <p className="text-xs text-neutral-400">معاينة الشاشة متاحة داخل التطبيق</p>
        </div>
      );
  }
}
