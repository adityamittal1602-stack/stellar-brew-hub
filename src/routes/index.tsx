import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Factory,
  ShieldCheck,
  Gauge,
  Droplets,
  CupSoda,
  GlassWater,
  MapPin,
  Phone,
  Mail,
  Building2,
  Award,
  Truck,
  Layers,
  Loader2,
  CheckCircle2,
  Store,
  Handshake,
  TrendingUp,
  PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { AmbientScene, HeroBottle } from "@/components/Scene3D";
import { Magnetic } from "@/components/Magnetic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shyam Beverages — Premium Cold Drinks & Pulp Juices Since 2000" },
      {
        name: "description",
        content:
          "Shyam Beverages — large-scale manufacturer of premium cold drinks and pulp-based juices since 2000. Partner with us for distribution, retail and exports.",
      },
      { property: "og:title", content: "Shyam Beverages — Established 2000" },
      {
        property: "og:description",
        content:
          "Industry-leading enterprise manufacturing cold drinks and pulp-based juices at scale across India.",
      },
    ],
  }),
  component: Landing,
});

/* ---------------- Reveal-on-scroll wrapper ---------------- */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${shown ? "animate-fade-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- Monogram logo ---------------- */
function Monogram({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span
      className={`relative grid place-items-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.78_0.16_230)] shadow-[0_8px_24px_-8px_oklch(0.6_0.2_240/0.7)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none">
        <path
          d="M5 4 L9 4 L12 11 L15 4 L19 4 L13.5 17 L13.5 20 L10.5 20 L10.5 17 Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ---------------- Navigation ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "Legacy" },
    { href: "#products", label: "Products" },
    { href: "#manufacturing", label: "Manufacturing" },
    { href: "#portals", label: "B2B" },
    { href: "#enquiry", label: "Enquiry" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
            scrolled ? "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5">
            <Monogram />
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">Shyam Beverages</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Est. 2000
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#enquiry" className="hidden sm:inline-flex">
              <Magnetic>
                <Button className="btn-hero h-10 rounded-xl px-5">
                  Partner With Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Magnetic>
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 lg:hidden">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a href="#enquiry" onClick={() => setOpen(false)} className="mt-2">
                <Button className="btn-hero h-11 w-full rounded-xl">
                  Partner With Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="home" className="bg-hero relative min-h-screen overflow-hidden">
      {/* 3D ambient scene */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <AmbientScene />
      </div>

      {/* ambient blobs + grid overlay */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-32 top-24 h-96 w-96 rounded-full bg-[oklch(0.5_0.18_245/0.25)] blur-3xl" />
        <div
          className="animate-float-slow absolute right-[-10%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.55_0.16_215/0.2)] blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-32 pb-20 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <Reveal>
            <div className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Established 2000 · Trusted by 1,500+ Partners
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="text-gradient mt-6 max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Crafting India's
              <br />
              <span className="text-azure-gradient">Premium Refreshment.</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg md:text-xl">
              A quarter-century of manufacturing excellence in cold drinks and
              pulp-based juices — engineered at scale for India's most ambitious
              distribution partners.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Magnetic>
                <a href="#products">
                  <Button className="btn-hero h-12 rounded-xl px-6 text-sm sm:text-base">
                    Explore Our Portfolio
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#portals">
                  <Button className="btn-outline-glow h-12 rounded-xl border bg-transparent px-6 text-sm sm:text-base">
                    B2B Partner Portals
                  </Button>
                </a>
              </Magnetic>
            </div>
          </Reveal>

          {/* hero stats */}
          <Reveal delay={460}>
            <div className="mt-14 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4">
              {[
                { k: "50+", v: "Active SKUs" },
                { k: "12", v: "States Served" },
                { k: "25+", v: "Years of Trust" },
                { k: "1.5K+", v: "Channel Partners" },
              ].map((s) => (
                <div key={s.v} className="glass-card rounded-2xl p-4 sm:p-5">
                  <div className="text-azure-gradient text-2xl font-bold sm:text-3xl">
                    {s.k}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* 3D bottle */}
        <Reveal delay={200} className="relative hidden h-[520px] w-full lg:block">
          <div className="absolute inset-0">
            <HeroBottle />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section heading ---------------- */
function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="text-gradient mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={160}>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- About / Legacy Timeline ---------------- */
function About() {
  const milestones = [
    {
      year: "2000",
      title: "Foundation Laid",
      body: "Shyam Beverages was founded with a single bottling line and a relentless focus on quality-first refreshment.",
    },
    {
      year: "2006",
      title: "Pulp Juice Division",
      body: "Launched our first pulp-based juice line — real fruit, no concentrates — pioneering a new category in the region.",
    },
    {
      year: "2012",
      title: "Multi-Plant Expansion",
      body: "Crossed three manufacturing facilities and a 25+ SKU portfolio across cold drinks and juices.",
    },
    {
      year: "2018",
      title: "Automation & Scale",
      body: "Commissioned high-speed automated lines, reaching 36,000 bottles/hour peak throughput.",
    },
    {
      year: "2024",
      title: "National Footprint",
      body: "Operating across 12 states with 1,500+ active channel partners and exploring export corridors.",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="The Legacy"
          title={
            <>
              Twenty-five years of building India's most
              <br className="hidden md:block" /> trusted beverage operation.
            </>
          }
          sub="From a single regional facility to a multi-state powerhouse — every milestone earned with consistency, compliance, and customer obsession."
        />

        <div className="relative mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <div className="glass-card sticky top-28 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                <Award className="h-4 w-4" /> Industry Leadership
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                Quality is the only language our customers respect.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Shyam Beverages was founded in 2000 with one objective — deliver
                world-class beverages at India-scale economics. Today our cold
                drinks and pulp-based juices ship across 12 states, with 50+
                premium SKUs leaving our gates every single day.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { i: <Factory className="h-4 w-4" />, t: "ISO-Certified Plants" },
                  { i: <Truck className="h-4 w-4" />, t: "Pan-India Cold Chain" },
                  { i: <ShieldCheck className="h-4 w-4" />, t: "FSSAI Compliance" },
                  { i: <Layers className="h-4 w-4" />, t: "50+ Active SKUs" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs sm:text-sm"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
                      {x.i}
                    </span>
                    {x.t}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <div className="pointer-events-none absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-white/10 to-transparent sm:left-[18px]" />
            <ul className="space-y-7">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 90}>
                  <li className="relative pl-12 sm:pl-16">
                    <span className="absolute left-0 top-1 grid h-7 w-7 place-items-center rounded-full border border-primary/40 bg-background shadow-[0_0_0_4px_oklch(0.16_0.025_252)] sm:h-9 sm:w-9">
                      <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-[oklch(0.78_0.16_230)] sm:h-3 sm:w-3" />
                    </span>
                    <div className="glass-card hover-lift rounded-2xl p-5 sm:p-6">
                      <div className="text-azure-gradient text-xs font-bold uppercase tracking-[0.2em]">
                        {m.year}
                      </div>
                      <h4 className="mt-1.5 text-lg font-semibold sm:text-xl">{m.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {m.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Products ---------------- */
type ProductCategory = "cold-drinks" | "pulp-juices";

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  size: string;
  tagline: string;
  hue: string;
  icon: ReactNode;
};

const CATEGORY_META: Record<ProductCategory, { label: string; full: string }> = {
  "cold-drinks": { label: "Cold Drinks", full: "Carbonated Cold Drinks" },
  "pulp-juices": { label: "Pulp Juices", full: "Pulp-Based Fruit Juices" },
};

// Add new products by appending to this list — UI updates automatically.
const PRODUCTS: Product[] = [
  { id: "p01", name: "Shyam Cola", category: "cold-drinks", size: "300ml · 750ml · 2L", tagline: "Bold caramel fizz, our signature recipe.", hue: "from-[oklch(0.55_0.18_25)] to-[oklch(0.4_0.12_20)]", icon: <CupSoda className="h-5 w-5" /> },
  { id: "p02", name: "Lemon-Lime Burst", category: "cold-drinks", size: "300ml · 600ml", tagline: "Crisp citrus with real lemon notes.", hue: "from-[oklch(0.82_0.18_120)] to-[oklch(0.65_0.18_110)]", icon: <CupSoda className="h-5 w-5" /> },
  { id: "p03", name: "Orange Sparkle", category: "cold-drinks", size: "300ml · 750ml", tagline: "Sun-ripened orange, perfectly fizzed.", hue: "from-[oklch(0.78_0.18_70)] to-[oklch(0.6_0.18_50)]", icon: <CupSoda className="h-5 w-5" /> },
  { id: "p04", name: "Jeera Fizz Masala", category: "cold-drinks", size: "300ml · 600ml", tagline: "Indian spiced soda — a desi favourite.", hue: "from-[oklch(0.55_0.1_80)] to-[oklch(0.4_0.08_60)]", icon: <CupSoda className="h-5 w-5" /> },
  { id: "p05", name: "Cloud Soda", category: "cold-drinks", size: "300ml · 600ml", tagline: "Clear, crisp lemon-lime refresher.", hue: "from-[oklch(0.85_0.12_180)] to-[oklch(0.6_0.16_200)]", icon: <CupSoda className="h-5 w-5" /> },
  { id: "p06", name: "Alphonso Mango Pulp", category: "pulp-juices", size: "200ml · 600ml · 1L", tagline: "Real Alphonso pulp, no concentrate.", hue: "from-[oklch(0.78_0.18_75)] to-[oklch(0.6_0.18_55)]", icon: <GlassWater className="h-5 w-5" /> },
  { id: "p07", name: "Guava Pulp Nectar", category: "pulp-juices", size: "200ml · 1L", tagline: "Pink guava pulp, naturally sweet.", hue: "from-[oklch(0.78_0.14_15)] to-[oklch(0.6_0.16_5)]", icon: <GlassWater className="h-5 w-5" /> },
  { id: "p08", name: "Litchi Pulp Delight", category: "pulp-juices", size: "200ml · 1L", tagline: "Hand-selected litchi, light and floral.", hue: "from-[oklch(0.82_0.1_350)] to-[oklch(0.65_0.14_340)]", icon: <GlassWater className="h-5 w-5" /> },
  { id: "p09", name: "Mixed Fruit Medley", category: "pulp-juices", size: "200ml · 1L", tagline: "Five-fruit blend, balanced sweetness.", hue: "from-[oklch(0.72_0.18_30)] to-[oklch(0.55_0.18_15)]", icon: <GlassWater className="h-5 w-5" /> },
  { id: "p10", name: "Crisp Apple Pulp", category: "pulp-juices", size: "200ml · 1L", tagline: "Cold-pressed, naturally cloudy.", hue: "from-[oklch(0.78_0.14_140)] to-[oklch(0.55_0.16_135)]", icon: <GlassWater className="h-5 w-5" /> },
];

const TABS: Array<{ id: "all" | ProductCategory; label: string }> = [
  { id: "all", label: "All Products" },
  { id: "cold-drinks", label: "Cold Drinks" },
  { id: "pulp-juices", label: "Pulp Juices" },
];

function Products() {
  const [active, setActive] = useState<"all" | ProductCategory>("all");
  const filtered = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="Product Showroom"
          title={
            <>
              50+ premium beverages,
              <br className="hidden md:block" /> two flagship categories.
            </>
          }
          sub="Every product is formulated, tested and bottled in-house — giving partners total visibility from concentrate to consumer."
        />

        {/* Filter tabs */}
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap gap-2 sm:gap-3">
            {TABS.map((t) => {
              const isActive = active === t.id;
              const count =
                t.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === t.id).length;
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`group relative overflow-hidden rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm ${
                    isActive
                      ? "border-transparent text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.6_0.2_240/0.6)]"
                      : "border-white/10 bg-white/[0.04] text-muted-foreground hover:scale-[1.04] hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-primary to-[oklch(0.78_0.16_230)]"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  {t.label}
                  <span className="ml-2 rounded-full bg-black/20 px-1.5 py-0.5 text-[10px] tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Product grid — 3D glassmorphic pedestals */}
        <motion.div
          layout
          className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.94 }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.05,
                  ease: [0.2, 0.7, 0.2, 1],
                }}
                whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="glass-card group relative overflow-hidden rounded-3xl p-5 sm:p-6"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br ${p.hue} opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-60`}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 0%, oklch(0.7 0.16 240 / 0.25), transparent 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${p.hue} text-white shadow-lg`}
                    >
                      {p.icon}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {CATEGORY_META[p.category].label}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-tight sm:text-xl">{p.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
                  {/* glass pedestal */}
                  <div className="relative mx-auto mt-6 h-1 w-3/4 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                    <span className="text-muted-foreground">{p.size}</span>
                    <span className="flex items-center gap-1 font-medium text-primary opacity-80 transition-all group-hover:gap-2 group-hover:opacity-100">
                      Details
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No products in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

/* ---------------- Manufacturing (Bento) ---------------- */
function Manufacturing() {
  return (
    <section id="manufacturing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="Manufacturing Excellence"
          title={
            <>
              Architecturally engineered
              <br className="hidden md:block" /> factory floors.
            </>
          }
          sub="Our facilities are designed with highly organised, expert-led spatial layouts — purpose-built for architectural efficiency and optimal manufacturing flow."
        />

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          <Reveal className="md:col-span-4 md:row-span-2">
            <div className="glass-card hover-lift relative h-full overflow-hidden rounded-3xl p-7 sm:p-9">
              <div className="absolute inset-0 opacity-30">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, oklch(0.5 0.18 245 / 0.6), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.55 0.16 215 / 0.5), transparent 55%)",
                  }}
                />
              </div>
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.78_0.16_230)] text-primary-foreground shadow-lg">
                  <Factory className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl font-bold sm:text-3xl">
                  State-of-the-art bottling lines
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Fully automated PET and glass lines with in-line rinsing,
                  filling, and capping — laid out for zero-cross-flow movement
                  and minimal changeover time.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
                  {[
                    ["14", "Lines"],
                    ["99.4%", "Uptime"],
                    ["7", "Plants"],
                  ].map(([k, v]) => (
                    <div key={v} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-azure-gradient text-xl font-bold">{k}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-2">
            <div className="glass-card hover-lift h-full rounded-3xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.6_0.18_150/0.2)] text-[oklch(0.78_0.16_150)]">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Rigorous quality control</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Batch-level lab testing, FSSAI compliance and traceable QR-coded
                outputs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180} className="md:col-span-2">
            <div className="glass-card hover-lift h-full rounded-3xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.65_0.2_30/0.2)] text-[oklch(0.78_0.18_40)]">
                <Gauge className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">High-speed capacity</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                36,000 bottles/hour peak throughput across SKUs with rapid
                changeovers under 18 minutes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240} className="md:col-span-3">
            <div className="glass-card hover-lift h-full rounded-3xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.6_0.18_280/0.2)] text-[oklch(0.78_0.14_280)]">
                <Layers className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">
                Expert-led spatial design
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Floors planned by industrial architects for optimal flow — raw
                material intake, syrup room, filling hall and dispatch are
                zoned for one-directional movement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300} className="md:col-span-3">
            <div className="glass-card hover-lift h-full rounded-3xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.6_0.18_215/0.22)] text-[oklch(0.78_0.14_215)]">
                <Truck className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Pan-regional logistics</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Owned fleet plus partner network covering 12 states with
                next-day replenishment SLAs.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- B2B Portals ---------------- */
