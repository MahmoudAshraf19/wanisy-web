import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import { DownloadCtaSection } from "@/components/sections/DownloadCtaSection";
import {
  Mail,
  Send,
  User,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
  Briefcase,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Headphones,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const { lang } = usePrefs();
  const [category, setCategory] = useState("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const scrollToDownload = () => {
      if (typeof window !== "undefined" && window.location.hash === "#download") {
        setTimeout(() => {
          const el = document.getElementById("download");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    };

    scrollToDownload();
    window.addEventListener("hashchange", scrollToDownload);
    return () => window.removeEventListener("hashchange", scrollToDownload);
  }, []);

  const channels = [
    {
      id: "general",
      icon: Mail,
      email: siteConfig.contact.generalEmail,
      titleEn: "General Inquiries",
      titleAr: "الاستفسارات العامة",
      descEn: "Platform questions, media requests, or general information.",
      descAr: "الاستفسارات العامة، التواصل الإعلامي، أو معلومات عن المنصة.",
    },
    {
      id: "support",
      icon: Headphones,
      email: siteConfig.contact.supportEmail,
      titleEn: "Technical Support",
      titleAr: "الدعم الفني والمساعدة",
      descEn: "Help with mobile app access, profile setup, or bug reports.",
      descAr: "المساعدة التقنية، ضبط الحسابات، أو الإبلاغ عن مشكلة برمجية.",
    },
    {
      id: "partners",
      icon: Briefcase,
      email: siteConfig.contact.partnersEmail,
      titleEn: "Business & Vet Partnerships",
      titleAr: "شراكات العيادات والمتاجر",
      descEn: "Veterinarians, clinics, pet stores, groomers, and pet brands.",
      descAr: "للأطباء، العيادات، صالونات العناية، ومتاجر وموردي الأليف.",
    },
    {
      id: "privacy",
      icon: ShieldCheck,
      email: siteConfig.contact.privacyEmail,
      titleEn: "Privacy & Data Protection",
      titleAr: "الخصوصية وحماية البيانات",
      descEn: "Data subject requests, export inquiries, or policy questions.",
      descAr: "طلبات الخصوصية، تصدير البيانات، أو استفسارات السياسات.",
    },
    {
      id: "safety",
      icon: AlertTriangle,
      email: siteConfig.contact.safetyEmail,
      titleEn: "Child Safety & Animal Welfare",
      titleAr: "سلامة الطفل والرفق بالحيوان",
      descEn: "Urgent reports regarding minor safety or animal welfare.",
      descAr: "بلاغات عاجلة بخصوص حماية القُصّر أو إساءة معاملة الحيوان.",
    },
    {
      id: "deletion",
      icon: Trash2,
      email: siteConfig.contact.deletionEmail,
      titleEn: "Account Deletion Support",
      titleAr: "طلبات حذف الحساب",
      descEn: "Assistance with permanent account and data erasure.",
      descAr: "مساعدة مباشرة في إتمام محو بيانات الحساب نهائيًا.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const selectedChannel = channels.find((c) => c.id === category) ?? channels[0];
  if (!selectedChannel) return null;

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-xs font-bold text-primary">
            <Mail className="w-3.5 h-3.5 text-primary" />
            <span>{lang === "ar" ? "قنوات التواصل الرسمية" : "Official Contact Channels"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            {lang === "ar" ? "تواصل مع فريق ونيسي" : "Get in Touch with Waneesi"}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {lang === "ar"
              ? "نحن هنا لمساعدتك والإجابة على أي استفسارات تتعلق بالمنصة ومجتمع الحيوانات الأليفة."
              : "We are here to assist you and answer any questions regarding our pet care ecosystem."}
          </p>
        </div>

        {/* Categorized Department Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((ch) => {
            const Icon = ch.icon;
            const isSelected = ch.id === category;
            return (
              <button
                type="button"
                key={ch.id}
                onClick={() => setCategory(ch.id)}
                className={`p-6 rounded-3xl border text-start transition-all duration-200 hover-lift space-y-3 ${
                  isSelected
                    ? "bg-card border-primary ring-2 ring-primary/20 shadow-md"
                    : "bg-card border-border hover:border-primary/40 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-primary hover:underline">
                    {lang === "ar" ? "اختر للرسالة" : "Select Topic"}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-foreground">
                    {lang === "ar" ? ch.titleAr : ch.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {lang === "ar" ? ch.descAr : ch.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t">
                  <a
                    href={`mailto:${ch.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs font-mono font-bold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    <span>{ch.email}</span>
                  </a>
                </div>
              </button>
            );
          })}
        </div>

        {/* Contact Message Form */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-card border p-8 sm:p-12 shadow-md space-y-8 text-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {lang === "ar" ? "إرسال رسالة مباشرة" : "Direct Message"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              {lang === "ar" ? "راسل قسم: " : "Messaging: "}{" "}
              <span className="text-primary">
                {lang === "ar" ? selectedChannel.titleAr : selectedChannel.titleEn}
              </span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {lang === "ar"
                ? `سيتم توجيه رسالتك مباشرة إلى: ${selectedChannel.email}`
                : `Your message will route directly to: ${selectedChannel.email}`}
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-primary/10 border border-primary/30 text-center space-y-4 animate-in zoom-in-95">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-xl font-black text-foreground">
                {lang === "ar" ? "تم إرسال رسالتك بنجاح!" : "Message Sent Successfully!"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                {lang === "ar"
                  ? `شكرًا لتواصلك معنا. سنرد على ${email} في أقرب وقت ممكن.`
                  : `Thank you for reaching out. Our team will review and reply to ${email} promptly.`}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {lang === "ar" ? "الاسم" : "Your Name"}
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder={lang === "ar" ? "اسمك" : "Full Name"}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">
                    {lang === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  {lang === "ar" ? "موضوع الرسالة" : "Subject"}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder={
                    lang === "ar" ? "موضوع استفسارك" : "Regarding your inquiry"
                  }
                  className="w-full px-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  {lang === "ar" ? "نص الرسالة" : "Message"}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder={
                    lang === "ar"
                      ? "اكتب تفاصيل استفسارك أو طلبك هنا..."
                      : "Provide details about your question or request..."
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
                  <span>{lang === "ar" ? "إرسال الرسالة" : "Send Message"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Official Pre-Launch Teaser Screen (Anchor: #download) */}
      <div className="mt-16">
        <DownloadCtaSection />
      </div>
    </div>
  );
}

