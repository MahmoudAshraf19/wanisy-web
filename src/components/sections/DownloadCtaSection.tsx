import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Smartphone,
  Mail,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BellRing,
} from "lucide-react";

export function DownloadCtaSection() {
  const { lang, t } = usePrefs();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section id="download" className="py-24 bg-card border-t relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[40px] bg-gradient-to-br from-charcoal to-[#182F38] text-white p-8 sm:p-14 lg:p-16 shadow-2xl relative overflow-hidden text-center space-y-8 border border-white/10">
          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-xs font-bold text-accent">
            <BellRing className="w-3.5 h-3.5" />
            <span>{t.ctaBanner.badge}</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t.ctaBanner.headline}
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t.ctaBanner.subheadline}
            </p>
          </div>

          {/* Email Early Access Subscription Box */}
          <div className="max-w-md mx-auto pt-2">
            {submitted ? (
              <div className="p-4 rounded-2xl bg-primary/20 border border-primary/40 text-sm font-bold flex items-center justify-center gap-2 text-white animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>{t.ctaBanner.successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute top-1/2 -translate-y-1/2 left-4 w-4 h-4 text-white/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t.ctaBanner.emailPlaceholder}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-accent text-charcoal font-black text-sm shadow-md hover:bg-accent/90 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t.ctaBanner.buttonText}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-white/60 mt-3">
              {lang === "ar"
                ? "لن نشارك بريدك أبدًا. سنخطرك فقط بموعد توفر التطبيق على المتاجر."
                : "We never share your email. You'll only receive notification when the app launches."}
            </p>
          </div>

          {/* App Store / Google Play Indicators */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
            <span className="flex items-center gap-2 font-bold">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Apple App Store (iOS)</span>
            </span>
            <span className="flex items-center gap-2 font-bold">
              <Smartphone className="w-4 h-4 text-secondary" />
              <span>Google Play Store (Android)</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

