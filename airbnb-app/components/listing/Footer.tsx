"use client";

import React from "react";
import { Globe } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F7F7F7] border-t border-[#DDDDDD] pt-12 pb-8 text-sm text-[#222222]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#DDDDDD]">
          {/* Col 1 */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Support</h5>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Hosting</h5>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
              <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Airbnb</h5>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Gift cards</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#222222]">Community</h5>
            <ul className="space-y-2.5 text-[#717171]">
              <li><a href="#" className="hover:underline">Airbnb.org disaster relief</a></li>
              <li><a href="#" className="hover:underline">Combating discrimination</a></li>
              <li><a href="#" className="hover:underline">Referrals &amp; credits</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Locale Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#717171]">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-[#222222]">
            <button className="flex items-center gap-1.5 hover:underline">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </button>
            <button className="hover:underline">
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
