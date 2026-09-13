export interface SimilarListing {
  id: string;
  title: string;
  distanceLabel: string;
  priceFormatted: string;
  pricePerNight: number;
  rating: number;
  images: string[];
}

export const similarListings: SimilarListing[] = [
  {
    id: "stay-1",
    title: "The Tropical Studio | 5 mins to Beach",
    distanceLabel: "2.4 km away",
    priceFormatted: "₹22,824",
    pricePerNight: 22824,
    rating: 4.96,
    images: [
      "/images/similar/similar-1.png",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "stay-2",
    title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
    distanceLabel: "3.1 km away",
    priceFormatted: "₹39,942",
    pricePerNight: 39942,
    rating: 4.95,
    images: [
      "/images/similar/similar-2.png",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "stay-3",
    title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool",
    distanceLabel: "4.8 km away",
    priceFormatted: "₹45,648",
    pricePerNight: 45648,
    rating: 5.0,
    images: [
      "/images/similar/similar-3.png",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "stay-4",
    title: "Luxury Apt | Private Pool | 6 Mins from Beach",
    distanceLabel: "1.9 km away",
    priceFormatted: "₹48,786",
    pricePerNight: 48786,
    rating: 4.93,
    images: [
      "/images/similar/similar-4.png",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "stay-5",
    title: "Serendipity Cottage - Calm Stay in Calangute-Baga.",
    distanceLabel: "5.2 km away",
    priceFormatted: "₹22,824",
    pricePerNight: 22824,
    rating: 4.92,
    images: [
      "/images/similar/similar-5.png",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
    ]
  }
];
