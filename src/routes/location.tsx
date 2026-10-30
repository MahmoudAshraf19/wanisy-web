import { createFileRoute, Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import { HeadquartersMap } from "@/components/location/HeadquartersMap";
import {
  MapPin,
  Building2,
  Globe2,
  Clock,
  Mail,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  Compass,
  ArrowRight,
  ArrowLeft,
  Navigation,
} from "lucide-react";

export const Route = createFileRoute("/location")({
  component: LocationPage,
});

function LocationPage() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const hq = siteConfig.headquarters;
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const coverageAreas = [
    {
      titleAr: "القاهرة الكبرى والجيزة",
      titleEn: "Greater Cairo & Giza",
      descAr: "مركز العمليات وإدارة شبكة العيادات البيطرية والإنقاذ والتبني والأطباء المعتمدين.",
      descEn: "Core operations hub managing vet networks, rescues, adoptions, and verified doctors.",
      tagAr: "المركز الإداري والتقني",
      tagEn: "HQ & Tech Hub",
      highlight: true,
    },
    {
      titleAr: "الإسكندرية والساحل",
      titleEn: "Alexandria & Coastal",
      descAr: "تغطية موسعة للأطباء البيطريين، مراكز الإيواء، ومتاجر مستلزمات الحيوانات الأليفة.",
      descEn: "Wide coverage of veterinary clinics, pet boarding centers, and supplies stores.",
      tagAr: "تغطية كاملة",
      tagEn: "Full Coverage",
      highlight: false,
    },
    {
      titleAr: "محافظات الدلتا والقناة",
      titleEn: "Delta & Canal Cities",
      descAr: "ربط أصحاب الأليفات بالرعاية الطبية الطارئة ومجتمعات الحيوانات المحلية.",
      descEn: "Connecting pet parents with emergency veterinary care and local pet communities.",
      tagAr: "شبكة متنامية",
      tagEn: "Growing Network",
      highlight: false,
    },
    {
      titleAr: "الصعيد ومحافظات مصر",
      titleEn: "Upper Egypt & Governorates",
      descAr: "توفير قاعدة بيانات شاملة للرعاية والتطعيمات والاستشارات الطبية عن بعد.",
      descEn: "Comprehensive database for care, vaccination records, and veterinary advice.",
      tagAr: "خدمة رقمية شاملة",
      tagEn: "Digital Access",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Decorative ambient gradient */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-amber-500/10 via-neutral-900/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-24 space-y-12 sm:space-y-16">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 shadow-sm backdrop-blur-sm">
            <img
              src="/flags/flag-egypt.jpg"
              alt="Egypt Flag"
              className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
              loading="lazy"
            />
            <span className="font-medium">
              {ar ? "مقر الإدارة والتشغيل الرئيسي • القاهرة، مصر" : "Main Operations & Headquarters • Cairo, Egypt"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {ar ? (
              <>
                أين نحن؟ <span className="text-amber-400">مقر ونيسي</span> في قلب القاهرة
              </>
            ) : (
              <>
                Where We Are? <span className="text-amber-400">Waneesi HQ</span> in Cairo
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            {ar
              ? "من قلب القاهرة، جمهورية مصر العربية، يدير فريق ونيسي المنصة والخدمات السحابية وشبكات الرعاية البيطرية لخدمة مجتمع الحيوانات الأليفة في كافة أنحاء الجمهورية والوطن العربي."
              : "From the heart of Cairo, Egypt, the Waneesi team manages the platform, cloud services, and veterinary care networks to serve the pet community across Egypt and the Arab world."}
          </p>
        </div>

        {/* Map Section */}
        <section aria-label={ar ? "خريطة مقر ونيسي" : "Waneesi Headquarters Map"}>
          <HeadquartersMap />
        </section>

        {/* Info Grid: Quick Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-white">
              {ar ? "المقر التشغيلي" : "Operational Headquarters"}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {ar
                ? "القاهرة، جمهورية مصر العربية. يضم المقر فرق إدارة المنتجات، والتطوير البرمجي، ومراجعة جودة الأطباء والعيادات المسجلة."
                : "Cairo, Egypt. Houses product management, engineering, and partner verification operations."}
            </p>
            <div className="pt-2 text-xs text-neutral-500 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              <span>{hq.latitude.toFixed(4)}° N, {hq.longitude.toFixed(4)}° E</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-white">
              {ar ? "أوقات العمل والتواصل" : "Working Hours"}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {ar
                ? "الأحد إلى الخميس: من ٩:٠٠ صباحًا حتى ٦:٠٠ مساءً بتوقيت القاهرة (UTC+3). خدمات الطوارئ على التطبيق متاحة على مدار الساعة."
                : "Sunday to Thursday: 9:00 AM – 6:00 PM Cairo Time (UTC+3). Emergency app features are available 24/7."}
            </p>
            <div className="pt-2 text-xs text-neutral-500 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>{ar ? "دعم مستمر للمنظومة البيطرية" : "Ongoing ecosystem support"}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-white">
              {ar ? "قنوات الاتصال المباشر" : "Direct Inquiries"}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {ar
                ? "للشراكات المهنية والعيادات البيطرية والجهات الرسمية، يسعدنا تواصلكم مباشرة عبر البريد المعتمد."
                : "For professional partnerships, veterinary clinics, and official inquiries, reach us directly via official email."}
            </p>
            <div className="pt-2">
              <a
                href={`mailto:${siteConfig.contact.partnersEmail}`}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>{siteConfig.contact.partnersEmail}</span>
                <Arrow className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Nationwide Ecosystem Coverage */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-neutral-800/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                <Globe2 className="w-3.5 h-3.5" />
                <span>{ar ? "نطاق التغطية والخدمات" : "Ecosystem Coverage"}</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                {ar ? "شبكة ونيسي في المحافظات المصرية" : "Waneesi Across Egyptian Governorates"}
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              {ar
                ? "نوفر شبكة رقمية موثوقة تربط كل ركن في مصر بأفضل الأطباء والخدمات البيطرية."
                : "A trusted digital network linking every region in Egypt to the best veterinary services."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coverageAreas.map((area, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  area.highlight
                    ? "bg-gradient-to-b from-amber-500/10 via-neutral-900/60 to-neutral-900/90 border-amber-500/30 shadow-lg shadow-amber-500/5"
                    : "bg-neutral-900/50 border-neutral-800/80 hover:border-neutral-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                      area.highlight
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/30"
                        : "bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    {ar ? area.tagAr : area.tagEn}
                  </span>
                  <MapPin
                    className={`w-4 h-4 ${
                      area.highlight ? "text-amber-400" : "text-neutral-500"
                    }`}
                  />
                </div>
                <h4 className="font-semibold text-white text-base mb-1.5">
                  {ar ? area.titleAr : area.titleEn}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {ar ? area.descAr : area.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partner & Professional CTA */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/30">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs text-amber-300 font-medium">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{ar ? "للأطباء والمراكز البيطرية في مصر" : "For Vets & Clinics in Egypt"}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {ar ? "هل أنت طبيب بيطري أو صاحب مركز رعاية؟" : "Are you a Veterinarian or Clinic Owner?"}
              </h3>
              <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
                {ar
                  ? "انضم الآن إلى شبكة ونيسي المعتمدة، وسّع وصولك لمئات الآلاف من مربي الحيوانات الأليفة، واحصل على لوحة تحكم متطورة لإدارة حجوزاتك وسجلاتك الطبية."
                  : "Join the verified Waneesi network, expand your reach to pet parents, and access modern management tools for appointments and records."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/for-professionals"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm transition-all shadow-md shadow-amber-500/20 text-center inline-flex items-center justify-center gap-2"
              >
                <span>{ar ? "انضم لشبكة المحترفين" : "Join as a Partner"}</span>
                <Arrow className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-medium text-sm transition-colors text-center inline-flex items-center justify-center gap-2"
              >
                <span>{ar ? "تواصل معنا" : "Contact Us"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

