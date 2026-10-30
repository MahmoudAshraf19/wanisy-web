export interface CountryData {
  id: string;
  nameAr: string;
  nameEn: string;
  capitalAr: string;
  capitalEn: string;
  flag: string; // emoji flag
  region: "north-africa" | "gulf" | "levant" | "horn-islands";
  regionAr: string;
  regionEn: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
  status: "active" | "next" | "future";
  statusTextAr: string;
  statusTextEn: string;
  petCommunityHighlightAr: string;
  petCommunityHighlightEn: string;
  smallCountry?: boolean;
  badgeOffsetX?: number;
  badgeOffsetY?: number;
}

export interface RoadmapStage {
  id: "arab-world" | "europe" | "americas" | "worldwide";
  stageNumber: number;
  titleAr: string;
  titleEn: string;
  badgeAr: string;
  badgeEn: string;
  descAr: string;
  descEn: string;
  status: "live" | "upcoming" | "future" | "vision";
  statusAr: string;
  statusEn: string;
  themeColor: string;
  accentBorder: string;
  accentGlow: string;
  totalCountriesTextAr: string;
  totalCountriesTextEn: string;
  camera: {
    minLng: number;
    maxLng: number;
    minLat: number;
    maxLat: number;
    zoom: number;
  };
}

export const roadmapStages: RoadmapStage[] = [
  {
    id: "arab-world",
    stageNumber: 1,
    titleAr: "الوطن العربي (22 دولة عربية)",
    titleEn: "The Arab World (22 Countries)",
    badgeAr: "الانطلاق الرسمي الأول • نشط الآن",
    badgeEn: "Official Launch Phase 1 • Active Now",
    descAr:
      "تغطية كاملة وشاملة لكافة الدول العربية الـ 22. شبكة متكاملة لربط مربي الحيوانات الأليفة بأفضل العيادات، الفنادق، وخدمات الإنقاذ والتبني مع تعريب طبي دقيق.",
    descEn:
      "Full coverage across all 22 Arab countries. A unified ecosystem connecting pet owners to verified clinics, pet hotels, adoptions, and specialized care.",
    status: "live",
    statusAr: "الانطلاق الأول المعتمد",
    statusEn: "Official Launch Active",
    themeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    accentBorder: "border-emerald-500",
    accentGlow: "rgba(16, 185, 129, 0.25)",
    totalCountriesTextAr: "22 دولة عربية كاملة",
    totalCountriesTextEn: "22 Arab Nations",
    camera: {
      minLng: -20,
      maxLng: 65,
      minLat: -5,
      maxLat: 38,
      zoom: 1,
    },
  },
  {
    id: "europe",
    stageNumber: 2,
    titleAr: "القارة الأوروبية (Europe)",
    titleEn: "European Continent",
    badgeAr: "المرحلة القادمة • قريباً",
    badgeEn: "Upcoming Expansion • Coming Soon",
    descAr:
      "توسيع خدمات ونيسي لتشمل أهم العواصم الأوروبية، مع الامتثال الكامل لقوانين جواز السفر البيطري الأوروبي (EU Pet Passport) ورعاية الرفق بالحيوان.",
    descEn:
      "Expanding Waneesi to major European hubs with full EU Pet Passport alignment, multi-lingual interface (EN/FR/DE), and cross-border pet health logs.",
    status: "upcoming",
    statusAr: "قيد التحضير والتجهيز",
    statusEn: "In Preparation",
    themeColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    accentBorder: "border-sky-500",
    accentGlow: "rgba(14, 165, 233, 0.25)",
    totalCountriesTextAr: "أهم العواصم والمدن الأوروبية",
    totalCountriesTextEn: "Key European Metropolitan Hubs",
    camera: {
      minLng: -15,
      maxLng: 40,
      minLat: 34,
      maxLat: 65,
      zoom: 1.15,
    },
  },
  {
    id: "americas",
    stageNumber: 3,
    titleAr: "الأمريكتين (North & South America)",
    titleEn: "The Americas",
    badgeAr: "المرحلة اللاحقة • المرحلة 3",
    badgeEn: "Phase 3 • In Roadmap",
    descAr:
      "ربط مجتمعات الحيوانات الأليفة في الولايات المتحدة وكندا وأمريكا اللاتينية بمنظومة رعاية ذكية ومتكاملة وتسهيل السفر والتنقل بالأليف.",
    descEn:
      "Connecting pet parents in North & South America with smart veterinary discovery, digital vaccination records, and traveler pet care networks.",
    status: "future",
    statusAr: "مخطط التوسع الدولي",
    statusEn: "International Roadmap",
    themeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    accentBorder: "border-amber-500",
    accentGlow: "rgba(245, 158, 11, 0.25)",
    totalCountriesTextAr: "أمريكا الشمالية والجنوبية",
    totalCountriesTextEn: "North & South America",
    camera: {
      minLng: -130,
      maxLng: -30,
      minLat: -55,
      maxLat: 60,
      zoom: 0.85,
    },
  },
  {
    id: "worldwide",
    stageNumber: 4,
    titleAr: "العالم كله (Global Worldwide)",
    titleEn: "Worldwide Global Network",
    badgeAr: "الرؤية الشاملة • لكل أليف في العالم",
    badgeEn: "Global Vision • For Every Pet Worldwide",
    descAr:
      "شبكة عالمية موحدة خالية من الحدود تخدم كل مربي حيوان أليف وطبيب بيطري ومركز إنقاذ في أي مكان حول الكوكب، بثقافة الرفق والرعاية الرقمية.",
    descEn:
      "A borderless worldwide network serving every pet parent, vet, and shelter on Earth with unified compassionate care and AI animal health assistance.",
    status: "vision",
    statusAr: "الهدف والرسالة النهائية",
    statusEn: "Ultimate Mission",
    themeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    accentBorder: "border-purple-500",
    accentGlow: "rgba(168, 85, 247, 0.25)",
    totalCountriesTextAr: "جميع قارات ودول العالم",
    totalCountriesTextEn: "All Continents & Nations",
    camera: {
      minLng: -140,
      maxLng: 150,
      minLat: -60,
      maxLat: 75,
      zoom: 0.7,
    },
  },
];

