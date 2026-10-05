import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import type { JWTPayload } from "@/types";
import { readData } from "@/lib/localDb";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback-secret-change-in-production"
);

const COOKIE_NAME = "auth_token";
const TOKEN_EXPIRY = "7d";

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function getAuthPayload(): Promise<JWTPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;

  try {
    const data = readData();
    const exists = data.restaurants.find(r => r._id === payload.restaurantId);
    if (!exists && data.restaurants.length > 0) {
      payload.restaurantId = data.restaurants[0]._id;
    }
  } catch (error) {
    console.error("getAuthPayload error", error);
  }

  return payload;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get(COOKIE_NAME)?.value ?? null;
}

export async function verifyRequestAuth(req: NextRequest): Promise<JWTPayload | null> {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;

  try {
    const data = readData();
    const exists = data.restaurants.find(r => r._id === payload.restaurantId);
    if (!exists && data.restaurants.length > 0) {
      payload.restaurantId = data.restaurants[0]._id;
    }
  } catch (error) {
    console.error("verifyRequestAuth error", error);
  }

  return payload;
}
