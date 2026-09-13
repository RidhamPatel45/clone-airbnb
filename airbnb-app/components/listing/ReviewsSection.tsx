"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  CheckCircle2,
  KeyRound,
  MessageSquare,
  Map,
  Tag,
  SprayCan,
} from "lucide-react";
import { ListingData } from "@/lib/data/listing";

interface ReviewsSectionProps {
  listing: ListingData;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ listing }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  // Staggered scroll entrance using IntersectionObserver (one-time)
  useEffect(() => {
    const cards = document.querySelectorAll(".review-card-stagger");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) {
              setVisibleCards((prev) => ({ ...prev, [id]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [showAllReviews]);

  const filterTags = [
    { label: "Comfort", count: 6, emoji: "🛋️" },
    { label: "Accuracy", count: 5, emoji: "✅" },
    { label: "Hot tub", count: 5, emoji: "🛁" },
    { label: "Condition", count: 4, emoji: "🏠" },
    { label: "Hospitality", count: 8, emoji: "🎁" },
    { label: "Cleanliness", count: 4, emoji: "🧴" },
    { label: "Amenities", count: 2, emoji: "🎂" },
    { label: "Location", count: 7, emoji: "📍" },
  ];

  const displayedReviews = showAllReviews ? listing.reviews : listing.reviews.slice(0, 6);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      aria-label="Customer reviews"
      className="py-12 border-b border-[#DDDDDD]"
    >
      {/* Giant 4.95 Laurel Wreath Header Matching Screenshot 2 */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center justify-center gap-4">
          {/* Left Laurel Branch SVG */}
          <svg className="w-12 h-20 text-[#222222]" viewBox="0 0 48 80" fill="currentColor">
            <path d="M42 70 C30 65 20 50 18 35 C17 25 21 15 28 5 C23 15 20 28 22 42 C24 55 32 65 42 70 Z" />
            <path d="M28 25 C20 22 14 15 12 8 C15 15 20 20 28 25 Z" />
            <path d="M24 45 C15 42 8 33 6 22 C10 32 16 39 24 45 Z" />
            <path d="M28 65 C18 60 12 50 10 38 C14 48 20 56 28 65 Z" />
          </svg>

          <span className="text-[72px] font-extrabold text-[#222222] tracking-tight leading-none">
            {listing.rating.toFixed(2)}
          </span>

          {/* Right Laurel Branch SVG */}
          <svg className="w-12 h-20 text-[#222222] scale-x-[-1]" viewBox="0 0 48 80" fill="currentColor">
            <path d="M42 70 C30 65 20 50 18 35 C17 25 21 15 28 5 C23 15 20 28 22 42 C24 55 32 65 42 70 Z" />
            <path d="M28 25 C20 22 14 15 12 8 C15 15 20 20 28 25 Z" />
            <path d="M24 45 C15 42 8 33 6 22 C10 32 16 39 24 45 Z" />
            <path d="M28 65 C18 60 12 50 10 38 C14 48 20 56 28 65 Z" />
          </svg>
        </div>

        <h3 className="text-[22px] font-bold text-[#222222] mt-2">Guest favourite</h3>
        <p className="text-sm text-[#717171] mt-1 max-w-md">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button className="text-xs font-bold underline text-[#222222] mt-1 hover:text-black">
          How reviews work
        </button>
      </div>

      {/* 6-Column Category Breakdown Grid (Matching Screenshot 2) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 py-6 border-y border-[#EBEBEB] mb-8">
        {/* Overall Rating Graph */}
        <div className="flex flex-col justify-between">
          <span className="text-xs font-semibold text-[#222222]">Overall rating</span>
          <div className="space-y-1.5 my-2">
            {[
              { star: 5, fill: "100%" },
              { star: 4, fill: "0%" },
              { star: 3, fill: "0%" },
              { star: 2, fill: "0%" },
              { star: 1, fill: "0%" },
            ].map((bar) => (
              <div key={bar.star} className="flex items-center gap-2 text-[10px] text-[#717171]">
                <span>{bar.star}</span>
                <div className="flex-1 h-1 bg-[#EBEBEB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#222222] rounded-full" style={{ width: bar.fill }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cleanliness */}
        <div className="flex flex-col justify-between border-l border-[#EBEBEB] pl-4">
          <div>
            <div className="text-xs font-semibold text-[#222222]">Cleanliness</div>
            <div className="text-lg font-bold text-[#222222] mt-0.5">5.0</div>
          </div>
          <SprayCan className="w-6 h-6 text-[#222222] stroke-[1.5] mt-3" />
        </div>

        {/* Accuracy */}
        <div className="flex flex-col justify-between border-l border-[#EBEBEB] pl-4">
          <div>
            <div className="text-xs font-semibold text-[#222222]">Accuracy</div>
            <div className="text-lg font-bold text-[#222222] mt-0.5">5.0</div>
          </div>
          <CheckCircle2 className="w-6 h-6 text-[#222222] stroke-[1.5] mt-3" />
        </div>

        {/* Check-in */}
        <div className="flex flex-col justify-between border-l border-[#EBEBEB] pl-4">
          <div>
            <div className="text-xs font-semibold text-[#222222]">Check-in</div>
            <div className="text-lg font-bold text-[#222222] mt-0.5">5.0</div>
          </div>
          <KeyRound className="w-6 h-6 text-[#222222] stroke-[1.5] mt-3" />
        </div>

        {/* Communication */}
        <div className="flex flex-col justify-between border-l border-[#EBEBEB] pl-4">
          <div>
            <div className="text-xs font-semibold text-[#222222]">Communication</div>
            <div className="text-lg font-bold text-[#222222] mt-0.5">5.0</div>
          </div>
          <MessageSquare className="w-6 h-6 text-[#222222] stroke-[1.5] mt-3" />
        </div>

        {/* Location & Value */}
        <div className="flex flex-col justify-between border-l border-[#EBEBEB] pl-4">
          <div>
            <div className="text-xs font-semibold text-[#222222]">Location</div>
            <div className="text-lg font-bold text-[#222222] mt-0.5">4.8</div>
          </div>
          <Map className="w-6 h-6 text-[#222222] stroke-[1.5] mt-3" />
        </div>
      </div>

      {/* Filter Tag Pills (Matching Screenshot 2) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-none mb-8">
        {filterTags.map((tag, idx) => (
          <button
            key={idx}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#DDDDDD] bg-white text-xs font-semibold text-[#222222] hover:bg-[#F7F7F7] active:scale-95 transition-all whitespace-nowrap"
          >
            <span>{tag.emoji}</span>
            <span>{tag.label}</span>
            <span className="text-[#717171]">{tag.count}</span>
          </button>
        ))}
      </div>

      {/* Staggered Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
        {displayedReviews.map((rev, index) => {
          const isVisible = visibleCards[rev.id];
          return (
            <div
              key={rev.id}
              data-id={rev.id}
              className={`review-card-stagger space-y-3 transition-all duration-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${(index % 2) * 60}ms` }}
            >
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#DDDDDD]"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-base text-[#222222] leading-tight">
                    {rev.author}
                  </h4>
                  <div className="text-xs text-[#717171] leading-tight mt-0.5">
                    {rev.location ? `${rev.location} · ` : ""}
                    {rev.date}
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 text-xs text-[#222222]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#222222] text-[#222222]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-[15px] leading-relaxed text-[#222222]">
                {rev.content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Show more reviews button */}
      <button
        onClick={() => setShowAllReviews(!showAllReviews)}
        className="px-6 py-3 border border-[#222222] rounded-lg font-semibold text-base text-[#222222] hover:bg-[#F7F7F7] active:scale-97 transition-all"
      >
        {showAllReviews ? "Show fewer reviews" : `Show all ${listing.reviewCount} reviews`}
      </button>
    </section>
  );
};
