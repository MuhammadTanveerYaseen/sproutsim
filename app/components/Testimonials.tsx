import React from "react";
import { Star, ShieldCheck, Heart } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Hamza Tariq",
      role: "Overseas Pakistani (UK)",
      country: "Visited Lahore & Islamabad",
      rating: 5,
      comment:
        "Landing at Islamabad airport without having to queue up for a local physical SIM was incredible. Scanned the QR code while waiting for luggage, and Jazz 4G LTE connected immediately with full speed.",
      avatar: "HT",
    },
    {
      name: "Sarah Jenkins",
      role: "Travel Vlogger",
      country: "Northern Areas (Hunza & Skardu)",
      rating: 5,
      comment:
        "Traveled all the way up the Karakoram Highway to Hunza and Gilgit. Signal stayed reliable for my live uploads and Google Maps. Hotspot tethering worked flawlessly with my camera and laptop.",
      avatar: "SJ",
    },
    {
      name: "Bilal Chaudhry",
      role: "Tech Consultant",
      country: "Karachi & Faisalabad",
      rating: 5,
      comment:
        "The transparent pricing in PKR makes SproutSIM 10x better than regular international roaming. Top-ups are instantaneous, and customer support was responsive in under two minutes.",
      avatar: "BC",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#F5F7F2] border-b border-[#E0E7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F8F0] border border-[#A7E8C1] text-[#123C2A] text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-[#2FBF71]" />
            <span>Loved by 15,000+ Pakistan Travelers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#123C2A] tracking-tight">
            Trusted by Travelers in Pakistan
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex text-[#2FBF71]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-[#123C2A]">
              4.9 / 5.0 Average Traveler Rating
            </span>
          </div>
        </div>

        {/* Reviews Cards: 1 column on mobile, 3 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] rounded-2xl border-2 border-[#E0E7E2] p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-[#2FBF71]">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#E9F8F0] text-[#123C2A] border border-[#A7E8C1]">
                    Verified
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
                  <p className="text-[10px] text-[#5E6E66]">{rev.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Accepted Payment Methods: 2 columns and 2 rows on mobile */}
        <div className="mt-12 pt-8 border-t border-[#E0E7E2]">
          <div className="text-center mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E6E66]">
              Accepted Secure Checkout Methods
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-bold text-[#123C2A]">
            <span className="px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] text-center">
              Apple Pay
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] text-center">
              Google Pay
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] text-center">
              Debit / Credit Card
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] text-center">
              Mastercard
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] text-center">
              Visa
            </span>
            <span className="px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#E0E7E2] text-center">
              JazzCash / EasyPaisa
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
