"use client";

import React, { useState } from "react";
import { Trophy, Laptop, Key, Calendar, Award, ChevronRight } from "lucide-react";
import { ListingData } from "@/lib/data/listing";

interface HostSectionProps {
  listing: ListingData;
}

export const HostSection: React.FC<HostSectionProps> = ({ listing }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="py-6 border-b border-[#DDDDDD]">
      {/* Host Summary Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EBEBEB]">
        <div>
          <h2 className="text-[22px] font-semibold text-[#222222]">
            Entire villa hosted by {listing.host.name}
          </h2>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[#717171] mt-1 list-none p-0">
            <li>{listing.stats.guests} guests</li>
            <li aria-hidden="true">·</li>
            <li>{listing.stats.bedrooms} bedrooms</li>
            <li aria-hidden="true">·</li>
            <li>{listing.stats.beds} beds</li>
            <li aria-hidden="true">·</li>
            <li>{listing.stats.baths} baths</li>
          </ol>
        </div>

        {/* Host Avatar with Superhost Badge */}
        <div className="relative">
          <img
            src={listing.host.avatar}
            alt={listing.host.name}
            className="w-14 h-14 rounded-full object-cover border border-[#DDDDDD]"
          />
          {listing.host.isSuperhost && (
            <div
              className="absolute -bottom-1 -right-1 bg-[#FF385C] text-white p-1 rounded-full shadow-sm"
              title="Superhost"
            >
              <Award className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>

      {/* Guest Favorite Banner */}
      {listing.isGuestFavorite && (
        <div className="my-6 p-4 rounded-xl border border-[#DDDDDD] flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF0F2] flex items-center justify-center text-[#FF385C]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-base text-[#222222]">Guest favorite</div>
              <div className="text-xs text-[#717171]">
                One of the most loved homes on Airbnb based on ratings and reviews
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-center divide-x divide-[#DDDDDD]">
            <div className="px-2">
              <div className="text-lg font-bold text-[#222222]">{listing.rating.toFixed(2)}</div>
              <div className="text-[11px] text-[#717171]">★★★★★</div>
            </div>
            <div className="pl-4">
              <div className="text-lg font-bold text-[#222222]">{listing.reviewCount}</div>
              <div className="text-[11px] text-[#717171] underline font-semibold">Reviews</div>
            </div>
          </div>
        </div>
      )}

      {/* Key Highlights */}
      <div className="space-y-5 py-4 border-b border-[#EBEBEB]">
        {listing.highlights.map((highlight, index) => {
          let IconComponent = Trophy;
          if (highlight.icon === "laptop") IconComponent = Laptop;
          if (highlight.icon === "key") IconComponent = Key;
          if (highlight.icon === "calendar") IconComponent = Calendar;

          return (
            <div key={index} className="flex items-start gap-4">
              <div className="text-[#222222] mt-0.5">
                <IconComponent className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#222222]">{highlight.title}</h3>
                <p className="text-sm text-[#717171] leading-relaxed">{highlight.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Description Text */}
      <div className="pt-6">
        <div className="space-y-4 text-[15px] leading-relaxed text-[#222222]">
          <p>{listing.description[0]}</p>
          {(isDescriptionExpanded || listing.description.length <= 1) && (
            <>
              {listing.description.slice(1).map((paragraph, idx) => (
                <p key={idx} className="animate-fade-in">
                  {paragraph}
                </p>
              ))}
            </>
          )}
        </div>

        {listing.description.length > 1 && (
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="mt-4 flex items-center gap-1 font-semibold text-base underline text-[#222222] hover:text-black transition-colors"
          >
            <span>{isDescriptionExpanded ? "Show less" : "Show more"}</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${isDescriptionExpanded ? "rotate-90" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
};
