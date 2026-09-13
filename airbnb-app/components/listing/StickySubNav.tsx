"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface StickySubNavProps {
  onReserveClick: () => void;
  nights: number;
  totalPriceFormatted: string;
}

export const StickySubNav: React.FC<StickySubNavProps> = ({
  onReserveClick,
  nights,
  totalPriceFormatted,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("Photos");

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero section (~550px) until similar listings section
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 550 && scrollY < 4900);

      // Simple active tab tracker
      const amenitiesEl = document.getElementById("amenities");
      const reviewsEl = document.getElementById("reviews");
      const locationEl = document.getElementById("location");

      if (locationEl && scrollY >= locationEl.offsetTop - 150) {
        setActiveTab("Location");
      } else if (reviewsEl && scrollY >= reviewsEl.offsetTop - 150) {
        setActiveTab("Reviews");
      } else if (amenitiesEl && scrollY >= amenitiesEl.offsetTop - 150) {
        setActiveTab("Amenities");
      } else {
        setActiveTab("Photos");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string, tabName: string) => {
    setActiveTab(tabName);
    if (id === "photos") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="hidden md:block fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#DDDDDD] shadow-sm animate-fade-in transition-all">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Navigation Tabs */}
        <nav className="flex items-center gap-6 h-full text-sm font-semibold">
          {[
            { id: "photos", label: "Photos" },
            { id: "amenities", label: "Amenities" },
            { id: "reviews", label: "Reviews" },
            { id: "location", label: "Location" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id, tab.label)}
              className={`h-full border-b-2 flex items-center transition-colors ${
                activeTab === tab.label
                  ? "border-[#222222] text-[#222222]"
                  : "border-transparent text-[#717171] hover:text-[#222222]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right: Price, Rating & Reserve Button */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-base font-semibold text-[#222222]">
              {totalPriceFormatted}{" "}
              <span className="font-normal text-sm text-[#717171]">
                for {nights} nights
              </span>
            </div>
            <div className="flex items-center justify-end gap-1 text-xs text-[#222222]">
              <Star className="w-3 h-3 fill-[#222222] text-[#222222]" />
              <span className="font-semibold">4.95</span>
              <span>·</span>
              <span className="text-[#717171] underline">19 reviews</span>
            </div>
          </div>

          <button
            onClick={onReserveClick}
            className="px-6 py-3 rounded-lg airbnb-btn-gradient text-white font-semibold text-sm shadow hover:opacity-90 active:scale-95 transition-all"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};
