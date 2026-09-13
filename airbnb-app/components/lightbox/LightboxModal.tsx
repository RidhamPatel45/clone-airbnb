"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, Share2, Heart, Check } from "lucide-react";
import { PhotoItem } from "@/lib/data/listing";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { useKeyboardNav } from "@/lib/hooks/useKeyboardNav";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  currentIndex: number;
  onIndexChange: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  photos,
  currentIndex,
  onIndexChange,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const prefersReduced = useReducedMotion();

  // Scroll lock and focus trap
  useScrollLock(isOpen);
  const modalRef = useFocusTrap(isOpen);

  const handlePrev = () => {
    onIndexChange(currentIndex === 0 ? photos.length - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    onIndexChange(currentIndex === photos.length - 1 ? 0 : currentIndex + 1);
  };

  // Keyboard navigation for arrows and escape
  useKeyboardNav({
    onArrowLeft: handlePrev,
    onArrowRight: handleNext,
    onEscape: onClose,
    enabled: isOpen,
  });

  if (!isOpen || !photos[currentIndex]) return null;

  const currentPhoto = photos[currentIndex];

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
      aria-label="Single photo viewer"
      className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between animate-fade-in select-none"
    >
      <div ref={modalRef} tabIndex={-1} className="w-full h-full flex flex-col justify-between p-4 md:p-6 outline-none">
        {/* Top Controls Bar */}
        <header className="flex items-center justify-between z-10 w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 py-2 px-3 rounded-full hover:bg-white/10 text-white font-semibold text-sm transition-colors"
            aria-label="Close photo viewer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
            <span className="hidden sm:inline">Close</span>
          </button>

          {/* Photo Counter */}
          <div
            className="text-sm font-semibold tracking-wide text-white/90"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-white"
                aria-label="Share this photo"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {showShareAlert && (
                <div className="absolute right-0 top-full mt-2 bg-white text-[#222222] text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 whitespace-nowrap z-20">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Link copied!
                </div>
              )}
            </div>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2.5 rounded-full hover:bg-white/10 transition-colors text-white"
              aria-label={isSaved ? "Saved" : "Save"}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  isSaved ? "fill-[#FF385C] text-[#FF385C] scale-110" : "text-white"
                }`}
              />
            </button>
          </div>
        </header>

        {/* Center: Main Image with Prev/Next Controls */}
        <div className="relative flex-1 flex items-center justify-center my-2 max-h-[80vh]">
          {/* Prev Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white border border-white/15 backdrop-blur-md transition-all"
            aria-label="Previous photo (Left arrow)"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2]" />
          </button>

          {/* Image display */}
          <div className="relative max-w-[1200px] max-h-[76vh] flex items-center justify-center overflow-hidden">
            <img
              key={currentPhoto.id}
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              className={`max-w-full max-h-[76vh] object-contain rounded-lg shadow-2xl ${
                prefersReduced ? "" : "animate-scale-up"
              }`}
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white border border-white/15 backdrop-blur-md transition-all"
            aria-label="Next photo (Right arrow)"
          >
            <ChevronRight className="w-6 h-6 stroke-[2]" />
          </button>
        </div>

        {/* Bottom Bar: Caption & Category */}
        <footer className="text-center max-w-2xl mx-auto px-4 z-10">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#FF385C] bg-[#FF385C]/15 px-2.5 py-0.5 rounded-full mb-1">
            {currentPhoto.category}
          </span>
          <p className="text-sm text-white/85 font-medium leading-normal">
            {currentPhoto.caption}
          </p>
        </footer>
      </div>
    </div>
  );
};
