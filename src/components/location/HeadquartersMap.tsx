import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Copy,
  Check,
  Building2,
  Clock,
  Compass,
  RotateCcw,
} from "lucide-react";

declare global {
  interface Window {
    initWaneesiHqMap?: () => void;
    google?: {
      maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => any;
        Marker: new (options: Record<string, unknown>) => any;
        InfoWindow: new (options: Record<string, unknown>) => any;
        marker?: {
          AdvancedMarkerElement: new (options: Record<string, unknown>) => any;
        };
      };
    };
  }
}

export function HeadquartersMap() {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const [configured, setConfigured] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [copied, setCopied] = useState(false);

  const hq = siteConfig.headquarters;
  const coordinates = { lat: hq.latitude, lng: hq.longitude };

  const handleCopyCoordinates = () => {
    navigator.clipboard.writeText(`${coordinates.lat}, ${coordinates.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCenterMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(coordinates);
      mapInstanceRef.current.setZoom(15);
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    let isMounted = true;

    const initMap = () => {
      if (!isMounted || !mapContainerRef.current || !window.google?.maps) return;
      try {
        const center = coordinates;
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center,
          zoom: 15,
          mapId: "waneesi_hq_map",
          clickableIcons: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
        });

        mapInstanceRef.current = map;

        const hqName = ar ? "مقر إدارة ونيسي الرئيسي" : "Waneesi Global Headquarters";
        const hqCity = ar ? "القاهرة، جمهورية مصر العربية" : "Cairo, Egypt";

        // Modern Marker
        let marker: any;
        if (window.google.maps.marker?.AdvancedMarkerElement) {
          marker = new window.google.maps.marker.AdvancedMarkerElement({
            map,
            position: center,
            title: `📍 ${hqName} • ${hqCity}`,
          });
        } else {
          marker = new window.google.maps.Marker({
            map,
            position: center,
            title: `📍 ${hqName} • ${hqCity}`,
          });
        }

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px 14px; font-family: system-ui, -apple-system, sans-serif; text-align: ${ar ? "right" : "left"}; direction: ${ar ? "rtl" : "ltr"}; min-width: 220px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <img src="/logo.png" style="width: 24px; height: 24px; object-fit: contain;" />
                <img src="/flags/flag-egypt.jpg" style="width: 18px; height: 13px; object-fit: cover; border-radius: 2px;" />
                <span style="font-weight: 800; font-size: 14px; color: #0f766e;">${hqName}</span>
              </div>
              <div style="font-size: 12px; color: #334155; font-weight: 600;">${hqCity}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${ar ? "ساعات العمل: الأحد - الخميس 9 ص - 6 م" : "Hours: Sun - Thu 9 AM - 6 PM"}</div>
              <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid #e2e8f0;">
                <a href="${hq.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="color: #0d9488; font-size: 11px; font-weight: 700; text-decoration: none;">
                  📍 ${ar ? "فتح مسار الاتجاهات في Google Maps ←" : "Open in Google Maps Directions →"}
                </a>
              </div>
            </div>
          `,
        });

        if (marker) {
          infoWindow.open({ anchor: marker, map });
          if (marker.addEventListener) {
            marker.addEventListener("gmp-click", () => {
              infoWindow.open({ anchor: marker, map });
            });
          }
        }

        if (isMounted) setConfigured(true);
      } catch (err) {
        console.warn("Interactive Google Map script failed, falling back to secure embed:", err);
        if (isMounted) setLoadError(true);
      }
    };

    if (window.google?.maps) {
      initMap();
    } else {
      window.initWaneesiHqMap = initMap;
      const existingScript = document.getElementById("google-maps-waneesi-script");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "google-maps-waneesi-script";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
          hq.googleMapsApiKey
        )}&loading=async&libraries=marker&callback=initWaneesiHqMap`;
        script.async = true;
        script.defer = true;
        script.onerror = () => {
          if (isMounted) setLoadError(true);
        };
        document.head.appendChild(script);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [coordinates.lat, coordinates.lng, ar]);

  return (
    <div className="relative rounded-[32px] sm:rounded-[40px] border border-border/80 overflow-hidden bg-card shadow-xl">
      {/* Top Floating Info Bar on Desktop */}
      <div className="p-6 sm:p-8 border-b bg-card/90 backdrop-blur flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-1 text-start">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-black text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{ar ? "المقر نشط ومعتمد" : "Active & Operational"}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted border border-border text-[11px] font-bold text-foreground">
                <img
                  src="/flags/flag-egypt.jpg"
                  alt="Egypt"
                  className="w-4 h-3 rounded-2xs object-cover border border-black/10 shadow-2xs"
                />
                <span>{ar ? hq.countryAr : hq.countryEn}</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              {ar ? "مقر إدارة وتطوير تطبيق ونيسي" : "Waneesi App Management HQ"}
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{ar ? "القاهرة، جمهورية مصر العربية" : "Cairo, Egypt"}</span>
              <span className="text-muted-foreground/40">•</span>
              <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span>{ar ? "الأحد - الخميس: 9:00 ص - 6:00 م" : "Sun - Thu: 9:00 AM - 6:00 PM"}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <a
            href={hq.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-black text-xs shadow-sm hover:bg-primary/95 transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>{ar ? "فتح في Google Maps" : "Open in Google Maps"}</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>

          <a
            href={hq.appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border bg-muted/60 text-foreground font-bold text-xs hover:bg-muted transition-all"
          >
            <img
              src="/icons/apple-logo.png"
              alt="Apple"
              className="w-3.5 h-3.5 object-contain dark:invert"
            />
            <span>Apple Maps</span>
          </a>

          <button
            type="button"
            onClick={handleCopyCoordinates}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border bg-muted/40 text-foreground text-xs font-semibold hover:bg-muted transition-colors cursor-pointer"
            title={ar ? "نسخ الإحداثيات الجغرافية" : "Copy Coordinates"}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold">{ar ? "تم النسخ" : "Copied"}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                <span>30.0444, 31.2357</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Map Visual Canvas */}
      <div className="relative h-[360px] sm:h-[480px] w-full bg-muted/50 overflow-hidden">
        {loadError ? (
          /* High-Reliability Google Maps Embed Fallback */
          <iframe
            title="Waneesi Headquarters Cairo Egypt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=${lang}&z=15&output=embed`}
          />
        ) : (
          <>
            {/* Interactive JS API Map Container */}
            <div
              ref={mapContainerRef}
              className="h-full w-full"
              aria-label={ar ? "خريطة مقر إدارة ونيسي" : "Waneesi HQ Map"}
            />

            {/* Loading Indicator */}
            {!configured && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm font-semibold text-muted-foreground bg-background/80 backdrop-blur z-10 pointer-events-none">
                <MapPin className="h-7 w-7 animate-bounce text-primary" />
                <span>
                  {ar
                    ? "جارٍ تحميل خريطة المقر التفاعلية (القاهرة، مصر)..."
                    : "Loading interactive Cairo HQ map..."}
                </span>
              </div>
            )}

            {/* Quick Map Controls Overlay */}
            {configured && (
              <div className="absolute bottom-4 end-4 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCenterMap}
                  className="px-3 py-2 rounded-xl bg-card/90 border border-border shadow-md text-xs font-bold text-foreground hover:bg-card flex items-center gap-1.5 backdrop-blur transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-primary" />
                  <span>{ar ? "إعادة التوسيط على المقر" : "Re-center HQ"}</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Sub-bar with Footprint & Egypt Coverage */}
      <div className="p-4 sm:p-6 bg-muted/30 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-primary" />
          <span>
            {ar
              ? "نطاق الخدمة: جمهورية مصر العربية وكافة محافظاتها والمنطقة الإقليمية"
              : "Operational Scope: Cairo, Egyptian Governorates & Regional Network"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold text-foreground">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>{ar ? "إدارة التطبيقات والعمليات" : "Platform Management"}</span>
          </span>
          <span className="flex items-center gap-1.5 font-bold text-foreground">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>{ar ? "فريق الدعم والشركاء" : "Partner Operations"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

