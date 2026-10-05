"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { UtensilsCrossed, ChevronDown } from "lucide-react";
import RestaurantHeader from "@/components/public/RestaurantHeader";
import CategoryNav from "@/components/public/CategoryNav";
import SearchBar from "@/components/public/SearchBar";
import MenuItemCard from "@/components/public/MenuItemCard";
import MenuSkeleton from "@/components/public/MenuSkeleton";
import type { IRestaurant, ICategory, IMenuItem } from "@/types";

export default function PublicMenuPage() {
  const params = useParams();
  const slug = params.restaurantSlug as string;

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  useEffect(() => {
    if (!slug) return;
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
          setCategories(menuData.data.categories);
          setMenuItems(menuData.data.menuItems);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load menu");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Filter items based on category and search
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const itemCatId = typeof item.categoryId === 'string' ? item.categoryId : item.categoryId._id;
      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(itemCatId);
      const searchMatch = !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [menuItems, activeCategories, search]);

  // Group by category
  const groupedItems = useMemo(() => {
    if (activeCategories.length > 0 || search) {
      // When filtering, show flat list
      return null;
    }
    const groups: { category: ICategory; items: IMenuItem[] }[] = [];
    categories.forEach((cat) => {
      const items = menuItems.filter((item) => {
        const itemCatId = typeof item.categoryId === 'string' ? item.categoryId : item.categoryId._id;
        return itemCatId === cat._id;
      });
      if (items.length > 0) groups.push({ category: cat, items });
    });
    return groups;
  }, [categories, menuItems, activeCategories, search]);

  if (loading) return <MenuSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed size={28} className="text-red-400" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Menu Not Found</h1>
          <p className="text-gray-500 text-sm">
            {error === "Restaurant not found"
              ? "This restaurant doesn't exist or is currently unavailable."
              : error}
          </p>
        </div>
      </div>
    );
  }

  if (!restaurant) return null;

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
        {/* Restaurant Header */}
        <RestaurantHeader restaurant={restaurant} />

        {/* Category Nav */}
        {categories.length > 0 && (
          <CategoryNav
            categories={categories}
            activeCategories={activeCategories}
            onToggleCategory={(id) => {
              if (id === "all") {
                setActiveCategories([]);
              } else {
                setActiveCategories(prev =>
                  prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
                );
              }
            }}
            searchValue={search}
            onSearchChange={setSearch}
          />
        )}


        <main className="max-w-3xl mx-auto px-4 py-6">
          {search ? (
            filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-white/95 rounded-2xl shadow-sm backdrop-blur-sm border border-rose-100">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed size={28} className="text-rose-200" />
                </div>
                <p className="text-rose-900/60 font-medium">No items found for "{search}"</p>
                <button onClick={() => setSearch("")} className="mt-3 text-sm text-rose-800 hover:text-rose-900 hover:underline transition-colors">
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {filteredItems.map((item, index) => (
                  <MenuItemCard key={item._id} item={item} currency={restaurant.currency} priority={index < 4} />
                ))}
              </div>
            )
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {categories.map((category) => (
                <a
                  key={category._id}
                  href={`/menu/${slug}/category/${category._id}`}
                  className="flex flex-col bg-white/90 rounded-2xl shadow-sm backdrop-blur-md border border-rose-100 overflow-hidden hover:shadow-md transition-all group"
                >
                  <div className="aspect-[4/3] w-full bg-rose-50 relative overflow-hidden">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UtensilsCrossed size={32} className="text-rose-200" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h2 className="text-lg font-bold text-rose-950">{category.name}</h2>
                    {category.description && (
                      <p className="text-xs text-rose-800/70 mt-1 line-clamp-1">{category.description}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </main>


      </div>
    </div>
  );
}
