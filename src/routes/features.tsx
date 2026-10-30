import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Sparkles,
  Search,
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Building2,
  Bot,
  ShieldCheck,
  MessagesSquare,
  Film,
  MessageCircleHeart,
  Clock,
  Stethoscope,
  ShoppingBag,
  Scissors,
  AlertTriangle,
  HeartHandshake,
  Compass,
  Users,
  BellRing,
  Globe2,
  Languages,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
});

type CategoryKey = "all" | "health" | "services" | "social" | "safety";

interface FeatureMeta {
  category: "social" | "health" | "services" | "safety";
  icon: LucideIcon;
  tone: string;
  spotlight?: boolean;
  chipsEn: string[];
  chipsAr: string[];
}

const metaMap: Record<string, FeatureMeta> = {
  "ai-assistant": {
    category: "health",
    icon: Bot,
    tone: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    spotlight: true,
    chipsEn: ["24/7 Smart Answers", "Symptom Check", "Diet & Nutrition"],
    chipsAr: ["إجابات ذكية 24/7", "فحص أعراض أولية", "نصائح تغذية وسلوك"],
  },
  "pet-hotels": {
    category: "services",
    icon: Building2,
    tone: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    spotlight: true,
    chipsEn: ["AC Suites", "Daily Photo/Video Updates", "WhatsApp Contact"],
    chipsAr: ["أجنحة مكيفة", "تحديثات يومية وتصوير", "تواصل مباشر واتساب"],
  },
  "pet-health": {
    category: "health",
    icon: ShieldCheck,
    tone: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    spotlight: true,
    chipsEn: ["Vaccine Passport", "Booster Alerts", "Digital Prescriptions"],
    chipsAr: ["شهادات تطعيم رقمية", "تنبيهات الجرعات", "ملف طبي متنقل"],
  },
  "social-feed": {
    category: "social",
    icon: MessageCircleHeart,
    tone: "text-primary bg-primary/10 border-primary/20",
    chipsEn: ["Pure Pet Feed", "Milestones & Photos", "Zero Noise"],
    chipsAr: ["يوميات الأليف", "صور وفيديوهات", "خلاصة نقية"],
  },
  reels: {
    category: "social",
    icon: Film,
    tone: "text-orange-500 bg-orange-500/10 border-orange-500/20",
    chipsEn: ["Vertical Short Video", "Pet Audio Clips", "High Energy"],
    chipsAr: ["فيديوهات رأسية قصيرة", "أصوات أليف حصرية", "لحظات طريفة"],
  },
  stories: {
    category: "social",
    icon: Clock,
    tone: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    chipsEn: ["24h Moments", "Daily Quirk", "Quick Sharing"],
    chipsAr: ["يوميات 24 ساعة", "توثيق سريع", "أقرب للمتابعين"],
  },
  groups: {
    category: "social",
    icon: Users,
    tone: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    chipsEn: ["Breed Circles", "Local Walks", "Special Interests"],
    chipsAr: ["نوادي السلالات", "جولات المشي بالحي", "مجتمعات اهتمام"],
  },
  "global-community": {
    category: "social",
    icon: Globe2,
    tone: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    chipsEn: ["Global Network", "Pet Culture", "Compassionate Care"],
    chipsAr: ["شبكة عالمية", "ثقافة حب الأليف", "رعاية بالرفق"],
  },
  "vet-discovery": {
    category: "health",
    icon: Stethoscope,
    tone: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    chipsEn: ["Licensed Doctors", "Clinical Specialties", "Appointment Requests"],
    chipsAr: ["أطباء مرخصون", "تخصصات دقيقة", "طلب مواعيد سهل"],
  },
  grooming: {
    category: "services",
    icon: Scissors,
    tone: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    chipsEn: ["Spa Baths", "Styling & De-shedding", "Salon & Mobile"],
    chipsAr: ["حمامات سبا فندقية", "قص وتخفيف تساقط", "خدمة صالون أو منزلية"],
  },
  marketplace: {
    category: "services",
    icon: ShoppingBag,
    tone: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    chipsEn: ["Premium Nutrition", "Toys & Accessories", "Trusted Shops"],
    chipsAr: ["أغذية فائقة الجودة", "ألعاب ومستلزمات", "متاجر محلية موثوقة"],
  },
  "nearby-places": {
    category: "services",
    icon: Compass,
    tone: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    chipsEn: ["Pet Parks", "Vet Pharmacies", "Live Distance & Map"],
    chipsAr: ["حدائق صديقة للأليف", "صيدليات بيطرية", "خريطة ومسافات حية"],
  },
  "lost-found": {
    category: "safety",
    icon: AlertTriangle,
    tone: "text-red-500 bg-red-500/10 border-red-500/20",
    chipsEn: ["Radius SOS Alerts", "Identifying Photos", "Emergency Broadcast"],
    chipsAr: ["طوارئ SOS جغرافية", "صور وعلامات الأليف", "تنبيه فوري للمحيط"],
  },
  adoption: {
    category: "safety",
    icon: HeartHandshake,
    tone: "text-pink-500 bg-pink-500/10 border-pink-500/20",
    chipsEn: ["Ethical Rehoming", "Rescue Network", "Non-Commercial"],
    chipsAr: ["تبني إنساني مجاني", "شبكة إنقاذ وتأهيل", "أسر محبة وموثقة"],
  },
  chats: {
    category: "safety",
    icon: MessagesSquare,
    tone: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    chipsEn: ["1-on-1 Direct Chat", "Clinic Inquiries", "Hotel Coordination"],
    chipsAr: ["مراسلة مباشرة 1-on-1", "استفسار من العيادات", "تنسيق حجز الفنادق"],
  },
  notifications: {
    category: "safety",
    icon: BellRing,
    tone: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    chipsEn: ["Vaccine Reminders", "Missing Pet Radar", "Booking Updates"],
    chipsAr: ["تذكيرات المواعيد", "رادار الأليف المفقود", "إشعارات المجتمع"],
  },
  multilingual: {
    category: "social",
    icon: Languages,
    tone: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    chipsEn: ["Arabic • English • French", "Instant Switch", "Medical Terms Localized"],
    chipsAr: ["عربي • إنجليزي • فرنسي", "تبديل فوري", "توطين طبي دقيق"],
  },
};

