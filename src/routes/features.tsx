import { createFileRoute, Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import {
  Sparkles,
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
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Building2,
  Bot,
  ShieldCheck,
  MessagesSquare,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  component: FeaturesPage,
});

function FeaturesPage() {
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
    "pet-hotels": Building2,
    "ai-assistant": Bot,
    "pet-health": ShieldCheck,
    chats: MessagesSquare,
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-xs font-bold text-primary">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>{t.features.eyebrow}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            {t.features.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* Detailed Feature Blocks */}
        <div className="space-y-12">
          {t.features.items.map((feat, index) => {
            const Icon = featureIcons[feat.id] || Sparkles;
            const isAlert = feat.isAlert;
            const isEven = index % 2 === 0;

            return (
              <div
                key={feat.id}
                className={`rounded-3xl border p-8 sm:p-12 transition-all duration-300 ${
                  isAlert
                    ? "bg-destructive/5 border-destructive/30 shadow-sm"
                    : "bg-card border-border shadow-xs"
                }`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}
                >
                  {/* Left Column: Details */}
                  <div
                    className={`lg:col-span-7 space-y-4 text-start ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                          isAlert
                            ? "bg-destructive/15 text-destructive"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                          Feature #{String(index + 1).padStart(2, "0")} • {feat.tag}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                          {feat.title}
                        </h2>
                      </div>
                    </div>

                    <p
                      className={`text-sm sm:text-base font-bold ${
                        isAlert ? "text-destructive" : "text-primary"
                      }`}
                    >
                      "{feat.quote}"
                    </p>

                    <p className="text-base text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        {lang === "ar"
                          ? "خاصية مدمجة بالكامل في تطبيق ونيسي"
                          : "Fully integrated into the Waneesi mobile application"}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Visual Showcase Box */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div
                      className={`rounded-3xl p-6 border relative overflow-hidden flex flex-col justify-between min-h-[240px] ${
                        isAlert
                          ? "bg-gradient-to-br from-destructive/15 via-background to-card"
                          : "bg-gradient-to-br from-primary/10 via-background to-card"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
                        <span>{lang === "ar" ? "بيئة تفاعلية" : "Interactive Feature"}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            isAlert
                              ? "bg-destructive text-white"
                              : "bg-primary text-white"
                          }`}
                        >
                          {feat.tag}
                        </span>
                      </div>

                      <div className="my-6 space-y-2 text-start">
                        <p className="text-lg font-black text-foreground">
                          {feat.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {feat.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t text-xs font-bold text-foreground/80">
                        <span>{lang === "ar" ? "تطبيق ونيسي" : "Waneesi App"}</span>
                        <span className="text-primary">{lang === "ar" ? "متاح للأليف" : "Active"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to App */}
        <div className="rounded-3xl bg-card border p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto shadow-sm">
          <Smartphone className="w-10 h-10 text-primary mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">
            {lang === "ar"
              ? "هل أنت مستعد لتجربة كل هذه المميزات؟"
              : "Ready to experience all these features?"}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {lang === "ar"
              ? "تطبيق ونيسي يجمع كل هذه الأدوات في مكان واحد لراحتك وسعادة أليفك."
              : "Waneesi unites all these capabilities into one intuitive app for you and your pets."}
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-sm shadow hover:bg-primary/95 transition-all"
            >
              <span>{lang === "ar" ? "العودة للرئيسية والاشتراك" : "Return to Home & Join Launch"}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

