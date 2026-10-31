import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Building2, Landmark, Pause, Play, RotateCcw, X } from "lucide-react";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
    ARAB_BY_KEY,
    ARAB_COUNT,
    ARAB_COUNTRIES,
    ARAB_GROUPS,
    PHASES,
    type Phase,
    type PhaseInfo,
} from "@/lib/expansion";

/* -------------------------------------------------------------------------- */
/*  Types & helpers                                                           */
/* -------------------------------------------------------------------------- */

type WorldData = typeof import("@/lib/world-map-data");
type VB = { x: number; y: number; w: number; h: number };
type Tip = { x: number; y: number; k: string; ph: Phase };
type BoxLike = { x0: number; y0: number; x1: number; y1: number };

const NEUTRAL_LAND = "color-mix(in oklab, currentColor 14%, transparent)";
const TOUR_STEP_MS = 4200;

function getPhase(ph: number): PhaseInfo {
    return PHASES[ph - 1] ?? (PHASES[0] as PhaseInfo);
}

/** Fit a bounding box into a viewport with the given aspect ratio. */
function fit(box: BoxLike, aspect: number, pad: number): VB {
    let w = (box.x1 - box.x0) * (1 + pad * 2);
    let h = (box.y1 - box.y0) * (1 + pad * 2);
    if (w / h < aspect) w = h * aspect;
    else h = w / aspect;
    return { x: (box.x0 + box.x1) / 2 - w / 2, y: (box.y0 + box.y1) / 2 - h / 2, w, h };
}

const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/** Small tweaks so neighbouring labels don't collide (screen px). */
const LABEL_DY: Record<string, number> = { EGY: 16, SAU: 4 };

const COPY = {
    ar: {
        title: "نطاق عمل ونيسي",
        sub: "نطلق رسميًا في 22 دولة عربية، ثم نتوسع إلى أوروبا والأمريكتين، وبعدها العالم كله.",
        tour: "ابدأ جولة التوسع",
        stopTour: "إيقاف الجولة",
        scope: "النطاق الحالي",
        reset: "عرض المنطقة كاملة",
        directory: "دول الانطلاق الأول",
        directoryHint: "اختر أي دولة لتقريب الخريطة عليها",
        capital: "العاصمة",
        inScope: "ضمن نطاق الانطلاق الرسمي الأول",
        hq: "مقر إدارة ونيسي",
        hqCity: "القاهرة، مصر",
        hqPin: "مقر الإدارة",
        loading: "جارٍ تحميل الخريطة…",
        disclaimer: "الخريطة توضيحية ولا تُعبّر عن حدود رسمية.",
        countries: "دولة",
        aria: "خريطة نطاق عمل ونيسي: 22 دولة عربية للانطلاق الأول، ثم أوروبا، ثم الأمريكتان، ثم العالم.",
    },
    en: {
        title: "Waneesi's service area",
        sub: "Officially launching across 22 Arab countries, then expanding to Europe, the Americas, and the whole world.",
        tour: "Take the expansion tour",
        stopTour: "Stop tour",
        scope: "Current scope",
        reset: "Show the whole region",
        directory: "First launch countries",
        directoryHint: "Select a country to zoom in",
        capital: "Capital",
        inScope: "Part of the official first launch",
        hq: "Waneesi management HQ",
        hqCity: "Cairo, Egypt",
        hqPin: "Management HQ",
        loading: "Loading map…",
        disclaimer: "Illustrative map, not an official boundary reference.",
        countries: "countries",
        aria: "Waneesi service area map: 22 Arab countries for the first launch, then Europe, the Americas, and the world.",
    },
} as const;

/* -------------------------------------------------------------------------- */
/*  Flag                                                                      */
/* -------------------------------------------------------------------------- */

