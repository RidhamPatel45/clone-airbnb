"use client";

import React, { useState } from "react";
import { Search, Globe, Menu, User, Sparkles } from "lucide-react";

export const Header: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-[#EBEBEB] transition-shadow duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Airbnb Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <svg
            className="w-8 h-8 text-[#FF385C]"
            viewBox="0 0 32 32"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.479.96 3.435l.011.382c0 4.542-3.415 7.7-7.9 7.7-2.671 0-4.996-1.125-6.6-3.056-1.604 1.931-3.929 3.056-6.6 3.056-4.485 0-7.9-3.158-7.9-7.7 0-1.294.341-2.585 1.002-3.945l.235-.461C2.54 18.23 6.586 9.61 8.608 5.485l.407-.811C10.375 2.215 11.918 1 16 1zm0 3c-2.43 0-3.376.671-4.225 2.378l-.348.694c-2.029 4.137-6.074 12.756-7.012 14.674l-.178.361C3.655 23.3 3.4 24.167 3.4 25.1c0 3.125 2.296 5.3 5.4 5.3 2.502 0 4.606-1.468 5.714-3.832l.309-.702c.441-1.077 1.033-2.617 1.177-3.066.388-1.21 1.488-2.04 2.766-2.04 1.278 0 2.378.83 2.766 2.04.144.449.736 1.989 1.177 3.066l.309.702C23.994 28.932 26.098 30.4 28.6 30.4c3.104 0 5.4-2.175 5.4-5.3 0-1.134-.338-2.174-.954-3.473l-.16-.328c-.933-2.146-5.076-10.825-7.039-14.679l-.497-.954C24.47 3.86 23.385 3 16 3zm0 14c-1.657 0-3 1.343-3 3 0 1.92 1.458 3.518 3.328 3.933l.272.045.272-.045C18.542 23.518 20 21.92 20 20c0-1.657-1.343-3-3-3zm0 2c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
          </svg>
          <span className="text-xl font-bold tracking-tight text-[#FF385C] hidden xs:inline">airbnb</span>
        </div>

        {/* Center: Search Summary Pill (Medium and Large Screens) */}
        <div className="hidden md:flex items-center border border-[#DDDDDD] rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer divide-x divide-[#DDDDDD] text-sm">
          <button className="pr-4 font-semibold text-[#222222] hover:text-black">Anywhere</button>
          <button className="px-4 font-semibold text-[#222222] hover:text-black">Any week</button>
          <div className="pl-4 flex items-center gap-3">
            <span className="text-[#717171]">Add guests</span>
            <div className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center text-white">
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Mobile Search Pill (< md) */}
        <div className="flex md:hidden items-center gap-2.5 border border-[#DDDDDD] rounded-full py-1.5 px-3.5 shadow-sm bg-white cursor-pointer max-w-[210px] sm:max-w-[280px]">
          <Search className="w-3.5 h-3.5 text-[#222222] stroke-[2.5] shrink-0" />
          <div className="text-xs truncate">
            <span className="font-semibold text-[#222222]">Anywhere</span>
            <span className="text-[#717171] ml-1">· Any week</span>
          </div>
        </div>

        {/* Right: User Menu and Host Link */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:block text-sm font-semibold text-[#222222] hover:bg-[#F7F7F7] px-3.5 py-2 rounded-full transition-colors">
            Airbnb your home
          </button>
          
          <button
            className="hidden sm:flex p-2.5 text-[#222222] hover:bg-[#F7F7F7] rounded-full transition-colors"
            aria-label="Choose a language or currency"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* User Profile Dropdown Pill */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 border border-[#DDDDDD] rounded-full p-2 pl-3 hover:shadow-md transition-shadow"
              aria-label="Main navigation menu"
              aria-expanded={isUserMenuOpen}
            >
              <Menu className="w-4 h-4 text-[#222222]" />
              <div className="w-7 h-7 rounded-full bg-[#717171] flex items-center justify-center text-white overflow-hidden">
                <User className="w-4 h-4" />
              </div>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-[#EBEBEB] py-2 z-50 text-sm">
                <button className="w-full text-left px-4 py-3 font-semibold text-[#222222] hover:bg-[#F7F7F7]">
                  Sign up
                </button>
                <button className="w-full text-left px-4 py-3 text-[#222222] hover:bg-[#F7F7F7]">
                  Log in
                </button>
                <hr className="my-1 border-[#EBEBEB]" />
                <button className="w-full text-left px-4 py-3 text-[#222222] hover:bg-[#F7F7F7]">
                  Airbnb your home
                </button>
                <button className="w-full text-left px-4 py-3 text-[#222222] hover:bg-[#F7F7F7]">
                  Help Center
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
