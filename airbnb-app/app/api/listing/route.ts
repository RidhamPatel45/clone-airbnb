import { NextResponse } from "next/server";
import { listingData } from "@/lib/data/listing";
import { similarListings } from "@/lib/data/similarListings";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      ...listingData,
      similarListings,
    },
  });
}
