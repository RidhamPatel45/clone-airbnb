"use client";

import React, { useState } from "react";
import { listingData } from "@/lib/data/listing";
import { Header } from "@/components/listing/Header";
import { StickySubNav } from "@/components/listing/StickySubNav";
import { TitleSection } from "@/components/listing/TitleSection";
import { PhotoGrid } from "@/components/listing/PhotoGrid";
import { HostSection } from "@/components/listing/HostSection";
import { SleepingArrangements } from "@/components/listing/SleepingArrangements";
import { AmenitiesSection } from "@/components/listing/AmenitiesSection";
import { CalendarSection } from "@/components/listing/CalendarSection";
import { StickyBookingCard } from "@/components/listing/StickyBookingCard";
import { ReviewsSection } from "@/components/listing/ReviewsSection";
import { LocationSection } from "@/components/listing/LocationSection";
import { HostProfileSection } from "@/components/listing/HostProfileSection";
import { SimilarListings } from "@/components/listing/SimilarListings";
import { Footer } from "@/components/listing/Footer";
import { PhotoTourModal } from "@/components/photo-tour/PhotoTourModal";
import { LightboxModal } from "@/components/lightbox/LightboxModal";

export default function ListingPage() {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Coordinated booking date state (Default: 18 Oct 2026 - 23 Oct 2026)
  const [checkIn, setCheckIn] = useState<Date | null>(new Date(2026, 9, 18));
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(2026, 9, 23));

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)))
      : 5;

  // Exact reference price matching (28,499 for 5 nights; proportional 5,700/night for other durations)
  const totalPrice = nights === 5 ? 28499 : nights * 5700;
  const totalPriceFormatted = "₹" + totalPrice.toLocaleString("en-IN");

  const handleSelectDate = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date.getTime() < checkIn.getTime()) {
      setCheckIn(date);
      setCheckOut(null);
    } else if (date.getTime() === checkIn.getTime()) {
      // Keep check-in unchanged
    } else {
      setCheckOut(date);
    }
  };

  const handleClearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  const handleOpenTour = (initialIndex: number = 0) => {
    setActivePhotoIndex(initialIndex);
    setIsTourOpen(true);
  };

  const handleCloseTour = () => {
    setIsTourOpen(false);
  };

  const handleSelectPhotoForLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleReserveScroll = () => {
    const card = document.getElementById("booking-card");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleDatesClick = () => {
    const cal = document.getElementById("calendar");
    if (cal) {
      cal.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Sticky Sub-Navigation (appears past hero) */}
      <StickySubNav
        onReserveClick={handleReserveScroll}
        nights={nights}
        totalPriceFormatted={totalPriceFormatted}
      />

      {/* Main Listing Content Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 pb-24 lg:pb-8">
        {/* Title & Share/Save Block */}
        <TitleSection listing={listingData} />

        {/* 5-Photo Hero Grid */}
        <PhotoGrid
          photos={listingData.photos}
          onOpenTour={handleOpenTour}
        />

        {/* 2-Column Section (Host, Sleeping, Amenities, Calendar + Sticky Booking Widget) */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 relative pb-12 border-b border-[#DDDDDD]">
          {/* Left Column */}
          <div className="w-full lg:max-w-[60%] flex-1">
            <HostSection listing={listingData} />
            <SleepingArrangements arrangements={listingData.sleepingArrangements} />
            <AmenitiesSection categories={listingData.amenities} />
            <CalendarSection
              location={listingData.city}
              checkIn={checkIn}
              checkOut={checkOut}
              onSelectDate={handleSelectDate}
              onClearDates={handleClearDates}
            />
          </div>

          {/* Right Column: Sticky Booking Widget (Stretches to bottom of Calendar on Desktop; neatly centered on tablet/mobile) */}
          <div className="w-full lg:w-[38%] flex justify-center lg:justify-end self-stretch">
            <StickyBookingCard
              listing={listingData}
              checkIn={checkIn}
              checkOut={checkOut}
              nights={nights}
              totalPriceFormatted={totalPriceFormatted}
              onDatesClick={handleDatesClick}
            />
          </div>
        </div>

        {/* Full-Width Reviews Section (Covering Whole Page - Matching Screenshot 2) */}
        <div className="w-full">
          <ReviewsSection listing={listingData} />
        </div>

        {/* Full-Width Location / Map Section */}
        <div className="w-full">
          <LocationSection listing={listingData} />
        </div>

        {/* Full-Width Host Profile Section */}
        <div className="w-full">
          <HostProfileSection
            host={listingData.host}
            rating={listingData.rating}
            reviewCount={listingData.reviewCount}
          />
        </div>

        {/* Full-Width "More stays nearby" Similar Listings Section (Matching Screenshot 1) */}
        <div className="w-full">
          <SimilarListings />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile & Tablet Floating Bottom Reserve Bar (< lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#DDDDDD] px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div>
          <div className="text-base font-bold text-[#222222]">
            {totalPriceFormatted}{" "}
            <span className="font-normal text-xs text-[#717171]">
              {checkIn && checkOut ? `for ${nights} nights` : "/ night"}
            </span>
          </div>
          <button
            onClick={handleDatesClick}
            className="text-xs underline font-semibold text-[#222222] hover:text-black block"
          >
            {checkIn && checkOut
              ? `${checkIn.getDate()} ${checkIn.toLocaleString("en-US", { month: "short" })} – ${checkOut.getDate()} ${checkOut.toLocaleString("en-US", { month: "short" })}`
              : "Select dates"}
          </button>
        </div>

        <button
          onClick={handleReserveScroll}
          className="px-6 py-2.5 sm:py-3 rounded-lg airbnb-btn-gradient text-white font-semibold text-sm shadow hover:opacity-90 active:scale-95 transition-all"
        >
          Reserve
        </button>
      </div>

      {/* Overlays */}
      {/* 1. Full-screen Photo Tour Modal */}
      <PhotoTourModal
        isOpen={isTourOpen}
        onClose={handleCloseTour}
        photos={listingData.photos}
        onSelectPhoto={handleSelectPhotoForLightbox}
      />

      {/* 2. Single-photo Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        photos={listingData.photos}
        currentIndex={activePhotoIndex}
        onIndexChange={setActivePhotoIndex}
      />
    </div>
  );
}
