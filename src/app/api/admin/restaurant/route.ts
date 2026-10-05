import { NextRequest, NextResponse } from "next/server";
import { verifyRequestAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";
import { readData, writeData } from "@/lib/localDb";

export async function GET(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = readData();
    const restaurant = data.restaurants.find((r) => r._id === payload.restaurantId);
    
    if (!restaurant) {
      return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Get restaurant error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const data = readData();
    const restaurantIndex = data.restaurants.findIndex((r) => r._id === payload.restaurantId);
    
    if (restaurantIndex === -1) {
      return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
    }

    const restaurant = data.restaurants[restaurantIndex];

    if (body.name && !body.slug) {
      body.slug = slugify(body.name);
    } else if (body.slug) {
      body.slug = slugify(body.slug);
    }

    if (body.slug && body.slug !== restaurant.slug) {
      const existing = data.restaurants.find((r) => r.slug === body.slug && r._id !== restaurant._id);
      if (existing) {
        return NextResponse.json(
          { success: false, error: "This URL slug is already taken" },
          { status: 400 }
        );
      }
    }

    const allowed = ["name", "slug", "logo", "description", "phone", "address", "currency", "isActive"];
    for (const key of allowed) {
      if (key in body) {
        (restaurant as any)[key] = body[key];
      }
    }

    restaurant.updatedAt = new Date().toISOString();
    writeData(data);

    return NextResponse.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Update restaurant error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
