"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";

interface CalendarSectionProps {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectDate: (date: Date) => void;
  onClearDates: () => void;
}

const MONTH_NAMES = ["October", "November"];

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  location,
  checkIn,
  checkOut,
  onSelectDate,
  onClearDates,
}) => {
  // October 2026 starts on Thursday (index 4) and has 31 days
  const octOffset = 4;
  const octDays = 31;

  // November 2026 starts on Sunday (index 0) and has 30 days
  const novOffset = 0;
  const novDays = 30;

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const nightsCount =
    checkIn && checkOut
      ? Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)))
      : 5;

  const isSameDay = (d1: Date | null, year: number, month: number, day: number) => {
    if (!d1) return false;
    return d1.getFullYear() === year && d1.getMonth() === month && d1.getDate() === day;
  };

  const isDateInRange = (year: number, month: number, day: number) => {
    if (!checkIn || !checkOut) return false;
    const current = new Date(year, month, day).getTime();
    return current > checkIn.getTime() && current < checkOut.getTime();
  };

  const formatSubtitle = () => {
    if (checkIn && checkOut) {
      const startStr = `${checkIn.getDate()} ${checkIn.toLocaleString("en-US", { month: "short" })} ${checkIn.getFullYear()}`;
      const endStr = `${checkOut.getDate()} ${checkOut.toLocaleString("en-US", { month: "short" })} ${checkOut.getFullYear()}`;
      return `${startStr} - ${endStr}`;
    }
    if (checkIn) {
      return `Check-in: ${checkIn.getDate()} ${checkIn.toLocaleString("en-US", { month: "short" })} ${checkIn.getFullYear()} — Select checkout date`;
    }
    return "Select check-in date";
  };

  return (
    <section id="calendar" aria-label="Availability calendar" className="py-8">
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold text-[#222222]">
          {checkIn && checkOut ? `${nightsCount} nights in ${location}` : `Select dates in ${location}`}
        </h2>
        <p className="text-sm text-[#717171] mt-1">{formatSubtitle()}</p>
      </div>

      {/* 2-Month Calendar Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[650px]">
        {/* Month 1: October 2026 */}
        <div>
          <div className="flex items-center justify-between font-semibold text-sm text-[#222222] mb-4">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>October 2026</span>
            <div className="w-8" />
          </div>

          <div className="grid grid-cols-7 text-center text-xs text-[#717171] font-semibold mb-2">
            {weekDays.map((d, i) => (
              <span key={i} className="py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center text-sm font-semibold">
            {/* Blank offset days */}
            {[...Array(octOffset)].map((_, i) => (
              <div key={`blank-${i}`} className="h-10" />
            ))}

            {/* October days */}
            {[...Array(octDays)].map((_, i) => {
              const day = i + 1;
              const isStart = isSameDay(checkIn, 2026, 9, day);
              const isEnd = isSameDay(checkOut, 2026, 9, day);
              const inRange = isDateInRange(2026, 9, day);

              return (
                <div
                  key={`oct-${day}`}
                  onClick={() => onSelectDate(new Date(2026, 9, day))}
                  className={`h-10 flex items-center justify-center relative cursor-pointer select-none transition-colors ${
                    inRange ? "bg-[#F7F7F7]" : ""
                  } ${isStart && checkOut ? "rounded-l-full bg-[#F7F7F7]" : ""} ${isEnd ? "rounded-r-full bg-[#F7F7F7]" : ""}`}
                >
                  <span
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-semibold transition-transform active:scale-95 ${
                      isStart || isEnd
                        ? "bg-[#222222] text-white shadow-sm"
                        : "hover:border hover:border-black text-[#222222]"
                    }`}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Month 2: November 2026 */}
        <div>
          <div className="flex items-center justify-between font-semibold text-sm text-[#222222] mb-4">
            <div className="w-8" />
            <span>November 2026</span>
            <button
              type="button"
              className="p-2 rounded-full hover:bg-[#F7F7F7] transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs text-[#717171] font-semibold mb-2">
            {weekDays.map((d, i) => (
              <span key={i} className="py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center text-sm font-semibold">
            {[...Array(novOffset)].map((_, i) => (
              <div key={`blank-nov-${i}`} className="h-10" />
            ))}

            {[...Array(novDays)].map((_, i) => {
              const day = i + 1;
              const isStart = isSameDay(checkIn, 2026, 10, day);
              const isEnd = isSameDay(checkOut, 2026, 10, day);
              const inRange = isDateInRange(2026, 10, day);

              return (
                <div
                  key={`nov-${day}`}
                  onClick={() => onSelectDate(new Date(2026, 10, day))}
                  className={`h-10 flex items-center justify-center relative cursor-pointer select-none transition-colors ${
                    inRange ? "bg-[#F7F7F7]" : ""
                  } ${isStart && checkOut ? "rounded-l-full bg-[#F7F7F7]" : ""} ${isEnd ? "rounded-r-full bg-[#F7F7F7]" : ""}`}
                >
                  <span
                    className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-semibold transition-transform active:scale-95 ${
                      isStart || isEnd
                        ? "bg-[#222222] text-white shadow-sm"
                        : "hover:border hover:border-black text-[#222222]"
                    }`}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calendar Bottom Actions */}
      <div className="flex items-center justify-between mt-6 text-xs max-w-[650px]">
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-[#F7F7F7] text-[#222222]"
          aria-label="Keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onClearDates}
          className="font-bold underline text-[#222222] hover:text-black transition-colors"
        >
          Clear dates
        </button>
      </div>
    </section>
  );
};
