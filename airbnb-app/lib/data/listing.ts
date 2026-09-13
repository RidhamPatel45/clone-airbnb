export interface Host {
  name: string;
  avatar: string;
  isSuperhost: boolean;
  yearsHosting: number;
  responseRate: string;
  responseTime: string;
  bio: string;
  cohosts?: { name: string; avatar: string }[];
}

export interface AmenityItem {
  id: string;
  name: string;
  icon: string;
  description?: string;
  available: boolean;
}

export interface AmenityCategory {
  category: string;
  items: AmenityItem[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  date: string;
  rating: number;
  content: string;
  location?: string;
}

export interface PhotoItem {
  id: number;
  url: string;
  caption: string;
  category: 'Exterior' | 'Living Area' | 'Bedrooms' | 'Kitchen & Dining' | 'Terrace & Pool' | 'Bathrooms';
}

export interface ListingData {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  isGuestFavorite: boolean;
  stats: {
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
  };
  pricePerNight: number;
  originalPricePerNight?: number;
  cleaningFee: number;
  serviceFee: number;
  occupancyTaxes: number;
  host: Host;
  highlights: {
    title: string;
    description: string;
    icon: string;
  }[];
  description: string[];
  sleepingArrangements: {
    room: string;
    bedType: string;
    icon: string;
  }[];
  amenities: AmenityCategory[];
  reviewsOverview: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
  reviews: Review[];
  photos: PhotoItem[];
}

export const listingData: ListingData = {
  id: "listing-candolim-luxury-villa",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  location: "Candolim, Goa, India",
  city: "Candolim",
  country: "India",
  rating: 4.95,
  reviewCount: 19,
  isSuperhost: true,
  isGuestFavorite: true,
  stats: {
    guests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4.5,
  },
  pricePerNight: 5700,
  originalPricePerNight: 6400,
  cleaningFee: 1500,
  serviceFee: 850,
  occupancyTaxes: 450,
  host: {
    name: "Elena & Matteo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    isSuperhost: true,
    yearsHosting: 6,
    responseRate: "100%",
    responseTime: "within an hour",
    bio: "Passionate Amalfi coast architects and hospitality lovers. We designed Villa Amorosa to honor authentic Mediterranean stone masonry while delivering ultra-modern luxury comforts.",
    cohosts: [
      {
        name: "Marco",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
      }
    ]
  },
  highlights: [
    {
      title: "Guest favorite",
      description: "One of the most loved homes on Airbnb based on ratings, reviews, and reliability.",
      icon: "trophy"
    },
    {
      title: "Dedicated workspace",
      description: "A private high-speed studio with ergonomic Vitra chair and 350 Mbps fiber Wi-Fi.",
      icon: "laptop"
    },
    {
      title: "Self check-in",
      description: "Check yourself in with the smart keypad lock or request personal concierge greeting.",
      icon: "key"
    },
    {
      title: "Free cancellation before May 18",
      description: "Get a full refund if your travel plans change, no questions asked.",
      icon: "calendar"
    }
  ],
  description: [
    "Perched dramatically on the legendary cliffs of Positano, Villa Amorosa offers unparalleled panoramic views of the Tyrrhenian Sea and the pastel-colored cascade of Amalfi architecture.",
    "Completely restored with hand-hewn local stone, Venetian plaster, and minimalist Italian furniture, the villa spans over 3,800 sq ft across three cascading terraces. Step out onto the expansive teak deck featuring a heated infinity plunge pool that seemingly spills into the Mediterranean horizon.",
    "Every bedroom features bespoke king-size mattresses, imported Egyptian cotton linens, ensuite bathrooms clad in Carrara marble with rainfall showers, and private terrace access for enjoying morning espresso under the scent of lemon groves."
  ],
  sleepingArrangements: [
    {
      room: "Bedroom 1 (Master Suite)",
      bedType: "1 king bed · Private terrace",
      icon: "bed-double"
    },
    {
      room: "Bedroom 2",
      bedType: "1 queen bed · Ocean balcony",
      icon: "bed-double"
    },
    {
      room: "Bedroom 3",
      bedType: "1 queen bed · Garden patio",
      icon: "bed-double"
    },
    {
      room: "Bedroom 4",
      bedType: "2 single beds",
      icon: "bed-single"
    }
  ],
  amenities: [
    {
      category: "Scenic views",
      items: [
        { id: "sea-view", name: "Panoramic sea view", icon: "mountain", available: true },
        { id: "coastal-view", name: "Positano cliffside view", icon: "camera", available: true },
        { id: "sunset-view", name: "Direct sunset exposure", icon: "sun", available: true }
      ]
    },
    {
      category: "Bathroom",
      items: [
        { id: "bathtub", name: "Freestanding soaking tub", icon: "bath", available: true },
        { id: "hair-dryer", name: "Dyson Supersonic hair dryer", icon: "wind", available: true },
        { id: "shampoo", name: "Acqua di Parma toiletries", icon: "sparkles", available: true },
        { id: "hot-water", name: "Continuous hot water", icon: "flame", available: true },
        { id: "outdoor-shower", name: "Private outdoor sun shower", icon: "droplets", available: true }
      ]
    },
    {
      category: "Bedroom and laundry",
      items: [
        { id: "washer", name: "In-unit washer & dryer", icon: "washing-machine", available: true },
        { id: "essentials", name: "Towels, bed sheets, soap, toilet paper", icon: "package", available: true },
        { id: "hangers", name: "Cedar hangers & large walk-in closet", icon: "shirt", available: true },
        { id: "iron", name: "Steam iron & ironing board", icon: "sparkles", available: true }
      ]
    },
    {
      category: "Entertainment",
      items: [
        { id: "tv", name: "65\" 4K OLED Smart TV with Netflix & Apple TV", icon: "tv", available: true },
        { id: "sound", name: "Sonos multi-room wireless sound system", icon: "speaker", available: true },
        { id: "books", name: "Curated art & architecture library", icon: "book-open", available: true }
      ]
    },
    {
      category: "Heating and cooling",
      items: [
        { id: "ac", name: "Multi-zone climate control AC", icon: "snowflake", available: true },
        { id: "fireplace", name: "Modern bio-ethanol fireplace", icon: "flame", available: true },
        { id: "heating", name: "Heated stone floors", icon: "thermometer", available: true }
      ]
    },
    {
      category: "Home safety",
      items: [
        { id: "smoke-alarm", name: "Smoke alarms installed", icon: "shield-check", available: true },
        { id: "co-alarm", name: "Carbon monoxide alarm", icon: "shield-check", available: true },
        { id: "first-aid", name: "First aid emergency kit", icon: "medkit", available: true },
        { id: "fire-extinguisher", name: "Fire extinguisher", icon: "shield", available: true }
      ]
    },
    {
      category: "Internet and office",
      items: [
        { id: "wifi", name: "Fast Wi-Fi (350 Mbps verified)", icon: "wifi", available: true },
        { id: "workspace", name: "Dedicated workspace with ocean view", icon: "laptop", available: true }
      ]
    },
    {
      category: "Kitchen and dining",
      items: [
        { id: "kitchen", name: "Custom Boffi chef's kitchen", icon: "utensils", available: true },
        { id: "refrigerator", name: "Sub-Zero refrigerator & wine fridge", icon: "refrigerator", available: true },
        { id: "coffee-maker", name: "Nespresso & espresso machine", icon: "coffee", available: true },
        { id: "dishwasher", name: "Miele ultra-quiet dishwasher", icon: "utensils-crossed", available: true },
        { id: "dining-table", name: "Travertine marble 10-seater dining table", icon: "table", available: true }
      ]
    },
    {
      category: "Outdoor & leisure",
      items: [
        { id: "pool", name: "Private heated infinity pool (year-round)", icon: "waves", available: true },
        { id: "patio", name: "Sun loungers with shade umbrellas", icon: "umbrella", available: true },
        { id: "bbq", name: "Built-in outdoor Weber gas grill", icon: "flame", available: true },
        { id: "parking", name: "Private secure parking on premises with EV charger", icon: "car", available: true }
      ]
    }
  ],
  reviewsOverview: {
    cleanliness: 5.0,
    accuracy: 4.9,
    checkIn: 5.0,
    communication: 5.0,
    location: 5.0,
    value: 4.9
  },
  reviews: [
    {
      id: "rev-1",
      author: "Charlotte Harrison",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&h=128&q=80",
      date: "August 2026",
      rating: 5,
      location: "London, United Kingdom",
      content: "Staying at Villa Amorosa was easily the highlight of our trip through Italy. The infinity pool overlooking the sunset in Positano is even more breathtaking in person than in the pictures. Elena and Matteo were world-class hosts who arranged boat charters and restaurant reservations effortlessly!"
    },
    {
      id: "rev-2",
      author: "Julian Vance",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&h=128&q=80",
      date: "July 2026",
      rating: 5,
      location: "San Francisco, California",
      content: "Flawless in every metric. The finishes in the villa are top tier — Sonos audio in every room, pristine AC, fast internet (was able to jump on Zoom calls without a hitch), and the beds were heavenly. We will 100% be returning next summer."
    },
    {
      id: "rev-3",
      author: "Sophie Laurent",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&h=128&q=80",
      date: "June 2026",
      rating: 5,
      location: "Paris, France",
      content: "Un séjour magique! Everything was immaculate. Waking up to the azure water from the master bedroom balcony is unforgettable. The kitchen was stocked with local lemons, prosecco, and fresh pastries upon arrival."
    },
    {
      id: "rev-4",
      author: "David & Rachel Miller",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80",
      date: "May 2026",
      rating: 5,
      location: "Melbourne, Australia",
      content: "Words cannot do this place justice. The cliffside views, the peace, the privacy, and the immaculate design. Having our private chef prepare dinner on the terrace while watching the sunset was perfection."
    },
    {
      id: "rev-5",
      author: "Dr. Alexander Wright",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80",
      date: "April 2026",
      rating: 5,
      location: "New York, NY",
      content: "Elena & Matteo have created something truly extraordinary here. The architectural blend of natural stone and sleek glass gives you uninterrupted views of the sea from virtually every corner of the villa. 10/10."
    },
    {
      id: "rev-6",
      author: "Mia Lindqvist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80",
      date: "March 2026",
      rating: 5,
      location: "Stockholm, Sweden",
      content: "Exceptional retreat. The private parking space is a tremendous luxury in Positano where parking is normally impossible. Everything inside the house is spotless, elegant, and thoughtfully curated."
    }
  ],
  photos: [
    {
      id: 1,
      url: "/images/hero/hero-1.png",
      caption: "Spacious private open-air patio with designer wicker seating and ambient mood lighting",
      category: "Living Area"
    },
    {
      id: 2,
      url: "/images/hero/hero-2.png",
      caption: "Cozy shaded outdoor seating salon with coffee table",
      category: "Living Area"
    },
    {
      id: 3,
      url: "/images/hero/hero-3.png",
      caption: "Private romantic Jacuzzi tub with wooden decking surround",
      category: "Terrace & Pool"
    },
    {
      id: 4,
      url: "/images/hero/hero-4.png",
      caption: "Master bedroom suite with king-size double bed, wooden flooring, and garden view",
      category: "Bedrooms"
    },
    {
      id: 5,
      url: "/images/hero/hero-5.png",
      caption: "Exterior view of the luxury boutique villa residence in Candolim",
      category: "Exterior"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
      caption: "Ensuite master bathroom with freestanding soaking tub and rainfall shower",
      category: "Bathrooms"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      caption: "Sun loungers on the cliffside teak deck during golden hour",
      category: "Terrace & Pool"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85",
      caption: "Second guest suite with queen bed and custom minimalist oak wardrobes",
      category: "Bedrooms"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      caption: "Evening ambiance at the fire pit overlooking twinkling coastline lights",
      category: "Exterior"
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
      caption: "Secondary Carrara marble bathroom with dual vanity and backlit mirror",
      category: "Bathrooms"
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
      caption: "Third bedroom suite opening to a quiet private garden patio",
      category: "Bedrooms"
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
      caption: "Dedicated high-speed workspace overlooking the Positano coastline",
      category: "Living Area"
    },
    {
      id: 13,
      url: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=85",
      caption: "Villa architectural facade nestled securely into the Positano rock cliffs",
      category: "Exterior"
    },
    {
      id: 14,
      url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85",
      caption: "Wine cellar with selection of organic Campania and Tuscan reserves",
      category: "Kitchen & Dining"
    },
    {
      id: 15,
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
      caption: "Private sea access path leading down toward the tranquil cove",
      category: "Exterior"
    }
  ]
};
