import React from "react";
import { Compass, CreditCard, QrCode, Wifi, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Choose Data Package",
      desc: "Select the GB allowance for your stay in Pakistan (from 1 GB up to Unlimited).",
      badge: "Step One",
    },
    {
      num: "02",
      icon: CreditCard,
      title: "Instant Digital Checkout",
      desc: "Pay securely with Card, Google Pay, or Apple Pay. Zero passport verification needed.",
      badge: "Step Two",
    },
    {
      num: "03",
      icon: QrCode,
      title: "Scan & Install eSIM",
      desc: "Scan the QR code emailed directly to you. Takes under 60 seconds on any compatible phone.",
      badge: "Step Three",
    },
    {
      num: "04",
      icon: Wifi,
      title: "Connect to 4G LTE",
      desc: "Turn on data roaming upon landing in Pakistan. Enjoy superfast Jazz & Zong connectivity.",
      badge: "Step Four",
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-20 bg-[#F5F7F2] border-b border-[#E0E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Simple 4-Step Flow</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            How Pakistan eSIM Works
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
            Get connected before or after landing in Pakistan without visiting a franchise or airport counter.
          </p>
        </div>

        {/* 4 Steps: Exactly 2 Columns and 2 Rows on Mobile (`grid-cols-2 lg:grid-cols-4`) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#FFFFFF] rounded-2xl border-2 border-[#E0E7E2] p-3.5 sm:p-6 flex flex-col justify-between hover:border-[#123C2A] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#123C2A] text-[#2FBF71] flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-[#A7E8C1]">
                      {step.num}
                    </span>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1]">
                    {step.badge}
                  </span>

                  <h3 className="text-xs sm:text-base font-extrabold text-[#123C2A] mt-2 mb-1">
                    {step.title}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-[#5E6E66] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#F5F7F2] text-[10px] font-bold text-[#2FBF71]">
                  Instant Setup
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
