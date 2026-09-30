"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does this truly work on Non-PTA iPhones & Android phones?",
      a: "Yes, 100%! SproutSIM is an international roaming data profile. In Pakistan, PTA blocks local Pakistani physical SIM cards (like Jazz, Zong, Telenor, Ufone) from latching onto towers if the device's IMEI hasn't paid PTA tax. However, international roaming data profiles are exempt from local device block lists and operate normally.",
    },
    {
      q: "Will my Non-PTA device get blocked after 60 days?",
      a: "No! The 60-day limit only applies to local Pakistani SIMs inserted into Non-PTA hardware. Because SproutSIM operates over global roaming protocols, it does not trigger the 60-day PTA timer. You can use it year-round by simply renewing or topping up your data allowance.",
    },
    {
      q: "Can I make voice calls and use WhatsApp on my Non-PTA phone?",
      a: "Yes! All your internet-based calling apps — including WhatsApp audio/video calls, FaceTime, Zoom, Telegram, and Messenger — work in crystal-clear HD. You also keep your original WhatsApp number even if the phone has no local physical SIM.",
    },
    {
      q: "Can I share my Non-PTA data with other devices using Hotspot?",
      a: "Absolutely! Personal Hotspot and tethering are completely unlocked. You can turn on your Non-PTA iPhone hotspot and provide internet to your laptop, tablet, or another phone anywhere in Pakistan.",
    },
    {
      q: "Do I need to provide a Pakistani CNIC or visit a franchise?",
      a: "No paperwork or franchise visits are required. SproutSIM is 100% digital. You purchase your package online, receive your QR code via Hostinger business email, scan it into your phone's cellular settings, and get online instantly.",
    },
    {
      q: "What happens if I run out of data before the month ends?",
      a: "You can top up additional gigabytes right from the SproutSIM website with 1 click. You never need to reinstall the eSIM or scan a new QR code.",
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Non-PTA Questions Answered</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
            Everything you need to know about keeping your Non-PTA phone connected in Pakistan.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F5F7F2] rounded-2xl border-2 border-[#E0E7E2] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 focus:outline-none"
                >
                  <span className="text-xs sm:text-base font-extrabold text-[#123C2A]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                      isOpen ? "bg-[#123C2A] text-white rotate-180" : "bg-[#FFFFFF] text-[#123C2A]"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-[11px] sm:text-xs text-[#5E6E66] leading-relaxed border-t border-[#E0E7E2]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
