"use client";

import React, { useState } from "react";
import { CheckCircle2, Smartphone, ShieldCheck, QrCode, Sparkles, Check, ArrowRight, Search } from "lucide-react";

export default function CompatibilityChecker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleSearchCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResult(null);
      return;
    }
    const q = searchQuery.toLowerCase();
    if (
      q.includes("iphone") ||
      q.includes("samsung") ||
      q.includes("galaxy") ||
      q.includes("pixel") ||
      q.includes("xiaomi") ||
      q.includes("oneplus") ||
      q.includes("motorola") ||
      q.includes("ipad") ||
      q.includes("pro") ||
      q.includes("ultra") ||
      q.includes("plus")
    ) {
      setSearchResult(`✓ ${searchQuery.trim()} is fully supported with SproutSIM 4G eSIM!`);
    } else {
      setSearchResult(`✓ ${searchQuery.trim()} is supported if it has built-in eSIM hardware.`);
    }
  };

  const platforms = [
    {
      brand: "Apple iPhone",
      supportText: "All eSIM iPhones",
      note: "iPhone XS, XR, 11, 12, 13, 14, 15, 16 series & SE",
      tag: "iOS 12.1+",
    },
    {
      brand: "Samsung Galaxy",
      supportText: "All eSIM Galaxy models",
      note: "S20 through S25 series, Z Fold, Z Flip, Note 20 series",
      tag: "One UI / Android",
    },
    {
      brand: "Google Pixel & Android",
      supportText: "All eSIM Android devices",
      note: "Pixel 3 through 9 series, plus eSIM Motorola, Xiaomi, OnePlus",
      tag: "Android 9+",
    },
  ];

  return (
    <section id="compatibility" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E5EBE7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Universal Device Support</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#123C2A] tracking-tight">
            Works on All eSIM Smartphones
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D53] mt-2 leading-relaxed">
            If your smartphone has built-in eSIM capability, SproutSIM activates immediately. No physical SIM swapping or operator locks.
          </p>
        </div>

        {/* Interactive Instant Model Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <form onSubmit={handleSearchCheck} className="relative">
            <div className="flex items-center bg-[#F8FAF9] rounded-2xl border-2 border-[#123C2A] p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[#2FBF71]">
              <Search className="w-5 h-5 text-[#5E6E66] ml-3 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) setSearchResult(null);
                }}
                placeholder="Type your model (e.g. iPhone 15, S24 Ultra, Pixel 8)..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-[#123C2A] placeholder-[#8E9E96] outline-hidden font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex-shrink-0"
              >
                Check
              </button>
            </div>
          </form>

          {searchResult && (
            <div className="mt-3 p-3 rounded-xl bg-[#E9F8F0] border border-[#A7E8C1] text-xs font-bold text-[#123C2A] flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
              <span>{searchResult}</span>
            </div>
          )}
        </div>

        {/* 3 Brand Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {platforms.map((p) => (
            <div
              key={p.brand}
              className="bg-[#F8FAF9] rounded-2xl border border-[#E0E7E2] p-5 flex flex-col justify-between hover:border-[#2FBF71] transition-all shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E9F8F0] text-[#2FBF71] flex items-center justify-center border border-[#A7E8C1]">
                    <Smartphone className="w-4 h-4 text-[#2FBF71]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#123C2A] bg-[#E9F8F0] px-2.5 py-0.5 rounded-full border border-[#A7E8C1]">
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-[#123C2A] mb-1">
                  {p.brand}
                </h3>
                <div className="text-xs font-bold text-[#2FBF71] mb-1.5">
                  {p.supportText}
                </div>
                <p className="text-xs text-[#5E6E66] leading-relaxed">
                  {p.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The 10-Second Dial Code Check Callout */}
        <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#123C2A] p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2FBF71] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>10-Second Compatibility Check</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-[#123C2A]">
                How to verify your device has built-in eSIM:
              </h4>
              <p className="text-xs sm:text-sm text-[#4A5D53] leading-relaxed">
                Open your phone keypad and dial <strong className="text-[#123C2A] bg-[#F8FAF9] px-2 py-0.5 rounded-md font-mono text-xs sm:text-sm border border-[#E0E7E2]">*#06#</strong>. If an <strong className="text-[#123C2A]">EID number</strong> or barcode appears on your screen, your device is 100% eSIM-compatible and ready for SproutSIM.
              </p>
            </div>

            <a
              href="#plans"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-transform active:scale-95 text-center flex items-center justify-center gap-2 flex-shrink-0 shadow-xs"
            >
              <span>Choose Your Plan</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
