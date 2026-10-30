import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Sparkles,
  Smartphone,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BellRing,
  ShoppingBag,
} from "lucide-react";

export function HeroSection() {
  const { lang, t } = usePrefs();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Decorative Brand Color Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-[350px] h-[350px] bg-accent/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-start">
            {/* Ecosystem Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/80 backdrop-blur shadow-sm text-xs sm:text-sm font-bold text-primary">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
              {t.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.subheadline}
            </p>

            {/* Main CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#audiences"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-extrabold text-base shadow-lg shadow-primary/25 hover:bg-primary/95 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowIcon className="w-5 h-5" />
              </a>

              <Link
                to="/features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl border bg-card/70 backdrop-blur font-bold text-base text-foreground hover:bg-muted transition-all duration-200"
              >
                <span>{t.hero.ctaSecondary}</span>
              </Link>
            </div>

            {/* Store Release Notice (Truthful & Transparent) */}
            <div className="pt-4 border-t border-border/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-muted-foreground">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/15 text-foreground font-bold">
                <Smartphone className="w-4 h-4 text-primary" />
                <span>{t.hero.comingSoonBadge}</span>
              </div>
              <div className="flex items-center gap-3 opacity-75">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  {lang === "ar" ? "قيد المراجعة النهائية للمتاجر" : "Pre-release in final review"}
                </span>
              </div>
            </div>

            {/* Core Pillars / Trust Tags */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-start">
              {t.hero.trustPills.map((pill, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-card border shadow-xs flex items-center gap-2 text-xs font-semibold text-foreground/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="leading-snug">{pill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Layered Editorial Phone Mockup */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-[320px] sm:w-[360px] h-[640px] rounded-[48px] bg-card border-4 border-charcoal/30 shadow-2xl overflow-hidden p-3 transition-transform duration-500 hover:scale-[1.01]">
              {/* Phone Speaker Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-charcoal/80 rounded-full z-20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-charcoal/90 mr-2" />
                <div className="w-12 h-1.5 rounded-full bg-charcoal/60" />
              </div>

              {/* Inside Phone Screen */}
              <div className="w-full h-full rounded-[38px] overflow-hidden bg-background flex flex-col pt-8 pb-3 relative">
                {/* App Header Bar in Mockup */}
                <div className="px-4 py-2 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={siteConfig.logoUrl}
                      alt="Logo"
                      className="w-7 h-7 object-contain"
                    />
                    <span className="font-extrabold text-sm text-foreground">
                      {lang === "ar" ? siteConfig.nameAr : siteConfig.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-bold text-primary">Live</span>
                  </div>
                </div>

                {/* Content Stream Mockup */}
                <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 text-start scrollbar-none">
                  {/* Floating Doctor Preview Card */}
                  <div className="p-3 rounded-2xl bg-card border shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-xs truncate text-foreground">
                          {lang === "ar" ? "د. ريم مصطفى" : "Dr. Reem Mostafa"}
                        </p>
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                          {lang === "ar" ? "معتمد" : "Verified"}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {lang === "ar" ? "عيادة الأمل البيطرية • حجز متاح" : "Al-Amal Pet Clinic • Booking Open"}
                      </p>
                    </div>
                  </div>

                  {/* Reel Highlight Card */}
                  <div className="relative rounded-2xl overflow-hidden border bg-charcoal text-white aspect-[4/3] flex flex-col justify-end p-3 shadow-md">
                    <img
                      src="/brand/Banners/banner_1.png"
                      alt="Reel visual"
                      className="absolute inset-0 w-full h-full object-cover opacity-85"
                      onError={(e) => {
                        // Fallback graceful background gradient
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
                    <div className="relative z-10 space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black bg-secondary text-charcoal">
                        Pet Reels
                      </span>
                      <p className="font-bold text-xs line-clamp-1">
                        {lang === "ar"
                          ? "أول يوم لماكس في الحديقة العامة 🐾"
                          : "Max's sunny adventures at the park 🐾"}
                      </p>
                      <p className="text-[10px] opacity-80">
                        {lang === "ar" ? "٨.٤ ألف إعجاب • ١٢٠ تعليق" : "8.4k loves • 120 comments"}
                      </p>
                    </div>
                  </div>

                  {/* Lost & Found SOS Alert Card */}
                  <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                    <div className="flex-1 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-destructive">
                          {lang === "ar" ? "طوارئ أليف مفقود" : "Lost Pet SOS Alert"}
                        </span>
                        <span className="text-[9px] text-destructive/80 font-bold">
                          {lang === "ar" ? "منذ ١٥ دقيقة" : "15m ago"}
                        </span>
                      </div>
                      <p className="text-foreground text-[10px] mt-0.5 line-clamp-1">
                        {lang === "ar"
                          ? "كلب هاسكي أزرق العينين شوهد في الحي الثاني"
                          : "Blue-eyed Husky last seen near Sector 2"}
                      </p>
                    </div>
                  </div>

                  {/* Marketplace Product Card */}
                  <div className="p-2.5 rounded-2xl bg-card border flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-accent/20 text-charcoal flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">
                          {lang === "ar" ? "طعام مجفف بريميوم للأليف" : "Organic Nutri-Kibble"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {lang === "ar" ? "متجر باوز • متاح للتوصيل" : "Paws Hub • In Stock"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Bottom Nav */}
                <div className="px-6 py-2 border-t bg-card/90 flex justify-between items-center text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                </div>
              </div>
            </div>

            {/* Floating Floating Accent Pill */}
            <div className="hidden sm:flex absolute -bottom-6 -left-8 glass p-4 rounded-2xl border shadow-xl items-center gap-3 animate-bounce duration-1000">
              <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="text-start">
                <p className="text-xs font-bold text-foreground">
                  {lang === "ar" ? "مجتمع واحد لكل محبي الأليف" : "One Connected Pet World"}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {lang === "ar" ? "رعاية • تواصل • أمان" : "Care • Social • Safety"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

