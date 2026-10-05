"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { UtensilsCrossed, ArrowLeft } from "lucide-react";
import RestaurantHeader from "@/components/public/RestaurantHeader";
import MenuItemCard from "@/components/public/MenuItemCard";
import MenuSkeleton from "@/components/public/MenuSkeleton";
import type { IRestaurant, ICategory, IMenuItem } from "@/types";

export default function CategoryItemsPage() {
  const params = useParams();
  const slug = params.restaurantSlug as string;
  const categoryId = params.categoryId as string;

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !categoryId) return;
    Promise.all([
      fetch(`/api/restaurants/${slug}`),
      fetch(`/api/restaurants/${slug}/menu`),
    ])
      .then(async ([resRest, resMenu]) => {
        const restData = await resRest.json();
        if (!restData.success) throw new Error(restData.error || "Restaurant not found");

        const menuData = await resMenu.json();
        setRestaurant(restData.data);
        if (menuData.success) {
          const foundCategory = menuData.data.categories.find((c: ICategory) => c._id === categoryId);
          if (!foundCategory) throw new Error("Category not found");
          
          setCategory(foundCategory);
          const filteredItems = menuData.data.menuItems.filter((item: IMenuItem) => {
            const itemCatId = typeof item.categoryId === 'string' ? item.categoryId : (item.categoryId as ICategory)._id;
            return itemCatId === categoryId;
          });
          setMenuItems(filteredItems);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load category items");
      })
      .finally(() => setLoading(false));
  }, [slug, categoryId]);

  if (loading) return <MenuSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed size={28} className="text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Not Found</h1>
          <p className="text-gray-500 text-sm">{error}</p>
          <a href={`/menu/${slug}`} className="mt-4 inline-block px-6 py-2 bg-rose-600 text-white rounded-lg">
            Back to Categories
          </a>
        </div>
      </div>
    );
  }

  if (!restaurant || !category) return null;

  return (
    <div className="min-h-screen relative bg-rose-950">
      {/* Blurred Background Image Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center blur-[8px] opacity-50 scale-105 pointer-events-none z-0"
        style={{ backgroundImage: "url('/menu-bg.jpg')" }}
      />
      {/* Additional Dark Overlay to ensure text pops */}
      <div className="fixed inset-0 bg-black/30 pointer-events-none z-0" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 min-h-screen">
        <RestaurantHeader restaurant={restaurant} />

        <div className="sticky top-0 z-10 bg-white border-b border-rose-100 shadow-sm relative">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <a href={`/menu/${slug}`} className="p-2 -ml-2 rounded-lg hover:bg-rose-50 text-rose-900 transition-colors flex items-center gap-2">
              <ArrowLeft size={20} />
              <span className="font-medium">View All</span>
            </a>
            <div className="h-6 w-px bg-rose-200 mx-2"></div>
            <h1 className="text-lg font-bold text-rose-950 truncate flex-1">{category.name}</h1>
          </div>
        </div>

        <main className="max-w-3xl mx-auto px-4 py-6">
          {menuItems.length === 0 ? (
            <div className="text-center py-16 bg-white/95 rounded-2xl shadow-sm backdrop-blur-sm border border-rose-100">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed size={28} className="text-rose-200" />
              </div>
              <p className="text-rose-900/60 font-medium">No items available in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {menuItems.map((item, index) => (
                <MenuItemCard key={item._id} item={item} currency={restaurant.currency} priority={index < 4} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
