import React from "react";
import { Cpu, ShieldCheck, CheckCircle2, Lock, Smartphone, Wifi, Zap, XCircle, ArrowRight } from "lucide-react";

export default function WhySproutSim() {
  const metrics = [
    { value: "99.8%", label: "Network Uptime", sub: "Jazz & Zong dual 4G nodes" },
    { value: "< 60s", label: "Instant QR Delivery", sub: "Direct Hostinger SMTP dispatch" },
    { value: "25,000+", label: "Active Connections", sub: "Trusted across Pakistan" },
    { value: "4.9 / 5", label: "Customer Trust Rating", sub: "Verified user satisfaction" },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Save Exorbitant Device Taxes",
      desc: "Why pay Rs 100,000 to Rs 250,000+ in device registration taxes when you can enjoy full high-speed 4G data for a tiny fraction of the cost?",
    },
    {
      icon: Lock,
      title: "Immune to 60-Day Blocks",
      desc: "Physical local SIMs stop functioning on unregistered phones after 60 days. Our legitimate international roaming profile stays online continuously.",
    },
    {
      icon: Smartphone,
      title: "Keep Your WhatsApp Active",
      desc: "All your messaging, FaceTime, WhatsApp audio/video calls, social media, Uber/Careem rides, and banking apps run smoothly without interruption.",
    },
    {
      icon: Wifi,
      title: "Unthrottled Personal Hotspot",
      desc: "Freely tether your high-speed mobile data to laptops, iPads, tablets, or secondary smartphones without data capping or extra fees.",
    },
  ];

  return (
    <section id="why-sproutsim" className="py-12 sm:py-20 bg-[#F8FAF9] border-b border-[#E5EBE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Zap className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>The Smarter Telecom Alternative</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#123C2A] tracking-tight">
            Why Choose SproutSIM in Pakistan?
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D53] mt-2 leading-relaxed">
            Experience complete mobile internet independence on imported and unlocked smartphones without physical franchise visits or registration penalties.
          </p>
        </div>

        {/* Live Metrics Ticker Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-14">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E0E7E2] shadow-2xs text-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#123C2A] tracking-tight">
                {m.value}
              </div>
              <div className="text-xs font-bold text-[#1C2420] mt-0.5">
                {m.label}
              </div>
              <div className="text-[10px] text-[#5E6E66] mt-0.5">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E0E7E2] hover:border-[#2FBF71] p-5 flex flex-col justify-between transition-all shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#E9F8F0] text-[#2FBF71] flex items-center justify-center mb-3.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#123C2A] mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#5E6E66] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0F4F2] flex items-center gap-1.5 text-[11px] font-bold text-[#2FBF71]">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Guaranteed Feature</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical Local SIM vs SproutSIM Direct Comparison Box */}
        <div className="bg-white rounded-3xl border-2 border-[#123C2A] p-6 sm:p-8 shadow-sm">
          <div className="max-w-2xl mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2FBF71] block mb-1">
              Telecom Showdown
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#123C2A]">
              Physical Local SIM vs. SproutSIM 4G eSIM
            </h3>
            <p className="text-xs sm:text-sm text-[#5E6E66] mt-1">
              See how SproutSIM eliminates the common pain points of mobile connectivity in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Physical SIM Card Column */}
            <div className="bg-[#FFF5F5] rounded-2xl border border-red-200 p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-red-100">
                <span className="font-extrabold text-sm text-red-950">
                  Standard Local Physical SIM
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-800">
                  Restricted
                </span>
              </div>
              <ul className="space-y-2 text-xs text-red-900 font-medium">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Automatically blocked after 60 days on unregistered devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Requires heavy registration taxes (Rs 100k - 250k+)</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Requires physical franchise visit, CNIC, and biometric scans</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Risk of losing original physical home carrier SIM</span>
                </li>
              </ul>
            </div>

            {/* SproutSIM eSIM Column */}
            <div className="bg-[#E9F8F0] rounded-2xl border border-[#A7E8C1] p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#A7E8C1]/60">
                <span className="font-extrabold text-sm text-[#123C2A]">
                  SproutSIM Global 4G eSIM
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#2FBF71] text-white">
                  Recommended
                </span>
              </div>
              <ul className="space-y-2 text-xs text-[#123C2A] font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0 mt-0.5" />
                  <span>Operates continuously 365 days a year without 60-day timers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0 mt-0.5" />
                  <span>Zero device registration fees needed (instant huge savings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0 mt-0.5" />
                  <span>100% digital QR scan in phone settings in under 60 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2FBF71] flex-shrink-0 mt-0.5" />
                  <span>Keep your home physical SIM active inside your device simultaneously</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E0E7E2] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#5E6E66]">
              Ready to experience unblocked high-speed 4G data? Setup takes less than 2 minutes.
            </p>
            <a
              href="#plans"
              className="px-5 py-2.5 rounded-xl bg-[#2FBF71] hover:bg-[#26A561] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs flex-shrink-0"
            >
              <span>Explore Data Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
