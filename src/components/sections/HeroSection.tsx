import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Film,
  Stethoscope,
  ShoppingBag,
  Search,
  Scissors,
  HeartHandshake,
  Users,
  MapPin,
  Bot,
  MessageCircleHeart,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Wifi,
  Battery,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const strip: { icon: LucideIcon; en: string; ar: string }[] = [
  { icon: MessageCircleHeart, en: "Pet social network", ar: "شبكة اجتماعية للأليفين" },
  { icon: Film, en: "Reels & Stories", ar: "ريلز وستوريز" },
  { icon: Bot, en: "AI pet assistant", ar: "مساعد ذكي للأليف" },
  { icon: Stethoscope, en: "Veterinarians & clinics", ar: "أطباء وعيادات بيطرية" },
  { icon: Scissors, en: "Grooming", ar: "العناية والتجميل" },
  { icon: ShoppingBag, en: "Pet marketplace", ar: "سوق مستلزمات الأليف" },
  { icon: Search, en: "Lost & found", ar: "الحيوانات المفقودة" },
  { icon: HeartHandshake, en: "Responsible adoption", ar: "التبني المسؤول" },
  { icon: MapPin, en: "Nearby places", ar: "أماكن قريبة" },
  { icon: Users, en: "Public & private groups", ar: "مجموعات عامة وخاصة" },
];

