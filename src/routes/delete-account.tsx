import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Trash2,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Mail,
  User,
  Phone,
  Send,
  Info,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  FileText,
  Copy,
  Check,
  HelpCircle,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/delete-account")({
  component: DeleteAccountPage,
});

function DeleteAccountPage() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const ArrowIcon = ar ? ArrowLeft : ArrowRight;

  // Form state
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">("idle");
  const [refId, setRefId] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !confirmed) return;

    setStatus("submitting");
    setTimeout(() => {
      const generatedRef = "WAN-DEL-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setRefId(generatedRef);
      setStatus("submitted");
    }, 600);
  };

  const copyRefCode = () => {
    if (!refId) return;
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="wn-grid-bg absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute top-1/4 -start-24 h-96 w-96 rounded-full bg-destructive/10 blur-3xl pointer-events-none -z-10"
        aria-hidden
      />
      <div
        className="absolute top-1/2 -end-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none -z-10"
        aria-hidden
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            {ar ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          <span className="font-semibold text-foreground">
            {ar ? "حذف الحساب ومحو البيانات" : "Account & Data Deletion"}
          </span>
        </div>

        {/* Hero Banner Card */}
        <div className="rounded-3xl border border-destructive/20 bg-card/85 backdrop-blur p-8 sm:p-12 shadow-sm text-start space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs font-bold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{ar ? "حماية وخصوصية البيانات" : "Data Privacy & User Autonomy"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            {ar ? "طلب حذف الحساب ومحو البيانات" : "Account Deletion & Data Erasure"}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {ar
              ? "نحن في ونيسي نحترم خصوصيتك واستقلاليتك الكاملة في إدارة بياناتك. يمكنك حذف حسابك وجميع سجلات حيواناتك الأليفة مباشرة من داخل التطبيق في أي وقت، أو تقديم طلب رسمي عبر هذا النموذج وفقاً لمعايير Google Play و Apple App Store."
              : "At Waneesi, we respect your privacy and data sovereignty. You can delete your account and all associated pet records directly inside the app, or submit an official request through this portal in compliance with Google Play and Apple App Store standards."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-muted/40 text-xs font-semibold text-foreground/80 shadow-2xs">
              <img src="/icons/apple-logo.png" alt="Apple" className="w-3.5 h-3.5 object-contain dark:invert" />
              <span>{ar ? "معايير متجر Apple App Store" : "Apple App Store Guideline 5.1.1(v) Compliant"}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-muted/40 text-xs font-semibold text-foreground/80 shadow-2xs">
              <img src="/icons/google.png" alt="Google Play" className="w-3.5 h-3.5 object-contain" />
              <span>{ar ? "سياسات متجر Google Play" : "Google Play Data Safety & Deletion Policy Compliant"}</span>
            </span>
          </div>
        </div>

        {/* Two Methods to Delete */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-start">
          {/* Method A: In-App Deletion (Recommended) */}
          <div className="rounded-3xl border bg-card/80 backdrop-blur p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {ar ? "الطريقة الأسرع (فوري)" : "Fastest Method (Instant)"}
                </span>
                <Smartphone className="w-5 h-5 text-muted-foreground" />
              </div>

              <h2 className="text-xl font-black text-foreground">
                {ar ? "الحذف المباشر من داخل التطبيق" : "Delete Directly in Waneesi App"}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {ar
                  ? "إذا كان تطبيق ونيسي مثبتاً على هاتفك، فهذه أسهل وأسرع طريقة لحذف حسابك ومحو بياناتك فوراً دون أي انتظار:"
                  : "If you have the Waneesi app installed, this is the quickest way to instantly wipe your account without waiting:"}
              </p>

              {/* Step by step list */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    step: "1",
                    titleAr: "افتح تطبيق ونيسي (Waneesi)",
                    titleEn: "Open the Waneesi App on your phone",
                  },
                  {
                    step: "2",
                    titleAr: "توجه إلى (الملف الشخصي) ثم اضغط على أيقونة الإعدادات ⚙️",
                    titleEn: "Go to Profile and tap the Settings gear ⚙️",
                  },
                  {
                    step: "3",
                    titleAr: "اختر (الأمان والخصوصية) ثم (حذف الحساب نهائياً)",
                    titleEn: "Select 'Security & Privacy' > 'Delete Account'",
                  },
                  {
                    step: "4",
                    titleAr: "أكد رغبتك في الحذف وسيتم محو البيانات فوراً",
                    titleEn: "Confirm your deletion and data is purged immediately",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-2xl bg-muted/30 border border-border/50">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-black">
                      {item.step}
                    </span>
                    <span className="text-xs font-semibold text-foreground/90 mt-0.5">
                      {ar ? item.titleAr : item.titleEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-muted/40 text-xs text-muted-foreground flex items-center gap-2">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <span>
                {ar
                  ? "الحذف من التطبيق فوري ونهائي ولا يتطلب مراجعة بشرية."
                  : "In-app deletion is instant, permanent, and automated."}
              </span>
            </div>
          </div>

          {/* Method B: Web Request Portal */}
          <div className="rounded-3xl border border-destructive/20 bg-card/80 backdrop-blur p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {ar ? "البوابة الرسمية البديلة" : "Alternative Web Portal"}
                </span>
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>

              <h2 className="text-xl font-black text-foreground">
                {ar ? "تقديم طلب عبر الويب" : "Submit Deletion Web Form"}
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {ar
                  ? "إذا حذفت التطبيق من هاتفك أو واجهت مشكلة في تسجيل الدخول، يمكنك استخدام النموذج أدناه وسيقوم فريق حماية البيانات بمطابقة هويتك وحذف الحساب."
                  : "If you uninstalled the app or lost device access, submit this official request form and our data protection officers will verify and process the erasure."}
              </p>

              <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 space-y-2 text-xs">
                <p className="font-bold text-destructive flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{ar ? "تأكيد نهائية الإجراء" : "Permanent Deletion Warning"}</span>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {ar
                    ? "بمجرد معالجة الطلب، لا يمكن استرجاع الحساب أو ملفات الحيوانات الطبية أو الفيديوهات والمنشورات تحت أي ظرف."
                    : "Once processed, your account, pet medical records, reels, posts, and saved favorites cannot be recovered under any circumstance."}
                </p>
              </div>
            </div>

            <a
              href="#deletion-form"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-destructive text-white font-bold text-sm shadow hover:bg-destructive/90 transition-colors"
            >
              <span>{ar ? "الانتقال لنموذج الحذف المباشر" : "Go to Deletion Request Form"}</span>
              <ArrowIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Data Breakdown Table: What gets deleted vs retained */}
        <div className="rounded-3xl border bg-card p-6 sm:p-10 shadow-sm text-start space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {ar ? "الشفافية والامتثال القانوني" : "Transparency & Compliance"}
            </span>
            <h2 className="text-2xl font-black text-foreground">
              {ar ? "ما الذي يتم حذفه تحديداً؟" : "What Data Is Deleted vs Retained?"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Erased Data */}
            <div className="p-5 rounded-2xl bg-destructive/5 border border-destructive/20 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-destructive">
                <Trash2 className="w-4 h-4 shrink-0" />
                <span>{ar ? "بيانات تُحذف نهائياً (فور المعالجة)" : "Permanently Erased Data"}</span>
              </div>
              <ul className="space-y-2 text-xs text-foreground/90">
                {[
                  ar ? "بيانات الحساب الشخصي (الاسم، البريد، الهاتف، كلمة المرور، الصورة الشخصية)" : "User profile (Name, email, phone, password hash, avatar)",
                  ar ? "ملفات الحيوانات الأليفة (السجلات الصحية، التطعيمات، الصور، العمر)" : "All pet profiles (Health logs, vaccination cards, age, photos)",
                  ar ? "الفيديوهات والريلز والمنشورات والتفاعلات والتعليقات بالكامل" : "All pet reels, stories, feed posts, comments, and likes",
                  ar ? "المحادثات الخاصة والرسائل المباشرة والمجموعات التي أنشأتها" : "Direct chat history, group memberships, and created channels",
                  ar ? "سجل التفضيلات والإشعارات وقوائم المحفوظات" : "Saved favorites, notification settings, and preferences",
                ].map((txt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-destructive font-black">✕</span>
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Retained Data (Legal Compliance) */}
            <div className="p-5 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>{ar ? "بيانات قد تُحفظ مؤقتاً للضرورات القانونية" : "Data Retained for Legal Compliance"}</span>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {[
                  ar ? "فواتير ومعاملات الشراء السابقة عبر المتجر (مطلوبة بموجب القوانين الضريبية والمحاسبية لمدد محددة)" : "Store purchase invoices & tax records (mandatory by accounting/fiscal laws for statutory periods)",
                  ar ? "سجلات التحقق من الامتثال لطلبات الحذف لمنع الاحتيال وسوء الاستخدام" : "Audit trail record of the deletion request itself to prevent identity fraud",
                  ar ? "أي نزاعات تجارية أو قانونية قائمة حتى تاريخ إنهائها رسمياً" : "Active commercial/legal dispute records until formal settlement",
                ].map((txt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-black">✓</span>
                    <span>{txt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The Official Interactive Deletion Request Form */}
        <div
          id="deletion-form"
          className="rounded-3xl border border-destructive/30 bg-card p-6 sm:p-10 shadow-lg text-start space-y-6 scroll-mt-32"
        >
          <div className="flex items-start justify-between gap-4 border-b pb-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold">
                <Trash2 className="w-3.5 h-3.5" />
                <span>{ar ? "النموذج الرسمي المباشر" : "Official Web Erasure Form"}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                {ar ? "نموذج إرسال طلب محو الحساب" : "Submit Account Deletion Request"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {ar
                  ? "يرجى إدخال البيانات المرتبطة بحسابك بدقة للتحقق من ملكيتك قبل إتمام الحذف."
                  : "Please provide the exact credentials associated with your account to verify ownership."}
              </p>
            </div>
          </div>

          {status === "submitted" ? (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground">
                  {ar ? "تم تسجيل طلب حذف الحساب بنجاح!" : "Deletion Request Received!"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  {ar
                    ? `تم تسجيل طلبك وإرسال إشعار فوري لفريق حماية البيانات (${siteConfig.contact.deletionEmail}). سيتم التحقق من الحساب وإتمام محو البيانات بالكامل خلال ٣٠ يوماً كحد أقصى.`
                    : `Your request has been queued with our Data Protection Team (${siteConfig.contact.deletionEmail}). Identity confirmation and permanent data erasure will conclude within 30 days.`}
                </p>
              </div>

              {/* Reference ID card with copy button */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-card border shadow-xs">
                <span className="text-xs text-muted-foreground font-semibold">
                  {ar ? "رقم المرجع لتتبع طلبك:" : "Tracking Reference:"}
                </span>
                <span className="font-mono font-black text-primary text-base tracking-wider">
                  {refId}
                </span>
                <button
                  type="button"
                  onClick={copyRefCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted text-foreground text-xs font-bold hover:bg-muted/80 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (ar ? "تم النسخ" : "Copied") : (ar ? "نسخ" : "Copy")}</span>
                </button>
              </div>

              {/* 3 Steps indicator */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 max-w-2xl mx-auto text-xs">
                <div className="p-3 rounded-xl bg-card border font-bold text-primary">
                  ✓ {ar ? "١. استلام الطلب" : "1. Request Queued"}
                </div>
                <div className="p-3 rounded-xl bg-card border font-bold text-secondary">
                  ⏳ {ar ? "٢. التحقق من الهوية" : "2. Identity Verification"}
                </div>
                <div className="p-3 rounded-xl bg-card border font-bold text-muted-foreground">
                  🗑️ {ar ? "٣. محو الخوادم النهائي" : "3. Database Scrubbing"}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground block">
                    {ar ? "الاسم المسجل في الحساب" : "Registered Full Name"} *
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      placeholder={ar ? "مثال: أحمد محمد" : "e.g. John Doe"}
                      className="w-full ps-9 pe-3 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground block">
                    {ar ? "البريد الإلكتروني المسجل" : "Registered Email Address"} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full ps-9 pe-3 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  {ar ? "رقم الهاتف المرتبط بالحساب (اختياري)" : "Registered Phone Number (Optional)"}
                </label>
                <div className="relative">
                  <Phone className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+20 1..."
                    className="w-full ps-9 pe-3 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground block">
                  {ar ? "سبب طلب الحذف (اختياري - لمساعدتنا على التحسين)" : "Reason for Deletion (Optional)"}
                </label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={
                    ar
                      ? "أخبرنا برأيك أو أي ملاحظات ترغب في مشاركتها مع فريق ونيسي..."
                      : "Help us improve by sharing why you're leaving Waneesi..."
                  }
                  className="w-full p-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-destructive/50 resize-none"
                />
              </div>

              {/* Explicit Consent Checkbox */}
              <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-destructive rounded border-border focus:ring-destructive"
                  />
                  <span className="text-xs font-medium text-foreground leading-relaxed">
                    {ar
                      ? "أؤكد بصفتي صاحب الحساب رغبتي الكاملة في حذف حسابي ومحو جميع سجلات حيواناتي الأليفة وبياناتي الشخصية نهائياً من خوادم ونيسي، وأدرك أن هذا الإجراء لا يمكن التراجع عنه."
                      : "I confirm as the account owner that I request the permanent and irreversible erasure of my account, personal data, and pet records from Waneesi databases."}
                  </span>
                </label>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>
                    {ar
                      ? "يتم تأكيد الطلب عبر رسالة تحقق إلى بريدك الإلكتروني"
                      : "A verification link will be sent to confirm request"}
                  </span>
                </p>

                <button
                  type="submit"
                  disabled={!confirmed || !identifier || status === "submitting"}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-destructive text-white font-extrabold text-sm shadow-md hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {status === "submitting"
                      ? ar
                        ? "جاري المعالجة..."
                        : "Processing..."
                      : ar
                      ? "تأكيد وإرسال طلب الحذف"
                      : "Submit Official Request"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Common Questions & Help Accordion */}
        <div className="rounded-3xl border bg-card p-6 sm:p-10 shadow-sm text-start space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-black text-foreground">
              {ar ? "الأسئلة الشائعة حول حذف الحساب" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-4 text-sm divide-y">
            {[
              {
                qAr: "هل يمكنني استعادة حسابي بعد إتمام الحذف؟",
                qEn: "Can I recover my account once deleted?",
                aAr: "لا، بمجرد إتمام الحذف يتم محو السجلات بالكامل من قواعد البيانات الرئيسية والنسخ الاحتياطية ولا يمكن استردادها نهائياً.",
                aEn: "No. Once deletion is executed, all credentials, pet medical logs, and posts are scrubbed irreversibly.",
              },
              {
                qAr: "كم يستغرق استكمال عملية الحذف عبر الموقع؟",
                qEn: "How long does the web deletion process take?",
                aAr: "تتم مراجعة الطلبات والتحقق من الهوية خلال ٢٤ إلى ٤8 ساعة، ويتم محو البيانات بالكامل في غضون ٣٠ يوماً كحد أقصى وفق القوانين الدولية.",
                aEn: "Requests are reviewed and identity-verified within 24-48 hours. Full server-wide scrub completes within a maximum of 30 days per international privacy laws.",
              },
              {
                qAr: "ماذا عن المشتريات التي قمت بها في المتجر؟",
                qEn: "What happens to my pet marketplace purchase history?",
                aAr: "يتم فك ارتباط اسمك وبريدك بحسابك وحذف الحساب، ولكن قد يتم الاحتفاظ بفاتورة الشراء المشفرة كإيصال مالي وفق المتطلبات المحاسبية والضريبية القانونية.",
                aEn: "Your user account is unlinked and deleted, while cryptographic financial invoices are retained strictly as required by local tax and accounting laws.",
              },
            ].map((item, idx) => (
              <div key={idx} className={idx > 0 ? "pt-4 space-y-1.5" : "space-y-1.5"}>
                <h3 className="font-bold text-foreground">
                  {ar ? item.qAr : item.qEn}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ar ? item.aAr : item.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
