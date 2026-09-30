import React from "react";
import { Star, ShieldCheck, Heart } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Danyal Sheikh",
      role: "iPhone 15 Pro Max User (Karachi)",
      country: "Saved Rs 180,000+ PTA Tax",
      rating: 5,
      comment:
        "My imported iPhone 15 Pro Max was about to get blocked after 60 days. Instead of paying almost 2 lac in PTA tax, I installed SproutSIM. High-speed 4G data has been working without a single interruption for 4 months now!",
      avatar: "DS",
    },
    {
      name: "Ayesha Malik",
      role: "Content Creator (Lahore)",
      country: "iPhone 14 Pro User",
      rating: 5,
      comment:
        "I use my imported iPhone for daily vlogs and social media uploads. SproutSIM data is super fast and my WhatsApp and banking apps work without any issues. Hotspot to my MacBook is seamless.",
      avatar: "AM",
    },
    {
      name: "Zubair Khan",
      role: "Business Traveler (Islamabad)",
      country: "Galaxy S24 Ultra User",
      rating: 5,
      comment:
        "The absolute best discovery for keeping imported phones connected in Pakistan. Easy setup, instant email delivery with Hostinger, and top-up takes 10 seconds. Saved me massive device registration fees.",
      avatar: "ZK",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Over 25,000+ Active Connections</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            Trusted by Smartphone Users Across Pakistan
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex text-[#2FBF71]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#123C2A]">
              4.9 / 5.0 Average Satisfaction Rating
            </span>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-[#F5F7F2] rounded-2xl border-2 border-[#E0E7E2] p-5 sm:p-6 flex flex-col justify-between hover:border-[#2FBF71] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#2FBF71]">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1]">
                    Verified User
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#1C2420] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E0E7E2] flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#123C2A] text-[#A7E8C1] font-bold text-xs flex items-center justify-center">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#123C2A]">{rev.name}</h4>
                  <p className="text-[10px] text-[#2FBF71] font-semibold">{rev.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accepted Payment Methods: 2 columns on mobile */}
        <div className="mt-12 pt-8 border-t border-[#E0E7E2]">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E6E66]">
              Accepted Secure Checkout Methods
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-bold text-[#123C2A]">
            <span className="px-3 py-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] text-center">
              Apple Pay
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] text-center">
              Google Pay
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] text-center">
              Debit / Credit Card
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] text-center">
              Mastercard
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] text-center">
              Visa
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#F5F7F2] border border-[#E0E7E2] text-center">
              JazzCash / EasyPaisa
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
