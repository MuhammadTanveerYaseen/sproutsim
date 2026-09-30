import React from "react";
import { Cpu, Signal, Sliders, ShieldCheck, CheckCircle2, Radio, Heart } from "lucide-react";

export default function WhySproutSim() {
  const features = [
    {
      icon: Cpu,
      title: "Digital eSIM Setup",
      desc: "No physical SIM swapping or biometric franchise queues. Instant installation via QR code.",
    },
    {
      icon: Signal,
      title: "Jazz & Zong 4G",
      desc: "Direct access to Pakistan's fastest 4G networks with nationwide city & highway coverage.",
    },
    {
      icon: Sliders,
      title: "Manage in SproutSIM",
      desc: "Track live megabytes & gigabytes. Top up additional data in 1 tap without scanning new codes.",
    },
    {
      icon: ShieldCheck,
      title: "Transparent Rates",
      desc: "Fixed upfront pricing in PKR or USD. Zero unexpected roaming surcharges on your home bill.",
    },
  ];

  return (
    <section id="why-sproutsim" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Built For Pakistan Travel</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            Why SproutSIM for Pakistan?
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
            The easiest, fastest way to get connected throughout Karachi, Lahore, Islamabad, and across Pakistan.
          </p>
        </div>

        {/* 4 Feature Pillars Grid: Exact 2 columns and 2 rows on mobile (`grid-cols-2 lg:grid-cols-4`) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 mb-12">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="bg-[#F5F7F2] rounded-2xl border-2 border-[#E0E7E2] hover:border-[#2FBF71] p-3.5 sm:p-5 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#E9F8F0] text-[#2FBF71] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-base font-extrabold text-[#123C2A] mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-[#5E6E66] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E0E7E2] flex items-center gap-1 text-[10px] font-bold text-[#2FBF71]">
                  <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Verified Service</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Promise Callout (Clean - No emojis) */}
        <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#123C2A] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[11px] font-bold text-[#2FBF71] uppercase tracking-wider block">
                The Brand Promise
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#123C2A]">
                Pakistan connectivity, made simple.
              </h3>
              <p className="text-xs sm:text-sm text-[#5E6E66] leading-relaxed">
                SproutSIM brings high-speed, reliable, and affordable travel eSIMs for Pakistan — so you can work, explore, navigate Google Maps, and stay connected with family on WhatsApp wherever you go.
              </p>
            </div>

            {/* 2 Columns & 2 Rows on Mobile for Brand Badges */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              <div className="bg-[#F5F7F2] p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#123C2A] text-[#2FBF71] flex items-center justify-center flex-shrink-0">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123C2A]">Dual 4G Mast</div>
                  <div className="text-[10px] text-[#5E6E66]">Jazz &amp; Zong Towers</div>
                </div>
              </div>

              <div className="bg-[#F5F7F2] p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#123C2A] text-[#2FBF71] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123C2A]">No Paperwork</div>
                  <div className="text-[10px] text-[#5E6E66]">Instant Cloud Activation</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
