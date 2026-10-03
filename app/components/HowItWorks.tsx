"use client";

import React, { useState } from "react";
import { Compass, CreditCard, QrCode, Wifi, Smartphone, CheckCircle2, ChevronRight, Apple, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const [activeOsTab, setActiveOsTab] = useState<"ios" | "android">("ios");

  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Choose Data Package",
      desc: "Select the data package that fits your trip (from 1 GB quick pass up to 20 GB monthly).",
      badge: "Step One",
    },
    {
      num: "02",
      icon: CreditCard,
      title: "Instant Digital Checkout",
      desc: "Pay securely in PKR via JazzCash or direct UBL Bank Transfer with fast admin verification.",
      badge: "Step Two",
    },
    {
      num: "03",
      icon: QrCode,
      title: "Scan QR on Phone",
      desc: "Receive your QR code in your email within 60 seconds. Open Settings &rarr; Cellular &rarr; Add eSIM.",
      badge: "Step Three",
    },
    {
      num: "04",
      icon: Wifi,
      title: "Turn on Roaming & Connect",
      desc: "Switch on 'Data Roaming'. Your phone connects to high-speed 4G LTE on GloEsim Enterprise Roaming • Jazz 4G LTE immediately.",
      badge: "Step Four",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-20 bg-[#F8FAF9] border-b border-[#E5EBE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2.5">
            <span>Simple 4-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#123C2A] tracking-tight">
            How to Setup Your SproutSIM eSIM
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D53] mt-2 leading-relaxed">
            Activate high-speed 4G mobile data on any eSIM smartphone in under 2 minutes. No physical SIM card swapping required.
          </p>
        </div>

        {/* 4 Steps Stepper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-[#E0E7E2] hover:border-[#2FBF71] p-5 sm:p-6 flex flex-col justify-between transition-all shadow-2xs hover:shadow-md relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#123C2A] text-[#2FBF71] flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-black text-[#A7E8C1] font-mono">
                      {step.num}
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] inline-block mb-2">
                    {step.badge}
                  </span>

                  <h3 className="text-base font-extrabold text-[#123C2A] mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#5E6E66] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0F4F2] flex items-center gap-1.5 text-[11px] font-bold text-[#2FBF71]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Instant Setup</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Operating System Interactive Activation Walkthrough Box */}
        <div className="bg-white rounded-3xl border-2 border-[#123C2A] p-6 sm:p-8 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E0E7E2] mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2FBF71] block mb-0.5">
                Exact Device Instructions
              </span>
              <h3 className="text-lg sm:text-xl font-black text-[#123C2A]">
                60-Second Installation Walkthrough
              </h3>
            </div>

            {/* iOS vs Android Toggle */}
            <div className="flex items-center bg-[#F8FAF9] p-1 rounded-xl border border-[#E0E7E2]">
              <button
                type="button"
                onClick={() => setActiveOsTab("ios")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeOsTab === "ios"
                    ? "bg-[#123C2A] text-white shadow-xs"
                    : "text-[#5E6E66] hover:text-[#123C2A]"
                }`}
              >
                <span>Apple iPhone (iOS)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveOsTab("android")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeOsTab === "android"
                    ? "bg-[#123C2A] text-white shadow-xs"
                    : "text-[#5E6E66] hover:text-[#123C2A]"
                }`}
              >
                <span>Samsung / Android</span>
              </button>
            </div>
          </div>

          {activeOsTab === "ios" ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">01</div>
                <div className="font-bold text-[#123C2A] mb-1">Open Settings</div>
                <div className="text-[11px] text-[#5E6E66]">Navigate to Settings &rarr; Cellular (or Mobile Data)</div>
              </div>
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">02</div>
                <div className="font-bold text-[#123C2A] mb-1">Add eSIM</div>
                <div className="text-[11px] text-[#5E6E66]">Tap &quot;Add eSIM&quot; or &quot;Add Cellular Plan&quot;</div>
              </div>
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">03</div>
                <div className="font-bold text-[#123C2A] mb-1">Scan QR Code</div>
                <div className="text-[11px] text-[#5E6E66]">Scan the QR code received in your Hostinger email</div>
              </div>
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">04</div>
                <div className="font-bold text-[#123C2A] mb-1">Turn on Roaming</div>
                <div className="text-[11px] text-[#5E6E66]">Turn &quot;Data Roaming&quot; ON. 4G data connects instantly</div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">01</div>
                <div className="font-bold text-[#123C2A] mb-1">Open Settings</div>
                <div className="text-[11px] text-[#5E6E66]">Go to Settings &rarr; Connections / Network &amp; internet</div>
              </div>
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">02</div>
                <div className="font-bold text-[#123C2A] mb-1">SIM Manager</div>
                <div className="text-[11px] text-[#5E6E66]">Select &quot;SIM manager&quot; &rarr; &quot;Add mobile plan / eSIM&quot;</div>
              </div>
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">03</div>
                <div className="font-bold text-[#123C2A] mb-1">Scan QR Code</div>
                <div className="text-[11px] text-[#5E6E66]">Select &quot;Scan QR code from provider&quot; and point camera</div>
              </div>
              <div className="bg-[#F8FAF9] p-4 rounded-xl border border-[#E0E7E2]">
                <div className="font-mono text-[#2FBF71] font-bold text-sm mb-1">04</div>
                <div className="font-bold text-[#123C2A] mb-1">Enable Roaming</div>
                <div className="text-[11px] text-[#5E6E66]">Enable Data Roaming under Mobile networks to connect</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
