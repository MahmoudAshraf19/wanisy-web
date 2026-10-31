import { createFileRoute } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import { ExpansionMap } from "@/components/location/ExpansionMap";
import { HeadquartersMap } from "@/components/location/HeadquartersMap";
import { Building2, Clock, Compass, Globe, Mail, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/location")({
  component: LocationPage,
});

function LocationPage() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const hq = siteConfig.headquarters;
  const Arrow = ar ? ArrowLeft : ArrowRight;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/20">
      {/* Ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl space-y-14 px-4 pt-28 pb-24 sm:space-y-16 sm:px-6 sm:pt-36 lg:px-8">
        {/* Hero */}
        <header className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary backdrop-blur-sm">
            <Globe className="h-3.5 w-3.5" />
            <span>
              {ar ? "نطاق الانطلاق الرسمي: 22 دولة عربية" : "Official launch area: 22 Arab countries"}
            </span>
          </div>

          <h1 className="text-3xl leading-tight font-black tracking-tight sm:text-4xl md:text-5xl">
            {ar ? (
              <>
                نبدأ من الوطن العربي،
                <br />
                <span className="text-primary">ونصل إلى العالم كله</span>
              </>
            ) : (
              <>
                We start in the Arab world,
                <br />
                <span className="text-primary">and grow to reach everyone</span>
              </>
            )}
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {ar
              ? "ننطلق رسميًا في 22 دولة عربية، ثم أوروبا، ثم الأمريكتين، ثم العالم. تُدار ونيسي من القاهرة على مدار الساعة."
              : "We launch officially across 22 Arab countries, then Europe, the Americas, and the world. Waneesi is managed from Cairo, around the clock."}
          </p>
        </header>

        {/* Primary element: service area & expansion plan */}
        <ExpansionMap />

        {/* Headquarters */}
        <section aria-label={ar ? "مقر إدارة ونيسي" : "Waneesi management headquarters"} className="space-y-6">
          <div className="space-y-1.5 text-start">
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              {ar ? "مقر الإدارة" : "Management headquarters"}
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              {ar
                ? "من القاهرة ندير العمليات ونتابع الدعم الفني والشراكات."
                : "From Cairo we run operations, technical support, and partnerships."}
            </p>
          </div>

          <HeadquartersMap />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Location */}
            <div className="space-y-3 rounded-3xl border border-border/80 bg-card p-6 text-start shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-500">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{ar ? "مقر الإدارة" : "Management HQ"}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ar
                  ? "القاهرة، مصر. المركز الرئيسي المعتمد لإدارة العمليات وتطوير البرمجيات وإدارة الشراكات لتطبيق ونيسي."
                  : "Cairo, Egypt. The central accredited headquarters for operations, product engineering, and partnership management."}
              </p>
              <div dir="ltr" className="flex items-center gap-1.5 pt-2 font-mono text-xs text-muted-foreground">
                <Compass className="h-3.5 w-3.5 text-primary" />
                <span>
                  {hq.latitude.toFixed(4)}° N, {hq.longitude.toFixed(4)}° E
                </span>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-3 rounded-3xl border border-border/80 bg-card p-6 text-start shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{ar ? "ساعات العمل والتواجد" : "Operating hours"}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ar
                  ? "24 ساعة - 7 أيام. خدمات إدارة المنظومة والدعم الفني والعمليات السحابية تعمل على مدار الساعة طوال أيام الأسبوع."
                  : "24 Hours - 7 Days (24/7). Management operations, system monitoring, and technical support operate around the clock."}
              </p>
              <div className="flex items-center gap-1.5 pt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>{ar ? "تشغيل ومتابعة مستمرة 24/7" : "Continuous 24/7 operations"}</span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3 rounded-3xl border border-border/80 bg-card p-6 text-start shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-500">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{ar ? "التواصل مع الإدارة" : "HQ contact"}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ar
                  ? "للشراكات المهنية والجهات الرسمية والتعاقدات، يسعدنا تواصلكم المباشر عبر قنوات البريد الرسمية."
                  : "For business partnerships, official entities, and corporate inquiries, contact our executive team."}
              </p>
              <div className="space-y-1 pt-2">
                <a
                  href={`mailto:${siteConfig.contact.partnersEmail}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  <span>{siteConfig.contact.partnersEmail}</span>
                  <Arrow className="h-3.5 w-3.5" />
                </a>
                <div>
                  <a
                    href={`mailto:${siteConfig.contact.generalEmail}`}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {siteConfig.contact.generalEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}