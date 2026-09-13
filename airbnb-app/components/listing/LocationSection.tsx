"use client";

import React, { useState } from "react";
import { MapPin, Plus, Minus, Compass } from "lucide-react";
import { ListingData } from "@/lib/data/listing";

interface LocationSectionProps {
  listing: ListingData;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ listing }) => {
  const [zoomLevel, setZoomLevel] = useState(14);

  return (
    <section id="location" aria-label="Property location map" className="py-8 border-b border-[#DDDDDD]">
      <h2 className="text-[22px] font-semibold text-[#222222] mb-2">Where you&apos;ll be</h2>
      <p className="text-base text-[#222222] mb-6">{listing.location}</p>

      {/* Map Canvas Mockup */}
      <div className="relative w-full h-[280px] sm:h-[360px] md:h-[460px] rounded-2xl overflow-hidden border border-[#DDDDDD] bg-[#E8ECEF] shadow-sm select-none">
        {/* Map Background Illustration with Coastal Shading */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d4e6f1] via-[#eaf2f8] to-[#d5dbdb] flex items-center justify-center">
          {/* Topographic Lines SVG */}
          <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridPattern)" />
            <path
              d="M0,200 Q250,150 500,280 T1000,240 T1500,320"
              fill="none"
              stroke="#0284c7"
              strokeWidth="4"
              opacity="0.4"
            />
            <path
              d="M0,230 Q250,180 500,310 T1000,270 T1500,350"
              fill="none"
              stroke="#0369a1"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>

          {/* Sea / Mediterranean Label */}
          <div className="absolute bottom-10 left-12 text-[#0369a1] font-semibold tracking-widest text-xs uppercase opacity-75 flex items-center gap-1.5">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Tyrrhenian Sea · Positano Bay</span>
          </div>

          {/* Property Location Pulsing Pin */}
          <div className="relative flex flex-col items-center z-10">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-20 h-20 bg-[#FF385C]/20 rounded-full animate-ping pointer-events-none" />
              <div className="w-14 h-14 rounded-full bg-[#FF385C] text-white flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 stroke-[2]" />
              </div>
            </div>
            <div className="mt-2 bg-white text-[#222222] font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg border border-[#DDDDDD]">
              Exact location provided after booking
            </div>
          </div>
        </div>

        {/* Zoom Controls (+ / -) */}
        <div className="absolute bottom-6 right-6 bg-white border border-[#DDDDDD] rounded-lg shadow-md divide-y divide-[#EBEBEB] overflow-hidden z-20">
          <button
            onClick={() => setZoomLevel(Math.min(18, zoomLevel + 1))}
            className="p-2.5 hover:bg-[#F7F7F7] block text-[#222222]"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(Math.max(10, zoomLevel - 1))}
            className="p-2.5 hover:bg-[#F7F7F7] block text-[#222222]"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Neighborhood info */}
      <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-[#222222]">
        <h3 className="font-semibold text-base">Positano, Campania, Italy</h3>
        <p className="text-[#717171]">
          Situated in the quiet, scenic upper cliffside of Positano with direct access to coastal walking trails
          and panoramic sea views. A short 8-minute scenic walk down the stone staircases brings you to Spiaggia Grande,
          boutique artisan shops, and Michelin-starred dining.
        </p>
      </div>
    </section>
  );
};