function Portals() {
  const portals = [
    {
      icon: <Handshake className="h-6 w-6" />,
      tag: "Distributor Portal",
      title: "Become a Shyam Beverages Distributor",
      body: "Secure exclusive territory rights, premium margins, and end-to-end logistics support for our cold drinks and pulp juice categories.",
      perks: [
        { i: <TrendingUp className="h-4 w-4" />, t: "Industry-leading margins" },
        { i: <Truck className="h-4 w-4" />, t: "Cold-chain delivery support" },
        { i: <PackageCheck className="h-4 w-4" />, t: "Dedicated KAM & training" },
      ],
      cta: "Apply as Distributor",
      hue: "from-[oklch(0.55_0.18_245)] to-[oklch(0.68_0.17_220)]",
      type: "distributor",
    },
    {
      icon: <Store className="h-6 w-6" />,
      tag: "Retailer Portal",
      title: "Stock Shyam Beverages in your store",
      body: "Onboard frictionlessly with digital catalogues, instant credit checks, and weekly replenishment from our regional depots.",
      perks: [
        { i: <PackageCheck className="h-4 w-4" />, t: "Digital catalogue & ordering" },
        { i: <TrendingUp className="h-4 w-4" />, t: "Display & visibility incentives" },
        { i: <ShieldCheck className="h-4 w-4" />, t: "Guaranteed freshness SLA" },
      ],
      cta: "Apply as Retailer",
      hue: "from-[oklch(0.6_0.18_280)] to-[oklch(0.55_0.18_320)]",
      type: "retailer",
    },
  ];

  return (
    <section id="portals" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="B2B Partner Portals"
          title={
            <>
              Frictionless onboarding for
              <br className="hidden md:block" /> distributors & retailers.
            </>
          }
          sub="Two dedicated B2B channels — designed for serious partners who want premium product, premium margins, and a partner that ships on time."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          {portals.map((p, i) => (
            <Reveal key={p.type} delay={i * 120}>
              <div className="glass-card hover-lift group relative h-full overflow-hidden rounded-3xl p-7 sm:p-8">
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${p.hue} opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60`}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${p.hue} text-white shadow-lg`}
                    >
                      {p.icon}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p.body}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {p.perks.map((perk) => (
                      <li
                        key={perk.t}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm"
                      >
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
                          {perk.i}
                        </span>
                        {perk.t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <Magnetic>
                      <a href={`#enquiry`}>
                        <Button className="btn-hero h-11 rounded-xl px-5 text-sm font-semibold">
                          {p.cta}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Enquiry ---------------- */
function Enquiry() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      toast.success("Application received — our partnerships team will reach out within 48 hours.");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setDone(false), 3200);
    }, 1400);
  };

  return (
    <section id="enquiry" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Partner With Us"
              title={
                <>
                  Build the next decade
                  <br className="hidden md:block" /> of beverages with us.
                </>
              }
              sub="Distributors, retailers, suppliers and export partners — tell us about your region and we'll respond within 48 hours with a tailored proposal."
            />
            <Reveal delay={180}>
              <div className="mt-10 space-y-4">
                {[
                  { i: <Phone className="h-4 w-4" />, t: "+91 98765 43210", s: "Partnerships desk · Mon–Sat" },
                  { i: <Mail className="h-4 w-4" />, t: "partners@shyambeverages.in", s: "Avg. response under 24 hrs" },
                  { i: <MapPin className="h-4 w-4" />, t: "Raipur, Chhattisgarh", s: "Headquarters · 7 plant locations" },
                ].map((c) => (
                  <div key={c.t} className="glass-card flex items-start gap-4 rounded-2xl p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                      {c.i}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{c.t}</div>
                      <div className="text-xs text-muted-foreground">{c.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={onSubmit}
              className="glass-card rounded-3xl p-6 sm:p-8"
              noValidate
            >
              <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                <Building2 className="h-4 w-4" /> Partner Enquiry
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Full Name">
                  <Input id="name" required placeholder="Your name" className="h-11 bg-white/5" />
                </Field>
                <Field id="company" label="Company Name">
                  <Input id="company" required placeholder="Company / firm" className="h-11 bg-white/5" />
                </Field>
                <Field id="phone" label="Contact Number">
                  <Input id="phone" required type="tel" placeholder="+91 …" className="h-11 bg-white/5" />
                </Field>
                <Field id="region" label="Region / State">
                  <Input id="region" required placeholder="e.g. Indore, MP" className="h-11 bg-white/5" />
                </Field>
                <Field id="type" label="Inquiry Type" full>
                  <Select required>
                    <SelectTrigger id="type" className="h-11 bg-white/5">
                      <SelectValue placeholder="Select partnership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="retailer">Retailer</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="export">Export</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Magnetic strength={0.15} className="mt-7 block w-full">
                <Button
                  type="submit"
                  disabled={loading || done}
                  className="btn-hero h-12 w-full rounded-xl text-sm font-semibold sm:text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting application…
                    </>
                  ) : done ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Application received
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </Magnetic>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                By submitting, you agree to be contacted by our partnerships team.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  children,
  full,
}: {
  id: string;
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <Label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ onToggleTheme }: { onToggleTheme: () => void }) {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Monogram />
              <div>
                <div className="text-sm font-bold">Shyam Beverages</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Refreshing since 2000
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">
              A large-scale Indian beverage manufacturer specialising in premium
              cold drinks and pulp-based juices. Built on quality, scaled by
              partnership.
            </p>
            <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                Shyam Industrial Park, Sector 7,
                <br />
                Urla, Raipur, Chhattisgarh 493221, India
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Quick Links
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                ["Home", "#home"],
                ["Legacy", "#about"],
                ["Products", "#products"],
                ["Manufacturing", "#manufacturing"],
                ["B2B Portals", "#portals"],
                ["Enquiry", "#enquiry"],
              ].map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Reach Us
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-primary" /> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" /> partners@shyambeverages.in
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span>© 2026 Shyam Beverages Pvt. Ltd. All rights reserved.</span>
            {/* Secret theme toggle — intentionally subtle */}
            <button
              aria-label="Toggle theme"
              onClick={onToggleTheme}
              className="ml-1 h-2 w-2 rounded-full bg-primary/40 opacity-30 transition-all duration-300 hover:scale-150 hover:bg-primary hover:opacity-100"
              title="✦"
            />
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
function Landing() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("sb-theme")) as
      | "dark"
      | "light"
      | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    try {
      localStorage.setItem("sb-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="relative min-h-screen overflow-x-hidden transition-colors duration-500">
      <Toaster theme={theme} />
      <Nav />
      <main>
        <Hero />
        <About />
        <Products />
        <Manufacturing />
        <Portals />
        <Enquiry />
      </main>
      <Footer onToggleTheme={toggleTheme} />
    </div>
  );
}
