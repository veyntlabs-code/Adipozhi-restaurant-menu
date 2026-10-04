import { NextResponse } from "next/server";
import { getAuthPayload } from "@/lib/auth";
import connectDB from "@/lib/mongoose";
import AdminUser from "@/models/AdminUser";

export async function GET() {
  const payload = await getAuthPayload();
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const admin = await AdminUser.findById(payload.userId).select("-passwordHash");
  if (!admin) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: admin });
}
