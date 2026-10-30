import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Smartphone,
  Sparkles,
  Heart,
  MessageSquare,
  Video,
  Stethoscope,
  ShoppingBag,
  Scissors,
  AlertTriangle,
  Users,
  CheckCircle,
  Building2,
  Bot,
} from "lucide-react";

export function InteractiveShowcaseSection() {
  const { lang, t } = usePrefs();
  const [activeTab, setActiveTab] = useState<
    "feed" | "reels" | "vets" | "marketplace" | "grooming" | "hotels" | "assistant" | "lost" | "groups"
  >("feed");

  const slide = (t.showcase.slides as any)[activeTab] ?? t.showcase.slides.feed;

  const tabIcons: Record<string, any> = {
    feed: MessageSquare,
    reels: Video,
    vets: Stethoscope,
    marketplace: ShoppingBag,
    grooming: Scissors,
    hotels: Building2,
    assistant: Bot,
    lost: AlertTriangle,
    groups: Users,
  };

  return (
    <section className="py-24 bg-card border-y relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-xs font-bold text-foreground">
            <Smartphone className="w-3.5 h-3.5 text-secondary" />
            <span>{t.showcase.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            {t.showcase.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.showcase.subtitle}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="mt-12 flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 scrollbar-none">
          {t.showcase.tabs.map((tab) => {
            const Icon = tabIcons[tab.id] || Sparkles;
            const isSelected = tab.id === activeTab;
            const isAlert = tab.id === "lost";

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  isSelected
                    ? isAlert
                      ? "bg-destructive text-destructive-foreground border-destructive shadow-md shadow-destructive/20 scale-[1.02]"
                      : "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                    : "bg-background text-foreground/80 hover:text-foreground hover:bg-muted border-border"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Phone Frame & Details Layout */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
          {/* Phone Frame */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-[300px] sm:w-[330px] h-[580px] rounded-[44px] bg-charcoal p-3.5 shadow-2xl border-4 border-charcoal/40 transition-all duration-300">
              {/* Top Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-charcoal mr-2" />
                <div className="w-8 h-1 rounded-full bg-charcoal/60" />
              </div>

              {/* Screen Area */}
              <div className="w-full h-full rounded-[34px] overflow-hidden bg-background text-foreground flex flex-col pt-7 pb-3 relative">
                {/* Header in phone */}
                <div className="px-4 py-2 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={siteConfig.logoUrl}
                      alt="Logo"
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-extrabold text-xs">
                      {lang === "ar" ? siteConfig.nameAr : siteConfig.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {slide.tag}
                  </span>
                </div>

                {/* Simulated Screen Body based on Active Tab */}
                <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto text-start">
                  <div className="space-y-3">
                    {/* Visual Card representation */}
                    <div
                      className={`rounded-2xl p-4 border shadow-sm transition-all duration-300 ${
                        activeTab === "lost"
                          ? "bg-destructive/10 border-destructive/30"
                          : "bg-muted/40 border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-foreground">
                          {slide.user}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold ${
                            activeTab === "lost" ? "text-destructive" : "text-primary"
                          }`}
                        >
                          {slide.likes}
                        </span>
                      </div>

                      <p className="text-sm font-semibold text-foreground/90 leading-snug">
                        {slide.previewText}
                      </p>

                      <p className="text-xs text-muted-foreground mt-2">
                        {slide.comments}
                      </p>
                    </div>

                    {/* Secondary mockup details */}
                    <div className="p-3 rounded-xl bg-card border text-[11px] space-y-1">
                      <div className="flex items-center gap-2 font-bold text-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        <span>{slide.title}</span>
                      </div>
                      <p className="text-muted-foreground">{slide.subtitle}</p>
                    </div>
                  </div>

                  {/* Simulated App Action Button */}
                  <div className="pt-3">
                    <button
                      type="button"
                      className={`w-full py-2.5 rounded-xl font-bold text-xs text-white shadow-sm flex items-center justify-center gap-2 ${
                        activeTab === "lost" ? "bg-destructive" : "bg-primary"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{slide.title}</span>
                    </button>
                  </div>
                </div>

                {/* Phone Bottom Pill */}
                <div className="w-24 h-1 bg-muted-foreground/30 rounded-full mx-auto mt-1" />
              </div>
            </div>
          </div>

          {/* Details & Copy Side */}
          <div className="lg:col-span-6 space-y-6 text-start">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                activeTab === "lost"
                  ? "bg-destructive/15 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <span>{slide.tag}</span>
            </div>

            <h3 className="text-3xl font-black text-foreground tracking-tight">
              {slide.title}
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="p-5 rounded-2xl bg-background border space-y-3">
              <p className="font-bold text-sm text-foreground">
                {lang === "ar" ? "كيف تفيدك هذه الميزة داخل التطبيق؟" : "How does this feature help you in the app?"}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {slide.previewText}
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-medium text-muted-foreground">
                {lang === "ar"
                  ? "معاينة توضيحية لخصائص تطبيق ونيسي للهواتف الذكية."
                  : "Interactive promotional demonstration of the Waneesi mobile application."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

