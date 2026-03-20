import { Link } from "react-router-dom";
import { Shield, Zap, Clock, IndianRupee, CloudRain, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  { icon: Clock, title: "Sign Up in 2 Minutes", desc: "Enter your phone, select platform, and set your working zone." },
  { icon: CloudRain, title: "AI Monitors Disruptions", desc: "Our system tracks weather, AQI, curfews, and traffic in real-time." },
  { icon: IndianRupee, title: "Get Paid Instantly", desc: "When a disruption hits, your payout is auto-calculated and sent via UPI." },
];

const benefits = [
  "No paperwork or manual claims",
  "Premiums as low as ₹10/week",
  "AI-powered risk assessment",
  "Covers rain, pollution, curfews & more",
  "Instant UPI payouts",
  "Works with all major delivery platforms",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsla(200,80%,70%,0.15),transparent_60%)]" />

        <nav className="relative z-10 container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-primary-foreground">GigShield</span>
          </div>
          <Link
            to="/onboarding"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-foreground/15 backdrop-blur text-primary-foreground text-sm font-medium hover:bg-primary-foreground/25 transition-colors"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>

        <div className="relative z-10 container pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 backdrop-blur text-primary-foreground/90 text-xs font-medium mb-6 animate-fade-up">
              <Zap className="w-3.5 h-3.5" />
              India's First Parametric Insurance for Gig Workers
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-[1.08] tracking-tight text-balance animate-fade-up" style={{ animationDelay: "100ms" }}>
              Protect Your Weekly Income
            </h1>
            <p className="mt-5 text-lg md:text-xl text-primary-foreground/75 max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
              When rain, pollution, or curfews stop you from delivering — we pay you automatically. No claims. No hassle.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "300ms" }}>
              <Link
                to="/onboarding"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-foreground text-primary font-semibold text-base hover:bg-primary-foreground/90 transition-colors active:scale-[0.97]"
              >
                Get Covered in 2 Minutes <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-foreground/10 backdrop-blur text-primary-foreground font-medium text-base hover:bg-primary-foreground/20 transition-colors active:scale-[0.97]"
              >
                <BarChart3 className="w-4 h-4" />
                Admin Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">How It Works</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Income protection in 3 simple steps
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative p-6 rounded-2xl glass-card group hover:shadow-xl hover:shadow-primary/[0.06] transition-shadow">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-extrabold text-foreground/[0.04]">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Why GigShield</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Built for delivery partners, by people who get it
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {benefits.map((b, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{b}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="container">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Don't let bad weather cost you a day's pay
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Join 12,000+ delivery partners already protected by GigShield.
              </p>
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity active:scale-[0.97]"
              >
                Start Your Coverage <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <div className="container">
          © 2026 GigShield. Parametric income protection for India's gig economy.
        </div>
      </footer>
    </div>
  );
}
