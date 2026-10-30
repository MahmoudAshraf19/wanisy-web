import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Mail,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Rocket,
  ShieldCheck,
  Award,
  Clock,
  Smartphone,
} from "lucide-react";

export function DownloadCtaSection() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ArrowIcon = ar ? ArrowLeft : ArrowRight;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  const stages = [
    {
      num: "01",
      titleEn: "Core Architecture",
      titleAr: "بناء المنظومة والمميزات",
      descEn: "16 modules built & tested",
      descAr: "اكتمال 16 ميزة تقنية",
      status: "done",
    },
    {
      num: "02",
      titleEn: "Quality & Security",
      titleAr: "الفحص الأمني والخصوصية",
      descEn: "Data safety certified",
      descAr: "معايير الخصوصية المعتمدة",
      status: "done",
    },
    {
      num: "03",
      titleEn: "Store Review & Staging",
      titleAr: "اعتماد المتاجر الرسمية",
      descEn: "Pre-release deployment",
      descAr: "المرحلة الحالية النهائية",
      status: "active",
    },
    {
      num: "04",
      titleEn: "Public Launch",
      titleAr: "الإطلاق الرسمي للجمهور",
      descEn: "App Store & Google Play",
      descAr: "متاح للجميع على المتاجر",
      status: "soon",
    },
  ];

  const perks = [
    {
      icon: Award,
      titleEn: "Reserve Your Pet Handle",
      titleAr: "أولوية حجز اسم أليفك",
      descEn: "Claim your pet's unique username and profile handle before the general public.",
      descAr: "احجز اسم المستخدم الحصري لأليفك ورابط ملفه الشخصي قبل الجميع.",
    },
    {
      icon: Sparkles,
      titleEn: "Founding Member Badge",
      titleAr: "شارة العضو المؤسس",
      descEn: "Receive a permanent golden Founding Member status on your pet profile.",
      descAr: "شارة ذهبية موثقة دائمة تظهر على ملف أليفك تميزه كعضو مؤسس في ونيسي.",
    },
    {
      icon: Rocket,
      titleEn: "Priority Launch Invite",
      titleAr: "دعوة تحميل مبكرة وفورية",
      descEn: "Get an exclusive direct download link the exact moment the app goes live.",
      descAr: "إشعار فوري ورابط مباشر لتحميل التطبيق لحظة تفعيله على المتاجر الرسمية.",
    },
  ];

  return (
    <section
      id="download"
      className="scroll-mt-24 py-20 sm:py-28 relative overflow-hidden bg-background"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] sm:rounded-[48px] bg-[#071318] text-white p-8 sm:p-14 lg:p-16 shadow-2xl shadow-black/50 border border-white/10 overflow-hidden text-center space-y-12">
          {/* Subtle Studio Ambient Lighting */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[580px] h-[340px] rounded-full bg-gradient-to-b from-primary/30 via-secondary/15 to-transparent blur-3xl pointer-events-none -z-0 opacity-70"
            aria-hidden
          />

          {/* Top Brand Showcase & Teaser Status Pill */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm transition-transform hover:scale-105">
              <img
                src={siteConfig.logoUrl}
                alt={siteConfig.name}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs font-extrabold text-emerald-300 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {ar
                  ? "انتظر الإطلاق الرسمي قريبًا • ترقبوا ونيسي"
                  : "Official Launch Approaching • Stay Tuned"}
              </span>
            </div>
          </div>

          {/* Main Campaign Headline & Subtitle */}
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] text-white">
              {ar ? (
                <>
                  عالم أليفك على وشك أن يبدأ..
                  <span className="block text-gradient-logo mt-1">
                    انتظروا الإطلاق الرسمي قريبًا
                  </span>
                </>
              ) : (
                <>
                  Your Pet's World is Almost Here.
                  <span className="block text-gradient-logo mt-1">
                    Official Launch Coming Soon
                  </span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto font-normal">
              {ar
                ? "نضع اللمسات النهائية لإطلاق المنظومة الاجتماعية والطبية والفندقية الأكثر تكاملاً للأليف على Apple App Store و Google Play Store. انضم الآن لقائمة الـ VIP لتكن أول من يدخل هذا العالم."
                : "We are putting the final touches on the premier pet care, medical, and social ecosystem on Apple App Store & Google Play. Join our VIP early-access list to be the first inside."}
            </p>
          </div>

          {/* Launch Stage Roadmap Tracker */}
          <div className="relative z-10 pt-2 pb-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-start">
              {stages.map((st) => {
                const isDone = st.status === "done";
                const isActive = st.status === "active";
                return (
                  <div
                    key={st.num}
                    className={`p-4 rounded-2xl border transition-all ${
                      isActive
                        ? "bg-primary/20 border-primary/50 shadow-md shadow-primary/20"
                        : isDone
                        ? "bg-white/5 border-white/10"
                        : "bg-white/5 border-white/5 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-black mb-2">
                      <span className="opacity-60">{st.num}</span>
                      {isDone && (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{ar ? "مكتمل" : "Done"}</span>
                        </span>
                      )}
                      {isActive && (
                        <span className="flex items-center gap-1 text-amber-400 font-bold animate-pulse">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{ar ? "المرحلة الحالية" : "Current"}</span>
                        </span>
                      )}
                      {st.status === "soon" && (
                        <span className="text-white/50">{ar ? "قريبًا" : "Next"}</span>
                      )}
                    </div>
                    <p className="font-extrabold text-sm text-white leading-snug">
                      {ar ? st.titleAr : st.titleEn}
                    </p>
                    <p className="text-[11px] text-white/60 mt-1">
                      {ar ? st.descAr : st.descEn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Early Access Perks Cards (Promotional Value Proposition) */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-start">
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 text-emerald-300 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-sm text-white">
                    {ar ? p.titleAr : p.titleEn}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {ar ? p.descAr : p.descEn}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive VIP Early Access Subscription Form */}
          <div className="relative z-10 max-w-xl mx-auto pt-2">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2 text-white animate-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-emerald-500/30 flex items-center justify-center mx-auto text-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-black text-lg text-emerald-200">
                  {ar ? "أهلاً بك في قائمة الشرف الأولى!" : "Welcome to the VIP Founding List!"}
                </h4>
                <p className="text-xs text-emerald-300/80 max-w-md mx-auto">
                  {ar
                    ? "تم تسجيل بريدك الإلكتروني بنجاح. ستصلك دعوتك الحصرية ورابط التحميل المباشر فور تفعيل التطبيق رسميًا."
                    : "Your email is secured. You will receive an early invite link the moment we launch."}
                </p>
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
                    placeholder={
                      ar ? "أدخل بريدك الإلكتروني للحجز المبكر..." : "Enter your email for VIP early access..."
                    }
                    className="w-full ps-11 pe-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all backdrop-blur-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
                >
                  <span>{ar ? "احجز مكانك في الإطلاق المبكر" : "Join VIP Launch List"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-xs text-white/60 mt-3 font-medium">
              {ar
                ? "🔒 خصوصيتك محمية بالكامل. لن نرسل أي رسائل غير مرغوب فيها، سنخطرك فقط بالدعوة الرسمية."
                : "🔒 We respect your privacy. No spam ever—only your direct launch invitation."}
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

            <div className="inline-flex items-center gap-2 text-xs font-medium text-white/50">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{ar ? "معتمد وموثق لمنصات الهاتف الذكي" : "Mobile Platforms Verified"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
