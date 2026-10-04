import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import Restaurant from "@/models/Restaurant";
import { verifyRequestAuth } from "@/lib/auth";
import { slugify } from "@/lib/slugify";

export async function GET(request: NextRequest) {
  const payload = await verifyRequestAuth(request);
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const restaurant = await Restaurant.findById(payload.restaurantId).lean();
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
    await connectDB();

    const restaurant = await Restaurant.findById(payload.restaurantId);
    if (!restaurant) {
      return NextResponse.json({ success: false, error: "Restaurant not found" }, { status: 404 });
    }

    // If name changed and no explicit slug provided, regenerate slug
    if (body.name && !body.slug) {
      body.slug = slugify(body.name);
    } else if (body.slug) {
      body.slug = slugify(body.slug);
    }

    // Check slug uniqueness if slug changed
    if (body.slug && body.slug !== restaurant.slug) {
      const existing = await Restaurant.findOne({ slug: body.slug, _id: { $ne: restaurant._id } });
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (restaurant as any)[key] = body[key];
      }
    }

    await restaurant.save();
    return NextResponse.json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Update restaurant error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
