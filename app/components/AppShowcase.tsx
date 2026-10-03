"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Wifi, Battery, Search, Home, Compass, Signal, User, ShieldCheck, Lock } from "lucide-react";
import Logo from "./Logo";

export default function AppShowcase() {
  const [activeTab, setActiveTab] = useState<"home" | "plans" | "usage">("home");

  return (
    <section id="app-showcase" className="py-12 sm:py-20 bg-[#F5F7F2] border-b border-[#E0E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text & 2x2 Mobile Feature Grid */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider">
              <span>Real-Time Mobile Management</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight leading-tight">
              Manage Your Data Connection in Real Time.
            </h2>

            <p className="text-xs sm:text-base text-[#5E6E66] leading-relaxed">
              Track live data consumption, check renewal dates, and top up gigabytes with 1 tap. Your device stays connected and protected 24/7 across Pakistan.
            </p>

            {/* 2 Columns & 2 Rows on Mobile for Features */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2FBF71] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1C2420]">
                  Zero PTA Block Risk
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2FBF71] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1C2420]">
                  1-Tap Instant Top-Up
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2FBF71] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1C2420]">
                  Continuous Roaming Data
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#2FBF71] text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1C2420]">
                  Tethering to Laptop
                </span>
              </div>
            </div>

            {/* Screen Selector Tabs */}
            <div className="pt-3">
              <div className="text-[11px] font-bold text-[#5E6E66] uppercase tracking-wider mb-2">
                Preview app screens:
              </div>
              <div className="inline-flex p-1 rounded-2xl bg-[#FFFFFF] border border-[#E0E7E2] gap-1 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "home"
                      ? "bg-[#123C2A] text-white"
                      : "text-[#1C2420] hover:bg-[#F5F7F2]"
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab("plans")}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "plans"
                      ? "bg-[#123C2A] text-white"
                      : "text-[#1C2420] hover:bg-[#F5F7F2]"
                  }`}
                >
                  Plans
                </button>
                <button
                  onClick={() => setActiveTab("usage")}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "usage"
                      ? "bg-[#123C2A] text-white"
                      : "text-[#1C2420] hover:bg-[#F5F7F2]"
                  }`}
                >
                  Usage
                </button>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 pt-1">
              <button className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#123C2A] text-white hover:bg-[#1A523A] transition-colors">
                <span className="font-extrabold text-sm">iOS</span>
                <div className="text-left leading-none">
                  <div className="text-[9px] text-[#A7E8C1] uppercase font-semibold">Download on</div>
                  <div className="text-xs font-bold mt-0.5">App Store</div>
                </div>
              </button>

              <button className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#123C2A] text-white hover:bg-[#1A523A] transition-colors">
                <span className="font-extrabold text-sm">Android</span>
                <div className="text-left leading-none">
                  <div className="text-[9px] text-[#A7E8C1] uppercase font-semibold">Get it on</div>
                  <div className="text-xs font-bold mt-0.5">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-[300px] sm:w-[330px] bg-[#123C2A] rounded-[44px] p-3 shadow-2xl border-4 border-[#123C2A] relative">
              
              {/* Phone Screen Container */}
              <div className="bg-[#F5F7F2] rounded-[36px] overflow-hidden border border-[#E0E7E2] min-h-[550px] flex flex-col justify-between text-[#1C2420]">
                
                {/* Phone Status Bar */}
                <div className="px-5 pt-3 pb-1.5 flex items-center justify-between text-[11px] font-bold text-[#1C2420]">
                  <span>9:41</span>
                  <div className="w-20 h-3.5 bg-[#123C2A] rounded-full mx-auto"></div>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-[#123C2A]" />
                    <Battery className="w-3.5 h-3.5 text-[#123C2A]" />
                  </div>
                </div>

                {/* Screen 1: Home Dashboard */}
                {activeTab === "home" && (
                  <div className="p-4 space-y-3.5 flex-1">
                    <div className="flex items-center justify-between">
                      <Logo size="sm" />
                      <div className="w-7 h-7 rounded-full bg-[#123C2A] text-white text-[10px] font-bold flex items-center justify-center">
                        ACTIVE
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-[#5E6E66]">Device Connected</span>
                      <h4 className="text-base font-extrabold text-[#123C2A]">
                        eSIM Smartphone
                      </h4>
                    </div>

                    {/* Active eSIM Card */}
                    <div className="bg-[#FFFFFF] p-3 rounded-2xl border-2 border-[#2FBF71] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#5E6E66]">Active Profile</span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#E9F8F0] text-[#2FBF71]">
                          Online • Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-sm text-[#123C2A]">Pakistan 10 GB Pack</div>
                          <div className="text-[10px] text-[#5E6E66]">4G High-Speed Data</div>
                        </div>
                        <button
                          onClick={() => setActiveTab("usage")}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[#123C2A] text-white"
                        >
                          Usage
                        </button>
                      </div>
                    </div>

                    {/* 2x2 Features in App Mockup */}
                    <div>
                      <div className="text-[11px] font-bold text-[#123C2A] mb-1.5">Active Status</div>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                        <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2]">
                          <span className="text-[#2FBF71]">Device Tax</span>
                          <div className="text-[9px] text-[#5E6E66] font-normal">Exempt ($0)</div>
                        </div>
                        <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2]">
                          <span className="text-[#2FBF71]">Data Speed</span>
                          <div className="text-[9px] text-[#5E6E66] font-normal">Super 4G+</div>
                        </div>
                        <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2]">
                          <span className="text-[#2FBF71]">Hotspot</span>
                          <div className="text-[9px] text-[#5E6E66] font-normal">Unlocked</div>
                        </div>
                        <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2]">
                          <span className="text-[#2FBF71]">Apps &amp; Calls</span>
                          <div className="text-[9px] text-[#5E6E66] font-normal">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen 2: Choose Plan */}
                {activeTab === "plans" && (
                  <div className="p-4 space-y-2.5 flex-1">
                    <div className="flex items-center justify-between">
                      <button onClick={() => setActiveTab("home")} className="text-xs font-bold text-[#5E6E66]">
                        ‹ Back
                      </button>
                      <span className="text-xs font-bold text-[#123C2A]">Data Plans</span>
                    </div>

                    <div className="bg-[#123C2A] text-white p-2.5 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-[9px] text-[#A7E8C1]">Coverage</div>
                        <div className="text-xs font-extrabold">Pakistan 4G/LTE</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2FBF71]">Zero Tax</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2] flex items-center justify-between text-xs">
                        <span className="font-bold">1 GB • 7 days</span>
                        <span className="font-extrabold text-[#123C2A]">Rs 382</span>
                      </div>
                      <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2] flex items-center justify-between text-xs">
                        <span className="font-bold">3 GB • 7 days</span>
                        <span className="font-extrabold text-[#123C2A]">Rs 624</span>
                      </div>
                      <div className="bg-[#E9F8F0] p-2 rounded-xl border-2 border-[#2FBF71] flex items-center justify-between text-xs">
                        <span className="font-bold text-[#123C2A]">10 GB • 30 days</span>
                        <span className="font-extrabold text-[#2FBF71]">Rs 1,482</span>
                      </div>
                      <div className="bg-[#FFFFFF] p-2 rounded-xl border border-[#E0E7E2] flex items-center justify-between text-xs">
                        <span className="font-bold">20 GB • 30 days</span>
                        <span className="font-extrabold text-[#123C2A]">Rs 2,451</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("usage")}
                      className="w-full py-2.5 rounded-xl bg-[#2FBF71] text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Continue
                    </button>
                  </div>
                )}

                {/* Screen 3: Data Usage */}
                {activeTab === "usage" && (
                  <div className="p-4 space-y-3.5 flex-1">
                    <div className="text-center">
                      <span className="text-[10px] font-bold text-[#5E6E66]">Non-PTA Data Left</span>
                      <div className="text-2xl font-black text-[#123C2A] mt-0.5">3.6 GB</div>
                      <div className="text-[10px] text-[#5E6E66]">of 10 GB plan</div>
                    </div>

                    {/* Progress */}
                    <div className="w-full h-2.5 bg-[#E0E7E2] rounded-full overflow-hidden">
                      <div className="w-[36%] h-full bg-[#2FBF71]"></div>
                    </div>

                    <div className="bg-[#FFFFFF] p-3 rounded-2xl border border-[#E0E7E2] text-[11px] space-y-1.5">
                      <div className="flex justify-between text-[#5E6E66]">
                        <span>Pakistan Roaming</span>
                        <span className="font-bold text-[#123C2A]">Online</span>
                      </div>
                      <div className="flex justify-between text-[#5E6E66]">
                        <span>Data used</span>
                        <span className="font-bold text-[#123C2A]">6.4 GB</span>
                      </div>
                      <div className="flex justify-between text-[#5E6E66]">
                        <span>PTA Device Status</span>
                        <span className="font-bold text-[#2FBF71]">Never Blocked</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("plans")}
                      className="w-full py-2 rounded-xl bg-[#2FBF71] text-white text-xs font-bold uppercase tracking-wider"
                    >
                      Top Up Data
                    </button>
                  </div>
                )}

                {/* Bottom App Navigation Bar */}
                <div className="bg-[#FFFFFF] border-t border-[#E0E7E2] px-4 py-2 flex items-center justify-around text-[9px] font-bold text-[#5E6E66]">
                  <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-0.5 ${activeTab === "home" ? "text-[#2FBF71]" : ""}`}>
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </button>
                  <button onClick={() => setActiveTab("plans")} className={`flex flex-col items-center gap-0.5 ${activeTab === "plans" ? "text-[#2FBF71]" : ""}`}>
                    <Compass className="w-3.5 h-3.5" />
                    <span>Plans</span>
                  </button>
                  <button onClick={() => setActiveTab("usage")} className={`flex flex-col items-center gap-0.5 ${activeTab === "usage" ? "text-[#2FBF71]" : ""}`}>
                    <Signal className="w-3.5 h-3.5" />
                    <span>Usage</span>
                  </button>
                  <div className="flex flex-col items-center gap-0.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Profile</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
