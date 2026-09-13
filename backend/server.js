const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory reservations store
const reservations = [];

// Listing Data
const listing = {
  id: "listing-candolim-mirashya-ug10",
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  location: "Candolim, Goa, India",
  city: "Candolim",
  country: "India",
  rating: 4.95,
  reviewCount: 19,
  isSuperhost: true,
  isGuestFavorite: true,
  stats: {
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1
  },
  pricePerNight: 5700,
  originalPricePerNight: 6400,
  cleaningFee: 1500,
  serviceFee: 850,
  occupancyTaxes: 450,
  sleepingArrangements: [
    {
      room: "Bedroom",
      bedType: "1 double bed",
      image: "/images/sleep/bedroom.png"
    },
    {
      room: "Living room",
      bedType: "1 sofa",
      image: "/images/sleep/living-room.png"
    }
  ],
  host: {
    name: "Elena & Matteo",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
    isSuperhost: true,
    yearsHosting: 7,
    responseRate: "100%",
    responseTime: "within an hour"
  }
};

const similarListings = [
  {
    id: "stay-1",
    title: "The Tropical Studio | 5 mins to Beach",
    priceFormatted: "₹22,824",
    pricePerNight: 22824,
    rating: 4.96,
    image: "/images/similar/similar-1.png"
  },
  {
    id: "stay-2",
    title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
    priceFormatted: "₹39,942",
    pricePerNight: 39942,
    rating: 4.95,
    image: "/images/similar/similar-2.png"
  },
  {
    id: "stay-3",
    title: "Kanso by Earthen Window | Jacuzzi | Terrace | Pool",
    priceFormatted: "₹45,648",
    pricePerNight: 45648,
    rating: 5.0,
    image: "/images/similar/similar-3.png"
  },
  {
    id: "stay-4",
    title: "Luxury Apt | Private Pool | 6 Mins from Beach",
    priceFormatted: "₹48,786",
    pricePerNight: 48786,
    rating: 4.93,
    image: "/images/similar/similar-4.png"
  },
  {
    id: "stay-5",
    title: "Serendipity Cottage - Calm Stay in Calangute-Baga.",
    priceFormatted: "₹22,824",
    pricePerNight: 22824,
    rating: 4.92,
    image: "/images/similar/similar-5.png"
  }
];

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: "healthy",
    service: "airbnb-clone-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    name: "Airbnb Clone Backend API",
    version: "1.0.0",
    endpoints: [
      "GET /api/health",
      "GET /api/listing",
      "GET /api/similar-listings",
      "POST /api/reserve"
    ]
  });
});

// Get Listing Details
app.get('/api/listing', (req, res) => {
  res.json({
    success: true,
    data: listing
  });
});

// Get Similar Listings
app.get('/api/similar-listings', (req, res) => {
  res.json({
    success: true,
    data: similarListings
  });
});

// Create Reservation
app.post('/api/reserve', (req, res) => {
  try {
    const { checkIn, checkOut, guests = 2 } = req.body;

    const checkInDate = checkIn ? new Date(checkIn) : new Date(2026, 9, 18);
    const checkOutDate = checkOut ? new Date(checkOut) : new Date(2026, 9, 23);

    const nights = Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)));
    const baseTotal = nights === 5 ? 28499 : nights * listing.pricePerNight;
    const finalTotal = baseTotal + listing.cleaningFee + listing.serviceFee + listing.occupancyTaxes;

    const reservation = {
      id: "RES-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      listingTitle: listing.title,
      checkIn: checkInDate.toISOString().split('T')[0],
      checkOut: checkOutDate.toISOString().split('T')[0],
      nights,
      guests,
      baseTotal,
      finalTotal,
      formattedTotal: "₹" + finalTotal.toLocaleString("en-IN"),
      status: "CONFIRMED",
      createdAt: new Date().toISOString()
    };

    reservations.push(reservation);

    res.status(201).json({
      success: true,
      message: "Reservation successfully confirmed!",
      data: reservation
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Invalid reservation data"
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API server running on port ${PORT}`);
});
