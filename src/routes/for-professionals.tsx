import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Briefcase,
  Stethoscope,
  Building2,
  Store,
  Tag,
  Scissors,
  CheckCircle2,
  Send,
  Mail,
  User,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/for-professionals")({
  component: ForProfessionalsPage,
});

function ForProfessionalsPage() {
  const { lang } = usePrefs();
  const [partnerType, setPartnerType] = useState("vet");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !businessName) return;
    setSubmitted(true);
  };

  const partnerTypes = [
    {
      id: "vet",
      icon: Stethoscope,
      labelEn: "Veterinarian / Doctor",
      labelAr: "طبيب بيطري مستقل",
      descEn:
        "Build a verified professional presence, highlight specialties, and connect with pet parents needing clinical guidance.",
      descAr:
        "ابنِ حضورًا مهنيًا معتمدًا، اعرض تخصصاتك الطبية، وتواصل مع مربي الحيوانات الباحثين عن رعاية موثوقة.",
    },
    {
      id: "clinic",
      icon: Building2,
      labelEn: "Veterinary Clinic / Hospital",
      labelAr: "عيادة أو مستشفى بيطري",
      descEn:
        "Feature your clinical facility, surgical equipment, operating hours, and on-staff doctors to local pet parents.",
      descAr:
        "أبرز منشأتك وتجهيزاتك الطبية وساعات الطوارئ وفريق الأطباء أمام آلاف المربين في نطاقك الجغرافي.",
    },
    {
      id: "store",
      icon: Store,
      labelEn: "Pet Store / Merchant",
      labelAr: "متجر مستلزمات وأغذية أليف",
      descEn:
        "Put your food, accessories, toys, and care supplies directly in front of targeted local pet owners.",
      descAr:
        "ضع منتجاتك وأغذيتك ومستلزماتك أمام مشترين شغوفين يبحثون دائمًا عن الأفضل لأليفهم.",
    },
    {
      id: "brand",
      icon: Tag,
      labelEn: "Pet Brand / Manufacturer",
      labelAr: "علامة تجارية متخصصة",
      descEn:
        "Establish brand credibility, highlight ingredient quality, and reach a dedicated pet care community.",
      descAr:
        "حقق انتشارًا نوعيًا وثقة عالية لمنتجات علامتك التجارية داخل مجتمع محبي الحيوانات الأليفة.",
    },
    {
      id: "groomer",
      icon: Scissors,
      labelEn: "Pet Groomer / Spa Salon",
      labelAr: "أخصائي أو صالون عناية (Grooming)",
      descEn:
        "Showcase styling portfolios, de-shedding packages, and safe hygiene handling to maintain full booking schedules.",
      descAr:
        "اعرض صور أعمالك، وباقات النظافة، والتعامل الآمن مع الحيوان لملء جدول حجوزاتك بعملاء دائمين.",
    },
    {
      id: "hotel",
      icon: Building2,
      labelEn: "Pet Hotel / Boarding Facility",
      labelAr: "فندق أو مركز استضافة أليف",
      descEn:
        "Showcase suites, climate control, safety protocols, and daily photo updates to traveling pet owners.",
      descAr:
        "اعرض غرف الاستضافة، والتكييف، وأنظمة الأمان، وتحديثات الرعاية اليومية لأصحاب الحيوانات أثناء سفرهم.",
    },
  ];

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/15 text-xs font-bold text-foreground">
            <Briefcase className="w-3.5 h-3.5 text-secondary" />
            <span>
              {lang === "ar" ? "بوابة الشركاء والمحترفين" : "Partners & Professionals Portal"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            {lang === "ar" ? "خلّي مشروعك جزء من عالم ونيسي" : "Grow Your Pet Business with Waneesi"}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {lang === "ar"
              ? "انضم إلى منظومة تربط الأطباء والعيادات والمتاجر ومقدمي خدمات العناية بآلاف المربين المهتمين بجودة الحياة لأليفهم."
              : "Join an integrated ecosystem connecting veterinarians, clinics, pet stores, and care specialists with passionate pet owners."}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerTypes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-7 rounded-3xl bg-card border border-border shadow-xs hover-lift space-y-4 text-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground">
                  {lang === "ar" ? item.labelAr : item.labelEn}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "ar" ? item.descAr : item.descEn}
                </p>
              </div>
            );
          })}

          {/* Value Highlight card */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-primary/15 via-secondary/10 to-card border border-primary/20 shadow-xs space-y-4 text-start flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-foreground">
                {lang === "ar" ? "شراكة مبنية على الثقة" : "Trust-Driven Growth"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === "ar"
                  ? "نوفر التحقق المهني والدعم المباشر لتنمو علامتك بثقة ومصداقية."
                  : "We provide verified badges and direct ecosystem visibility to elevate your practice."}
              </p>
            </div>
            <p className="text-xs font-bold text-primary">
              {lang === "ar" ? "شراكات حقيقية بدون تعقيدات" : "Direct partnerships with zero clutter"}
            </p>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-card border p-8 sm:p-12 shadow-md space-y-8 text-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {lang === "ar" ? "تسجيل الاهتمام بالشراكة" : "Partner Expression of Interest"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              {lang === "ar" ? "طلب انضمام شريك جديد" : "Submit Your Partnership Application"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {lang === "ar"
                ? "أدخل بياناتك وسيتواصل معك فريق الشراكات خلال يومي عمل لإتمام إجراءات التوثيق."
                : "Fill out the form below. Our partnerships team will contact you within 2 business days."}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-primary/10 border border-primary/30 text-center space-y-4 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-black text-foreground">
                {lang === "ar" ? "شكرًا لاهتمامك بالانضمام إلى ونيسي!" : "Thank You for Your Application!"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {lang === "ar"
                  ? `تم استلام طلبك بنجاح وسيقوم فريق الشراكات بمراجعته والتواصل معك عبر ${email || "بريدك الإلكتروني"}.`
                  : `Your application has been received. Our team will review your details and contact you at ${email || "your email"}.`}
              </p>
              <p className="text-xs font-semibold text-primary pt-2">
                {lang === "ar" ? "للتواصل العاجل: " : "For urgent inquiries: "}{" "}
                <a
                  href={`mailto:${siteConfig.contact.partnersEmail}`}
                  className="underline"
                >
                  {siteConfig.contact.partnersEmail}
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Partner Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">
                  {lang === "ar" ? "نوع النشاط المهني" : "Business / Professional Category"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {partnerTypes.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPartnerType(item.id)}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        partnerType === item.id
                          ? "bg-primary text-primary-foreground border-primary shadow-xs"
                          : "bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {lang === "ar" ? item.labelAr : item.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {lang === "ar" ? "الاسم الكامل" : "Contact Person Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder={lang === "ar" ? "اسم المسؤول" : "Your Name"}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {lang === "ar" ? "اسم المنشأة أو العيادة" : "Business / Clinic Name"}
                  </label>
                  <div className="relative">
                    <Building2 className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                      placeholder={lang === "ar" ? "اسم العيادة أو المتجر" : "Business Name"}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {lang === "ar" ? "البريد الإلكتروني للعمل" : "Business Email"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="partner@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {lang === "ar" ? "رقم الهاتف / الواتساب" : "Phone / WhatsApp"}
                  </label>
                  <div className="relative">
                    <Phone className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+20 ..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  {lang === "ar" ? "المدينة والدولة" : "City & Country"}
                </label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder={lang === "ar" ? "القاهرة، مصر" : "Cairo, Egypt"}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  {lang === "ar" ? "تفاصيل إضافية أو رابط الموقع (اختياري)" : "Additional Notes or Website (Optional)"}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    lang === "ar"
                      ? "أخبرنا باختصار عن خدماتك أو التراخيص المتاحة..."
                      : "Briefly tell us about your services or license..."
                  }
                  className="w-full p-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-sm shadow hover:bg-primary/95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === "ar" ? "إرسال طلب الانضمام" : "Submit Application"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

