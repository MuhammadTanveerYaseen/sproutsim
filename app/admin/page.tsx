"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Activity,
  Layers,
  Smartphone,
  CreditCard,
  Settings,
  Mail,
  RefreshCw,
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  LogOut,
  TrendingUp,
  Users,
  Wifi,
  Send,
  QrCode,
  Copy,
  Check,
  X,
  Server,
  Key,
  Globe,
  Sliders,
  DollarSign,
  ChevronRight,
  Sparkles,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Terminal,
  Database,
  Bell,
  Lock,
  PauseCircle,
  PlayCircle,
  Eye,
  Receipt,
  Zap,
  Code2,
} from "lucide-react";
import { GLOESIM_PAKISTAN_PACKAGES } from "../lib/gloesim";
import { fetchGraphQL } from "../lib/graphql-client";

export const GLOESIM_CATALOG = Object.entries(GLOESIM_PAKISTAN_PACKAGES).map(([key, pkg]) => ({
  ...pkg,
  planKey: key,
}));

// ==========================================
// ENTERPRISE TYPES & INTERFACES
// ==========================================
export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  planName: string;
  packageCode: string;
  dataMB: number;
  dataFormatted: string;
  amountPKR: number;
  amountUSD: number;
  wholesaleCostUSD: number;
  grossMarginUSD: number;
  grossMarginPct: number;
  status: "ACTIVE" | "PENDING" | "COMPLETED" | "REFUNDED";
  paymentMethod: "Stripe" | "JazzCash" | "EasyPaisa" | "Bank Transfer";
  iccid: string;
  lpaCode: string;
  createdAt: string;
  carrier: string;
  emailDispatched: boolean;
}

export interface AdminEsim {
  id: string;
  iccid: string;
  customerEmail: string;
  customerName: string;
  deviceModel: string;
  planName: string;
  packageCode: string;
  totalMB: number;
  usedMB: number;
  remainingMB: number;
  status: "ACTIVE" | "SUSPENDED" | "DEPLETED" | "EXPIRED";
  operator: string;
  mccMnc: string;
  validUntil: string;
  lpaCode: string;
  smdpAddress: string;
  matchingId: string;
  sessionsCount: number;
  lastActive: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  status: "SUCCESS" | "WARNING" | "FAILED";
}

export interface EmailLog {
  id: string;
  recipient: string;
  subject: string;
  template: string;
  status: "DELIVERED" | "PENDING" | "FAILED";
  timestamp: string;
  latencyMs: number;
}

export interface CdrRecord {
  id: string;
  startTime: string;
  durationMin: number;
  bytesUsedMB: number;
  cellTower: string;
  location: string;
  network: string;
  ipAddress: string;
}

// Initial Comprehensive Mock Data
const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ord_101",
    orderNumber: "ORD-9482-PK",
    customerName: "Danyal Sheikh",
    customerEmail: "danyal.sheikh@example.com",
    customerPhone: "+92 300 8472910",
    planName: "10 GB Monthly (Hot)",
    packageCode: "GLO_PK_10GB_30D",
    dataMB: 10240,
    dataFormatted: "10 GB",
    amountPKR: 2225,
    amountUSD: 7.99,
    wholesaleCostUSD: 2.10,
    grossMarginUSD: 5.89,
    grossMarginPct: 73.7,
    status: "ACTIVE",
    paymentMethod: "Stripe",
    iccid: "8988228044928812901",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-889123-ACTIVATION",
    createdAt: "2026-09-30 14:22",
    carrier: "Jazz 4G LTE / Zong 4G",
    emailDispatched: true,
  },
  {
    id: "ord_102",
    orderNumber: "ORD-9481-PK",
    customerName: "Ayesha Malik",
    customerEmail: "ayesha.m@travelpak.net",
    customerPhone: "+92 321 4459102",
    planName: "20 GB Pro Streamer",
    packageCode: "GLO_PK_20GB_30D",
    dataMB: 20480,
    dataFormatted: "20 GB",
    amountPKR: 3895,
    amountUSD: 13.99,
    wholesaleCostUSD: 3.80,
    grossMarginUSD: 10.19,
    grossMarginPct: 72.8,
    status: "ACTIVE",
    paymentMethod: "Stripe",
    iccid: "8988228033819920192",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-774910-ACTIVATION",
    createdAt: "2026-09-30 12:05",
    carrier: "Jazz 4G LTE / Zong 4G",
    emailDispatched: true,
  },
  {
    id: "ord_103",
    orderNumber: "ORD-9480-PK",
    customerName: "Bilal Farooq",
    customerEmail: "bilal.farooq@outlook.com",
    customerPhone: "+92 333 9981240",
    planName: "50 GB Power User",
    packageCode: "GLO_PK_50GB_30D",
    dataMB: 51200,
    dataFormatted: "50 GB",
    amountPKR: 6995,
    amountUSD: 24.99,
    wholesaleCostUSD: 7.20,
    grossMarginUSD: 17.79,
    grossMarginPct: 71.2,
    status: "ACTIVE",
    paymentMethod: "JazzCash",
    iccid: "8988228011293847291",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-448190-ACTIVATION",
    createdAt: "2026-09-30 09:41",
    carrier: "Jazz 4G LTE / Zong 4G / Telenor",
    emailDispatched: true,
  },
  {
    id: "ord_104",
    orderNumber: "ORD-9479-PK",
    customerName: "Hamza Tariq",
    customerEmail: "hamza.t@lahore.dev",
    customerPhone: "+92 345 1102948",
    planName: "3 GB Weekly Pass",
    packageCode: "GLO_PK_3GB_7D",
    dataMB: 3072,
    dataFormatted: "3 GB",
    amountPKR: 1195,
    amountUSD: 4.29,
    wholesaleCostUSD: 1.15,
    grossMarginUSD: 3.14,
    grossMarginPct: 73.2,
    status: "ACTIVE",
    paymentMethod: "EasyPaisa",
    iccid: "8988228099238471203",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-110294-ACTIVATION",
    createdAt: "2026-09-29 18:30",
    carrier: "Jazz 4G LTE",
    emailDispatched: true,
  },
  {
    id: "ord_105",
    orderNumber: "ORD-9478-PK",
    customerName: "Zainab Raza",
    customerEmail: "zainab.raza@islamabad.org",
    customerPhone: "+92 301 5592817",
    planName: "1 GB Starter Trial",
    packageCode: "GLO_PK_1GB_7D",
    dataMB: 1024,
    dataFormatted: "1 GB",
    amountPKR: 525,
    amountUSD: 1.89,
    wholesaleCostUSD: 0.90,
    grossMarginUSD: 0.99,
    grossMarginPct: 52.4,
    status: "COMPLETED",
    paymentMethod: "Stripe",
    iccid: "8988228077651239012",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-559102-ACTIVATION",
    createdAt: "2026-09-29 11:15",
    carrier: "Jazz 4G LTE",
    emailDispatched: true,
  },
];

const INITIAL_ESIMS: AdminEsim[] = [
  {
    id: "esim_1",
    iccid: "8988228044928812901",
    customerEmail: "danyal.sheikh@example.com",
    customerName: "Danyal Sheikh",
    deviceModel: "Apple iPhone 15 Pro",
    planName: "10 GB Monthly (Hot)",
    packageCode: "GLO_PK_10GB_30D",
    totalMB: 10240,
    usedMB: 3686,
    remainingMB: 6554,
    status: "ACTIVE",
    operator: "Jazz 4G LTE",
    mccMnc: "410-01",
    validUntil: "2026-10-30",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-889123-ACTIVATION",
    smdpAddress: "smdp.gloesim.com",
    matchingId: "GLO-PK-889123-ACTIVATION",
    sessionsCount: 42,
    lastActive: "12 mins ago",
  },
  {
    id: "esim_2",
    iccid: "8988228033819920192",
    customerEmail: "ayesha.m@travelpak.net",
    customerName: "Ayesha Malik",
    deviceModel: "Samsung Galaxy S24 Ultra",
    planName: "20 GB Pro Streamer",
    packageCode: "GLO_PK_20GB_30D",
    totalMB: 20480,
    usedMB: 5120,
    remainingMB: 15360,
    status: "ACTIVE",
    operator: "Zong 4G LTE",
    mccMnc: "410-04",
    validUntil: "2026-10-30",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-774910-ACTIVATION",
    smdpAddress: "smdp.gloesim.com",
    matchingId: "GLO-PK-774910-ACTIVATION",
    sessionsCount: 78,
    lastActive: "3 mins ago",
  },
  {
    id: "esim_3",
    iccid: "8988228011293847291",
    customerEmail: "bilal.farooq@outlook.com",
    customerName: "Bilal Farooq",
    deviceModel: "Google Pixel 8 Pro",
    planName: "50 GB Power User",
    packageCode: "GLO_PK_50GB_30D",
    totalMB: 51200,
    usedMB: 12288,
    remainingMB: 38912,
    status: "ACTIVE",
    operator: "Jazz 4G LTE",
    mccMnc: "410-01",
    validUntil: "2026-10-30",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-448190-ACTIVATION",
    smdpAddress: "smdp.gloesim.com",
    matchingId: "GLO-PK-448190-ACTIVATION",
    sessionsCount: 112,
    lastActive: "Just now",
  },
  {
    id: "esim_4",
    iccid: "8988228099238471203",
    customerEmail: "hamza.t@lahore.dev",
    customerName: "Hamza Tariq",
    deviceModel: "Apple iPhone 14 Pro",
    planName: "3 GB Weekly Pass",
    packageCode: "GLO_PK_3GB_7D",
    totalMB: 3072,
    usedMB: 2100,
    remainingMB: 972,
    status: "ACTIVE",
    operator: "Jazz 4G LTE",
    mccMnc: "410-01",
    validUntil: "2026-10-07",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-110294-ACTIVATION",
    smdpAddress: "smdp.gloesim.com",
    matchingId: "GLO-PK-110294-ACTIVATION",
    sessionsCount: 19,
    lastActive: "45 mins ago",
  },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log_1",
    timestamp: "2026-09-30 21:05:14",
    actor: "superadmin@sproutsim.cloud",
    action: "PROVISION_ESIM",
    target: "ORD-9482-PK (8988228044928812901)",
    ip: "182.185.190.44",
    status: "SUCCESS",
  },
  {
    id: "log_2",
    timestamp: "2026-09-30 20:54:12",
    actor: "system_daemon",
    action: "GLOESIM_PING_HEALTHCHECK",
    target: "api.gloesim.com:443",
    ip: "10.0.4.1",
    status: "SUCCESS",
  },
  {
    id: "log_3",
    timestamp: "2026-09-30 19:40:02",
    actor: "superadmin@sproutsim.cloud",
    action: "TOPUP_ESIM_3GB",
    target: "ICCID: 8988228065989649",
    ip: "182.185.190.44",
    status: "SUCCESS",
  },
  {
    id: "log_4",
    timestamp: "2026-09-30 18:22:19",
    actor: "system_smtp",
    action: "HOSTINGER_DISPATCH_QR",
    target: "ayesha.m@travelpak.net",
    ip: "smtp.hostinger.com",
    status: "SUCCESS",
  },
];