const defaultMeta: FeatureMeta = {
  category: "social",
  icon: Sparkles,
  tone: "text-primary bg-primary/10 border-primary/20",
  chipsEn: ["Fully Integrated", "Mobile First", "Care Focused"],
  chipsAr: ["مدمج بالكامل", "مصمم للهاتف", "رعاية متكاملة"],
};

export function FeaturesPage() {
  const { lang, t } = usePrefs();
  const ar = lang === "ar";
  const ArrowIcon = ar ? ArrowLeft : ArrowRight;

  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all" as const, label: ar ? "جميع المميزات" : "All Features" },
    { id: "health" as const, label: ar ? "الرعاية والطب" : "Health & Medical" },
    { id: "services" as const, label: ar ? "الفنادق والخدمات" : "Boarding & Services" },
    { id: "social" as const, label: ar ? "المجتمع والمحتوى" : "Social & Media" },
    { id: "safety" as const, label: ar ? "الأمان والطوارئ" : "Safety & SOS" },
  ];

  // Filter features based on activeCategory and searchQuery
  const filteredFeatures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return t.features.items.filter((feat) => {
      const meta = metaMap[feat.id] ?? defaultMeta;
      const matchesCategory =
        activeCategory === "all" || meta.category === activeCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      const titleMatch = feat.title.toLowerCase().includes(q);
      const descMatch = feat.description.toLowerCase().includes(q);
      const tagMatch = feat.tag.toLowerCase().includes(q);
      const chipsMatch = (ar ? meta.chipsAr : meta.chipsEn).some((c) =>
        c.toLowerCase().includes(q)
      );
      return titleMatch || descMatch || tagMatch || chipsMatch;
    });
  }, [t.features.items, activeCategory, searchQuery, ar]);

  const spotlightFeatures = useMemo(() => {
    return t.features.items.filter((feat) => metaMap[feat.id]?.spotlight);
  }, [t.features.items]);

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header: Clean, high-contrast, uncluttered */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-extrabold text-primary shadow-2xs">
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

        {/* Flagship Spotlight Cards (Shown in 'all' view with no active search query) */}
        {activeCategory === "all" && !searchQuery.trim() && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                {ar ? "أبرز مميزات منظومة ونيسي" : "Flagship Highlights"}
              </span>
              <span className="text-xs font-bold text-primary">
                {ar ? "3 خدمات رائدة" : "3 Premier Capabilities"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {spotlightFeatures.map((feat) => {
                const meta = metaMap[feat.id] ?? defaultMeta;
                const Icon = meta.icon;
                return (
                  <div
                    key={feat.id}
                    className="relative rounded-3xl border border-primary/25 bg-gradient-to-b from-primary/5 via-card to-card p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4 text-start">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${meta.tone} shadow-2xs`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-black">
                          <Sparkles className="w-3 h-3" />
                          <span>{ar ? "ميزة رائدة" : "Flagship"}</span>
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h2 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                          {feat.title}
                        </h2>
                        <p className="text-xs font-bold text-primary italic">
                          "{feat.quote}"
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {feat.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-border/60 mt-4 flex flex-wrap gap-1.5">
                      {(ar ? meta.chipsAr : meta.chipsEn).map((chip, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-muted text-[10px] font-semibold text-muted-foreground"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Controls: Category Pills & Mobile-Friendly Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Horizontal Scroll Category Pills (Fully optimized for touch and mobile) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-start">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`shrink-0 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-xs scale-[1.02]"
                        : "bg-card text-foreground/80 hover:text-foreground hover:bg-muted border-border"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Search Input */}
            <div className="relative min-w-[220px] sm:w-64">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ar ? "ابحث في المميزات..." : "Search features..."}
                className="w-full ps-10 pe-9 py-2 rounded-xl bg-card border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>
              {ar
                ? `عرض ${filteredFeatures.length} ميزة مدمجة في التطبيق`
                : `Showing ${filteredFeatures.length} features available in Waneesi`}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-primary hover:underline font-bold"
              >
                {ar ? "إعادة الضبط" : "Reset search"}
              </button>
            )}
          </div>
        </div>

        {/* Feature Grid: Clean, high-density, mobile-first cards */}
        {filteredFeatures.length === 0 ? (
          <div className="rounded-3xl border border-dashed p-12 text-center space-y-3 bg-muted/20">
            <p className="font-black text-lg text-foreground">
              {ar ? "لم نجد أي ميزة مطابقة لبحثك" : "No matching features found"}
            </p>
            <p className="text-xs text-muted-foreground">
              {ar
                ? "جرب البحث بكلمة مختلفة مثل: فنادق، تطعيمات، عيادات، ذكاء اصطناعي، ريلز."
                : "Try searching with different terms like: hotels, vaccines, vets, ai, reels."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold"
            >
              {ar ? "عرض جميع المميزات" : "Show All Features"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredFeatures.map((feat, index) => {
              const meta = metaMap[feat.id] ?? defaultMeta;
              const Icon = meta.icon;
              const isAlert = feat.isAlert;

              return (
                <div
                  key={feat.id}
                  id={feat.id}
                  className={`rounded-3xl border transition-all duration-200 p-6 flex flex-col justify-between text-start group scroll-mt-28 ${
                    isAlert
                      ? "bg-destructive/5 border-destructive/25 hover:border-destructive/40 shadow-2xs"
                      : "bg-card border-border/80 hover:border-primary/40 hover:shadow-md shadow-2xs"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon squircle + tag & index */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-2xs ${
                          isAlert
                            ? "bg-destructive/15 text-destructive border-destructive/30"
                            : meta.tone
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-muted text-muted-foreground uppercase">
                          #{String(index + 1).padStart(2, "0")} • {feat.tag}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h2 className="text-lg sm:text-xl font-black text-foreground group-hover:text-primary transition-colors">
                        {feat.title}
                      </h2>
                      <p
                        className={`text-xs font-bold ${
                          isAlert ? "text-destructive" : "text-primary/90"
                        }`}
                      >
                        "{feat.quote}"
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>

                  {/* Chips & Footer Verification */}
                  <div className="pt-5 mt-4 border-t border-border/60 space-y-3">
                    {feat.id === "multilingual" ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/80 border border-border text-[11px] font-bold text-foreground shadow-2xs">
                          <img
                            src="/flags/flag-egypt.jpg"
                            alt="العربية"
                            className="w-4 h-3 rounded-2xs object-cover border border-black/10 shadow-2xs"
                          />
                          <span>العربية</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/80 border border-border text-[11px] font-bold text-foreground shadow-2xs">
                          <img
                            src="/flags/flag-britain.jpg"
                            alt="English"
                            className="w-4 h-3 rounded-2xs object-cover border border-black/10 shadow-2xs"
                          />
                          <span>English</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-muted/80 border border-border text-[11px] font-bold text-foreground shadow-2xs">
                          <img
                            src="/flags/flag-france.jpg"
                            alt="Français"
                            className="w-4 h-3 rounded-2xs object-cover border border-black/10 shadow-2xs"
                          />
                          <span>Français</span>
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {(ar ? meta.chipsAr : meta.chipsEn).map((chip, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg bg-muted/60 text-[10px] font-semibold text-muted-foreground"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground pt-1">
                      <span className="flex items-center gap-1.5 text-primary">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>
                          {ar ? "مدمجة بتطبيق ونيسي" : "Integrated in App"}
                        </span>
                      </span>
                      <span className="text-[10px] opacity-70">
                        {lang === "ar" ? siteConfig.nameAr : siteConfig.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
              to="/"
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
