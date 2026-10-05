"use client";

import Image from "next/image";
import { Phone, MapPin, ImageIcon } from "lucide-react";
import type { IRestaurant } from "@/types";

export default function RestaurantHeader({ restaurant }: { restaurant: IRestaurant }) {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 pt-6 pb-2 text-white">
      <div className="flex flex-col items-center text-center gap-3">
        {/* Centered Logo */}
        <div className="w-56 sm:w-64 h-16 relative">
          <Image
            src={restaurant.logo || "/logo.png"}
            alt="Restaurant Logo"
            fill
            priority
            sizes="(max-width: 640px) 224px, 256px"
            className="object-contain drop-shadow-md"
          />
        </div>

        <div className="min-w-0 w-full mt-3">
          {restaurant.description && (
            <p className="text-sm text-rose-50/90 px-4 drop-shadow-sm">{restaurant.description}</p>
          )}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {restaurant.phone && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-rose-100 drop-shadow-sm">
                <Phone size={12} /> {restaurant.phone}
              </span>
            )}
            {restaurant.address && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-rose-100 drop-shadow-sm">
                <MapPin size={12} /> {restaurant.address}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
