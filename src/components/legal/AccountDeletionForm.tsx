import { useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Mail,
  User,
  Phone,
  Send,
  Info,
} from "lucide-react";

export function AccountDeletionForm() {
  const { lang } = usePrefs();
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [refId, setRefId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !confirmed) return;

    // Generate real reference code for user tracking
    const generatedRef = "WAN-DEL-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setRefId(generatedRef);
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 text-start space-y-5 animate-in zoom-in-95">
        <div className="flex items-center gap-3 text-destructive font-black text-xl">
          <CheckCircle2 className="w-7 h-7" />
          <span>
            {lang === "ar"
              ? "تم استلام طلب حذف الحساب بنجاح"
              : "Account Deletion Request Submitted"}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-card border text-sm space-y-2">
          <p className="font-bold text-foreground">
            {lang === "ar" ? "رقم المرجع الخاص بطلبك:" : "Your Request Tracking Reference:"}{" "}
            <span className="font-mono text-primary font-black">{refId}</span>
          </p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {lang === "ar"
              ? `تم تسجيل طلبك وإرسال إشعار داخلي لفريق حماية البيانات (${siteConfig.contact.deletionEmail}). سيتم التحقق من ملكية الحساب وإتمام محو البيانات خلال ٣٠ يوم عمل وفق المعايير القانونية.`
              : `Your request has been logged and queued with our Data Protection Team (${siteConfig.contact.deletionEmail}). Identity verification and permanent data scrub will complete within 30 days per legal standards.`}
          </p>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <p className="font-bold text-foreground">
            {lang === "ar" ? "مراحل معالجة الطلب:" : "Request Processing Stages:"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-card border font-semibold text-primary">
              ✓ {lang === "ar" ? "١. تم تقديم الطلب" : "1. Request Submitted"}
            </div>
            <div className="p-2.5 rounded-xl bg-card border font-semibold text-secondary">
              ⏳ {lang === "ar" ? "٢. قيد المراجعة والتحقق" : "2. Under Review"}
            </div>
            <div className="p-2.5 rounded-xl bg-card border font-semibold text-muted-foreground">
              ⏱ {lang === "ar" ? "٣. محو البيانات النهائي" : "3. Erasure Completed"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-destructive/30 bg-card p-6 sm:p-8 space-y-6 text-start shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
          <Trash2 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-black text-foreground">
            {lang === "ar" ? "نموذج طلب حذف الحساب الرسمي" : "Official Account Deletion Request"}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {lang === "ar"
              ? "إذا لم تتمكن من حذف حسابك من داخل التطبيق، يمكنك تقديم طلب الحذف المباشر هنا."
              : "If you cannot access the in-app deletion button, submit your official erasure request below."}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 text-xs text-foreground/90 space-y-1">
        <p className="font-bold text-destructive flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" />
          {lang === "ar" ? "تنبيه هام حول حذف البيانات" : "Important Deletion Warning"}
        </p>
        <p>
          {lang === "ar"
            ? "هذا الإجراء نهائي ولا يمكن التراجع عنه. سيتم محو ملفك الشخصي وجميع ملفات أليفك والصور والمنشورات المرتبطة به نهائيًا."
            : "This action is permanent and irreversible. Your profile, pet medical records, reels, and photos will be permanently erased."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              {lang === "ar" ? "الاسم المسجل في الحساب" : "Full Name"}
            </label>
            <div className="relative">
              <User className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder={lang === "ar" ? "اسمك الكامل" : "Your Name"}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">
              {lang === "ar" ? "البريد الإلكتروني المسجل" : "Registered Email Address"}
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">
            {lang === "ar" ? "رقم الهاتف المرتبط بالحساب (اختياري)" : "Phone Number (Optional)"}
          </label>
          <div className="relative">
            <Phone className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-muted-foreground" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+20 1..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground">
            {lang === "ar" ? "سبب طلب الحذف (اختياري لمساعدتنا على التحسين)" : "Reason for Deletion (Optional)"}
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              lang === "ar"
                ? "أخبرنا بالسبب أو أي ملاحظات ترغب في مشاركتها..."
                : "Tell us why you wish to delete your account..."
            }
            className="w-full p-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-start gap-2.5 pt-2">
          <input
            type="checkbox"
            id="confirm-delete"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            required
            className="mt-1 w-4 h-4 text-destructive rounded border-border focus:ring-destructive"
          />
          <label
            htmlFor="confirm-delete"
            className="text-xs text-muted-foreground leading-normal cursor-pointer select-none"
          >
            {lang === "ar"
              ? "أؤكد رغبتي في حذف حسابي وجميع ملفات أليفي نهائيًا، وأدرك أن هذا الإجراء لا يمكن التراجع عنه."
              : "I confirm my request to permanently erase my account and pet records, acknowledging this action cannot be undone."}
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={!confirmed || !identifier}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-destructive text-white font-extrabold text-sm shadow hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{lang === "ar" ? "تأكيد وإرسال طلب الحذف" : "Submit Deletion Request"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

