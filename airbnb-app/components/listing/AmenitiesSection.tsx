"use client";

import React, { useState } from "react";
import {
  Wifi,
  Tv,
  Utensils,
  Car,
  Waves,
  Snowflake,
  ShieldCheck,
  Mountain,
  Laptop,
  Flame,
  Bath,
  Wind,
  Droplets,
  Package,
  BookOpen,
  X,
  Sparkles,
} from "lucide-react";
import { AmenityCategory } from "@/lib/data/listing";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKeyboardNav } from "@/lib/hooks/useKeyboardNav";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface AmenitiesSectionProps {
  categories: AmenityCategory[];
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ categories }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const prefersReduced = useReducedMotion();

  // Accessible modal hooks
  useScrollLock(isOpenModal);
  const modalRef = useFocusTrap(isOpenModal);
  useKeyboardNav({
    onEscape: () => setIsOpenModal(false),
    enabled: isOpenModal,
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "wifi": return <Wifi className="w-6 h-6 stroke-[1.5]" />;
      case "tv": return <Tv className="w-6 h-6 stroke-[1.5]" />;
      case "utensils": return <Utensils className="w-6 h-6 stroke-[1.5]" />;
      case "car": return <Car className="w-6 h-6 stroke-[1.5]" />;
      case "waves": return <Waves className="w-6 h-6 stroke-[1.5]" />;
      case "snowflake": return <Snowflake className="w-6 h-6 stroke-[1.5]" />;
      case "shield-check": return <ShieldCheck className="w-6 h-6 stroke-[1.5]" />;
      case "mountain": return <Mountain className="w-6 h-6 stroke-[1.5]" />;
      case "laptop": return <Laptop className="w-6 h-6 stroke-[1.5]" />;
      case "flame": return <Flame className="w-6 h-6 stroke-[1.5]" />;
      case "bath": return <Bath className="w-6 h-6 stroke-[1.5]" />;
      case "wind": return <Wind className="w-6 h-6 stroke-[1.5]" />;
      case "droplets": return <Droplets className="w-6 h-6 stroke-[1.5]" />;
      case "package": return <Package className="w-6 h-6 stroke-[1.5]" />;
      case "book-open": return <BookOpen className="w-6 h-6 stroke-[1.5]" />;
      default: return <Sparkles className="w-6 h-6 stroke-[1.5]" />;
    }
  };

  const priorityIds = ["kitchen", "wifi", "workspace", "parking"];
  const allItems = categories.flatMap((c) => c.items);
  const prioritizedItems = [
    { id: "kitchen", name: "Kitchen", icon: "utensils", available: true },
    { id: "wifi", name: "Wifi", icon: "wifi", available: true },
    { id: "workspace", name: "Dedicated workspace", icon: "laptop", available: true },
    { id: "parking", name: "Free parking on premises", icon: "car", available: true },
    ...allItems.filter((item) => !priorityIds.includes(item.id))
  ];
  const previewItems = prioritizedItems.slice(0, 10);
  const totalCount = allItems.length;

  return (
    <section id="amenities" aria-label="Amenities" className="py-8 border-b border-[#DDDDDD]">
      <h2 className="text-[22px] font-semibold text-[#222222] mb-6">What this place offers</h2>
      
      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
        {previewItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 text-[#222222]">
            <div className="text-[#222222]">{getIcon(item.icon)}</div>
            <span className="text-base">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Button to open all amenities */}
      <button
        onClick={() => setIsOpenModal(true)}
        className="px-6 py-3 border border-[#222222] rounded-lg font-semibold text-base text-[#222222] hover:bg-[#F7F7F7] active:scale-97 transition-all airbnb-btn"
        aria-haspopup="dialog"
        aria-expanded={isOpenModal}
      >
        Show all {totalCount} amenities
      </button>

      {/* Modal Dialog */}
      {isOpenModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="amenities-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className={`bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden ${
              prefersReduced ? "" : "animate-modal-in"
            }`}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#EBEBEB] px-6 py-4 flex items-center justify-between z-10">
              <button
                onClick={() => setIsOpenModal(false)}
                className="p-2 -ml-2 rounded-full hover:bg-[#F7F7F7] transition-colors airbnb-btn"
                aria-label="Close amenities modal"
              >
                <X className="w-5 h-5 text-[#222222]" />
              </button>
              <h3 id="amenities-modal-title" className="font-semibold text-base text-[#222222]">
                What this place offers
              </h3>
              <div className="w-7" />
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-8 divide-y divide-[#EBEBEB]">
              {categories.map((cat, idx) => (
                <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                  <h4 className="text-lg font-semibold text-[#222222] mb-4">{cat.category}</h4>
                  <div className="space-y-4">
                    {cat.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 text-[#222222]">
                        <div className="text-[#222222]">{getIcon(item.icon)}</div>
                        <span className="text-[15px]">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
