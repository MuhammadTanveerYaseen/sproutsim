"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the Pakistan eSIM work on Jazz & Zong?",
      a: "Our Pakistan travel eSIM connects directly to local cellular infrastructure across Pakistan, including Jazz (Pakistan's largest 4G provider) and Zong Super 4G. You scan a QR code to download the profile to your device, giving you instant data access upon landing.",
    },
    {
      q: "Will my WhatsApp and personal home number still work?",
      a: "Yes! Your existing physical SIM or main eSIM remains fully active for receiving incoming calls and SMS verification codes. Your WhatsApp account stays unchanged and continues working seamlessly on SproutSIM's high-speed Pakistan data.",
    },
    {
      q: "Do I need a Pakistani CNIC or local ID to activate?",
      a: "No! SproutSIM data packages are 100% digital prepaid travel packages. You do not need a Pakistani CNIC, passport upload, or franchise visit. Activation happens instantly upon QR code scanning.",
    },
    {
      q: "Can I share data via Personal Hotspot with my laptop or family?",
      a: "Yes! All Pakistan plans feature unrestricted Personal Hotspot tethering. You can connect your laptop, iPad, or travel companions' devices freely.",
    },
    {
      q: "Does it work in Northern Areas (Hunza, Skardu, Gilgit)?",
      a: "Yes! Our profiles switch automatically to local partner networks across Gilgit-Baltistan and Kashmir, giving you reliable coverage for navigation and maps in mountainous regions.",
    },
    {
      q: "Can I top up if I run out of gigabytes during my stay in Pakistan?",
      a: "Yes! You can top up anytime from our website or app with 1 click. You do not need to install a new eSIM or rescan any QR code.",
    },
  ];

  return (
    <section id="faq" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            Pakistan eSIM FAQ
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
            Common questions about traveling connected in Pakistan.
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
