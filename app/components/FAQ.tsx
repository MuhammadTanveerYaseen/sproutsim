"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does this work on imported or unregistered smartphones in Pakistan?",
      a: "Yes, 100%! SproutSIM is an international roaming data profile. In Pakistan, local telecom operators block local physical SIM cards if a device's IMEI has unpaid taxes. However, international data roaming operates on global telecom agreements that remain active and unrestricted.",
    },
    {
      q: "Will my connection get blocked after 60 days?",
      a: "No! The 60-day limit only applies to local Pakistani physical SIMs inserted into unregistered hardware. Because SproutSIM operates over global roaming protocols, it does not trigger the 60-day timer. You can use it year-round simply by renewing or topping up your data allowance.",
    },
    {
      q: "Can I make voice calls and use WhatsApp with SproutSIM?",
      a: "Yes! All internet-based calling apps — including WhatsApp audio/video calls, FaceTime, Zoom, Telegram, and Messenger — work in crystal-clear HD. You also keep your existing WhatsApp phone number and chat history intact.",
    },
    {
      q: "Can I share my mobile data with other devices using Hotspot?",
      a: "Absolutely! Personal Hotspot and tethering are completely unlocked. You can turn on your hotspot and provide fast internet to your laptop, tablet, or another phone anywhere in Pakistan.",
    },
    {
      q: "Do I need to provide a Pakistani CNIC or visit a franchise?",
      a: "No paperwork or franchise visits are required. SproutSIM is 100% digital. You purchase your package online, receive your QR code via Hostinger business email, scan it into your phone's cellular settings, and get online in under 2 minutes.",
    },
    {
      q: "What happens if I run out of data before the month ends?",
      a: "You can top up additional gigabytes right from the SproutSIM website with 1 click. You never need to reinstall the eSIM or scan a new QR code.",
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#123C2A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D53] mt-2 leading-relaxed">
            Everything you need to know about setting up and using SproutSIM across Pakistan.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-10">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F8FAF9] rounded-2xl border border-[#E0E7E2] overflow-hidden transition-all hover:border-[#2FBF71]"
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
                      isOpen ? "bg-[#123C2A] text-white rotate-180" : "bg-[#FFFFFF] text-[#123C2A] border border-[#E0E7E2]"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#5E6E66] leading-relaxed border-t border-[#E0E7E2]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 24/7 WhatsApp Support Callout */}
        <div className="bg-[#E9F8F0] rounded-2xl border border-[#A7E8C1] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-[#123C2A]">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-[#4A5D53]">
              Our 24/7 WhatsApp telecom support team is online to assist you in Urdu and English.
            </p>
          </div>

          <a
            href="https://wa.me/923365131223?text=Hi%20SproutSIM%2C%20I%20have%20a%20question%20about%20eSIM%20packages"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
