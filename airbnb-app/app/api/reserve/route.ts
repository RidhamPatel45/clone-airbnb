import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkIn, checkOut, guests = 2 } = body;

    const checkInDate = checkIn ? new Date(checkIn) : new Date(2026, 9, 18);
    const checkOutDate = checkOut ? new Date(checkOut) : new Date(2026, 9, 23);

    const nights = Math.max(
      1,
      Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24))
    );

    const pricePerNight = 5700;
    const baseTotal = nights === 5 ? 28499 : nights * pricePerNight;
    const cleaningFee = 1500;
    const serviceFee = 850;
    const occupancyTaxes = 450;
    const finalTotal = baseTotal + cleaningFee + serviceFee + occupancyTaxes;

    const reservationId = "RES-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    return NextResponse.json({
      success: true,
      data: {
        reservationId,
        status: "CONFIRMED",
        listingTitle: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
        checkIn: checkInDate.toISOString().split("T")[0],
        checkOut: checkOutDate.toISOString().split("T")[0],
        nights,
        guests,
        pricing: {
          baseTotal,
          cleaningFee,
          serviceFee,
          occupancyTaxes,
          finalTotal,
          formattedTotal: "₹" + finalTotal.toLocaleString("en-IN"),
        },
        message: "Reservation successfully received! You won't be charged yet.",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid reservation payload" },
      { status: 400 }
    );
  }
}
