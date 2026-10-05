import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/localDb";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = readData();

    const restaurant = data.restaurants.find((r) => r.slug === slug && r.isActive);
    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Get restaurant error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
