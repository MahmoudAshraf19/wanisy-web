import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Heart,
  Globe,
  Sun,
  Moon,
  ShieldCheck,
  Mail,
  Stethoscope,
  Scissors,
  Store,
  Compass,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const { lang, setLang, t, theme, toggleTheme } = usePrefs();

  return (
    <footer className="border-t bg-card text-foreground transition-colors duration-200">
      {/* Upper Subtle Banner */}
      <div className="border-b bg-muted/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-base text-foreground">
                {lang === "ar" ? siteConfig.taglineAr : siteConfig.taglineEn}
              </p>
              <p className="text-xs text-muted-foreground">
                {lang === "ar"
                  ? "المنصة الاجتماعية والطبية التي تجمع كل عالم الأليف."
                  : "The premier social and healthcare ecosystem for pets and their people."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium">
              {lang === "ar" ? "اللغة:" : "Language:"}
            </span>
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold hover:bg-background transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>{lang === "en" ? "العربية" : "English"}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border hover:bg-background transition-colors ml-2"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-accent" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 inline-block">
              <div className="w-11 h-11 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center p-1.5 border border-primary/20">
                <img
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-foreground">
                  {lang === "ar" ? siteConfig.nameAr : siteConfig.name}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {lang === "ar" ? siteConfig.taglineAr : siteConfig.taglineEn}
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t.footer.description}
            </p>

            {/* Love Quote */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/15 text-xs font-bold text-foreground">
              <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
              <span>{t.footer.loveQuote}</span>
            </div>

            {/* Contact Email */}
            <div className="pt-2">
              <a
                href={`mailto:${siteConfig.contact.generalEmail}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>{siteConfig.contact.generalEmail}</span>
              </a>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              {t.footer.ecosystemTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "الخلاصة الاجتماعية والريلز" : "Pet Feed & Reels"}
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "العيادات ودليل الأطباء" : "Vet & Clinic Discovery"}
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "سوق ومستلزمات الأليف" : "Pet Marketplace"}
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "خدمات وصالونات العناية" : "Grooming & Wellness"}
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "طوارئ الأليف المفقود" : "Lost & Found SOS"}
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "التبني الإنساني والمسؤول" : "Ethical Pet Adoption"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Professionals */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              {lang === "ar" ? "الشركاء والأعمال" : "For Professionals"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/for-professionals"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "للأطباء البيطريين" : "For Veterinarians"}
                </Link>
              </li>
              <li>
                <Link
                  to="/for-professionals"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "للعيادات والمستشفيات" : "For Veterinary Clinics"}
                </Link>
              </li>
              <li>
                <Link
                  to="/for-professionals"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "لمتاجر الأليف والموردين" : "For Pet Stores"}
                </Link>
              </li>
              <li>
                <Link
                  to="/for-professionals"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "للعلامات التجارية" : "For Pet Brands"}
                </Link>
              </li>
              <li>
                <Link
                  to="/for-professionals"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "لمختصي العناية والسبا" : "For Pet Groomers"}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary font-bold hover:underline transition-colors"
                >
                  {lang === "ar" ? "طلب انضمام شريك" : "Partner Application"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              {t.footer.legalTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
                </Link>
              </li>
              <li>
                <Link
                  to="/community-guidelines"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "إرشادات المجتمع" : "Community Guidelines"}
                </Link>
              </li>
              <li>
                <Link
                  to="/child-safety"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "معايير سلامة الأطفال" : "Child Safety Standards"}
                </Link>
              </li>
              <li>
                <Link
                  to="/delete-account"
                  className="text-destructive font-semibold hover:underline transition-colors"
                >
                  {lang === "ar" ? "حذف الحساب والبيانات" : "Account Deletion"}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {lang === "ar" ? "الدعم والتواصل" : "Support & Contact"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mt-12 p-4 rounded-2xl bg-muted/50 border text-xs text-muted-foreground leading-relaxed flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <p>{t.footer.disclaimer}</p>
        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} ({siteConfig.nameAr}). {t.footer.rights}
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:underline">
              {lang === "ar" ? "الخصوصية" : "Privacy"}
            </Link>
            <Link to="/terms-and-conditions" className="hover:underline">
              {lang === "ar" ? "الشروط" : "Terms"}
            </Link>
            <Link to="/child-safety" className="hover:underline">
              {lang === "ar" ? "سلامة القُصّر" : "Child Safety"}
            </Link>
            <Link to="/delete-account" className="hover:underline">
              {lang === "ar" ? "حذف الحساب" : "Erasure"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

