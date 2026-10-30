import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import { Heart, Sparkles, Shield, PawPrint } from "lucide-react";

export function CommunityStorySection() {
  const { lang, t } = usePrefs();

  return (
    <section id="community" className="py-24 bg-card border-y relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-[36px] overflow-hidden border bg-gradient-to-br from-primary/15 via-secondary/10 to-accent/15 p-8 shadow-xl">
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">
                  <Heart className="w-7 h-7 fill-current" />
                </div>

                <div className="space-y-2 text-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    {lang === "ar" ? "عهد ورؤية ونيسي" : "The Waneesi Promise"}
                  </span>
                  <h3 className="text-2xl font-black text-foreground">
                    {lang === "ar" ? "رعاية تُشبه العائلة" : "Care That Feels Like Family"}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lang === "ar"
                      ? "صُنعت كل ميزة في ونيسي بحب خالص للحيوانات الأليفة واحترام عميق للمربين والأطباء المخلصين."
                      : "Every interaction inside Waneesi is crafted with deep empathy for animals and genuine respect for dedicated caregivers."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border text-xs text-foreground font-semibold flex items-center gap-3">
                  <Shield className="w-5 h-5 text-secondary shrink-0" />
                  <span>
                    {lang === "ar"
                      ? "بيئة آمنة وإيجابية تلتزم بأعلى معايير الرفق بالحيوان."
                      : "A safe, supportive platform strictly committed to animal welfare."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Story Copy Side */}
          <div className="lg:col-span-7 space-y-6 text-start order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-xs font-bold text-foreground">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>{t.story.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
              {t.story.title}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>{t.story.p1}</p>
              <p>{t.story.p2}</p>
              <p className="font-semibold text-foreground">{t.story.p3}</p>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs font-bold text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>{lang === "ar" ? "منظومة واحدة متصلة" : "Connected Ecosystem"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span>{lang === "ar" ? "مجتمع رحيم بالأليف" : "Compassionate Community"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

