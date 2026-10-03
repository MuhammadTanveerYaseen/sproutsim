import React from "react";
import { Star, ShieldCheck, Heart, CheckCircle2, Lock, CreditCard } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Danyal Sheikh",
      role: "iPhone 15 Pro Max User",
      location: "Karachi, Pakistan",
      benefit: "Saved Rs 180,000+ Device Registration Fee",
      rating: 5,
      comment:
        "My imported iPhone 15 Pro Max was about to get blocked after the 60-day window. Instead of paying almost 2 lac in device taxes, I installed SproutSIM. High-speed 4G data has been working without a single glitch for 4 months now!",
      avatar: "DS",
    },
    {
      name: "Ayesha Malik",
      role: "Digital Nomad & Content Creator",
      location: "Lahore, Pakistan",
      benefit: "High-Speed Hotspot to MacBook",
      rating: 5,
      comment:
        "I use my iPhone for daily high-res video uploads and remote client calls. SproutSIM data is remarkably consistent, and WhatsApp calling works flawlessly. Tethering to my laptop during travel has been a lifesaver.",
      avatar: "AM",
    },
    {
      name: "Zubair Khan",
      role: "Overseas Executive (Dubai Expat)",
      location: "Islamabad & Rawalpindi",
      benefit: "Instant Setup & Quick Top-Up",
      rating: 5,
      comment:
        "Whenever I travel back to Pakistan from the UAE, SproutSIM is my first choice. QR code was delivered to my inbox in 30 seconds, and 4G roaming activated right when my flight landed at Islamabad airport.",
      avatar: "ZK",
    },
  ];

  const paymentMethods = [
    "Apple Pay",
    "Google Pay",
    "Visa",
    "Mastercard",
    "JazzCash",
    "EasyPaisa",
    "Bank Transfer",
    "UnionPay",
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#FFFFFF] border-b border-[#E5EBE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Heart className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Over 25,000+ Active Connections</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#123C2A] tracking-tight">
            Trusted by Smartphone Owners Across Pakistan
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2.5">
            <div className="flex text-[#2FBF71]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#123C2A]">
              4.9 / 5.0 Average Customer Rating
            </span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-14">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-[#F8FAF9] rounded-2xl border border-[#E0E7E2] p-5 sm:p-6 flex flex-col justify-between hover:border-[#2FBF71] hover:bg-white transition-all shadow-2xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex text-[#2FBF71]">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#2FBF71]" />
                    <span>Verified User</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#1C2420] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#E0E7E2] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#123C2A] text-[#A7E8C1] font-black text-xs flex items-center justify-center shadow-xs flex-shrink-0">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#123C2A]">{rev.name}</h4>
                  <div className="text-[11px] text-[#5E6E66]">{rev.role} • {rev.location}</div>
                  <div className="text-[10px] text-[#2FBF71] font-bold mt-0.5">{rev.benefit}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accepted Payment Methods Bar */}
        <div className="bg-[#F8FAF9] rounded-2xl border border-[#E0E7E2] p-5 sm:p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#5E6E66]">
            <Lock className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Accepted Secure Checkout Channels</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E0E7E2] text-xs font-bold text-[#123C2A] shadow-2xs"
              >
                {method}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-[#5E6E66] mt-3">
            All transactions encrypted with 256-bit SSL. Immediate delivery to your email upon confirmation.
          </p>
        </div>

      </div>
    </section>
  );
}
