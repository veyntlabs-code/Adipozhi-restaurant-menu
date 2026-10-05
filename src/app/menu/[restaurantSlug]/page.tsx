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
          {filteredItems.length === 0 && (groupedItems === null || groupedItems.length === 0) ? (
            <div className="text-center py-16 bg-white/95 rounded-2xl shadow-sm backdrop-blur-sm border border-rose-100">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed size={28} className="text-rose-200" />
              </div>
              <p className="text-rose-900/60 font-medium">
                {search ? `No items found for "${search}"` : "No menu items available"}
              </p>
              {search && (
                <button onClick={() => setSearch("")} className="mt-3 text-sm text-rose-800 hover:text-rose-900 hover:underline transition-colors">
                  Clear search
                </button>
              )}
            </div>
          ) : groupedItems ? (
            // Grouped by category view
            <div className="space-y-4">
              {groupedItems.map(({ category, items }) => (
                <section key={category._id} id={`category-${category._id}`}>
                  <div 
                    onClick={() => toggleCategory(category._id)}
                    className="flex items-center gap-3 bg-white/90 p-3 rounded-xl shadow-sm backdrop-blur-md border border-rose-100/50 cursor-pointer hover:bg-white transition-colors"
                  >
                    <h2 className="text-lg font-bold text-rose-950">{category.name}</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-rose-200 to-transparent" />
                    <span className="text-xs text-rose-800 font-medium bg-rose-100 px-2 py-1 rounded-full">{items.length} items</span>
                    <ChevronDown size={20} className={`text-rose-900 transition-transform duration-300 ${expandedCategories.includes(category._id) ? 'rotate-180' : ''}`} />
                  </div>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      expandedCategories.includes(category._id)
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {items.map((item, index) => (
                          <MenuItemCard key={item._id} item={item} currency={restaurant.currency} priority={index < 4} />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          ) : (
            // Flat filtered view
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {filteredItems.map((item, index) => (
                <MenuItemCard key={item._id} item={item} currency={restaurant.currency} priority={index < 4} />
              ))}
            </div>
          )}
        </main>


      </div>
    </div>
  );
}
