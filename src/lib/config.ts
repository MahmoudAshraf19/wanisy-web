/**
 * Waneesi Centralized Platform Configuration
 * Single source of truth for branding, metadata, contacts, and legal entity details.
 * Placeholders are explicitly identified per project accuracy guidelines.
 */

export const siteConfig = {
  name: "Waneesi",
  nameAr: "ونيسي",
  taglineEn: "Your Pet's World. All in One Place.",
  taglineAr: "كل عالم أليفك في مكان واحد",
  subtaglineEn:
    "A modern global social and care ecosystem uniting pet parents, veterinarians, clinics, groomers, and pet stores in one connected community.",
  subtaglineAr:
    "اكتشف مجتمعًا متكاملاً يجمع أصحاب الحيوانات الأليفة، والأطباء، والعيادات، ومقدمي خدمات العناية، والمتاجر في منصة واحدة تنبض بالحياة والاهتمام.",

  // Brand Colors (from Flutter app_colors.dart)
  colors: {
    persianGreen: "#2A9D8F",
    sandyBrown: "#F4A261",
    saffron: "#E9C46A",
    burntSienna: "#E76F51",
    charcoal: "#264653",
    offWhite: "#FAFAFA",
    darkMain: "#12181B",
    darkSecondary: "#1B282E",
    darkSurface: "#22343B",
    darkText: "#F5F7F6",
    darkMuted: "#BAC8C6",
  },

  // Assets
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.png",

  // App Release Status (Configurable Coming Soon state per rule: never invent fake store links)
  appStore: {
    isLive: false,
    googlePlayUrl: "#coming-soon",
    appStoreUrl: "#coming-soon",
    statusTextEn: "Coming Soon to iOS and Android",
    statusTextAr: "قريبًا على متجري App Store و Google Play",
  },

  // Official Contact Endpoints & Legal Entity
  contact: {
    generalEmail: "contact@waneesi.app",
    supportEmail: "support@waneesi.app",
    privacyEmail: "privacy@waneesi.app",
    legalEmail: "legal@waneesi.app",
    safetyEmail: "safety@waneesi.app",
    partnersEmail: "partners@waneesi.app",
    deletionEmail: "deletion@waneesi.app",
  },

  // Legal & Compliance Info (placeholders clearly demarcated)
  legal: {
    entityName: "Waneesi Technologies Inc. (Operating Entity Placeholder)",
    entityNameAr: "شركة ونيسي للتقنية (قيد التسجيل الرسمي)",
    effectiveDate: "October 30, 2026",
    effectiveDateAr: "٣٠ أكتوبر ٢٠٢٦",
    jurisdiction: "Arab Republic of Egypt & Global International Standards",
    jurisdictionAr: "جمهورية مصر العربية والمعايير الدولية العامة",
    minimumAge: 13,
  },

  // Headquarters & Maps Configuration (Cairo, Egypt)
  headquarters: {
    cityEn: "Cairo",
    cityAr: "القاهرة",
    countryEn: "Egypt",
    countryAr: "جمهورية مصر العربية",
    addressEn: "Cairo, Egypt",
    addressAr: "القاهرة، جمهورية مصر العربية",
    latitude: 30.0444,
    longitude: 31.2357,
    googleMapsApiKey: "AIzaSyBNySylmn0-n0bDjurCjLod3MHUMeMm2IU",
    googleMapsUrl: "https://maps.google.com/?q=30.0444,31.2357",
    appleMapsUrl: "https://maps.apple.com/?q=30.0444,31.2357",
  },

  // Social Channels (official handles)
  socials: {
    instagram: "https://instagram.com/waneesi.app",
    twitter: "https://x.com/waneesi_app",
    tiktok: "https://tiktok.com/@waneesi.app",
    linkedin: "https://linkedin.com/company/waneesi",
  },
};

