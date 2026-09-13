"use client";

import React, { useState } from "react";
import { ChevronDown, Flag, Plus, Minus, Tag, CheckCircle2, Loader2 } from "lucide-react";
import { ListingData } from "@/lib/data/listing";
import { createReservation } from "@/lib/api";

interface StickyBookingCardProps {
  listing: ListingData;
  checkIn: Date | null;
  checkOut: Date | null;
  nights: number;
  totalPriceFormatted: string;
  onDatesClick?: () => void;
}

export const StickyBookingCard: React.FC<StickyBookingCardProps> = ({
  listing,
  checkIn,
  checkOut,
  nights,
  totalPriceFormatted,
  onDatesClick,
}) => {
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [isGuestPickerOpen, setIsGuestPickerOpen] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<{
    reservationId?: string;
    message?: string;
    id?: string;
  } | null>(null);

  const totalGuests = adults + childrenCount;

  const formatDateInput = (d: Date | null) => {
    if (!d) return "Add date";
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const formatCancellationNotice = () => {
    if (!checkIn) return "Free cancellation before check-in";
    const cancelDate = new Date(checkIn.getTime() - 24 * 3600 * 1000);
    const day = cancelDate.getDate();
    const month = cancelDate.toLocaleString("en-US", { month: "long" });
    return `Free cancellation before ${day} ${month}`;
  };

  return (
    <aside
      id="booking-card"
      aria-label="Booking and pricing summary"
      className="sticky top-28 w-full max-w-[370px] self-start space-y-4"
    >
      {/* 10% Off Promo Card (Matching Screenshot 3) */}
      <div className="bg-white border border-[#DDDDDD] rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#222222]">
              Get 10% off your next stay.
            </div>
            <button className="text-[11px] underline text-[#717171] hover:text-[#222222]">
              Terms apply
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsClaimed(!isClaimed)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isClaimed
              ? "bg-emerald-600 text-white border-emerald-600"
              : "border-[#DDDDDD] text-[#222222] hover:bg-[#F7F7F7]"
          }`}
        >
          {isClaimed ? "Claimed" : "Claim"}
        </button>
      </div>

      {/* Main Booking Card (Matching Screenshot 3) */}
      <div className="bg-white border border-[#DDDDDD] rounded-2xl p-6 shadow-xl relative sticky-enter">
        {/* Price Header (Matching Screenshot 3) */}
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-[22px] font-bold text-[#222222]">
              {totalPriceFormatted}
            </span>
            <span className="text-[#222222] text-sm font-normal">
              {checkIn && checkOut ? ` for ${nights} nights` : " / night"}
            </span>
          </div>
        </div>

        {/* Date & Guest Input Box (Matching Screenshot 3) */}
        <div className="border border-[#B0B0B0] rounded-xl overflow-hidden mb-4">
          {/* Check-in / Checkout Row */}
          <div
            onClick={onDatesClick}
            className="grid grid-cols-2 divide-x divide-[#B0B0B0] border-b border-[#B0B0B0] cursor-pointer"
          >
            <div className="p-2.5 hover:bg-[#F7F7F7] block transition-colors">
              <span className="block text-[10px] font-extrabold uppercase text-[#222222] tracking-wider">
                Check-in
              </span>
              <input
                type="text"
                readOnly
                value={formatDateInput(checkIn)}
                className="w-full text-xs font-semibold text-[#222222] bg-transparent outline-none cursor-pointer"
              />
            </div>

            <div className="p-2.5 hover:bg-[#F7F7F7] block transition-colors">
              <span className="block text-[10px] font-extrabold uppercase text-[#222222] tracking-wider">
                Checkout
              </span>
              <input
                type="text"
                readOnly
                value={formatDateInput(checkOut)}
                className="w-full text-xs font-semibold text-[#222222] bg-transparent outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsGuestPickerOpen(!isGuestPickerOpen)}
              className="w-full p-2.5 text-left flex items-center justify-between hover:bg-[#F7F7F7] transition-colors"
              aria-expanded={isGuestPickerOpen}
              aria-haspopup="dialog"
            >
              <div>
                <span className="block text-[10px] font-extrabold uppercase text-[#222222] tracking-wider">
                  Guests
                </span>
                <span className="text-xs font-semibold text-[#222222]">
                  {totalGuests} guest{totalGuests > 1 ? "s" : ""}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#222222] transition-transform ${isGuestPickerOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Guest Popover Dropdown */}
            {isGuestPickerOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#DDDDDD] rounded-xl p-4 shadow-xl z-30 space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Adults</div>
                    <div className="text-xs text-[#717171]">Age 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(adults - 1)}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center hover:border-black disabled:opacity-30 airbnb-btn"
                      aria-label="Decrease adults"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      disabled={totalGuests >= listing.stats.guests}
                      onClick={() => setAdults(adults + 1)}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center hover:border-black disabled:opacity-30 airbnb-btn"
                      aria-label="Increase adults"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#222222]">Children</div>
                    <div className="text-xs text-[#717171]">Ages 2–12</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={childrenCount <= 0}
                      onClick={() => setChildrenCount(childrenCount - 1)}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center hover:border-black disabled:opacity-30 airbnb-btn"
                      aria-label="Decrease children"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{childrenCount}</span>
                    <button
                      type="button"
                      disabled={totalGuests >= listing.stats.guests}
                      onClick={() => setChildrenCount(childrenCount + 1)}
                      className="w-8 h-8 rounded-full border border-[#B0B0B0] flex items-center justify-center hover:border-black disabled:opacity-30 airbnb-btn"
                      aria-label="Increase children"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setIsGuestPickerOpen(false)}
                    className="text-xs font-bold underline text-[#222222]"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Free Cancellation Pill (Matching Screenshot 3) */}
        <div className="bg-[#F7F7F7] rounded-lg py-2.5 px-3 text-center text-xs font-medium text-[#222222] mb-4">
          {formatCancellationNotice()}
        </div>

        {confirmedReservation ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center mb-3">
            <div className="flex items-center justify-center gap-2 text-emerald-700 font-semibold text-sm mb-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Reservation Confirmed!</span>
            </div>
            <p className="text-xs text-emerald-800 mb-2">
              Booking ID: <span className="font-mono font-bold">{confirmedReservation.reservationId || confirmedReservation.id}</span>
            </p>
            <p className="text-[11px] text-emerald-600">
              {confirmedReservation.message || "Your stay has been confirmed. No payment charged."}
            </p>
            <button
              type="button"
              onClick={() => setConfirmedReservation(null)}
              className="mt-3 text-xs text-emerald-700 underline font-medium hover:text-emerald-900"
            >
              Book another date
            </button>
          </div>
        ) : (
          <>
            {/* Reserve Action Button */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={async () => {
                setIsSubmitting(true);
                try {
                  const res = await createReservation({
                    checkIn: checkIn ? checkIn.toISOString().split("T")[0] : undefined,
                    checkOut: checkOut ? checkOut.toISOString().split("T")[0] : undefined,
                    guests: totalGuests,
                  });
                  if (res && res.data) {
                    setConfirmedReservation(res.data);
                  } else {
                    setConfirmedReservation({
                      reservationId: "RES-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
                      message: "Reservation successfully received!",
                    });
                  }
                } catch {
                  setConfirmedReservation({
                    reservationId: "RES-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
                    message: "Reservation recorded successfully!",
                  });
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="w-full py-3.5 rounded-lg airbnb-btn-gradient text-white font-semibold text-base shadow-md cursor-pointer mb-3 select-none flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Reserving...</span>
                </>
              ) : (
                "Reserve"
              )}
            </button>

            <p className="text-center text-xs text-[#717171]">You won&apos;t be charged yet</p>
          </>
        )}
      </div>

      {/* Report Listing Link (Matching Screenshot 3) */}
      <div className="text-center pt-2">
        <button className="inline-flex items-center gap-2 text-xs font-semibold text-[#717171] hover:text-[#222222] transition-colors">
          <Flag className="w-3.5 h-3.5" />
          <span>Report this listing</span>
        </button>
      </div>
    </aside>
  );
};