export function HeroSection() {
  const { lang, t } = usePrefs();
  const ar = lang === "ar";
  const ArrowIcon = ar ? ArrowLeft : ArrowRight;
  const items = [...strip, ...strip];

  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Background ambient lighting */}
      <div className="wn-grid-bg absolute inset-0 -z-10" aria-hidden />
      <div
        className="wn-blob absolute -top-24 start-1/4 h-[520px] w-[520px] rounded-full -z-10 opacity-70"
        aria-hidden
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Left Column: Value proposition & CTAs */}
        <div className="wn-rise space-y-8 text-center lg:col-span-6 lg:text-start">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-xs font-bold text-primary backdrop-blur sm:text-sm shadow-xs">
            <img src={siteConfig.logoUrl} alt="" width={22} height={15} className="h-4 w-auto" />
            <span>{t.hero.badge}</span>
          </p>

          <h1 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient-logo">{ar ? siteConfig.nameAr : siteConfig.name}</span>
            <span className="block text-foreground mt-2">
              {ar ? "عالم أليفك كله في مكان واحد" : "Your pet's world, all in one place"}
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
            {t.hero.subheadline}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center pt-2">
            <a
              href="#audiences"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-8 py-4 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 sm:w-auto"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowIcon className="h-5 w-5" />
            </a>
            <Link
              to="/for-professionals"
              className="inline-flex w-full items-center justify-center rounded-2xl border bg-card/70 px-7 py-4 text-base font-bold backdrop-blur transition hover:bg-muted sm:w-auto"
            >
              <span>{ar ? "للأطباء والأنشطة التجارية" : "For professionals & businesses"}</span>
            </Link>
          </div>

          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-xs font-bold text-foreground">
            <Smartphone className="h-4 w-4 text-primary" />
            <span>{t.hero.comingSoonBadge}</span>
          </p>
        </div>

        {/* Right Column: Sleek, high-end mobile showcase with subtle floating micro-cards */}
        <div className="relative mx-auto w-full max-w-[420px] lg:col-span-6 lg:max-w-[480px]">
          {/* Subtle ambient multi-color glow */}
          <div
            className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-tr from-primary/25 via-secondary/20 to-accent/20 blur-2xl opacity-60 -z-10"
            aria-hidden
          />

          {/* Top floating badge - subtle, elegant glassmorphism */}
          <div className="hidden sm:flex absolute -top-5 -end-4 z-20 items-center gap-3 rounded-2xl border bg-card/85 p-3.5 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-90 duration-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div className="text-start">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <span>{ar ? "عيادات وأطباء معتمدون" : "Certified Vet Clinics"}</span>
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-[10px] text-muted-foreground">
                {ar ? "حجوزات واستشارات فورية" : "Instant appointments & records"}
              </p>
            </div>
          </div>

          {/* Smartphone Hardware Frame */}
          <div className="relative mx-auto w-full max-w-[340px] rounded-[3.2rem] border-[8px] border-foreground/15 bg-card shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
            {/* Dynamic Island Notch */}
            <div className="absolute top-2 start-1/2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90 flex items-center justify-end px-2 rtl:translate-x-1/2">
              <span className="h-2 w-2 rounded-full bg-primary/80 animate-pulse" />
            </div>

            {/* Simulated Phone Screen */}
            <div className="flex flex-col bg-background text-foreground text-xs select-none">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-bold text-muted-foreground">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 opacity-80">
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* App Navigation Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b bg-card/50">
                <div className="flex items-center gap-2">
                  <img
                    src={siteConfig.logoUrl}
                    alt="Waneesi"
                    className="h-6 w-auto object-contain"
                  />
                  <span className="font-black text-sm tracking-tight text-gradient-logo">
                    {ar ? siteConfig.nameAr : siteConfig.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/60">
                    <Search className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {/* Stories / Reels Rail */}
              <div className="flex items-center gap-3 px-4 py-3 overflow-x-hidden border-b bg-muted/20">
                {[
                  { name: ar ? "قصص الأليف" : "Stories", color: "from-brand-sienna to-brand-sand", active: true },
                  { name: ar ? "كلاب" : "Dogs", color: "from-primary to-emerald-400", active: false },
                  { name: ar ? "قطط" : "Cats", color: "from-brand-sand to-accent", active: false },
                  { name: ar ? "عيادات" : "Clinics", color: "from-brand-green to-teal-500", active: false },
                ].map((st, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                    <div className={`p-0.5 rounded-full bg-gradient-to-tr ${st.color}`}>
                      <div className="h-11 w-11 rounded-full bg-card border-2 border-background flex items-center justify-center font-bold text-[11px] text-primary overflow-hidden">
                        {i === 0 ? "🐾" : i === 1 ? "🐶" : i === 2 ? "🐱" : "🩺"}
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground truncate max-w-[50px]">
                      {st.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Main Feed Card - Modern Pet Post */}
              <div className="p-3.5 space-y-3">
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-sand to-brand-sienna flex items-center justify-center text-white font-bold text-xs">
                      🐾
                    </div>
                    <div className="text-start">
                      <div className="flex items-center gap-1 font-bold text-xs text-foreground">
                        <span>{ar ? "ماكس وبيلا" : "Max & Bella"}</span>
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        {ar ? "القاهرة • منذ دقيقتين" : "Cairo • 2m ago"}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {ar ? "ريلز" : "Reels"}
                  </span>
                </div>

                {/* Media Image Showcase */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-brand-charcoal via-primary/30 to-brand-sand/40 border flex items-center justify-center group">
                  <img
                    src={siteConfig.logoUrl}
                    alt="Pet Moment"
                    className="h-20 w-auto opacity-90 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 to-transparent text-white text-start">
                    <p className="text-[11px] font-semibold line-clamp-1">
                      {ar ? "أجمل أوقات المرح في الحديقة 🌿🐕 #ونيسي" : "Best park vibes today! 🌿🐕 #Waneesi"}
                    </p>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-0.5 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs font-semibold text-destructive">
                      <Heart className="h-4 w-4 fill-destructive" />
                      <span className="text-[10px]">2.4K</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-[10px]">168</span>
                    </span>
                    <Share2 className="h-3.5 w-3.5" />
                  </div>
                  <Bookmark className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Simulated In-App Bottom Navigation */}
              <div className="flex items-center justify-around py-2.5 border-t bg-card/60 text-muted-foreground">
                <span className="text-primary font-bold">🏠</span>
                <span>🎬</span>
                <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                  +
                </span>
                <span>🛍️</span>
                <span>👤</span>
              </div>
            </div>
          </div>

          {/* Bottom floating badge - subtle, elegant glassmorphism */}
          <div className="hidden sm:flex absolute -bottom-5 -start-4 z-20 items-center gap-3 rounded-2xl border bg-card/85 p-3.5 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-90 duration-700">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <MessageCircleHeart className="h-5 w-5" />
            </div>
            <div className="text-start">
              <div className="text-xs font-bold text-foreground">
                {ar ? "مجتمع أليفين متصل" : "Connected Pet Community"}
              </div>
              <p className="text-[10px] text-muted-foreground">
                {ar ? "أكثر من 50 ألف أليف سعيد" : "50K+ Happy Pets Sharing Love"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature ticker */}
      <div
        className="wn-marquee mt-16 border-y bg-card/60 py-4 backdrop-blur"
        aria-label={ar ? "مميزات ونيسي" : "Waneesi features"}
      >
        <div className="overflow-hidden">
          <ul className="wn-marquee-track gap-10">
            {items.map(({ icon: Icon, en, ar: a }, i) => (
              <li
                key={i}
                aria-hidden={i >= strip.length}
                className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-foreground/80"
              >
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                <span>{ar ? a : en}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
