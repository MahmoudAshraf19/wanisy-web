/**
 * Waneesi expansion plan — single source of truth for the "service area" map.
 *
 * Phase 1: the Arab world (22 Arab League countries) — official first launch
 * Phase 2: Europe
 * Phase 3: The Americas
 * Phase 4: The whole world
 *
 * `key` matches the ISO-3 keys used in `world-map-data.ts`.
 */

export type Phase = 1 | 2 | 3 | 4;

export type ArabGroupId = "north-africa" | "levant" | "gulf" | "horn";

export interface ArabCountry {
    key: string;
    iso2: string;
    en: string;
    ar: string;
    capEn: string;
    capAr: string;
    group: ArabGroupId;
}

export const ARAB_GROUPS: ReadonlyArray<{ id: ArabGroupId; en: string; ar: string }> = [
    { id: "north-africa", en: "North Africa & the Nile Valley", ar: "شمال أفريقيا ووادي النيل" },
    { id: "levant", en: "The Levant & Iraq", ar: "المشرق العربي" },
    { id: "gulf", en: "The Gulf & Arabian Peninsula", ar: "الخليج وشبه الجزيرة العربية" },
    { id: "horn", en: "Horn of Africa & Indian Ocean", ar: "القرن الأفريقي وجزر المحيط الهندي" },
];

export const ARAB_COUNTRIES: ReadonlyArray<ArabCountry> = [
    // North Africa & the Nile Valley (7)
    { key: "MAR", iso2: "ma", en: "Morocco", ar: "المغرب", capEn: "Rabat", capAr: "الرباط", group: "north-africa" },
    { key: "DZA", iso2: "dz", en: "Algeria", ar: "الجزائر", capEn: "Algiers", capAr: "الجزائر العاصمة", group: "north-africa" },
    { key: "TUN", iso2: "tn", en: "Tunisia", ar: "تونس", capEn: "Tunis", capAr: "تونس", group: "north-africa" },
    { key: "LBY", iso2: "ly", en: "Libya", ar: "ليبيا", capEn: "Tripoli", capAr: "طرابلس", group: "north-africa" },
    { key: "EGY", iso2: "eg", en: "Egypt", ar: "مصر", capEn: "Cairo", capAr: "القاهرة", group: "north-africa" },
    { key: "SDN", iso2: "sd", en: "Sudan", ar: "السودان", capEn: "Khartoum", capAr: "الخرطوم", group: "north-africa" },
    { key: "MRT", iso2: "mr", en: "Mauritania", ar: "موريتانيا", capEn: "Nouakchott", capAr: "نواكشوط", group: "north-africa" },

    // The Levant & Iraq (5)
    { key: "SYR", iso2: "sy", en: "Syria", ar: "سوريا", capEn: "Damascus", capAr: "دمشق", group: "levant" },
    { key: "LBN", iso2: "lb", en: "Lebanon", ar: "لبنان", capEn: "Beirut", capAr: "بيروت", group: "levant" },
    { key: "JOR", iso2: "jo", en: "Jordan", ar: "الأردن", capEn: "Amman", capAr: "عمّان", group: "levant" },
    { key: "PSE", iso2: "ps", en: "Palestine", ar: "فلسطين", capEn: "Jerusalem", capAr: "القدس", group: "levant" },
    { key: "IRQ", iso2: "iq", en: "Iraq", ar: "العراق", capEn: "Baghdad", capAr: "بغداد", group: "levant" },

    // The Gulf & Arabian Peninsula (7)
    { key: "SAU", iso2: "sa", en: "Saudi Arabia", ar: "السعودية", capEn: "Riyadh", capAr: "الرياض", group: "gulf" },
    { key: "ARE", iso2: "ae", en: "United Arab Emirates", ar: "الإمارات", capEn: "Abu Dhabi", capAr: "أبوظبي", group: "gulf" },
    { key: "QAT", iso2: "qa", en: "Qatar", ar: "قطر", capEn: "Doha", capAr: "الدوحة", group: "gulf" },
    { key: "KWT", iso2: "kw", en: "Kuwait", ar: "الكويت", capEn: "Kuwait City", capAr: "مدينة الكويت", group: "gulf" },
    { key: "BHR", iso2: "bh", en: "Bahrain", ar: "البحرين", capEn: "Manama", capAr: "المنامة", group: "gulf" },
    { key: "OMN", iso2: "om", en: "Oman", ar: "عُمان", capEn: "Muscat", capAr: "مسقط", group: "gulf" },
    { key: "YEM", iso2: "ye", en: "Yemen", ar: "اليمن", capEn: "Sana'a", capAr: "صنعاء", group: "gulf" },

    // Horn of Africa & Indian Ocean (3)
    { key: "SOM", iso2: "so", en: "Somalia", ar: "الصومال", capEn: "Mogadishu", capAr: "مقديشو", group: "horn" },
    { key: "DJI", iso2: "dj", en: "Djibouti", ar: "جيبوتي", capEn: "Djibouti", capAr: "جيبوتي", group: "horn" },
    { key: "COM", iso2: "km", en: "Comoros", ar: "جزر القمر", capEn: "Moroni", capAr: "موروني", group: "horn" },
];

