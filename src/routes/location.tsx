import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import { InteractiveGlobalMap } from "@/components/location/InteractiveGlobalMap";
import { HeadquartersMap } from "@/components/location/HeadquartersMap";
import { roadmapStages, type CountryData } from "@/data/expansionRoadmap";
import {
  Globe2,
  Building2,
  Clock,
  Compass,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Mail,
  Map as MapIcon,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/location")({
  component: LocationPage,
});

function LocationPage() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const hq = siteConfig.headquarters;
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [activeMapView, setActiveMapView] = useState<"global" | "cairo-street">("global");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20 selection:text-amber-300">
      {/* Decorative ambient gradient */}
      <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-emerald-500/10 via-amber-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-12 sm:space-y-16">
        {/* Page Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary shadow-xs backdrop-blur-sm">
            <img
              src="/flags/flag-egypt.jpg"
              alt="Egypt Flag"
              className="w-5 h-3.5 object-cover rounded-xs shadow-xs"
              loading="lazy"
            />
            <span>
              {ar
                ? "نطاق عمل تطبيق ونيسي • من قلب القاهرة إلى العالم"
                : "Waneesi Operating Scope • From Cairo to the World"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
            {ar ? (
              <>
                أين نحن؟ <span className="text-primary">نطاق الانطلاق والتوسع العالمي</span>
              </>
            ) : (
              <>
                Where We Are? <span className="text-primary">Launch Scope & Global Roadmap</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {ar
              ? "مقر الإدارة والتشغيل المركزي لتطبيق ونيسي يقع في القاهرة مصر. ينطلق التطبيق رسمياً في مرحلته الأولى ليغطي الوطن العربي بالكامل (الـ 22 دولة عربية)، وتتوالى مراحل التوسع لتشمل أوروبا، ثم أمريكا، وصولاً إلى العالم أجمع."
              : "Waneesi's central operations & management HQ is located in Cairo, Egypt. Phase 1 officially launches across all 22 Arab countries, followed by Europe, the Americas, and global worldwide expansion."}
          </p>

          {/* Quick View Mode Toggle (Interactive Expansion Map vs Cairo Street Map) */}
          <div className="pt-2 flex justify-center">
            <div className="p-1 rounded-2xl bg-card border border-border shadow-md inline-flex items-center gap-1">
              <button
                onClick={() => setActiveMapView("global")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeMapView === "global"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe2 className="w-4 h-4" />
                <span>{ar ? "خريطة نطاق العمل ومراحل التوسع" : "Scope & Expansion Map"}</span>
              </button>

              <button
                onClick={() => setActiveMapView("cairo-street")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeMapView === "cairo-street"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>{ar ? "خريطة مقر الإدارة (القاهرة)" : "Cairo Management HQ Map"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Map Visualizer Display */}
        <section aria-label={ar ? "خريطة نطاق عمل ونيسي" : "Waneesi Operating Scope Map"}>
          {activeMapView === "global" ? (
            <InteractiveGlobalMap onSelectCountry={(c) => setSelectedCountry(c)} />
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary flex items-center justify-between">
                <span>{ar ? "عرض خريطة شوارع مقر الإدارة الرئيسي في القاهرة مصر" : "Cairo HQ Street Map View"}</span>
                <button
                  onClick={() => setActiveMapView("global")}
                  className="underline hover:text-primary/80 font-black cursor-pointer"
                >
                  {ar ? "العودة لخريطة الـ 22 دولة عربية ←" : "Back to 22 Nations Map →"}
                </button>
              </div>
              <HeadquartersMap />
            </div>
          )}
        </section>

        {/* Headquarters Details Card (Cairo, Egypt • 24/7) */}
        <div className="rounded-3xl bg-card border border-border/90 shadow-xl p-6 sm:p-8 lg:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/80 pb-6 text-start">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    {ar ? "مركز القيادة والتشغيل" : "Operations HQ"}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    30.0444° N, 31.2357° E
                  </span>
                </div>
                <h3 className="text-2xl font-black text-foreground mt-0.5">
                  {ar ? "مقر إدارة وتطوير تطبيق ونيسي" : "Waneesi Application Management HQ"}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="px-4 py-2 rounded-xl bg-muted border border-border text-xs font-bold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>{ar ? "ساعات العمل: 24 ساعة - 7 أيام" : "Operating: 24 Hours - 7 Days"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <MapPin className="w-4 h-4" />
                <span>{ar ? "الموقع الجغرافي" : "Physical Location"}</span>
              </div>
              <p className="text-sm font-bold text-foreground">
                {ar ? "القاهرة مصر" : "Cairo, Egypt"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {ar
                  ? "المركز الرئيسي لإدارة العمليات وتطوير البنية السحابية وشبكات الرعاية البيطرية للوطن العربي."
                  : "Central headquarters overseeing software engineering, cloud ops, and veterinary networks."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                <ShieldCheck className="w-4 h-4" />
                <span>{ar ? "التواجد والدعم الفني" : "Availability"}</span>
              </div>
              <p className="text-sm font-bold text-foreground">
                {ar ? "24 ساعة - 7 أيام (24/7)" : "24 Hours - 7 Days"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {ar
                  ? "مراقبة الأنظمة، بلاغات طوارئ SOS للحيوانات المفقودة، ودعم العيادات يعمل على مدار الساعة."
                  : "Continuous infrastructure monitoring, emergency SOS pet broadcasts, and clinic support."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-500">
                <Mail className="w-4 h-4" />
                <span>{ar ? "التواصل والشراكات" : "Official Inquiries"}</span>
              </div>
              <div className="space-y-1">
                <div>
                  <a
                    href={`mailto:${siteConfig.contact.partnersEmail}`}
                    className="text-xs text-primary hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>{siteConfig.contact.partnersEmail}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${siteConfig.contact.generalEmail}`}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <span>{siteConfig.contact.generalEmail}</span>
                  </a>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {ar
                  ? "للشراكات المهنية والجهات الرسمية والتعاقدات."
                  : "For official veterinary entities, business partnerships, and corporate inquiries."}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Stage Expansion Roadmap Cards */}
        <div className="space-y-6">
          <div className="text-start space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-primary">
              {ar ? "خطة التوسع الجغرافي الشاملة" : "Global Expansion Roadmap"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              {ar ? "مراحل انطلاق ونيسي خطوة بخطوة" : "Phased Roadmap to Worldwide Care"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapStages.map((stg) => (
              <div
                key={stg.id}
                className={`p-6 rounded-3xl border transition-all text-start flex flex-col justify-between space-y-4 ${
                  stg.status === "live"
                    ? "bg-gradient-to-b from-emerald-500/10 via-card to-card border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                    : "bg-card/70 border-border/80 hover:border-border"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-muted text-foreground">
                      {ar ? `المرحلة 0${stg.stageNumber}` : `Phase 0${stg.stageNumber}`}
                    </span>
                    <span
                      className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${stg.themeColor}`}
                    >
                      {ar ? stg.statusAr : stg.statusEn}
                    </span>
                  </div>

                  <h4 className="text-lg font-black text-foreground">
                    {ar ? stg.titleAr : stg.titleEn}
                  </h4>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {ar ? stg.descAr : stg.descEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-bold">
                  <span className="text-primary">
                    {ar ? stg.totalCountriesTextAr : stg.totalCountriesTextEn}
                  </span>
                  {stg.status === "live" && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
