export interface EsimPlan {
  id: string;
  data: string;
  validity: string;
  priceUSD: number;
  pricePKR: number;
  popular?: boolean;
  unlimited?: boolean;
  features?: string[];
}

export interface PakistanPackage {
  id: string;
  name: string;
  tier: "Standard" | "Popular" | "Heavy" | "Max";
  data: string;
  validity: string;
  priceUSD: number;
  pricePKR: number;
  popular?: boolean;
  networks: string[];
  speeds: string[];
  tethering: boolean;
  callsSms: string;
}

export interface PakistanCityCoverage {
  id: string;
  cityName: string;
  province: string;
  coverageSpeed: string;
  primaryCarriers: string[];
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
    id: "pk-1gb",
    name: "Starter Lite",
    tier: "Standard",
    data: "1 GB",
    validity: "7 Days",
    priceUSD: 1.49,
    pricePKR: 415,
    popular: false,
    networks: ["Jazz 4G", "Zong 4G"],
    speeds: ["4G LTE"],
    tethering: true,
    callsSms: "Data Only / WhatsApp Calls",
  },
  {
    id: "pk-3gb",
    name: "Traveler Plus",
    tier: "Standard",
    data: "3 GB",
    validity: "15 Days",
    priceUSD: 3.49,
    pricePKR: 970,
    popular: false,
    networks: ["Jazz 4G", "Zong 4G", "Telenor"],
    speeds: ["4G LTE High-Speed"],
    tethering: true,
    callsSms: "Data Only / WhatsApp Calls",
  },
  {
    id: "pk-10gb",
    name: "Explorer Choice",
    tier: "Popular",
    data: "10 GB",
    validity: "30 Days",
    priceUSD: 7.99,
    pricePKR: 2225,
    popular: true,
    networks: ["Jazz 4G", "Zong 4G", "Telenor", "Ufone"],
    speeds: ["Super 4G LTE"],
    tethering: true,
    callsSms: "Data Only / WhatsApp Calls",
  },
  {
    id: "pk-20gb",
    name: "Power User",
    tier: "Heavy",
    data: "20 GB",
    validity: "30 Days",
    priceUSD: 13.99,
    pricePKR: 3890,
    popular: false,
    networks: ["Jazz 4G", "Zong 4G", "Telenor", "Ufone"],
    speeds: ["Super 4G LTE"],
    tethering: true,
    callsSms: "Data Only / WhatsApp Calls",
  },
  {
    id: "pk-50gb",
    name: "Nomad Ultra",
    tier: "Max",
    data: "50 GB",
    validity: "30 Days",
    priceUSD: 24.99,
    pricePKR: 6960,
    popular: false,
    networks: ["Jazz 4G", "Zong 4G", "Telenor"],
    speeds: ["Super 4G LTE"],
    tethering: true,
    callsSms: "Data Only / WhatsApp Calls",
  },
  {
    id: "pk-unl",
    name: "Unlimited Max",
    tier: "Max",
    data: "Unlimited",
    validity: "15 Days",
    priceUSD: 32.99,
    pricePKR: 9190,
    popular: false,
    networks: ["Jazz 4G", "Zong 4G"],
    speeds: ["Super 4G LTE"],
    tethering: true,
    callsSms: "Data Only / WhatsApp Calls",
  },
];

export const PAKISTAN_CITIES: PakistanCityCoverage[] = [
  {
    id: "karachi",
    cityName: "Karachi",
    province: "Sindh",
    coverageSpeed: "Full 4G+ Coverage",
    primaryCarriers: ["Jazz", "Zong"],
  },
  {
    id: "lahore",
    cityName: "Lahore",
    province: "Punjab",
    coverageSpeed: "High-Speed 4G LTE",
    primaryCarriers: ["Jazz", "Zong"],
  },
  {
    id: "islamabad",
    cityName: "Islamabad & Rawalpindi",
    province: "Capital / Punjab",
    coverageSpeed: "Full 4G+ Coverage",
    primaryCarriers: ["Jazz", "Zong", "Telenor"],
  },
  {
    id: "northern-areas",
    cityName: "Northern Areas (Hunza, Skardu, Gilgit)",
    province: "Gilgit-Baltistan",
    coverageSpeed: "Mountain 4G Data",
    primaryCarriers: ["SCOM", "Zong", "Jazz"],
  },
];
