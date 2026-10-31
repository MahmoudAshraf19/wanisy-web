<p align="center">
  <a href="https://github.com/MahmoudAshraf19/wanisy-web">
    <img src="public/logo.png" alt="Waneesi Logo" width="180" style="border-radius: 24px;" />
  </a>
</p>

<h1 align="center">🐾 Waneesi (ونيسي) — Official Web Platform</h1>

<p align="center">
  <strong>Your Pet's World. All in One Place.</strong><br />
  <strong>كل عالم أليفك في مكان واحد.</strong>
</p>

<p align="center">
  A modern, high-performance web platform for the Waneesi ecosystem — uniting pet parents, veterinarians, clinics, groomers, pet hotels, and pet stores in one connected community.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TanStack%20Start-SSR-FF4154?style=for-the-badge&logo=tanstack&logoColor=white" alt="TanStack Start" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

---

## 📖 Overview | نظرة عامة

**Waneesi (ونيسي)** is a comprehensive pet social and healthcare ecosystem. The web platform serves as the digital front door, providing:
- An immersive overview of all mobile and platform capabilities.
- Specialized portals for pet parents, veterinary doctors, clinics, and service providers.
- An interactive global expansion roadmap and live headquarters locator.
- Dedicated account management, privacy, child safety, and community guidelines.

---

## ✨ Key Features | أبرز المميزات

### 🐾 1. Complete Pet Ecosystem
- **Pet Care & Medical Profiles**: Comprehensive health tracking, vaccination records, and life journal.
- **Veterinary & Clinics Network**: Real-time discovery of certified clinics, specialists, and 24/7 emergency veterinary centers.
- **Pet Hotels & Boarding**: Verified pet-friendly boarding facilities with room options and species-tailored amenities.
- **Grooming Services**: Salon and mobile pet spa bookings with verified professionals.
- **Adoption & Rescue Hub**: Ethical, verified pet adoption connecting loving families with pets in need.
- **Curated Pet Marketplace**: High-grade nutrition, toys, accessories, and grooming essentials.

### 🌐 2. Interactive Expansion Map & Headquarters Locator
- **Live Headquarters Locator**: Integrated with the Google Maps API showcasing Waneesi HQ in Cairo, Egypt with real-time navigation links and GPS coordinates.
- **Phased Global Expansion Engine**: Custom interactive SVG vector world map rendering 4 strategic phases:
  - **Phase 01**: Egypt Launch (Headquarters & nationwide operational rollout).
  - **Phase 02**: GCC & MENA Expansion (Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman).
  - **Phase 03**: European Union & UK (United Kingdom, Germany, France, Spain, Italy).
  - **Phase 04**: Global Reach (North America, Asia-Pacific, and worldwide care network).

### 🌍 3. Full Bilingual Support (i18n)
- Native support for **Arabic (العربية - RTL)** and **English (LTR)**.
- Seamless instant language switching with bidirectional typographic adaptation.

### 🌓 4. Dynamic Theming & Brand Identity
- **Light & Dark Modes**: Carefully calibrated contrast ratios with smooth transitions.
- **Official Brand Palette**: Persian Green (`#2A9D8F`), Sandy Brown (`#F4A261`), Saffron (`#E9C46A`), and Burnt Sienna (`#E76F51`).

### 🛡️ 5. Compliance & Trust
- **Self-Service Account Deletion**: Transparent, secure user data removal flow under `/delete-account`.
- **Legal Suite**: Privacy Policy, Terms & Conditions, Child Safety Policies, and Community Guidelines.

---

## 🛠️ Tech Stack | التقنيات المستخدمة

