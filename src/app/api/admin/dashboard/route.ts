import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MenuItem from "@/models/MenuItem";
import Category from "@/models/Category";
import { verifyRequestAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const [totalItems, availableItems, totalCategories, recentItems] = await Promise.all([
      MenuItem.countDocuments({ restaurantId: payload.restaurantId }),
      MenuItem.countDocuments({ restaurantId: payload.restaurantId, isAvailable: true }),
      Category.countDocuments({ restaurantId: payload.restaurantId }),
      MenuItem.find({ restaurantId: payload.restaurantId })
        .populate("categoryId", "name")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalItems,
        availableItems,
        unavailableItems: totalItems - availableItems,
        totalCategories,
        recentItems,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
