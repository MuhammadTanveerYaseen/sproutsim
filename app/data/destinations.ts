export interface PakistanPackage {
  id: string;
  name: string;
  tier: "Standard" | "Popular" | "Heavy" | "Max";
  data: string;
  validity: string;
  priceUSD: number;
  pricePKR: number;
  popular?: boolean;
  ptaStatus: string;
  tethering: boolean;
  idealFor: string;
}

export const CURRENCY_RATES = {
  PKR: { symbol: "Rs ", rate: 278.5, label: "PKR (Rs)" },
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  AED: { symbol: "AED ", rate: 3.67, label: "AED (د.إ)" },
};

export type CurrencyCode = keyof typeof CURRENCY_RATES;

export const PAKISTAN_PLANS: PakistanPackage[] = [
  {
    id: "pkg-1gb",
    name: "Starter Trial",
    tier: "Standard",
    data: "1 GB",
    validity: "7 Days",
    priceUSD: 1.89,
    pricePKR: 525,
    popular: false,
    ptaStatus: "All eSIM Phones Ready",
    tethering: true,
    idealFor: "Testing connection & quick essential data",
  },
  {
    id: "pkg-3gb",
    name: "Weekly Pack",
    tier: "Standard",
    data: "3 GB",
    validity: "15 Days",
    priceUSD: 3.99,
    pricePKR: 1110,
    popular: false,
    ptaStatus: "All eSIM Phones Ready",
    tethering: true,
    idealFor: "Short visits, Maps & WhatsApp navigation",
  },
  {
    id: "pkg-10gb",
    name: "Monthly Freedom",
    tier: "Popular",
    data: "10 GB",
    validity: "30 Days",
    priceUSD: 8.99,
    pricePKR: 2500,
    popular: true,
    ptaStatus: "All eSIM Phones Ready",
    tethering: true,
    idealFor: "Most popular for daily smartphone users",
  },
  {
    id: "pkg-20gb",
    name: "Pro Streamer",
    tier: "Heavy",
    data: "20 GB",
    validity: "30 Days",
    priceUSD: 15.99,
    pricePKR: 4450,
    popular: false,
    ptaStatus: "All eSIM Phones Ready",
    tethering: true,
    idealFor: "Social media, streaming, Hotspot & video calls",
  },
  {
    id: "pkg-50gb",
    name: "Power User",
    tier: "Heavy",
    data: "50 GB",
    validity: "30 Days",
    priceUSD: 29.99,
    pricePKR: 8350,
    popular: false,
    ptaStatus: "All eSIM Phones Ready",
    tethering: true,
    idealFor: "Heavy data users, laptop tethering & remote work",
  },
  {
    id: "pkg-unl",
    name: "Unlimited VIP",
    tier: "Max",
    data: "Unlimited",
    validity: "30 Days",
    priceUSD: 44.99,
    pricePKR: 12530,
    popular: false,
    ptaStatus: "All eSIM Phones Ready",
    tethering: true,
    idealFor: "Uncapped high-speed 4G data for 30 days",
  },
];

export const NON_PTA_FEATURES = [
  {
    id: "no-tax",
    title: "Zero Device Tax",
    desc: "Stay connected without paying expensive device registration taxes.",
  },
  {
    id: "no-block",
    title: "Never Gets Blocked",
    desc: "Works continuously year-round via reliable international data roaming.",
  },
  {
    id: "hotspot",
    title: "Free Hotspot Sharing",
    desc: "Tether your high-speed mobile data to your laptop, tablet, or other devices.",
  },
  {
    id: "instant",
    title: "Instant QR Setup",
    desc: "Scan and connect in under 60 seconds without franchise visits or queues.",
  },
];
