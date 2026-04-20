import Link from "next/link";
import {
  Target,
  Search,
  Building2,
  Kanban,
  Bell,
  Users,
  ArrowRight,
  Check,
  Star,
  ExternalLink,
  TrendingUp,
  FileText,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Search,
    title: "Opportunity Discovery",
    description:
      "Search across SAM.gov, GovWin, and FPDS with powerful filters. Surface relevant RFPs, RFIs, and Sources Sought notices before your competitors.",
  },
  {
    icon: Building2,
    title: "Prime Contractor Intelligence",
    description:
      "Research prime contractors with award history, teaming patterns, and contact information. Identify the best partners for your next bid.",
  },
  {
    icon: Kanban,
    title: "Pipeline Management",
    description:
      "Track opportunities from discovery to submission with a visual Kanban board. Never miss a deadline or lose track of a prospect again.",
  },
  {
    icon: Target,
    title: "Smart Matching",
    description:
      "AI-powered matching scores opportunities against your NAICS codes, capabilities, past performance, and certifications automatically.",
  },
  {
    icon: Bell,
    title: "Saved Searches & Alerts",
    description:
      "Set up custom searches and get notified instantly when new opportunities match your criteria. Daily, weekly, or real-time alerts.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share opportunities, assign tasks, and leave notes for your team. Keep everyone aligned from capture to proposal submission.",
  },
];

const steps = [
  {
    number: "1",
    title: "Search",
    description:
      "Define your ideal opportunities by agency, NAICS code, set-aside type, and contract value. Save searches for ongoing monitoring.",
  },
  {
    number: "2",
    title: "Match",
    description:
      "Our engine scores each opportunity against your company profile, certifications, and past performance to surface the best fits.",
  },
  {
    number: "3",
    title: "Win",
    description:
      "Build your pipeline, connect with prime contractors, and manage your proposals end-to-end with collaborative tools.",
  },
];

