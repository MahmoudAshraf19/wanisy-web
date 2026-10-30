import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PrefsProvider, prefsBootScript } from "../lib/prefs";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { siteConfig } from "../lib/config";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-8xl font-black text-primary">404</h1>
        <h2 className="text-2xl font-bold text-foreground">
          Page Not Found | الصفحة غير موجودة
        </h2>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
          <br />
          الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow hover:bg-primary/95 transition-all"
          >
            Return to Homepage | العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">
          Something went wrong | حدث خطأ غير متوقع
        </h1>
        <p className="text-sm text-muted-foreground">
          Please refresh or try heading back to the homepage.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border bg-background px-5 py-2.5 text-sm font-bold text-foreground hover:bg-muted"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://waneesi.app/#org", name: "Waneesi", alternateName: "ونيسي", url: "https://waneesi.app", logo: "https://waneesi.app/logo.png", email: siteConfig.contact.generalEmail, sameAs: Object.values(siteConfig.socials) },
    { "@type": "WebSite", "@id": "https://waneesi.app/#site", url: "https://waneesi.app", name: "Waneesi (ونيسي)", inLanguage: ["en", "ar"], publisher: { "@id": "https://waneesi.app/#org" } },
    { "@type": "MobileApplication", name: "Waneesi", alternateName: "ونيسي", applicationCategory: "SocialNetworkingApplication", operatingSystem: "Android, iOS", description: "Pet social network, veterinary and grooming discovery, pet marketplace, lost & found pets and adoption in one app." },
  ],
});

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      {
        title: "Waneesi (ونيسي) | Your Pet's World. All in One Place.",
      },
      {
        name: "description",
        content:
          "The modern, global pet lifestyle, social, and healthcare ecosystem connecting pet parents, certified veterinarians, clinics, groomers, and pet merchants.",
      },
      { name: "theme-color", content: "#2A9D8F" },
      { property: "og:site_name", content: "Waneesi" },
      {
        property: "og:title",
        content: "Waneesi (ونيسي) | Your Pet's World. All in One Place.",
      },
      {
        property: "og:description",
        content:
          "One connected ecosystem bringing pet parents, animal lovers, veterinarians, clinics, groomers, and pet stores together.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://waneesi.app/logo.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:locale:alternate", content: "ar_AR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Waneesi (ونيسي)" },
      {
        name: "twitter:description",
        content:
          "The premier pet care, social and commerce ecosystem. Where every pet belongs.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: jsonLd }],
    links: [
      { rel: "canonical", href: "https://waneesi.app/" },
      { rel: "alternate", hrefLang: "en", href: "https://waneesi.app/" },
      { rel: "alternate", hrefLang: "ar", href: "https://waneesi.app/" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: prefsBootScript }} />
        <HeadContent />
      </head>
      <body>
        <div id="root">{children}</div>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <PrefsProvider>
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </PrefsProvider>
    </QueryClientProvider>
  );
}
