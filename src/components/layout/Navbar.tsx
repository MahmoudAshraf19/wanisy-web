import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Smartphone,
  ChevronRight,
  PawPrint,
  Heart,
  Stethoscope,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const { lang, setLang, t, theme, toggleTheme } = usePrefs();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/features", label: t.nav.features },
    { href: "/for-professionals", label: t.nav.professionals },
    { href: "/location", label: t.nav.location },
    { href: "/contact", label: t.nav.contact },
  ];

  const handleDownloadClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/contact") {
      const el = document.getElementById("download");
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass border-b shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
            >
              <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105 border border-primary/20">
                <img
                  src={siteConfig.logoUrl}
                  alt={siteConfig.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-2xl tracking-tight text-foreground">
                    {lang === "ar" ? siteConfig.nameAr : siteConfig.name}
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground hidden sm:block">
                  {lang === "ar" ? siteConfig.taglineAr : siteConfig.taglineEn}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-foreground/80 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Controls */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher with Official Country Flag */}
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold text-foreground/80 hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
                title={lang === "en" ? "التبديل إلى العربية" : "Switch to English"}
              >
                <img
                  src={lang === "en" ? "/flags/flag-egypt.jpg" : "/flags/flag-britain.jpg"}
                  alt={lang === "en" ? "العربية" : "English"}
                  className="w-4 h-3 rounded-2xs object-cover border border-black/10 shadow-2xs"
                />
                <span>{lang === "en" ? "العربية" : "English"}</span>
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl border text-foreground/80 hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                title={theme === "dark" ? "Light Mode" : "Dark Mode"}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-accent" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </button>

              {/* Download App CTA: Navigates to official #download screen from any page */}
              <Link
                to="/contact"
                hash="download"
                onClick={handleDownloadClick}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-primary text-primary-foreground shadow-md hover:bg-primary/95 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>{t.nav.download}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-accent text-charcoal ml-1">
                  Soon
                </span>
              </Link>
            </div>

            {/* Mobile Hamburger & Controls */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold text-foreground hover:bg-muted transition-colors"
                aria-label="Toggle Language"
              >
                <img
                  src={lang === "en" ? "/flags/flag-egypt.jpg" : "/flags/flag-britain.jpg"}
                  alt={lang === "en" ? "العربية" : "English"}
                  className="w-4 h-3 rounded-2xs object-cover border border-black/10"
                />
                <span>{lang === "en" ? "عربي" : "EN"}</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl border text-foreground"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-accent" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border bg-card text-foreground focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass border-b shadow-xl px-4 pt-4 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold ${
                      isActive
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t">
              <Link
                to="/contact"
                hash="download"
                onClick={handleDownloadClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>{t.nav.download}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-charcoal">
                  Soon
                </span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

