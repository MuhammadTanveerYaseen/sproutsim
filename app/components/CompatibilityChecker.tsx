"use client";

import React, { useState } from "react";
import { CheckCircle2, Smartphone, Search, AlertCircle } from "lucide-react";

export default function CompatibilityChecker() {
  const [selectedBrand, setSelectedBrand] = useState<"apple" | "samsung" | "google">("apple");
  const [deviceSearch, setDeviceSearch] = useState("");

  const supportedDevices = {
    apple: [
      "iPhone 16 / 16 Pro Max",
      "iPhone 15 / 15 Pro Max",
      "iPhone 14 / 14 Pro Max",
      "iPhone 13 / 13 Pro Max",
      "iPhone 12 / 12 Pro Max",
      "iPhone 11 / 11 Pro",
      "iPhone XS / XS Max / XR",
      "iPhone SE (2nd & 3rd Gen)",
    ],
    samsung: [
      "Galaxy S25 / S25 Ultra",
      "Galaxy S24 / S24 Ultra",
      "Galaxy S23 / S23 Ultra",
      "Galaxy S22 / S22 Ultra",
      "Galaxy S21 / S21 Ultra",
      "Galaxy Z Fold 6 / 5 / 4",
      "Galaxy Z Flip 6 / 5 / 4",
      "Galaxy Note 20 Ultra",
    ],
    google: [
      "Pixel 9 / 9 Pro XL",
      "Pixel 8 / 8 Pro / 8a",
      "Pixel 7 / 7 Pro / 7a",
      "Pixel 6 / 6 Pro / 6a",
      "Pixel 5 / 5a 5G",
      "Pixel 4 / 4 XL / 4a",
      "Pixel 3 / 3 XL",
      "Pixel Fold",
    ],
  };

  const devices = supportedDevices[selectedBrand].filter((d) =>
    d.toLowerCase().includes(deviceSearch.toLowerCase())
  );

  return (
    <section id="compatibility" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F7F2] rounded-3xl border-2 border-[#E0E7E2] p-5 sm:p-10 shadow-sm">
          
          <div className="text-center max-w-xl mx-auto mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
              <Smartphone className="w-3.5 h-3.5 text-[#2FBF71]" />
              <span>Device Verification</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#123C2A]">
              Does your phone support eSIM in Pakistan?
            </h2>
            <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
              All unlocked eSIM-compatible devices work instantly on Pakistan Jazz and Zong 4G frequencies.
            </p>
          </div>

          {/* Brand Switcher: 3 buttons or compact on mobile */}
          <div className="grid grid-cols-3 gap-1.5 sm:flex sm:justify-center sm:gap-2 mb-5">
            <button
              onClick={() => setSelectedBrand("apple")}
              className={`py-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                selectedBrand === "apple"
                  ? "bg-[#123C2A] text-white"
                  : "bg-[#FFFFFF] text-[#1C2420] border border-[#E0E7E2]"
              }`}
            >
              Apple iPhone
            </button>
            <button
              onClick={() => setSelectedBrand("samsung")}
              className={`py-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                selectedBrand === "samsung"
                  ? "bg-[#123C2A] text-white"
                  : "bg-[#FFFFFF] text-[#1C2420] border border-[#E0E7E2]"
              }`}
            >
              Samsung
            </button>
            <button
              onClick={() => setSelectedBrand("google")}
              className={`py-2 px-3 sm:px-5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                selectedBrand === "google"
                  ? "bg-[#123C2A] text-white"
                  : "bg-[#FFFFFF] text-[#1C2420] border border-[#E0E7E2]"
              }`}
            >
              Google Pixel
            </button>
          </div>

          {/* Quick filter input */}
          <div className="max-w-md mx-auto mb-5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8E9E96] absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={deviceSearch}
                onChange={(e) => setDeviceSearch(e.target.value)}
                placeholder="Search your phone model..."
                className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-xl border border-[#E0E7E2] bg-[#FFFFFF] text-[#1C2420] focus:outline-none focus:border-[#2FBF71]"
              />
            </div>
          </div>

          {/* Device list: Strict 2 columns and 2 rows on mobile (`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4`) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
            {devices.map((device, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2FBF71] flex-shrink-0" />
                <span className="text-[11px] font-bold text-[#123C2A] truncate">
                  {device}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Dial Code Tip */}
          <div className="mt-6 p-3.5 rounded-2xl bg-[#E9F8F0] border border-[#A7E8C1] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#123C2A] font-semibold text-center sm:text-left">
              <AlertCircle className="w-4 h-4 text-[#2FBF71] flex-shrink-0" />
              <span>
                Quick test: Dial <strong>*#06#</strong> on your phone. If an <strong>EID number</strong> is shown, your phone supports eSIM!
              </span>
            </div>
            <a
              href="#plans"
              className="px-4 py-1.5 rounded-xl bg-[#123C2A] text-white font-bold whitespace-nowrap hover:bg-[#1A523A] transition-colors"
            >
              Get Started →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
