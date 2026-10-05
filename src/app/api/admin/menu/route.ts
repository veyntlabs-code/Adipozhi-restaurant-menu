import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import { readData, writeData } from "@/lib/localDb";
import crypto from "crypto";

export async function GET(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = readData();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const availability = searchParams.get("availability");
    const foodType = searchParams.get("foodType");

    let items: any[] = data.menuitems.filter((m) => m.restaurantId === payload.restaurantId);
    
    if (categoryId) items = items.filter((m) => m.categoryId === categoryId);
    if (availability === "available") items = items.filter((m) => m.isAvailable);
    if (availability === "unavailable") items = items.filter((m) => !m.isAvailable);
    if (foodType) items = items.filter((m) => m.foodType === foodType);

    items = items.sort((a, b) => {
      if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    items = items.map((item) => {
      const cat = data.categories.find(c => c._id === item.categoryId);
      return {
        ...item,
        categoryId: cat ? { _id: cat._id, name: cat.name } : item.categoryId
      };
    });

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

    const data = readData();
    const newItem = {
      _id: crypto.randomBytes(12).toString("hex"),
      restaurantId: payload.restaurantId,
      categoryId,
      name: name.trim(),
      description: description?.trim(),
      price: Number(price),
      image,
      foodType: foodType as "VEG" | "NON_VEG" | "EGG",
      isSpicy: Boolean(isSpicy),
      isFeatured: Boolean(isFeatured),
      isAvailable: isAvailable !== false,
      displayOrder: Number(displayOrder) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.menuitems.push(newItem);
    writeData(data);

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    console.error("Create menu item error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
