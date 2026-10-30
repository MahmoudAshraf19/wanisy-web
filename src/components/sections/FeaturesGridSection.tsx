import { Link } from "@tanstack/react-router";
import { usePrefs } from "@/lib/prefs";
import { siteConfig } from "@/lib/config";
import {
  MessageSquare, Video, Clock, Stethoscope, ShoppingBag, Scissors, AlertTriangle, HeartHandshake,
  Compass, Users, BellRing, Globe2, Heart, MapPin, Play, ArrowRight, ArrowLeft,
  Building2, Bot, ShieldCheck, MessagesSquare, Languages, type LucideIcon,
} from "lucide-react";

type Kind = "post" | "video" | "stories" | "list" | "grid" | "map";
const meta: Record<string, { icon: LucideIcon; kind: Kind; tone: string }> = {
  "social-feed": { icon: MessageSquare, kind: "post", tone: "bg-brand-green" },
  reels: { icon: Video, kind: "video", tone: "bg-brand-sienna" },
  stories: { icon: Clock, kind: "stories", tone: "bg-brand-sand" },
  "vet-discovery": { icon: Stethoscope, kind: "list", tone: "bg-brand-green" },
  marketplace: { icon: ShoppingBag, kind: "grid", tone: "bg-brand-charcoal" },
  grooming: { icon: Scissors, kind: "list", tone: "bg-brand-sand" },
  "lost-found": { icon: AlertTriangle, kind: "post", tone: "bg-brand-sienna" },
  adoption: { icon: HeartHandshake, kind: "post", tone: "bg-brand-green" },
  "nearby-places": { icon: Compass, kind: "map", tone: "bg-brand-charcoal" },
  groups: { icon: Users, kind: "list", tone: "bg-brand-sienna" },
  notifications: { icon: BellRing, kind: "list", tone: "bg-brand-sand" },
  "global-community": { icon: Globe2, kind: "map", tone: "bg-brand-green" },
  "pet-hotels": { icon: Building2, kind: "list", tone: "bg-brand-sand" },
  "ai-assistant": { icon: Bot, kind: "post", tone: "bg-brand-green" },
  "pet-health": { icon: ShieldCheck, kind: "list", tone: "bg-brand-green" },
  chats: { icon: MessagesSquare, kind: "post", tone: "bg-brand-sienna" },
  multilingual: { icon: Languages, kind: "list", tone: "bg-brand-sand" },
};

const Bar = ({ w }: { w: string }) => <i className="block h-2 rounded-full bg-foreground/10" style={{ width: w }} />;

