import { Link } from "react-router-dom";
import { Shield, Clock, CloudRain, IndianRupee, ArrowRight, CheckCircle2, BarChart3, Umbrella, Gauge, ShieldCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  {
    icon: Clock,
    title: "Sign up in 2 minutes",
    desc: "Enter your phone, pick your platform, set your zone. That's it.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: CloudRain,
    title: "We watch the skies",
    desc: "AI tracks weather, AQI, curfews, and traffic around the clock.",
    accent: "bg-warning/10 text-warning",
  },
  {
    icon: IndianRupee,
    title: "Money hits your UPI",
    desc: "Disruption detected? Payout calculated and sent — no forms, no waiting.",
    accent: "bg-accent/10 text-accent",
  },
];

const benefits = [
  { icon: CheckCircle2, text: "Zero paperwork or manual claims" },
  { icon: IndianRupee, text: "Premiums start at just ₹10/week" },
  { icon: Gauge, text: "AI-powered risk assessment" },
  { icon: Umbrella, text: "Covers rain, pollution, curfews & more" },
  { icon: ShieldCheck, text: "Instant UPI payouts" },
  { icon: BarChart3, text: "Works with all major platforms" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ─── Hero ─── */}
      <section className="relative">
        {/* Background layers */}
        <div className="absolute inset-0 bg-foreground" />
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />

        {/* Nav */}
        <nav className="relative z-10 container flex items-center justify-between py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Shield className="w-[18px] h-[18px] text-primary-foreground" />
            </div>
            <span className="text-[17px] font-bold text-primary-foreground tracking-tight">CoverKaro</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-primary-foreground/60 text-sm font-medium hover:text-primary-foreground/90 transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Admin
            </Link>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow active:scale-[0.97]"
            >
              Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 container pt-20 pb-32 md:pt-28 md:pb-40">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary-foreground/10 text-primary-foreground/70 text-xs font-medium mb-8 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-soft" />
              India's first parametric cover for gig workers
            </div>
            <h1
              className="text-[clamp(2.25rem,5vw,4rem)] font-extrabold text-primary-foreground leading-[1.06] tracking-tight animate-fade-up"
              style={{ animationDelay: "80ms", textWrap: "balance" }}
            >
              When the weather stops you, we don't.
            </h1>
            <p
              className="mt-6 text-[17px] md:text-lg text-primary-foreground/55 max-w-[480px] leading-relaxed animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              Rain. Smog. Curfew. If you can't deliver, CoverKaro pays you automatically — straight to your UPI. No claims. No calls.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "240ms" }}>
              <Link
                to="/onboarding"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow active:scale-[0.97]"
              >
                Get Covered in 2 Minutes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-6 animate-fade-up" style={{ animationDelay: "320ms" }}>
              <div className="flex -space-x-2">
                {["S", "A", "R", "K"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-foreground flex items-center justify-center text-[11px] font-bold text-primary-foreground/80 bg-primary-foreground/10"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/45">
                <span className="text-primary-foreground/70 font-semibold">12,400+</span> delivery partners covered
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <ScrollReveal>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl md:text-[2.5rem] font-bold text-foreground leading-tight max-w-md" style={{ textWrap: "balance" }}>
              Income protection in three simple steps
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid md:grid-cols-3 gap-5 max-w-4xl">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group relative p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-xl hover:shadow-foreground/[0.04] transition-shadow duration-300">
                  <div className={`w-11 h-11 rounded-xl ${step.accent} flex items-center justify-center mb-5`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="absolute top-6 right-6 text-[56px] font-extrabold leading-none text-foreground/[0.03] select-none">
                    {i + 1}
                  </span>
                  <h3 className="text-[17px] font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benefits ─── */}
      <section className="py-24 bg-card border-y border-border/40">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-md mb-14">
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Why CoverKaro</p>
              <h2 className="text-3xl md:text-[2.5rem] font-bold text-foreground leading-tight" style={{ textWrap: "balance" }}>
                Built for riders, not insurance companies
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 70}>
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-background border border-border/50 hover:border-accent/30 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <b.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-snug pt-1.5">{b.text}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl md:text-[2.5rem] font-bold text-foreground mb-5 leading-tight" style={{ textWrap: "balance" }}>
                Don't let bad weather cost you a day's pay
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-sm mx-auto">
                Join thousands of delivery partners who ride worry-free with CoverKaro.
              </p>
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-foreground text-background font-semibold text-lg shadow-xl shadow-foreground/10 hover:shadow-foreground/20 transition-shadow active:scale-[0.97]"
              >
                Start Your Coverage <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border/40 py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-semibold text-foreground">CoverKaro</span>
          </div>
          <p>© 2026 CoverKaro. Parametric income protection for India's gig economy.</p>
        </div>
      </footer>
    </div>
  );
}
