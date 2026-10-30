import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import {
  MessageSquare,
  Video,
  Clock,
  Stethoscope,
  ShoppingBag,
  Scissors,
  AlertTriangle,
  HeartHandshake,
  Compass,
  Users,
  BellRing,
  Globe2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export function FeaturesGridSection() {
  const { lang, t } = usePrefs();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  const featureIcons: Record<string, any> = {
    "social-feed": MessageSquare,
    reels: Video,
    stories: Clock,
    "vet-discovery": Stethoscope,
    marketplace: ShoppingBag,
    grooming: Scissors,
    "lost-found": AlertTriangle,
    adoption: HeartHandshake,
    "nearby-places": Compass,
    groups: Users,
    notifications: BellRing,
    "global-community": Globe2,
  };

  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-xs font-bold text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>{t.features.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            {t.features.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features 12-Card Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.features.items.map((feat, index) => {
            const Icon = featureIcons[feat.id] || Sparkles;
            const isAlert = feat.isAlert;

            return (
              <div
                key={feat.id}
                className={`relative rounded-3xl p-7 border transition-all duration-300 hover-lift flex flex-col justify-between ${
                  isAlert
                    ? "bg-destructive/5 border-destructive/30 hover:border-destructive shadow-sm"
                    : "bg-card border-border hover:border-primary/50 shadow-xs"
                }`}
              >
                <div className="space-y-4 text-start">
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                        isAlert
                          ? "bg-destructive/15 text-destructive"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                        {feat.tag}
                      </span>
                      <span className="text-xs font-black text-muted-foreground/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Title & Quote */}
                  <div>
                    <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                      {feat.title}
                    </h3>
                    <p
                      className={`text-xs font-bold mt-1 ${
                        isAlert ? "text-destructive" : "text-primary"
                      }`}
                    >
                      "{feat.quote}"
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom subtle indicator */}
                <div className="pt-6 mt-4 border-t flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>{lang === "ar" ? "ميزة متوفرة بالتطبيق" : "Mobile App Ecosystem"}</span>
                  <Link
                    to="/features"
                    className="text-primary hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>{lang === "ar" ? "تفاصيل" : "Learn more"}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

