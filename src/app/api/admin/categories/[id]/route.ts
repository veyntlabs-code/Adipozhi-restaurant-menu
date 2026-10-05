import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import { readData, writeData } from "@/lib/localDb";

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

    const data = readData();
    const categoryIndex = data.categories.findIndex((c) => c._id === id && c.restaurantId === payload.restaurantId);
    
    if (categoryIndex === -1) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    const category = data.categories[categoryIndex];
    const allowed = ["name", "description", "displayOrder", "isActive"];
    
    for (const key of allowed) {
      if (key in body) {
        (category as any)[key] = body[key];
      }
    }

    category.updatedAt = new Date().toISOString();
    writeData(data);

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

    const data = readData();
    
    const itemCount = data.menuitems.filter((m) => m.categoryId === id && m.restaurantId === payload.restaurantId).length;
    if (itemCount > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete category with ${itemCount} menu item(s). Move or delete items first.` },
        { status: 400 }
      );
    }

    const categoryIndex = data.categories.findIndex((c) => c._id === id && c.restaurantId === payload.restaurantId);
    if (categoryIndex === -1) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    data.categories.splice(categoryIndex, 1);
    writeData(data);

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
