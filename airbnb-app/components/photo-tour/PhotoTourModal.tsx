"use client";

import React, { useState } from "react";
import { ChevronLeft, Share, Heart, X, Check } from "lucide-react";
import { PhotoItem } from "@/lib/data/listing";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKeyboardNav } from "@/lib/hooks/useKeyboardNav";

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  onSelectPhoto: (index: number) => void;
}

export const PhotoTourModal: React.FC<PhotoTourModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSelectPhoto,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isSaved, setIsSaved] = useState(false);
  const [showShareAlert, setShowShareAlert] = useState(false);

  // Accessible modal hooks
  useScrollLock(isOpen);
  const modalRef = useFocusTrap(isOpen);
  useKeyboardNav({
    onEscape: onClose,
    enabled: isOpen,
  });

  if (!isOpen) return null;

  const categories = ["All", ...Array.from(new Set(photos.map((p) => p.category)))];

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareAlert(true);
        setTimeout(() => setShowShareAlert(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen photo tour"
      className="fixed inset-0 z-50 bg-white overflow-y-auto animate-fade-in"
    >
      <div ref={modalRef} tabIndex={-1} className="min-h-screen flex flex-col">
        {/* Sticky Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#EBEBEB] z-40 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 p-2 -ml-2 rounded-full hover:bg-[#F7F7F7] font-semibold text-sm text-[#222222] transition-colors"
            aria-label="Close photo tour"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            <span>Back to listing</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Share button */}
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full hover:bg-[#F7F7F7] transition-colors"
                aria-label="Share photo tour"
              >
                <Share className="w-4 h-4 text-[#222222]" />
              </button>
              {showShareAlert && (
                <div className="absolute right-0 top-full mt-2 bg-[#222222] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 whitespace-nowrap z-20">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Link copied!
                </div>
              )}
            </div>

            {/* Save / Heart button */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2.5 rounded-full hover:bg-[#F7F7F7] transition-colors"
              aria-label={isSaved ? "Saved" : "Save"}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  isSaved ? "fill-[#FF385C] text-[#FF385C] scale-110" : "text-[#222222]"
                }`}
              />
            </button>
          </div>
        </header>

        {/* Category Pills Bar */}
        <div className="max-w-[1120px] mx-auto w-full px-6 pt-6 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#222222] text-white shadow-sm"
                    : "bg-[#F7F7F7] text-[#222222] hover:bg-[#EBEBEB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Photos Grid Container */}
        <main className="max-w-[1120px] mx-auto w-full px-6 pb-20 flex-1">
          <div className="space-y-12">
            {selectedCategory === "All" ? (
              // Grouped by Category
              categories
                .filter((c) => c !== "All")
                .map((cat) => {
                  const catPhotos = photos.filter((p) => p.category === cat);
                  if (catPhotos.length === 0) return null;

                  return (
                    <section key={cat} aria-label={cat} className="space-y-4">
                      <h2 className="text-xl font-bold text-[#222222]">{cat}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {catPhotos.map((photo) => {
                          const originalIndex = photos.findIndex((p) => p.id === photo.id);
                          return (
                            <div
                              key={photo.id}
                              onClick={() => onSelectPhoto(originalIndex)}
                              className="group cursor-pointer space-y-2 overflow-hidden rounded-xl"
                            >
                              <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F7F7] rounded-xl">
                                <img
                                  src={photo.url}
                                  alt={photo.caption}
                                  onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85";
                                  }}
                                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-95"
                                  loading="lazy"
                                />
                              </div>
                              <p className="text-sm text-[#717171] leading-relaxed group-hover:text-[#222222] transition-colors">
                                {photo.caption}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })
            ) : (
              // Filtered View
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPhotos.map((photo) => {
                  const originalIndex = photos.findIndex((p) => p.id === photo.id);
                  return (
                    <div
                      key={photo.id}
                      onClick={() => onSelectPhoto(originalIndex)}
                      className="group cursor-pointer space-y-2 overflow-hidden rounded-xl"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F7F7] rounded-xl">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85";
                          }}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-95"
                          loading="lazy"
                        />
                      </div>
                      <p className="text-sm text-[#717171] leading-relaxed group-hover:text-[#222222] transition-colors">
                        {photo.caption}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