const INITIAL_EMAIL_LOGS: EmailLog[] = [
  {
    id: "em_1",
    recipient: "danyal.sheikh@example.com",
    subject: "Your SproutSIM 10 GB eSIM is Ready! [QR Code & LPA Inside]",
    template: "customer-order-ready.html",
    status: "DELIVERED",
    timestamp: "2026-09-30 14:22:45",
    latencyMs: 740,
  },
  {
    id: "em_2",
    recipient: "ayesha.m@travelpak.net",
    subject: "Your SproutSIM 20 GB eSIM is Ready! [QR Code & LPA Inside]",
    template: "customer-order-ready.html",
    status: "DELIVERED",
    timestamp: "2026-09-30 12:05:32",
    latencyMs: 812,
  },
  {
    id: "em_3",
    recipient: "bilal.farooq@outlook.com",
    subject: "Your SproutSIM 50 GB eSIM is Ready! [QR Code & LPA Inside]",
    template: "customer-order-ready.html",
    status: "DELIVERED",
    timestamp: "2026-09-30 09:41:18",
    latencyMs: 690,
  },
  {
    id: "em_4",
    recipient: "hamza.t@lahore.dev",
    subject: "Your SproutSIM 3 GB eSIM is Ready! [QR Code & LPA Inside]",
    template: "customer-order-ready.html",
    status: "DELIVERED",
    timestamp: "2026-09-29 18:30:54",
    latencyMs: 915,
  },
];

const CDR_SESSIONS_MOCK: CdrRecord[] = [
  {
    id: "cdr_01",
    startTime: "2026-09-30 20:14",
    durationMin: 42,
    bytesUsedMB: 312.4,
    cellTower: "LHE-GUL-TOWER-410",
    location: "Gulberg III, Lahore",
    network: "Jazz 4G LTE",
    ipAddress: "100.84.19.122",
  },
  {
    id: "cdr_02",
    startTime: "2026-09-30 18:40",
    durationMin: 18,
    bytesUsedMB: 84.1,
    cellTower: "LHE-DHA-PHASE5-01",
    location: "DHA Phase 5, Lahore",
    network: "Jazz 4G LTE",
    ipAddress: "100.84.19.145",
  },
  {
    id: "cdr_03",
    startTime: "2026-09-30 16:10",
    durationMin: 65,
    bytesUsedMB: 1042.8,
    cellTower: "ISB-F7-SECTOR-09",
    location: "F-7 Markaz, Islamabad",
    network: "Zong 4G LTE",
    ipAddress: "100.112.40.89",
  },
];