function Screen({ kind, tone, Icon, title }: { kind: Kind; tone: string; Icon: LucideIcon; title: string }) {
  const rows = [0, 1, 2];
  return (
    <div className="relative mx-auto w-[270px] rounded-[2.6rem] border-[6px] border-brand-charcoal/80 bg-background shadow-2xl sm:w-[290px]">
      <div className="absolute start-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-brand-charcoal/90 rtl:translate-x-1/2" />
      <div className="flex h-[520px] flex-col overflow-hidden rounded-[2.1rem]">
        <div className={`${tone} flex items-center gap-2 px-4 pb-3 pt-9 text-white`}>
          <img src={siteConfig.logoUrl} alt="" width={28} height={19} className="h-5 w-auto rounded bg-white/90 px-1" />
          <span className="truncate text-sm font-extrabold">{title}</span>
          <Icon className="ms-auto h-4 w-4 shrink-0" aria-hidden />
        </div>
        <div className="flex-1 space-y-3 overflow-hidden bg-muted/40 p-3">
          {kind === "post" && (
            <div className="space-y-3 rounded-2xl border bg-card p-3">
              <div className="flex items-center gap-2"><span className="h-8 w-8 rounded-full bg-brand-sand/70" /><div className="space-y-1.5"><Bar w="80px" /><Bar w="50px" /></div></div>
              <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-brand-sand/50 to-brand-green/40"><img src={siteConfig.logoUrl} alt="" className="h-16 w-auto opacity-90" /></div>
              <div className="flex items-center gap-4 text-muted-foreground"><Heart className="h-4 w-4 text-brand-sienna" /><MessageSquare className="h-4 w-4" /></div>
              <Bar w="90%" /><Bar w="60%" />
            </div>
          )}
          {kind === "video" && (
            <div className="relative flex h-[440px] items-end rounded-2xl bg-gradient-to-b from-brand-charcoal via-brand-sienna/70 to-brand-sand p-4">
              <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-sienna"><Play className="h-6 w-6" /></span>
              <div className="w-full space-y-2"><i className="block h-2 w-3/5 rounded-full bg-white/70" /><i className="block h-2 w-2/5 rounded-full bg-white/50" /></div>
              <div className="absolute end-3 bottom-16 space-y-4 text-white"><Heart className="h-6 w-6" /><MessageSquare className="h-6 w-6" /></div>
            </div>
          )}
          {kind === "stories" && (
            <>
              <div className="flex gap-3">{rows.concat(3).map((i) => <span key={i} className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-tr from-brand-sienna via-brand-sand to-brand-green p-[3px]"><span className="block h-full w-full rounded-full border-2 border-background bg-card" /></span>)}</div>
              <div className="h-80 rounded-2xl bg-gradient-to-br from-brand-sand/60 to-brand-sienna/40 p-3"><div className="flex gap-1">{rows.map((i) => <i key={i} className={`h-1 flex-1 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`} />)}</div></div>
            </>
          )}
          {kind === "list" && rows.concat(3).map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border bg-card p-3">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tone} text-white`}><Icon className="h-5 w-5" /></span>
              <div className="flex-1 space-y-1.5"><Bar w="70%" /><Bar w="45%" /></div>
              <span className="h-6 w-12 rounded-full bg-primary/15" />
            </div>
          ))}
          {kind === "grid" && (
            <div className="grid grid-cols-2 gap-3">{[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-2 rounded-2xl border bg-card p-2"><div className="flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-brand-saffron/50 to-brand-sand/50"><ShoppingBag className="h-6 w-6 text-brand-charcoal/60" /></div><Bar w="80%" /><Bar w="40%" /></div>
            ))}</div>
          )}
          {kind === "map" && (
            <div className="relative h-[430px] overflow-hidden rounded-2xl border bg-brand-green/10">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
              {[["22%", "30%"], ["60%", "18%"], ["45%", "58%"], ["72%", "70%"]].map(([x, y], i) => <MapPin key={i} className="absolute h-7 w-7 -translate-x-1/2 -translate-y-full fill-brand-sienna text-white" style={{ left: x, top: y }} />)}
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-card/95 p-3 backdrop-blur"><Bar w="60%" /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const defaultMeta: { icon: LucideIcon; kind: Kind; tone: string } = {
  icon: MessageSquare,
  kind: "post",
  tone: "bg-brand-green",
};

export function FeaturesGridSection() {
  const { lang, t } = usePrefs();
  const ar = lang === "ar";
  const ArrowIcon = ar ? ArrowLeft : ArrowRight;

  return (
    <section id="features" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{t.features.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t.features.subtitle}</p>
        </div>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {t.features.items.map((feat, i) => {
            const m = meta[feat.id] ?? defaultMeta;
            const Icon = m.icon;
            return (
              <article key={feat.id} id={feat.id} className={`grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative">
                  <div className={`absolute inset-4 -z-10 rounded-[3rem] ${m.tone} opacity-10 blur-2xl`} aria-hidden />
                  <Screen kind={m.kind} tone={m.tone} Icon={Icon} title={feat.title} />
                </div>
                <div className="space-y-5 text-start">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${m.tone} text-white shadow-lg`}><Icon className="h-7 w-7" aria-hidden /></span>
                  <p className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">{feat.tag}</p>
                  <h3 className="text-2xl font-black tracking-tight sm:text-3xl">{feat.title}</h3>
                  <p className="text-lg font-semibold text-primary">{feat.quote}</p>
                  <p className="max-w-xl leading-relaxed text-muted-foreground">{feat.description}</p>
                  <Link to="/features" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                    {ar ? "كل التفاصيل" : "Full details"}<ArrowIcon className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-16 text-center text-xs text-muted-foreground">
          {ar ? "الشاشات توضيحية لشكل التطبيق وليست لقطات فعلية." : "Screens are illustrative of the app experience, not actual screenshots."}
        </p>
      </div>
    </section>
  );
}
