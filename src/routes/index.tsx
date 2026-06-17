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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AquaVista Beverages — Refreshing the Nation Since 2003" },
      {
        name: "description",
        content:
          "Premium beverage manufacturer with 40+ products across India. Partner with us for distribution, retail and export opportunities.",
      },
      { property: "og:title", content: "AquaVista Beverages — Refreshing the Nation Since 2003" },
      {
        property: "og:description",
        content:
          "Manufacturing 40+ premium beverage products with scale, precision, and national reach.",
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
    { href: "#about", label: "About Us" },
    { href: "#products", label: "Products" },
    { href: "#manufacturing", label: "Manufacturing" },
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
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.78_0.16_230)] shadow-[0_8px_24px_-8px_oklch(0.6_0.2_240/0.7)]">
              <Droplets className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">AquaVista</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Beverages
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
              <Button className="btn-hero h-10 rounded-xl px-5">
                Partner With Us
                <ArrowRight className="h-4 w-4" />
              </Button>
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
      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -left-32 top-24 h-96 w-96 rounded-full bg-[oklch(0.5_0.18_245/0.35)] blur-3xl" />
        <div
          className="animate-float-slow absolute right-[-10%] top-1/3 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.55_0.16_215/0.28)] blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pt-32 pb-20">
        <Reveal>
          <div className="glass inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Established 2003 · Trusted by 1,200+ Partners
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="text-gradient mt-6 max-w-5xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Refreshing the Nation
            <br />
            <span className="text-azure-gradient">Since 2003.</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Manufacturing 40+ premium beverage products with scale, precision, and
            national reach — engineered for India's most ambitious distribution
            partners.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#products">
              <Button className="btn-hero h-12 rounded-xl px-6 text-sm sm:text-base">
                Explore Our Portfolio
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#enquiry">
              <Button className="btn-outline-glow h-12 rounded-xl border bg-transparent px-6 text-sm sm:text-base">
                Distributor Opportunities
              </Button>
            </a>
          </div>
        </Reveal>

        {/* hero stats */}
        <Reveal delay={460}>
          <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:grid-cols-4 sm:gap-4">
            {[
              { k: "40+", v: "SKUs Manufactured" },
              { k: "4", v: "States Served" },
              { k: "22+", v: "Years of Trust" },
              { k: "1.2K+", v: "Active Partners" },
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

/* ---------------- About / Journey ---------------- */
function About() {
  const milestones = [
    {
      year: "2003",
      title: "Foundation Laid",
      body: "Began local production with a single bottling line and an unwavering belief in quality-first beverages.",
    },
    {
      year: "2009",
      title: "Chhattisgarh Expansion",
      body: "Scaled across Chhattisgarh, becoming a household name in the region.",
    },
    {
      year: "2014",
      title: "Madhya Pradesh Network",
      body: "Built a dense distributor network across MP with cold-chain logistics.",
    },
    {
      year: "2019",
      title: "Uttar Pradesh Rollout",
      body: "Crossed 25+ SKUs and entered Uttar Pradesh with high-speed automated lines.",
    },
    {
      year: "2024",
      title: "Haryana & Beyond",
      body: "National-grade infrastructure supplying Haryana and exploring export corridors.",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="The Journey"
          title={
            <>
              Two decades of building India's most
              <br className="hidden md:block" /> trusted beverage operation.
            </>
          }
          sub="From a single regional facility to a multi-state powerhouse — every milestone was earned with consistency, compliance and customer obsession."
        />

        <div className="relative mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left: portrait copy */}
          <Reveal>
            <div className="glass-card sticky top-28 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-primary">
                <Award className="h-4 w-4" /> Regional Leadership
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                Quality is the only language our customers respect.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                AquaVista Beverages was founded in 2003 with one objective —
                deliver world-class beverages at India-scale economics. Today our
                operations span Chhattisgarh, Madhya Pradesh, Uttar Pradesh and
                Haryana, with 40+ premium SKUs leaving our gates every day.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { i: <Factory className="h-4 w-4" />, t: "ISO-Certified Plants" },
                  { i: <Truck className="h-4 w-4" />, t: "Pan-India Cold Chain" },
                  { i: <ShieldCheck className="h-4 w-4" />, t: "FSSAI Compliance" },
                  { i: <Layers className="h-4 w-4" />, t: "40+ Active SKUs" },
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

          {/* Right: timeline */}
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
function Products() {
  const cats = [
    {
      icon: <CupSoda className="h-6 w-6" />,
      title: "Carbonated Soft Drinks",
      tag: "18 SKUs",
      body: "Cola, lemon, orange and signature regional flavors — engineered for fizz retention and shelf stability.",
      hue: "from-[oklch(0.6_0.22_25)] to-[oklch(0.55_0.18_15)]",
    },
    {
      icon: <GlassWater className="h-6 w-6" />,
      title: "Fruit Drinks",
      tag: "14 SKUs",
      body: "Mango, mixed-fruit, guava and lychee variants made with real fruit pulp and zero artificial colors.",
      hue: "from-[oklch(0.78_0.18_70)] to-[oklch(0.65_0.18_45)]",
    },
    {
      icon: <Droplets className="h-6 w-6" />,
      title: "Packaged Drinking Water",
      tag: "8 SKUs",
      body: "Multi-stage purified water across 250ml–20L formats. Trusted by HoReCa, retail and institutional buyers.",
      hue: "from-[oklch(0.7_0.14_220)] to-[oklch(0.55_0.18_245)]",
    },
  ];

  return (
    <section id="products" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="Product Portfolio"
          title={
            <>
              40+ premium beverages,
              <br className="hidden md:block" /> three flagship categories.
            </>
          }
          sub="Every product is formulated, tested and bottled in-house — giving partners total visibility from concentrate to consumer."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {cats.map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <article className="glass-card hover-lift group relative overflow-hidden rounded-3xl p-6 sm:p-7">
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${c.hue} opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c.hue} text-white shadow-lg`}
                    >
                      {c.icon}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold sm:text-2xl">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-80 transition-all group-hover:gap-3 group-hover:opacity-100">
                    View category
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
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
          sub="Our facilities are designed with highly organized, expert-led spatial layouts — purpose-built for architectural efficiency and optimal manufacturing flow."
        />

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          {/* Bottling lines — wide */}
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
                    ["12", "Lines"],
                    ["99.4%", "Uptime"],
                    ["6", "Plants"],
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

          {/* QC */}
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

          {/* High-speed capacity */}
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

          {/* Spatial layout */}
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

          {/* Logistics */}
          <Reveal delay={300} className="md:col-span-3">
            <div className="glass-card hover-lift h-full rounded-3xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[oklch(0.6_0.18_215/0.22)] text-[oklch(0.78_0.14_215)]">
                <Truck className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">Pan-regional logistics</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Owned fleet plus partner distributors covering Chhattisgarh,
                MP, UP and Haryana with next-day replenishment SLAs.
              </p>
            </div>
          </Reveal>
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
                  { i: <Mail className="h-4 w-4" />, t: "partners@aquavista.in", s: "Avg. response under 24 hrs" },
                  { i: <MapPin className="h-4 w-4" />, t: "Raipur, Chhattisgarh", s: "Headquarters · 6 plant locations" },
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
                <Building2 className="h-4 w-4" /> Distributor Enquiry
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

              <Button
                type="submit"
                disabled={loading || done}
                className="btn-hero mt-7 h-12 w-full rounded-xl text-sm font-semibold sm:text-base"
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
function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-[oklch(0.78_0.16_230)]">
                <Droplets className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </span>
              <div>
                <div className="text-sm font-bold">AquaVista Beverages</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Refreshing since 2003
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">
              A regional beverage manufacturer trusted across Chhattisgarh,
              Madhya Pradesh, Uttar Pradesh and Haryana. Built on quality,
              scaled by partnership.
            </p>
            <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>
                AquaVista Industrial Park, Sector 7,
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
                ["About Us", "#about"],
                ["Products", "#products"],
                ["Manufacturing", "#manufacturing"],
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
                <Mail className="h-3.5 w-3.5 text-primary" /> partners@aquavista.in
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© 2026 AquaVista Beverages Pvt. Ltd. All rights reserved.</div>
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
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Toaster theme="dark" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Products />
        <Manufacturing />
        <Enquiry />
      </main>
      <Footer />
    </div>
  );
}
