import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import {
  Heart,
  Video,
  Stethoscope,
  Building2,
  Store,
  Tag,
  Scissors,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Users,
} from "lucide-react";

export function AudiencesSection() {
  const { lang, t } = usePrefs();
  const [activeTab, setActiveTab] = useState("parents");
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  const tabIcons: Record<string, any> = {
    parents: Heart,
    creators: Video,
    vets: Stethoscope,
    clinics: Building2,
    merchants: Store,
    brands: Tag,
    groomers: Scissors,
    hotels: Building2,
  };

  const currentAudience =
    t.audiences.items.find((item) => item.id === activeTab) ?? t.audiences.items[0];

  if (!currentAudience) return null;

  return (
    <section id="audiences" className="py-24 bg-card border-y relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-xs font-bold text-foreground">
            <Users className="w-3.5 h-3.5 text-secondary" />
            <span>{t.audiences.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            {t.audiences.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.audiences.subtitle}
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="mt-12 flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none">
          {t.audiences.items.map((aud) => {
            const Icon = tabIcons[aud.id] || Heart;
            const isSelected = aud.id === activeTab;
            return (
              <button
                key={aud.id}
                onClick={() => setActiveTab(aud.id)}
                className={`shrink-0 inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-background text-foreground/80 hover:text-foreground hover:bg-muted border-border"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                <span>{aud.title.replace("For ", "").replace("لـ", "").replace("ل", "")}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Audience Display Card */}
        <div className="mt-8 rounded-3xl border bg-background/60 backdrop-blur p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Info Side */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
                {currentAudience.title}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight">
                {currentAudience.subtitle}
              </h3>

              <p className="text-base text-muted-foreground leading-relaxed">
                {currentAudience.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                {currentAudience.bullets.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground/90 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Link for the category */}
              <div className="pt-4 flex flex-wrap gap-4">
                {activeTab === "vets" ||
                activeTab === "clinics" ||
                activeTab === "merchants" ||
                activeTab === "brands" ||
                activeTab === "groomers" ? (
                  <Link
                    to="/for-professionals"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow hover:bg-primary/95 transition-all"
                  >
                    <span>{t.prosSection.cta}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                ) : (
                  <Link
                    to="/features"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow hover:bg-primary/95 transition-all"
                  >
                    <span>{t.hero.ctaSecondary}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Visual Accent Side */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-8 flex flex-col justify-between min-h-[340px]">
                {/* Decorative background paw / icon */}
                <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-primary/10 blur-2xl" />

                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-card border shadow-md flex items-center justify-center text-primary">
                    {(() => {
                      const Icon = tabIcons[currentAudience.id] || Heart;
                      return <Icon className="w-7 h-7 text-primary" />;
                    })()}
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {lang === "ar" ? "ضمن منظومة ونيسي" : "Waneesi Ecosystem"}
                    </span>
                    <h4 className="text-xl font-bold text-foreground mt-1">
                      {currentAudience.title}
                    </h4>
                  </div>
                </div>

                <div className="relative z-10 p-4 rounded-2xl bg-card/85 backdrop-blur border text-xs text-muted-foreground space-y-2 mt-6">
                  <div className="flex items-center justify-between font-bold text-foreground">
                    <span>{lang === "ar" ? "حالة الميزة" : "Status"}</span>
                    <span className="text-primary">{lang === "ar" ? "تطبيق رسمي متكامل" : "Official App Feature"}</span>
                  </div>
                  <p>
                    {lang === "ar"
                      ? "صُممت التجربة لتكون مباشرة وبسيطة بدون أي تعقيد تقني."
                      : "Designed to be seamlessly accessible without technical complications."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

