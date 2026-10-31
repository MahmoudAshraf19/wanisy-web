import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  Building2,
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  RotateCcw,
} from "lucide-react";

declare global {
  interface Window {
    initWaneesiHqMap?: () => void;
    gm_authFailure?: () => void;
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => any;
        Marker: new (options: Record<string, unknown>) => any;
        InfoWindow: new (options: Record<string, unknown>) => any;
        importLibrary?: (name: string) => Promise<any>;
      };
    };
  }
}

const STYLE_ID = "waneesi-hq-map-style";

function ensureMarkerStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `@keyframes waneesi-hq-pulse{0%{transform:scale(.7);opacity:.7}100%{transform:scale(2.1);opacity:0}}`;
  document.head.appendChild(style);
}

function buildMarkerElement(): HTMLElement {
  ensureMarkerStyle();
  const root = document.createElement("div");
  root.style.cssText = "position:relative;width:46px;height:46px;transform:translateY(-4px);";
  const pulse = document.createElement("span");
  pulse.style.cssText = `position:absolute;inset:0;border-radius:9999px;background:${siteConfig.colors.persianGreen};opacity:.5;animation:waneesi-hq-pulse 2.2s ease-out infinite;`;
  const logo = document.createElement("img");
  logo.src = siteConfig.logoUrl;
  logo.alt = "";
  logo.style.cssText =
    "position:relative;width:46px;height:46px;border-radius:9999px;border:3px solid #fff;background:#fff;object-fit:contain;box-shadow:0 8px 22px rgba(0,0,0,.35);";
  root.append(pulse, logo);
  return root;
}

