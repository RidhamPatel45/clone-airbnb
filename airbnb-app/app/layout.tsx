import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Villa Amorosa — Cliffside Luxury Retreat - Villas for Rent in Positano, Campania, Italy - Airbnb",
  description: "Entire villa in Positano, Italy. Perched dramatically on the cliffs of Positano, Villa Amorosa offers private heated infinity pool, 4 bedrooms, 4.5 baths, and panoramic Mediterranean views.",
  icons: {
    icon: "https://a0.muscache.com/airbnb/static/icons/android-icon-192x192-c0465f9f0380893768972a31a614b670.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-[#222222]">
        {children}
      </body>
    </html>
  );
}
