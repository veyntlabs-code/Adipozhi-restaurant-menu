import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data.json");

export interface LocalRestaurant {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  phone?: string;
  address?: string;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LocalAdminUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  restaurantId: string;
  role: "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface LocalCategory {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LocalMenuItem {
  _id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  foodType: "VEG" | "NON_VEG" | "EGG";
  isSpicy: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface LocalData {
  restaurants: LocalRestaurant[];
  adminusers: LocalAdminUser[];
  categories: LocalCategory[];
  menuitems: LocalMenuItem[];
}

export function readData(): LocalData {
  if (!fs.existsSync(DATA_FILE)) {
    return { restaurants: [], adminusers: [], categories: [], menuitems: [] };
  }
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw);
}

export function writeData(data: LocalData) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
