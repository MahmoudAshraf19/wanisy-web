import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  ArrowRight, ArrowLeft, Smartphone, Film, Stethoscope, ShoppingBag, Search,
  Scissors, HeartHandshake, Users, MapPin, Bot, MessageCircleHeart, type LucideIcon,
} from "lucide-react";

type Chip = { icon: LucideIcon; en: string; ar: string; pos: string; tone: string; delay: string };

const orbit: Chip[] = [
  { icon: Film, en: "Pet Reels", ar: "ريلز الأليف", pos: "top-[6%] start-[2%]", tone: "bg-brand-sienna", delay: "0s" },
  { icon: Stethoscope, en: "Vets & Clinics", ar: "أطباء وعيادات", pos: "top-[20%] end-[0%]", tone: "bg-brand-green", delay: "1s" },
  { icon: Search, en: "Lost & Found", ar: "المفقودات", pos: "bottom-[28%] start-[-2%]", tone: "bg-brand-sand", delay: "2s" },
  { icon: ShoppingBag, en: "Marketplace", ar: "السوق", pos: "bottom-[10%] end-[6%]", tone: "bg-brand-charcoal", delay: "3s" },
  { icon: Users, en: "Groups", ar: "المجموعات", pos: "bottom-[2%] start-[24%]", tone: "bg-brand-green", delay: "4s" },
];

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
      <div className="wn-grid-bg absolute inset-0 -z-10" aria-hidden />
      <div className="wn-blob absolute -top-24 start-1/4 h-[520px] w-[520px] rounded-full -z-10" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="wn-rise space-y-8 text-center lg:col-span-6 lg:text-start">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-xs font-bold text-primary backdrop-blur sm:text-sm">
            <img src={siteConfig.logoUrl} alt="" width={22} height={15} className="h-4 w-auto" />
            {t.hero.badge}
          </p>

          <h1 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient-logo">{ar ? siteConfig.nameAr : siteConfig.name}</span>
            <span className="block text-foreground">
              {ar ? "عالم أليفك كله في مكان واحد" : "Your pet's world, all in one place"}
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0">{t.hero.subheadline}</p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
            <a href="#audiences" className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-8 py-4 text-base font-extrabold text-primary-foreground shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 sm:w-auto">
              {t.hero.ctaPrimary}
              <ArrowIcon className="h-5 w-5" />
            </a>
            <Link to="/for-professionals" className="inline-flex w-full items-center justify-center rounded-2xl border bg-card/70 px-7 py-4 text-base font-bold backdrop-blur transition hover:bg-muted sm:w-auto">
              {ar ? "للأطباء والأنشطة التجارية" : "For professionals & businesses"}
            </Link>
          </div>

          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-xs font-bold">
            <Smartphone className="h-4 w-4 text-primary" />
            {t.hero.comingSoonBadge}
          </p>
        </div>

        {/* Official logo as the centrepiece */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px] lg:col-span-6">
          <div className="wn-blob absolute inset-6 rounded-full" aria-hidden />
          <div className="absolute inset-[8%] rounded-[3rem] border bg-card/70 shadow-2xl backdrop-blur" />
          <img
            src={siteConfig.logoUrl}
            alt={ar ? "شعار ونيسي" : "Waneesi official logo"}
            width={1536}
            height={1024}
            fetchPriority="high"
            className="wn-float absolute inset-x-[4%] top-1/2 h-auto w-[92%] -translate-y-1/2 object-contain drop-shadow-xl"
          />
          {orbit.map(({ icon: Icon, en, ar: arLabel, pos, tone, delay }) => (
            <span key={en} style={{ animationDelay: delay }} className={`wn-float absolute ${pos} inline-flex items-center gap-2 rounded-2xl ${tone} px-3 py-2 text-xs font-extrabold text-white shadow-lg`}>
              <Icon className="h-4 w-4" aria-hidden />
              {ar ? arLabel : en}
            </span>
          ))}
        </div>
      </div>

      {/* Feature ticker */}
      <div className="wn-marquee mt-16 border-y bg-card/60 py-4 backdrop-blur" aria-label={ar ? "مميزات ونيسي" : "Waneesi features"}>
        <div className="overflow-hidden">
          <ul className="wn-marquee-track gap-10">
            {items.map(({ icon: Icon, en, ar: a }, i) => (
              <li key={i} aria-hidden={i >= strip.length} className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-foreground/80">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                {ar ? a : en}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
