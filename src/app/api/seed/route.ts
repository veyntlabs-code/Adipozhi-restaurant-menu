import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: false, 
    error: "Seed not available (local DB used via node seed-local.mjs)" 
  }, { status: 403 });
}
