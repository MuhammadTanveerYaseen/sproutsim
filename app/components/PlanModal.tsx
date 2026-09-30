"use client";

import React, { useState } from "react";
import { PAKISTAN_PLANS, PakistanPackage, CURRENCY_RATES, CurrencyCode } from "../data/destinations";
import { X, Check, ShieldCheck, Smartphone, ArrowRight, Copy, CheckCircle, Mail, Loader2, Lock, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface PlanModalProps {
  initialPlan?: PakistanPackage | null;
  currency: CurrencyCode;
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile?: () => void;
}

export default function PlanModal({
  initialPlan,
  currency,
  isOpen,
  onClose,
  onOpenProfile,
}: PlanModalProps) {
  const { addPurchasedEsim } = useAuth();
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    initialPlan?.id || PAKISTAN_PLANS.find((p) => p.popular)?.id || PAKISTAN_PLANS[0].id
  );
  const [checkoutStep, setCheckoutStep] = useState<"select" | "checkout" | "success">("select");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [copied, setCopied] = useState(false);

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
    PAKISTAN_PLANS.find((p) => p.id === selectedPlanId) ||
    initialPlan ||
    PAKISTAN_PLANS[0];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("LPA:1$smdp.sproutsim.io$SPROUTSIM-PK");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmAndSend = async () => {
    if (!email || !email.includes("@")) {
      alert("Please provide a valid email address to receive your eSIM QR code.");
      return;
    }

    setIsSending(true);

    try {
      await fetch("/api/send-esim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          planName: `${selectedPlan.name} (4G Data)`,
          dataAllowance: selectedPlan.data,
          validity: selectedPlan.validity,
          priceFormatted: formatPrice(selectedPlan),
        }),
      });
    } catch (err) {
      console.error("Email dispatch notice:", err);
    } finally {
      setIsSending(false);
      addPurchasedEsim(selectedPlan, email);
      setCheckoutStep("success");
    }
  };

  const handleResetAndClose = () => {
    setCheckoutStep("select");
    setEmail("");
    setIsSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#123C2A]/70 flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] rounded-3xl border-2 border-[#E0E7E2] shadow-2xl overflow-hidden my-4 sm:my-8">
        
        {/* Modal Header */}
        <div className="bg-[#123C2A] text-[#FFFFFF] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2FBF71] text-[#FFFFFF] flex items-center justify-center font-extrabold text-xs tracking-wider">
              SIM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">Pakistan 4G eSIM</h2>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#2FBF71] text-[#FFFFFF] uppercase">
                  Instant Setup
                </span>
              </div>
              <p className="text-xs text-[#A7E8C1] font-medium">
                High-Speed 4G Data • Continuous Connectivity
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6">
          {checkoutStep === "select" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#123C2A] uppercase tracking-wider mb-1">
                  Choose your data package
                </h3>
                <p className="text-xs text-[#5E6E66]">
                  Instant QR delivery. High-speed 4G data active in under 2 minutes.
                </p>
              </div>

              {/* Plan Options: 2 columns on mobile */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {PAKISTAN_PLANS.map((plan) => {
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
                      <div className="flex items-center justify-between mb-2">
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

                      <div className="pt-2 border-t border-[#E0E7E2] flex items-center justify-between">
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

              {/* Perks Grid: 2 columns and 2 rows on mobile */}
              <div className="bg-[#F5F7F2] p-3.5 rounded-2xl border border-[#E0E7E2]">
                <div className="text-[11px] font-bold text-[#123C2A] uppercase tracking-wider mb-2">
                  Included with Every Package:
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#5E6E66]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                    <span>No Device Tax Needed</span>
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
                    <span>Instant Email Dispatch</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setCheckoutStep("checkout")}
                className="w-full py-3.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>Continue ({formatPrice(selectedPlan)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {checkoutStep === "checkout" && (
            <div className="space-y-5">
              <div>
                <button
                  onClick={() => setCheckoutStep("select")}
                  className="text-xs font-bold text-[#5E6E66] hover:text-[#123C2A] mb-2 flex items-center gap-1"
                >
                  ← Back to plan selection
                </button>
                <h3 className="text-base sm:text-lg font-extrabold text-[#123C2A]">
                  eSIM Delivery Details
                </h3>
                <p className="text-xs text-[#5E6E66]">
                  Enter your email address where your eSIM activation QR code will be dispatched.
                </p>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-[#F5F7F2] border border-[#E0E7E2] space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold text-[#123C2A]">
                  <span>{selectedPlan.name} ({selectedPlan.data})</span>
                  <span>{formatPrice(selectedPlan)}</span>
                </div>
                <div className="flex justify-between items-center text-[#5E6E66]">
                  <span>Device Registration Tax</span>
                  <span className="text-[#2FBF71] font-bold">Rs 0 (EXEMPT)</span>
                </div>
                <div className="flex justify-between items-center text-[#5E6E66]">
                  <span>Validity Period</span>
                  <span>{selectedPlan.validity}</span>
                </div>
                <div className="pt-2 border-t border-[#E0E7E2] flex justify-between items-center text-sm font-extrabold text-[#123C2A]">
                  <span>Total Amount</span>
                  <span>{formatPrice(selectedPlan)}</span>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#123C2A] uppercase tracking-wider flex items-center justify-between">
                  <span>Your Delivery Email</span>
                  <span className="text-[10px] text-[#2FBF71] font-semibold flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Hostinger Secure Dispatch
                  </span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. yourname@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E0E7E2] focus:border-[#2FBF71] text-xs font-semibold text-[#1C2420] focus:outline-none"
                />
              </div>

              {/* Confirm */}
              <button
                disabled={isSending}
                onClick={handleConfirmAndSend}
                className="w-full py-3.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-98 disabled:opacity-60"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching via Hostinger...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Send to Email</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {checkoutStep === "success" && (
            <div className="text-center space-y-4 py-1">
              <div className="w-12 h-12 rounded-full bg-[#E9F8F0] text-[#2FBF71] mx-auto flex items-center justify-center">
                <CheckCircle className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-[#123C2A]">
                  Your eSIM is Ready!
                </h3>
                <p className="text-xs text-[#5E6E66] max-w-xs mx-auto mt-1">
                  Dispatched to <strong className="text-[#123C2A]">{email}</strong>. Scan the QR code below on your phone now.
                </p>
              </div>

              {/* QR Box */}
              <div className="bg-[#F5F7F2] border-2 border-[#123C2A] p-4 rounded-2xl max-w-[200px] mx-auto">
                <div className="w-36 h-36 bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2] flex items-center justify-center mx-auto">
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
                    <rect x="10" y="38" width="8" height="8" fill="#123C2A" />
                    <rect x="24" y="38" width="8" height="8" fill="#2FBF71" />
                    <rect x="38" y="38" width="8" height="8" fill="#123C2A" />
                    <rect x="50" y="38" width="8" height="8" fill="#123C2A" />
                    <rect x="64" y="38" width="8" height="8" fill="#2FBF71" />
                    <rect x="78" y="38" width="8" height="8" fill="#123C2A" />
                    <rect x="38" y="52" width="8" height="8" fill="#2FBF71" />
                    <rect x="50" y="52" width="8" height="8" fill="#123C2A" />
                    <rect x="64" y="52" width="8" height="8" fill="#2FBF71" />
                    <rect x="78" y="52" width="8" height="8" fill="#123C2A" />
                  </svg>
                </div>
                <div className="mt-2 text-[9px] font-bold text-[#123C2A]">
                  SM-DP+: smdp.sproutsim.io
                </div>
              </div>

              {/* Code */}
              <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                <input
                  readOnly
                  value="LPA:1$smdp.sproutsim.io$SPROUTSIM-PK"
                  className="bg-[#F5F7F2] border border-[#E0E7E2] px-2.5 py-1.5 rounded-xl text-[11px] font-mono text-[#1C2420] w-full"
                />
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-xl bg-[#123C2A] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-[#1A523A] transition-colors flex-shrink-0"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>

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
                    <span>View in My Profile &amp; Track MBs</span>
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