const testimonials = [
  {
    quote:
      "GovDart cut our opportunity research time by 70%. We went from spending full days on SAM.gov to getting curated matches in minutes.",
    name: "Maria Chen",
    title: "CEO",
    company: "Apex Federal Solutions",
    rating: 5,
  },
  {
    quote:
      "The prime contractor intelligence is a game-changer. We identified three teaming partners in our first week and landed a $2M subcontract.",
    name: "James Whitfield",
    title: "BD Director",
    company: "Crestline Systems Group",
    rating: 5,
  },
  {
    quote:
      "As an 8(a) small business, finding the right set-aside opportunities was always painful. GovDart surfaces exactly what we qualify for.",
    name: "Priya Sharma",
    title: "President",
    company: "Vantage Point Consulting",
    rating: 5,
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "For individual contractors getting started with federal opportunities.",
    features: [
      "Up to 50 saved opportunities",
      "3 saved searches with alerts",
      "Basic contractor search",
      "Email support",
      "1 user seat",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/mo",
    description: "For growing teams that need deeper intelligence and collaboration.",
    features: [
      "Unlimited saved opportunities",
      "Unlimited saved searches",
      "Prime contractor intelligence",
      "Pipeline management board",
      "Team collaboration tools",
      "Smart matching scores",
      "Priority support",
      "Up to 5 user seats",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For established firms needing advanced analytics and integrations.",
    features: [
      "Everything in Professional",
      "Unlimited user seats",
      "API access",
      "Custom integrations",
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "SSO & SAML authentication",
      "Custom training & onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const agencies = ["DoD", "DHS", "GSA", "VA", "DOE"];

export default function Home() {
  return (
    <div className="dark min-h-screen bg-[#0a0e1a] text-zinc-100">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0e1a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Target className="size-6 text-blue-400" />
            <span className="text-lg font-semibold tracking-tight">
              GovDart
            </span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              About
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-500"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-indigo-600/8 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 md:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-300"
            >
              Now in public beta
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Find the right
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                opportunities faster
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
              GovDart helps small government subcontractors discover prime
              contractors, track federal contract opportunities, and build a
              winning pipeline — all in one intelligent platform.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 gap-2 rounded-xl bg-blue-600 px-6 text-base text-white hover:bg-blue-500"
              >
                Start Free Trial
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 rounded-xl border-white/10 bg-white/5 px-6 text-base text-zinc-300 hover:bg-white/10 hover:text-white"
              >
                See How It Works
              </Button>
            </div>
          </div>

          {/* Mock Dashboard Preview */}
          <div className="mx-auto mt-20 max-w-5xl">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-1 shadow-2xl shadow-blue-500/5">
              <div className="rounded-xl bg-[#0d1225] p-6">
                {/* Top bar */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-3 rounded-full bg-red-500/70" />
                    <div className="size-3 rounded-full bg-yellow-500/70" />
                    <div className="size-3 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-zinc-500">
                    <Search className="size-3" />
                    Search opportunities, contractors...
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-full bg-blue-600/30" />
                  </div>
                </div>
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <FileText className="size-3.5" />
                      Active Opportunities
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      1,247
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                      <TrendingUp className="size-3" />
                      +12% this week
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Target className="size-3.5" />
                      Match Score Avg
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      87%
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                      <TrendingUp className="size-3" />
                      +5% vs last month
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Building2 className="size-3.5" />
                      Tracked Primes
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      34
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                      3 new this week
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Clock className="size-3.5" />
                      Due This Week
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-amber-400">
                      8
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-amber-400/70">
                      3 due tomorrow
                    </div>
                  </div>
                </div>
                {/* Pipeline preview row */}
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {["New", "Qualified", "Reaching Out", "Teaming", "Submitted"].map(
                    (stage, i) => (
                      <div
                        key={stage}
                        className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                      >
                        <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                          {stage}
                        </div>
                        {Array.from({ length: 3 - Math.floor(i * 0.5) }).map(
                          (_, j) => (
                            <div
                              key={j}
                              className="mb-1.5 rounded-md bg-white/[0.04] p-2"
                            >
                              <div className="h-2 w-3/4 rounded bg-white/10" />
                              <div className="mt-1 h-1.5 w-1/2 rounded bg-white/5" />
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-zinc-500">
            Trusted by teams supporting
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {agencies.map((agency) => (
              <span
                key={agency}
                className="rounded-lg border border-white/5 bg-white/[0.03] px-6 py-2.5 text-sm font-semibold tracking-wide text-zinc-400"
              >
                {agency}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-300"
            >
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to win contracts
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Purpose-built tools for small businesses navigating the federal
              contracting landscape.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:border-white/10 hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-blue-600/10">
                  <feature.icon className="size-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="about" className="border-y border-white/5 bg-white/[0.01] py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-300"
            >
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From search to win in three steps
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              A streamlined workflow designed for how capture teams actually
              operate.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="pointer-events-none absolute right-0 top-8 hidden w-full translate-x-1/2 md:block">
                    <ChevronRight className="mx-auto size-5 text-zinc-700" />
                  </div>
                )}
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-600/10 text-2xl font-bold text-blue-400">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-300"
            >
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by teams who win
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {t.title}, {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section
        id="pricing"
        className="border-y border-white/5 bg-white/[0.01] py-24 md:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 bg-blue-500/10 px-3 py-1 text-blue-300"
            >
              Pricing
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Start free for 14 days. No credit card required.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-blue-500/30 bg-blue-600/5 shadow-lg shadow-blue-500/10"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600 px-3 py-1 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    {tier.description}
                  </p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-zinc-500">{tier.period}</span>
                  )}
                </div>
                <Button
                  className={`mb-8 h-10 w-full rounded-xl ${
                    tier.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {tier.cta}
                </Button>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent p-12 md:p-20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to find your next opportunity?
              </h2>
              <p className="mt-4 text-lg text-zinc-400">
                Join hundreds of small businesses already using GovDart to
                discover and win federal contracts.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="h-12 w-full max-w-sm rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder-zinc-500 outline-none transition-colors focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 sm:w-80"
                />
                <Button
                  size="lg"
                  className="h-12 gap-2 rounded-xl bg-blue-600 px-6 text-base text-white hover:bg-blue-500"
                >
                  Get Started Free
                  <ArrowRight className="size-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-zinc-500">
                14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <Target className="size-5 text-blue-400" />
                <span className="text-base font-semibold tracking-tight text-white">
                  GovDart
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                The modern platform for small government subcontractors to
                discover opportunities and win contracts.
              </p>
              <div className="mt-6 flex gap-4">
                <Link href="#" className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-300">
                  <ExternalLink className="size-3.5" /> Twitter
                </Link>
                <Link href="#" className="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-300">
                  <ExternalLink className="size-3.5" /> LinkedIn
                </Link>
              </div>
            </div>
            {/* Product */}
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Product
              </h4>
              <ul className="space-y-3">
                {["Features", "Pricing", "Integrations", "Changelog"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            {/* Company */}
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Company
              </h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Legal */}
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Legal
              </h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service", "Security", "CMMC Compliance"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
            <p className="text-xs text-zinc-600">
              &copy; 2026 GovDart, Inc. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600">
              Built for small businesses navigating federal contracting.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
