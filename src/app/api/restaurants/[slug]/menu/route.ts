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

    const categories = data.categories
      .filter((c) => c.restaurantId === restaurant._id && c.isActive)
      .sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

    const menuItems = data.menuitems
      .filter((m) => m.restaurantId === restaurant._id && m.isAvailable)
      .sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

    return NextResponse.json({
      success: true,
      data: { categories, menuItems },
    });
  } catch (error) {
    console.error("Get menu error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
