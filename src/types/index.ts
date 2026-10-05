// TypeScript types for the Restaurant Digital Menu System

export type AdminRole = "ADMIN";

export interface IRestaurant {
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

export interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  restaurantId: string;
  role: AdminRole;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  image?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMenuItem {
  _id: string;
  restaurantId: string;
  categoryId: string | ICategory;
  name: string;
  description?: string;
  price: number;
  image?: string;
  foodType: string;
  isSpicy: boolean;
  isFeatured: boolean;
  isAvailable: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface JWTPayload {
  userId: string;
  restaurantId: string;
  email: string;
  role: AdminRole;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  totalItems: number;
  availableItems: number;
  unavailableItems: number;
  totalCategories: number;
  recentItems: IMenuItem[];
}
