import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MenuItem from "@/models/MenuItem";
import { verifyRequestAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const availability = searchParams.get("availability");
    const foodType = searchParams.get("foodType");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { restaurantId: payload.restaurantId };
    if (categoryId) query.categoryId = categoryId;
    if (availability === "available") query.isAvailable = true;
    if (availability === "unavailable") query.isAvailable = false;
    if (foodType) query.foodType = foodType;

    const items = await MenuItem.find(query)
      .populate("categoryId", "name")
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("Get menu items error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, categoryId, price, image, foodType, isSpicy, isFeatured, isAvailable, displayOrder } = body;

    if (!name || !categoryId || price === undefined || !foodType) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (typeof foodType !== 'string' || !foodType) {
      return NextResponse.json({ success: false, error: "Invalid food type" }, { status: 400 });
    }

    await connectDB();

    const item = await MenuItem.create({
      restaurantId: payload.restaurantId,
      categoryId,
      name: name.trim(),
      description: description?.trim(),
      price: Number(price),
      image,
      foodType,
      isSpicy: Boolean(isSpicy),
      isFeatured: Boolean(isFeatured),
      isAvailable: isAvailable !== false,
      displayOrder: Number(displayOrder) || 0,
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error("Create menu item error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