// All 22 Arab Countries in Phase 1
export const arabCountriesList: CountryData[] = [
  // 1. Egypt (HQ)
  {
    id: "eg",
    nameAr: "مصر",
    nameEn: "Egypt",
    capitalAr: "القاهرة (مقر الإدارة)",
    capitalEn: "Cairo (Main HQ)",
    flag: "🇪🇬",
    region: "north-africa",
    regionAr: "شمال أفريقيا",
    regionEn: "North Africa",
    lat: 30.0444,
    lng: 31.2357,
    isHQ: true,
    status: "active",
    statusTextAr: "المقر الرئيسي للإدارة والتشغيل",
    statusTextEn: "Central Management & Tech HQ",
    petCommunityHighlightAr: "مقر الإدارة، مركز العمليات التقنية، وشبكة العيادات والفنادق الكبرى.",
    petCommunityHighlightEn: "Global operations HQ, engineering center, and nationwide veterinary network.",
  },

  // 2. Saudi Arabia
  {
    id: "sa",
    nameAr: "المملكة العربية السعودية",
    nameEn: "Saudi Arabia",
    capitalAr: "الرياض",
    capitalEn: "Riyadh",
    flag: "🇸🇦",
    region: "gulf",
    regionAr: "الخليج العربي",
    regionEn: "Arabian Gulf",
    lat: 24.7136,
    lng: 46.6753,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "خدمات الرعاية البيطرية، فنادق الإقامة، ومجتمعات مربي الأليف في الرياض وجدة والشرقية.",
    petCommunityHighlightEn: "Veterinary care, pet boarding hotels, and pet communities in Riyadh and Jeddah.",
  },

  // 3. United Arab Emirates
  {
    id: "ae",
    nameAr: "الإمارات العربية المتحدة",
    nameEn: "United Arab Emirates",
    capitalAr: "أبوظبي / دبي",
    capitalEn: "Abu Dhabi / Dubai",
    flag: "🇦🇪",
    region: "gulf",
    regionAr: "الخليج العربي",
    regionEn: "Arabian Gulf",
    lat: 24.4539,
    lng: 54.3773,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "شراكات الفنادق الفاخرة، العيادات الدولية، ومراكز السبا المعتمدة.",
    petCommunityHighlightEn: "Luxury boarding hotels, certified international clinics, and pet spas.",
  },

  // 4. Qatar
  {
    id: "qa",
    nameAr: "قطر",
    nameEn: "Qatar",
    capitalAr: "الدوحة",
    capitalEn: "Doha",
    flag: "🇶🇦",
    region: "gulf",
    regionAr: "الخليج العربي",
    regionEn: "Arabian Gulf",
    lat: 25.2854,
    lng: 51.531,
    smallCountry: true,
    badgeOffsetX: 18,
    badgeOffsetY: -12,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "دليل مستشفيات الطوارئ ومجتمع ملاك الحيوانات الأليفة في الدوحة.",
    petCommunityHighlightEn: "Emergency vet directory and active pet owners network in Doha.",
  },

  // 5. Kuwait
  {
    id: "kw",
    nameAr: "الكويت",
    nameEn: "Kuwait",
    capitalAr: "الكويت",
    capitalEn: "Kuwait City",
    flag: "🇰🇼",
    region: "gulf",
    regionAr: "الخليج العربي",
    regionEn: "Arabian Gulf",
    lat: 29.3759,
    lng: 47.9774,
    smallCountry: true,
    badgeOffsetX: 15,
    badgeOffsetY: -16,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "شبكة التبني الإنساني والعيادات المتخصصة ومتاجر المستلزمات.",
    petCommunityHighlightEn: "Adoption rescue network, specialty clinics, and pet supplies.",
  },

  // 6. Bahrain
  {
    id: "bh",
    nameAr: "البحرين",
    nameEn: "Bahrain",
    capitalAr: "المنامة",
    capitalEn: "Manama",
    flag: "🇧🇭",
    region: "gulf",
    regionAr: "الخليج العربي",
    regionEn: "Arabian Gulf",
    lat: 26.2285,
    lng: 50.586,
    smallCountry: true,
    badgeOffsetX: 22,
    badgeOffsetY: 4,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "خدمات الرعاية السريعة والمجتمع البيطري الرقمي في المنامة والمحرق.",
    petCommunityHighlightEn: "Fast veterinary access and digital pet community in Manama.",
  },

  // 7. Oman
  {
    id: "om",
    nameAr: "سلطنة عمان",
    nameEn: "Oman",
    capitalAr: "مسقط",
    capitalEn: "Muscat",
    flag: "🇴🇲",
    region: "gulf",
    regionAr: "الخليج العربي",
    regionEn: "Arabian Gulf",
    lat: 23.588,
    lng: 58.3829,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "دليل العيادات البيطرية ومسارات الحدائق الصديقة للأليف في مسقط وظفار.",
    petCommunityHighlightEn: "Clinics directory and pet-friendly trails in Muscat and Dhofar.",
  },

  // 8. Jordan
  {
    id: "jo",
    nameAr: "الأردن",
    nameEn: "Jordan",
    capitalAr: "عمّان",
    capitalEn: "Amman",
    flag: "🇯🇴",
    region: "levant",
    regionAr: "المشرق العربي",
    regionEn: "The Levant",
    lat: 31.9454,
    lng: 35.9284,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "مجتمع إنقاذ ورعاية الحيوانات، وسجلات التطعيم الرقمية بعمّان وإربد.",
    petCommunityHighlightEn: "Rescue community, vet partnerships, and digital passports in Amman.",
  },

  // 9. Lebanon
  {
    id: "lb",
    nameAr: "لبنان",
    nameEn: "Lebanon",
    capitalAr: "بيروت",
    capitalEn: "Beirut",
    flag: "🇱🇧",
    region: "levant",
    regionAr: "المشرق العربي",
    regionEn: "The Levant",
    lat: 33.8938,
    lng: 35.5018,
    smallCountry: true,
    badgeOffsetX: -22,
    badgeOffsetY: -12,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "تنسيق جهود الإنقاذ والأطباء البيطريين وأماكن الاستضافة المعتمدة.",
    petCommunityHighlightEn: "Coordinated rescue efforts and verified vet clinics across Beirut.",
  },

  // 10. Iraq
  {
    id: "iq",
    nameAr: "العراق",
    nameEn: "Iraq",
    capitalAr: "بغداد",
    capitalEn: "Baghdad",
    flag: "🇮🇶",
    region: "levant",
    regionAr: "المشرق العربي",
    regionEn: "The Levant",
    lat: 33.3152,
    lng: 44.3661,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "دليل الأطباء البيطريين المرخصين ومجتمعات نوادي الحيوانات في بغداد وأربيل والبصرة.",
    petCommunityHighlightEn: "Licensed veterinarians and growing pet clubs in Baghdad and Erbil.",
  },

  // 11. Palestine
  {
    id: "ps",
    nameAr: "فلسطين",
    nameEn: "Palestine",
    capitalAr: "القدس",
    capitalEn: "Jerusalem",
    flag: "🇵🇸",
    region: "levant",
    regionAr: "المشرق العربي",
    regionEn: "The Levant",
    lat: 31.7683,
    lng: 35.2137,
    smallCountry: true,
    badgeOffsetX: -24,
    badgeOffsetY: 8,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "خدمات التبني المجاني والدعم البيطري الاستشاري وتنبيهات الأليف المفقود.",
    petCommunityHighlightEn: "Ethical adoptions, vet telehealth advice, and lost-pet SOS radar.",
  },

  // 12. Syria
  {
    id: "sy",
    nameAr: "سوريا",
    nameEn: "Syria",
    capitalAr: "دمشق",
    capitalEn: "Damascus",
    flag: "🇸🇾",
    region: "levant",
    regionAr: "المشرق العربي",
    regionEn: "The Levant",
    lat: 34.8021,
    lng: 38.9968,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "دليل العيادات والرعاية البيطرية التطوعية وإنقاذ الحيوانات الأليفة.",
    petCommunityHighlightEn: "Volunteer care initiatives and medical record preservation.",
  },

  // 13. Yemen
  {
    id: "ye",
    nameAr: "اليمن",
    nameEn: "Yemen",
    capitalAr: "صنعاء / عدن",
    capitalEn: "Sanaa / Aden",
    flag: "🇾🇪",
    region: "gulf",
    regionAr: "الخليج العربي",
    regionEn: "Arabian Peninsula",
    lat: 15.3694,
    lng: 44.191,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "التوجيه الصحي الرقمي واستشارات التطعيمات وخدمات الطوارئ.",
    petCommunityHighlightEn: "Digital pet health guidance, vaccination logs, and emergency tips.",
  },

  // 14. Sudan
  {
    id: "sd",
    nameAr: "السودان",
    nameEn: "Sudan",
    capitalAr: "الخرطوم",
    capitalEn: "Khartoum",
    flag: "🇸🇩",
    region: "north-africa",
    regionAr: "شمال وشرق أفريقيا",
    regionEn: "North & East Africa",
    lat: 15.5007,
    lng: 32.5599,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "السجلات الطبية السحابية وحفظ بيانات التطعيمات والتواصل مع الأطباء.",
    petCommunityHighlightEn: "Cloud health records, vaccine tracking, and veterinary consults.",
  },

  // 15. Libya
  {
    id: "ly",
    nameAr: "ليبيا",
    nameEn: "Libya",
    capitalAr: "طرابلس",
    capitalEn: "Tripoli",
    flag: "🇱🇾",
    region: "north-africa",
    regionAr: "شمال أفريقيا",
    regionEn: "North Africa",
    lat: 26.3351,
    lng: 17.2283,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "دليل العيادات والصيدليات البيطرية ونوادي مربي الكلاب والقطط في طرابلس وبنغازي.",
    petCommunityHighlightEn: "Clinics and pharmacies locator for pet lovers in Tripoli and Benghazi.",
  },

  // 16. Tunisia
  {
    id: "tn",
    nameAr: "تونس",
    nameEn: "Tunisia",
    capitalAr: "تونس",
    capitalEn: "Tunis",
    flag: "🇹🇳",
    region: "north-africa",
    regionAr: "شمال أفريقيا (المغرب العربي)",
    regionEn: "North Africa / Maghreb",
    lat: 36.8065,
    lng: 10.1815,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "مجتمع رعاية متقدم، دعم ثنائي اللغة (العربية والفرنسية)، وخدمات الفنادق.",
    petCommunityHighlightEn: "Bilingual French/Arabic interface, hotel boarding, and certified groomers.",
  },

  // 17. Algeria
  {
    id: "dz",
    nameAr: "الجزائر",
    nameEn: "Algeria",
    capitalAr: "الجزائر",
    capitalEn: "Algiers",
    flag: "🇩🇿",
    region: "north-africa",
    regionAr: "شمال أفريقيا (المغرب العربي)",
    regionEn: "North Africa / Maghreb",
    lat: 28.0339,
    lng: 1.6596,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "أكبر رقعة جغرافية عربية مشمولة بشبكة التبني والعيادات وخدمات الأليف.",
    petCommunityHighlightEn: "Largest geographical territory connected to vet and adoption networks.",
  },

  // 18. Morocco
  {
    id: "ma",
    nameAr: "المملكة المغربية",
    nameEn: "Morocco",
    capitalAr: "الرباط / الدار البيضاء",
    capitalEn: "Rabat / Casablanca",
    flag: "🇲🇦",
    region: "north-africa",
    regionAr: "شمال أفريقيا (المغرب العربي)",
    regionEn: "North Africa / Maghreb",
    lat: 31.7917,
    lng: -7.0926,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "شبكة عيادات واسعة في الدار البيضاء ومراكش والرباط مع دعم اللغة الفرنسية.",
    petCommunityHighlightEn: "Extensive veterinary clinics in Casablanca and Marrakech with French support.",
  },

  // 19. Mauritania
  {
    id: "mr",
    nameAr: "موريتانيا",
    nameEn: "Mauritania",
    capitalAr: "نواكشوط",
    capitalEn: "Nouakchott",
    flag: "🇲🇷",
    region: "north-africa",
    regionAr: "شمال وغرب أفريقيا",
    regionEn: "North & West Africa",
    lat: 20.7856,
    lng: -10.9408,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "نظام التنبيهات الذكي وبطاقات التطعيمات الرقمية وتتبع صحة الحيوان.",
    petCommunityHighlightEn: "Smart health alerts and digital medical cards in Nouakchott.",
  },

  // 20. Somalia
  {
    id: "so",
    nameAr: "الصومال",
    nameEn: "Somalia",
    capitalAr: "مقديشو",
    capitalEn: "Mogadishu",
    flag: "🇸🇴",
    region: "horn-islands",
    regionAr: "القرن الأفريقي والجزر",
    regionEn: "Horn of Africa",
    lat: 5.1521,
    lng: 46.1996,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "دليل المراكز البيطرية والخدمات الطارئة والتوعية برعاية الأليف.",
    petCommunityHighlightEn: "Veterinary discovery and community pet care awareness in Mogadishu.",
  },

  // 21. Djibouti
  {
    id: "dj",
    nameAr: "جيبوتي",
    nameEn: "Djibouti",
    capitalAr: "جيبوتي",
    capitalEn: "Djibouti City",
    flag: "🇩🇯",
    region: "horn-islands",
    regionAr: "القرن الأفريقي والجزر",
    regionEn: "Horn of Africa",
    lat: 11.8251,
    lng: 42.5903,
    smallCountry: true,
    badgeOffsetX: 16,
    badgeOffsetY: -8,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "خدمات الجواز الصحي والسفر وتواصل مباشر مع العيادات البيطرية.",
    petCommunityHighlightEn: "Pet travel passports and direct vet communications.",
  },

  // 22. Comoros
  {
    id: "km",
    nameAr: "جزر القمر",
    nameEn: "Comoros",
    capitalAr: "موروني",
    capitalEn: "Moroni",
    flag: "🇰🇲",
    region: "horn-islands",
    regionAr: "القرن الأفريقي والجزر",
    regionEn: "Indian Ocean Islands",
    lat: -11.6455,
    lng: 43.3333,
    smallCountry: true,
    badgeOffsetX: 20,
    badgeOffsetY: 12,
    status: "active",
    statusTextAr: "مشمولة بالانطلاق الأول",
    statusTextEn: "Active in Phase 1 Launch",
    petCommunityHighlightAr: "منظومة رقمية شاملة لحفظ السجلات وتوثيق التطعيمات وطلب الاستشارات.",
    petCommunityHighlightEn: "Digital veterinary consulting and vaccination record storage in Moroni.",
  },
];

