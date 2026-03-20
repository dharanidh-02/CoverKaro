export const platforms = [
  { id: "swiggy", name: "Swiggy", color: "hsl(28 87% 55%)" },
  { id: "zomato", name: "Zomato", color: "hsl(0 72% 51%)" },
  { id: "zepto", name: "Zepto", color: "hsl(270 60% 50%)" },
  { id: "amazon", name: "Amazon Flex", color: "hsl(30 70% 45%)" },
  { id: "dunzo", name: "Dunzo", color: "hsl(145 63% 42%)" },
  { id: "blinkit", name: "Blinkit", color: "hsl(48 90% 50%)" },
];

export const cities = [
  "Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
];

export type ClaimStatus = "processing" | "approved" | "paid";
export type DisruptionType = "rain" | "pollution" | "curfew" | "traffic";

export interface Claim {
  id: string;
  date: string;
  disruptionType: DisruptionType;
  lostHours: number;
  payoutAmount: number;
  status: ClaimStatus;
  triggerValue: string;
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainfall: number;
  aqi: number;
  condition: string;
}

export interface Disruption {
  id: string;
  type: DisruptionType;
  description: string;
  severity: "moderate" | "severe";
  affectedZones: string[];
  active: boolean;
  startTime: string;
}

export const mockClaims: Claim[] = [
  { id: "CLM-1047", date: "2026-03-18", disruptionType: "rain", lostHours: 4.5, payoutAmount: 382, status: "paid", triggerValue: "Rainfall: 68mm" },
  { id: "CLM-1046", date: "2026-03-15", disruptionType: "pollution", lostHours: 3, payoutAmount: 255, status: "paid", triggerValue: "AQI: 412" },
  { id: "CLM-1048", date: "2026-03-19", disruptionType: "rain", lostHours: 5, payoutAmount: 425, status: "approved", triggerValue: "Rainfall: 82mm" },
  { id: "CLM-1049", date: "2026-03-20", disruptionType: "traffic", lostHours: 2.5, payoutAmount: 212, status: "processing", triggerValue: "Severe gridlock — VIP movement" },
];

export const mockDisruptions: Disruption[] = [
  { id: "D-301", type: "rain", description: "Heavy rainfall warning — IMD Orange Alert", severity: "severe", affectedZones: ["Andheri", "Bandra", "Kurla"], active: true, startTime: "2026-03-20T06:00:00" },
  { id: "D-302", type: "pollution", description: "AQI exceeds 350 — GRAP Stage III", severity: "moderate", affectedZones: ["Connaught Place", "Dwarka"], active: false, startTime: "2026-03-19T00:00:00" },
  { id: "D-303", type: "traffic", description: "Severe congestion due to road closure", severity: "moderate", affectedZones: ["MG Road", "Koramangala"], active: true, startTime: "2026-03-20T14:00:00" },
];

export const mockWeather: WeatherData = {
  temp: 31,
  humidity: 78,
  rainfall: 42,
  aqi: 156,
  condition: "Partly Cloudy",
};

export const mockWeeklyEarnings = [
  { day: "Mon", earned: 850, protected: 722 },
  { day: "Tue", earned: 920, protected: 782 },
  { day: "Wed", earned: 0, protected: 680, disrupted: true },
  { day: "Thu", earned: 780, protected: 663 },
  { day: "Fri", earned: 1050, protected: 892 },
  { day: "Sat", earned: 1200, protected: 1020 },
  { day: "Sun", earned: 960, protected: 816 },
];

// Admin mock data
export const adminStats = {
  totalUsers: 12847,
  activePolicies: 9231,
  claimsTriggered: 1456,
  totalPayouts: 2847500,
  avgPremium: 28,
  lossRatio: 0.68,
};

export const adminWeeklyData = [
  { week: "W1", premiums: 258000, claims: 178000, users: 11200 },
  { week: "W2", premiums: 271000, claims: 195000, users: 11800 },
  { week: "W3", premiums: 289000, claims: 165000, users: 12300 },
  { week: "W4", premiums: 295000, claims: 210000, users: 12847 },
];

export const fraudAlerts = [
  { userId: "USR-4821", score: 78, reason: "3x avg claim frequency + GPS anomaly", city: "Delhi" },
  { userId: "USR-7392", score: 65, reason: "Duplicate claim timestamps", city: "Mumbai" },
  { userId: "USR-1093", score: 52, reason: "Claims during non-disruption hours", city: "Bangalore" },
];

export const zoneRiskData = [
  { zone: "Andheri West", city: "Mumbai", risk: 82, activeClaims: 45 },
  { zone: "Connaught Place", city: "Delhi", risk: 74, activeClaims: 38 },
  { zone: "Koramangala", city: "Bangalore", risk: 41, activeClaims: 12 },
  { zone: "T. Nagar", city: "Chennai", risk: 58, activeClaims: 22 },
  { zone: "Banjara Hills", city: "Hyderabad", risk: 35, activeClaims: 8 },
  { zone: "Kothrud", city: "Pune", risk: 47, activeClaims: 15 },
];
