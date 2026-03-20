import { useApp } from "@/context/AppContext";
import { Navigate } from "react-router-dom";
import { mockClaims, type Claim } from "@/lib/mockData";
import { CloudRain, Wind, AlertTriangle, Ban, CheckCircle2, Clock, IndianRupee, Zap } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";

const typeIcons = { rain: CloudRain, pollution: Wind, curfew: Ban, traffic: AlertTriangle };
const statusStyles = {
  processing: { bg: "bg-warning/10", text: "text-warning", icon: Clock },
  approved: { bg: "bg-primary/10", text: "text-primary", icon: CheckCircle2 },
  paid: { bg: "bg-accent/10", text: "text-accent", icon: IndianRupee },
};

export default function Claims() {
  const { user } = useApp();
  const [showPayout, setShowPayout] = useState<string | null>(null);

  if (!user?.isOnboarded) return <Navigate to="/" replace />;

  const hourlyRate = Math.round(user.weeklyEarnings / 42); // ~6hrs/day * 7

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container max-w-lg py-6 space-y-6">
        <ScrollReveal>
          <h1 className="text-2xl font-bold text-foreground">Claims</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Claims are triggered automatically — no forms needed
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Parametric Auto-Trigger</p>
              <p className="text-xs text-muted-foreground mt-1">
                When rainfall exceeds 50mm, AQI crosses 300, or a curfew is declared, your claim is automatically created and processed.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {mockClaims.map((claim, i) => {
            const TypeIcon = typeIcons[claim.disruptionType];
            const status = statusStyles[claim.status];
            const StatusIcon = status.icon;
            const expanded = showPayout === claim.id;

            return (
              <ScrollReveal key={claim.id} delay={120 + i * 80}>
                <button
                  onClick={() => setShowPayout(expanded ? null : claim.id)}
                  className="w-full text-left p-4 rounded-2xl glass-card hover:shadow-lg hover:shadow-primary/[0.04] transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bg}`}>
                        <TypeIcon className={`w-5 h-5 ${status.text}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{claim.id}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{claim.date}</p>
                        <p className="text-xs text-muted-foreground">{claim.triggerValue}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground tabular-nums">₹{claim.payoutAmount}</p>
                      <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {claim.status}
                      </div>
                    </div>
                  </div>

                  {expanded && (
                    <div className="mt-4 pt-4 border-t border-border/50 space-y-2 animate-fade-up">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lost Hours</span>
                        <span className="font-medium text-foreground tabular-nums">{claim.lostHours} hrs</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hourly Rate</span>
                        <span className="font-medium text-foreground tabular-nums">₹{hourlyRate}/hr</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Coverage (85%)</span>
                        <span className="font-bold text-accent tabular-nums">₹{claim.payoutAmount}</span>
                      </div>
                      {claim.status === "paid" && (
                        <div className="mt-3 p-3 rounded-xl bg-accent/5 border border-accent/10 text-center">
                          <p className="text-xs text-accent font-semibold">✓ Paid via UPI</p>
                        </div>
                      )}
                    </div>
                  )}
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