function Flag({ iso, className = "h-3.5 w-5" }: { iso: string; className?: string }) {
    const [bad, setBad] = useState(false);
    if (bad) return <span className={`${className} inline-block rounded-xs bg-muted`} />;
    return (
        <img
            src={`https://flagcdn.com/w40/${iso}.png`}
            alt=""
            loading="lazy"
            onError={() => setBad(true)}
            className={`${className} shrink-0 rounded-xs border border-black/10 object-cover shadow-xs`}
        />
    );
}

/* -------------------------------------------------------------------------- */
/*  Land shapes (memoised — repainting ~180 paths only when phase/selection   */
/*  changes, never during camera animation)                                   */
/* -------------------------------------------------------------------------- */

const Shapes = memo(function Shapes({
    shapes,
    phase,
    selKey,
}: {
    shapes: WorldData["WORLD_SHAPES"];
    phase: Phase;
    selKey: string | null;
}) {
    return (
        <g>
            {shapes.map(([k, ph, d], i) => {
                const revealed = ph <= phase;
                let fill = NEUTRAL_LAND;
                let opacity = 1;
                if (revealed) {
                    fill = getPhase(ph).color;
                    if (ph === 1) opacity = selKey && k !== selKey ? 0.5 : 1;
                    else opacity = ph === phase ? 0.85 : 0.45;
                }
                return (
                    <path
                        key={`${k}-${i}`}
                        d={d}
                        data-k={k}
                        data-ph={ph}
                        fill={fill}
                        fillOpacity={opacity}
                        stroke="currentColor"
                        strokeOpacity={0.2}
                        strokeWidth={0.5}
                        vectorEffect="non-scaling-stroke"
                        style={{ transition: "fill 700ms ease, fill-opacity 700ms ease", cursor: "pointer" }}
                    />
                );
            })}
        </g>
    );
});

/* -------------------------------------------------------------------------- */
/*  World canvas: owns the SVG + the camera. Parent never re-renders per      */
/*  animation frame.                                                          */
/* -------------------------------------------------------------------------- */

interface CanvasProps {
    data: WorldData;
    wrapRef: { current: HTMLDivElement | null };
    phase: Phase;
    selKey: string | null;
    hlKey: string | null;
    active: boolean;
    reduce: boolean;
    ar: boolean;
    onTip: (t: Tip | null) => void;
    onPick: (k: string, ph: Phase) => void;
}

