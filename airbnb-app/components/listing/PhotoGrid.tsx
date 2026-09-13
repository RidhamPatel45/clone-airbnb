"use client";

import React, { useState } from "react";
import { LayoutGrid } from "lucide-react";
import { PhotoItem } from "@/lib/data/listing";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface PhotoGridProps {
  photos: PhotoItem[];
  onOpenTour: (index?: number) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onOpenTour }) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const prefersReduced = useReducedMotion();
  const displayPhotos = photos.slice(0, 5);

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, id: number) => {
    // Fallback if network fails
    e.currentTarget.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85";
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="photos" aria-label="Listing photo gallery" className="relative mt-2 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-2 gap-2 h-[260px] sm:h-[350px] md:h-[420px] lg:h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-white">
        {/* Large Hero Photo */}
        {displayPhotos[0] && (
          <div
            className="col-span-1 sm:col-span-2 row-span-1 sm:row-span-2 relative overflow-hidden group cursor-pointer bg-[#F0F0F0]"
            onClick={() => onOpenTour(0)}
          >
            {/* Skeleton Shimmer */}
            {!loadedImages[displayPhotos[0].id] && (
              <div className="absolute inset-0 skeleton-shimmer z-0" />
            )}

            <img
              src={displayPhotos[0].url}
              alt={displayPhotos[0].caption}
              onLoad={() => handleImageLoad(displayPhotos[0].id)}
              onError={(e) => handleImageError(e, displayPhotos[0].id)}
              className={`relative z-10 w-full h-full object-cover transition-all duration-300 ${
                prefersReduced
                  ? ""
                  : "duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02] group-hover:brightness-90"
              }`}
              loading="eager"
            />
          </div>
        )}

        {/* 4 Smaller Grid Photos (Visible on Tablet & Desktop) */}
        {displayPhotos.slice(1, 5).map((photo, idx) => {
          const photoIndex = idx + 1;
          const isLoaded = loadedImages[photo.id];

          return (
            <div
              key={photo.id}
              className="hidden sm:block col-span-1 row-span-1 relative overflow-hidden group cursor-pointer bg-[#F0F0F0]"
              onClick={() => onOpenTour(photoIndex)}
            >
              {!isLoaded && <div className="absolute inset-0 skeleton-shimmer z-0" />}

              <img
                src={photo.url}
                alt={photo.caption}
                onLoad={() => handleImageLoad(photo.id)}
                onError={(e) => handleImageError(e, photo.id)}
                className={`relative z-10 w-full h-full object-cover transition-all duration-300 ${
                  prefersReduced
                    ? ""
                    : "duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:brightness-90"
                }`}
                loading="eager"
              />
            </div>
          );
        })}
      </div>

      {/* Floating 'Show all photos' button in bottom right corner */}
      <button
        onClick={() => onOpenTour(0)}
        className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex items-center gap-1.5 sm:gap-2 bg-white text-[#222222] font-semibold text-xs sm:text-sm py-1.5 px-3 sm:py-1.5 sm:px-3.5 rounded-lg border border-black/80 shadow-md hover:bg-[#F7F7F7] active:scale-97 transition-all z-10 airbnb-btn"
        aria-label={`Show all ${photos.length} photos`}
      >
        <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>Show all {photos.length} photos</span>
      </button>
    </section>
  );
};
