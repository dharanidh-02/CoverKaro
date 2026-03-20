import { useApp } from "@/context/AppContext";
import { Navigate } from "react-router-dom";
import { calculatePremium, predictRisk } from "@/lib/aiEngine";
import { Shield, CheckCircle2, Clock, IndianRupee, AlertTriangle, Zap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

export default function Policy() {
  const { user, updateUser } = useApp();
  const [activating, setActivating] = useState(false);

  if (!user?.isOnboarded) return <Navigate to="/" replace />;

  const premium = calculatePremium({
    city: user.city,
    zone: user.zone,
    weeklyEarnings: user.weeklyEarnings,
    platform: user.platform,
  });
  const risk = predictRisk(user.city);

  const activate = () => {
    setActivating(true);
    setTimeout(() => {
      updateUser({ policyActive: true, premium });
      setActivating(false);
    }, 1500);
  };

  const coverageDetails = [
    { label: "Coverage Amount", value: `₹${user.weeklyEarnings.toLocaleString()}/week` },
    { label: "Coverage Hours", value: "6 AM – 12 AM daily" },
    { label: "Triggers", value: "Rain, AQI, Curfew, Traffic" },
    { label: "Payout Speed", value: "Within 2 hours" },
    { label: "Payout Method", value: "UPI / Bank Transfer" },
    { label: "Auto-Renewal", value: "Weekly" },
  ];

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container max-w-lg py-6 space-y-6">
        <ScrollReveal>
          <h1 className="text-2xl font-bold text-foreground">Your Policy</h1>
        </ScrollReveal>

        {/* Premium Card */}
        <ScrollReveal delay={80}>
          <div className="p-6 rounded-2xl gradient-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/5 rounded-full -translate-y-8 translate-x-8" />
            <p className="text-sm text-primary-foreground/70 font-medium">Weekly Premium</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-5xl font-extrabold text-primary-foreground tabular-nums">₹{premium}</span>
              <span className="text-primary-foreground/60 text-sm">/week</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> ₹{user.weeklyEarnings.toLocaleString()} covered
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> {risk.level} risk
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Pricing */}
        <ScrollReveal delay={140}>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">AI-Powered Dynamic Pricing</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Your premium is calculated based on your city's disruption history, current season, and real-time risk data.
                  {risk.level === "high" && " Your area currently has elevated risk, which affects pricing."}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Coverage Details */}
        <ScrollReveal delay={200}>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">Coverage Details</h3>
            {coverageDetails.map((d, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-card border border-border/50">
                <span className="text-sm text-muted-foreground">{d.label}</span>
                <span className="text-sm font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Activate Button */}
        <ScrollReveal delay={260}>
          {user.policyActive ? (
            <div className="flex items-center justify-center gap-2 py-4 rounded-xl bg-accent/10 text-accent font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              Policy Active
            </div>
          ) : (
            <button
              onClick={activate}
              disabled={activating}
              className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 active:scale-[0.97] transition-transform disabled:opacity-70"
            >
              {activating ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <IndianRupee className="w-5 h-5" /> Activate Policy — ₹{premium}/week
                </>
              )}
            </button>
          )}
        </ScrollReveal>
      </div>
    </div>
  );
}
