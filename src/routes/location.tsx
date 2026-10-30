import { createFileRoute } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import { HeadquartersMap } from "@/components/location/HeadquartersMap";
import {
  MapPin,
  Building2,
  Clock,
  Mail,
  Compass,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/location")({
  component: LocationPage,
});

function LocationPage() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const hq = siteConfig.headquarters;
  const Arrow = ar ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-amber-500/20 selection:text-amber-300">
      {/* Decorative ambient gradient */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-amber-500/10 via-neutral-900/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-10 sm:space-y-12">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary shadow-xs backdrop-blur-sm">
            <img
              src="/flags/flag-egypt.jpg"
              alt="Egypt Flag"
              className="w-5 h-3.5 object-cover rounded-xs shadow-xs"
              loading="lazy"
            />
            <span>
              {ar ? "مقر إدارة تطبيق ونيسي • القاهرة مصر" : "Waneesi App Management HQ • Cairo, Egypt"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            {ar ? (
              <>
                أين نحن؟ <span className="text-primary">مقر إدارة ونيسي</span>
              </>
            ) : (
              <>
                Where We Are? <span className="text-primary">Waneesi Management HQ</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {ar
              ? "مقر الإدارة والتشغيل المركزي لتطبيق ونيسي - القاهرة مصر. نعمل على مدار الساعة (24 ساعة - 7 أيام) لإدارة وتطوير المنظومة وخدمة المجتمع."
              : "Central management and operations headquarters of the Waneesi application - Cairo, Egypt. Operating 24/7 (24 Hours - 7 Days) for ecosystem development and support."}
          </p>
        </div>

        {/* Map Section: Headquarters Cairo Egypt */}
        <section aria-label={ar ? "خريطة مقر إدارة ونيسي" : "Waneesi Management Headquarters Map"}>
          <HeadquartersMap />
        </section>

        {/* Info Grid: Headquarters Management Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Headquarters Location */}
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-3 text-start">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              {ar ? "مقر الإدارة" : "Management HQ"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ar
                ? "القاهرة مصر. المركز الرئيسي المعتمد لإدارة العمليات وتطوير البرمجيات وإدارة الشراكات لتطبيق ونيسي."
                : "Cairo, Egypt. The central accredited headquarters for operations, product engineering, and partnership management."}
            </p>
            <div className="pt-2 text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
              <Compass className="w-3.5 h-3.5 text-primary" />
              <span>{hq.latitude.toFixed(4)}° N, {hq.longitude.toFixed(4)}° E</span>
            </div>
          </div>

          {/* Card 2: Operating Hours: 24/7 */}
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-3 text-start">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              {ar ? "ساعات العمل والتواجد" : "Operating Hours"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ar
                ? "24 ساعة - 7 أيام. خدمات إدارة المنظومة والدعم الفني والعمليات السحابية تعمل على مدار الساعة طوال أيام الأسبوع."
                : "24 Hours - 7 Days (24/7). Management operations, system monitoring, and technical support operate around the clock."}
            </p>
            <div className="pt-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{ar ? "تشغيل ومتابعة مستمرة 24/7" : "Continuous 24/7 Operations"}</span>
            </div>
          </div>

          {/* Card 3: Official Inquiries */}
          <div className="p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-3 text-start">
            <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-foreground">
              {ar ? "التواصل مع الإدارة" : "HQ Contact"}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {ar
                ? "للشراكات المهنية والجهات الرسمية والتعاقدات، يسعدنا تواصلكم المباشر عبر قنوات البريد الرسمية."
                : "For business partnerships, official entities, and corporate inquiries, contact our executive team."}
            </p>
            <div className="pt-2 space-y-1">
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
          </div>
        </div>
      </div>
    </div>
  );
}
