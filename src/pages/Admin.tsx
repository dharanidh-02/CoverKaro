import { adminStats, adminWeeklyData, fraudAlerts, zoneRiskData } from "@/lib/mockData";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { Users, FileText, AlertTriangle, IndianRupee, ShieldAlert, TrendingUp, MapPin, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const statCards = [
  { label: "Total Users", value: adminStats.totalUsers.toLocaleString(), icon: Users, color: "text-primary" },
  { label: "Active Policies", value: adminStats.activePolicies.toLocaleString(), icon: FileText, color: "text-accent" },
  { label: "Claims Triggered", value: adminStats.claimsTriggered.toLocaleString(), icon: AlertTriangle, color: "text-warning" },
  { label: "Total Payouts", value: `₹${(adminStats.totalPayouts / 100000).toFixed(1)}L`, icon: IndianRupee, color: "text-primary" },
];

export default function Admin() {
  const { setIsAdmin } = useApp();

  useEffect(() => {
    setIsAdmin(true);
    return () => setIsAdmin(false);
  }, [setIsAdmin]);

  const riskBarColor = (risk: number) =>
    risk > 70 ? "hsl(0 72% 51%)" : risk > 50 ? "hsl(28 87% 55%)" : "hsl(145 63% 42%)";

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="container py-6 space-y-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-2">
            <Link to="/" className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Platform overview & analytics</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {statCards.map((s, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="p-4 rounded-xl glass-card">
                <div className={`flex items-center gap-2 ${s.color} mb-2`}>
                  <s.icon className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">{s.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Loss Ratio + Avg Premium */}
        <ScrollReveal delay={280}>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl glass-card">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Loss Ratio</p>
              <p className="text-3xl font-bold text-foreground tabular-nums">{(adminStats.lossRatio * 100).toFixed(0)}%</p>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full gradient-warning rounded-full" style={{ width: `${adminStats.lossRatio * 100}%` }} />
              </div>
            </div>
            <div className="p-4 rounded-xl glass-card">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Avg Premium</p>
              <p className="text-3xl font-bold text-foreground tabular-nums">₹{adminStats.avgPremium}</p>
              <p className="text-xs text-muted-foreground mt-2">Per user/week</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Revenue vs Claims Chart */}
        <ScrollReveal delay={340}>
          <div className="p-5 rounded-2xl glass-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">Premiums vs Claims (Weekly)</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminWeeklyData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(215 14% 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 14% 46%)" width={50} tickFormatter={v => `₹${v / 1000}k`} />
                  <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 20% 90%)", fontSize: 13 }} />
                  <Bar dataKey="premiums" fill="hsl(217 91% 50%)" radius={[4, 4, 0, 0]} name="Premiums" />
                  <Bar dataKey="claims" fill="hsl(28 87% 55%)" radius={[4, 4, 0, 0]} name="Claims" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>

        {/* User Growth */}
        <ScrollReveal delay={400}>
          <div className="p-5 rounded-2xl glass-card">
            <h3 className="text-sm font-semibold text-foreground mb-4">User Growth</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={adminWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(215 14% 46%)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(215 14% 46%)" width={50} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 20% 90%)", fontSize: 13 }} />
                  <Line type="monotone" dataKey="users" stroke="hsl(145 63% 42%)" strokeWidth={2.5} dot={{ fill: "hsl(145 63% 42%)", r: 4 }} name="Users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>

        {/* Zone Risk Heatmap */}
        <ScrollReveal delay={460}>
          <div className="p-5 rounded-2xl glass-card">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">High-Risk Zones</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneRiskData} layout="vertical" barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 20% 90%)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} stroke="hsl(215 14% 46%)" />
                  <YAxis type="category" dataKey="zone" tick={{ fontSize: 11 }} stroke="hsl(215 14% 46%)" width={110} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214 20% 90%)", fontSize: 13 }} formatter={(v: number) => [`${v}%`, "Risk"]} />
                  <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
                    {zoneRiskData.map((entry, i) => (
                      <Cell key={i} fill={riskBarColor(entry.risk)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </ScrollReveal>

        {/* Fraud Alerts */}
        <ScrollReveal delay={520}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-destructive" />
              <h3 className="text-sm font-semibold text-foreground">Fraud Alerts</h3>
            </div>
            <div className="space-y-2">
              {fraudAlerts.map((alert, i) => (
                <div key={i} className="flex items-start justify-between p-4 rounded-xl glass-card border-l-4 border-destructive/40">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alert.userId}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.reason}</p>
                    <p className="text-xs text-muted-foreground">{alert.city}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold tabular-nums ${
                      alert.score > 70 ? "text-destructive" : alert.score > 50 ? "text-warning" : "text-muted-foreground"
                    }`}>{alert.score}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Fraud Score</p>
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
