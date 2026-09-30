import React from "react";
import { Cpu, ShieldCheck, CheckCircle2, Lock, Smartphone, Wifi } from "lucide-react";

export default function WhySproutSim() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Save Heavy PTA Taxes",
      desc: "Why pay Rs 100,000 to Rs 250,000+ PTA device tax when you can get full high-speed 4G data for a fraction of the cost?",
    },
    {
      icon: Lock,
      title: "Immune to 60-Day Blocks",
      desc: "Local SIMs stop working on Non-PTA devices after 60 days. Our international roaming profile stays online continuously.",
    },
    {
      icon: Smartphone,
      title: "Keep Your WhatsApp Active",
      desc: "All your messaging, video calls, social media, Uber/Careem, and banking apps run smoothly on high-speed data.",
    },
    {
      icon: Wifi,
      title: "Hotspot to All Devices",
      desc: "Share your high-speed Non-PTA mobile data with your laptop, tablet, or secondary phones via Personal Hotspot.",
    },
  ];

  return (
    <section id="why-non-pta" className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E0E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
            <span>The Non-PTA Solution</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            Why Use SproutSIM on Non-PTA Phones?
          </h2>
          <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
            Enjoy full mobile internet independence on imported iPhones and premium Android devices in Pakistan.
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
                  <span className="truncate">Non-PTA Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Non-PTA Promise Callout */}
        <div className="bg-[#FFFFFF] rounded-2xl border-2 border-[#123C2A] p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[11px] font-bold text-[#2FBF71] uppercase tracking-wider block">
                The Non-PTA Guarantee
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#123C2A]">
                Zero PTA Device Tax. 100% Reliable 4G Data.
              </h3>
              <p className="text-xs sm:text-sm text-[#5E6E66] leading-relaxed">
                SproutSIM enables Non-PTA smartphones to stay connected 365 days a year across Pakistan without paying exorbitant PTA IMEI taxes. We provide the legitimate global roaming pathway that keeps your device online.
              </p>
            </div>

            {/* 2 Columns & 2 Rows on Mobile for Brand Badges */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2.5">
              <div className="bg-[#F5F7F2] p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#123C2A] text-[#2FBF71] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123C2A]">No IMEI Blocking</div>
                  <div className="text-[10px] text-[#5E6E66]">Roaming Protected</div>
                </div>
              </div>

              <div className="bg-[#F5F7F2] p-3 rounded-xl border border-[#E0E7E2] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#123C2A] text-[#2FBF71] flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#123C2A]">Zero Tax Needed</div>
                  <div className="text-[10px] text-[#5E6E66]">Save Hundreds of Thousands</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
