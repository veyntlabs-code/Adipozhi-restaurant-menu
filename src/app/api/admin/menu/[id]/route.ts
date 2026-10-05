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
    const itemIndex = data.menuitems.findIndex((m) => m._id === id && m.restaurantId === payload.restaurantId);
    
    if (itemIndex === -1) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }

    const item = data.menuitems[itemIndex];
    const allowed = ["name", "description", "categoryId", "price", "image", "foodType", "isSpicy", "isFeatured", "isAvailable", "displayOrder"];
    
    for (const key of allowed) {
      if (key in body) {
        (item as any)[key] = body[key];
      }
    }

    item.updatedAt = new Date().toISOString();
    writeData(data);

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

    const data = readData();
    const itemIndex = data.menuitems.findIndex((m) => m._id === id && m.restaurantId === payload.restaurantId);
    
    if (itemIndex === -1) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }

    data.menuitems.splice(itemIndex, 1);
    writeData(data);

    return NextResponse.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete menu item error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