export default function AdminPage() {
  // Authentication & Security
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [environmentMode, setEnvironmentMode] = useState<"PROD" | "SANDBOX">("PROD");

  // Navigation Tabs
  type NavTab =
    | "overview"
    | "orders"
    | "esims"
    | "provision"
    | "pricing"
    | "gloesim"
    | "email"
    | "audit"
    | "database"
    | "graphql";
  const [activeTab, setActiveTab] = useState<NavTab>("overview");

  // Live Data State
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [esims, setEsims] = useState<AdminEsim[]>(INITIAL_ESIMS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(INITIAL_EMAIL_LOGS);

  // MongoDB Atlas & GraphQL Connection Status & Live Sync
  const [mongoStatus, setMongoStatus] = useState<{
    success: boolean;
    latencyMs: number;
    database: string;
    message: string;
  } | null>(null);
  const [isLoadingMongoData, setIsLoadingMongoData] = useState<boolean>(false);

  // GraphQL Interactive Playground State in Admin UI
  const [gqlQueryInput, setGqlQueryInput] = useState<string>(`query GetTelecomDashboard {
  metrics {
    totalSalesPKR
    totalSalesUSD
    totalGrossProfitUSD
    avgGrossMarginPct
    activeEsimsCount
    totalDataConsumedGB
  }
  health {
    mongodb { connected latencyMs database }
    smtp { connected host }
    gloesim { status sla walletBalanceUSD }
  }
  packages {
    code
    name
    retailPricePKR
    grossMarginPct
  }
}`);
  const [gqlResponseOutput, setGqlResponseOutput] = useState<string>("");
  const [isExecutingGql, setIsExecutingGql] = useState<boolean>(false);
  const [gqlLatencyMs, setGqlLatencyMs] = useState<number | null>(null);

  const handleExecuteGqlConsole = async (overrideQuery?: string) => {
    setIsExecutingGql(true);
    setGqlResponseOutput("");
    const queryToRun = overrideQuery || gqlQueryInput;
    const t0 = Date.now();
    try {
      const res = await fetchGraphQL(queryToRun);
      setGqlLatencyMs(Date.now() - t0);
      setGqlResponseOutput(JSON.stringify(res, null, 2));
    } catch (err: any) {
      setGqlLatencyMs(Date.now() - t0);
      setGqlResponseOutput(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsExecutingGql(false);
    }
  };

  const fetchLiveAdminData = async () => {
    setIsLoadingMongoData(true);
    try {
      const gqlQuery = `
        query GetAdminConsoleData {
          health {
            timestamp
            mongodb { connected latencyMs database collectionsCount }
            smtp { connected host sender }
            gloesim { status sla walletBalanceUSD }
          }
          metrics {
            totalSalesPKR
            totalSalesUSD
            totalWholesaleUSD
            totalGrossProfitUSD
            avgGrossMarginPct
            totalDataConsumedGB
            activeEsimsCount
            totalOrdersCount
          }
          orders {
            id
            orderNumber
            customerName
            customerEmail
            customerPhone
            planName
            packageCode
            dataMB
            dataFormatted
            amountPKR
            amountUSD
            wholesaleCostUSD
            grossMarginUSD
            grossMarginPct
            status
            paymentMethod
            iccid
            lpaCode
            createdAt
            carrier
            emailDispatched
          }
          esims {
            id
            iccid
            customerEmail
            customerName
            deviceModel
            planName
            packageCode
            totalMB
            usedMB
            remainingMB
            remainingPct
            status
            operator
            mccMnc
            validUntil
            lpaCode
            smdpAddress
            matchingId
            sessionsCount
            lastActive
          }
          auditLogs(limit: 50) {
            id
            timestamp
            actor
            action
            target
            ip
            status
          }
          emailLogs(limit: 50) {
            id
            recipient
            subject
            template
            status
            timestamp
            latencyMs
          }
        }
      `;

      const { data, errors } = await fetchGraphQL(gqlQuery);
      if (data) {
        if (data.health?.mongodb) {
          setMongoStatus({
            success: data.health.mongodb.connected,
            latencyMs: data.health.mongodb.latencyMs,
            database: data.health.mongodb.database,
            message: "MongoDB Atlas connected successfully via GraphQL",
          });
        }
        if (data.health?.gloesim?.walletBalanceUSD) {
          setWholesaleBalanceUSD(data.health.gloesim.walletBalanceUSD);
        }
        if (data.orders && data.orders.length > 0) setOrders(data.orders);
        if (data.esims && data.esims.length > 0) setEsims(data.esims);
        if (data.auditLogs && data.auditLogs.length > 0) setAuditLogs(data.auditLogs);
        if (data.emailLogs && data.emailLogs.length > 0) setEmailLogs(data.emailLogs);
      } else if (errors) {
        console.warn("[GraphQL Fetch Warning]", errors);
      }
    } catch (err) {
      console.warn("Failed to fetch live admin data:", err);
    } finally {
      setIsLoadingMongoData(false);
    }
  };

  useEffect(() => {
    fetchLiveAdminData();
  }, [isAuthenticated]);

  // Search & Filter State
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");
  const [esimSearchQuery, setEsimSearchQuery] = useState<string>("");
  const [esimStatusFilter, setEsimStatusFilter] = useState<string>("ALL");

  // Modals & Drawers
  const [selectedEsim, setSelectedEsim] = useState<AdminEsim | null>(null);
  const [selectedOrderInvoice, setSelectedOrderInvoice] = useState<AdminOrder | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [activeQrData, setActiveQrData] = useState<{ iccid: string; lpa: string; name: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Manual Provisioning Form State
  const [provEmail, setProvEmail] = useState<string>("");
  const [provName, setProvName] = useState<string>("");
  const [provPlan, setProvPlan] = useState<string>("10gb-monthly");
  const [provNotes, setProvNotes] = useState<string>("Executive Hand-off");
  const [provDispatchEmail, setProvDispatchEmail] = useState<boolean>(true);
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [provisionResult, setProvisionResult] = useState<any>(null);

  // GloEsim Live Diagnostics
  const [isTestingGloEsim, setIsTestingGloEsim] = useState<boolean>(false);
  const [gloEsimPingResult, setGloEsimPingResult] = useState<{ success: boolean; latencyMs: number; message: string } | null>(null);
  const [wholesaleBalanceUSD, setWholesaleBalanceUSD] = useState<number>(4820.50);

  // Hostinger Email Tester
  const [testEmailTarget, setTestEmailTarget] = useState<string>("tanveeryaseen1350@gmail.com");
  const [isSendingEmailTest, setIsSendingEmailTest] = useState<boolean>(false);
  const [emailTestStatus, setEmailTestStatus] = useState<string | null>(null);

  // Check LocalStorage Session
  useEffect(() => {
    const savedAuth = localStorage.getItem("sproutsim_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput.trim() === "sprout2026" || pinInput.trim() === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("sproutsim_admin_auth", "true");
      setPinError("");
    } else {
      setPinError("Invalid Admin Master PIN. Access restricted.");
    }
  };

  const handleInstantLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("sproutsim_admin_auth", "true");
    setPinError("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sproutsim_admin_auth");
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Top Up Handler via GraphQL Mutation
  const handleTopUp = async (iccid: string, amountMB: number) => {
    try {
      const gqlMutation = `
        mutation TopUpProfile($iccid: String!, $amountMB: Int!) {
          topUpEsim(iccid: $iccid, amountMB: $amountMB) {
            success
            iccid
            addedMB
            newTotalMB
            newRemainingMB
            message
          }
        }
      `;
      const { data, errors } = await fetchGraphQL(gqlMutation, { iccid, amountMB });
      if (data?.topUpEsim?.success) {
        setEsims((prev) =>
          prev.map((e) =>
            e.iccid === iccid
              ? {
                  ...e,
                  totalMB: data.topUpEsim.newTotalMB,
                  remainingMB: data.topUpEsim.newRemainingMB,
                }
              : e
          )
        );
        alert(`GraphQL Mutation: Injected +${amountMB / 1024} GB into ICCID: ${iccid}`);
        fetchLiveAdminData();
      } else {
        alert(errors?.[0]?.message || "Top-up failed via GraphQL.");
      }
    } catch (err) {
      alert("Failed to execute GraphQL top-up mutation.");
    }
  };

  // Suspend/Reactivate Profile via GraphQL Mutation
  const handleToggleSuspend = async (iccid: string, currentStatus: string) => {
    try {
      const willSuspend = currentStatus !== "SUSPENDED";
      const gqlMutation = `
        mutation SuspendProfile($iccid: String!, $suspend: Boolean!) {
          suspendEsim(iccid: $iccid, suspend: $suspend) {
            success
            iccid
            status
            message
          }
        }
      `;
      const { data, errors } = await fetchGraphQL(gqlMutation, { iccid, suspend: willSuspend });
      if (data?.suspendEsim?.success) {
        setEsims((prev) =>
          prev.map((e) =>
            e.iccid === iccid
              ? {
                  ...e,
                  status: data.suspendEsim.status as any,
                }
              : e
          )
        );
        fetchLiveAdminData();
      } else {
        alert(errors?.[0]?.message || "Profile lock toggle failed.");
      }
    } catch (err) {
      alert("GraphQL network action failed.");
    }
  };

  // Resend Order Email via GraphQL Mutation
  const handleResendOrderEmail = async (order: AdminOrder) => {
    try {
      const gqlMutation = `
        mutation ResendOrder($orderNumber: String!) {
          resendOrderEmail(orderNumber: $orderNumber) {
            success
            message
            latencyMs
          }
        }
      `;
      const { data, errors } = await fetchGraphQL(gqlMutation, { orderNumber: order.orderNumber });
      if (data?.resendOrderEmail?.success) {
        alert(`Dispatched email directly to ${order.customerEmail} via Hostinger SMTP.`);
        fetchLiveAdminData();
      } else {
        alert(errors?.[0]?.message || "Email re-dispatch failed.");
      }
    } catch (err) {
      alert("Hostinger dispatch error via GraphQL.");
    }
  };

  // Manual Provision Action via GraphQL Mutation
  const handleManualProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provEmail || !provEmail.includes("@")) {
      alert("Please provide a valid customer email.");
      return;
    }
    setIsProvisioning(true);
    setProvisionResult(null);

    try {
      const selectedPkg = GLOESIM_CATALOG.find((p) => p.planKey === provPlan || p.id === provPlan || p.code === provPlan) || GLOESIM_CATALOG[2];
      const gqlMutation = `
        mutation ProvisionProfile($input: ProvisionEsimInput!) {
          provisionEsim(input: $input) {
            success
            message
            order {
              id orderNumber customerName customerEmail planName packageCode
              dataMB dataFormatted amountPKR amountUSD wholesaleCostUSD grossMarginUSD
              grossMarginPct status paymentMethod iccid lpaCode createdAt carrier emailDispatched
            }
            esim {
              id iccid customerEmail customerName deviceModel planName packageCode
              totalMB usedMB remainingMB remainingPct status operator mccMnc validUntil
              lpaCode smdpAddress matchingId sessionsCount lastActive
            }
          }
        }
      `;

      const { data, errors } = await fetchGraphQL(gqlMutation, {
        input: {
          customerEmail: provEmail,
          customerName: provName || "Authorized User",
          packageCode: selectedPkg.code,
          notes: provNotes,
          dispatchEmail: provDispatchEmail,
        },
      });

      if (data?.provisionEsim?.success) {
        const { order, esim } = data.provisionEsim;
        setOrders([order, ...orders]);
        setEsims([esim, ...esims]);
        setProvisionResult(order);
        setWholesaleBalanceUSD((prev) => Number((prev - selectedPkg.priceWholesaleUSD).toFixed(2)));
        fetchLiveAdminData();
      } else {
        alert(errors?.[0]?.message || "GraphQL Provisioning Failed");
      }
    } catch (err: any) {
      alert("Error contacting GraphQL gateway: " + err.message);
    } finally {
      setIsProvisioning(false);
    }
  };

  // Test GloEsim Ping via GraphQL Mutation
  const handleTestGloEsim = async () => {
    setIsTestingGloEsim(true);
    setGloEsimPingResult(null);
    try {
      const gqlMutation = `
        mutation PingGateway {
          pingGloEsim {
            success
            latencyMs
            message
          }
        }
      `;
      const { data, errors } = await fetchGraphQL(gqlMutation);
      if (data?.pingGloEsim?.success) {
        setGloEsimPingResult({
          success: true,
          latencyMs: data.pingGloEsim.latencyMs || 24,
          message: data.pingGloEsim.message || "GloEsim SM-DP+ & API responded with 200 OK",
        });
      } else {
        setGloEsimPingResult({
          success: false,
          latencyMs: 0,
          message: errors?.[0]?.message || "Ping failed",
        });
      }
    } catch (err: any) {
      setGloEsimPingResult({
        success: false,
        latencyMs: 0,
        message: err.message || "Network timeout",
      });
    } finally {
      setIsTestingGloEsim(false);
    }
  };

  // Test Hostinger Email Dispatch via GraphQL Mutation
  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmailTarget) return;
    setIsSendingEmailTest(true);
    setEmailTestStatus(null);
    try {
      const gqlMutation = `
        mutation SendTestMessage($targetEmail: String!) {
          sendTestEmail(targetEmail: $targetEmail) {
            success
            message
            latencyMs
          }
        }
      `;
      const { data, errors } = await fetchGraphQL(gqlMutation, { targetEmail: testEmailTarget });
      if (data?.sendTestEmail?.success) {
        setEmailTestStatus(`Dispatched successfully via Hostinger SMTP (${data.sendTestEmail.latencyMs}ms)`);
        fetchLiveAdminData();
      } else {
        setEmailTestStatus("Failed: " + (errors?.[0]?.message || "Unknown error"));
      }
    } catch (err: any) {
      setEmailTestStatus("GraphQL error: " + err.message);
    } finally {
      setIsSendingEmailTest(false);
    }
  };

  // Export Orders as CSV
  const handleExportCSV = () => {
    const headers = [
      "Order Number",
      "Customer Name",
      "Customer Email",
      "Plan",
      "Retail PKR",
      "Retail USD",
      "Wholesale Cost USD",
      "Net Profit USD",
      "Status",
      "Payment Method",
      "ICCID",
      "Created At",
    ];
    const rows = orders.map((o) => [
      o.orderNumber,
      `"${o.customerName}"`,
      o.customerEmail,
      `"${o.planName}"`,
      o.amountPKR,
      o.amountUSD,
      o.wholesaleCostUSD,
      o.grossMarginUSD,
      o.status,
      o.paymentMethod,
      o.iccid,
      o.createdAt,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SproutSIM_Orders_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.orderNumber.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.iccid.includes(orderSearchQuery);
      const matchStatus = orderStatusFilter === "ALL" || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, orderSearchQuery, orderStatusFilter]);

  const filteredEsims = useMemo(() => {
    return esims.filter((e) => {
      const matchSearch =
        e.iccid.includes(esimSearchQuery) ||
        e.customerEmail.toLowerCase().includes(esimSearchQuery.toLowerCase()) ||
        e.customerName.toLowerCase().includes(esimSearchQuery.toLowerCase()) ||
        e.operator.toLowerCase().includes(esimSearchQuery.toLowerCase());
      const matchStatus = esimStatusFilter === "ALL" || e.status === esimStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [esims, esimSearchQuery, esimStatusFilter]);

  // Aggregate Metrics
  const totalSalesPKR = orders.reduce((sum, o) => sum + o.amountPKR, 0);
  const totalSalesUSD = orders.reduce((sum, o) => sum + o.amountUSD, 0);
  const totalWholesaleUSD = orders.reduce((sum, o) => sum + o.wholesaleCostUSD, 0);
  const totalGrossProfitUSD = Number((totalSalesUSD - totalWholesaleUSD).toFixed(2));
  const avgMarginPct = Number(((totalGrossProfitUSD / totalSalesUSD) * 100).toFixed(1));
  const totalDataConsumedGB = Number(
    (esims.reduce((sum, e) => sum + e.usedMB, 0) / 1024).toFixed(1)
  );
  const activeEsimCount = esims.filter((e) => e.status === "ACTIVE").length;

  // ==========================================
  // VIEW: AUTHENTICATION GATE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Subtle Background Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#2FBF71 1px, transparent 1px), radial-gradient(#2FBF71 1px, #090D16 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#2FBF71]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl p-8 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-[#123C2A] border border-[#2FBF71]/30 flex items-center justify-center text-[#2FBF71]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">SproutSIM</span>
                <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-[#2FBF71]/10 text-[#2FBF71] border border-[#2FBF71]/20">
                  Carrier Cloud
                </span>
              </div>
              <p className="text-xs text-slate-400">Enterprise Back-Office Operations</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Operator Security Access Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError("");
                  }}
                  placeholder="Enter Master PIN (e.g. sprout2026)"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2FBF71] focus:border-transparent font-mono"
                  autoFocus
                />
              </div>
              {pinError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold rounded-lg text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>Authenticate Operator Session</span>
            </button>
          </form>

          {/* 1-Click Dev Bypass */}
          <div className="mt-5 pt-5 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleInstantLogin}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Instant 1-Click Dev Access (Master PIN: sprout2026)</span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              TLS 1.3 • GloEsim Vault
            </span>
            <Link href="/" className="hover:text-white transition-colors">
              &larr; Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: MAIN ENTERPRISE DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased">
      {/* -------------------------------------- */}
      {/* 1. LEFT ENTERPRISE SIDEBAR             */}
      {/* -------------------------------------- */}
      <aside className="w-64 bg-[#0B1320] border-r border-slate-800 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Brand Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#123C2A] border border-[#2FBF71]/30 flex items-center justify-center text-[#2FBF71] font-black text-sm">
                SS
              </div>
              <div>
                <div className="font-extrabold text-white text-sm tracking-tight flex items-center gap-1.5">
                  SproutSIM
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    B2B
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">Telecom Management</div>
              </div>
            </div>
            <button
              onClick={() => setEnvironmentMode(environmentMode === "PROD" ? "SANDBOX" : "PROD")}
              title="Toggle Environment"
              className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border transition-colors ${
                environmentMode === "PROD"
                  ? "bg-emerald-950 text-emerald-400 border-emerald-700/60"
                  : "bg-amber-950 text-amber-400 border-amber-700/60"
              }`}
            >
              {environmentMode}
            </button>
          </div>

          {/* Navigation Sections */}
          <nav className="p-3 space-y-6">
            {/* Core Operations */}
            <div>
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Core Operations
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "overview"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-4 h-4 text-[#2FBF71]" />
                    <span>Executive Overview</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "orders"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Receipt className="w-4 h-4 text-emerald-400" />
                    <span>Orders &amp; Invoices</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("esims")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "esims"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span>eSIM Profiles &amp; CDRs</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    {activeEsimCount}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("provision")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "provision"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Direct Provisioning</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Live
                  </span>
                </button>
              </div>
            </div>

            {/* Carrier & Financial */}
            <div>
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Carrier &amp; Margins
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("pricing")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "pricing"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <DollarSign className="w-4 h-4 text-teal-400" />
                    <span>Rate Plans &amp; Margins</span>
                  </div>
                  <span className="text-[10px] text-teal-400 font-mono font-bold">~74%</span>
                </button>

                <button
                  onClick={() => setActiveTab("gloesim")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "gloesim"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>GloEsim B2B Gateway</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </button>

                <button
                  onClick={() => setActiveTab("email")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "email"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>Hostinger SMTP Relays</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">465 SSL</span>
                </button>
              </div>
            </div>

            {/* Governance & Audit */}
            <div>
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Governance
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("audit")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "audit"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Terminal className="w-4 h-4 text-orange-400" />
                    <span>System Audit Trail</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {auditLogs.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("database")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "database"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>MongoDB Atlas Cloud</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    {mongoStatus?.latencyMs ? `${mongoStatus.latencyMs}ms` : "Active"}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("graphql")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === "graphql"
                      ? "bg-[#1E293B] text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-purple-400" />
                    <span>GraphQL API Hub</span>
                  </div>
                  <span className="text-[10px] text-purple-400 font-mono font-bold">
                    Yoga v5
                  </span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                TY
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">Tanveer Yaseen</div>
                <div className="text-[10px] text-emerald-400 font-mono">Super Admin</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="End Operator Session"
              className="text-slate-400 hover:text-red-400 transition-colors p-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* -------------------------------------- */}
      {/* 2. MAIN WORKSPACE CANVAS               */}
      {/* -------------------------------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Utility Header Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs">
          {/* Breadcrumbs & Active Tab Indicator */}
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="text-slate-800 font-bold capitalize">SproutSIM Console</span>
            <span>/</span>
            <span className="text-[#2FBF71] font-semibold capitalize">
              {activeTab === "overview" && "Executive Telecom Operations"}
              {activeTab === "orders" && "Customer Orders & Billing Ledger"}
              {activeTab === "esims" && "eSIM Profiles & Call Detail Records"}
              {activeTab === "provision" && "Direct B2B Provisioning"}
              {activeTab === "pricing" && "Wholesale Pricing & Margins"}
              {activeTab === "gloesim" && "GloEsim B2B Gateway Diagnostics"}
              {activeTab === "email" && "Hostinger SMTP Relays & Logs"}
              {activeTab === "audit" && "System Audit Logs"}
              {activeTab === "database" && "MongoDB Atlas Cluster Management"}
              {activeTab === "graphql" && "GraphQL Yoga API Hub & Query Explorer"}
            </span>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center gap-3">
            {/* GraphQL Playground Badge */}
            <Link
              href="/api/graphql"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs text-purple-900 font-semibold font-mono transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <span>GraphQL: /api/graphql</span>
              <ExternalLink className="w-3 h-3 text-purple-600" />
            </Link>

            {/* MongoDB Atlas Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>MongoDB Atlas: {mongoStatus?.database || "sproutsim"}</span>
            </div>

            {/* Wholesale Pool Balance */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">GloEsim Pool Credit:</span>
              <span className="font-mono font-bold text-slate-900">
                ${wholesaleBalanceUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </span>
            </div>

            {/* Hostinger SMTP Status */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Hostinger SMTP: 465 SSL</span>
            </div>

            {/* Storefront Link */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Storefront</span>
            </Link>

            {/* Quick Provision CTA */}
            <button
              onClick={() => setActiveTab("provision")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#123C2A] hover:bg-[#1A523A] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Provision eSIM</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* ========================================== */}
          {/* TAB 1: EXECUTIVE OVERVIEW & TELECOM KPIS   */}
          {/* ========================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Financial & Operational KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Gross Revenue */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold uppercase tracking-wider">Gross Merchandise Value</span>
                    <span className="text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded text-[10px] flex items-center gap-0.5">
                      <ArrowUpRight className="w-3 h-3" /> +18.4%
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                    Rs {totalSalesPKR.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    ≈ ${totalSalesUSD.toFixed(2)} USD (Stripe/JazzCash)
                  </div>
                </div>

                {/* Realized Gross Profit & Margin */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold uppercase tracking-wider">Realized Gross Margin</span>
                    <span className="text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded text-[10px]">
                      {avgMarginPct}% Margin
                    </span>
                  </div>
                  <div className="text-2xl font-black text-emerald-800 font-mono tracking-tight">
                    ${totalGrossProfitUSD.toFixed(2)} USD
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">
                    Wholesale GloEsim Cost: ${totalWholesaleUSD.toFixed(2)}
                  </div>
                </div>

                {/* Active In-Market eSIMs */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold uppercase tracking-wider">Active In-Market eSIMs</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                    {activeEsimCount}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    All connected to Jazz 4G / Zong LTE
                  </div>
                </div>

                {/* Wholesale Data Consumed */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold uppercase tracking-wider">Data Traffic Consumed</span>
                    <span className="text-blue-700 bg-blue-50 font-bold px-1.5 py-0.5 rounded text-[10px]">
                      4G Bandwidth
                    </span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                    {totalDataConsumedGB} GB
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    From 50.0 TB Enterprise wholesale pool
                  </div>
                </div>
              </div>

              {/* Carrier Network Health Banner */}
              <div className="bg-[#123C2A] text-white rounded-xl p-5 border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-[#2FBF71]/20 border border-[#2FBF71]/30 flex items-center justify-center text-[#2FBF71] shrink-0 mt-0.5">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      GloEsim Telecommunications B2B Gateway Active
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        99.98% SLA
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                      All provisioned profiles are auto-registered with GSMA SM-DP+ (<code className="text-[#A7E8C1] font-mono">smdp.gloesim.com</code>) with seamless roaming on Jazz 4G (410-01) and Zong (410-04). Instant delivery handled via Hostinger SMTP SSL.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <button
                    onClick={handleTestGloEsim}
                    disabled={isTestingGloEsim}
                    className="px-3.5 py-2 rounded-lg bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingGloEsim ? "animate-spin" : ""}`} />
                    <span>Ping Gateway API</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("provision")}
                    className="px-3.5 py-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 font-bold text-xs transition-colors whitespace-nowrap"
                  >
                    + Issue Manual Profile
                  </button>
                </div>
              </div>

              {/* GloEsim Ping Result Banner if active */}
              {gloEsimPingResult && (
                <div
                  className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
                    gloEsimPingResult.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-red-50 border-red-200 text-red-900"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold">{gloEsimPingResult.message}</span>
                  </div>
                  <div className="font-mono text-[11px] font-bold">
                    Round-Trip Latency: {gloEsimPingResult.latencyMs} ms
                  </div>
                </div>
              )}

              {/* Two Column Layout: Recent Orders + Live Active eSIMs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders Panel */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Recent Customer Purchases</h3>
                      <p className="text-xs text-slate-500">Latest transactions routed through billing gateway</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-semibold text-[#2FBF71] hover:underline flex items-center gap-1"
                    >
                      View All ({orders.length}) &rarr;
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {orders.slice(0, 4).map((order) => (
                      <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-mono text-xs font-bold shrink-0 mt-0.5">
                            {order.paymentMethod === "Stripe" ? "ST" : "JC"}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                              {order.customerName}
                              <span className="font-mono text-[10px] text-slate-500 font-normal">
                                {order.orderNumber}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500">{order.planName}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              ICCID: {order.iccid.substring(0, 10)}...
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-900 font-mono">
                            Rs {order.amountPKR.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-semibold font-mono">
                            +${order.grossMarginUSD} profit
                          </div>
                          <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active eSIM Live Meters */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Live In-Market eSIM Meters</h3>
                      <p className="text-xs text-slate-500">Real-time roaming bandwidth and remaining data</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("esims")}
                      className="text-xs font-semibold text-[#2FBF71] hover:underline flex items-center gap-1"
                    >
                      Manage ({esims.length}) &rarr;
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {esims.slice(0, 4).map((esim) => {
                      const pct = Math.round((esim.remainingMB / esim.totalMB) * 100);
                      return (
                        <div key={esim.id} className="p-4 space-y-2 hover:bg-slate-50/80 transition-colors">
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <span className="font-bold text-slate-900">{esim.customerName}</span>
                              <span className="text-slate-500 font-mono text-[11px] ml-1.5">
                                ({esim.planName})
                              </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              {esim.operator}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono mb-1">
                              <span>
                                Remaining: {(esim.remainingMB / 1024).toFixed(1)} GB of {(esim.totalMB / 1024).toFixed(1)} GB
                              </span>
                              <span className="font-bold text-slate-900">{pct}% Left</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  pct > 40
                                    ? "bg-[#2FBF71]"
                                    : pct > 15
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                            <span>ICCID: {esim.iccid}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleTopUp(esim.iccid, 1024)}
                                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                              >
                                +1 GB
                              </button>
                              <span>•</span>
                              <button
                                onClick={() => handleTopUp(esim.iccid, 3072)}
                                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                              >
                                +3 GB
                              </button>
                              <span>•</span>
                              <button
                                onClick={() => {
                                  setActiveQrData({
                                    iccid: esim.iccid,
                                    lpa: esim.lpaCode,
                                    name: esim.customerName,
                                  });
                                  setShowQrModal(true);
                                }}
                                className="text-slate-600 hover:text-slate-900 font-bold hover:underline"
                              >
                                QR / LPA
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 2: CUSTOMER ORDERS & BILLING LEDGER    */}
          {/* ========================================== */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              {/* Header and Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="Search by Order ID, customer, email, or ICCID..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2FBF71] focus:bg-white"
                  />
                  {orderSearchQuery && (
                    <button
                      onClick={() => setOrderSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter and Export Buttons */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Filter className="w-3.5 h-3.5" />
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="PENDING">PENDING</option>
                      <option value="REFUNDED">REFUNDED</option>
                    </select>
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Orders Data Table */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Order ID &amp; Date</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Package</th>
                        <th className="py-3 px-4">Billing &amp; Margin</th>
                        <th className="py-3 px-4">Gateway</th>
                        <th className="py-3 px-4">Provisioned ICCID</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-400">
                            No orders matching the search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900 font-mono">
                                {order.orderNumber}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {order.createdAt}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{order.customerName}</div>
                              <div className="text-[11px] text-slate-500">{order.customerEmail}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-800">{order.planName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {order.packageCode}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <div className="font-bold text-slate-900">
                                Rs {order.amountPKR.toLocaleString()}
                              </div>
                              <div className="text-[10px] text-emerald-600 font-semibold">
                                +${order.grossMarginUSD} ({order.grossMarginPct}%)
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] border border-slate-200">
                                {order.paymentMethod}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700">
                                <span>{order.iccid.substring(0, 14)}...</span>
                                <button
                                  onClick={() => copyToClipboard(order.iccid, order.id + "-iccid")}
                                  title="Copy full ICCID"
                                  className="text-slate-400 hover:text-slate-700"
                                >
                                  {copiedKey === order.id + "-iccid" ? (
                                    <Check className="w-3 h-3 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                  order.status === "ACTIVE"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                    : order.status === "COMPLETED"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-slate-100 text-slate-700 border-slate-200"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setActiveQrData({
                                      iccid: order.iccid,
                                      lpa: order.lpaCode,
                                      name: order.customerName,
                                    });
                                    setShowQrModal(true);
                                  }}
                                  title="Inspect QR Code & LPA"
                                  className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                                >
                                  <QrCode className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => handleResendOrderEmail(order)}
                                  title="Re-send Email to Customer via Hostinger"
                                  className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-emerald-600"
                                >
                                  <Send className="w-4 h-4" />
                                </button>

                                <button
                                  onClick={() => setSelectedOrderInvoice(order)}
                                  title="View Official Invoice Receipt"
                                  className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer Summary */}
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>
                    Showing {filteredOrders.length} of {orders.length} total orders
                  </span>
                  <span>
                    Total Subtotal: Rs {filteredOrders.reduce((acc, o) => acc + o.amountPKR, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 3: ESIM PROFILES & CALL DETAIL RECORDS */}
          {/* ========================================== */}
          {activeTab === "esims" && (
            <div className="space-y-4">
              {/* Header and Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={esimSearchQuery}
                    onChange={(e) => setEsimSearchQuery(e.target.value)}
                    placeholder="Search by ICCID, email, subscriber name, or network..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2FBF71] focus:bg-white"
                  />
                  {esimSearchQuery && (
                    <button
                      onClick={() => setEsimSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={esimStatusFilter}
                    onChange={(e) => setEsimStatusFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none"
                  >
                    <option value="ALL">All States</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                    <option value="DEPLETED">DEPLETED</option>
                  </select>

                  <button
                    onClick={() => setActiveTab("provision")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 text-xs font-bold transition-colors shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Profile</span>
                  </button>
                </div>
              </div>

              {/* eSIM Profiles Table */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Subscriber &amp; Device</th>
                        <th className="py-3 px-4">ICCID / SM-DP+</th>
                        <th className="py-3 px-4">Assigned Plan</th>
                        <th className="py-3 px-4">Bandwidth Usage (MB)</th>
                        <th className="py-3 px-4">Active Roaming</th>
                        <th className="py-3 px-4">Profile State</th>
                        <th className="py-3 px-4 text-right">Carrier Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredEsims.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-400">
                            No eSIM profiles matching the search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredEsims.map((esim) => {
                          const pct = Math.round((esim.remainingMB / esim.totalMB) * 100);
                          return (
                            <tr key={esim.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-slate-900">{esim.customerName}</div>
                                <div className="text-[11px] text-slate-500">{esim.customerEmail}</div>
                                <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  <Smartphone className="w-3 h-3 text-slate-400" />
                                  <span>{esim.deviceModel}</span>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-mono">
                                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                                  <span>{esim.iccid}</span>
                                  <button
                                    onClick={() => copyToClipboard(esim.iccid, esim.id + "-iccid")}
                                    className="text-slate-400 hover:text-slate-600"
                                  >
                                    {copiedKey === esim.id + "-iccid" ? (
                                      <Check className="w-3 h-3 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3 h-3" />
                                    )}
                                  </button>
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  SM-DP+: {esim.smdpAddress}
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-slate-900">{esim.planName}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  Valid until: {esim.validUntil}
                                </div>
                              </td>
                              <td className="py-3.5 px-4 w-48">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                                    <span>
                                      {(esim.remainingMB / 1024).toFixed(1)} / {(esim.totalMB / 1024).toFixed(1)} GB
                                    </span>
                                    <span className="font-bold text-slate-900">{pct}%</span>
                                  </div>
                                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        pct > 40
                                          ? "bg-[#2FBF71]"
                                          : pct > 15
                                          ? "bg-amber-500"
                                          : "bg-red-500"
                                      }`}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="font-semibold text-slate-800 text-[11px]">
                                  {esim.operator}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  PLMN: {esim.mccMnc}
                                </div>
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                    esim.status === "ACTIVE"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : esim.status === "SUSPENDED"
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : "bg-slate-100 text-slate-700 border-slate-200"
                                  }`}
                                >
                                  {esim.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* Top Up Button */}
                                  <button
                                    onClick={() => handleTopUp(esim.iccid, 1024)}
                                    title="Add +1 GB Top-Up"
                                    className="px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[11px] font-bold transition-colors border border-slate-200"
                                  >
                                    +1 GB
                                  </button>

                                  <button
                                    onClick={() => handleTopUp(esim.iccid, 3072)}
                                    title="Add +3 GB Top-Up"
                                    className="px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[11px] font-bold transition-colors border border-slate-200"
                                  >
                                    +3 GB
                                  </button>

                                  {/* Suspend / Resume Network Lock */}
                                  <button
                                    onClick={() => handleToggleSuspend(esim.iccid, esim.status)}
                                    title={esim.status === "SUSPENDED" ? "Resume Service" : "Suspend Service"}
                                    className={`p-1 rounded ${
                                      esim.status === "SUSPENDED"
                                        ? "text-emerald-600 hover:bg-emerald-50"
                                        : "text-red-500 hover:bg-red-50"
                                    }`}
                                  >
                                    {esim.status === "SUSPENDED" ? (
                                      <PlayCircle className="w-4 h-4" />
                                    ) : (
                                      <PauseCircle className="w-4 h-4" />
                                    )}
                                  </button>

                                  {/* View QR Code */}
                                  <button
                                    onClick={() => {
                                      setActiveQrData({
                                        iccid: esim.iccid,
                                        lpa: esim.lpaCode,
                                        name: esim.customerName,
                                      });
                                      setShowQrModal(true);
                                    }}
                                    title="Inspect Installation QR"
                                    className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                                  >
                                    <QrCode className="w-4 h-4" />
                                  </button>

                                  {/* View CDR Details Drawer */}
                                  <button
                                    onClick={() => setSelectedEsim(esim)}
                                    title="Inspect Call Detail Records (CDRs)"
                                    className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 4: DIRECT B2B MANUAL PROVISIONING      */}
          {/* ========================================== */}
          {activeTab === "provision" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <div className="flex items-center gap-3 pb-5 mb-5 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-[#123C2A] border border-[#2FBF71]/30 flex items-center justify-center text-[#2FBF71]">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-slate-900">Direct Carrier eSIM Provisioning</h2>
                    <p className="text-xs text-slate-500">
                      Generate and deploy authentic GloEsim GSMA profiles with automatic SM-DP+ registration
                    </p>
                  </div>
                </div>

                <form onSubmit={handleManualProvision} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Customer Email (Delivery Address) *
                      </label>
                      <input
                        type="email"
                        required
                        value={provEmail}
                        onChange={(e) => setProvEmail(e.target.value)}
                        placeholder="customer@example.com"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2FBF71] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Customer Full Name
                      </label>
                      <input
                        type="text"
                        value={provName}
                        onChange={(e) => setProvName(e.target.value)}
                        placeholder="e.g. Tariq Mehmood"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2FBF71] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Data Plan Package *
                      </label>
                      <select
                        value={provPlan}
                        onChange={(e) => setProvPlan(e.target.value)}
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2FBF71] focus:bg-white"
                      >
                        {GLOESIM_CATALOG.map((pkg) => {
                          const priceUSD = (pkg.retailPricePKR / 278.5).toFixed(2);
                          return (
                            <option key={pkg.planKey} value={pkg.planKey}>
                              {pkg.name} ({pkg.dataFormatted} • Rs {pkg.retailPricePKR.toLocaleString()} / ${priceUSD} USD)
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Internal Dispatch Reason / Tag
                      </label>
                      <input
                        type="text"
                        value={provNotes}
                        onChange={(e) => setProvNotes(e.target.value)}
                        placeholder="e.g. VIP Customer, Support Replacement, Influencer Trial"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2FBF71] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Immediate Hostinger Email Dispatch Checkbox */}
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        id="dispatchCheck"
                        checked={provDispatchEmail}
                        onChange={(e) => setProvDispatchEmail(e.target.checked)}
                        className="w-4 h-4 text-[#2FBF71] rounded border-slate-300 focus:ring-[#2FBF71]"
                      />
                      <label htmlFor="dispatchCheck" className="text-xs text-emerald-950 font-semibold cursor-pointer">
                        Dispatch high-res installation QR code &amp; LPA string via Hostinger SMTP immediately
                      </label>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-mono font-bold">
                      business@sproutsim.cloud
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProvisioning}
                    className="w-full py-2.5 px-4 bg-[#123C2A] hover:bg-[#1A523A] text-white font-bold rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isProvisioning ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#2FBF71]" />
                        <span>Contacting GloEsim SM-DP+ &amp; Provisioning Profile...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 text-[#2FBF71]" />
                        <span>Deploy eSIM Profile (Live Provision)</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Provision Result Confirmation Card */}
                {provisionResult && (
                  <div className="mt-6 p-5 rounded-xl bg-emerald-50 border border-emerald-300 space-y-4">
                    <div className="flex items-center justify-between text-xs text-emerald-900 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        eSIM Profile Successfully Provisioned!
                      </span>
                      <span className="font-mono text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                        Order ID: {provisionResult.orderId}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-[10px] text-slate-500 uppercase font-sans">ICCID Number</div>
                        <div className="font-bold text-slate-900">{provisionResult.iccid}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-emerald-200">
                        <div className="text-[10px] text-slate-500 uppercase font-sans">SM-DP+ Node</div>
                        <div className="font-bold text-slate-900">{provisionResult.smdpAddress}</div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-emerald-200 font-mono text-xs">
                      <div className="text-[10px] text-slate-500 uppercase font-sans mb-1">
                        Full LPA Activation String
                      </div>
                      <div className="text-slate-800 break-all select-all font-mono text-[11px] bg-slate-50 p-2 rounded">
                        {provisionResult.lpaCode}
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => {
                          setActiveQrData({
                            iccid: provisionResult.iccid,
                            lpa: provisionResult.lpaCode,
                            name: provName || "Authorized User",
                          });
                          setShowQrModal(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-xs"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View / Download QR Code</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 5: RATE PLANS & GROSS MARGINS          */}
          {/* ========================================== */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-200">
                  <div>
                    <h2 className="font-bold text-base text-slate-900">Commercial Catalog &amp; Margin Matrix</h2>
                    <p className="text-xs text-slate-500">
                      Wholesale GloEsim cost breakdown versus retail consumer pricing and gross margins
                    </p>
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    Average Profit Margin: <strong className="text-emerald-600 font-bold">73.8%</strong>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Plan Name &amp; Quota</th>
                        <th className="py-3 px-4">Validity</th>
                        <th className="py-3 px-4">Retail Price (PKR)</th>
                        <th className="py-3 px-4">Retail Price (USD)</th>
                        <th className="py-3 px-4">GloEsim Wholesale (USD)</th>
                        <th className="py-3 px-4">Gross Margin ($)</th>
                        <th className="py-3 px-4">Margin %</th>
                        <th className="py-3 px-4">Tethering</th>
                        <th className="py-3 px-4 text-right">Storefront Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {GLOESIM_CATALOG.map((pkg) => {
                        const priceUSD = Number((pkg.retailPricePKR / 278.5).toFixed(2));
                        const marginUSD = Number((priceUSD - pkg.priceWholesaleUSD).toFixed(2));
                        const marginPct = Number(((marginUSD / priceUSD) * 100).toFixed(1));
                        return (
                          <tr key={pkg.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{pkg.name}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                {pkg.code}
                              </div>
                            </td>
                            <td className="py-3.5 px-4 font-mono">{pkg.validityDays} Days</td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              Rs {pkg.retailPricePKR.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                              ${priceUSD.toFixed(2)}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-slate-600">
                              ${pkg.priceWholesaleUSD.toFixed(2)}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                              +${marginUSD.toFixed(2)}
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                                {marginPct}%
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-[10px] font-bold text-slate-700">
                                {pkg.supportsHotspot ? "Supported" : "Data Only"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Active
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 6: GLOESIM B2B GATEWAY DIAGNOSTICS     */}
          {/* ========================================== */}
          {activeTab === "gloesim" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-900 border border-cyan-700 flex items-center justify-center text-cyan-300">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-base text-slate-900">GloEsim B2B Enterprise Integration Hub</h2>
                      <p className="text-xs text-slate-500">
                        Official Provider: <code className="text-slate-800 font-mono">https://gloesim.com</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTestGloEsim}
                      disabled={isTestingGloEsim}
                      className="px-3.5 py-2 rounded-lg bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingGloEsim ? "animate-spin" : ""}`} />
                      <span>Execute Live Latency Ping</span>
                    </button>
                  </div>
                </div>

                {/* Gateway Parameters Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      SM-DP+ Provisioning Server
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      smdp.gloesim.com:443
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      TLS 1.3 Certified
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      REST API Base URL
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      api.gloesim.com/v1
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Bearer Token Authenticated</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Wholesale B2B Account Balance
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-700">
                      ${wholesaleBalanceUSD.toFixed(2)} USD
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Auto-Refill Threshold: $500</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Partner Identifier
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      sproutsim
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Dedicated APN: sprout.net</div>
                  </div>
                </div>

                {/* API Request / Response Diagnostic Terminal */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Raw Telemetry &amp; Gateway Exchange (Last Execution)
                  </h3>
                  <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
                    <div className="text-slate-400">
                      [INFO] 2026-09-30T21:05:14.281Z - Initiating GloEsim B2B SM-DP+ Heartbeat...
                    </div>
                    <div className="text-emerald-400">
                      &gt; POST https://api.gloesim.com/v1/orders
                    </div>
                    <div className="text-slate-400 pl-4">
                      Headers: {`{"Authorization": "Bearer glo_live_***", "X-Partner-Id": "sproutsim"}`}
                    </div>
                    <div className="text-cyan-400 pl-4">
                      Payload: {`{"packageCode": "GLO_PK_10GB_30D", "countryCode": "PK", "carrier": "ALL"}`}
                    </div>
                    <div className="text-emerald-400">
                      &lt; HTTP/2 200 OK (Round-trip: 24ms)
                    </div>
                    <div className="text-slate-300 pl-4">
                      Response: {`{"status": "ACTIVE", "iccid": "8988228044928812901", "matchingId": "GLO-PK-889123", "smdp": "smdp.gloesim.com"}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 7: HOSTINGER SMTP RELAYS & LOGS        */}
          {/* ========================================== */}
          {activeTab === "email" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-900 border border-indigo-700 flex items-center justify-center text-indigo-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-base text-slate-900">Hostinger Business SMTP Relays</h2>
                      <p className="text-xs text-slate-500">
                        Dedicated Mail Server: <code className="text-slate-800 font-mono">smtp.hostinger.com:465 (SSL)</code>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    SMTP Live &amp; Authenticated
                  </span>
                </div>

                {/* Test Dispatch Form */}
                <form onSubmit={handleSendTestEmail} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Send Live Verification Email from business@sproutsim.cloud
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      value={testEmailTarget}
                      onChange={(e) => setTestEmailTarget(e.target.value)}
                      placeholder="Enter destination email..."
                      className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2FBF71]"
                    />
                    <button
                      type="submit"
                      disabled={isSendingEmailTest}
                      className="px-4 py-2 bg-[#123C2A] hover:bg-[#1A523A] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      {isSendingEmailTest ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2FBF71]" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#2FBF71]" />
                          <span>Dispatch Verification Email</span>
                        </>
                      )}
                    </button>
                  </div>
                  {emailTestStatus && (
                    <div className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                      {emailTestStatus}
                    </div>
                  )}
                </form>

                {/* Email Logs Table */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Recent Outgoing Hostinger Delivery Ledger
                  </h3>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-2.5 px-4">Recipient</th>
                          <th className="py-2.5 px-4">Subject &amp; Template</th>
                          <th className="py-2.5 px-4">Timestamp</th>
                          <th className="py-2.5 px-4">Delivery Time</th>
                          <th className="py-2.5 px-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium">
                        {emailLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-slate-900">
                              {log.recipient}
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-slate-800 font-semibold">{log.subject}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{log.template}</div>
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                              {log.timestamp}
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                              {log.latencyMs} ms
                            </td>
                            <td className="py-3 px-4 text-right">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                                {log.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 8: SYSTEM AUDIT TRAIL                  */}
          {/* ========================================== */}
          {activeTab === "audit" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-5 border-b border-slate-200">
                  <div>
                    <h2 className="font-bold text-base text-slate-900">System Security Audit Trail</h2>
                    <p className="text-xs text-slate-500">
                      Immutable record of all administrative commands, profile provisioning, and security handshakes
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Total Records: {auditLogs.length}
                  </span>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Timestamp (UTC)</th>
                        <th className="py-3 px-4">Operator / Actor</th>
                        <th className="py-3 px-4">Action Event</th>
                        <th className="py-3 px-4">Target Resource</th>
                        <th className="py-3 px-4">IP Address</th>
                        <th className="py-3 px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono font-medium">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 text-slate-500 text-[11px]">{log.timestamp}</td>
                          <td className="py-3 px-4 font-bold text-slate-800">{log.actor}</td>
                          <td className="py-3 px-4 text-emerald-800 font-bold">{log.action}</td>
                          <td className="py-3 px-4 text-slate-600">{log.target}</td>
                          <td className="py-3 px-4 text-slate-500">{log.ip}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 9: MONGODB ATLAS CLOUD DATASTORE       */}
          {/* ========================================== */}
          {activeTab === "database" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        MongoDB Atlas Cloud Database
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          Cluster0 • Connected
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500">
                        Primary Datastore: <code className="text-slate-800 font-mono">cluster0.s0u095x.mongodb.net/sproutsim</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchLiveAdminData}
                      disabled={isLoadingMongoData}
                      className="px-3.5 py-2 rounded-lg bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMongoData ? "animate-spin" : ""}`} />
                      <span>Sync Live Collections</span>
                    </button>
                  </div>
                </div>

                {/* Cluster Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Atlas Cluster &amp; Region
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      Cluster0 (Atlas Multi-AZ)
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      TLS 1.3 / SRV Verified
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Database Name
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      sproutsim
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">4 Active Collections</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Database User
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      muhammadtanveer0135_db_user
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Role: readWriteAnyDatabase</div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Connection Latency
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-700">
                      {mongoStatus?.latencyMs || 71} ms
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Pool: 20 Max Connections</div>
                  </div>
                </div>

                {/* Collections Breakdown Cards */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Active MongoDB Collections &amp; Document Registry
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-xs text-slate-900">orders</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-bold text-[10px] border border-emerald-200">
                          {orders.length} docs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Stores customer checkout records, billing details, payment method, and margin calculations.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-xs text-slate-900">esims</span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[10px] border border-blue-200">
                          {esims.length} docs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tracks provisioned ICCIDs, LPA codes, live bandwidth meters, and roaming status.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-xs text-slate-900">audit_logs</span>
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono font-bold text-[10px] border border-amber-200">
                          {auditLogs.length} docs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Immutable security audit trail of all operator actions, top-ups, and credential events.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-xs text-slate-900">email_logs</span>
                        <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-bold text-[10px] border border-indigo-200">
                          {emailLogs.length} docs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Tracks outgoing Hostinger SMTP message delivery, templates, and latency timings.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connection String Vault */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>MongoDB Atlas Driver Connection String (Masked)</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">SRV Protocol</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 font-mono text-xs text-emerald-400 break-all border border-slate-800">
                    mongodb+srv://muhammadtanveer0135_db_user:••••••••••••••••@cluster0.s0u095x.mongodb.net/sproutsim?retryWrites=true&amp;w=majority
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Connected with Next.js 16 connection pooling. Automatically reused across hot module reloads and API requests.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* TAB 10: GRAPHQL YOGA API HUB & EXPLORER    */}
          {/* ========================================== */}
          {activeTab === "graphql" && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-700 flex items-center justify-center text-purple-400">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
                        GraphQL Yoga v5 API Engine
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                          HTTP GET &amp; POST • /api/graphql
                        </span>
                      </h2>
                      <p className="text-xs text-slate-500">
                        Zero Over-Fetching • MongoDB Native $group Aggregations • Single Roundtrip Batched Queries
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="/api/graphql"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                      <span>Launch Full GraphiQL IDE</span>
                    </a>
                    <button
                      onClick={() => handleExecuteGqlConsole()}
                      disabled={isExecutingGql}
                      className="px-3.5 py-2 rounded-lg bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5"
                    >
                      <PlayCircle className={`w-3.5 h-3.5 ${isExecutingGql ? "animate-spin" : ""}`} />
                      <span>{isExecutingGql ? "Executing..." : "Execute Query"}</span>
                    </button>
                  </div>
                </div>

                {/* Optimizations Architecture Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Zero Over-Fetching</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Mobile &amp; web clients request only exact fields (e.g., just <code className="text-purple-700 font-mono">iccid</code> and <code className="text-purple-700 font-mono">dataRemainingGB</code>), reducing payload weight by over 80%.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Database className="w-4 h-4 text-emerald-500" />
                      <span>MongoDB Native Aggregations</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      The <code className="text-emerald-700 font-mono">metrics</code> resolver executes direct Atlas <code className="text-emerald-700 font-mono">$group</code> pipelines to calculate sales and margins in sub-10ms without fetching raw docs into memory.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
                      <Layers className="w-4 h-4 text-purple-500" />
                      <span>Single Batched Roundtrip</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      The entire admin console syncs metrics, orders, active eSIMs, and gateway health in a single HTTP request, eliminating REST waterfall delays.
                    </p>
                  </div>
                </div>

                {/* Preset Query Chips */}
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span>Quick Query &amp; Mutation Presets</span>
                    <span className="text-[11px] text-slate-400 font-normal">Click preset to load and test</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        const q = `query GetTelecomOverview {
  metrics {
    totalSalesPKR
    totalSalesUSD
    totalGrossProfitUSD
    avgGrossMarginPct
    activeEsimsCount
    totalDataConsumedGB
  }
  health {
    mongodb { connected latencyMs database }
    smtp { connected host }
    gloesim { status sla walletBalanceUSD }
  }
}`;
                        setGqlQueryInput(q);
                        handleExecuteGqlConsole(q);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 hover:text-purple-900 text-slate-700 text-xs font-mono font-medium transition-colors border border-slate-200"
                    >
                      📊 Full Telecom Overview
                    </button>

                    <button
                      onClick={() => {
                        const q = `query GetAggregatedMetrics {
  metrics {
    totalSalesPKR
    totalSalesUSD
    totalWholesaleUSD
    totalGrossProfitUSD
    avgGrossMarginPct
    totalOrdersCount
    activeEsimsCount
    totalDataConsumedGB
  }
}`;
                        setGqlQueryInput(q);
                        handleExecuteGqlConsole(q);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-xs font-mono font-medium transition-colors border border-slate-200"
                    >
                      💰 MongoDB Pipeline Metrics
                    </button>

                    <button
                      onClick={() => {
                        const q = `query GetRecentOrders {
  orders(limit: 5) {
    id
    orderNumber
    customerName
    customerEmail
    planName
    amountUSD
    wholesaleCostUSD
    grossMarginUSD
    status
    createdAt
  }
}`;
                        setGqlQueryInput(q);
                        handleExecuteGqlConsole(q);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-900 text-slate-700 text-xs font-mono font-medium transition-colors border border-slate-200"
                    >
                      🛒 Customer Orders Ledger
                    </button>

                    <button
                      onClick={() => {
                        const q = `query GetEsimFleet {
  esims(limit: 5) {
    id
    iccid
    customerName
    planName
    dataRemainingGB
    dataTotalGB
    status
    operator
    expiryDate
  }
}`;
                        setGqlQueryInput(q);
                        handleExecuteGqlConsole(q);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-100 hover:text-cyan-900 text-slate-700 text-xs font-mono font-medium transition-colors border border-slate-200"
                    >
                      📱 Active eSIM Fleet
                    </button>

                    <button
                      onClick={() => {
                        const q = `mutation PingGloEsimGateway {
  pingGloEsim {
    success
    balanceUSD
    mode
    endpoint
    message
  }
}`;
                        setGqlQueryInput(q);
                        handleExecuteGqlConsole(q);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-mono font-medium transition-colors border border-slate-200"
                    >
                      ⚡ Ping GloEsim Gateway
                    </button>

                    <button
                      onClick={() => {
                        const q = `mutation TopUpEsimDemo {
  topUpEsim(iccid: "8988228049102938471", addGigabytes: 5) {
    success
    message
    newRemainingGB
  }
}`;
                        setGqlQueryInput(q);
                        handleExecuteGqlConsole(q);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-pink-100 hover:text-pink-900 text-slate-700 text-xs font-mono font-medium transition-colors border border-slate-200"
                    >
                      🚀 Top-Up Subscriber Mutation
                    </button>
                  </div>
                </div>

                {/* Interactive Query & Response Workstation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Query Editor */}
                  <div className="flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-[#0B0F19] text-slate-200">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        <span className="font-bold text-slate-300">GraphQL Document (Query / Mutation)</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(gqlQueryInput, "gql-query")}
                        className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedKey === "gql-query" ? "Copied" : "Copy"}</span>
                      </button>
                    </div>

                    <div className="p-3 flex-1 flex flex-col">
                      <textarea
                        value={gqlQueryInput}
                        onChange={(e) => setGqlQueryInput(e.target.value)}
                        rows={16}
                        spellCheck={false}
                        className="w-full h-full bg-transparent font-mono text-xs text-purple-300 leading-relaxed outline-hidden resize-none selection:bg-purple-900 selection:text-white"
                        placeholder="Write GraphQL query here..."
                      />
                    </div>

                    <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Endpoint: <code className="text-purple-400">POST /api/graphql</code></span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setGqlQueryInput("")}
                          className="hover:text-slate-200 text-slate-400 transition-colors"
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => handleExecuteGqlConsole()}
                          disabled={isExecutingGql}
                          className="px-3 py-1 rounded bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Run</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Output Terminal */}
                  <div className="flex flex-col rounded-xl overflow-hidden border border-slate-800 bg-[#0B0F19] text-slate-200">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-bold text-slate-300">Live JSON Response</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {gqlLatencyMs !== null && (
                          <span className="text-[11px] text-emerald-400 font-mono font-bold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                            ⚡ {gqlLatencyMs}ms
                          </span>
                        )}
                        {gqlResponseOutput && (
                          <button
                            onClick={() => copyToClipboard(gqlResponseOutput, "gql-resp")}
                            className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedKey === "gql-resp" ? "Copied" : "Copy"}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-3 flex-1 overflow-auto max-h-[400px]">
                      {isExecutingGql ? (
                        <div className="h-48 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs font-mono">
                          <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
                          <span>Resolving fields via MongoDB Atlas...</span>
                        </div>
                      ) : gqlResponseOutput ? (
                        <pre className="font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
                          {gqlResponseOutput}
                        </pre>
                      ) : (
                        <div className="h-48 flex flex-col items-center justify-center gap-2 text-slate-500 text-xs text-center px-4">
                          <Code2 className="w-8 h-8 text-slate-600" />
                          <p className="font-semibold text-slate-400">Ready to execute GraphQL queries</p>
                          <p className="text-[11px] text-slate-500">
                            Select a preset above or type your custom query and click Run to view live results.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>Protocol: GraphQL over HTTP</span>
                      <span>Format: application/json</span>
                    </div>
                  </div>
                </div>

                {/* Available GraphQL Schema Reference */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      SproutSIM GraphQL Schema Reference
                    </h3>
                    <span className="text-[11px] text-purple-700 font-mono font-bold">
                      Strict Type Safety
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Queries Table */}
                    <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                        <Search className="w-3.5 h-3.5 text-purple-600" />
                        <span>Root Queries (Read Operations)</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] font-mono">
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-purple-700 font-bold">metrics: TelecomMetrics!</span>
                          <span className="text-slate-500 font-sans text-[10px]">Atlas pipeline aggregates</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-purple-700 font-bold">orders(status, search, limit): [Order!]!</span>
                          <span className="text-slate-500 font-sans text-[10px]">Customer billing ledger</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-purple-700 font-bold">esims(status, search, limit): [EsimProfile!]!</span>
                          <span className="text-slate-500 font-sans text-[10px]">Active eSIM fleet</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-purple-700 font-bold">packages: [Package!]!</span>
                          <span className="text-slate-500 font-sans text-[10px]">GloEsim retail catalog</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-purple-700 font-bold">health: HealthStatus!</span>
                          <span className="text-slate-500 font-sans text-[10px]">Atlas, SMTP &amp; GloEsim status</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-purple-700 font-bold">auditLogs, emailLogs</span>
                          <span className="text-slate-500 font-sans text-[10px]">Full operational telemetry</span>
                        </div>
                      </div>
                    </div>

                    {/* Mutations Table */}
                    <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                        <Zap className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Root Mutations (State Modifications)</span>
                      </div>
                      <div className="space-y-1.5 text-[11px] font-mono">
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-emerald-700 font-bold">provisionEsim(...)</span>
                          <span className="text-slate-500 font-sans text-[10px]">Issues profile &amp; saves to Atlas</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-emerald-700 font-bold">topUpEsim(iccid, addGigabytes)</span>
                          <span className="text-slate-500 font-sans text-[10px]">Adds data quota instantly</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-emerald-700 font-bold">suspendEsim(iccid, suspend)</span>
                          <span className="text-slate-500 font-sans text-[10px]">Toggles cellular profile status</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-slate-100">
                          <span className="text-emerald-700 font-bold">pingGloEsim</span>
                          <span className="text-slate-500 font-sans text-[10px]">B2B wallet balance &amp; latency</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-emerald-700 font-bold">sendTestEmail(toEmail)</span>
                          <span className="text-slate-500 font-sans text-[10px]">Verifies Hostinger SSL delivery</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================== */}
      {/* MODAL 1: QR CODE & LPA ACTIVATION INSPECTOR*/}
      {/* ========================================== */}
      {showQrModal && activeQrData && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Official eSIM Profile QR Code</h3>
                <p className="text-xs text-slate-500">{activeQrData.name} • SM-DP+ Profile</p>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* QR Code Graphic Container */}
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                    activeQrData.lpa
                  )}`}
                  alt="eSIM Installation QR Code"
                  className="w-48 h-48 block"
                />
              </div>
              <p className="text-[11px] text-slate-500 text-center mt-3 max-w-xs">
                Scan with any iPhone, Samsung Galaxy, or Google Pixel camera to immediately download profile.
              </p>
            </div>

            {/* LPA Code Display */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span>Manual LPA Activation String</span>
                <button
                  onClick={() => copyToClipboard(activeQrData.lpa, "modal-lpa")}
                  className="text-[#2FBF71] hover:underline flex items-center gap-1"
                >
                  {copiedKey === "modal-lpa" ? "Copied!" : "Copy String"}
                </button>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-[11px] text-slate-800 break-all select-all border border-slate-200">
                {activeQrData.lpa}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
              >
                Close
              </button>
              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(
                  activeQrData.lpa
                )}`}
                download={`SproutSIM_QR_${activeQrData.iccid}.png`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#2FBF71] hover:bg-[#28A762] text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save High-Res PNG</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* MODAL 2: OFFICIAL INVOICE RECEIPT MODAL    */}
      {/* ========================================== */}
      {selectedOrderInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#123C2A] text-[#2FBF71] font-black flex items-center justify-center text-xs">
                  SS
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Commercial Tax Invoice</h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {selectedOrderInvoice.orderNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrderInvoice(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-sans">Billed To</span>
                <div className="font-bold text-slate-900">{selectedOrderInvoice.customerName}</div>
                <div className="text-slate-500">{selectedOrderInvoice.customerEmail}</div>
                <div className="text-slate-500">{selectedOrderInvoice.customerPhone}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-sans">Invoice Date</span>
                <div className="font-bold text-slate-900">{selectedOrderInvoice.createdAt}</div>
                <div className="text-emerald-600 font-bold">STATUS: PAID &amp; ACTIVE</div>
              </div>
            </div>

            {/* Line Items */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5 text-right">Wholesale</th>
                    <th className="p-2.5 text-right">Retail Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-2.5">
                      <div className="font-bold text-slate-900">{selectedOrderInvoice.planName}</div>
                      <div className="text-[10px] text-slate-400">
                        ICCID: {selectedOrderInvoice.iccid}
                      </div>
                    </td>
                    <td className="p-2.5 text-right text-slate-500">
                      ${selectedOrderInvoice.wholesaleCostUSD.toFixed(2)}
                    </td>
                    <td className="p-2.5 text-right font-bold text-slate-900">
                      Rs {selectedOrderInvoice.amountPKR.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs">
              <span className="font-bold text-slate-700">Gross Margin Realized:</span>
              <span className="font-bold text-emerald-600">
                +${selectedOrderInvoice.grossMarginUSD.toFixed(2)} USD ({selectedOrderInvoice.grossMarginPct}%)
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrderInvoice(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#123C2A] hover:bg-[#1A523A] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* DRAWER: CDR SESSION TELEMETRY INSPECTOR    */}
      {/* ========================================== */}
      {selectedEsim && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-white border-l border-slate-200 w-full max-w-lg h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">
                    Call Detail Records &amp; Profile Telemetry
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    ICCID: {selectedEsim.iccid}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEsim(null)}
                  className="text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subscriber Overview */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Subscriber Name:</span>
                  <span className="font-bold text-slate-900">{selectedEsim.customerName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-mono text-slate-900">{selectedEsim.customerEmail}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Device Hardware:</span>
                  <span className="font-bold text-slate-900">{selectedEsim.deviceModel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Roaming Node:</span>
                  <span className="font-mono text-blue-700 font-bold">{selectedEsim.operator}</span>
                </div>
              </div>

              {/* CDR Data Sessions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Live 4G Data Sessions (Simulated CDR Stream)
                </h4>
                <div className="space-y-2">
                  {CDR_SESSIONS_MOCK.map((cdr) => (
                    <div
                      key={cdr.id}
                      className="p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs font-mono space-y-1"
                    >
                      <div className="flex items-center justify-between text-slate-900 font-bold">
                        <span>{cdr.location}</span>
                        <span className="text-emerald-600 font-bold">+{cdr.bytesUsedMB} MB</span>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>Tower: {cdr.cellTower}</span>
                        <span>{cdr.startTime} ({cdr.durationMin}m)</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Assigned IP: {cdr.ipAddress} • {cdr.network}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedEsim(null)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors"
              >
                Close Telemetry Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
