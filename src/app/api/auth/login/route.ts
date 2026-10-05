import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { readData } from "@/lib/localDb";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const data = readData();
    const admin = data.adminusers.find((a) => a.email === email.toLowerCase().trim());
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await signToken({
      userId: admin._id,
      restaurantId: admin.restaurantId,
      email: admin.email,
      role: admin.role,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      data: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