| Layer | Technology |
| :--- | :--- |
| **Framework** | [TanStack Start](https://tanstack.com/start) (Full-stack React 19 framework with SSR) |
| **Routing** | [TanStack Router](https://tanstack.com/router) (Type-safe client & server routing) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict type-checking) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/vite` |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) primitives + [Lucide React](https://lucide.dev/) icons |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) + `tw-animate-css` |
| **State Management** | [TanStack React Query v5](https://tanstack.com/query) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Build & Dev Tool** | [Vite 8](https://vitejs.dev/) + [Nitro](https://nitro.unjs.io/) engine |

---

## 📁 Project Structure | هيكل المشروع

```text
wanisy-web/
├── public/                 # Static assets, logos, brand photography, icons, flags
│   ├── brand/              # High-resolution brand assets & illustrations
│   ├── icons/              # Store and platform icons
│   ├── favicon.png         # Web favicon
│   └── logo.png            # Official Waneesi logo
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, Theme & Language toggles
│   │   ├── location/       # HeadquartersMap (Google Maps) & ExpansionMap (SVG)
│   │   ├── sections/       # Hero, FeaturesGrid, Audiences, Professionals, FAQ, DownloadCTA
│   │   └── ui/             # Reusable accessible Radix-based UI components
│   ├── lib/
│   │   ├── config.ts       # Centralized platform configuration & branding constants
│   │   ├── expansion.ts    # 4-Phase global expansion roadmap data
│   │   ├── i18n.ts         # Bilingual translations (Arabic / English)
│   │   ├── legal.ts        # Legal policies & regulatory text
│   │   ├── prefs.tsx       # Theme (Dark/Light) & Locale (AR/EN) state provider
│   │   └── world-map-data.ts # Optimized SVG vector paths for interactive world map
│   └── routes/             # TanStack file-based routes
│       ├── __root.tsx      # Root layout, meta tags, and context providers
│       ├── index.tsx       # Landing homepage
│       ├── features.tsx    # Comprehensive 12-feature showcase
│       ├── for-professionals.tsx # Partner & professional onboarding
│       ├── location.tsx    # Interactive Headquarters & Expansion page
│       ├── contact.tsx     # Direct inquiries & partner communication
│       ├── delete-account.tsx # Account deletion & data management
│       ├── privacy-policy.tsx # Privacy policy
│       ├── terms-and-conditions.tsx # Terms of service
│       ├── community-guidelines.tsx # Community rules
│       └── child-safety.tsx # Child safety policy
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite & TanStack plugins configuration
└── README.md               # Project documentation
```

---

## 🚀 Getting Started | البدء والتشغيل

### Prerequisites
- [Node.js](https://nodejs.org/) (version **20.x** or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### 1. Clone the Repository
```bash
git clone https://github.com/MahmoudAshraf19/wanisy-web.git
cd wanisy-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the port displayed in your terminal) to view the application in your browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Configuration & Environment

All core branding, links, and operational configurations reside in [`src/lib/config.ts`](src/lib/config.ts):

```typescript
export const siteConfig = {
  name: "Waneesi",
  nameAr: "ونيسي",
  taglineEn: "Your Pet's World. All in One Place.",
  taglineAr: "كل عالم أليفك في مكان واحد",
  colors: {
    persianGreen: "#2A9D8F",
    sandyBrown: "#F4A261",
    saffron: "#E9C46A",
    burntSienna: "#E76F51",
    charcoal: "#264653",
  },
  headquarters: {
    cityEn: "Cairo",
    cityAr: "القاهرة",
    countryEn: "Egypt",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  contact: {
    generalEmail: "contact@waneesi.app",
    supportEmail: "support@waneesi.app",
    partnersEmail: "partners@waneesi.app",
  },
};
```

---

## 📬 Contact & Support | التواصل والدعم

- **General Inquiries**: [contact@waneesi.app](mailto:contact@waneesi.app)
- **Technical Support**: [support@waneesi.app](mailto:support@waneesi.app)
- **Partnerships & Clinics**: [partners@waneesi.app](mailto:partners@waneesi.app)
- **Official Website**: [https://waneesi.app](https://waneesi.app)

---

<p align="center">
  <sub>© 2026 Waneesi (ونيسي). All rights reserved. Made with ❤️ for pets and their humans.</sub>
</p>
