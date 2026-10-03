"use client";

import React, { useState, useEffect } from "react";
import { PAKISTAN_PLANS, PakistanPackage, CURRENCY_RATES, CurrencyCode } from "../data/destinations";
import {
  X,
  Check,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Copy,
  CheckCircle,
  Mail,
  Loader2,
  Lock,
  Sparkles,
  PhoneCall,
  MessageCircle,
  Clock,
  ExternalLink,
  CreditCard,
  Building2,
  Wallet,
  AlertCircle,
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  Paperclip,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface PlanModalProps {
  initialPlan?: PakistanPackage | null;
  currency: CurrencyCode;
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile?: () => void;
}

type PaymentOptionId = "jazzcash" | "easypaisa" | "nayapay" | "ubl";

export default function PlanModal({
  initialPlan,
  currency,
  isOpen,
  onClose,
  onOpenProfile,
}: PlanModalProps) {
  const { addPurchasedEsim } = useAuth();

  // 1. Dynamic packages from live vendor API
  const [plans, setPlans] = useState<PakistanPackage[]>(PAKISTAN_PLANS);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    initialPlan?.id || PAKISTAN_PLANS.find((p) => p.popular)?.id || PAKISTAN_PLANS[0].id
  );

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/packages");
        if (res.ok) {
          const data = await res.json();
          if (data?.packages && data.packages.length > 0) {
            const mapped: PakistanPackage[] = data.packages.map((v: any) => ({
              id: v.id,
              name: v.name.replace(/ in Pakistan/gi, "").replace(/ eSIM Data/gi, "").trim(),
              tier: v.tier || "Standard",
              data: v.dataFormatted || `${v.data_quantity} ${v.data_unit || "GB"}`,
              validity: v.validityFormatted || `${v.package_validity} Days`,
              priceUSD: v.price !== undefined ? Number(v.price) : Number(v.retailPriceUSD || 0.87),
              pricePKR: v.retailPricePKR ? Number(v.retailPricePKR) : Math.round((Number(v.price) || 0.87) * 278.5),
              popular: v.popular || (v.data_quantity === 10 && v.package_validity === 30),
              ptaStatus: "All eSIM Devices Supported",
              tethering: true,
              idealFor: `${v.package_validity} Days high-speed 4G data for communication and navigation`,
              speed: "4G / LTE Uncapped",
              network: "GloEsim Enterprise Roaming • Jazz 4G LTE",
              gloEsimId: v.id,
            }));
            setPlans(mapped);
          }
        }
      } catch (err) {
        // Fallback to static plans
      }
    }
    loadPackages();
  }, []);

  useEffect(() => {
    if (initialPlan?.id) {
      setSelectedPlanId(initialPlan.id);
    }
  }, [initialPlan]);

  // Modal Step State: 'select' -> 'payment_options' -> 'verifying' -> 'success'
  const [checkoutStep, setCheckoutStep] = useState<"select" | "payment_options" | "verifying" | "success">("select");
  const [filterValidity, setFilterValidity] = useState<string>("All");

  // Selected Payment Method
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOptionId>("jazzcash");

  // Form Inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [senderName, setSenderName] = useState("");
  const [transactionRef, setTransactionRef] = useState("");

  // Mandatory Invoice Upload State
  const [invoicePreview, setInvoicePreview] = useState<string | null>(null);
  const [invoiceFileName, setInvoiceFileName] = useState<string>("");
  const [invoiceFileSize, setInvoiceFileSize] = useState<string>("");
  const [invoiceError, setInvoiceError] = useState<string | null>(null);
  const [isProcessingInvoice, setIsProcessingInvoice] = useState(false);

  // Order & Verification State
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [isFulfilling, setIsFulfilling] = useState(false);
  const [liveOrder, setLiveOrder] = useState<any>(null);

  // Copy helpers
  const [copiedLpa, setCopiedLpa] = useState(false);
  const [copiedIccid, setCopiedIccid] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);
  const [adminBypassLoading, setAdminBypassLoading] = useState(false);

  const handleInvoiceFileChange = (file: File | null) => {
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setInvoiceError("File size exceeds 8MB. Please select a smaller screenshot or PDF invoice.");
      return;
    }

    setInvoiceError(null);
    setInvoiceFileName(file.name);
    setInvoiceFileSize(`${(file.size / 1024).toFixed(0)} KB`);
    setIsProcessingInvoice(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;

      if (file.type.startsWith("image/") && file.size > 800 * 1024) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1400;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL("image/jpeg", 0.82);
          setInvoicePreview(compressed);
          setIsProcessingInvoice(false);
        };
        img.onerror = () => {
          setInvoicePreview(dataUrl);
          setIsProcessingInvoice(false);
        };
        img.src = dataUrl;
      } else {
        setInvoicePreview(dataUrl);
        setIsProcessingInvoice(false);
      }
    };
    reader.onerror = () => {
      setInvoiceError("Failed to read file. Please select the receipt file again.");
      setIsProcessingInvoice(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveInvoice = () => {
    setInvoicePreview(null);
    setInvoiceFileName("");
    setInvoiceFileSize("");
    setInvoiceError(null);
  };

  // Poll for admin payment verification when in 'verifying' step
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutStep === "verifying" && activeOrderId && !isPaymentVerified) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/payment/status?orderId=${activeOrderId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.isVerified) {
              setIsPaymentVerified(true);
            }
          }
        } catch (err) {
          // Ignore network ping error
        }
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [checkoutStep, activeOrderId, isPaymentVerified]);

  if (!isOpen) return null;

  const currentRate = CURRENCY_RATES[currency].rate;
  const currentSymbol = CURRENCY_RATES[currency].symbol;

  const formatPrice = (pkg: PakistanPackage) => {
    if (currency === "PKR") {
      return `Rs ${pkg.pricePKR.toLocaleString()}`;
    }
    return `${currentSymbol}${(pkg.priceUSD * currentRate).toFixed(2)}`;
  };

  const selectedPlan =
    plans.find((p) => p.id === selectedPlanId) ||
    initialPlan ||
    plans[0];

  const modalFilteredPlans = plans.filter((p) => {
    if (filterValidity === "All") return true;
    if (filterValidity === "3-7 Days") {
      return p.validity.includes("3 Day") || p.validity.includes("5 Day") || p.validity.includes("7 Day");
    }
    if (filterValidity === "15 Days") return p.validity.includes("15 Day");
    if (filterValidity === "30 Days") return p.validity.includes("30 Day");
    return true;
  });

  const paymentOptions = [
    {
      id: "jazzcash" as PaymentOptionId,
      name: "JazzCash",
      subtitle: "Instant Mobile Account / QR",
      bankName: "JazzCash Mobile Account",
      accountTitle: "Muhammad Qadeer",
      accountNumber: "0336 5131223",
      iban: null,
      badge: "Instant",
      logo: "/jazzcash-logo.png",
      alt: "JazzCash",
      brandColor: "#E11D48",
      accentBg: "#FEF2F2",
      accentBorder: "#FECDD3",
    },
    {
      id: "easypaisa" as PaymentOptionId,
      name: "EasyPaisa",
      subtitle: "Instant Mobile Account / Raast",
      bankName: "EasyPaisa Digital Bank",
      accountTitle: "Muhammad Qadeer",
      accountNumber: "0336 5131223",
      iban: null,
      badge: "Instant",
      logo: "/easypaisa-logo.png",
      alt: "EasyPaisa",
      brandColor: "#00BA51",
      accentBg: "#ECFDF5",
      accentBorder: "#A7F3D0",
    },
    {
      id: "nayapay" as PaymentOptionId,
      name: "NayaPay",
      subtitle: "E-Wallet & Raast Transfer",
      bankName: "NayaPay Digital Wallet",
      accountTitle: "Muhammad Qadeer",
      accountNumber: "0336 5131223",
      iban: null,
      badge: "0% Fee",
      logo: "/nayapay-logo.svg",
      alt: "NayaPay",
      brandColor: "#FF5018",
      accentBg: "#FFF7ED",
      accentBorder: "#FFEDD5",
    },
    {
      id: "ubl" as PaymentOptionId,
      name: "United Bank Limited (UBL)",
      subtitle: "Direct Bank Transfer / IBFT",
      bankName: "United Bank Limited (UBL)",
      accountTitle: "Muhammad Qadeer",
      accountNumber: "314722184",
      iban: "PK46UNIL0109000314722184",
      badge: "Official Bank",
      logo: "/ubl-logo.png",
      alt: "United Bank Limited (UBL)",
      brandColor: "#2563EB",
      accentBg: "#EFF6FF",
      accentBorder: "#BFDBFE",
    },
  ];

  const currentOption = paymentOptions.find((o) => o.id === selectedPaymentOption) || paymentOptions[0];

  const handleCopyAccount = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyIban = (iban: string) => {
    navigator.clipboard?.writeText(iban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  // Submit payment proof and alert admin via email
  const handleSubmitPaymentNotice = async () => {
    if (!email || !email.includes("@")) {
      alert("Please provide a valid delivery email address for your eSIM activation details.");
      return;
    }
    if (!phone || phone.trim().length < 7) {
      alert("Please enter your mobile or WhatsApp phone number so we can verify your transfer.");
      return;
    }
    if (!invoicePreview) {
      setInvoiceError("Mandatory requirement: Please upload your payment receipt or transfer invoice screenshot before submitting for verification.");
      const el = document.getElementById("invoice-upload-container");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          dataAllowance: selectedPlan.data,
          validity: selectedPlan.validity,
          priceFormatted: formatPrice(selectedPlan),
          email,
          phone,
          senderName: `${currentOption.name} • ${senderName || "Customer"}`,
          transactionRef: transactionRef || `Paid via ${currentOption.name}`,
          paymentMethod: currentOption.name,
          invoiceData: invoicePreview,
          invoiceFileName: invoiceFileName || "payment_receipt.png",
        }),
      });

      const data = await res.json();
      if (data.success && data.orderId) {
        setActiveOrderId(data.orderId);
        setIsPaymentVerified(false);
        setCheckoutStep("verifying");
      } else {
        alert(data.error || "Could not record payment order. Please contact our helpline directly.");
      }
    } catch (err: any) {
      alert("Network error: " + err.message);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Admin Quick Verification (allows instant simulation of the admin email link)
  const handleAdminQuickVerify = async () => {
    if (!activeOrderId) return;
    setAdminBypassLoading(true);
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: activeOrderId }),
      });
      if (res.ok) {
        setIsPaymentVerified(true);
      }
    } catch (err) {
      console.warn("Could not verify order:", err);
    } finally {
      setAdminBypassLoading(false);
    }
  };

  // Payment is verified! Fulfill live GloEsim profile and reveal QR
  const handleFulfillOrder = async () => {
    if (!isPaymentVerified) return;
    setIsFulfilling(true);
    try {
      const res = await fetch("/api/payment/fulfill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: activeOrderId,
          planId: selectedPlan.id,
          email,
          planName: selectedPlan.name,
          dataAllowance: selectedPlan.data,
          validity: selectedPlan.validity,
          priceFormatted: formatPrice(selectedPlan),
        }),
      });

      const data = await res.json();
      if (data.success && data.order) {
        setLiveOrder(data.order);
        addPurchasedEsim(selectedPlan, email, {
          iccid: data.order.iccid,
          lpaCode: data.order.lpaCode,
          assignedOperator: data.order.assignedOperator,
          orderId: data.order.orderId,
        });
        setCheckoutStep("success");
      } else {
        alert(data.error || "Failed to provision profile from GloEsim provider.");
      }
    } catch (err: any) {
      alert("Fulfillment error: " + err.message);
    } finally {
      setIsFulfilling(false);
    }
  };

  const handleCopyLpa = () => {
    const lpaToCopy = liveOrder?.lpaCode || `LPA:1$${liveOrder?.smdpAddress || "consumer.rsp.dummy"}$${liveOrder?.matchingId || "dummy"}`;
    navigator.clipboard?.writeText(lpaToCopy);
    setCopiedLpa(true);
    setTimeout(() => setCopiedLpa(false), 2000);
  };

  const handleCopyIccid = () => {
    if (liveOrder?.iccid) {
      navigator.clipboard?.writeText(liveOrder.iccid);
      setCopiedIccid(true);
      setTimeout(() => setCopiedIccid(false), 2000);
    }
  };

  const handleResetAndClose = () => {
    setCheckoutStep("select");
    setEmail("");
    setPhone("");
    setSenderName("");
    setTransactionRef("");
    setActiveOrderId(null);
    setIsPaymentVerified(false);
    setLiveOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#123C2A]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl border-2 border-[#E0E7E2] shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-[#123C2A] text-[#FFFFFF] p-5 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2FBF71] text-[#FFFFFF] flex items-center justify-center font-extrabold text-xs tracking-wider shadow-xs">
              SIM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">Pakistan 4G eSIM</h2>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#2FBF71] text-[#FFFFFF] uppercase">
                  Official Provider
                </span>
              </div>
              <p className="text-xs text-[#A7E8C1] font-medium">
                GloEsim Enterprise Roaming • Jazz 4G LTE
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1A523A] hover:bg-[#2FBF71] text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: CHOOSE PACKAGE */}
          {checkoutStep === "select" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#123C2A] uppercase tracking-wider mb-0.5">
                    1. Choose Data Package
                  </h3>
                  <p className="text-xs text-[#5E6E66]">
                    Instant QR delivery • Continuous high-speed 4G data
                  </p>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-1 rounded bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1]">
                  15 Live Packages
                </span>
              </div>

              {/* Quick Validity Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: "All", label: "All Packages" },
                  { id: "3-7 Days", label: "3–7 Days" },
                  { id: "15 Days", label: "15 Days" },
                  { id: "30 Days", label: "30 Days" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterValidity(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      filterValidity === tab.id
                        ? "bg-[#123C2A] text-white shadow-xs"
                        : "bg-[#F8FAF9] text-[#5E6E66] border border-[#E0E7E2] hover:bg-[#E9F8F0]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Packages Grid: 2 columns */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-h-60 sm:max-h-64 overflow-y-auto pr-1">
                {modalFilteredPlans.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-[#2FBF71] bg-[#E9F8F0]"
                          : "border-[#E0E7E2] bg-[#FFFFFF] hover:border-[#A7E8C1]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm sm:text-base font-black text-[#123C2A]">
                          {plan.data}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                            isSelected
                              ? "border-[#2FBF71] bg-[#2FBF71] text-white"
                              : "border-[#8E9E96] bg-transparent"
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="text-[10px] sm:text-xs font-semibold text-[#5E6E66] mb-2">
                        {plan.validity}
                      </div>

                      <div className="pt-1.5 border-t border-[#E0E7E2] flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-extrabold text-[#123C2A]">
                          {formatPrice(plan)}
                        </span>
                        {plan.popular && (
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#2FBF71] text-white uppercase">
                            Hot
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guarantee Box */}
              <div className="bg-[#F5F7F2] p-3 rounded-2xl border border-[#E0E7E2] grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#5E6E66]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span>Zero Device Tax Required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span>Never Gets Blocked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span>Free Hotspot Sharing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span>Direct Operator Roaming</span>
                </div>
              </div>

              {/* Action Button: Moves to Payment Options */}
              <button
                onClick={() => setCheckoutStep("payment_options")}
                className="w-full py-3.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm"
              >
                <span>Select Payment Option · {formatPrice(selectedPlan)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: SELECT PAYMENT OPTION & ENTER CONTACT INFO */}
          {checkoutStep === "payment_options" && (
            <div className="space-y-4">
              <div>
                <button
                  onClick={() => setCheckoutStep("select")}
                  className="text-xs font-bold text-[#5E6E66] hover:text-[#123C2A] mb-2 flex items-center gap-1"
                >
                  ← Change Package
                </button>
                <h3 className="text-base sm:text-lg font-black text-[#123C2A]">
                  2. Choose Payment Option
                </h3>
                <p className="text-xs text-[#5E6E66]">
                  Select how you want to pay. Send payment and submit proof to request verification.
                </p>
              </div>

              {/* Selected Plan Summary Banner */}
              <div className="p-3.5 rounded-2xl bg-[#E9F8F0] border border-[#A7E8C1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#123C2A]/70 block">
                    Selected Package
                  </span>
                  <div className="text-sm font-extrabold text-[#123C2A]">
                    {selectedPlan.name} ({selectedPlan.data} • {selectedPlan.validity})
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#123C2A]/70 block">
                    Total Amount
                  </span>
                  <div className="text-base font-black text-[#123C2A]">
                    {formatPrice(selectedPlan)}
                  </div>
                </div>
              </div>

              {/* PAYMENT OPTIONS SELECTOR (JazzCash, EasyPaisa, Bank, WhatsApp) */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-[#123C2A] uppercase tracking-wider block">
                  Select Your Payment Method:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {paymentOptions.map((opt) => {
                    const isSelected = selectedPaymentOption === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedPaymentOption(opt.id)}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-2.5 ${
                          isSelected
                            ? "border-[#2FBF71] bg-[#E9F8F0] ring-2 ring-[#2FBF71]/20 shadow-xs"
                            : "border-[#E0E7E2] bg-white hover:border-[#A7E8C1] hover:bg-[#F8FAF9]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-white border border-[#E0E7E2] p-1 flex items-center justify-center flex-shrink-0 shadow-2xs">
                            <img
                              src={opt.logo}
                              alt={opt.alt}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-extrabold text-xs text-[#123C2A] truncate">
                              {opt.name}
                            </div>
                            <p className="text-[10px] text-[#5E6E66] truncate">{opt.subtitle}</p>
                          </div>
                        </div>

                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            isSelected ? "bg-[#2FBF71] text-white" : "bg-[#F0F4F2] text-[#123C2A]"
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DISPLAY SELECTED PAYMENT ACCOUNT DETAILS */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border-2 border-[#123C2A] space-y-3">
                <div className="flex items-center justify-between border-b border-[#E0E7E2] pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E0E7E2] p-1 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <img
                        src={currentOption.logo}
                        alt={currentOption.alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6E66] block">
                        Payment Instructions
                      </span>
                      <div className="text-xs sm:text-sm font-black text-[#123C2A]">
                        Send {formatPrice(selectedPlan)} via {currentOption.name}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] flex-shrink-0">
                    Official Verified
                  </span>
                </div>

                {selectedPaymentOption === "jazzcash" && (
                  <div className="bg-white p-4 rounded-xl border border-[#E0E7E2] space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <div className="flex items-center gap-2">
                        <img src="/jazzcash-logo.png" alt="JazzCash" className="h-6 w-auto object-contain" />
                        <span className="font-bold text-[#123C2A]">JazzCash Mobile Account</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FEF2F2] text-[#E11D48] border border-[#FECDD3]">
                        Instant Transfer
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <span className="text-[#5E6E66] font-semibold">Account Title:</span>
                      <strong className="text-[#123C2A] font-extrabold text-sm text-[#2FBF71]">Muhammad Qadeer</strong>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="text-[10px] text-[#5E6E66] block font-semibold">JazzCash Mobile Number:</span>
                        <strong className="text-base font-black font-mono text-[#123C2A] select-all">
                          0336 5131223
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount("03365131223")}
                        className="px-3.5 py-2 rounded-lg bg-[#123C2A] text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#1A523A] transition-colors shadow-xs"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedAccount ? "Copied!" : "Copy Number"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {selectedPaymentOption === "easypaisa" && (
                  <div className="bg-white p-4 rounded-xl border border-[#E0E7E2] space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <div className="flex items-center gap-2">
                        <img src="/easypaisa-logo.png" alt="EasyPaisa" className="h-6 w-auto object-contain" />
                        <span className="font-bold text-[#123C2A]">EasyPaisa Digital Bank</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ECFDF5] text-[#00BA51] border border-[#A7F3D0]">
                        Instant Raast
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <span className="text-[#5E6E66] font-semibold">Account Title:</span>
                      <strong className="text-[#123C2A] font-extrabold text-sm text-[#2FBF71]">Muhammad Qadeer</strong>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="text-[10px] text-[#5E6E66] block font-semibold">EasyPaisa Account Number:</span>
                        <strong className="text-base font-black font-mono text-[#123C2A] select-all">
                          0336 5131223
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount("03365131223")}
                        className="px-3.5 py-2 rounded-lg bg-[#00BA51] text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#009c43] transition-colors shadow-xs"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedAccount ? "Copied!" : "Copy Number"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {selectedPaymentOption === "nayapay" && (
                  <div className="bg-white p-4 rounded-xl border border-[#E0E7E2] space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <div className="flex items-center gap-2">
                        <img src="/nayapay-logo.svg" alt="NayaPay" className="h-5 w-auto object-contain" />
                        <span className="font-bold text-[#123C2A]">NayaPay Digital Wallet</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFF7ED] text-[#FF5018] border border-[#FFEDD5]">
                        0% Fee / Raast
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <span className="text-[#5E6E66] font-semibold">Account Title:</span>
                      <strong className="text-[#123C2A] font-extrabold text-sm text-[#2FBF71]">Muhammad Qadeer</strong>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="text-[10px] text-[#5E6E66] block font-semibold">NayaPay Mobile / Raast ID:</span>
                        <strong className="text-base font-black font-mono text-[#123C2A] select-all">
                          0336 5131223
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount("03365131223")}
                        className="px-3.5 py-2 rounded-lg bg-[#FF5018] text-white text-[11px] font-bold flex items-center gap-1.5 hover:bg-[#e04512] transition-colors shadow-xs"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedAccount ? "Copied!" : "Copy Number"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {selectedPaymentOption === "ubl" && (
                  <div className="bg-white p-4 rounded-xl border border-[#E0E7E2] space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <div className="flex items-center gap-2">
                        <img src="/ubl-logo.png" alt="United Bank Limited (UBL)" className="h-6 w-auto object-contain" />
                        <span className="font-bold text-[#123C2A]">United Bank Limited (UBL)</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                        1-Link / IBFT / Raast
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <span className="text-[#5E6E66] font-semibold">Account Title:</span>
                      <strong className="text-[#123C2A] font-extrabold text-sm text-[#2FBF71]">Muhammad Qadeer</strong>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                      <div>
                        <span className="text-[10px] text-[#5E6E66] block font-semibold">Account Number:</span>
                        <strong className="text-sm font-black font-mono text-[#123C2A] select-all">
                          314722184
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount("314722184")}
                        className="px-3 py-1.5 rounded-lg bg-[#123C2A] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#1A523A] transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedAccount ? "Copied!" : "Copy Number"}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-0.5">
                      <div className="overflow-hidden pr-2">
                        <span className="text-[10px] text-[#5E6E66] block font-semibold">IBAN (IBFT / Raast / All Banks):</span>
                        <strong className="text-xs font-black font-mono text-[#123C2A] select-all break-all">
                          PK46UNIL0109000314722184
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyIban("PK46UNIL0109000314722184")}
                        className="px-3 py-1.5 rounded-lg bg-[#2FBF71] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#26A561] transition-colors flex-shrink-0"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedIban ? "Copied!" : "Copy IBAN"}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Helpline Link */}
                <div className="flex items-center justify-between pt-1 text-xs text-[#5E6E66]">
                  <span>Need assistance with payment?</span>
                  <a
                    href="https://wa.me/923365131223?text=Hi%20SproutSIM,%20I%20need%20help%20with%20payment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2FBF71] font-bold flex items-center gap-1 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp: +92 336 5131223</span>
                  </a>
                </div>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#123C2A] uppercase tracking-wider flex items-center justify-between">
                    <span>Delivery Email Address *</span>
                    <span className="text-[10px] text-[#2FBF71] font-semibold">eSIM QR sent here</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E0E7E2] focus:border-[#2FBF71] text-xs font-semibold text-[#1C2420] focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#123C2A] uppercase tracking-wider flex items-center justify-between">
                    <span>Your WhatsApp / Mobile Number *</span>
                    <span className="text-[10px] text-[#5E6E66] font-normal">For payment verification</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E0E7E2] focus:border-[#2FBF71] text-xs font-semibold text-[#1C2420] focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#123C2A] uppercase tracking-wider">
                    Sender Name / Transaction ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder={`e.g. ${currentOption.name} Tx ID or Sender Name`}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E0E7E2] focus:border-[#2FBF71] text-xs font-semibold text-[#1C2420] focus:outline-none"
                  />
                </div>

                {/* MANDATORY PAYMENT INVOICE / RECEIPT UPLOAD CONTAINER */}
                <div id="invoice-upload-container" className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-[#123C2A] uppercase tracking-wider flex items-center gap-1.5">
                      <Paperclip className="w-3.5 h-3.5 text-[#2FBF71]" />
                      <span>Upload Payment Invoice / Receipt *</span>
                    </label>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
                      Mandatory
                    </span>
                  </div>
                  <p className="text-[10px] text-[#5E6E66]">
                    Please attach the screenshot or official PDF receipt from your {currentOption.name} app showing the transfer to Muhammad Qadeer.
                  </p>

                  {invoiceError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                      <span>{invoiceError}</span>
                    </div>
                  )}

                  {!invoicePreview ? (
                    <label
                      htmlFor="invoice-upload-input"
                      className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                        invoiceError
                          ? "border-rose-400 bg-rose-50/50"
                          : "border-[#A7E8C1] bg-[#F8FAF9] hover:bg-[#E9F8F0] hover:border-[#2FBF71]"
                      }`}
                    >
                      <input
                        id="invoice-upload-input"
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={(e) => handleInvoiceFileChange(e.target.files?.[0] || null)}
                      />
                      <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-[#E0E7E2] flex items-center justify-center text-[#2FBF71]">
                        {isProcessingInvoice ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <UploadCloud className="w-5 h-5" />
                        )}
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-bold text-[#123C2A] block">
                          Click to Browse or Drag &amp; Drop Invoice / Receipt
                        </span>
                        <span className="text-[10px] text-[#5E6E66] block mt-0.5">
                          PNG, JPG, WEBP, or PDF screenshot (Max 8MB)
                        </span>
                      </div>
                    </label>
                  ) : (
                    <div className="p-3 rounded-2xl bg-[#E9F8F0] border-2 border-[#2FBF71] flex items-center justify-between gap-3 shadow-2xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-white border border-[#A7E8C1] overflow-hidden flex-shrink-0 flex items-center justify-center shadow-xs">
                          {invoicePreview.startsWith("data:image") ? (
                            <img src={invoicePreview} alt="Receipt preview" className="w-full h-full object-cover" />
                          ) : (
                            <FileText className="w-6 h-6 text-[#2FBF71]" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
                            <span className="text-xs font-extrabold text-[#123C2A] truncate">
                              {invoiceFileName || "Receipt Attached"}
                            </span>
                          </div>
                          <span className="text-[10px] font-medium text-[#5E6E66] block mt-0.5">
                            {invoiceFileSize} · Verified Ready for Admin
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveInvoice}
                        className="p-2 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors flex-shrink-0 shadow-2xs"
                        title="Remove and select another file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Payment Notice Button */}
              <button
                disabled={isSubmittingOrder}
                onClick={handleSubmitPaymentNotice}
                className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-md ${
                  !invoicePreview
                    ? "bg-[#123C2A] hover:bg-[#1A523A] text-white"
                    : "bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF]"
                }`}
              >
                {isSubmittingOrder ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading Invoice &amp; Alerting Admin...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {!invoicePreview
                        ? "Attach Invoice & Submit for Verification"
                        : "I Have Sent Payment · Submit for Verification"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: LIVE PAYMENT VERIFICATION STATUS SCREEN */}
          {checkoutStep === "verifying" && (
            <div className="space-y-5 text-center py-2">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all">
                {isPaymentVerified ? (
                  <div className="w-16 h-16 rounded-full bg-[#E9F8F0] border-2 border-[#2FBF71] text-[#2FBF71] flex items-center justify-center animate-in zoom-in ring-4 ring-[#2FBF71]/20">
                    <CheckCircle className="w-9 h-9" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-400 text-amber-500 flex items-center justify-center">
                    <Clock className="w-8 h-8 animate-spin" />
                  </div>
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#F0F4F2] text-[#5E6E66]">
                  Order ID: {activeOrderId}
                </span>

                <h3 className="text-lg sm:text-xl font-black text-[#123C2A] mt-2">
                  {isPaymentVerified ? "Payment Verified & Approved!" : "Awaiting Admin Payment Verification"}
                </h3>

                <p className="text-xs text-[#5E6E66] max-w-sm mx-auto mt-1 leading-relaxed">
                  {isPaymentVerified
                    ? "Admin has verified your payment! The button below is now active. Click it to reveal your live eSIM QR code."
                    : "A verification email has been sent to our administrator (business@sproutsim.cloud). As soon as they verify, this button below will automatically turn GREEN and become active."}
                </p>
              </div>

              {/* Status Box */}
              <div
                className={`p-4 rounded-2xl border-2 text-left space-y-2 transition-all ${
                  isPaymentVerified
                    ? "bg-[#E9F8F0] border-[#2FBF71]"
                    : "bg-[#FFFBEB] border-amber-300"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#123C2A]">Payment Status:</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase ${
                      isPaymentVerified
                        ? "bg-[#2FBF71] text-white"
                        : "bg-amber-400 text-amber-950 animate-pulse"
                    }`}
                  >
                    {isPaymentVerified ? "✓ Verified (Green Light)" : "● Pending Admin Email Approval"}
                  </span>
                </div>

                <div className="text-xs text-[#5E6E66] flex justify-between">
                  <span>Selected Package:</span>
                  <strong className="text-[#123C2A]">{selectedPlan.name} ({selectedPlan.data})</strong>
                </div>

                <div className="text-xs text-[#5E6E66] flex justify-between">
                  <span>Total Amount:</span>
                  <strong className="text-[#123C2A]">{formatPrice(selectedPlan)}</strong>
                </div>

                <div className="text-xs text-[#5E6E66] flex justify-between items-center">
                  <span>Payment Channel:</span>
                  <span className="flex items-center gap-1.5 font-bold text-[#123C2A]">
                    <img src={currentOption.logo} alt={currentOption.name} className="h-4 w-auto object-contain" />
                    <span>{currentOption.name}</span>
                  </span>
                </div>

                <div className="text-xs text-[#5E6E66] flex justify-between">
                  <span>Customer Phone:</span>
                  <strong className="text-[#123C2A]">{phone}</strong>
                </div>
              </div>

              {/* Helpline Quick Contact Options */}
              {!isPaymentVerified && (
                <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-[#E0E7E2] space-y-2 text-xs">
                  <div className="text-[11px] font-bold text-[#123C2A]">
                    Want instant approval? Contact our helpline now:
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <a
                      href={`https://wa.me/923365131223?text=Hi%20SproutSIM,%20I%20have%20sent%20payment%20for%20order%20${activeOrderId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#2FBF71] text-white font-bold flex items-center gap-1.5 hover:bg-[#26A561] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Helpline</span>
                    </a>
                    <a
                      href="tel:+923365131223"
                      className="px-3.5 py-2 rounded-xl bg-[#123C2A] text-white font-bold flex items-center gap-1.5 hover:bg-[#1A523A] transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Helpline</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Admin Instant Verification Simulation Helper */}
              {!isPaymentVerified && (
                <div className="pt-1">
                  <button
                    disabled={adminBypassLoading}
                    onClick={handleAdminQuickVerify}
                    className="text-[11px] font-bold text-[#2FBF71] hover:text-[#123C2A] underline flex items-center justify-center gap-1 mx-auto"
                  >
                    {adminBypassLoading ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    <span>[Admin / Test] Click to Simulate Admin Email Approval</span>
                  </button>
                </div>
              )}

              {/* THE BUTTON: NOT ENABLED UNTIL VERIFIED! TURNS GREEN WHEN VERIFIED */}
              <div className="pt-2">
                <button
                  disabled={!isPaymentVerified || isFulfilling}
                  onClick={handleFulfillOrder}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    isPaymentVerified
                      ? "bg-[#2FBF71] hover:bg-[#26A561] text-white ring-4 ring-[#2FBF71]/30 active:scale-98 cursor-pointer animate-in zoom-in"
                      : "bg-[#E0E7E2] text-[#8E9E96] cursor-not-allowed opacity-60"
                  }`}
                >
                  {isFulfilling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Provisioning Live GloEsim Profile...</span>
                    </>
                  ) : isPaymentVerified ? (
                    <>
                      <span>✓ Payment Verified · Reveal eSIM QR Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Payment Not Verified Yet (Disabled)</span>
                    </>
                  )}
                </button>
                
                {!isPaymentVerified && (
                  <p className="text-[10px] text-[#8E9E96] mt-2">
                    This button is locked until the admin verifies your payment via email link or helpline.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: REAL LIVE ESIM PROFILE & QR CODE (ZERO DUMMY DATA) */}
          {checkoutStep === "success" && liveOrder && (
            <div className="text-center space-y-4 py-1">
              <div className="w-12 h-12 rounded-full bg-[#E9F8F0] text-[#2FBF71] mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] uppercase tracking-wider">
                  Live GloEsim Profile Active
                </span>
                <h3 className="text-lg font-extrabold text-[#123C2A] mt-1.5">
                  Your Pakistan eSIM is Ready!
                </h3>
                <p className="text-xs text-[#5E6E66] max-w-xs mx-auto mt-1">
                  Delivered to <strong className="text-[#123C2A]">{email}</strong>. Scan this GSMA activation QR code on your phone camera now.
                </p>
              </div>

              {/* Real QR Code Box */}
              <div className="bg-[#F8FAF9] border-2 border-[#123C2A] p-4 rounded-2xl max-w-[240px] mx-auto shadow-md">
                <div className="w-44 h-44 bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2] flex items-center justify-center mx-auto shadow-xs">
                  <img
                    src={liveOrder.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(liveOrder.lpaCode)}`}
                    alt="Official GSMA eSIM QR Code"
                    className="w-full h-full block object-contain"
                  />
                </div>
                <div className="mt-2 text-[10px] font-bold text-[#123C2A] font-mono truncate">
                  SM-DP+: {liveOrder.smdpAddress || "consumer.rsp.dummy"}
                </div>
              </div>

              {/* Real Telemetry Table */}
              <div className="p-3 bg-[#F8FAF9] rounded-2xl border border-[#E0E7E2] text-left text-xs space-y-1.5">
                <div className="flex justify-between items-center text-[#5E6E66]">
                  <span>GloEsim Order ID:</span>
                  <span className="font-mono font-bold text-[#123C2A] select-all">{liveOrder.orderId}</span>
                </div>
                <div className="flex justify-between items-center text-[#5E6E66]">
                  <span>ICCID (SIM Number):</span>
                  <div className="flex items-center gap-1 font-mono font-bold text-[#123C2A]">
                    <span className="select-all">{liveOrder.iccid}</span>
                    <button
                      onClick={handleCopyIccid}
                      className="text-[10px] text-[#2FBF71] hover:underline"
                    >
                      {copiedIccid ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[#5E6E66]">
                  <span>Roaming Operator:</span>
                  <span className="font-bold text-[#123C2A]">{liveOrder.assignedOperator || "GloEsim Enterprise Roaming • Jazz 4G LTE"}</span>
                </div>
                <div className="flex justify-between items-center text-[#5E6E66]">
                  <span>Active Data:</span>
                  <span className="font-bold text-[#2FBF71]">{selectedPlan.data} ({selectedPlan.validity})</span>
                </div>
              </div>

              {/* Real LPA String with Copy */}
              <div className="space-y-1 text-left">
                <label className="text-[10px] font-bold text-[#123C2A] uppercase tracking-wider block">
                  Manual Activation Code (LPA String):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={liveOrder.lpaCode}
                    className="bg-[#F8FAF9] border border-[#E0E7E2] px-2.5 py-2 rounded-xl text-[11px] font-mono text-[#1C2420] w-full select-all"
                  />
                  <button
                    onClick={handleCopyLpa}
                    className="px-3.5 py-2 rounded-xl bg-[#123C2A] text-white text-xs font-bold flex items-center gap-1 hover:bg-[#1A523A] transition-colors flex-shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLpa ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Direct Setup Links for iOS & Android */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {liveOrder.universalLink && (
                  <a
                    href={liveOrder.universalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#F0F4F2] hover:bg-[#E0E7E2] text-[#123C2A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#E0E7E2]"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Apple iOS Setup</span>
                  </a>
                )}
                {liveOrder.redeemLink && (
                  <a
                    href={liveOrder.redeemLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#E9F8F0] hover:bg-[#A7E8C1] text-[#123C2A] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#A7E8C1]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>GloEsim Portal</span>
                  </a>
                )}
              </div>

              {/* Bottom Navigation */}
              <div className="space-y-2 pt-1">
                {onOpenProfile && (
                  <button
                    onClick={() => {
                      handleResetAndClose();
                      onOpenProfile();
                    }}
                    className="w-full py-3 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>View in My Profile &amp; Monitor MBs</span>
                  </button>
                )}

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2.5 rounded-xl bg-[#123C2A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1A523A] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
