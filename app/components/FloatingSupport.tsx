"use client";

import React, { useState } from "react";
import { MessageCircle, X, Headphones } from "lucide-react";

export default function FloatingSupport() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {chatOpen && (
        <div className="mb-2.5 w-72 sm:w-80 bg-[#FFFFFF] rounded-2xl border-2 border-[#123C2A] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3">
          {/* Support Header */}
          <div className="bg-[#123C2A] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2FBF71] flex items-center justify-center text-white">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Pakistan eSIM Support</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#A7E8C1]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF71]"></span>
                  <span>Online • Avg reply &lt; 2 mins</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-[#A7E8C1] hover:text-white p-1"
              aria-label="Close Support"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Support Message */}
          <div className="p-3.5 bg-[#F5F7F2]">
            <div className="bg-white p-3 rounded-xl border border-[#E0E7E2] text-xs text-[#1C2420] shadow-sm leading-relaxed">
              Hello! Need help checking device compatibility or choosing the right Pakistan data plan for your trip?
            </div>
          </div>

          {/* Quick Action */}
          <div className="p-2.5 bg-white border-t border-[#E0E7E2]">
            <a
              href="https://wa.me/923365131223?text=Hi%20SproutSIM,%20I%20need%20help%20with%20Pakistan%20eSIM"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#2FBF71] hover:bg-[#26A561] text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Open 24/7 WhatsApp Support"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
        <span>24/7 Support</span>
      </button>
    </div>
  );
}
