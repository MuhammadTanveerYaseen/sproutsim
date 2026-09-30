import React from "react";
import Logo from "./Logo";
import { ShieldCheck, Radio, Signal, ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#123C2A] text-[#F5F7F2] pt-12 pb-10 border-t border-[#0B251A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#1A523A]">
          
          {/* Brand Info (col-span-5) */}
          <div className="lg:col-span-5 space-y-3">
            <Logo variant="white" size="md" />
            <p className="text-xs text-[#A7E8C1] leading-relaxed max-w-sm mt-2">
              SproutSIM delivers fast, reliable, and affordable 4G LTE prepaid eSIM data packages across Pakistan — eliminating the hassle of physical plastic SIM cards, airport queues, and steep roaming fees.
            </p>

            <div className="pt-1 text-[11px] text-[#A7E8C1] space-y-1 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF71]"></span>
                <span>Supported on Jazz, Zong, Telenor &amp; Ufone</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF71]"></span>
                <span>Instant Digital QR Code Email Delivery</span>
              </div>
            </div>
          </div>

          {/* 2 Columns & 2 Rows on Mobile for Footer Links Grid (col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            
            {/* Quick Links */}
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2FBF71]">
                Pakistan eSIM
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-[#F5F7F2]">
                <li>
                  <a href="#plans" className="hover:text-[#2FBF71] transition-colors">
                    1 GB Starter Pack
                  </a>
                </li>
                <li>
                  <a href="#plans" className="hover:text-[#2FBF71] transition-colors">
                    3 GB Traveler Plus
                  </a>
                </li>
                <li>
                  <a href="#plans" className="hover:text-[#2FBF71] transition-colors">
                    10 GB Explorer (Hot)
                  </a>
                </li>
                <li>
                  <a href="#plans" className="hover:text-[#2FBF71] transition-colors">
                    50 GB Nomad Ultra
                  </a>
                </li>
                <li>
                  <a href="#plans" className="hover:text-[#2FBF71] transition-colors">
                    Unlimited Pakistan
                  </a>
                </li>
              </ul>
            </div>

            {/* Coverage Cities */}
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2FBF71]">
                Coverage
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-[#F5F7F2]">
                <li>
                  <a href="#coverage" className="hover:text-[#2FBF71] transition-colors">
                    Karachi 4G LTE
                  </a>
                </li>
                <li>
                  <a href="#coverage" className="hover:text-[#2FBF71] transition-colors">
                    Lahore Super 4G
                  </a>
                </li>
                <li>
                  <a href="#coverage" className="hover:text-[#2FBF71] transition-colors">
                    Islamabad &amp; Pindi
                  </a>
                </li>
                <li>
                  <a href="#coverage" className="hover:text-[#2FBF71] transition-colors">
                    Hunza &amp; Skardu
                  </a>
                </li>
                <li>
                  <a href="#coverage" className="hover:text-[#2FBF71] transition-colors">
                    Peshawar &amp; Quetta
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Policy */}
            <div className="space-y-2.5 col-span-2 sm:col-span-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#2FBF71]">
                Company &amp; Legal
              </h4>
              <ul className="space-y-1.5 text-xs font-semibold text-[#F5F7F2]">
                <li>
                  <a href="#how-it-works" className="hover:text-[#2FBF71] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#compatibility" className="hover:text-[#2FBF71] transition-colors">
                    Device Checker
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2FBF71] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#2FBF71] transition-colors">
                    Terms &amp; Refunds
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A7E8C1]">
          <div>
            &copy; {new Date().getFullYear()} SPROUTSIM PAKISTAN. All Rights Reserved. Stay Connected Anywhere.
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2FBF71]" />
            <span>SSL 256-bit Encrypted Digital Checkout</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
