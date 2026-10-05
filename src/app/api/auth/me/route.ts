import { NextResponse } from "next/server";
import { getAuthPayload } from "@/lib/auth";
import { readData } from "@/lib/localDb";

export async function GET() {
  const payload = await getAuthPayload();
  if (!payload) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const data = readData();
  const admin = data.adminusers.find((a) => a._id === payload.userId);
  if (!admin) {
    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  }

  const { passwordHash, ...adminWithoutPassword } = admin;

  return NextResponse.json({ success: true, data: adminWithoutPassword });
}
