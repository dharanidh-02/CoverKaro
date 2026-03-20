// Simulated AI/ML engine for parametric insurance

export type RiskLevel = "low" | "medium" | "high";

export interface PremiumInput {
  city: string;
  zone: string;
  weeklyEarnings: number;
  platform: string;
}

export interface RiskPrediction {
  level: RiskLevel;
  percentage: number;
  factors: string[];
}

// City risk multipliers (simulated)
const cityRiskMap: Record<string, number> = {
  Mumbai: 0.85,
  Delhi: 0.78,
  Bangalore: 0.45,
  Chennai: 0.65,
  Hyderabad: 0.40,
  Pune: 0.50,
  Kolkata: 0.72,
  Ahmedabad: 0.38,
  Jaipur: 0.42,
  Lucknow: 0.55,
};

// Seasonal risk boost (month-based)
function getSeasonalMultiplier(): number {
  const month = new Date().getMonth();
  // Jun-Sep monsoon
  if (month >= 5 && month <= 8) return 1.6;
  // Oct-Nov post-monsoon
  if (month >= 9 && month <= 10) return 1.2;
  // Dec-Jan winter smog (Delhi etc.)
  if (month === 11 || month === 0) return 1.3;
  return 1.0;
}

export function calculatePremium(input: PremiumInput): number {
  const baseRate = 0.018; // 1.8% of weekly earnings
  const cityRisk = cityRiskMap[input.city] ?? 0.5;
  const seasonal = getSeasonalMultiplier();
  const raw = input.weeklyEarnings * baseRate * (1 + cityRisk) * seasonal;
  return Math.max(10, Math.min(50, Math.round(raw)));
}

export function predictRisk(city: string): RiskPrediction {
  const base = cityRiskMap[city] ?? 0.5;
  const seasonal = getSeasonalMultiplier();
  const score = Math.min(0.95, base * seasonal * 0.7);
  const percentage = Math.round(score * 100);

  const factors: string[] = [];
  if (seasonal > 1.3) factors.push("Monsoon season active");
  if (seasonal > 1.2 && seasonal <= 1.3) factors.push("Winter smog risk elevated");
  if (base > 0.6) factors.push("High-disruption metro area");
  if (base > 0.4 && base <= 0.6) factors.push("Moderate urban disruption zone");
  if (factors.length === 0) factors.push("Stable conditions forecast");

  const level: RiskLevel = percentage > 60 ? "high" : percentage > 35 ? "medium" : "low";

  return { level, percentage, factors };
}

export function calculateFraudScore(claims: number, avgClaims: number, gpsAnomalies: number): number {
  let score = 0;
  if (claims > avgClaims * 2) score += 35;
  else if (claims > avgClaims * 1.5) score += 20;
  score += Math.min(40, gpsAnomalies * 10);
  // Add random noise
  score += Math.floor(Math.random() * 15);
  return Math.min(100, Math.max(0, score));
}

export function calculatePayout(lostHours: number, hourlyRate: number): number {
  return Math.round(lostHours * hourlyRate * 0.85); // 85% coverage
}
