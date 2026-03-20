import { useApp } from "@/context/AppContext";
import { Navigate } from "react-router-dom";
import { predictRisk } from "@/lib/aiEngine";
import { mockClaims, mockWeeklyEarnings, mockDisruptions, mockWeather, platforms } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Shield, CloudRain, Wind, AlertTriangle, IndianRupee, TrendingUp, Droplets, Thermometer } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const riskColors = { low: "text-accent", medium: "text-warning", high: "text-destructive" };
const riskBg = { low: "bg-accent/10", medium: "bg-warning/10", high: "bg-destructive/10" };

export default function Dashboard() {
  const { user } = useApp();
  if (!user?.isOnboarded) return <Navigate to="/" replace />;

  const risk = predictRisk(user.city);
  const platformInfo = platforms.find(p => p.id === user.platform);
  const totalProtected = mockWeeklyEarnings.reduce((s, d) => s + d.protected, 0);
  const paidClaims = mockClaims.filter(c => c.status === "paid");
  const totalPaid = paidClaims.reduce((s, c) => s + c.payoutAmount, 0);

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container py-6 space-y-6">
        {/* Greeting */}
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Good {new Date().getHours() < 12 ? "morning" : "evening"}</p>
              <h1 className="text-2xl font-bold text-foreground">Your Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platformInfo?.color }} />
              {platformInfo?.name}
            </div>
          </div>
        </ScrollReveal>

        {/* Policy status card */}
        <ScrollReveal delay={80}>
          <div className={`p-5 rounded-2xl ${user.policyActive ? "gradient-primary" : "bg-muted"}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm font-medium ${user.policyActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  Weekly Coverage
                </p>
                <p className={`text-3xl font-extrabold mt-1 tabular-nums ${user.policyActive ? "text-primary-foreground" : "text-foreground"}`}>
                  {user.policyActive ? "Active" : "Inactive"}
                </p>
              </div>
              <Shield className={`w-8 h-8 ${user.policyActive ? "text-primary-foreground/30" : "text-muted-foreground/30"}`} />
            </div>
            {user.policyActive && (
              <p className="text-sm text-primary-foreground/70 mt-3">
                ₹{user.weeklyEarnings.toLocaleString()} protected • ₹{user.premium}/week premium
              </p>
            )}
            {!user.policyActive && (
              <a href="/policy" className="inline-block mt-3 text-sm font-semibold text-primary underline underline-offset-2">
                Activate your policy →
              </a>
            )}
          </div>
        </ScrollReveal>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3">
          <ScrollReveal delay={120}>
            <div className="p-4 rounded-xl glass-card">
              <div className="flex items-center gap-2 text-accent mb-2">
                <IndianRupee className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Protected</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">₹{totalProtected.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">This week</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="p-4 rounded-xl glass-card">
              <div className={`flex items-center gap-2 ${riskColors[risk.level]} mb-2`}>
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Risk Level</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{risk.percentage}%</p>
              <p className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${riskBg[risk.level]} ${riskColors[risk.level]} font-medium capitalize`}>
                {risk.level}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="p-4 rounded-xl glass-card">
              <div className="flex items-center gap-2 text-primary mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Payouts</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">₹{totalPaid.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">{paidClaims.length} claims paid</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="p-4 rounded-xl glass-card">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Thermometer className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Weather</span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{mockWeather.temp}°C</p>
              <p className="text-xs text-muted-foreground mt-1">AQI: {mockWeather.aqi}</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Active Disruptions */}
        {mockDisruptions.filter(d => d.active).length > 0 && (
          <ScrollReveal delay={280}>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Active Disruptions</h3>
              <div className="space-y-2">
                {mockDisruptions.filter(d => d.active).map(d => (
                  <div key={d.id} className="flex items-start gap-3 p-3 rounded-xl border border-warning/20 bg-warning/5">
                    {d.type === "rain" ? <CloudRain className="w-5 h-5 text-primary shrink-0 mt-0.5" /> :
                     d.type === "pollution" ? <Wind className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" /> :
                     <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />}
                    <div>
                      <p className="text-sm font-medium text-foreground">{d.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Zones: {d.affectedZones.join(", ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Risk Factors */}
        <ScrollReveal delay={320}>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Risk Factors</h3>
            <div className="space-y-2">
              {risk.factors.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Droplets className="w-3.5 h-3.5 text-primary" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Weekly Earnings Chart */}
        <ScrollReveal delay={360}>
          <div className="p-5 rounded-2xl glass-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Earnings & Protection</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyEarnings} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(215 14% 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215 14% 46%)" width={40} />
                  <Tooltip
                    contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 20% 90%)", fontSize: 13 }}
                    formatter={(value: number) => [`₹${value}`, ""]}
                  />
                  <Bar dataKey="earned" fill="hsl(217 91% 50%)" radius={[4, 4, 0, 0]} name="Earned" />
                  <Bar dataKey="protected" fill="hsl(145 63% 42%)" radius={[4, 4, 0, 0]} name="Protected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>

        {/* Recent Claims */}
        <ScrollReveal delay={400}>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent Claims</h3>
            <div className="space-y-2">
              {mockClaims.slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl glass-card">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      c.status === "paid" ? "bg-accent/10 text-accent" :
                      c.status === "approved" ? "bg-primary/10 text-primary" :
                      "bg-warning/10 text-warning"
                    }`}>
                      {c.disruptionType === "rain" ? <CloudRain className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.id}</p>
                      <p className="text-xs text-muted-foreground">{c.triggerValue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground tabular-nums">₹{c.payoutAmount}</p>
                    <p className={`text-xs font-medium capitalize ${
                      c.status === "paid" ? "text-accent" : c.status === "approved" ? "text-primary" : "text-warning"
                    }`}>{c.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
