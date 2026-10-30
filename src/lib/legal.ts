import type { Lang } from "./i18n";
import { siteConfig } from "./config";

export type LegalDoc = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: { h: string; p: string[]; bullets?: string[] }[];
};

export type LegalKey = "privacy" | "terms" | "guidelines" | "childSafety" | "deletion";

export const legalDocs: Record<LegalKey, Record<Lang, LegalDoc>> = {
  privacy: {
    en: {
      title: "Privacy Policy",
      lastUpdated: `Effective Date: ${siteConfig.legal.effectiveDate}`,
      intro: `At Waneesi ("we", "us", "our", operated by ${siteConfig.legal.entityName}), we are deeply committed to protecting your personal information and respecting your privacy choices. This Privacy Policy details what information we collect when you use the Waneesi mobile application and official website, how that data is utilized, how it is secured, and your legal rights under applicable privacy legislation.`,
      sections: [
        {
          h: "1. Introduction & Operational Scope",
          p: [
            "This Privacy Policy applies to the Waneesi mobile application, the waneesi.app website, and all associated services, features, and tools provided by Waneesi.",
            "Waneesi operates as a connected technology platform uniting pet parents, licensed veterinarians, veterinary clinics, pet groomers, and pet merchants.",
          ],
        },
        {
          h: "2. Information Users Voluntarily Provide",
          p: [
            "When creating and managing your account, you provide us with specific information required to deliver personalized pet care and community features:",
          ],
          bullets: [
            "Account Registration: Your full name, email address, mobile phone number, account password, and chosen profile picture.",
            "Pet Profiles: Pet name, species (dog, cat, bird, etc.), breed, date of birth or estimated age, gender, neutering status, medical notes, vaccination dates, and pet photos.",
            "User-Generated Content: Photos, videos (Pet Reels), captions, stories, comments, likes, and interactions posted to community feeds.",
            "Direct Inquiries: Information provided when contacting customer support, submitting partnership applications, or requesting appointments with service providers.",
          ],
        },
        {
          h: "3. Information Collected Automatically",
          p: [
            "When you interact with our applications and web services, we automatically collect technical diagnostics necessary for operational reliability and security:",
          ],
          bullets: [
            "Device Information: Hardware model, operating system version, unique device identifiers, and network connection type.",
            "Log & Diagnostic Data: IP address, access timestamps, app crashes, performance metrics, and error traces.",
            "Push Notification Tokens: Device tokens used exclusively to deliver transactional alerts, appointment reminders, and emergency community notices.",
          ],
        },
        {
          h: "4. Precise Location Information & Permissions",
          p: [
            "Location access is strictly optional and only requested when you interact with location-dependent features:",
            "Lost & Found SOS Radar: To alert pet owners situated within a geographic vicinity when an animal goes missing.",
            "Nearby Providers: To calculate geographic proximity to veterinary clinics, emergency hospitals, groomers, and pet stores on the interactive map.",
            "You may decline or revoke location permissions at any time through your mobile device system settings without losing access to non-location social and profile features.",
          ],
        },
        {
          h: "5. How Your Information Is Used",
          p: [
            "We process your data strictly to fulfill legitimate operational, contractual, and community purposes:",
          ],
          bullets: [
            "To deliver core services: managing pet profiles, publishing Reels and feeds, and facilitating communication with veterinary clinics and groomers.",
            "To safeguard platform integrity: investigating animal cruelty reports, preventing fraud, and enforcing Community Guidelines.",
            "To transmit essential notifications: medical appointment status, emergency lost-pet alerts, and account security updates.",
            "To improve performance: resolving technical bugs, optimizing media delivery, and auditing system reliability.",
          ],
        },
        {
          h: "6. Data Sharing & Third-Party Service Providers",
          p: [
            "Waneesi NEVER sells, rents, or monetizes personal user data to third-party data brokers or advertisers.",
            "We share limited data only with vetted service providers performing operational functions under strict confidentiality agreements:",
          ],
          bullets: [
            "Cloud Infrastructure & Storage: Trusted enterprise cloud providers hosting our database, media files, and application backends.",
            "Healthcare & Service Providers: When you submit an appointment request, your contact and pet summary are transmitted to the chosen clinic or groomer.",
            "Push Notification Relays: Apple Push Notification service (APNs) and Google Firebase Cloud Messaging (FCM).",
            "Legal & Regulatory Authorities: Only when explicitly required by a lawful court order, warrant, or mandatory statutory regulation.",
          ],
        },
        {
          h: "7. Public vs. Private Content Visibility",
          p: [
            "Content published to the public Social Feed or public Reels is visible to other registered community members.",
            "Private group discussions are visible solely to accepted members of that specific group.",
            "Direct messages, private medical notes, and account credentials are never visible to the public.",
          ],
        },
        {
          h: "8. Data Security Architecture",
          p: [
            "We implement modern administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, loss, or alteration.",
            "All network transmissions use TLS 1.3/1.2 cryptographic protocols. Sensitive credentials such as passwords are stored using salted cryptographic hashing.",
          ],
        },
        {
          h: "9. Data Retention & Permanent Erasure",
          p: [
            "We retain personal data only for as long as your account remains active or as required to deliver our services.",
            "Upon receiving an account deletion request, all identifying personal information, pet records, uploaded media, and social posts are permanently erased within 30 calendar days.",
            "Anonymized aggregated statistics that cannot identify any individual may be retained for historical platform analytics.",
          ],
        },
        {
          h: "10. User Rights & Privacy Controls",
          p: [
            "Regardless of your jurisdiction, Waneesi provides comprehensive privacy controls to every user:",
          ],
          bullets: [
            "Right to Access & Portability: Request an export of the personal information associated with your account.",
            "Right to Rectification: Correct or update your profile details and pet records directly within the mobile app.",
            "Right to Erasure (Right to be Forgotten): Permanently delete your account and associated records via app settings or our external web deletion tool.",
            "Right to Restrict or Object: Opt out of non-essential communications and revoke device permissions at will.",
          ],
        },
        {
          h: "11. Children's Privacy (COPPA & Child Protection)",
          p: [
            "Waneesi is designed for pet parents, families, and animal care professionals. The platform is not directed to children under 13 years of age.",
            "We do not knowingly collect personal information from children under 13 without verifiable parental consent.",
            "If we discover that personal information has been collected from a child under 13 without appropriate consent, we take immediate steps to terminate the account and erase the data.",
          ],
        },
        {
          h: "12. Privacy Contact & Data Protection Officer",
          p: [
            `If you have questions, complaints, or requests regarding this Privacy Policy, please contact our dedicated Privacy Team at: ${siteConfig.contact.privacyEmail}.`,
          ],
        },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: `تاريخ السريان: ${siteConfig.legal.effectiveDateAr}`,
      intro: `في ونيسي ("نحن"، "المنصة"، تديرها ${siteConfig.legal.entityNameAr})، نلتزم التزامًا صارمًا بحماية بياناتك الشخصية واحترام خيارات خصوصيتك. توضح هذه السياسة طبيعة المعلومات التي نجمعها عند استخدامك لتطبيق ونيسي وموقعنا الإلكتروني، وكيفية استخدامها وتأمينها، وحقوقك القانونية الكاملة.`,
      sections: [
        {
          h: "١. المقدمة ونطاق العمل",
          p: [
            "تسري هذه السياسة على تطبيق ونيسي للهواتف الذكية، وموقع waneesi.app، وكافة الخدمات والخصائص التابعة لمنظومة ونيسي.",
            "يعمل ونيسي كمنصة تقنية متكاملة تربط أصحاب الحيوانات الأليفة بالأطباء البيطريين المرخصين، والعيادات، وصالونات العناية، والمتاجر.",
          ],
        },
        {
          h: "٢. المعلومات التي يقدمها المستخدم طواعية",
          p: [
            "عند إنشاء حسابك وإدارته، تقدم لنا بيانات ضرورية لتقديم الرعاية المخصصة والميزات التفاعلية:",
          ],
          bullets: [
            "بيانات الحساب: الاسم الكامل، عنوان البريد الإلكتروني، رقم الهاتف المحمول، كلمة المرور، وصورة الملف الشخصي.",
            "ملفات الأليف: اسم الأليف، نوعه (كلب، قط، طائر، إلخ)، سلالته، تاريخ ميلاده، جنسه، حالته الصحية وسجل التطعيمات وصوره الخاصة.",
            "المحتوى المنشور: الصور، وفيديوهات الريلز، والقصص اليومية، والتعليقات، والتفاعلات المنشورة في الخلاصة المجتمعية.",
            "التواصل المباشر: المعلومات المقدمة عند التواصل مع الدعم الفني، أو تقديم طلبات الانضمام المهني، أو طلب حجز موعد مع العيادات وصالونات العناية.",
          ],
        },
        {
          h: "٣. المعلومات المجموعة تلقائيًا",
          p: [
            "أثناء تفاعلك مع التطبيق والخدمات الرقمية، نجمع بيانات تقنية وتشخيصية لضمان استقرار وأمان المنصة:",
          ],
          bullets: [
            "بيانات الجهاز: طراز الهاتف، إصدار نظام التشغيل، المعرفات التقنية الفريدة للجهاز، ونوع الاتصال بالشبكة.",
            "سجلات التشغيل والأعطال: عنوان IP، توقيتات الاستخدام، تقارير الأعطال البرمجية وسجلات معالجة الأخطاء.",
            "رموز الإشعارات: معرفات الإشعارات الفورية المستخدمة حصريًا لإرسال تنبيهات المواعيد وبلاغات الفقد الطارئة.",
          ],
        },
        {
          h: "٤. بيانات الموقع الجغرافي الدقيق والأذونات",
          p: [
            "صلاحية الموقع اختيارية بالكامل ولا تُطلب إلا عند تفعيل الميزات الجغرافية:",
            "بلاغات الأليف المفقود (SOS): لتنبيه مستخدمي ونيسي الموجودين في النطاق الجغرافي القريب من مكان الفقد.",
            "مقدمو الخدمات القريبون: لحساب المسافة الجغرافية بينك وبين أقرب عيادة بيطرية، مستشفى طوارئ، أو متجر مستلزمات أليف.",
            "يمكنك إلغاء إذن الوصول للموقع في أي وقت من إعدادات هاتفك دون أن تفقد حق استخدام باقي الميزات الاجتماعية والملفات الشخصية.",
          ],
        },
        {
          h: "٥. أوجه استخدام بياناتك",
          p: [
            "نعالج بياناتك لأغراض تشغيلية وتطويرية محددة وقانونية:",
          ],
          bullets: [
            "تقديم الخدمات الأساسية: إدارة ملفات الأليف، نشر المحتوى، وتسهيل التواصل وطلب المواعيد مع العيادات والمراكز المتخصصة.",
            "حماية أمان المنصة: التحقيق في بلاغات الإساءة للحيوان، مكافحة الاحتيال، وتطبيق إرشادات المجتمع الأخلاقية.",
            "إرسال الإشعارات الضرورية: تأكيدات المواعيد، تنبيهات الطوارئ للأليف المفقود، وإشعارات أمان الحساب.",
            "التطوير التقني: إصلاح المشكلات البرمجية، تحسين كفاءة عرض الوسائط، ومراجعة جودة الخدمة.",
          ],
        },
        {
          h: "٦. مشاركة البيانات ومزودو الخدمات",
          p: [
            "نحن في ونيسي لا نبيع أو نؤجر أو نتاجر ببياناتك الشخصية لأي جهات إعلانية أو وسطاء بيانات على الإطلاق.",
            "نشارك بيانات محددة فقط مع جهات موثوقة تقدم خدمات تشغيلية خاضعة لعقود سرية مشددة:",
          ],
          bullets: [
            "البنية التحتية السحابية: شركات استضافة سحابية عالمية معتمدة لحفظ قواعد البيانات والوسائط.",
            "مقدمو الرعاية الصحية: عند طلبك موعدًا، تُرسل بيانات الاتصال وملخص الأليف إلى العيادة أو صالون العناية المختار.",
            "خدمات ترحيل الإشعارات: أنظمة Apple APNs و Google Firebase لإيصال التنبيهات الضرورية.",
            "السلطات القضائية والتنظيمية: فقط عند وجود أمر قضائي رسمي أو إلزام قانوني نافذ.",
          ],
        },
        {
          h: "٧. ظهور المحتوى العام والخاص",
          p: [
            "المحتوى المنشور في الخلاصة العامة أو الريلز مرئي لكافة أعضاء المجتمع المسجلين.",
            "نقاشات المجموعات الخاصة تقتصر رؤيتها على الأعضاء المقبولين في تلك المجموعة حصريًا.",
            "المحادثات المباشرة، والملاحظات الطبية الخاصة، وكلمات المرور لا تكون متاحة للعامة نهائيًا.",
          ],
        },
        {
          h: "٨. حماية وأمن البيانات",
          p: [
            "نطبق أعلى المعايير الفنية والتقنية لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الفقد.",
            "كافة الاتصالات الرقمية مشفرة ببروتوكولات TLS 1.3/1.2، ويتم تشفير كلمات المرور باستخدام خوارزميات تجزئة معقدة.",
          ],
        },
        {
          h: "٩. مدة الاحتفاظ بالبيانات والحذف النهائي",
          p: [
            "نحتفظ بالبيانات الشخصية طالما كان حسابك نشطًا أو بالقدر اللازم لتقديم خدمات المنصة.",
            "عند تقديم طلب حذف الحساب، تُحذف كافة البيانات التعريفية، ملفات الأليف، الصور، والمنشورات نهائيًا خلال ٣٠ يوم عمل.",
            "البيانات الإحصائية المجمعة والمجهولة التي لا يمكن أن تحدد هوية أي شخص قد تظل محفوظة لأغراض التحليل العام للمنصة.",
          ],
        },
        {
          h: "١٠. حقوق المستخدم والتحكم في الخصوصية",
          p: [
            "يحق لكل مستخدم في ونيسي التمتع بكامل حقوق الخصوصية الرقمية:",
          ],
          bullets: [
            "حق الاطلاع وتصدير البيانات: طلب نسخة من بياناتك الشخصية المسجلة على المنصة.",
            "حق التصحيح: تعديل وتحديث بياناتك وملفات أليفك مباشرة من التطبيق.",
            "حق المحو (الحذف النهائي): حذف حسابك وكافة سجلاته نهائيًا عبر التطبيق أو صفحة حذف الحساب على الموقع.",
            "حق الاعتراض: إلغاء أذونات الهاتف وضبط تفضيلات الإشعارات في أي وقت.",
          ],
        },
        {
          h: "١١. خصوصية الأطفال وحماية القُصّر",
          p: [
            "تطبيق ونيسي موجه لأصحاب الحيوانات الأليفة والعائلات والمتخصصين، ولا نوجه خدماتنا للأطفال دون سن ١٣ عامًا.",
            "لا نجمع عن قصد بيانات شخصية من أطفال دون سن ١٣ دون موافقة مسبقة ومثبتة من ولي الأمر.",
            "في حال تبين جمع بيانات من طفل دون السن القانوني دون موافقة ولي الأمر، يتم حذف الحساب وبياناته فورًا.",
          ],
        },
        {
          h: "١٢. التواصل مع مسؤول حماية البيانات",
          p: [
            `لأية استفسارات أو طلبات خاصة بسياسة الخصوصية، يرجى التواصل مع فريق الخصوصية لدينا عبر: ${siteConfig.contact.privacyEmail}.`,
          ],
        },
      ],
    },
  },
  terms: {
    en: {
      title: "Terms & Conditions",
      lastUpdated: `Effective Date: ${siteConfig.legal.effectiveDate}`,
      intro: `Welcome to Waneesi. By accessing or using our mobile application, official website, or any affiliated services, you agree to be legally bound by these Terms and Conditions. Please review them thoroughly before creating an account or accessing our services.`,
      sections: [
        {
          h: "1. Acceptance of Terms & Eligibility",
          p: [
            "By registering for or using Waneesi, you confirm that you are at least 13 years of age, or have reached the legal age of majority in your jurisdiction.",
            "Users below the age of majority may only use Waneesi under the direct supervision and with the explicit consent of a parent or legal guardian.",
          ],
        },
        {
          h: "2. The Nature of the Waneesi Platform",
          p: [
            "Waneesi operates as a digital communications and discovery platform connecting pet parents, veterinary clinics, independent licensed veterinarians, groomers, pet stores, and pet brands.",
            "Waneesi itself is not a veterinary clinic, medical practitioner, animal hospital, or direct retail seller.",
          ],
        },
        {
          h: "3. Veterinary Medical Disclaimer",
          p: [
            "CRITICAL: The content, articles, community discussions, and provider directories available through Waneesi are for educational, lifestyle, and discovery purposes only.",
            "Waneesi DOES NOT provide veterinary medical diagnoses, treatment plans, or prescription medicines.",
            "Information displayed within the app does not substitute for an in-person clinical examination by a licensed veterinarian. In case of a pet health emergency, immediately transport your animal to the nearest veterinary medical hospital.",
          ],
        },
        {
          h: "4. Strict Animal Welfare Standards & Prohibited Conduct",
          p: [
            "Animal welfare is the non-negotiable core of Waneesi. We maintain an absolute ZERO-TOLERANCE policy towards:",
          ],
          bullets: [
            "Any content depicting, encouraging, or promoting animal abuse, cruelty, torture, fighting, neglect, or illegal hunting.",
            "The illegal trade, unauthorized sale, or trafficking of protected, wild, or endangered animal species.",
            "Unlicensed, abusive, or harmful animal breeding operations (puppy mills/kitten mills).",
            "Harmful or unsubstantiated medical advice, fraudulent miracle cures, or procedures endangering animal life.",
            "Fraudulent adoption listings, fake rescue donation appeals, or scams targeting compassionate animal lovers.",
          ],
        },
        {
          h: "5. User Accounts & Security",
          p: [
            "You are responsible for maintaining the confidentiality of your account credentials and password.",
            "You agree to notify Waneesi immediately of any unauthorized access or security breaches involving your account.",
          ],
        },
        {
          h: "6. User-Generated Content & Platform License",
          p: [
            "You retain full intellectual property ownership of photos, videos, Reels, and text you upload to Waneesi.",
            "By posting content to public areas, you grant Waneesi a non-exclusive, royalty-free, worldwide license to host, display, reproduce, and distribute that content within the Waneesi ecosystem to deliver our services.",
          ],
        },
        {
          h: "7. Independent Professionals, Clinics & Stores",
          p: [
            "Veterinarians, veterinary clinics, pet groomers, and pet merchants operating on Waneesi are independent third parties.",
            "Each professional service provider is solely responsible for their clinical licensing, veterinary procedures, product warranties, pricing, and consumer service standards.",
          ],
        },
        {
          h: "8. Lost & Found Announcements",
          p: [
            "The Lost & Found feature is provided as a community awareness broadcast tool. Waneesi does not guarantee pet recovery, provide physical tracking services, or deploy location tracking devices.",
            "Users must submit only truthful, accurate descriptions of missing or found pets.",
          ],
        },
        {
          h: "9. Account Suspension & Termination",
          p: [
            "Waneesi reserves the right to suspend or permanently terminate any account that violates these Terms, harms animal welfare, engages in harassment, or threatens community safety.",
          ],
        },
        {
          h: "10. Limitation of Liability & Governing Law",
          p: [
            "To the maximum extent permitted by applicable law, Waneesi shall not be liable for indirect, incidental, or consequential damages resulting from platform use or interactions with independent service providers.",
            `These terms shall be governed by and construed in accordance with the laws of ${siteConfig.legal.jurisdiction}.`,
            `For legal inquiries, contact: ${siteConfig.contact.legalEmail}.`,
          ],
        },
      ],
    },
    ar: {
      title: "الشروط والأحكام",
      lastUpdated: `تاريخ السريان: ${siteConfig.legal.effectiveDateAr}`,
      intro: `أهلاً بك في ونيسي. بالوصول إلى تطبيق ونيسي للهاتف المحمول أو موقعنا الرسمي أو استخدام أي من خدماتنا، فإنك توافق على الالتزام القانوني الكامل بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل إنشاء حسابك.`,
      sections: [
        {
          h: "١. قبول الشروط والأهلية القانونية",
          p: [
            "بإنشاء حسابك أو استخدام ونيسي، فإنك تقر بأن عمرك لا يقل عن ١٣ عامًا، أو أنك بلغت سن الرشد القانوني في بلد إقامتك.",
            "لا يجوز لمن هم دون السن القانوني استخدام المنصة إلا بإشراف مباشر وموافقة صريحة من ولي الأمر أو الوصي القانوني.",
          ],
        },
        {
          h: "٢. طبيعة منصة ونيسي",
          p: [
            "يعمل ونيسي كمنصة تقنية وتواصلية لربط أصحاب ومربي الحيوانات بالعيادات البيطرية، والأطباء المستقلين، وصالونات العناية، والمتاجر.",
            "ونيسي بحد ذاته ليس عيادة بيطرية، ولا ممارسًا طبيًا، ولا مستشفى حيوانات، ولا متجر تجزئة مباشر للمنتجات.",
          ],
        },
        {
          h: "٣. إخلاء المسؤولية الطبية البيطرية",
          p: [
            "تنبيه مهم: المحتوى المنشور، والنقاشات المجتمعية، وأدلة الأطباء في ونيسي مخصصة لأغراض الاستكشاف والتثقيف ونمط الحياة فقط.",
            "لا يقدم ونيسي تشخيصات طبية بيطرية، ولا خطط علاج، ولا وصفات دوائية.",
            "المعلومات المتوفرة في التطبيق لا تغني بأي حال عن الفحص السريري المباشر لدى طبيب بيطري مرخص. في حالات الطوارئ الصحية الحرجة، يجب نقل الأليف فورًا إلى أقرب مستشفى بيطري.",
          ],
        },
        {
          h: "٤. معايير الرفق بالحيوان والسلوكيات المحظورة",
          p: [
            "الرفق بالحيوان هو الركيزة الأساسية وغير القابلة للنقاش في ونيسي. نطبق سياسة حظر قاطع وفوري ضد:",
          ],
          bullets: [
            "أي محتوى يصور أو يشجع أو يروج لإيذاء الحيوانات، أو تعذيبها، أو مصارعتها، أو إهمالها، أو الصيد الجائر غير المشروع.",
            "الاتجار غير القانوني بالحيوانات البرية أو المهددة بالانقراض أو بيعها دون ترخيص رسمي.",
            "أنشطة التكاثر الجائر والتجاري المسيء للحيوانات (Puppy/Kitten Mills).",
            "تقديم نصائح علاجية مضللة أو وصفات وهمية خطرة تعرض حياة الحيوان للخطر.",
            "إعلانات التبني المزيفة، أو طلبات التبرعات الاحتيالية، أو استغلال عواطف محبي الحيوان.",
          ],
        },
        {
          h: "٥. أمن الحساب وكلمة المرور",
          p: [
            "أنت مسؤول بالكامل عن الحفاظ على سرية بيانات تسجيل دخولك وكلمة المرور الخاصة بك.",
            "توافق على إخطار فريق ونيسي فورًا بأي اختراق أمني أو وصول غير مصرح به لحسابك.",
          ],
        },
        {
          h: "٦. المحتوى الذي ينشئه المستخدم والترخيص",
          p: [
            "تحتفظ بكامل حقوق الملكية الفكرية للصور والفيديوهات والنصوص التي تنشرها في ونيسي.",
            "بنشرك المحتوى في المناطق العامة، فإنك تمنح ونيسي ترخيصًا غير حصري ومجاني وعالمي لعرض وتوزيع واستضافة هذا المحتوى داخل منظومة ونيسي لتقديم خدمات المنصة.",
          ],
        },
        {
          h: "٧. استقلالية الأطباء والعيادات والمتاجر",
          p: [
            "الأطباء البيطريون، والعيادات، وصالونات العناية، والمتاجر المتواجدة على ونيسي هم جهات مستقلة تمامًا.",
            "يتحمل كل مقدم خدمة ومؤسسة المسؤولية الكاملة عن تراخيصه الطبية، وإجراءاته العلاجية، وضمانات منتجاته، وجودة خدماته المقدمة للعملاء.",
          ],
        },
        {
          h: "٨. بلاغات الأليف المفقود",
          p: [
            "ميزة بلاغات المفقودات أداة مجتمعية لنشر التنبيه السريع. لا يضمن ونيسي العثور على الأليف ولا يوفر أجهزة تتبع جغرافي فيزيائية.",
            "يجب على المستخدمين نشر معلومات دقيقة وصادقة فقط عن الحيوانات المفقودة أو المعثور عليها.",
          ],
        },
        {
          h: "٩. إيقاف وإنهاء الحسابات",
          p: [
            "يحتفظ ونيسي بالحق في إيقاف أو حظر أي حساب ينتهك هذه الشروط، أو يسيء للحيوان، أو يمارس التحرش، أو يهدد سلامة المجتمع.",
          ],
        },
        {
          h: "١٠. حدود المسؤولية والقانون الواجب التطبيق",
          p: [
            "في الحدود القصوى التي يسمح بها القانون، لا يتحمل ونيسي أي أضرار غير مباشرة ناجمة عن استخدام المنصة أو عن الخدمات المقدمة من أطراف مستقلة.",
            `تخضع هذه الشروط وتفسر وفقًا للقوانين المعمول بها في ${siteConfig.legal.jurisdictionAr}.`,
            `للاستفسارات القانونية: ${siteConfig.contact.legalEmail}.`,
          ],
        },
      ],
    },
  },
  guidelines: {
    en: {
      title: "Community Guidelines",
      lastUpdated: `Effective Date: ${siteConfig.legal.effectiveDate}`,
      intro: `Kindness is part of our DNA. Waneesi is dedicated to fostering a safe, uplifting, and joyful ecosystem for pets and the people who care for them. Every member is expected to uphold these guidelines.`,
      sections: [
        {
          h: "1. Respect Every Community Member",
          p: [
            "Treat fellow pet parents, veterinarians, clinic staff, and merchants with courtesy.",
            "Harassment, hate speech, body-shaming, discrimination, threats, and trolling have no place in Waneesi and result in immediate account restriction.",
          ],
        },
        {
          h: "2. Absolute Animal Welfare & Compassion",
          p: [
            "Never post content depicting cruelty, forced animal performances, distressing situations, or medical neglect.",
            "Advocate for responsible pet care, vaccination adherence, and humane treatment at all times.",
          ],
        },
        {
          h: "3. Truthful & Ethical Sharing",
          p: [
            "Share authentic photos and experiences of your pets.",
            "Do not spread fabricated veterinary medical advice, unverified cures, false missing-pet emergencies, or deceptive commercial promotions.",
          ],
        },
        {
          h: "4. Ethical & Fee-Free Pet Adoption",
          p: [
            "Pet adoption listings on Waneesi must be motivated by animal welfare, not commercial exploitation.",
            "Demanding illegal selling fees or selling prohibited animals under the guise of adoption is strictly banned.",
          ],
        },
        {
          h: "5. Reporting & Community Moderation",
          p: [
            "You can report any post, story, reel, comment, or user profile directly through the 'Report' button on the mobile app.",
            "Our moderation team reviews reported violations with urgency and applies warnings, content removal, or permanent platform bans for serious violations.",
            `To report urgent community concerns: ${siteConfig.contact.safetyEmail}.`,
          ],
        },
      ],
    },
    ar: {
      title: "إرشادات المجتمع ومعايير الرفق",
      lastUpdated: `تاريخ السريان: ${siteConfig.legal.effectiveDateAr}`,
      intro: `الرفق واللطف جزء أساسي من هويتنا. صُمم ونيسي ليكون بيئة آمنة وملهمة وسعيدة للحيوانات الأليفة وللأشخاص الذين يحبونها ويعتنون بها. يتوقع من كل عضو الالتزام بهذه الإرشادات.`,
      sections: [
        {
          h: "١. احترام كل عضو في المجتمع",
          p: [
            "عامل جميع أصحاب الحيوانات، والأطباء، وفرق العمل في العيادات، وأصحاب المتاجر بلطف واحترام متبادل.",
            "يُمنع منعًا باتًا التحرش، أو خطاب الكراهية، أو التنمر، أو التهديد، ويؤدي ارتكاب أي منها إلى إيقاف الحساب فورًا.",
          ],
        },
        {
          h: "٢. الرفق المطلق بالحيوان",
          p: [
            "لا تنشر أبدًا محتوى يصور القسوة أو إجبار الحيوان على حركات مؤذية أو وضعه في مواقف مرعبة أو إهمال علاجه.",
            "احرص دائمًا على تشجيع الرعاية المسؤولة، والالتزام بالتطعيمات، والمعاملة الإنسانية الرحيمة في كل الأوقات.",
          ],
        },
        {
          h: "٣. النشر الصادق والأخلاقي",
          p: [
            "شارك صورًا وتجارب حقيقية تعكس واقع أليفك دون تزييف.",
            "تجنب نشر نصائح طبية مضللة، أو ادعاءات علاجية غير مثبتة، أو بلاغات فقدان كاذبة، أو إعلانات ترويجية احتيالية.",
          ],
        },
        {
          h: "٤. التبني الأخلاقي غير التجاري",
          p: [
            "عروض التبني على ونيسي هدفها إنساني لإنقاذ الحيوان وتوفير بيت آمن له.",
            "يُحظر تمامًا استغلال التبني لبيع الحيوانات بصورة غير قانونية أو فرض رسوم مالية تحت ستار التبني.",
          ],
        },
        {
          h: "٥. الإبلاغ والإشراف المجتمعي",
          p: [
            "يمكنك الإبلاغ عن أي منشور أو فيديو أو تعليق أو حساب يخالف المعايير عبر زر 'إبلاغ' داخل التطبيق.",
            "يقوم فريق الإشراف بمراجعة البلاغات بأولوية قصوى، وتطبيق العقوبات من تحذيرات أو حذف المحتوى أو الحظر الدائم للمخالفات الجسيمة.",
            `للإبلاغ عن الحالات الطارئة: ${siteConfig.contact.safetyEmail}.`,
          ],
        },
      ],
    },
  },
  childSafety: {
    en: {
      title: "Child Safety Standards",
      lastUpdated: `Effective Date: ${siteConfig.legal.effectiveDate}`,
      intro: `Waneesi maintains zero tolerance for any behavior that compromises the safety, well-being, or innocence of minors. We actively implement rigorous safety policies and cooperate with global child protection standards.`,
      sections: [
        {
          h: "1. Age Requirements & Parental Guidance",
          p: [
            "Waneesi is designed as a family-friendly pet ecosystem. The minimum age to register an account independently is 13 years old.",
            "Minors between 13 and the legal age of majority must obtain permission from a parent or legal guardian before using the platform.",
            "Waneesi does not market itself as an unmonitored children's application.",
          ],
        },
        {
          h: "2. Absolute Prohibition of Exploitation & CSAM",
          p: [
            "Waneesi strictly and unequivocally prohibits any Child Sexual Abuse Material (CSAM), grooming behavior, sexualized commentary, exploitation, or endangerment of minors.",
            "Any such content will be removed immediately upon detection, the offending account will be permanently terminated, and the incident will be reported to law enforcement authorities and international child protection organizations.",
          ],
        },
        {
          h: "3. Protecting Minors in Media & Feeds",
          p: [
            "Parents and guardians are encouraged to be mindful when publishing photos or videos of pets that include children.",
            "Content depicting children in unsafe, hazardous, or compromising situations with animals is prohibited and will be taken down.",
          ],
        },
        {
          h: "4. Dedicated Child Safety Reporting & Response",
          p: [
            `We maintain an urgent reporting channel dedicated specifically to child safety concerns: ${siteConfig.contact.safetyEmail}.`,
            "Reports regarding child endangerment are treated with the highest priority and escalated directly to specialized safety officers.",
          ],
        },
      ],
    },
    ar: {
      title: "معايير سلامة الأطفال وحماية القُصّر",
      lastUpdated: `تاريخ السريان: ${siteConfig.legal.effectiveDateAr}`,
      intro: `يلتزم ونيسي بسياسة عدم التسامح المطلق تجاه أي سلوك يهدد سلامة أو براءة الأطفال والقُصّر. نطبق معايير أمان مشددة ونتعاون مع المعايير والجهات الدولية لحماية الطفل.`,
      sections: [
        {
          h: "١. متطلبات العمر والإشراف العائلي",
          p: [
            "صُمم ونيسي ليكون بيئة مناسبة للعائلة ومحبي الحيوانات. الحد الأدنى للعمر لإنشاء حساب مستقل هو ١٣ عامًا.",
            "يجب على القُصّر بين سن ١٣ وسن الرشد الحصول على موافقة وإشراف ولي الأمر قبل استخدام التطبيق.",
            "لا تروج منصة ونيسي لنفسها على أنها تطبيق غير خاضع للرقابة مخصص للأطفال الصغار.",
          ],
        },
        {
          h: "٢. الحظر القاطع للاستغلال والمواد المسيئة (CSAM)",
          p: [
            "يحظر ونيسي حظرًا قاطعًا وشاملاً أي مواد تنطوي على استغلال جنسي للأطفال (CSAM) أو الاستدراج (Grooming) أو التعليقات غير اللائقة أو تعريض القُصّر لأي خطر.",
            "يتم حذف أي محتوى من هذا النوع فور رصده، وحظر الحساب المخالف نهائيًا وبلا رجعة، وإحالة الواقعة إلى السلطات المختصة والمنظمات الدولية المعنية بحماية الطفل.",
          ],
        },
        {
          h: "٣. حماية الأطفال في الوسائط والمشاركات",
          p: [
            "ننصح أولياء الأمور بالحذر والانتباه عند نشر صور أو مقاطع للأليف يظهر فيها أطفالهم.",
            "يُمنع نشر أي محتوى يظهر الأطفال في مواقف خطرة أو غير آمنة مع الحيوانات.",
          ],
        },
        {
          h: "٤. قناة الإبلاغ المباشر لسلامة الطفل",
          p: [
            `خصصنا قناة اتصال مباشرة وعاجلة لبلاغات سلامة الطفل: ${siteConfig.contact.safetyEmail}.`,
            "تُعامل بلاغات حماية القُصّر بأعلى درجات الأولوية والاستعجال ويتم التعامل معها من قبل مسؤولي الأمان فور ورودها.",
          ],
        },
      ],
    },
  },
  deletion: {
    en: {
      title: "Account Deletion & Data Erasure",
      lastUpdated: `Effective Date: ${siteConfig.legal.effectiveDate}`,
      intro: `Your Account. Your Choice. You hold complete sovereignty over your data on Waneesi. You can permanently delete your account, your pet profiles, and all associated information at any time—either from within the mobile app or via this verified web page.`,
      sections: [
        {
          h: "1. What Account Deletion Means",
          p: [
            "Permanent account deletion is an irreversible action. Once your account is deleted, it cannot be restored, and your account credentials will cease to exist.",
          ],
        },
        {
          h: "2. Data Categories Permanently Erased",
          p: [
            "Submitting an account deletion request triggers the permanent erasure of:",
          ],
          bullets: [
            "Your profile details: Full name, email address, phone number, password, and avatar.",
            "All registered pet profiles: Pet names, breed, medical timelines, vaccination history, and notes.",
            "User-generated media: Photos, Pet Reels, Stories, and captions uploaded to community feeds.",
            "Community interactions: Comments, likes, group memberships, and saved items.",
            "Device records & tokens: Push notification identifiers and location history caches.",
          ],
        },
        {
          h: "3. Data That May Be Retained Legally",
          p: [
            "In strict compliance with statutory regulations (such as commercial tax, bookkeeping, or fraud prevention laws), certain transaction receipts or invoices related to past store purchases may be retained for the minimum statutory period required by law.",
            "Aggregated, de-identified statistical metrics that cannot be linked back to you may be kept for historical trend analysis.",
          ],
        },
        {
          h: "4. Deletion Timelines",
          p: [
            "Immediate Action: Your account is instantly deactivated upon confirmation, making your profile, posts, and pet profiles invisible to other users.",
            "Complete Erasure: All associated personal records are scrubbed from our active production databases and backup archives within 30 calendar days.",
          ],
        },
        {
          h: "5. How to Initiate Deletion",
          p: [
            "Option A (Mobile Application): Open Waneesi App > Go to Profile > Settings > Account > Delete Account, then confirm your request.",
            "Option B (Web Request Form): If you do not have immediate access to your mobile phone, complete the secure deletion request form below on this page.",
            `For manual support assistance, you may contact our privacy department directly at: ${siteConfig.contact.deletionEmail}.`,
          ],
        },
      ],
    },
    ar: {
      title: "حذف الحساب ومحو البيانات",
      lastUpdated: `تاريخ السريان: ${siteConfig.legal.effectiveDateAr}`,
      intro: `حسابك.. اختيارك. تملك كامل السيادة والتحكم في بياناتك المسجلة على ونيسي. يمكنك حذف حسابك، وملفات أليفك، وكافة بياناتك نهائيًا في أي وقت — سواء من داخل التطبيق أو عبر هذه الصفحة الرسمية.`,
      sections: [
        {
          h: "١. ماذا يعني حذف الحساب",
          p: [
            "حذف الحساب نهائي ولا يمكن التراجع عنه. بمجرد إتمام الحذف، لا يمكن استرجاع الحساب أو إعادة تفعيل بيانات الدخول السابقة.",
          ],
        },
        {
          h: "٢. فئات البيانات التي يتم محوها نهائيًا",
          p: [
            "يؤدي تقديم طلب حذف الحساب إلى المسح النهائي والشامل لما يلي:",
          ],
          bullets: [
            "بيانات ملفك الشخصي: الاسم، البريد الإلكتروني، رقم الهاتف، كلمة المرور، وصورة الحساب.",
            "كافة ملفات الحيوانات الأليفة: أسماء الأليف، سلالته، سجلاته الصحية، ومواعيد التطعيمات.",
            "الوسائط المنشورة: الصور، وفيديوهات الريلز، والقصص اليومية، والنصوص المنشورة في الخلاصة المجتمعية.",
            "التفاعلات المجتمعية: التعليقات، الإعجابات، عضويات المجموعات، وقوائم المحفوظات.",
            "بيانات الجهاز والإشعارات: معرفات الإشعارات وسجلات الموقع الجغرافي المؤقتة.",
          ],
        },
        {
          h: "٣. البيانات المستثناة لأسباب قانونية وإلزامية",
          p: [
            "وفقًا للمتطلبات القانونية والتنظيمية (مثل القوانين الضريبية والمحاسبية)، قد يتم الاحتفاظ بسجلات الفواتير المالية الناتجة عن مشتريات سابقة للفترة القانونية المقررة فقط ثم حذفها.",
            "البيانات الإحصائية المجمعة ومجهولة الهوية التي لا يمكن ربطها بشخصك قد تظل لأغراض دراسة مؤشرات المنصة العامة.",
          ],
        },
        {
          h: "٤. الجدول الزمني لإتمام الحذف",
          p: [
            "التعطيل الفوري: بمجرد تأكيد الطلب، يتم تعطيل حسابك وإخفاء ملفك الشخصي ومنشوراتك وملفات أليفك عن باقي المستخدمين فورًا.",
            "المحو الكامل: تُمحى كافة سجلاتك الشخصية من قواعد البيانات النشطة وأنظمة النسخ الاحتياطي خلال ٣٠ يوم عمل كحد أقصى.",
          ],
        },
        {
          h: "٥. طرق تقديم طلب الحذف",
          p: [
            "الطريقة الأولى (عبر التطبيق المحمول): افتح تطبيق ونيسي > الملف الشخصي > الإعدادات > الحساب > حذف الحساب، ثم أكد رغبتك.",
            "الطريقة الثانية (عبر موقع الويب): إذا تعذر وصولك للهاتف، يمكنك تعبئة نموذج طلب الحذف الرسمي المتوفر أسفل هذه الصفحة.",
            `للدعم والمساعدة اليدوية، يمكنك مراسلة فريق معالجة البيانات عبر: ${siteConfig.contact.deletionEmail}.`,
          ],
        },
      ],
    },
  },
};
