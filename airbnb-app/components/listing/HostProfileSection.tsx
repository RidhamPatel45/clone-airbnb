"use client";

import React from "react";
import { Award, Shield, Star, MessageSquare } from "lucide-react";
import { Host } from "@/lib/data/listing";

interface HostProfileSectionProps {
  host: Host;
  rating: number;
  reviewCount: number;
}

export const HostProfileSection: React.FC<HostProfileSectionProps> = ({
  host,
  rating,
  reviewCount,
}) => {
  return (
    <section aria-label="Host information" className="py-8 border-b border-[#DDDDDD]">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Host Overview Card */}
        <div className="w-full md:w-[350px] p-6 bg-[#F7F7F7] rounded-3xl border border-[#EBEBEB] flex flex-col items-center text-center shadow-sm">
          <div className="relative mb-3">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-24 h-24 rounded-full object-cover shadow-md border-2 border-white"
            />
            {host.isSuperhost && (
              <div
                className="absolute bottom-0 right-0 bg-[#FF385C] text-white p-1.5 rounded-full shadow"
                title="Superhost"
              >
                <Award className="w-4 h-4" />
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-[#222222]">{host.name}</h3>
          <p className="text-xs text-[#717171] font-semibold uppercase tracking-wider mt-1">
            Superhost · {host.yearsHosting} years hosting
          </p>

          <div className="w-full grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-[#DDDDDD] text-center">
            <div>
              <div className="text-xl font-bold text-[#222222] flex items-center justify-center gap-1">
                <span>{rating.toFixed(2)}</span>
                <Star className="w-3.5 h-3.5 fill-[#222222]" />
              </div>
              <div className="text-xs text-[#717171]">Rating</div>
            </div>
            <div>
              <div className="text-xl font-bold text-[#222222]">{reviewCount}</div>
              <div className="text-xs text-[#717171]">Reviews</div>
            </div>
          </div>
        </div>

        {/* Right: Host Details & Contact */}
        <div className="flex-1 space-y-5">
          <h4 className="text-lg font-semibold text-[#222222]">Host details</h4>
          <p className="text-[15px] leading-relaxed text-[#222222]">{host.bio}</p>

          {host.cohosts && host.cohosts.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-[#222222] mb-2">Co-hosts</h5>
              <div className="flex items-center gap-4">
                {host.cohosts.map((cohost, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img
                      src={cohost.avatar}
                      alt={cohost.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-[#222222] font-medium">{cohost.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1.5 text-sm text-[#222222]">
            <div>Response rate: <span className="font-semibold">{host.responseRate}</span></div>
            <div>Responds: <span className="font-semibold">{host.responseTime}</span></div>
          </div>

          <div>
            <button className="px-6 py-3 border border-[#222222] rounded-lg font-semibold text-base text-[#222222] hover:bg-[#F7F7F7] active:scale-98 transition-all flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Contact Host</span>
            </button>
          </div>

          {/* Airbnb Protection Banner */}
          <div className="flex items-start gap-3 pt-4 border-t border-[#EBEBEB] text-xs text-[#717171] leading-relaxed">
            <Shield className="w-6 h-6 text-[#FF385C] shrink-0 mt-0.5" />
            <p>
              To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
