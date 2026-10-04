import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import MenuItem from "@/models/MenuItem";
import { verifyRequestAuth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    await connectDB();

    // Ensure item belongs to this admin's restaurant
    const item = await MenuItem.findOne({ _id: id, restaurantId: payload.restaurantId });
    if (!item) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }

    const allowed = ["name", "description", "categoryId", "price", "image", "foodType", "isSpicy", "isFeatured", "isAvailable", "displayOrder"];
    for (const key of allowed) {
      if (key in body) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[key] = body[key];
      }
    }

    await item.save();
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Update menu item error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();

    // Ensure item belongs to this admin's restaurant
    const item = await MenuItem.findOneAndDelete({
      _id: id,
      restaurantId: payload.restaurantId,
    });

    if (!item) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete menu item error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