export function HeadquartersMap() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const hq = siteConfig.headquarters;
  const coordsText = `${hq.latitude.toFixed(4)}, ${hq.longitude.toFixed(4)}`;

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const infoRef = useRef<any>(null);
  const readyRef = useRef(false);
  const copyTimer = useRef<number>(0);

  const [configured, setConfigured] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [copied, setCopied] = useState(false);

  const hqName = ar ? "مقر إدارة وتطوير تطبيق ونيسي" : "Waneesi App Management HQ";
  const hqCity = ar ? "القاهرة، مصر" : "Cairo, Egypt";
  const hours = ar ? "24 ساعة - 7 أيام" : "24/7 (24 Hours - 7 Days)";

  const infoHtml = useCallback(
    (isAr: boolean) => `
      <div style="padding:8px 10px;font-family:system-ui,-apple-system,sans-serif;text-align:${isAr ? "right" : "left"};direction:${isAr ? "rtl" : "ltr"};min-width:190px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <img src="${siteConfig.logoUrl}" alt="" style="width:22px;height:22px;object-fit:contain;" />
          <span style="font-weight:800;font-size:13px;color:#0f766e;">${isAr ? "مقر إدارة وتطوير تطبيق ونيسي" : "Waneesi App Management HQ"}</span>
        </div>
        <div style="font-size:12px;color:#334155;font-weight:700;">${isAr ? "القاهرة، مصر" : "Cairo, Egypt"}</div>
        <div style="font-size:11px;color:#64748b;margin-top:4px;">${isAr ? "ساعات العمل: 24 ساعة - 7 أيام" : "Hours: 24/7 (24 Hours - 7 Days)"}</div>
      </div>`,
    [],
  );

  const recenter = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.panTo({ lat: hq.latitude, lng: hq.longitude });
    map.setZoom(15);
  };

  const copyCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(coordsText);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard may be unavailable (insecure context) — ignore */
    }
  };

  // Create the map once
  useEffect(() => {
    const el = mapContainerRef.current;
    if (!el) return;
    let alive = true;
    const fail = () => alive && setLoadError(true);
    const center = { lat: hq.latitude, lng: hq.longitude };

    const init = async () => {
      if (!alive || mapInstanceRef.current || !window.google?.maps) return;
      try {
        const isDark = document.documentElement.classList.contains("dark");
        const map = new window.google.maps.Map(el, {
          center,
          zoom: 15,
          mapId: "waneesi_hq_map",
          colorScheme: isDark ? "DARK" : "LIGHT",
          gestureHandling: "cooperative", // page scroll isn't hijacked on mobile
          clickableIcons: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });
        mapInstanceRef.current = map;

        let marker: any = null;
        try {
          const lib = await window.google.maps.importLibrary?.("marker");
          if (lib?.AdvancedMarkerElement) {
            marker = new lib.AdvancedMarkerElement({
              map,
              position: center,
              content: buildMarkerElement(),
              title: hqName,
            });
          }
        } catch {
          /* fall back to the classic marker below */
        }
        if (!marker) marker = new window.google.maps.Marker({ map, position: center, title: hqName });
        if (!alive) return;
        markerRef.current = marker;

        const info = new window.google.maps.InfoWindow({ content: infoHtml(ar) });
        infoRef.current = info;
        info.open({ anchor: marker, map });
        const reopen = () => info.open({ anchor: marker, map });
        if (marker.addEventListener) marker.addEventListener("gmp-click", reopen);
        else marker.addListener?.("click", reopen);

        readyRef.current = true;
        setConfigured(true);
      } catch (err) {
        console.warn("Interactive Google Map failed, using embed fallback:", err);
        fail();
      }
    };

    window.gm_authFailure = fail; // invalid / restricted API key
    const timeout = window.setTimeout(() => {
      if (!readyRef.current) fail();
    }, 9000);

    if (window.google?.maps) {
      init();
    } else {
      window.initWaneesiHqMap = init;
      if (!document.getElementById("google-maps-waneesi-script")) {
        const script = document.createElement("script");
        script.id = "google-maps-waneesi-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
          hq.googleMapsApiKey,
        )}&loading=async&callback=initWaneesiHqMap`;
        script.async = true;
        script.defer = true;
        script.onerror = fail;
        document.head.appendChild(script);
      }
    }

    return () => {
      alive = false;
      window.clearTimeout(timeout);
      window.clearTimeout(copyTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Language switch: update texts without rebuilding the map
  useEffect(() => {
    infoRef.current?.setContent(infoHtml(ar));
    if (markerRef.current) markerRef.current.title = hqName;
  }, [ar, hqName, infoHtml]);

  const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${hq.latitude},${hq.longitude}`;

  const actionBase =
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm";

  return (
    <div className="overflow-hidden rounded-[28px] border border-border/80 bg-card shadow-xl sm:rounded-[36px]">
      {/* Header */}
      <div className="flex flex-col gap-4 p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4 text-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-black text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              {ar ? "المقر نشط ومعتمد" : "Active & Operational"}
            </span>
            <h3 className="text-xl font-black text-foreground sm:text-2xl">{hqName}</h3>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                {hqCity}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0 text-primary" />
                {hours}
              </span>
            </p>
          </div>
        </div>
        <img
          src="/flags/flag-egypt.jpg"
          alt={ar ? "علم مصر" : "Egypt flag"}
          loading="lazy"
          className="hidden h-10 w-[60px] shrink-0 rounded-lg border border-black/10 object-cover shadow-xs md:block"
        />
      </div>

      {/* Map */}
      <div className="relative h-[340px] w-full overflow-hidden border-y border-border/70 bg-muted/50 sm:h-[460px]">
        {loadError ? (
          <iframe
            title={ar ? "خريطة مقر ونيسي في القاهرة" : "Waneesi headquarters, Cairo"}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${hq.latitude},${hq.longitude}&hl=${lang}&z=15&output=embed`}
          />
        ) : (
          <>
            <div
              ref={mapContainerRef}
              dir="ltr"
              className="h-full w-full"
              aria-label={ar ? "خريطة مقر إدارة ونيسي" : "Waneesi HQ map"}
            />
            {!configured && (
              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background/80 text-sm font-semibold text-muted-foreground backdrop-blur">
                <MapPin className="h-7 w-7 animate-bounce text-primary" />
                <span>{ar ? "جارٍ تحميل خريطة المقر…" : "Loading the HQ map…"}</span>
              </div>
            )}
            {configured && (
              <button
                type="button"
                onClick={recenter}
                className="absolute bottom-4 start-4 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-card/90 px-3 py-2 text-xs font-bold text-foreground shadow-md backdrop-blur transition hover:bg-card"
              >
                <RotateCcw className="h-3.5 w-3.5 text-primary" />
                <span>{ar ? "توسيط على المقر" : "Re-center"}</span>
              </button>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2.5 p-4 sm:p-6 lg:grid-cols-4">
        <a
          href={dirUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionBase} border-primary bg-primary text-primary-foreground hover:opacity-90`}
        >
          <Navigation className="h-4 w-4" />
          <span>{ar ? "الاتجاهات" : "Directions"}</span>
        </a>
        <a
          href={hq.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionBase} border-border bg-muted/50 text-foreground hover:bg-muted`}
        >
          <ExternalLink className="h-4 w-4 text-primary" />
          <span>{ar ? "خرائط جوجل" : "Google Maps"}</span>
        </a>
        <a
          href={hq.appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${actionBase} border-border bg-muted/50 text-foreground hover:bg-muted`}
        >
          <ExternalLink className="h-4 w-4 text-primary" />
          <span>{ar ? "خرائط آبل" : "Apple Maps"}</span>
        </a>
        <button
          type="button"
          onClick={copyCoordinates}
          className={`${actionBase} border-border bg-muted/50 text-foreground hover:bg-muted`}
          title={ar ? "نسخ الإحداثيات" : "Copy coordinates"}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-500">{ar ? "تم النسخ" : "Copied"}</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 text-muted-foreground" />
              <span dir="ltr" className="font-mono">
                {coordsText}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}