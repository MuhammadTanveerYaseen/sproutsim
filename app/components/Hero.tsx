"use client";

import React, { useState } from "react";
import { Zap, ShieldCheck, Smartphone, ArrowRight, CheckCircle2, Wifi, Lock } from "lucide-react";

interface HeroProps {
  onOpenPakistanModal: () => void;
  onFilterPlan: (tag: string) => void;
}

export default function Hero({
  onOpenPakistanModal,
  onFilterPlan,
}: HeroProps) {
  const [dataUsage, setDataUsage] = useState(3.6);

  const quickPicks = ["1 GB Trial", "3 GB Weekly", "10 GB Monthly (Hot)", "20 GB Pro", "50 GB Power", "Unlimited"];

  return (
    <section className="bg-[#F5F7F2] border-b border-[#E0E7E2] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Value Prop & Mobile Trust Grid */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#2FBF71]"></span>
              <span>High-Speed 4G Data in Pakistan</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#123C2A] tracking-tight leading-[1.2]">
              Keep Your Smartphone Online in Pakistan — Without Device Taxes.
            </h1>

            {/* Description */}
            <p className="text-[#5E6E66] text-xs sm:text-base max-w-xl leading-relaxed">
              Avoid paying heavy registration taxes on imported smartphones. SproutSIM delivers fast, reliable 4G data to any eSIM-enabled iPhone &amp; Android without getting blocked.
            </p>

            {/* Action Bar */}
            <div className="bg-[#FFFFFF] p-2 rounded-2xl border-2 border-[#123C2A] shadow-sm max-w-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 px-2 py-1 sm:py-0">
                <Smartphone className="w-5 h-5 text-[#2FBF71] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-[#1C2420]">
                  High-Speed 4G Data Packages
                </span>
              </div>
              <button
                onClick={onOpenPakistanModal}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0"
              >
                <span>View Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Pick Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap pb-1 sm:pb-0 pt-1">
              <span className="text-xs font-bold text-[#5E6E66] flex-shrink-0">Popular:</span>
              {quickPicks.map((pick) => (
                <button
                  key={pick}
                  onClick={() => onFilterPlan(pick)}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFFFFF] hover:bg-[#123C2A] hover:text-[#FFFFFF] text-[#1C2420] border border-[#E0E7E2] transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {pick}
                </button>
              ))}
            </div>

            {/* Trust Badges Bar: Strict 2 columns and 2 rows on mobile */}
            <div className="pt-4 border-t border-[#E0E7E2]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                
                {/* Row 1, Col 1 */}
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2FBF71]" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#1C2420] leading-tight">No Device Tax</div>
                    <div className="text-[9px] sm:text-[10px] text-[#5E6E66]">Save Big</div>
                  </div>
                </div>

                {/* Row 1, Col 2 */}
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2FBF71]" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#1C2420] leading-tight">Never Blocked</div>
                    <div className="text-[9px] sm:text-[10px] text-[#5E6E66]">Works 365 Days</div>
                  </div>
                </div>

                {/* Row 2, Col 1 */}
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2FBF71]" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#1C2420] leading-tight">Free Hotspot</div>
                    <div className="text-[9px] sm:text-[10px] text-[#5E6E66]">Tether Laptop</div>
                  </div>
                </div>

                {/* Row 2, Col 2 */}
                <div className="bg-[#FFFFFF] p-2.5 sm:p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E9F8F0] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2FBF71]" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-[#1C2420] leading-tight">Instant QR</div>
                    <div className="text-[9px] sm:text-[10px] text-[#5E6E66]">Setup in 60s</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Live eSIM Card Preview */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl border-2 border-[#E0E7E2] p-4 sm:p-6 shadow-sm">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#F5F7F2]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#123C2A] flex items-center justify-center text-white font-extrabold text-[11px] tracking-wider">
                    SIM
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#123C2A]">Pakistan eSIM Data</h3>
                    <p className="text-[11px] font-medium text-[#5E6E66]">Active Roaming • High-Speed 4G</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#2FBF71]"></span>
                  <span>Online</span>
                </div>
              </div>

              {/* Data Meter */}
              <div className="my-4 sm:my-5 bg-[#F5F7F2] p-3.5 sm:p-5 rounded-2xl border border-[#E0E7E2]">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5E6E66]">
                    Data Balance
                  </span>
                  <span className="text-xs font-semibold text-[#123C2A]">
                    Pakistan - 30 days
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#123C2A]">{dataUsage.toFixed(1)} GB</span>
                  <span className="text-xs sm:text-sm font-semibold text-[#5E6E66]">left of 10 GB</span>
                </div>

                {/* Solid Progress Bar */}
                <div className="w-full h-3 bg-[#E0E7E2] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2FBF71] rounded-full transition-all duration-300"
                    style={{ width: `${(dataUsage / 10) * 100}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-[#5E6E66] mt-2">
                  <span>Used: {(10 - dataUsage).toFixed(1)} GB</span>
                  <span className="text-[#2FBF71]">Roaming: Active</span>
                </div>

                {/* Interactive Simulation Button */}
                <div className="mt-4 pt-3 border-t border-[#E0E7E2] flex items-center justify-between">
                  <button
                    onClick={() => setDataUsage((prev) => (prev > 1 ? Number((prev - 0.5).toFixed(1)) : 9.5))}
                    className="text-xs font-bold text-[#123C2A] hover:text-[#2FBF71] underline cursor-pointer"
                  >
                    Simulate data (-0.5 GB)
                  </button>

                  <button
                    onClick={onOpenPakistanModal}
                    className="px-3.5 py-1.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-[#FFFFFF] text-xs font-bold uppercase tracking-wide transition-colors"
                  >
                    Top Up
                  </button>
                </div>
              </div>

              {/* 2 Columns & 2 Rows on Mobile for Checklist */}
              <div className="grid grid-cols-2 gap-2 mb-4 sm:mb-5">
                <div className="p-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#1C2420]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span className="truncate">No Device Tax</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#1C2420]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span className="truncate">Never Blocked</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#1C2420]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span className="truncate">Instant QR Email</span>
                </div>
                <div className="p-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#1C2420]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                  <span className="truncate">Free Hotspot</span>
                </div>
              </div>

              {/* Bottom Action Button */}
              <button
                onClick={onOpenPakistanModal}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#123C2A] hover:bg-[#1A523A] text-[#FFFFFF] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Browse eSIM Plans (From Rs 525)</span>
                <ArrowRight className="w-4 h-4 text-[#2FBF71]" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
