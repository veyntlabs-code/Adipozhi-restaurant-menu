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
    const categories = data.categories
      .filter((c) => c.restaurantId === payload.restaurantId)
      .sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Get categories error:", error);
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
    const { name, description, displayOrder } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 });
    }

    const data = readData();
    const newCategory = {
      _id: crypto.randomBytes(12).toString("hex"),
      restaurantId: payload.restaurantId,
      name: name.trim(),
      description: description?.trim(),
      displayOrder: Number(displayOrder) || 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    data.categories.push(newCategory);
    writeData(data);

    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
