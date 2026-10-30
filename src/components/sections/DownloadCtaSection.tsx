import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
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
    <section id="download" className="py-20 sm:py-28 bg-card/40 border-t relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] sm:rounded-[44px] bg-[#0b1a23] text-white p-8 sm:p-14 lg:p-16 shadow-2xl shadow-black/40 border border-white/10 overflow-hidden text-center space-y-8">
          {/* Focused, warm ambient light directly behind the center */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[300px] rounded-full bg-gradient-to-b from-primary/30 via-secondary/20 to-transparent blur-3xl pointer-events-none -z-0 opacity-80"
            aria-hidden
          />

          {/* Top Brand Identity & Launch Status Badge */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-3.5">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm transition-transform hover:scale-105">
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs font-extrabold text-emerald-300 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.ctaBanner.badge}</span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="relative z-10 space-y-3.5 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-white">
              {t.ctaBanner.headline}
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto font-normal">
              {t.ctaBanner.subheadline}
            </p>
          </div>

          {/* Email Early-Access Subscription Form */}
          <div className="relative z-10 max-w-lg mx-auto pt-1">
            {submitted ? (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-sm font-bold flex items-center justify-center gap-2.5 text-emerald-200 animate-in zoom-in-95">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t.ctaBanner.successMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute top-1/2 -translate-y-1/2 start-4 w-4 h-4 text-white/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder={t.ctaBanner.emailPlaceholder}
                    className="w-full ps-11 pe-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <span>{t.ctaBanner.buttonText}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-xs text-white/60 mt-3 font-medium">
              {lang === "ar"
                ? "لن نشارك بريدك أبدًا. سنخطرك فقط بموعد توفر التطبيق على المتاجر الرسمية."
                : "We respect your privacy. You'll only receive an invite when Waneesi goes live."}
            </p>
          </div>

          {/* Official App Store & Google Play Badges with Real Logos */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm text-xs font-bold text-white/90 hover:bg-white/10 transition-colors shadow-xs">
              <img
                src="/icons/apple-logo.png"
                alt="Apple App Store"
                className="w-4 h-4 object-contain brightness-0 invert"
              />
              <span>Apple App Store (iOS)</span>
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm text-xs font-bold text-white/90 hover:bg-white/10 transition-colors shadow-xs">
              <img
                src="/icons/google.png"
                alt="Google Play Store"
                className="w-4 h-4 object-contain"
              />
              <span>Google Play Store (Android)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
