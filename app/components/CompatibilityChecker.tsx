"use client";

import React from "react";
import { CheckCircle2, Smartphone, ShieldCheck, QrCode, Sparkles, Check, ArrowRight } from "lucide-react";

export default function CompatibilityChecker() {
  const platforms = [
    {
      brand: "Apple iPhone",
      supportText: "All eSIM-enabled iPhones",
      note: "iPhone XS, XR, 11, 12, 13, 14, 15, 16 series and SE (2nd & 3rd Gen)",
    },
    {
      brand: "Samsung Galaxy",
      supportText: "All eSIM Galaxy models",
      note: "S20 through S25 series, Z Fold, Z Flip, and Note 20 series",
    },
    {
      brand: "Google Pixel & Android",
      supportText: "All eSIM Android smartphones",
      note: "Pixel 3 through 9 series, plus eSIM Motorola, Xiaomi, OnePlus devices",
    },
  ];

  return (
    <section id="compatibility" className="py-12 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Universal Device Support</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            Works on All eSIM Smartphones
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E66] mt-2 leading-relaxed">
            If your smartphone has built-in eSIM hardware, SproutSIM connects immediately. No physical SIM swapping or carrier locks.
          </p>
        </div>

        {/* Platform Support Cards - 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 mb-8">
          {platforms.map((p) => (
            <div
              key={p.brand}
              className="bg-[#F5F7F2] rounded-2xl border-2 border-[#E0E7E2] p-4 sm:p-5 flex flex-col justify-between hover:border-[#2FBF71] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E9F8F0] text-[#2FBF71] flex items-center justify-center border border-[#A7E8C1]">
                    <Smartphone className="w-5 h-5 text-[#2FBF71]" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2FBF71] bg-[#E9F8F0] px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3 stroke-[3]" /> Supported
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#123C2A] mb-1">
                  {p.brand}
                </h3>
                <div className="text-xs font-bold text-[#2FBF71] mb-1.5">
                  {p.supportText}
                </div>
                <p className="text-[11px] text-[#5E6E66] leading-relaxed">
                  {p.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 10-Second Device Check Box */}
        <div className="bg-[#F5F7F2] rounded-2xl border-2 border-[#123C2A] p-5 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2FBF71] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>10-Second Compatibility Check</span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-[#123C2A]">
                How to verify your phone supports eSIM:
              </h4>
              <p className="text-xs sm:text-sm text-[#5E6E66] leading-relaxed">
                Open your phone keypad and dial <strong className="text-[#123C2A] bg-[#FFFFFF] px-2 py-0.5 rounded-md font-mono text-xs sm:text-sm border border-[#E0E7E2]">*#06#</strong>. If an <strong className="text-[#123C2A]">EID number</strong> or barcode appears, your phone has built-in eSIM and is 100% ready for SproutSIM.
              </p>
            </div>

            <a
              href="#plans"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-transform active:scale-95 text-center flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>Select Your Plan</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
