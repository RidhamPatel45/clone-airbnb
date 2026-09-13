"use client";

import React, { useState } from "react";
import { Share, Heart, Star, Award, Check } from "lucide-react";
import { ListingData } from "@/lib/data/listing";

interface TitleSectionProps {
  listing: ListingData;
}

export const TitleSection: React.FC<TitleSectionProps> = ({ listing }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopiedAlert(true);
        setTimeout(() => setShowCopiedAlert(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleHeartClick = () => {
    setIsSaved(!isSaved);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
  };

  return (
    <div className="pt-6 pb-4">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#222222] tracking-tight leading-tight mb-2">
        {listing.title}
      </h1>

      {/* Details Row & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between text-sm gap-2">
        {/* Left: Rating, Reviews, Superhost, Location */}
        <div className="flex flex-wrap items-center gap-2 text-[#222222]">
          <div className="flex items-center gap-1 font-semibold">
            <Star className="w-4 h-4 fill-[#222222] text-[#222222]" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>

          <span aria-hidden="true">·</span>

          <a href="#reviews" className="font-semibold underline hover:text-[#717171] transition-colors">
            {listing.reviewCount} reviews
          </a>

          {listing.isSuperhost && (
            <>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1 text-[#717171]">
                <Award className="w-4 h-4 text-[#FF385C]" />
                <span>Superhost</span>
              </div>
            </>
          )}

          <span aria-hidden="true">·</span>

          <a href="#location" className="font-semibold underline hover:text-[#717171] transition-colors">
            {listing.location}
          </a>
        </div>

        {/* Right: Share & Save buttons */}
        <div className="flex items-center gap-2">
          {/* Share Button */}
          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] active:scale-97 font-semibold text-[#222222] transition-all underline airbnb-btn"
              aria-label="Share this listing"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>

            {showCopiedAlert && (
              <div className="absolute right-0 top-full mt-2 bg-[#222222] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 whitespace-nowrap z-20 animate-fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Link copied!
              </div>
            )}
          </div>

          {/* Save / Heart Button */}
          <button
            onClick={handleHeartClick}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F7F7F7] active:scale-97 font-semibold text-[#222222] transition-all underline airbnb-btn"
            aria-label={isSaved ? "Saved to wishlist" : "Save to wishlist"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? "fill-[#FF385C] text-[#FF385C]" : "text-[#222222]"
              } ${isBouncing ? "animate-heart-bounce" : ""}`}
            />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
