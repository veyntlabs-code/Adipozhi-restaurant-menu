import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Restaurant from "@/models/Restaurant";
import Category from "@/models/Category";
import MenuItem from "@/models/MenuItem";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    const restaurant = await Restaurant.findOne({ slug, isActive: true }).lean();
    if (!restaurant) {
      return NextResponse.json(
        { success: false, error: "Restaurant not found" },
        { status: 404 }
      );
    }

    const categories = await Category.find({
      restaurantId: restaurant._id,
      isActive: true,
    })
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();

    const menuItems = await MenuItem.find({
      restaurantId: restaurant._id,
      isAvailable: true,
    })
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();

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
