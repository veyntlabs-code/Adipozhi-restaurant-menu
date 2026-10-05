import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import { readData } from "@/lib/localDb";

export async function GET(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = readData();

    const menuItems = data.menuitems.filter((m) => m.restaurantId === payload.restaurantId);
    const totalItems = menuItems.length;
    const availableItems = menuItems.filter((m) => m.isAvailable).length;
    const totalCategories = data.categories.filter((c) => c.restaurantId === payload.restaurantId).length;

    const recentItems = [...menuItems]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(item => {
        const cat = data.categories.find(c => c._id === item.categoryId);
        return {
          ...item,
          categoryId: cat ? { _id: cat._id, name: cat.name } : item.categoryId
        };
      });

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
