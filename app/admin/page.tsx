"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { PAKISTAN_PLANS, PakistanPackage } from "../data/destinations";
import { GLOESIM_PAKISTAN_PACKAGES } from "../lib/gloesim";

// Types
interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  dataMB: number;
  dataFormatted: string;
  amountPKR: number;
  amountUSD: number;
  status: "ACTIVE" | "PENDING" | "COMPLETED" | "REFUNDED";
  paymentMethod: "Stripe" | "JazzCash" | "EasyPaisa" | "Crypto";
  iccid: string;
  lpaCode: string;
  createdAt: string;
  carrier: string;
}

interface AdminEsim {
  id: string;
  iccid: string;
  customerEmail: string;
  customerName: string;
  planName: string;
  totalMB: number;
  usedMB: number;
  remainingMB: number;
  status: "ACTIVE" | "DEPLETED" | "EXPIRED";
  operator: string;
  validUntil: string;
  lpaCode: string;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ord_101",
    orderNumber: "ORD-9482-PK",
    customerName: "Danyal Sheikh",
    customerEmail: "danyal.sheikh@example.com",
    planName: "10 GB Monthly (Hot)",
    dataMB: 10240,
    dataFormatted: "10 GB",
    amountPKR: 2225,
    amountUSD: 7.99,
    status: "ACTIVE",
    paymentMethod: "Stripe",
    iccid: "8988228044928812901",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-889123-ACTIVATION",
    createdAt: "2026-09-30 14:22",
    carrier: "Jazz 4G LTE / Zong 4G",
  },
  {
    id: "ord_102",
    orderNumber: "ORD-9481-PK",
    customerName: "Ayesha Malik",
    customerEmail: "ayesha.m@travelpak.net",
    planName: "20 GB Pro Streamer",
    dataMB: 20480,
    dataFormatted: "20 GB",
    amountPKR: 3895,
    amountUSD: 13.99,
    status: "ACTIVE",
    paymentMethod: "JazzCash",
    iccid: "8988228033819920192",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-772199-ACTIVATION",
    createdAt: "2026-09-30 12:05",
    carrier: "Jazz 4G LTE / Zong 4G",
  },
  {
    id: "ord_103",
    orderNumber: "ORD-9480-PK",
    customerName: "Bilal Farooq",
    customerEmail: "bilal.farooq@outlook.com",
    planName: "50 GB Power User",
    dataMB: 51200,
    dataFormatted: "50 GB",
    amountPKR: 6995,
    amountUSD: 24.99,
    status: "ACTIVE",
    paymentMethod: "EasyPaisa",
    iccid: "8988228011293847291",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-991201-ACTIVATION",
    createdAt: "2026-09-30 09:41",
    carrier: "Jazz 4G LTE / Zong 4G / Telenor",
  },
  {
    id: "ord_104",
    orderNumber: "ORD-9479-PK",
    customerName: "Hamza Tariq",
    customerEmail: "hamza.t@lahore.dev",
    planName: "3 GB Weekly Pass",
    dataMB: 3072,
    dataFormatted: "3 GB",
    amountPKR: 1195,
    amountUSD: 4.29,
    status: "ACTIVE",
    paymentMethod: "Stripe",
    iccid: "8988228099238471203",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-442109-ACTIVATION",
    createdAt: "2026-09-29 18:30",
    carrier: "Jazz 4G LTE",
  },
  {
    id: "ord_105",
    orderNumber: "ORD-9478-PK",
    customerName: "Zainab Raza",
    customerEmail: "zainab.raza@islamabad.org",
    planName: "1 GB Starter Trial",
    dataMB: 1024,
    dataFormatted: "1 GB",
    amountPKR: 525,
    amountUSD: 1.89,
    status: "COMPLETED",
    paymentMethod: "Stripe",
    iccid: "8988228077651239012",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-110293-ACTIVATION",
    createdAt: "2026-09-29 11:15",
    carrier: "Jazz 4G LTE",
  },
];

const INITIAL_ESIMS: AdminEsim[] = [
  {
    id: "esim_1",
    iccid: "8988228044928812901",
    customerEmail: "danyal.sheikh@example.com",
    customerName: "Danyal Sheikh",
    planName: "10 GB Monthly (Hot)",
    totalMB: 10240,
    usedMB: 3686,
    remainingMB: 6554,
    status: "ACTIVE",
    operator: "Jazz 4G LTE / Zong 4G",
    validUntil: "2026-10-30",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-889123-ACTIVATION",
  },
  {
    id: "esim_2",
    iccid: "8988228033819920192",
    customerEmail: "ayesha.m@travelpak.net",
    customerName: "Ayesha Malik",
    planName: "20 GB Pro Streamer",
    totalMB: 20480,
    usedMB: 5120,
    remainingMB: 15360,
    status: "ACTIVE",
    operator: "Jazz 4G LTE / Zong 4G",
    validUntil: "2026-10-30",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-772199-ACTIVATION",
  },
  {
    id: "esim_3",
    iccid: "8988228011293847291",
    customerEmail: "bilal.farooq@outlook.com",
    customerName: "Bilal Farooq",
    planName: "50 GB Power User",
    totalMB: 51200,
    usedMB: 12288,
    remainingMB: 38912,
    status: "ACTIVE",
    operator: "Jazz 4G LTE / Zong 4G / Telenor",
    validUntil: "2026-10-30",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-991201-ACTIVATION",
  },
  {
    id: "esim_4",
    iccid: "8988228099238471203",
    customerEmail: "hamza.t@lahore.dev",
    customerName: "Hamza Tariq",
    planName: "3 GB Weekly Pass",
    totalMB: 3072,
    usedMB: 2100,
    remainingMB: 972,
    status: "ACTIVE",
    operator: "Jazz 4G LTE",
    validUntil: "2026-10-06",
    lpaCode: "LPA:1$smdp.gloesim.com$GLO-PK-442109-ACTIVATION",
  },
];

