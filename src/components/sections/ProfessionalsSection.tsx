import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  TrendingUp,
  Stethoscope,
  Building2,
  Store,
  Tag,
  Scissors,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Briefcase,
} from "lucide-react";

export function ProfessionalsSection() {
  const { lang, t } = usePrefs();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  const icons = [Stethoscope, Building2, Store, Tag, Scissors];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[36px] bg-gradient-to-br from-card via-card to-primary/5 border p-8 sm:p-12 lg:p-16 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Header & Call to Action */}
            <div className="lg:col-span-5 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-xs font-bold text-foreground">
                <Briefcase className="w-3.5 h-3.5 text-secondary" />
                <span>{t.prosSection.eyebrow}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
                {t.prosSection.title}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.prosSection.subtitle}
              </p>

              <div className="pt-2">
                <Link
                  to="/for-professionals"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-extrabold text-base shadow-lg shadow-primary/20 hover:bg-primary/95 hover:-translate-y-0.5 transition-all"
                >
                  <span>{t.prosSection.cta}</span>
                  <ArrowIcon className="w-5 h-5" />
                </Link>
              </div>

              <p className="text-xs text-muted-foreground">
                {lang === "ar"
                  ? "تواصل معنا مباشرة عبر البريد المخصص للشركاء: "
                  : "Direct partner communications via: "}
                <a
                  href={`mailto:${siteConfig.contact.partnersEmail}`}
                  className="font-bold text-primary hover:underline"
                >
                  {siteConfig.contact.partnersEmail}
                </a>
              </p>
            </div>

            {/* Right Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
              {t.prosSection.categories.map((cat, idx) => {
                const Icon = icons[idx] || Briefcase;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-background/80 border hover:border-primary/40 transition-all duration-200 hover-lift space-y-2.5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-base text-foreground">
                      {cat.role}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

