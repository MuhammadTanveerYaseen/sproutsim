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
    id: "non-pta-1gb",
    name: "Starter Trial",
    tier: "Standard",
    data: "1 GB",
    validity: "7 Days",
    priceUSD: 1.89,
    pricePKR: 525,
    popular: false,
    ptaStatus: "100% Non-PTA Compatible",
    tethering: true,
    idealFor: "Testing Non-PTA connection & emergency data",
  },
  {
    id: "non-pta-3gb",
    name: "Weekly Pack",
    tier: "Standard",
    data: "3 GB",
    validity: "15 Days",
    priceUSD: 3.99,
    pricePKR: 1110,
    popular: false,
    ptaStatus: "100% Non-PTA Compatible",
    tethering: true,
    idealFor: "Short visits & WhatsApp navigation",
  },
  {
    id: "non-pta-10gb",
    name: "Monthly Freedom",
    tier: "Popular",
    data: "10 GB",
    validity: "30 Days",
    priceUSD: 8.99,
    pricePKR: 2500,
    popular: true,
    ptaStatus: "100% Non-PTA Compatible",
    tethering: true,
    idealFor: "Most popular for daily Non-PTA iPhone users",
  },
  {
    id: "non-pta-20gb",
    name: "Pro Streamer",
    tier: "Heavy",
    data: "20 GB",
    validity: "30 Days",
    priceUSD: 15.99,
    pricePKR: 4450,
    popular: false,
    ptaStatus: "100% Non-PTA Compatible",
    tethering: true,
    idealFor: "Social media, YouTube, Hotspot & calls",
  },
  {
    id: "non-pta-50gb",
    name: "Power User",
    tier: "Heavy",
    data: "50 GB",
    validity: "30 Days",
    priceUSD: 29.99,
    pricePKR: 8350,
    popular: false,
    ptaStatus: "100% Non-PTA Compatible",
    tethering: true,
    idealFor: "Nomads, laptop tethering & remote work",
  },
  {
    id: "non-pta-unl",
    name: "Unlimited VIP",
    tier: "Max",
    data: "Unlimited",
    validity: "30 Days",
    priceUSD: 44.99,
    pricePKR: 12530,
    popular: false,
    ptaStatus: "100% Non-PTA Compatible",
    tethering: true,
    idealFor: "Uncapped high-speed 4G data for 30 days",
  },
];

export const NON_PTA_FEATURES = [
  {
    id: "no-tax",
    title: "Zero PTA Tax",
    desc: "Avoid paying Rs 100,000 to Rs 250,000+ PTA device registration tax.",
  },
  {
    id: "no-block",
    title: "Never Gets Blocked",
    desc: "Works continuously on Non-PTA phones via international roaming data.",
  },
  {
    id: "hotspot",
    title: "Free Hotspot Sharing",
    desc: "Tether your Non-PTA data seamlessly to your laptop or other phones.",
  },
  {
    id: "instant",
    title: "Instant QR Setup",
    desc: "Scan and connect in under 60 seconds without CNIC biometric queues.",
  },
];