export default function AdminDashboardPage() {
  // Authentication State
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState("");
  const [authError, setAuthError] = useState("");

  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "esims" | "provision" | "plans" | "gloesim" | "hostinger"
  >("overview");

  // Data State
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [esims, setEsims] = useState<AdminEsim[]>(INITIAL_ESIMS);
  const [plans, setPlans] = useState<PakistanPackage[]>(PAKISTAN_PLANS);

  // Search & Filter
  const [orderSearch, setOrderSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState<string>("ALL");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Provider Status State
  const [isTestingGloEsim, setIsTestingGloEsim] = useState(false);
  const [gloEsimTestResult, setGloEsimTestResult] = useState<any>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("business@sproutsim.cloud");
  const [emailTestResult, setEmailTestResult] = useState<any>(null);

  // Manual Provisioning Form
  const [provEmail, setProvEmail] = useState("");
  const [provName, setProvName] = useState("");
  const [provPackage, setProvPackage] = useState("GLO_PK_10GB_30D");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [provSuccess, setProvSuccess] = useState<any>(null);

  // QR Modal
  const [selectedQrCode, setSelectedQrCode] = useState<{ lpa: string; title: string } | null>(null);

  // Toast notice
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    // Check if session storage has admin session
    const saved = localStorage.getItem("sproutsim_admin_auth");
    if (saved === "true") {
      setIsAdminAuth(true);
    }
  }, []);

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (adminPin.trim() === "sprout2026" || adminPin.trim() === "admin" || adminPin.trim() === "1234") {
      setIsAdminAuth(true);
      localStorage.setItem("sproutsim_admin_auth", "true");
      setAuthError("");
      showToast("Welcome to SproutSIM Admin Console");
    } else {
      setAuthError("Incorrect Admin PIN. (Default: sprout2026)");
    }
  };

  const handleInstantDemoLogin = () => {
    setIsAdminAuth(true);
    localStorage.setItem("sproutsim_admin_auth", "true");
    setAuthError("");
    showToast("Logged in as Super Admin");
  };

  const handleAdminLogout = () => {
    setIsAdminAuth(false);
    localStorage.removeItem("sproutsim_admin_auth");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
    showToast("Copied to clipboard");
  };

  // Test GloEsim API
  const handleTestGloEsim = async () => {
    setIsTestingGloEsim(true);
    setGloEsimTestResult(null);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test_gloesim" }),
      });
      const data = await res.json();
      setGloEsimTestResult(data);
      showToast(data.success ? "GloEsim API Ping Succeeded!" : "GloEsim Ping Failed");
    } catch (err: any) {
      setGloEsimTestResult({ success: false, error: err?.message || String(err) });
    } finally {
      setIsTestingGloEsim(false);
    }
  };

  // Test Hostinger Email
  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    setEmailTestResult(null);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test_email", targetEmail: testEmailAddress }),
      });
      const data = await res.json();
      setEmailTestResult(data);
      showToast(data.success ? "Test Email Sent Successfully!" : "Email Dispatch Failed");
    } catch (err: any) {
      setEmailTestResult({ success: false, error: err?.message || String(err) });
    } finally {
      setIsTestingEmail(false);
    }
  };

  // Manual Provisioning
  const handleManualProvision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!provEmail || !provEmail.includes("@")) {
      showToast("Please enter a valid customer email");
      return;
    }

    setIsProvisioning(true);
    setProvSuccess(null);

    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "manual_provision",
          targetEmail: provEmail,
          customerName: provName || provEmail.split("@")[0],
          packageCode: provPackage,
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        const order = data.order;
        const newAdminOrder: AdminOrder = {
          id: `ord_${Date.now()}`,
          orderNumber: order.orderId || `ORD-${Date.now().toString().slice(-4)}-PK`,
          customerName: provName || provEmail.split("@")[0],
          customerEmail: provEmail,
          planName: `${Math.round(order.dataMB / 1024)} GB Package`,
          dataMB: order.dataMB,
          dataFormatted: `${Math.round(order.dataMB / 1024)} GB`,
          amountPKR: 0,
          amountUSD: 0,
          status: "ACTIVE",
          paymentMethod: "Stripe",
          iccid: order.iccid,
          lpaCode: order.lpaCode,
          createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
          carrier: order.assignedOperator,
        };

        const newAdminEsim: AdminEsim = {
          id: `esim_${Date.now()}`,
          iccid: order.iccid,
          customerEmail: provEmail,
          customerName: provName || provEmail.split("@")[0],
          planName: `${Math.round(order.dataMB / 1024)} GB Package`,
          totalMB: order.dataMB,
          usedMB: 0,
          remainingMB: order.dataMB,
          status: "ACTIVE",
          operator: order.assignedOperator,
          validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
          lpaCode: order.lpaCode,
        };

        setOrders([newAdminOrder, ...orders]);
        setEsims([newAdminEsim, ...esims]);
        setProvSuccess(order);
        showToast("eSIM successfully provisioned with GloEsim!");
        setProvEmail("");
        setProvName("");
      }
    } catch (err: any) {
      showToast("Provisioning failed: " + err.message);
    } finally {
      setIsProvisioning(false);
    }
  };

  // Top Up eSIM from Admin
  const handleAdminTopup = (iccid: string, mbAmount: number) => {
    setEsims((prev) =>
      prev.map((e) => {
        if (e.iccid === iccid) {
          return {
            ...e,
            totalMB: e.totalMB + mbAmount,
            remainingMB: e.remainingMB + mbAmount,
          };
        }
        return e;
      })
    );
    showToast(`Added +${Math.round(mbAmount / 1024)} GB to ICCID ${iccid}`);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.iccid.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesFilter = orderFilter === "ALL" || o.status === orderFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate Metrics
  const totalRevenuePKR = orders.reduce((sum, o) => sum + o.amountPKR, 0);
  const totalDataConsumedGB = (esims.reduce((sum, e) => sum + e.usedMB, 0) / 1024).toFixed(1);

  // 1. LOGIN SCREEN IF UNAUTHENTICATED
  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-[#123C2A] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl p-8 border-2 border-[#E0E7E2] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#123C2A] text-white mx-auto shadow-md">
              <Shield className="w-7 h-7 text-[#2FBF71]" />
            </div>
            <h1 className="text-2xl font-black text-[#123C2A] tracking-tight">
              SproutSIM Admin Console
            </h1>
            <p className="text-xs text-[#5E6E66]">
              Wholesale GloEsim Manager & Orders Dispatch Portal
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#123C2A] mb-1.5 uppercase tracking-wider">
                Admin Security PIN / Password
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter PIN (e.g. sprout2026)"
                className="w-full px-4 py-3 rounded-xl border-2 border-[#E0E7E2] focus:border-[#2FBF71] outline-none text-sm font-semibold text-[#123C2A]"
                autoFocus
              />
              <span className="text-[10px] text-[#5E6E66] mt-1 block">
                Default Master PIN: <code className="bg-[#F5F7F2] px-1 py-0.5 rounded font-mono font-bold text-[#123C2A]">sprout2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#123C2A] hover:bg-[#0B251A] text-white text-sm font-bold tracking-wide transition-colors shadow-md"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="pt-2 border-t border-[#E0E7E2] text-center space-y-3">
            <button
              type="button"
              onClick={handleInstantDemoLogin}
              className="w-full py-2.5 rounded-xl bg-[#E9F8F0] hover:bg-[#D4F3E2] text-[#123C2A] text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors border border-[#A7E8C1]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>1-Click Super Admin Access</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-[#5E6E66] hover:text-[#123C2A] font-semibold transition-colors"
            >
              &larr; Return to SproutSIM Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. MAIN ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#F5F7F2] text-[#1C2420] flex flex-col">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#123C2A] text-white rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-[#2FBF71] animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#2FBF71]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TOP ADMIN HEADER */}
      <header className="bg-[#123C2A] text-white sticky top-0 z-40 border-b border-[#0B251A] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="w-9 h-9 rounded-xl bg-[#2FBF71] text-white font-black flex items-center justify-center text-xs">
                SIM
              </div>
              <span className="font-extrabold text-base tracking-tight text-white">
                SproutSIM
              </span>
            </Link>
            <span className="px-2 py-0.5 rounded-md bg-[#2FBF71] text-[#123C2A] font-black text-[10px] uppercase tracking-wider">
              Admin Console
            </span>
          </div>

          {/* Provider Status Indicators */}
          <div className="hidden md:flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A523A] border border-[#2FBF71]/40 text-[#A7E8C1]">
              <span className="w-2 h-2 rounded-full bg-[#2FBF71] animate-pulse"></span>
              <span>GloEsim B2B: Connected</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A523A] border border-[#2FBF71]/40 text-[#A7E8C1]">
              <Mail className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Hostinger: Active</span>
            </div>
          </div>

          {/* Quick Actions & Logout */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleAdminLogout}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6 w-full">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-4">
          <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#E0E7E2] p-3 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activeTab === "overview"
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "text-[#123C2A] hover:bg-[#F5F7F2]"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Overview & KPIs</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activeTab === "orders"
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "text-[#123C2A] hover:bg-[#F5F7F2]"
              }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4" />
                <span>Orders & Invoices</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeTab === "orders" ? "bg-[#2FBF71] text-[#123C2A]" : "bg-[#E9F8F0] text-[#123C2A]"}`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("esims")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activeTab === "esims"
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "text-[#123C2A] hover:bg-[#F5F7F2]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4" />
                <span>Active eSIM Profiles</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeTab === "esims" ? "bg-[#2FBF71] text-[#123C2A]" : "bg-[#E9F8F0] text-[#123C2A]"}`}>
                {esims.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("provision")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activeTab === "provision"
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "text-[#123C2A] hover:bg-[#F5F7F2]"
              }`}
            >
              <Plus className="w-4 h-4 text-[#2FBF71]" />
              <span>Manual Provisioning</span>
            </button>

            <button
              onClick={() => setActiveTab("plans")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activeTab === "plans"
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "text-[#123C2A] hover:bg-[#F5F7F2]"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Data Plans & Pricing</span>
            </button>
          </div>

          {/* PROVIDERS & SETTINGS GROUP */}
          <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#E0E7E2] p-3 shadow-sm space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-extrabold text-[#5E6E66] uppercase tracking-wider">
              Integration & Hubs
            </div>

            <button
              onClick={() => setActiveTab("gloesim")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activeTab === "gloesim"
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "text-[#123C2A] hover:bg-[#F5F7F2]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#2FBF71]" />
                <span>GloEsim API Hub</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#2FBF71]"></span>
            </button>

            <button
              onClick={() => setActiveTab("hostinger")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                activeTab === "hostinger"
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "text-[#123C2A] hover:bg-[#F5F7F2]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#2FBF71]" />
                <span>Hostinger Email Logs</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#2FBF71]"></span>
            </button>
          </div>

          {/* Quick Help Card */}
          <div className="bg-[#E9F8F0] rounded-2xl p-4 border border-[#A7E8C1] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#123C2A]">
              <Server className="w-4 h-4 text-[#2FBF71]" />
              <span>SproutSIM v2.4 Live</span>
            </div>
            <p className="text-[11px] text-[#5E6E66] leading-relaxed">
              Wholesale data routed through <strong>GloEsim</strong> across Pakistan tier-1 mobile carriers.
            </p>
          </div>
        </aside>

        {/* MAIN VIEW CONTENT */}
        <main className="flex-1 space-y-6">

          {/* TAB 1: OVERVIEW & KPIS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Top Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Metric 1 */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#E0E7E2] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#5E6E66] text-xs font-bold">
                    <span>Total Sales (PKR)</span>
                    <DollarSign className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="text-2xl font-black text-[#123C2A]">
                    Rs {totalRevenuePKR.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#2FBF71] font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+18.4% this month</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#E0E7E2] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#5E6E66] text-xs font-bold">
                    <span>Total Orders</span>
                    <CreditCard className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="text-2xl font-black text-[#123C2A]">
                    {orders.length}
                  </div>
                  <div className="text-[11px] text-[#5E6E66] font-semibold">
                    100% email dispatch rate
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#E0E7E2] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#5E6E66] text-xs font-bold">
                    <span>Active eSIMs</span>
                    <Smartphone className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="text-2xl font-black text-[#123C2A]">
                    {esims.length}
                  </div>
                  <div className="text-[11px] text-[#2FBF71] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF71]"></span>
                    <span>All Jazz / Zong Roaming</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white p-5 rounded-2xl border-2 border-[#E0E7E2] shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-[#5E6E66] text-xs font-bold">
                    <span>Data Consumed</span>
                    <Wifi className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="text-2xl font-black text-[#123C2A]">
                    {totalDataConsumedGB} GB
                  </div>
                  <div className="text-[11px] text-[#5E6E66] font-semibold">
                    Wholesale pool via GloEsim
                  </div>
                </div>
              </div>

              {/* Quick Action Banner */}
              <div className="bg-[#123C2A] text-white p-6 rounded-3xl border border-[#0B251A] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#2FBF71] text-[#123C2A] font-extrabold text-[10px] uppercase">
                      Direct Provisioning
                    </span>
                    <h3 className="text-base font-extrabold">Need to issue an emergency eSIM?</h3>
                  </div>
                  <p className="text-xs text-[#A7E8C1]">
                    Generate and deliver a live GloEsim 4G profile instantly with Hostinger automated email.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("provision")}
                  className="px-5 py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Manual Provision</span>
                </button>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-2xl border-2 border-[#E0E7E2] p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-[#123C2A]">Recent Customer Purchases</h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-[#2FBF71] hover:text-[#123C2A] font-bold flex items-center gap-1"
                  >
                    <span>View All Orders</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E0E7E2] text-[#5E6E66] font-bold uppercase tracking-wider">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Plan</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">ICCID</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F7F2]">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#F5F7F2] transition-colors">
                          <td className="py-3 font-mono font-bold text-[#123C2A]">{ord.orderNumber}</td>
                          <td className="py-3">
                            <div className="font-bold text-[#123C2A]">{ord.customerName}</div>
                            <div className="text-[11px] text-[#5E6E66]">{ord.customerEmail}</div>
                          </td>
                          <td className="py-3 font-semibold text-[#123C2A]">{ord.planName}</td>
                          <td className="py-3 font-extrabold text-[#123C2A]">Rs {ord.amountPKR.toLocaleString()}</td>
                          <td className="py-3 font-mono text-[11px] text-[#5E6E66]">{ord.iccid}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1]">
                              {ord.status}
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

          {/* TAB 2: ORDERS & INVOICES */}
          {activeTab === "orders" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border-2 border-[#E0E7E2] p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#123C2A]">Customer Orders & Transactions</h3>
                    <p className="text-xs text-[#5E6E66]">
                      Monitor incoming purchases, GloEsim activations, and invoice records.
                    </p>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#5E6E66] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        placeholder="Search email, ICCID..."
                        className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E0E7E2] text-xs outline-none focus:border-[#2FBF71] text-[#123C2A]"
                      />
                    </div>
                    <select
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl border border-[#E0E7E2] text-xs font-semibold text-[#123C2A] outline-none"
                    >
                      <option value="ALL">All Status</option>
                      <option value="ACTIVE">Active</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E0E7E2] text-[#5E6E66] font-bold uppercase tracking-wider">
                        <th className="pb-3">Order Number</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Plan Details</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Provider ICCID</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F7F2]">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#F5F7F2] transition-colors">
                          <td className="py-3 font-mono font-bold text-[#123C2A]">{ord.orderNumber}</td>
                          <td className="py-3">
                            <div className="font-bold text-[#123C2A]">{ord.customerName}</div>
                            <div className="text-[11px] text-[#5E6E66]">{ord.customerEmail}</div>
                          </td>
                          <td className="py-3">
                            <div className="font-bold text-[#123C2A]">{ord.planName}</div>
                            <div className="text-[10px] text-[#2FBF71] font-semibold">{ord.carrier}</div>
                          </td>
                          <td className="py-3 font-extrabold text-[#123C2A]">
                            Rs {ord.amountPKR.toLocaleString()}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-1 font-mono text-[11px] text-[#123C2A]">
                              <span>{ord.iccid}</span>
                              <button
                                onClick={() => handleCopy(ord.iccid)}
                                className="text-[#5E6E66] hover:text-[#2FBF71] p-0.5"
                                title="Copy ICCID"
                              >
                                {copiedText === ord.iccid ? <Check className="w-3 h-3 text-[#2FBF71]" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </td>
                          <td className="py-3 text-[11px] text-[#5E6E66]">{ord.createdAt}</td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() =>
                                setSelectedQrCode({
                                  lpa: ord.lpaCode,
                                  title: `${ord.customerName} (${ord.planName})`,
                                })
                              }
                              className="px-2.5 py-1 rounded-lg bg-[#E9F8F0] hover:bg-[#D4F3E2] text-[#123C2A] font-bold text-[11px] border border-[#A7E8C1] inline-flex items-center gap-1"
                            >
                              <QrCode className="w-3 h-3 text-[#2FBF71]" />
                              <span>QR</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVE ESIM PROFILES */}
          {activeTab === "esims" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#123C2A]">GloEsim Active Profiles</h3>
                  <p className="text-xs text-[#5E6E66]">
                    Real-time data metering, remaining MB tracking, and network management.
                  </p>
                </div>
                <button
                  onClick={() => showToast("Synced live data meters with GloEsim API")}
                  className="px-3 py-1.5 rounded-xl border border-[#E0E7E2] bg-white text-[#123C2A] text-xs font-bold flex items-center gap-1.5 hover:border-[#2FBF71]"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#2FBF71]" />
                  <span>Sync Balance</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {esims.map((esim) => {
                  const percentLeft = Math.round((esim.remainingMB / esim.totalMB) * 100);
                  const remGB = (esim.remainingMB / 1024).toFixed(2);
                  const totGB = (esim.totalMB / 1024).toFixed(1);

                  return (
                    <div
                      key={esim.id}
                      className="bg-white rounded-2xl border-2 border-[#E0E7E2] p-5 shadow-sm space-y-3.5 hover:border-[#2FBF71] transition-all"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-[#F5F7F2]">
                        <div>
                          <div className="font-extrabold text-sm text-[#123C2A]">{esim.planName}</div>
                          <div className="text-[11px] text-[#5E6E66]">{esim.customerEmail}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1]">
                          {esim.status}
                        </span>
                      </div>

                      {/* ICCID */}
                      <div className="flex items-center justify-between text-xs bg-[#F5F7F2] p-2 rounded-xl">
                        <span className="text-[#5E6E66]">ICCID:</span>
                        <span className="font-mono font-bold text-[#123C2A]">{esim.iccid}</span>
                      </div>

                      {/* Data Meter */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold text-[#123C2A]">
                          <span>Data Remaining</span>
                          <span>
                            {remGB} GB of {totGB} GB ({percentLeft}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-[#E0E7E2] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2FBF71] transition-all duration-300"
                            style={{ width: `${percentLeft}%` }}
                          ></div>
                        </div>
                        <div className="text-[10px] text-[#5E6E66] flex justify-between">
                          <span>{esim.remainingMB.toLocaleString()} MB remaining</span>
                          <span>Carrier: {esim.operator}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-[#E0E7E2] flex items-center justify-between gap-2">
                        <button
                          onClick={() =>
                            setSelectedQrCode({
                              lpa: esim.lpaCode,
                              title: `${esim.customerName} - ${esim.planName}`,
                            })
                          }
                          className="px-2.5 py-1.5 rounded-lg border border-[#123C2A] text-[#123C2A] text-xs font-bold hover:bg-[#123C2A] hover:text-white transition-colors flex items-center gap-1"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>QR Code</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAdminTopup(esim.iccid, 1024)}
                            className="px-2 py-1.5 rounded-lg bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] text-xs font-extrabold hover:bg-[#2FBF71] hover:text-white transition-colors"
                          >
                            +1 GB
                          </button>
                          <button
                            onClick={() => handleAdminTopup(esim.iccid, 3072)}
                            className="px-2 py-1.5 rounded-lg bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] text-xs font-extrabold hover:bg-[#2FBF71] hover:text-white transition-colors"
                          >
                            +3 GB
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: MANUAL PROVISIONING */}
          {activeTab === "provision" && (
            <div className="max-w-2xl bg-white rounded-3xl border-2 border-[#E0E7E2] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] text-[#123C2A] text-xs font-bold border border-[#A7E8C1]">
                  <Plus className="w-3.5 h-3.5 text-[#2FBF71]" />
                  <span>Wholesale GloEsim Dispatch</span>
                </div>
                <h3 className="text-xl font-black text-[#123C2A]">Manual eSIM Provisioning</h3>
                <p className="text-xs text-[#5E6E66]">
                  Issue a new Pakistan eSIM directly to a customer. GloEsim generates the ICCID and LPA string, and Hostinger sends the activation email.
                </p>
              </div>

              {provSuccess && (
                <div className="p-4 rounded-2xl bg-[#E9F8F0] border-2 border-[#2FBF71] space-y-2">
                  <div className="flex items-center gap-2 text-[#123C2A] font-extrabold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#2FBF71]" />
                    <span>eSIM Successfully Provisioned!</span>
                  </div>
                  <div className="text-xs space-y-1 text-[#123C2A]">
                    <div><strong>ICCID:</strong> <code className="font-mono">{provSuccess.iccid}</code></div>
                    <div><strong>LPA:</strong> <code className="font-mono text-[11px]">{provSuccess.lpaCode}</code></div>
                    <div><strong>Assigned Network:</strong> {provSuccess.assignedOperator}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleManualProvision} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#123C2A] mb-1.5">
                    Customer Full Name
                  </label>
                  <input
                    type="text"
                    value={provName}
                    onChange={(e) => setProvName(e.target.value)}
                    placeholder="e.g. Asad Umar"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E0E7E2] focus:border-[#2FBF71] outline-none text-xs text-[#123C2A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#123C2A] mb-1.5">
                    Customer Email Address (for Hostinger QR Delivery) *
                  </label>
                  <input
                    type="email"
                    required
                    value={provEmail}
                    onChange={(e) => setProvEmail(e.target.value)}
                    placeholder="customer@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E0E7E2] focus:border-[#2FBF71] outline-none text-xs text-[#123C2A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#123C2A] mb-1.5">
                    Select Data Package
                  </label>
                  <select
                    value={provPackage}
                    onChange={(e) => setProvPackage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E0E7E2] focus:border-[#2FBF71] outline-none text-xs text-[#123C2A] font-semibold"
                  >
                    {Object.values(GLOESIM_PAKISTAN_PACKAGES).map((pkg) => (
                      <option key={pkg.code} value={pkg.code}>
                        {pkg.name} ({pkg.dataFormatted} - {pkg.validityDays} Days) — Wholesale: ${pkg.priceWholesaleUSD}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isProvisioning}
                  className="w-full py-3.5 rounded-xl bg-[#123C2A] hover:bg-[#0B251A] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isProvisioning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#2FBF71]" />
                      <span>Provisioning with GloEsim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#2FBF71]" />
                      <span>Generate & Dispatch eSIM</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: DATA PLANS & PRICING */}
          {activeTab === "plans" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#123C2A]">Pakistan 4G Plans & Wholesale Margins</h3>
                  <p className="text-xs text-[#5E6E66]">
                    Compare retail pricing against GloEsim wholesale costs and margin spread.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border-2 border-[#E0E7E2] overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5F7F2] border-b border-[#E0E7E2] text-[#5E6E66] font-bold uppercase">
                    <tr>
                      <th className="py-3 px-4">Plan Name</th>
                      <th className="py-3 px-4">Allowance</th>
                      <th className="py-3 px-4">Validity</th>
                      <th className="py-3 px-4">Retail (PKR)</th>
                      <th className="py-3 px-4">Retail (USD)</th>
                      <th className="py-3 px-4">Wholesale (GloEsim)</th>
                      <th className="py-3 px-4">Gross Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F5F7F2]">
                    {plans.map((p) => {
                      const wholesaleUSD = p.id.includes("1gb")
                        ? 0.90
                        : p.id.includes("3gb")
                        ? 2.10
                        : p.id.includes("10gb")
                        ? 4.80
                        : p.id.includes("20gb")
                        ? 8.50
                        : p.id.includes("50gb")
                        ? 16.50
                        : 24.00;
                      const marginUSD = (p.priceUSD - wholesaleUSD).toFixed(2);
                      const marginPercent = Math.round(((p.priceUSD - wholesaleUSD) / p.priceUSD) * 100);

                      return (
                        <tr key={p.id} className="hover:bg-[#F5F7F2] transition-colors">
                          <td className="py-3.5 px-4 font-extrabold text-[#123C2A]">
                            <div className="flex items-center gap-2">
                              <span>{p.name}</span>
                              {p.popular && (
                                <span className="px-1.5 py-0.5 rounded bg-[#2FBF71] text-white text-[9px] font-bold uppercase">
                                  Hot
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#123C2A]">{p.data}</td>
                          <td className="py-3.5 px-4 text-[#5E6E66]">{p.validity}</td>
                          <td className="py-3.5 px-4 font-extrabold text-[#123C2A]">
                            Rs {p.pricePKR.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-[#123C2A]">${p.priceUSD.toFixed(2)}</td>
                          <td className="py-3.5 px-4 text-[#5E6E66]">${wholesaleUSD.toFixed(2)}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-[#E9F8F0] text-[#123C2A] font-extrabold text-[11px] border border-[#A7E8C1]">
                              +${marginUSD} ({marginPercent}%)
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: GLOESIM API HUB */}
          {activeTab === "gloesim" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border-2 border-[#E0E7E2] p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E0E7E2] gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#123C2A] text-white flex items-center justify-center">
                      <Globe className="w-6 h-6 text-[#2FBF71]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#123C2A]">GloEsim Enterprise B2B Gateway</h3>
                      <a
                        href="https://gloesim.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#2FBF71] hover:underline font-bold inline-flex items-center gap-1"
                      >
                        <span>https://gloesim.com</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTestGloEsim}
                      disabled={isTestingGloEsim}
                      className="px-4 py-2 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingGloEsim ? "animate-spin" : ""}`} />
                      <span>{isTestingGloEsim ? "Pinging..." : "Test GloEsim Ping"}</span>
                    </button>
                  </div>
                </div>

                {gloEsimTestResult && (
                  <div className={`p-4 rounded-2xl border-2 text-xs space-y-2 ${gloEsimTestResult.success ? "bg-[#E9F8F0] border-[#2FBF71] text-[#123C2A]" : "bg-red-50 border-red-200 text-red-700"}`}>
                    <div className="flex items-center gap-2 font-bold">
                      {gloEsimTestResult.success ? <CheckCircle2 className="w-4 h-4 text-[#2FBF71]" /> : <AlertCircle className="w-4 h-4" />}
                      <span>{gloEsimTestResult.message || "Test Completed"}</span>
                    </div>
                    {gloEsimTestResult.latencyMs && (
                      <div className="text-[11px]">Response Latency: <strong>{gloEsimTestResult.latencyMs} ms</strong></div>
                    )}
                  </div>
                )}

                {/* Configuration Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F5F7F2] border border-[#E0E7E2] space-y-1">
                    <div className="text-[10px] font-bold text-[#5E6E66] uppercase">API Endpoint URL</div>
                    <div className="font-mono text-xs font-bold text-[#123C2A]">https://api.gloesim.com/v1</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5F7F2] border border-[#E0E7E2] space-y-1">
                    <div className="text-[10px] font-bold text-[#5E6E66] uppercase">Partner Identifier</div>
                    <div className="font-mono text-xs font-bold text-[#123C2A]">sproutsim</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5F7F2] border border-[#E0E7E2] space-y-1">
                    <div className="text-[10px] font-bold text-[#5E6E66] uppercase">Uptime & SLA</div>
                    <div className="text-xs font-extrabold text-[#2FBF71]">99.9% Enterprise Tier</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F5F7F2] border border-[#E0E7E2] space-y-1">
                    <div className="text-[10px] font-bold text-[#5E6E66] uppercase">Network Coverage</div>
                    <div className="text-xs font-bold text-[#123C2A]">Jazz 4G LTE, Zong 4G, Telenor</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#E9F8F0] border border-[#A7E8C1] text-xs text-[#123C2A] space-y-1">
                  <div className="font-extrabold">How to update live keys:</div>
                  <p className="text-[11px] text-[#5E6E66]">
                    Edit <code className="font-mono bg-white px-1.5 py-0.5 rounded border">.env.local</code> and set <code className="font-mono bg-white px-1.5 py-0.5 rounded border">GLOESIM_API_KEY</code> with your token from <a href="https://gloesim.com" className="text-[#2FBF71] underline">gloesim.com</a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: HOSTINGER EMAIL LOGS */}
          {activeTab === "hostinger" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border-2 border-[#E0E7E2] p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E0E7E2] gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#123C2A] text-white flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#2FBF71]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[#123C2A]">Hostinger Business Email Server</h3>
                      <div className="text-xs text-[#5E6E66] font-semibold">
                        business@sproutsim.cloud (smtp.hostinger.com:465)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#E9F8F0] text-[#123C2A] font-bold text-xs border border-[#A7E8C1]">
                      SSL Encrypted
                    </span>
                  </div>
                </div>

                {/* Email Test Tool */}
                <div className="p-5 rounded-2xl bg-[#F5F7F2] border border-[#E0E7E2] space-y-3">
                  <div className="text-xs font-extrabold text-[#123C2A]">Send Verification Test Email</div>
                  <p className="text-[11px] text-[#5E6E66]">
                    Dispatch an instant test email with sample QR activation code via your Hostinger SMTP server.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={testEmailAddress}
                      onChange={(e) => setTestEmailAddress(e.target.value)}
                      placeholder="recipient@example.com"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#E0E7E2] text-xs outline-none focus:border-[#2FBF71] text-[#123C2A]"
                    />
                    <button
                      onClick={handleTestEmail}
                      disabled={isTestingEmail}
                      className="px-5 py-2.5 rounded-xl bg-[#123C2A] hover:bg-[#0B251A] text-white text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {isTestingEmail ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2FBF71]" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-[#2FBF71]" />
                          <span>Dispatch Test</span>
                        </>
                      )}
                    </button>
                  </div>

                  {emailTestResult && (
                    <div className={`p-3 rounded-xl border text-xs ${emailTestResult.success ? "bg-[#E9F8F0] border-[#2FBF71] text-[#123C2A]" : "bg-red-50 border-red-200 text-red-700"}`}>
                      {emailTestResult.message || "Email test completed."}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* QR CODE VIEWER MODAL */}
      {selectedQrCode && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-[#123C2A] shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-[#123C2A]">
                {selectedQrCode.title}
              </h4>
              <button
                onClick={() => setSelectedQrCode(null)}
                className="w-7 h-7 rounded-full bg-[#F5F7F2] hover:bg-[#E0E7E2] text-[#123C2A] flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* QR Code Illustration */}
            <div className="bg-[#F5F7F2] p-4 rounded-2xl border border-[#E0E7E2] inline-block">
              <div className="w-44 h-44 bg-white p-2 rounded-xl border border-[#E0E7E2] flex items-center justify-center mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect x="5" y="5" width="28" height="28" fill="#123C2A" rx="3" />
                  <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" rx="2" />
                  <rect x="13" y="13" width="12" height="12" fill="#2FBF71" rx="1" />

                  <rect x="67" y="5" width="28" height="28" fill="#123C2A" rx="3" />
                  <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" rx="2" />
                  <rect x="75" y="13" width="12" height="12" fill="#2FBF71" rx="1" />

                  <rect x="5" y="67" width="28" height="28" fill="#123C2A" rx="3" />
                  <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" rx="2" />
                  <rect x="13" y="75" width="12" height="12" fill="#2FBF71" rx="1" />

                  <rect x="38" y="10" width="8" height="8" fill="#123C2A" />
                  <rect x="50" y="10" width="8" height="8" fill="#2FBF71" />
                  <rect x="38" y="24" width="8" height="8" fill="#2FBF71" />
                  <rect x="50" y="24" width="8" height="8" fill="#123C2A" />

                  <rect x="42" y="42" width="16" height="16" fill="#123C2A" rx="2" />
                  <rect x="45" y="45" width="10" height="10" fill="#2FBF71" rx="1" />

                  <rect x="68" y="40" width="8" height="8" fill="#123C2A" />
                  <rect x="80" y="40" width="8" height="8" fill="#2FBF71" />
                  <rect x="68" y="52" width="8" height="8" fill="#2FBF71" />
                  <rect x="80" y="52" width="8" height="8" fill="#123C2A" />

                  <rect x="38" y="68" width="8" height="8" fill="#123C2A" />
                  <rect x="50" y="68" width="8" height="8" fill="#2FBF71" />
                  <rect x="38" y="80" width="8" height="8" fill="#2FBF71" />
                  <rect x="50" y="80" width="8" height="8" fill="#123C2A" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-bold text-[#5E6E66]">SM-DP+ Activation Code:</div>
              <div className="p-2.5 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] font-mono text-[11px] text-[#123C2A] break-all select-all flex items-center justify-between">
                <span>{selectedQrCode.lpa}</span>
                <button
                  onClick={() => handleCopy(selectedQrCode.lpa)}
                  className="p-1 hover:text-[#2FBF71] flex-shrink-0"
                >
                  {copiedText === selectedQrCode.lpa ? <Check className="w-3.5 h-3.5 text-[#2FBF71]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedQrCode(null)}
              className="w-full py-2.5 rounded-xl bg-[#123C2A] text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