export const ARAB_COUNT = ARAB_COUNTRIES.length; // 22

export interface PhaseCopy {
    /** Full name, e.g. "The Arab world" */
    name: string;
    /** Short name used in legends and overlays */
    short: string;
    /** Status label shown as a pill */
    tag: string;
    desc: string;
    points: string[];
}

export interface PhaseInfo {
    id: Phase;
    /** Brand-derived colour (persian green → saffron → sandy brown → burnt sienna) */
    color: string;
    /** Camera framing in degrees */
    view: { lon0: number; lon1: number; lat0: number; lat1: number };
    en: PhaseCopy;
    ar: PhaseCopy;
}

export const PHASES: ReadonlyArray<PhaseInfo> = [
    {
        id: 1,
        color: "#2A9D8F",
        view: { lon0: -20, lon1: 64, lat0: -14, lat1: 40 },
        ar: {
            name: "الوطن العربي",
            short: "الوطن العربي",
            tag: "الانطلاق الرسمي الأول",
            desc: "من المحيط الأطلسي إلى الخليج العربي: 22 دولة عربية في قارتي آسيا وأفريقيا هي نطاق عمل ونيسي الرسمي.",
            points: ["22 دولة عربية في آسيا وأفريقيا", "إدارة وعمليات ودعم من القاهرة على مدار الساعة"],
        },
        en: {
            name: "The Arab world",
            short: "Arab world",
            tag: "First official launch",
            desc: "From the Atlantic to the Arabian Gulf: 22 Arab countries across Asia and Africa make up Waneesi's official service area.",
            points: ["22 Arab countries across Asia and Africa", "Operations and support run from Cairo, 24/7"],
        },
    },
    {
        id: 2,
        color: "#E9C46A",
        view: { lon0: -30, lon1: 80, lat0: -14, lat1: 72 },
        ar: {
            name: "أوروبا",
            short: "أوروبا",
            tag: "المرحلة القادمة",
            desc: "بعد ترسيخ الانطلاق في الوطن العربي، تكون أوروبا وجهتنا التالية.",
            points: ["أول توسع خارج الوطن العربي", "يبدأ بعد استقرار الانطلاق الأول"],
        },
        en: {
            name: "Europe",
            short: "Europe",
            tag: "Up next",
            desc: "Once the Arab world is established, Europe is our next destination.",
            points: ["The first expansion beyond the Arab world", "Starts after the first launch is established"],
        },
    },
    {
        id: 3,
        color: "#F4A261",
        view: { lon0: -170, lon1: 70, lat0: -58, lat1: 76 },
        ar: {
            name: "الأمريكتان",
            short: "الأمريكتان",
            tag: "بعد أوروبا",
            desc: "ثم نصل إلى الأمريكتين، الشمالية والجنوبية، لنخدم مجتمعات جديدة من محبي الحيوانات الأليفة.",
            points: ["أمريكا الشمالية وأمريكا الجنوبية", "المرحلة الثالثة من خطة التوسع"],
        },
        en: {
            name: "The Americas",
            short: "The Americas",
            tag: "After Europe",
            desc: "Then on to North and South America, reaching new communities of pet lovers.",
            points: ["North America and South America", "The third stage of the expansion plan"],
        },
    },
    {
        id: 4,
        color: "#E76F51",
        view: { lon0: -180, lon1: 180, lat0: -58, lat1: 84 },
        ar: {
            name: "العالم كله",
            short: "العالم",
            tag: "الرؤية",
            desc: "وفي النهاية، ونيسي لكل من يحب حيوانًا أليفًا في أي مكان في العالم.",
            points: ["تغطية عالمية كاملة", "كل عالم أليفك في مكان واحد، أينما كنت"],
        },
        en: {
            name: "The whole world",
            short: "Worldwide",
            tag: "The vision",
            desc: "In the end, Waneesi is for everyone who loves a pet, anywhere in the world.",
            points: ["Full global coverage", "Your pet's whole world in one place, wherever you are"],
        },
    },
];

export const ARAB_BY_KEY: Record<string, ArabCountry> = Object.fromEntries(
    ARAB_COUNTRIES.map((c) => [c.key, c]),
);