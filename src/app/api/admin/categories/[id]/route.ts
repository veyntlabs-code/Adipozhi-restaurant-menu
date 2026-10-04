import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Category from "@/models/Category";
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

    const category = await Category.findOne({ _id: id, restaurantId: payload.restaurantId });
    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    const allowed = ["name", "description", "displayOrder", "isActive"];
    for (const key of allowed) {
      if (key in body) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (category as any)[key] = body[key];
      }
    }

    await category.save();
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Update category error:", error);
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

    // Check for items in this category
    const itemCount = await MenuItem.countDocuments({
      categoryId: id,
      restaurantId: payload.restaurantId,
    });
    if (itemCount > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete category with ${itemCount} menu item(s). Move or delete items first.` },
        { status: 400 }
      );
    }

    const category = await Category.findOneAndDelete({
      _id: id,
      restaurantId: payload.restaurantId,
    });

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
