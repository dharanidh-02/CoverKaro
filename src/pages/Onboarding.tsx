import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { platforms, cities } from "@/lib/mockData";
import { calculatePremium } from "@/lib/aiEngine";
import { Shield, Phone, MapPin, Briefcase, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

type Step = 1 | 2 | 3;

export default function Onboarding() {
  const { updateUser } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [platform, setPlatform] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [earnings, setEarnings] = useState("");

  const sendOtp = () => {
    if (phone.length === 10) setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp.length === 4) setStep(2);
  };

  const finish = () => {
    const weeklyEarnings = parseInt(earnings) || 3000;
    const premium = calculatePremium({ city, zone, weeklyEarnings, platform });
    updateUser({
      phone,
      platform,
      city,
      zone,
      weeklyEarnings,
      isOnboarded: true,
      policyActive: false,
      premium,
    });
    navigate("/dashboard");
  };

  const stepLabels = ["Verify Phone", "Select Platform", "Your Details"];
  const stepIcons = [Phone, Briefcase, MapPin];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border/60 bg-card/80 backdrop-blur-xl">
        <div className="container py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">GigShield</span>
        </div>
      </div>

      <div className="flex-1 container max-w-md py-8">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {stepLabels.map((label, i) => {
            const Icon = stepIcons[i];
            const active = step === i + 1;
            const done = step > i + 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  done ? "gradient-accent" : active ? "gradient-primary" : "bg-muted"
                }`}>
                  {done ? (
                    <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  ) : (
                    <Icon className={`w-4 h-4 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  )}
                </div>
                <span className={`text-xs font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step 1: Phone */}
        {step === 1 && (
          <div className="animate-fade-up space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Enter your phone number</h2>
              <p className="text-sm text-muted-foreground">We'll send a 4-digit OTP to verify</p>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex items-center px-3 rounded-lg bg-muted text-sm font-medium text-muted-foreground">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="9876543210"
                  className="flex-1 px-4 py-3 rounded-lg border border-input bg-card text-foreground text-base outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              {!otpSent ? (
                <button
                  onClick={sendOtp}
                  disabled={phone.length !== 10}
                  className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold disabled:opacity-40 active:scale-[0.97] transition-transform"
                >
                  Send OTP
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    maxLength={4}
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 4-digit OTP"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground text-base text-center tracking-[0.5em] outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Demo: enter any 4 digits
                  </p>
                  <button
                    onClick={verifyOtp}
                    disabled={otp.length !== 4}
                    className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold disabled:opacity-40 active:scale-[0.97] transition-transform"
                  >
                    Verify & Continue
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Platform */}
        {step === 2 && (
          <div className="animate-fade-up space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Which platform do you deliver for?</h2>
              <p className="text-sm text-muted-foreground">Select your primary delivery platform</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all active:scale-[0.97] ${
                    platform === p.id
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-border hover:border-primary/30 bg-card"
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-sm font-semibold text-foreground">{p.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => platform && setStep(3)}
                disabled={!platform}
                className="flex-1 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="animate-fade-up space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Almost there!</h2>
              <p className="text-sm text-muted-foreground">Tell us where you work and how much you earn</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">City</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select your city</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Working Zone</label>
                <input
                  value={zone}
                  onChange={e => setZone(e.target.value)}
                  placeholder="e.g., Koramangala, Andheri West"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Average Weekly Earnings (₹)</label>
                <input
                  type="number"
                  value={earnings}
                  onChange={e => setEarnings(e.target.value)}
                  placeholder="e.g., 4500"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-card text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={finish}
                disabled={!city || !zone || !earnings}
                className="flex-1 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
              >
                Complete Setup <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
