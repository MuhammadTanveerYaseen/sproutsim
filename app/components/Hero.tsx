"use client";

import React, { useState } from "react";
import { Zap, ShieldCheck, Smartphone, ArrowRight, CheckCircle2, Wifi, Lock, QrCode, Sparkles, RefreshCw } from "lucide-react";
import { PAKISTAN_PLANS, PakistanPackage } from "../data/destinations";

interface HeroProps {
  onOpenPakistanModal: (plan?: PakistanPackage) => void;
  onFilterPlan: (tag: string) => void;
}

export default function Hero({
  onOpenPakistanModal,
  onFilterPlan,
}: HeroProps) {
  const [selectedHeroPlan, setSelectedHeroPlan] = useState<PakistanPackage>(
    PAKISTAN_PLANS.find((p) => p.popular) || PAKISTAN_PLANS[13] || PAKISTAN_PLANS[0]
  );
  const [showQrPreview, setShowQrPreview] = useState(false);
  const [simulatedUsage, setSimulatedUsage] = useState(3.4);

  const quickDurations = [
    { label: "1 GB · 3 Days", plan: PAKISTAN_PLANS[0] },
    { label: "3 GB · 7 Days", plan: PAKISTAN_PLANS[6] || PAKISTAN_PLANS[0] },
    { label: "10 GB · 30 Days (Hot)", plan: PAKISTAN_PLANS[13] || PAKISTAN_PLANS[0] },
    { label: "20 GB · 30 Days", plan: PAKISTAN_PLANS[14] || PAKISTAN_PLANS[0] },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAF9] via-[#FFFFFF] to-[#FFFFFF] py-10 sm:py-16 lg:py-20 border-b border-[#E5EBE7]">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#2FBF71]/8 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Value Prop & Quick Selector */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Live Network Roaming Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold tracking-tight shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FBF71] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2FBF71]"></span>
              </span>
              <span>Live 4G/LTE Roaming Active · GloEsim Enterprise Roaming • Jazz 4G LTE</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-[#123C2A] tracking-tight leading-[1.15]">
                Continuous 4G Data in Pakistan.{" "}
                <span className="text-[#2FBF71]">Instant eSIM.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#4A5D53] max-w-xl leading-relaxed font-normal">
                Keep any imported or unlocked smartphone online 365 days a year. Built on carrier-grade international roaming protocols with zero device registration hurdles, zero biometric queues, and instant QR delivery in under 60 seconds.
              </p>
            </div>

            {/* Interactive Quick Duration Selector & Action Bar */}
            <div className="bg-[#FFFFFF] p-3 sm:p-4 rounded-2xl border-2 border-[#123C2A] shadow-md max-w-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#123C2A]">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#2FBF71]" />
                  <span>Select Trip Duration</span>
                </span>
                <span className="text-[#2FBF71] font-mono text-[11px] uppercase tracking-wider">
                  Instant Setup
                </span>
              </div>

              {/* Duration Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {quickDurations.map((item) => {
                  const isSelected = selectedHeroPlan.id === item.plan.id;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setSelectedHeroPlan(item.plan)}
                      className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                        isSelected
                          ? "bg-[#123C2A] text-white shadow-xs"
                          : "bg-[#F5F7F2] text-[#1C2420] hover:bg-[#E9F8F0] border border-[#E0E7E2]"
                      }`}
                    >
                      <div className="truncate">{item.plan.data}</div>
                      <div className="text-[10px] opacity-80">{item.plan.validity}</div>
                    </button>
                  );
                })}
              </div>

              {/* Action Button & Live Selected Price */}
              <div className="pt-2 border-t border-[#F0F4F2] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5E6E66] block">
                    Starting from
                  </span>
                  <div className="text-base sm:text-lg font-black text-[#123C2A] leading-tight">
                    Rs {selectedHeroPlan.pricePKR.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-[#5E6E66]">
                      (${selectedHeroPlan.priceUSD.toFixed(2)} USD)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenPakistanModal(selectedHeroPlan)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all shadow-sm active:scale-95 flex-shrink-0"
                >
                  <span>Get eSIM Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Pick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap pb-1 pt-1">
              <span className="text-xs font-bold text-[#5E6E66] flex-shrink-0">Popular Plans:</span>
              {[PAKISTAN_PLANS[0], PAKISTAN_PLANS[6], PAKISTAN_PLANS[10], PAKISTAN_PLANS[13], PAKISTAN_PLANS[14]].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedHeroPlan(p);
                    onFilterPlan(p.data);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedHeroPlan.id === p.id
                      ? "bg-[#123C2A] text-white"
                      : "bg-[#F5F7F2] hover:bg-[#E9F8F0] text-[#123C2A] border border-[#E0E7E2]"
                  }`}
                >
                  {p.data} · Rs {p.pricePKR.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Core Trust Feature Cards */}
            <div className="pt-3 border-t border-[#E5EBE7]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E0E7E2] flex items-center gap-2 shadow-2xs hover:border-[#2FBF71] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-[#1C2420] truncate">Never Blocked</div>
                    <div className="text-[10px] text-[#5E6E66]">Global Roaming</div>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E0E7E2] flex items-center gap-2 shadow-2xs hover:border-[#2FBF71] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-[#1C2420] truncate">Zero Tax</div>
                    <div className="text-[10px] text-[#5E6E66]">Save Big</div>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E0E7E2] flex items-center gap-2 shadow-2xs hover:border-[#2FBF71] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <Wifi className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-[#1C2420] truncate">Free Hotspot</div>
                    <div className="text-[10px] text-[#5E6E66]">Laptop Tethering</div>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] p-2.5 rounded-xl border border-[#E0E7E2] flex items-center gap-2 shadow-2xs hover:border-[#2FBF71] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-[#1C2420] truncate">Instant QR</div>
                    <div className="text-[10px] text-[#5E6E66]">Setup in 60s</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Virtual Interactive eSIM Telecom Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl border-2 border-[#123C2A] p-5 sm:p-6 shadow-xl relative overflow-hidden">
              
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2FBF71] via-[#123C2A] to-[#2FBF71]" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#F0F4F2]">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#123C2A] flex items-center justify-center text-[#2FBF71] font-black text-xs tracking-wider shadow-xs">
                    SIM
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#123C2A]">
                      SproutSIM 4G eSIM
                    </h3>
                    <p className="text-[11px] font-medium text-[#5E6E66]">
                      GloEsim Enterprise Roaming • Jazz 4G LTE
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#2FBF71] animate-pulse"></span>
                  <span>Active</span>
                </div>
              </div>

              {/* eSIM Card Telemetry View (or QR Flip) */}
              {!showQrPreview ? (
                <div className="my-4 bg-[#F8FAF9] p-4 rounded-2xl border border-[#E0E7E2] space-y-3.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6E66] block">
                        Selected Package
                      </span>
                      <span className="text-base font-black text-[#123C2A]">
                        {selectedHeroPlan.name}
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#E9F8F0] text-[#123C2A] font-mono">
                      {selectedHeroPlan.validity}
                    </span>
                  </div>

                  {/* Visual Data Meter */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-[#123C2A]">
                        {selectedHeroPlan.data}
                      </span>
                      <span className="text-xs font-bold text-[#2FBF71]">
                        Uncapped 4G Speed
                      </span>
                    </div>

                    <div className="w-full h-3 bg-[#E0E7E2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#2FBF71] to-[#26A561] rounded-full transition-all duration-500"
                        style={{ width: "85%" }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-medium text-[#5E6E66] mt-1.5">
                      <span>Simulated latency: ~18ms</span>
                      <span className="text-emerald-700 font-bold">Hotspot: Unrestricted</span>
                    </div>
                  </div>

                  {/* Network Roaming Features */}
                  <div className="pt-2 border-t border-[#E5EBE7] grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[#123C2A] font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                      <span>Zero Block Risk</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#123C2A] font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                      <span>No CNIC / Biometrics</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#123C2A] font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                      <span>WhatsApp Audio/Video</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#123C2A] font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                      <span>Instant Hostinger Email</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-4 bg-[#F8FAF9] p-4 rounded-2xl border border-[#E0E7E2] flex flex-col items-center text-center space-y-2.5">
                  <div className="bg-white p-3 rounded-xl border border-[#E0E7E2] shadow-xs">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=LPA:1$smdp.sproutsim.io$DEMO-PK-SPROUTSIM-QR"
                      alt="eSIM Installation QR Code Demo"
                      className="w-36 h-36 block"
                    />
                  </div>
                  <div className="text-xs font-bold text-[#123C2A]">
                    Instant QR Scan Delivery
                  </div>
                  <p className="text-[11px] text-[#5E6E66] max-w-xs">
                    Delivered straight to your inbox via Hostinger SMTP. Scan using iPhone or Android Camera to activate in 60s.
                  </p>
                </div>
              )}

              {/* QR Toggle / Simulation Switch */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setShowQrPreview(!showQrPreview)}
                  className="text-xs font-bold text-[#123C2A] hover:text-[#2FBF71] flex items-center gap-1.5 transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#2FBF71]" />
                  <span>{showQrPreview ? "View Data Telemetry" : "Preview QR Code Delivery"}</span>
                </button>

                <span className="text-[11px] font-mono text-[#5E6E66]">
                  Status: Ready
                </span>
              </div>

              {/* Bottom Primary Button */}
              <button
                onClick={() => onOpenPakistanModal(selectedHeroPlan)}
                className="w-full py-3.5 rounded-xl bg-[#123C2A] hover:bg-[#1A523A] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <span>Activate eSIM · Rs {selectedHeroPlan.pricePKR.toLocaleString()}</span>
                <ArrowRight className="w-4 h-4 text-[#2FBF71]" />
              </button>

              <p className="text-center text-[10px] text-[#5E6E66] mt-2">
                🔒 Secure 256-Bit SSL Checkout · Instant Delivery · 24/7 WhatsApp Support
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
