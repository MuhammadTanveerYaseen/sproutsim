import React from "react";
import Logo from "./Logo";
import { ShieldCheck, Radio, Signal, ArrowUp, Mail, Phone } from "lucide-react";

export function SocialIcon({ platform }: { platform: "instagram" | "facebook" | "x" | "linkedin" | "tiktok" | "whatsapp" }) {
  switch (platform) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect width="4" height="12" x="2" y="9"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", platform: "instagram" as const, url: "https://instagram.com/sproutsim" },
    { name: "Facebook", platform: "facebook" as const, url: "https://facebook.com/sproutsim" },
    { name: "X (Twitter)", platform: "x" as const, url: "https://x.com/sproutsim" },
    { name: "LinkedIn", platform: "linkedin" as const, url: "https://linkedin.com/company/sproutsim" },
    { name: "TikTok", platform: "tiktok" as const, url: "https://tiktok.com/@sproutsim" },
    { name: "WhatsApp", platform: "whatsapp" as const, url: "https://wa.me/?text=Hi%20SproutSIM" },
  ];

  return (
    <footer className="bg-[#123C2A] text-[#F5F7F2] pt-12 pb-10 border-t border-[#0B251A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#1A523A]">
          
          {/* Brand Info & Social Links (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo variant="white" size="md" />
            <p className="text-xs text-[#A7E8C1] leading-relaxed max-w-sm">
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
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#2FBF71]" />
                <a href="mailto:support@sproutsim.com" className="hover:text-white transition-colors">
                  support@sproutsim.com
                </a>
              </div>
            </div>

            {/* Social Media Links Row */}
            <div className="pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#2FBF71] mb-2.5">
                Connect With Us
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow SproutSIM on ${s.name}`}
                    className="w-8 h-8 rounded-xl bg-[#1A523A] hover:bg-[#2FBF71] text-white flex items-center justify-center transition-colors"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                ))}
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

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2FBF71]" />
              <span>SSL 256-bit Encrypted Checkout</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
