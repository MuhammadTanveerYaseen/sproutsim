"use client";

import React, { useState } from "react";
import { PAKISTAN_PLANS, NON_PTA_FEATURES, PakistanPackage, CURRENCY_RATES, CurrencyCode } from "../data/destinations";
import { ShieldCheck, Smartphone, Check, ArrowRight, Zap, Wifi, Lock, HelpCircle } from "lucide-react";

interface DestinationGridProps {
  currency: CurrencyCode;
  onSelectPlan: (pkg: PakistanPackage) => void;
}

export default function DestinationGrid({
  currency,
  onSelectPlan,
}: DestinationGridProps) {
  const [activeTier, setActiveTier] = useState<string>("All");

  const currentRate = CURRENCY_RATES[currency].rate;
  const currentSymbol = CURRENCY_RATES[currency].symbol;

  const formatPrice = (pkg: PakistanPackage) => {
    if (currency === "PKR") {
      return `Rs ${pkg.pricePKR.toLocaleString()}`;
    }
    return `${currentSymbol}${(pkg.priceUSD * currentRate).toFixed(2)}`;
  };

  const filteredPlans = PAKISTAN_PLANS.filter((pkg) => {
    if (activeTier === "All") return true;
    if (activeTier === "Popular") return pkg.popular;
    return pkg.tier === activeTier;
  });

  return (
    <section id="plans" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Zero PTA Tax Required</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
              Pakistan Non-PTA eSIM Data Plans
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6E66] mt-1 max-w-xl">
              Engineered exclusively for Non-PTA iPhones &amp; Android devices in Pakistan. Keep WhatsApp, Google Maps, banking apps, and high-speed data active without paying IMEI tax.
            </p>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A]">
              100% Non-PTA Safe
            </span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#F5F7F2] border border-[#E0E7E2] text-[#123C2A]">
              No 60-Day Block
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {["All", "Popular", "Standard", "Heavy", "Max"].map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTier === tier
                  ? "bg-[#123C2A] text-[#FFFFFF]"
                  : "bg-[#F5F7F2] text-[#1C2420] border border-[#E0E7E2] hover:border-[#123C2A]"
              }`}
            >
              {tier === "All" ? "All Non-PTA Plans" : tier}
            </button>
          ))}
        </div>

        {/* Plan Cards Grid: Exact 2 columns and 2 rows on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-5 mb-14">
          {filteredPlans.map((pkg) => (
            <div
              key={pkg.id}
              className={`group bg-[#FFFFFF] rounded-2xl border-2 p-3 sm:p-5 flex flex-col justify-between transition-all hover:shadow-md relative ${
                pkg.popular
                  ? "border-[#2FBF71] bg-[#F5F7F2]/40"
                  : "border-[#E0E7E2] hover:border-[#2FBF71]"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-3 bg-[#2FBF71] text-white text-[9px] sm:text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                {/* Top: Data & Validity */}
                <div className="flex items-start justify-between gap-1 mb-2">
                  <div>
                    <h3 className="text-base sm:text-2xl font-black text-[#123C2A] tracking-tight">
                      {pkg.data}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold text-[#5E6E66]">
                      Valid for {pkg.validity}
                    </p>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] whitespace-nowrap">
                    Non-PTA
                  </span>
                </div>

                {/* Details */}
                <div className="my-2 p-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2]/70 text-[10px] sm:text-xs text-[#5E6E66] font-semibold space-y-1">
                  <div className="flex items-center gap-1.5 text-[#123C2A]">
                    <ShieldCheck className="w-3 h-3 text-[#2FBF71] flex-shrink-0" />
                    <span className="truncate">{pkg.ptaStatus}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#123C2A]">
                    <Wifi className="w-3 h-3 text-[#2FBF71] flex-shrink-0" />
                    <span>Free Hotspot Tethering</span>
                  </div>
                </div>

                <p className="text-[10px] text-[#5E6E66] hidden sm:block">
                  {pkg.idealFor}
                </p>
              </div>

              {/* Bottom: Price & Button */}
              <div className="pt-2 sm:pt-3 border-t border-[#E0E7E2] mt-2">
                <div className="mb-2">
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#5E6E66] block">
                    Zero PTA Tax Price
                  </span>
                  <span className="text-sm sm:text-xl font-extrabold text-[#123C2A] block leading-tight">
                    {formatPrice(pkg)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectPlan(pkg)}
                  className="w-full py-2 sm:py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Non-PTA Devices Stay Connected Section: Exact 2 columns and 2 rows on mobile */}
        <div id="why-non-pta" className="pt-8 border-t border-[#E0E7E2]">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>How It Works Legally</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-[#123C2A]">
              How SproutSIM Works on Non-PTA Phones
            </h3>
            <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
              Local physical SIMs get IMEI-blocked by PTA after 60 days. Our international roaming profile is officially exempt from local PTA block lists.
            </p>
          </div>

          {/* 2 Columns & 2 Rows on Mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            {NON_PTA_FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="bg-[#F5F7F2] rounded-2xl border-2 border-[#E0E7E2] p-3.5 sm:p-4 hover:border-[#123C2A] transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-[#123C2A] text-[#2FBF71] flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#123C2A]">
                  {feat.title}
                </h4>
                <p className="text-[10px] text-[#5E6E66] mt-1">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
