"use client";

import React from "react";

interface SleepingArrangementsProps {
  arrangements?: any;
}

export const SleepingArrangements: React.FC<SleepingArrangementsProps> = () => {
  const sleepingCards = [
    {
      id: "bedroom",
      title: "Bedroom",
      bedType: "1 double bed",
      image: "/images/sleep/bedroom.png",
      alt: "Bedroom with 1 double bed",
    },
    {
      id: "living-room",
      title: "Living room",
      bedType: "1 sofa",
      image: "/images/sleep/living-room.png",
      alt: "Living room with 1 sofa",
    },
  ];

  return (
    <section aria-label="Sleeping arrangements" className="py-8 border-b border-[#DDDDDD]">
      <h2 className="text-[22px] font-semibold text-[#222222] mb-6">
        Where you&apos;ll sleep
      </h2>

      {/* 2-Card Photo Grid Matching Reference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sleepingCards.map((card) => (
          <div
            key={card.id}
            className="cursor-pointer group"
          >
            {/* Image Container with Exact 409:273 Aspect Ratio and 16px Rounded Corners */}
            <div className="relative aspect-[409/273] w-full rounded-2xl overflow-hidden bg-[#F7F7F7]">
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
            </div>

            {/* Room Title & Bed Description */}
            <div className="mt-3">
              <h3 className="font-semibold text-base text-[#222222] leading-tight">
                {card.title}
              </h3>
              <p className="text-sm text-[#717171] mt-1 leading-tight">
                {card.bedType}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
