"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react";
import { similarListings, SimilarListing } from "@/lib/data/similarListings";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export const SimilarListings: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [savedCards, setSavedCards] = useState<Record<string, boolean>>({});
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});
  const prefersReduced = useReducedMotion();

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDotClick = (id: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes((prev) => ({ ...prev, [id]: index }));
  };

  return (
    <section aria-label="Similar stays nearby" className="py-12 border-t border-[#DDDDDD] my-8">
      {/* Section Header with 2/2 Counter and Arrows (Matching Screenshot 1) */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-bold text-[#222222]">More stays nearby</h2>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#222222]" aria-live="polite">
            {currentPage} / 2
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black active:scale-95 disabled:opacity-30 disabled:hover:border-[#DDDDDD] transition-all"
              aria-label="Previous stays"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              disabled={currentPage === 2}
              className="w-8 h-8 rounded-full border border-[#DDDDDD] flex items-center justify-center text-[#222222] hover:border-black active:scale-95 disabled:opacity-30 disabled:hover:border-[#DDDDDD] transition-all"
              aria-label="Next stays"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5-Card Horizontal Row (Matching Screenshot 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {similarListings.map((listing: SimilarListing) => {
          const isSaved = !!savedCards[listing.id];
          const activeIndex = activeImageIndexes[listing.id] || 0;
          const currentImg = listing.images[activeIndex] || listing.images[0];

          return (
            <div
              key={listing.id}
              className={`group cursor-pointer flex flex-col justify-between ${
                prefersReduced ? "" : "card-hover-lift"
              }`}
            >
              {/* Image Container with Mini Carousel */}
              <div className="relative aspect-[164/208] w-full rounded-2xl overflow-hidden bg-[#F7F7F7] mb-3">
                <img
                  src={currentImg}
                  alt={listing.title}
                  className={`w-full h-full object-cover transition-opacity ${
                    prefersReduced ? "" : "duration-200"
                  }`}
                  loading="lazy"
                />

                {/* Independent Heart/Save Toggle Button (appears on hover or when saved) */}
                <button
                  onClick={(e) => toggleSave(listing.id, e)}
                  className={`absolute top-3 right-3 p-1.5 rounded-full hover:scale-110 active:scale-95 transition-all z-10 ${
                    isSaved ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  aria-label={isSaved ? "Saved" : "Save"}
                >
                  <Heart
                    className={`w-5 h-5 drop-shadow-md transition-all ${
                      isSaved
                        ? "fill-[#FF385C] text-[#FF385C] animate-heart-bounce"
                        : "fill-black/30 text-white stroke-[2]"
                    }`}
                  />
                </button>

                {/* Dot Indicators on Image Hover */}
                {listing.images.length > 1 && (
                  <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    {listing.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => handleDotClick(listing.id, i, e)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i === activeIndex
                            ? "w-2 h-2 bg-white shadow-sm"
                            : "bg-white/60 hover:bg-white"
                        }`}
                        aria-label={`View photo ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Metadata (Matching Screenshot 1) */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-[#222222] line-clamp-2 leading-snug">
                  {listing.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#222222]">
                  <span className="font-bold">{listing.priceFormatted}</span>
                  <div className="flex items-center gap-0.5 text-xs">
                    <Star className="w-3 h-3 fill-[#222222] text-[#222222]" />
                    <span>{listing.rating.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