const WorldCanvas = memo(function WorldCanvas(props: CanvasProps) {
    const { data, wrapRef, phase, selKey, hlKey, active, reduce, ar, onTip, onPick } = props;
    const t = COPY[ar ? "ar" : "en"];

    const svgRef = useRef<SVGSVGElement>(null);
    const vbRef = useRef<VB | null>(null);
    const rafRef = useRef(0);
    const sizeRef = useRef({ w: 800, h: 520 });
    const startedRef = useRef(false);
    const [k, setK] = useState(0.35); // map units per screen pixel → keeps markers a constant size
    const [sizeTick, setSizeTick] = useState(0);

    const apply = useCallback((vb: VB) => {
        vbRef.current = vb;
        svgRef.current?.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
        setK(vb.w / Math.max(sizeRef.current.w, 1));
    }, []);

    const boxFromView = useCallback(
        (v: { lon0: number; lon1: number; lat0: number; lat1: number }): BoxLike => {
            const [x0, y0] = data.project(v.lon0, v.lat1);
            const [x1, y1] = data.project(v.lon1, v.lat0);
            return { x0, y0, x1, y1 };
        },
        [data],
    );

    const worldVB = useCallback((): VB => {
        const { w, h } = sizeRef.current;
        return fit(boxFromView(getPhase(4).view), w / Math.max(h, 1), 0.02);
    }, [boxFromView]);

    const targetFor = useCallback((): VB => {
        const { w, h } = sizeRef.current;
        const aspect = w / Math.max(h, 1);
        const g = selKey ? data.ARAB_GEO[selKey] : undefined;
        if (g) {
            const cx = (g.x0 + g.x1) / 2;
            const cy = (g.y0 + g.y1) / 2;
            const hw = Math.max(g.x1 - g.x0, 26) / 2;
            const hh = Math.max(g.y1 - g.y0, 26) / 2;
            return fit({ x0: cx - hw, y0: cy - hh, x1: cx + hw, y1: cy + hh }, aspect, 0.35);
        }
        return fit(boxFromView(getPhase(phase).view), aspect, 0.04);
    }, [data, phase, selKey, boxFromView]);

    const fly = useCallback(
        (to: VB, ms: number) => {
            cancelAnimationFrame(rafRef.current);
            const from = vbRef.current;
            if (!from || ms <= 0) {
                apply(to);
                return;
            }
            const t0 = performance.now();
            const step = (now: number) => {
                const p = Math.min(1, (now - t0) / ms);
                const e = easeInOut(p);
                const w = from.w * Math.pow(to.w / from.w, e); // geometric zoom feels natural
                const h = w * (to.h / to.w);
                const cx = from.x + from.w / 2 + (to.x + to.w / 2 - (from.x + from.w / 2)) * e;
                const cy = from.y + from.h / 2 + (to.y + to.h / 2 - (from.y + from.h / 2)) * e;
                apply({ x: cx - w / 2, y: cy - h / 2, w, h });
                if (p < 1) rafRef.current = requestAnimationFrame(step);
            };
            rafRef.current = requestAnimationFrame(step);
        },
        [apply],
    );

    // Measure the container
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const measure = () => {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
                sizeRef.current = { w: r.width, h: r.height };
                setSizeTick((n) => n + 1);
            }
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [wrapRef]);

    // Snap (no animation) on resize, and park on the world view before the intro
    useEffect(() => {
        cancelAnimationFrame(rafRef.current);
        apply(startedRef.current ? targetFor() : worldVB());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sizeTick]);

    // Fly whenever the focus changes (first time = cinematic intro from the world view)
    useEffect(() => {
        if (!active) return;
        const first = !startedRef.current;
        startedRef.current = true;
        fly(targetFor(), reduce ? 0 : first ? 2400 : selKey ? 1000 : 1400);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, phase, selKey, data]);

    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    const find = (target: EventTarget) => (target as Element).closest?.("[data-k]") ?? null;
    const [hx, hy] = data.project(siteConfig.headquarters.longitude, siteConfig.headquarters.latitude);
    const showMarks = phase === 1 || !!selKey;
    const highlighted = hlKey && hlKey !== "HQ" ? data.WORLD_SHAPES.filter((s) => s[0] === hlKey) : [];

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${data.WORLD_W} ${data.WORLD_H}`}
            className="absolute inset-0 block h-full w-full text-foreground"
            role="img"
            aria-label={t.aria}
            onPointerMove={(e) => {
                const el = find(e.target);
                const box = wrapRef.current?.getBoundingClientRect();
                if (!el || !box) return onTip(null);
                onTip({
                    x: e.clientX - box.left,
                    y: e.clientY - box.top,
                    k: el.getAttribute("data-k") ?? "",
                    ph: Number(el.getAttribute("data-ph")) as Phase,
                });
            }}
            onPointerLeave={() => onTip(null)}
            onClick={(e) => {
                const el = find(e.target);
                if (el) onPick(el.getAttribute("data-k") ?? "", Number(el.getAttribute("data-ph")) as Phase);
            }}
        >
            <Shapes shapes={data.WORLD_SHAPES} phase={phase} selKey={selKey} />

            {/* hover / selection outline on top */}
            <g pointerEvents="none">
                {highlighted.map(([key, , d], i) => (
                    <path
                        key={`${key}-hl-${i}`}
                        d={d}
                        fill="none"
                        stroke="#fff"
                        strokeWidth={key === selKey ? 2 : 1.4}
                        vectorEffect="non-scaling-stroke"
                    />
                ))}
            </g>

            {/* country labels & markers: drawn in screen pixels so they never scale with the zoom */}
            <g
                style={{
                    opacity: showMarks ? 1 : 0,
                    transition: "opacity 500ms ease",
                    pointerEvents: showMarks ? "auto" : "none",
                }}
            >
                {ARAB_COUNTRIES.map((c) => {
                    const g = data.ARAB_GEO[c.key];
                    if (!g) return null;
                    const big = Math.max(g.x1 - g.x0, g.y1 - g.y0) >= 15;
                    const isSel = selKey === c.key;
                    const label = ar ? c.ar : c.en;
                    return (
                        <g
                            key={c.key}
                            data-k={c.key}
                            data-ph={1}
                            transform={`translate(${g.cx} ${g.cy}) scale(${k})`}
                            style={{ cursor: "pointer" }}
                        >
                            {!big && (
                                <>
                                    <circle r={10} fill="transparent" />
                                    {!reduce && (
                                        <circle r={3.2} fill="none" stroke={getPhase(1).color} strokeWidth={1.5}>
                                            <animate attributeName="r" values="3.2;11" dur="2.4s" repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
                                        </circle>
                                    )}
                                    <circle r={isSel ? 5 : 3.4} fill="#fff" stroke={getPhase(1).color} strokeWidth={1.8} />
                                </>
                            )}
                            {(big || selKey) && (
                                <text
                                    y={big ? (LABEL_DY[c.key] ?? 0) : -10}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="#fff"
                                    stroke="rgba(8,30,33,0.78)"
                                    strokeWidth={3}
                                    strokeLinejoin="round"
                                    paintOrder="stroke"
                                    fontSize={isSel ? 13 : 11}
                                    fontWeight={700}
                                    pointerEvents="none"
                                >
                                    {label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </g>

            {/* headquarters pin — always visible */}
            <g data-k="HQ" data-ph={1} transform={`translate(${hx} ${hy}) scale(${k})`} style={{ cursor: "pointer" }}>
                <circle r={14} fill="transparent" />
                {!reduce && (
                    <circle r={6} fill="none" stroke={siteConfig.colors.saffron} strokeWidth={2}>
                        <animate attributeName="r" values="6;18" dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0" dur="2.2s" repeatCount="indefinite" />
                    </circle>
                )}
                <circle r={6.5} fill={siteConfig.colors.saffron} stroke="#fff" strokeWidth={2} />
                <circle r={2.3} fill={siteConfig.colors.charcoal} />
                {showMarks && (
                    <text
                        x={11}
                        y={-11}
                        textAnchor="start"
                        dominantBaseline="middle"
                        fill="#FBE7A6"
                        stroke="rgba(8,30,33,0.78)"
                        strokeWidth={3}
                        strokeLinejoin="round"
                        paintOrder="stroke"
                        fontSize={10.5}
                        fontWeight={700}
                        pointerEvents="none"
                    >
                        {t.hqPin}
                    </text>
                )}
            </g>
        </svg>
    );
});

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export function ExpansionMap() {
    const { lang } = usePrefs();
    const ar = lang === "ar";
    const lc = ar ? "ar" : "en";
    const t = COPY[lc];

    const rootRef = useRef<HTMLElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);

    const [data, setData] = useState<WorldData | null>(null);
    const [active, setActive] = useState(false);
    const [phase, setPhase] = useState<Phase>(1);
    const [selKey, setSelKey] = useState<string | null>(null);
    const [tip, setTip] = useState<Tip | null>(null);
    const [dirHover, setDirHover] = useState<string | null>(null);
    const [touring, setTouring] = useState(false);
    const [reduce, setReduce] = useState(false);

    useEffect(() => {
        setReduce(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
        let alive = true;
        import("@/lib/world-map-data").then((m) => alive && setData(m));
        return () => {
            alive = false;
        };
    }, []);

    // Start the cinematic intro when the map scrolls into view
    useEffect(() => {
        if (!data || active) return;
        const el = rootRef.current;
        if (!el || typeof IntersectionObserver === "undefined") {
            setActive(true);
            return;
        }
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setActive(true);
                    io.disconnect();
                }
            },
            { threshold: 0.3 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, [data, active]);

    // Guided tour: phase 1 → 4, then stop
    useEffect(() => {
        if (!touring) return;
        const id = window.setTimeout(() => {
            if (phase < 4) setPhase((p) => (p + 1) as Phase);
            else {
                setTouring(false);
                setPhase(1);
            }
        }, TOUR_STEP_MS);
        return () => window.clearTimeout(id);
    }, [touring, phase]);

    const goPhase = (p: Phase) => {
        setTouring(false);
        setSelKey(null);
        setPhase(p);
    };

    const toggleTour = () => {
        if (touring) return setTouring(false);
        setSelKey(null);
        setPhase(1);
        setTouring(true);
    };

    const toggleCountry = useCallback((key: string) => {
        setTouring(false);
        setSelKey((prev) => (prev === key ? null : key));
    }, []);

    const handlePick = useCallback(
        (k: string, ph: Phase) => {
            if (k === "HQ") return toggleCountry("EGY");
            if (ARAB_BY_KEY[k]) return toggleCountry(k);
            setTouring(false);
            setSelKey(null);
            setPhase(ph);
        },
        [toggleCountry],
    );

    const handleTip = useCallback((v: Tip | null) => setTip(v), []);

    const current = getPhase(phase);
    const cur = current[lc];
    const selected = selKey ? ARAB_BY_KEY[selKey] : null;
    const hlKey = tip?.k ?? dirHover ?? selKey;
    const scopeText = PHASES.filter((p) => p.id <= phase)
        .map((p) => p[lc].short)
        .join(" + ");

    const startSide = ar ? "right-3 sm:right-4" : "left-3 sm:left-4";
    const endSide = ar ? "left-3 sm:left-4" : "right-3 sm:right-4";

    /* tooltip */
    const renderTip = () => {
        if (!tip) return null;
        const w = wrapRef.current?.clientWidth ?? 600;
        const h = wrapRef.current?.clientHeight ?? 400;
        const left = Math.max(8, Math.min(tip.x + 14, w - 230));
        const top = tip.y > h - 110 ? tip.y - 74 : tip.y + 14;
        const country = ARAB_BY_KEY[tip.k];
        return (
            <div
                dir={ar ? "rtl" : "ltr"}
                className="pointer-events-none absolute z-20 w-[214px] rounded-2xl border border-border/80 bg-card/95 p-3 text-start shadow-xl backdrop-blur"
                style={{ left, top }}
            >
                {country ? (
                    <div className="flex items-center gap-2.5">
                        <Flag iso={country.iso2} className="h-4 w-6" />
                        <div className="min-w-0">
                            <div className="truncate text-sm font-extrabold text-foreground">{ar ? country.ar : country.en}</div>
                            <div className="truncate text-[11px] text-muted-foreground">
                                {t.capital}: {ar ? country.capAr : country.capEn}
                            </div>
                        </div>
                    </div>
                ) : tip.k === "HQ" ? (
                    <div className="flex items-center gap-2.5">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/20 text-amber-500">
                            <Building2 className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                            <div className="truncate text-sm font-extrabold text-foreground">{t.hq}</div>
                            <div className="text-[11px] text-muted-foreground">{t.hqCity}</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2.5">
                        <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: getPhase(tip.ph).color }} />
                        <div className="min-w-0">
                            <div className="truncate text-sm font-extrabold text-foreground">{getPhase(tip.ph)[lc].name}</div>
                            <div className="text-[11px] text-muted-foreground">{getPhase(tip.ph)[lc].tag}</div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <section
            ref={rootRef}
            id="scope"
            aria-label={t.title}
            className="overflow-hidden rounded-[28px] border border-border/80 bg-card shadow-xl sm:rounded-[36px]"
        >
            {/* Header */}
            <div className="flex flex-col gap-4 p-5 sm:p-7 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl space-y-1.5 text-start">
                    <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">{t.title}</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{t.sub}</p>
                </div>
                <button
                    type="button"
                    onClick={toggleTour}
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 self-start rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:self-auto"
                >
                    {touring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>{touring ? t.stopTour : t.tour}</span>
                </button>
            </div>

            {/* Phase stepper */}
            <div className="grid grid-cols-2 gap-2 px-5 pb-5 sm:grid-cols-4 sm:gap-3 sm:px-7">
                {PHASES.map((p) => {
                    const on = p.id === phase;
                    const c = p[lc];
                    return (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => goPhase(p.id)}
                            aria-pressed={on}
                            className={`cursor-pointer rounded-2xl border-2 p-3 text-start transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${on ? "bg-muted/60" : "border-transparent hover:bg-muted/40"
                                }`}
                            style={on ? { borderColor: p.color } : undefined}
                        >
                            <span
                                className="block h-1.5 w-full rounded-full transition-colors duration-500"
                                style={{ background: p.id <= phase ? p.color : "color-mix(in oklab, currentColor 12%, transparent)" }}
                            />
                            <span className="mt-3 flex items-center gap-2">
                                <span
                                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-black text-[#12181B]"
                                    style={{ background: p.color }}
                                >
                                    {p.id}
                                </span>
                                <span className="truncate text-sm font-bold text-foreground">{c.name}</span>
                            </span>
                            <span className="mt-1 block truncate text-[11px] text-muted-foreground">{c.tag}</span>
                        </button>
                    );
                })}
            </div>

            {/* Body: map + side panel */}
            <div className="grid border-t border-border/70 lg:grid-cols-[minmax(0,1fr)_380px]">
                {/* Map */}
                <div
                    ref={wrapRef}
                    dir="ltr"
                    className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-[620px]"
                    style={{
                        background:
                            "radial-gradient(120% 90% at 58% 42%, color-mix(in oklab, #2A9D8F 16%, transparent), transparent 70%), color-mix(in oklab, currentColor 4%, transparent)",
                    }}
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 text-foreground opacity-[0.07]"
                        style={{ backgroundImage: "radial-gradient(currentColor 0.7px, transparent 0.7px)", backgroundSize: "22px 22px" }}
                    />

                    {data ? (
                        <WorldCanvas
                            data={data}
                            wrapRef={wrapRef}
                            phase={phase}
                            selKey={selKey}
                            hlKey={hlKey}
                            active={active}
                            reduce={reduce}
                            ar={ar}
                            onTip={handleTip}
                            onPick={handlePick}
                        />
                    ) : (
                        <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-muted-foreground">
                            <span className="animate-pulse">{t.loading}</span>
                        </div>
                    )}

                    {/* Scope chip */}
                    <div
                        dir={ar ? "rtl" : "ltr"}
                        className={`pointer-events-none absolute top-3 z-10 flex max-w-[calc(100%-5rem)] items-center gap-2 rounded-full border border-border/70 bg-card/85 px-3 py-1.5 text-xs font-bold text-foreground shadow-md backdrop-blur sm:top-4 ${startSide}`}
                    >
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: current.color }} />
                        <span className="shrink-0 text-muted-foreground">{t.scope}:</span>
                        <span className="truncate">{scopeText}</span>
                    </div>

                    {/* Reset */}
                    {selected && (
                        <button
                            type="button"
                            onClick={() => setSelKey(null)}
                            className={`absolute top-3 z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border/70 bg-card/90 px-3 py-1.5 text-xs font-bold text-foreground shadow-md backdrop-blur transition hover:bg-card sm:top-4 ${endSide}`}
                        >
                            <RotateCcw className="h-3.5 w-3.5 text-primary" />
                            <span>{t.reset}</span>
                        </button>
                    )}

                    {renderTip()}
                </div>

                {/* Side panel */}
                <aside
                    dir={ar ? "rtl" : "ltr"}
                    className="flex flex-col border-t border-border/70 bg-card text-start lg:h-[620px] lg:border-s lg:border-t-0"
                >
                    <div className="space-y-3 border-b border-border/70 p-5 sm:p-6">
                        {selected ? (
                            <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <Flag iso={selected.iso2} className="h-6 w-9" />
                                        <h3 className="text-xl font-black text-foreground">{ar ? selected.ar : selected.en}</h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelKey(null)}
                                        aria-label={t.reset}
                                        className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-muted/50 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Landmark className="h-4 w-4 text-primary" />
                                    <span>
                                        {t.capital}: <b className="text-foreground">{ar ? selected.capAr : selected.capEn}</b>
                                    </span>
                                </div>
                                <span
                                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-foreground"
                                    style={{ background: "color-mix(in oklab, #2A9D8F 18%, transparent)" }}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: getPhase(1).color }} />
                                    {t.inScope}
                                </span>
                            </div>
                        ) : (
                            <div className="space-y-3" key={phase}>
                                <span
                                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-foreground"
                                    style={{ background: `color-mix(in oklab, ${current.color} 20%, transparent)` }}
                                >
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: current.color }} />
                                    {cur.tag}
                                </span>
                                <h3 className="text-xl font-black text-foreground">{cur.name}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">{cur.desc}</p>
                                <ul className="space-y-1.5">
                                    {cur.points.map((pt) => (
                                        <li key={pt} className="flex items-start gap-2 text-xs font-medium text-foreground">
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px]" style={{ background: current.color }} />
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Country directory */}
                    <div className="flex min-h-0 flex-1 flex-col">
                        <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-2 sm:px-6">
                            <div>
                                <h4 className="text-sm font-extrabold text-foreground">{t.directory}</h4>
                                <p className="text-[11px] text-muted-foreground">{t.directoryHint}</p>
                            </div>
                            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-black text-primary">
                                {ARAB_COUNT} {t.countries}
                            </span>
                        </div>

                        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 pt-2 pb-5 sm:px-6">
                            {ARAB_GROUPS.map((grp) => (
                                <div key={grp.id} className="space-y-1.5">
                                    <div className="text-[11px] font-bold text-muted-foreground">{grp[lc]}</div>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {ARAB_COUNTRIES.filter((c) => c.group === grp.id).map((c) => {
                                            const on = selKey === c.key;
                                            return (
                                                <button
                                                    key={c.key}
                                                    type="button"
                                                    onClick={() => toggleCountry(c.key)}
                                                    onMouseEnter={() => setDirHover(c.key)}
                                                    onMouseLeave={() => setDirHover(null)}
                                                    onFocus={() => setDirHover(c.key)}
                                                    onBlur={() => setDirHover(null)}
                                                    aria-pressed={on}
                                                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-2.5 py-2 text-start text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-primary ${on
                                                            ? "border-primary bg-primary/10 text-foreground"
                                                            : "border-border/70 bg-muted/30 text-foreground hover:bg-muted/70"
                                                        }`}
                                                >
                                                    <Flag iso={c.iso2} />
                                                    <span className="truncate">{ar ? c.ar : c.en}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Legend */}
            <div
                dir={ar ? "rtl" : "ltr"}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border/70 bg-muted/30 px-5 py-3 text-xs sm:px-7"
            >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    {PHASES.map((p) => (
                        <span key={p.id} className="inline-flex items-center gap-1.5 font-bold text-foreground">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                            {p[lc].short}
                        </span>
                    ))}
                    <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                        <span
                            className="h-2.5 w-2.5 rounded-full border border-white"
                            style={{ background: siteConfig.colors.saffron }}
                        />
                        {t.hqPin}
                    </span>
                </div>
                <span className="text-muted-foreground">{t.disclaimer}</span>
            </div>
        </section>
    );
}