"use client";

import React, { useState, useEffect } from "react";
import { PAKISTAN_PLANS, NON_PTA_FEATURES, PakistanPackage, CURRENCY_RATES, CurrencyCode } from "../data/destinations";
import { ShieldCheck, ArrowRight, Zap, Lock, Table, ChevronDown, ChevronUp, Sparkles, CheckCircle2, Radio, RefreshCw } from "lucide-react";

interface DestinationGridProps {
  currency: CurrencyCode;
  onSelectPlan: (pkg: PakistanPackage) => void;
}

export default function DestinationGrid({
  currency,
  onSelectPlan,
}: DestinationGridProps) {
  const [plans, setPlans] = useState<PakistanPackage[]>(PAKISTAN_PLANS);
  const [isLiveVendor, setIsLiveVendor] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTier, setActiveTier] = useState<string>("All");
  const [showComparisonTable, setShowComparisonTable] = useState<boolean>(false);

  useEffect(() => {
    async function loadVendorPackages() {
      try {
        const res = await fetch("/api/packages");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.packages) && data.packages.length > 0) {
            const mapped: PakistanPackage[] = data.packages.map((v: any) => {
              const gb = v.data_quantity;
              const validityDays = v.package_validity;
              const validityStr = `${validityDays} Day${validityDays > 1 ? "s" : ""}`;
              const isPopular = v.popular || (gb === 10 && validityDays === 30);

              let ideal = `${validityStr} high-speed 4G data for communication and navigation`;
              if (gb === 10 && validityDays === 30) {
                ideal = "Most popular: Daily social media, calls, banking & media streaming";
              } else if (gb === 20 && validityDays === 30) {
                ideal = "High-res video streaming, Zoom/Teams calls & laptop hotspot";
              } else if (gb === 1 && validityDays === 3) {
                ideal = "Transit, quick airport connection & test messages";
              }

              return {
                id: v.id,
                name: v.name.replace(/ in Pakistan/gi, "").replace(/ eSIM Data/gi, "").trim(),
                tier: v.tier || (gb >= 20 ? "Heavy" : isPopular ? "Popular" : "Standard"),
                data: `${gb} ${v.data_unit || "GB"}`,
                validity: validityStr,
                priceUSD: v.price !== undefined ? Number(v.price) : Number(v.retailPriceUSD || 0.87),
                pricePKR: v.retailPricePKR ? Number(v.retailPricePKR) : Math.round((Number(v.price) || 0.87) * 278.5),
                popular: isPopular,
                ptaStatus: "All eSIM Devices Supported",
                tethering: true,
                idealFor: ideal,
                speed: "4G / LTE Uncapped",
                network: v.networks && v.networks.length > 0 ? v.networks.join(" / ") : "Jazz 4G LTE / Orange",
                gloEsimId: v.id,
              };
            });
            setPlans(mapped);
            setIsLiveVendor(data.source === "live_vendor");
          }
        }
      } catch (err) {
        console.warn("Could not fetch live vendor packages, using static fallback", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadVendorPackages();
  }, []);

  const currentRate = CURRENCY_RATES[currency].rate;
  const currentSymbol = CURRENCY_RATES[currency].symbol;

  const formatPrice = (pkg: PakistanPackage) => {
    if (currency === "PKR") {
      return `Rs ${pkg.pricePKR.toLocaleString()}`;
    }
    return `${currentSymbol}${(pkg.priceUSD * currentRate).toFixed(2)}`;
  };

  const getPerGbValue = (pkg: PakistanPackage) => {
    const gb = parseInt(pkg.data);
    if (isNaN(gb) || gb === 0) return "";
    if (currency === "PKR") {
      const perGb = Math.round(pkg.pricePKR / gb);
      return `Rs ${perGb.toLocaleString()}/GB`;
    }
    const perGbUSD = (pkg.priceUSD / gb) * currentRate;
    return `${currentSymbol}${perGbUSD.toFixed(2)}/GB`;
  };

  const filteredPlans = plans.filter((pkg) => {
    if (activeTier === "All") return true;
    if (activeTier === "Popular") return pkg.popular;
    if (activeTier === "3-7 Days") {
      return pkg.validity.includes("3 Day") || pkg.validity.includes("5 Day") || pkg.validity.includes("7 Day");
    }
    if (activeTier === "15 Days") return pkg.validity.includes("15 Day");
    if (activeTier === "30 Days") return pkg.validity.includes("30 Day");
    return true;
  });

  const filterTabs = [
    { id: "All", label: `All Packages (${plans.length})` },
    { id: "Popular", label: "★ Most Popular" },
    { id: "3-7 Days", label: "Short Stay (3–7 Days)" },
    { id: "15 Days", label: "15 Days Pass" },
    { id: "30 Days", label: "Monthly Pass (30 Days)" },
  ];

  return (
    <section id="plans" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E5EBE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
              <span className={`w-2 h-2 rounded-full ${isLiveVendor ? "bg-[#2FBF71] animate-pulse" : "bg-[#2FBF71]"}`} />
              <span>{isLiveVendor ? `Live Carrier Sync: GloEsim Enterprise (${plans.length} Packages)` : `Official Carrier Network (${plans.length} Packages)`}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#123C2A] tracking-tight">
              Pakistan 4G eSIM Data Plans
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5D53] mt-1.5 max-w-2xl leading-relaxed">
              High-speed, unthrottled mobile data roaming directly connected to Pakistan&apos;s tier-1 network (Jazz 4G LTE &amp; Orange). Instant digital QR activation delivered directly to your email.
            </p>
          </div>

          {/* Quick Filter Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Jazz 4G &amp; Orange Dual Roaming</span>
            </span>
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-[#F8FAF9] border border-[#E0E7E2] text-[#123C2A] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Zero Device Tax Required</span>
            </span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {filterTabs.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTier === tier.id
                  ? "bg-[#123C2A] text-white shadow-sm"
                  : "bg-[#F8FAF9] text-[#1C2420] border border-[#E0E7E2] hover:border-[#123C2A] hover:bg-[#FFFFFF]"
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        {/* Plan Cards Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {filteredPlans.map((pkg) => (
            <div
              key={pkg.id}
              className={`group bg-[#FFFFFF] rounded-2xl border-2 p-5 sm:p-6 flex flex-col justify-between transition-all hover:shadow-lg relative overflow-hidden ${
                pkg.popular
                  ? "border-[#2FBF71] bg-gradient-to-b from-[#E9F8F0]/40 to-[#FFFFFF] ring-2 ring-[#2FBF71]/20"
                  : "border-[#E0E7E2] hover:border-[#2FBF71]"
              }`}
            >
              {/* Popular Banner */}
              {pkg.popular && (
                <div className="absolute top-0 right-0 bg-[#2FBF71] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                {/* Header: Package Name & Tier */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E6E66] block">
                      {pkg.name}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-[#123C2A] tracking-tight mt-0.5">
                      {pkg.data}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] whitespace-nowrap">
                    {pkg.validity}
                  </span>
                </div>

                {/* Price & Value Per GB Pill */}
                <div className="bg-[#F8FAF9] p-3 rounded-xl border border-[#E0E7E2] mb-4 space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl sm:text-2xl font-black text-[#123C2A]">
                      {formatPrice(pkg)}
                    </span>
                    <span className="text-[11px] font-bold text-[#2FBF71] bg-[#E9F8F0] px-2 py-0.5 rounded">
                      {getPerGbValue(pkg)}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#5E6E66]">
                    One-time payment • No hidden fees
                  </div>
                </div>

                {/* Bullet Features */}
                <div className="space-y-2 text-xs font-medium text-[#1C2420] mb-5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
                    <span><strong>Speed:</strong> {pkg.speed}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
                    <span><strong>Network:</strong> {pkg.network}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
                    <span><strong>Personal Hotspot:</strong> Free &amp; Uncapped</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
                    <span><strong>Ideal For:</strong> {pkg.idealFor}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-[#F0F4F2]">
                <button
                  onClick={() => onSelectPlan(pkg)}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-98 ${
                    pkg.popular
                      ? "bg-[#2FBF71] hover:bg-[#26A561] text-white"
                      : "bg-[#123C2A] hover:bg-[#1A523A] text-white"
                  }`}
                >
                  <span>Select &amp; Activate</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toggleable Side-by-Side Comparison Drawer */}
        <div className="mb-14">
          <div className="text-center">
            <button
              onClick={() => setShowComparisonTable(!showComparisonTable)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F8FAF9] hover:bg-[#E9F8F0] border border-[#E0E7E2] text-xs font-bold text-[#123C2A] transition-colors"
            >
              <Table className="w-4 h-4 text-[#2FBF71]" />
              <span>{showComparisonTable ? "Hide Plan Comparison Matrix" : `Compare All ${plans.length} Packages Side-by-Side`}</span>
              {showComparisonTable ? (
                <ChevronUp className="w-4 h-4 text-[#5E6E66]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#5E6E66]" />
              )}
            </button>
          </div>

          {showComparisonTable && (
            <div className="mt-6 bg-[#FFFFFF] rounded-2xl border border-[#E0E7E2] overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs font-medium border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-[#123C2A] text-white font-bold text-[11px] uppercase tracking-wider">
                    <th className="p-3.5">Plan Name</th>
                    <th className="p-3.5">Data Quota</th>
                    <th className="p-3.5">Validity</th>
                    <th className="p-3.5">Price (PKR)</th>
                    <th className="p-3.5">Price (USD)</th>
                    <th className="p-3.5">Network</th>
                    <th className="p-3.5">Hotspot</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E7E2]">
                  {plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-[#F8FAF9] transition-colors">
                      <td className="p-3.5 font-bold text-[#123C2A]">
                        {plan.name}
                        {plan.popular && (
                          <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] bg-[#2FBF71] text-white font-black">
                            POPULAR
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 font-extrabold text-[#123C2A]">{plan.data}</td>
                      <td className="p-3.5 text-[#5E6E66]">{plan.validity}</td>
                      <td className="p-3.5 font-bold text-[#123C2A]">Rs {plan.pricePKR.toLocaleString()}</td>
                      <td className="p-3.5 font-mono text-[#5E6E66]">${plan.priceUSD.toFixed(2)}</td>
                      <td className="p-3.5 text-[#5E6E66] text-[11px]">{plan.network}</td>
                      <td className="p-3.5 text-emerald-700 font-bold">Uncapped</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => onSelectPlan(plan)}
                          className="px-3 py-1.5 rounded-lg bg-[#2FBF71] hover:bg-[#26A561] text-white font-bold text-[11px] uppercase tracking-wider"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Why SproutSIM Keeps You Connected Feature Grid */}
        <div id="why-sproutsim-anchor" className="pt-10 border-t border-[#E5EBE7]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Uninterrupted Global Roaming</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-[#123C2A]">
              How SproutSIM Keeps You Online Across Pakistan
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5D53] mt-1.5 leading-relaxed">
              Local physical SIMs stop working on unregistered devices after 60 days. SproutSIM utilizes legitimate international roaming channels that operate continuously year-round.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {NON_PTA_FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="bg-[#F8FAF9] rounded-2xl border border-[#E0E7E2] p-5 hover:border-[#2FBF71] hover:bg-white transition-all shadow-2xs"
              >
                <div className="w-9 h-9 rounded-xl bg-[#123C2A] text-[#2FBF71] flex items-center justify-center mb-3 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-extrabold text-[#123C2A]">
                  {feat.title}
                </h4>
                <p className="text-xs text-[#5E6E66] mt-1 leading-relaxed">
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