// European Preview Hubs for Stage 2
export const europeHubs = [
  { nameAr: "المملكة المتحدة", nameEn: "United Kingdom", cityAr: "لندن", cityEn: "London", lat: 51.5074, lng: -0.1278, flag: "🇬🇧" },
  { nameAr: "فرنسا", nameEn: "France", cityAr: "باريس", cityEn: "Paris", lat: 48.8566, lng: 2.3522, flag: "🇫🇷" },
  { nameAr: "ألمانيا", nameEn: "Germany", cityAr: "برلين", cityEn: "Berlin", lat: 52.52, lng: 13.405, flag: "🇩🇪" },
  { nameAr: "إسبانيا", nameEn: "Spain", cityAr: "مدريد", cityEn: "Madrid", lat: 40.4168, lng: -3.7038, flag: "🇪🇸" },
  { nameAr: "إيطاليا", nameEn: "Italy", cityAr: "روما", cityEn: "Rome", lat: 41.9028, lng: 12.4964, flag: "🇮🇹" },
  { nameAr: "هولندا", nameEn: "Netherlands", cityAr: "أمستردام", cityEn: "Amsterdam", lat: 52.3676, lng: 4.9041, flag: "🇳🇱" },
];

// Americas Preview Hubs for Stage 3
export const americasHubs = [
  { nameAr: "الولايات المتحدة", nameEn: "United States", cityAr: "نيويورك / واشنطن", cityEn: "New York / DC", lat: 40.7128, lng: -74.006, flag: "🇺🇸" },
  { nameAr: "كندا", nameEn: "Canada", cityAr: "تورونتو", cityEn: "Toronto", lat: 43.6532, lng: -79.3832, flag: "🇨🇦" },
  { nameAr: "البرازيل", nameEn: "Brazil", cityAr: "ساو باولو", cityEn: "São Paulo", lat: -23.5505, lng: -46.6333, flag: "🇧🇷" },
];

