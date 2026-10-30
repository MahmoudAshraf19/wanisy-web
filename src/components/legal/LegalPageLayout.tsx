import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { LegalDoc } from "@/lib/legal";
import {
  ShieldCheck,
  Calendar,
  FileText,
  Printer,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

type Props = {
  doc: LegalDoc;
  icon?: any;
  extraContent?: React.ReactNode;
};

export function LegalPageLayout({ doc, icon: Icon = FileText, extraContent }: Props) {
  const { lang } = usePrefs();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-foreground">{doc.title}</span>
        </div>

        {/* Legal Header Card */}
        <div className="rounded-3xl border bg-card p-8 sm:p-12 shadow-sm space-y-6 text-start">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                  {doc.title}
                </h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  <span>{doc.lastUpdated}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold text-foreground hover:bg-muted transition-colors"
            >
              <Printer className="w-4 h-4 text-primary" />
              <span>{lang === "ar" ? "طباعة الوثيقة" : "Print Document"}</span>
            </button>
          </div>

          {/* Intro paragraph */}
          <div className="p-5 rounded-2xl bg-muted/40 border text-sm sm:text-base text-foreground/90 leading-relaxed">
            <p>{doc.intro}</p>
          </div>

          {/* Sections */}
          <div className="space-y-10 pt-4">
            {doc.sections.map((section, idx) => (
              <div key={idx} className="space-y-3.5">
                <h2 className="text-xl font-black text-foreground border-b pb-2">
                  {section.h}
                </h2>

                <div className="space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.p.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="space-y-2 pt-2 text-sm text-foreground/90 list-disc list-inside">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Extra Content (e.g. Account Deletion Request Form) */}
          {extraContent && <div className="pt-8 border-t">{extraContent}</div>}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <ArrowIcon className="w-4 h-4" />
            <span>{lang === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

