import { useState, useMemo, useRef } from "react";
import { usePrefs } from "@/lib/prefs";
import {
  arabCountriesList,
  roadmapStages,
  europeHubs,
  americasHubs,
  type CountryData,
  type RoadmapStage,
} from "@/data/expansionRoadmap";
import {
  Globe2,
  Compass,
  MapPin,
  Building2,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Minus,
  RotateCcw,
  ShieldCheck,
  Send,
  SlidersHorizontal,
} from "lucide-react";

interface InteractiveGlobalMapProps {
  onSelectCountry?: (country: CountryData) => void;
  selectedCountryId?: string | null;
}

export function InteractiveGlobalMap({
  onSelectCountry,
  selectedCountryId: externalSelectedId,
}: InteractiveGlobalMapProps) {
  const { lang } = usePrefs();
  const ar = lang === "ar";
  const Arrow = ar ? ArrowLeft : ArrowRight;

  const [activeStageId, setActiveStageId] =
    useState<RoadmapStage["id"]>("arab-world");
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    "eg" // default Cairo Egypt HQ
  );
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);

  const defaultStage = roadmapStages[0] as RoadmapStage;
  const activeStage =
    roadmapStages.find((s) => s.id === activeStageId) ?? defaultStage;

  const selectedCountryId = externalSelectedId ?? internalSelectedId;

  // Selected country details
  const defaultCountry = arabCountriesList[0] as CountryData;
  const selectedCountry = useMemo(() => {
    return (
      arabCountriesList.find((c) => c.id === selectedCountryId) ?? defaultCountry
    );
  }, [selectedCountryId, defaultCountry]);

  // Filtered countries for directory and highlight
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return arabCountriesList.filter((country) => {
      const matchRegion =
        regionFilter === "all" || country.region === regionFilter;
      if (!matchRegion) return false;

      if (!q) return true;
      const matchAr = country.nameAr.toLowerCase().includes(q);
      const matchEn = country.nameEn.toLowerCase().includes(q);
      const matchCap =
        country.capitalAr.toLowerCase().includes(q) ||
        country.capitalEn.toLowerCase().includes(q);
      return matchAr || matchEn || matchCap;
    });
  }, [regionFilter, searchQuery]);

  // Coordinate Projection to SVG Canvas (viewBox 0 0 1000 600)
  const svgWidth = 1000;
  const svgHeight = 600;

  // Camera bounds based on active stage
  const camera = activeStage.camera;

  const projectCoords = (lat: number, lng: number) => {
    // Equirectangular projection relative to stage camera bounds
    const x =
      ((lng - camera.minLng) / (camera.maxLng - camera.minLng)) * svgWidth;
    const y =
      ((camera.maxLat - lat) / (camera.maxLat - camera.minLat)) * svgHeight;
    return { x, y };
  };

  const cairoCoords = projectCoords(30.0444, 31.2357);

  const handleCountryClick = (country: CountryData) => {
    setInternalSelectedId(country.id);
    if (onSelectCountry) onSelectCountry(country);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="relative rounded-3xl bg-neutral-950 border border-neutral-800/90 shadow-2xl overflow-hidden selection:bg-amber-500/20">
      {/* Dynamic Background Ambient Light */}
      <div
        className="absolute -top-32 -end-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeStage.accentGlow }}
      />
      <div
        className="absolute -bottom-32 -start-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activeStage.accentGlow }}
      />

      {/* Top Header: 4-Stage Roadmap Switcher */}
      <div className="relative z-20 border-b border-neutral-800/90 bg-neutral-900/80 backdrop-blur-md p-4 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 text-start">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{ar ? "نطاق الانطلاق والتوسع الرسمي" : "Official Expansion Scope"}</span>
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {ar ? "خريطة المراحل الأربع" : "4-Phase Roadmap"}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Globe2 className="w-6 h-6 text-amber-400 shrink-0" />
              <span>
                {ar
                  ? "نطاق عمل ونيسي: من الـ 22 دولة عربية إلى العالمية"
                  : "Waneesi Scope: From 22 Arab Nations to Worldwide"}
              </span>
            </h2>
          </div>

          {/* Quick Stage Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-start">
            {roadmapStages.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setActiveStageId(stage.id);
                    setZoomLevel(1);
                  }}
                  className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-neutral-800 text-white border-amber-400/60 shadow-lg shadow-amber-500/10 scale-102"
                      : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white hover:bg-neutral-800/60"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      stage.id === "arab-world"
                        ? "bg-emerald-400"
                        : stage.id === "europe"
                        ? "bg-sky-400"
                        : stage.id === "americas"
                        ? "bg-amber-400"
                        : "bg-purple-400"
                    }`}
                  />
                  <span>
                    {ar ? `المرحلة ${stage.stageNumber}: ${stage.titleAr.split(" ")[0]}` : stage.titleEn.split(" ")[0]}
                  </span>
                  {stage.id === "arab-world" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black">
                      22 دولة
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Active Stage Summary Banner */}
        <div className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${activeStage.themeColor}`}>
                {ar ? activeStage.badgeAr : activeStage.badgeEn}
              </span>
              <span className="text-xs font-bold text-neutral-300">
                {ar ? activeStage.titleAr : activeStage.titleEn}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-3xl">
              {ar ? activeStage.descAr : activeStage.descEn}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-xl">
              {ar ? activeStage.totalCountriesTextAr : activeStage.totalCountriesTextEn}
            </span>
          </div>
        </div>
      </div>

      {/* Main Map Visual Canvas with Zoom & Controls */}
      <div className="relative h-[480px] sm:h-[580px] lg:h-[620px] w-full bg-[#050b10] overflow-hidden select-none">
        {/* Floating Zoom & Reset Toolbar */}
        <div className="absolute top-4 start-4 z-30 flex flex-col gap-1.5 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 p-1 rounded-2xl shadow-xl">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl bg-neutral-800/70 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            title={ar ? "تكبير الخريطة" : "Zoom In"}
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl bg-neutral-800/70 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            title={ar ? "تصغير الخريطة" : "Zoom Out"}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="w-8 h-8 rounded-xl bg-neutral-800/70 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            title={ar ? "إعادة الضبط" : "Reset View"}
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Floating Cairo HQ Beacon Badge */}
        <div className="absolute bottom-4 start-4 z-30 p-3 rounded-2xl bg-neutral-900/90 backdrop-blur-md border border-amber-500/30 text-start shadow-xl flex items-center gap-3 max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Building2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-xs font-black text-white">
                {ar ? "مقر الإدارة الرئيسي • القاهرة مصر" : "Main Operations HQ • Cairo, Egypt"}
              </p>
            </div>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              {ar ? "إحداثيات 30.0444, 31.2357 • 24/7 طوال الأسبوع" : "Coordinates 30.0444, 31.2357 • 24/7"}
            </p>
          </div>
        </div>

        {/* SVG Interactive Canvas */}
        <div
          className="w-full h-full transition-transform duration-500 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              {/* Radial Gradients */}
              <radialGradient id="hqPulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Linear Gradients for Arcs */}
              <linearGradient id="arcCairoToArab" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.4" />
              </linearGradient>

              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Latitude & Longitude Grid Lines */}
            <g stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4">
              {[100, 200, 300, 400, 500].map((y) => (
                <line key={`h-${y}`} x1="0" y1={y} x2={svgWidth} y2={y} />
              ))}
              {[150, 300, 450, 600, 750, 900].map((x) => (
                <line key={`v-${x}`} x1={x} y1="0" x2={x} y2={svgHeight} />
              ))}
            </g>

            {/* Simplified Silhouette Backdrop for Continents */}
            <g fill="#0c1622" stroke="#172638" strokeWidth="1" opacity="0.85">
              {/* Africa & Middle East Landmass Representation */}
              <path d="M 120 220 Q 240 180 420 210 Q 520 220 580 280 Q 640 330 600 460 Q 480 560 380 580 Q 260 520 180 380 Z" />
              {/* Arabian Peninsula */}
              <path d="M 520 280 Q 620 290 680 360 Q 660 440 560 410 Q 520 340 520 280 Z" />
              {/* Europe Preview Silhouette */}
              <path d="M 220 80 Q 400 60 560 110 Q 460 200 320 190 Q 240 150 220 80 Z" opacity="0.6" />
            </g>

            {/* Stage 1: Connection Arcs from Cairo HQ to All Arab Countries */}
            {activeStageId === "arab-world" && (
              <g stroke="url(#arcCairoToArab)" strokeWidth="1" strokeDasharray="2 2" opacity="0.35">
                {arabCountriesList.map((country) => {
                  if (country.isHQ) return null;
                  const target = projectCoords(country.lat, country.lng);
                  const midX = (cairoCoords.x + target.x) / 2;
                  const midY = (cairoCoords.y + target.y) / 2 - 25; // Curve arc upwards
                  return (
                    <path
                      key={`arc-${country.id}`}
                      d={`M ${cairoCoords.x} ${cairoCoords.y} Q ${midX} ${midY} ${target.x} ${target.y}`}
                      fill="none"
                    />
                  );
                })}
              </g>
            )}

            {/* Stage 2: Europe Hubs */}
            {activeStageId === "europe" && (
              <g>
                {europeHubs.map((hub, i) => {
                  const pt = projectCoords(hub.lat, hub.lng);
                  return (
                    <g key={`eu-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
                      <circle r="12" fill="#0284c7" opacity="0.2" className="animate-ping" />
                      <circle r="6" fill="#38bdf8" stroke="#082f49" strokeWidth="2" />
                      <text
                        x="0"
                        y="18"
                        textAnchor="middle"
                        fill="#bae6fd"
                        fontSize="10"
                        fontWeight="bold"
                        className="pointer-events-none select-none"
                      >
                        {ar ? hub.nameAr : hub.nameEn} {hub.flag}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* Stage 3: Americas Hubs */}
            {activeStageId === "americas" && (
              <g>
                {americasHubs.map((hub, i) => {
                  const pt = projectCoords(hub.lat, hub.lng);
                  return (
                    <g key={`am-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
                      <circle r="12" fill="#f59e0b" opacity="0.2" className="animate-ping" />
                      <circle r="6" fill="#fbbf24" stroke="#451a03" strokeWidth="2" />
                      <text
                        x="0"
                        y="18"
                        textAnchor="middle"
                        fill="#fef3c7"
                        fontSize="10"
                        fontWeight="bold"
                        className="pointer-events-none select-none"
                      >
                        {ar ? hub.nameAr : hub.nameEn} {hub.flag}
                      </text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* Stage 1: Render All 22 Arab Countries Markers */}
            {activeStageId === "arab-world" && (
              <g>
                {arabCountriesList.map((country) => {
                  const pt = projectCoords(country.lat, country.lng);
                  const isSelected = country.id === selectedCountryId;
                  const isHovered = country.id === hoveredCountryId;
                  const isHQ = country.isHQ;

                  // Small countries leader line offsets
                  const hasLeader = country.smallCountry && country.badgeOffsetX && country.badgeOffsetY;
                  const badgeX = pt.x + (country.badgeOffsetX || 0);
                  const badgeY = pt.y + (country.badgeOffsetY || 0);

                  return (
                    <g
                      key={`country-${country.id}`}
                      className="cursor-pointer transition-transform duration-200"
                      onClick={() => handleCountryClick(country)}
                      onMouseEnter={() => setHoveredCountryId(country.id)}
                      onMouseLeave={() => setHoveredCountryId(null)}
                    >
                      {/* HQ Cairo Pulsating Halo */}
                      {isHQ && (
                        <g>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="28"
                            fill="url(#hqPulse)"
                            className="animate-pulse"
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="18"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                            className="animate-spin"
                            style={{ animationDuration: "14s" }}
                          />
                        </g>
                      )}

                      {/* Small Country Leader Line */}
                      {hasLeader && (
                        <line
                          x1={pt.x}
                          y1={pt.y}
                          x2={badgeX}
                          y2={badgeY}
                          stroke={isSelected ? "#10b981" : "#64748b"}
                          strokeWidth="1"
                          strokeDasharray="2 2"
                        />
                      )}

                      {/* Selection / Hover Glow Ring */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHQ ? "16" : "13"}
                          fill="none"
                          stroke={isHQ ? "#f59e0b" : "#10b981"}
                          strokeWidth="2"
                          className="animate-ping"
                          style={{ animationDuration: "2s" }}
                        />
                      )}

                      {/* Center Point Circle */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHQ ? "8" : isSelected ? "6.5" : "5"}
                        fill={isHQ ? "#f59e0b" : isSelected ? "#10b981" : "#34d399"}
                        stroke="#0f172a"
                        strokeWidth="2"
                        filter={isSelected ? "url(#glowEffect)" : undefined}
                      />

                      {/* Anchored Floating Badge for Small Countries */}
                      {hasLeader ? (
                        <g transform={`translate(${badgeX}, ${badgeY})`}>
                          <rect
                            x={ar ? -70 : -10}
                            y="-11"
                            width="80"
                            height="20"
                            rx="10"
                            fill={isSelected ? "#10b981" : "#0f172a"}
                            stroke={isSelected ? "#34d399" : "#334155"}
                            strokeWidth="1"
                            opacity="0.95"
                          />
                          <text
                            x={ar ? -30 : 30}
                            y="3"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="9"
                            fontWeight="bold"
                            className="pointer-events-none select-none"
                          >
                            {country.flag} {country.nameAr.split(" ")[0]}
                          </text>
                        </g>
                      ) : (
                        /* Standard Label for Large/Medium Countries */
                        <g transform={`translate(${pt.x}, ${pt.y})`}>
                          <text
                            x="0"
                            y={isHQ ? "-14" : "16"}
                            textAnchor="middle"
                            fill={isHQ ? "#fcd34d" : isSelected ? "#34d399" : "#e2e8f0"}
                            fontSize={isHQ ? "11" : "9.5"}
                            fontWeight={isHQ || isSelected ? "bold" : "600"}
                            stroke="#0b1118"
                            strokeWidth="3"
                            paintOrder="stroke"
                            className="pointer-events-none select-none"
                          >
                            {country.flag} {ar ? country.nameAr.split(" ")[0] : country.nameEn.split(" ")[0]}
                          </text>
                          {isHQ && (
                            <text
                              x="0"
                              y="-25"
                              textAnchor="middle"
                              fill="#f59e0b"
                              fontSize="8"
                              fontWeight="black"
                              stroke="#0b1118"
                              strokeWidth="2"
                              paintOrder="stroke"
                              className="pointer-events-none select-none"
                            >
                              ★ المقر الرئيسي HQ
                            </text>
                          )}
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Bottom Inspection & Interactive Country Directory */}
      <div className="relative z-20 border-t border-neutral-800/90 bg-neutral-900/95 backdrop-blur-md p-5 sm:p-7 space-y-6">
        {/* Selected Country Spotlight Details */}
        <div className="p-5 rounded-3xl bg-neutral-950/80 border border-neutral-800 shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-start">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-3xl shrink-0 shadow-inner">
              {selectedCountry.flag}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-white px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {ar ? selectedCountry.statusTextAr : selectedCountry.statusTextEn}
                </span>
                <span className="text-xs font-semibold text-neutral-400">
                  {ar ? selectedCountry.regionAr : selectedCountry.regionEn}
                </span>
                {selectedCountry.isHQ && (
                  <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    ★ {ar ? "المقر التشغيلي المركزي" : "Central Operations HQ"}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white">
                {ar ? selectedCountry.nameAr : selectedCountry.nameEn}
                <span className="text-sm font-medium text-neutral-400 ms-2">
                  ({ar ? `العاصمة: ${selectedCountry.capitalAr}` : `Capital: ${selectedCountry.capitalEn}`})
                </span>
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                {ar ? selectedCountry.petCommunityHighlightAr : selectedCountry.petCommunityHighlightEn}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
              {selectedCountry.lat.toFixed(4)}° N, {selectedCountry.lng.toFixed(4)}° E
            </div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
              <span>{ar ? "مفعل بالكامل" : "Fully Integrated"}</span>
            </span>
          </div>
        </div>

        {/* Directory Search & Region Filter Bar */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Region Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-start">
              {[
                { id: "all", labelAr: "كل الدول (22)", labelEn: "All Nations (22)" },
                { id: "gulf", labelAr: "الخليج العربي (7)", labelEn: "Gulf (7)" },
                { id: "north-africa", labelAr: "شمال أفريقيا (7)", labelEn: "North Africa (7)" },
                { id: "levant", labelAr: "المشرق العربي (5)", labelEn: "The Levant (5)" },
                { id: "horn-islands", labelAr: "القرن والجزر (3)", labelEn: "Horn & Islands (3)" },
              ].map((rf) => (
                <button
                  key={rf.id}
                  onClick={() => setRegionFilter(rf.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    regionFilter === rf.id
                      ? "bg-emerald-500 text-neutral-950 border-emerald-400 font-black shadow-sm"
                      : "bg-neutral-800/60 text-neutral-400 border-neutral-700/60 hover:text-white"
                  }`}
                >
                  {ar ? rf.labelAr : rf.labelEn}
                </button>
              ))}
            </div>

            {/* Quick Country Search */}
            <div className="relative min-w-[200px] sm:w-60">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ar ? "ابحث عن أي دولة..." : "Search country..."}
                className="w-full ps-9 pe-8 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 -translate-y-1/2 end-2.5 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Grid of 22 Arab Countries */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pt-2">
            {filteredCountries.map((country) => {
              const isSelected = country.id === selectedCountryId;
              return (
                <button
                  key={country.id}
                  onClick={() => handleCountryClick(country)}
                  className={`p-2.5 rounded-xl border text-start transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? "bg-emerald-500/15 border-emerald-500 text-white shadow-sm"
                      : "bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:bg-neutral-800/70 hover:text-white hover:border-neutral-700"
                  }`}
                >
                  <span className="text-lg shrink-0">{country.flag}</span>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold truncate">
                      {ar ? country.nameAr : country.nameEn}
                    </p>
                    <p className="text-[10px] text-neutral-500 truncate">
                      {ar ? country.capitalAr : country.capitalEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

