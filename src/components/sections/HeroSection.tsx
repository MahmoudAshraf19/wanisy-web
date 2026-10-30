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
  Building2,
  ShieldCheck,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

const strip: { icon: LucideIcon; en: string; ar: string }[] = [
  { icon: MessageCircleHeart, en: "Pet social network", ar: "شبكة اجتماعية للأليفين" },
  { icon: Film, en: "Reels & Stories", ar: "ريلز وستوريز" },
  { icon: Bot, en: "AI pet assistant", ar: "مساعد ونيسي الذكي" },
  { icon: ShieldCheck, en: "Health passport & vaccines", ar: "دفتر الصحة والتطعيمات" },
  { icon: Building2, en: "Pet hotels & boarding", ar: "فنادق واستضافة الأليف" },
  { icon: Stethoscope, en: "Veterinarians & clinics", ar: "أطباء وعيادات بيطرية" },
  { icon: Scissors, en: "Grooming & spa", ar: "العناية والتجميل" },
  { icon: ShoppingBag, en: "Pet marketplace", ar: "سوق مستلزمات الأليف" },
  { icon: Search, en: "Lost & found alerts", ar: "طوارئ الأليف المفقود" },
  { icon: MessagesSquare, en: "Direct in-app messaging", ar: "المحادثات المباشرة" },
  { icon: HeartHandshake, en: "Responsible adoption", ar: "التبني المسؤول" },
  { icon: MapPin, en: "Nearby places & map", ar: "الخريطة والأماكن القريبة" },
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

          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
            <span className="inline-flex items-center gap-2.5 rounded-full border bg-card/80 px-4 py-2 text-xs font-bold text-foreground shadow-xs backdrop-blur">
              <span className="flex items-center gap-1.5 opacity-80">
                <img src="/icons/apple-logo.png" alt="Apple" className="h-3.5 w-3.5 object-contain dark:invert" />
                <img src="/icons/google.png" alt="Google Play" className="h-3.5 w-3.5 object-contain" />
              </span>
              <span className="h-3 w-px bg-border" />
              <span>{t.hero.comingSoonBadge}</span>
            </span>
          </div>
        </div>

        {/* Right Column: Clean, simple, and elegant official logo presentation */}
        <div className="relative mx-auto flex items-center justify-center lg:col-span-6 w-full py-6 sm:py-10">
          {/* Subtle soft ambient glow in brand colors */}
          <div
            className="absolute h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 rounded-full bg-gradient-to-tr from-primary/20 via-secondary/15 to-accent/20 blur-3xl -z-10 pointer-events-none"
            aria-hidden
          />

          <img
            src="/logo.png"
            alt={ar ? "شعار ونيسي" : "Waneesi Logo"}
            className="w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px] h-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
            fetchPriority="high"
          />
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
