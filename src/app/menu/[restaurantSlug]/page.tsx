'use client';
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Utensils, 
  Flame, 
  Plus, 
  Filter, 
  ShoppingBag, 
  ChevronRight,
  Phone,
  Star,
  Sparkles,
  MapPin,
  X,
  ArrowRight
} from 'lucide-react';
import MenuSkeleton from '@/components/public/MenuSkeleton';
import type { IRestaurant, ICategory, IMenuItem } from '@/types';

interface RegularMenuPageProps {
  onAddToCart?: (item: any, quantity?: number, notes?: string) => void;
  onOpenOrder?: () => void;
  onOpenReservation?: () => void;
  onNavigate?: (path: string) => void;
  lang?: 'en' | 'fr';
}

function RegularMenuPageContent({
  onAddToCart,
  onOpenOrder,
  onOpenReservation,
  onNavigate,
  lang = 'en'
}: RegularMenuPageProps) {
  const router = useRouter();
  const params = useParams();
  const slug = (params?.restaurantSlug as string) || 'adipozhi';

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [showMobileCategoryFilter, setShowMobileCategoryFilter] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  
  const searchParams = useSearchParams();

  // Fetch live restaurant, categories, and menuItems from database
  useEffect(() => {
    if (!slug) return;
    Promise.all([
      fetch(`/api/restaurants/${slug}`, { cache: 'no-store' }),
      fetch(`/api/restaurants/${slug}/menu`, { cache: 'no-store' }),
    ])
      .then(async ([resRest, resMenu]) => {
        const restData = await resRest.json();
        if (!restData.success) throw new Error(restData.error || 'Restaurant not found');

        const menuData = await resMenu.json();
        setRestaurant(restData.data);
        if (menuData.success) {
          const sortedCats = [...(menuData.data.categories || [])].sort(
            (a: ICategory, b: ICategory) => (a.displayOrder || 0) - (b.displayOrder || 0)
          );
          setCategories(sortedCats);
          setMenuItems(menuData.data.menuItems || []);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load menu');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  // Fast category lookup map
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach(c => {
      map.set(c._id, c.name);
    });
    return map;
  }, [categories]);

  const toggleCategory = (catId: string) => {
    if (catId === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const newCats = prev.filter(c => c !== 'all');
        if (newCats.includes(catId)) {
          const filtered = newCats.filter(c => c !== catId);
          return filtered.length === 0 ? ['all'] : filtered;
        } else {
          return [...newCats, catId];
        }
      });
    }
  };

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  const filteredDishes = useMemo(() => {
    return menuItems.filter((dish) => {
      const dishCatId = typeof dish.categoryId === 'string' ? dish.categoryId : (dish.categoryId as ICategory)?._id;
      
      // Category filter
      if (!selectedCategories.includes('all') && !selectedCategories.includes(dishCatId)) {
        return false;
      }

      // Diet filter
      const isVeg = dish.foodType === 'VEG';
      if (selectedDiet === 'veg' && !isVeg) return false;
      if (selectedDiet === 'non-veg' && isVeg) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const name = dish.name.toLowerCase();
        const desc = (dish.description || '').toLowerCase();
        if (!name.includes(query) && !desc.includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [menuItems, selectedCategories, selectedDiet, searchQuery]);

  const handleAdd = (dish: IMenuItem) => {
    if (onAddToCart) {
      onAddToCart(dish, 1);
    }
    setAddedItemNotice(dish.name);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  if (loading) return <MenuSkeleton />;

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-[#f8efdc] flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#de2b2b]/10 flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-7 h-7 text-[#de2b2b]" />
          </div>
          <h1
            className="text-2xl font-bold text-[#1a1a1a] mb-2"
            style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
          >
            Menu Unavailable
          </h1>
          <p className="text-[#1a1a1a]/70 text-sm">
            {error || 'The menu is currently unavailable.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8efdc] text-[#1a1a1a] selection:bg-[#de2b2b] selection:text-[#f8efdc]">
      {/* 1. Header Banner / Hero Title */}
      <section className="bg-[#de2b2b] text-[#f8efdc] pt-10 pb-12 sm:pt-14 sm:pb-16 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/menu-bg.jpg"
            alt="Adipozhi Menu"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
          <div className="w-64 sm:w-80 md:w-96 py-2">
            <img
              src={restaurant.logo || "/adipozhi-logo.png"}
              alt={restaurant.name || "Restaurant Logo"}
              className="w-full h-auto object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      </section>

      {/* 2. Special Promo Banner (Family Pack Offer) */}
      <div className="bg-[#7c2627] text-[#f8efdc] py-3 px-4 shadow-sm text-center text-xs sm:text-sm font-medium border-b border-[#f8efdc]/20">
        <p>
          🎉 <strong>FAMILY PACK — ONLY PARCEL:</strong> Half Bucket Chicken Biryani gets <strong>1/4 KG Chicken 65 Free!</strong> | Full Bucket gets <strong>1/2 KG Chicken 65 Free!</strong>
        </p>
      </div>

      {/* 3. Sticky Filter & Categories Navbar */}
      <div className="sticky top-0 z-40 bg-[#f8efdc]/95 backdrop-blur-md border-b border-[#1a1a1a]/10 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
          <div className="flex items-center justify-between gap-3 pb-2.5">
            {/* Dietary Filter Switcher */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'veg', label: 'Pure Veg' },
                { id: 'non-veg', label: 'Non-Veg' }
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet.id as 'all' | 'veg' | 'non-veg')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedDiet === diet.id
                      ? 'bg-[#de2b2b] text-[#f8efdc] shadow-sm'
                      : 'bg-white/80 text-[#1a1a1a]/80 hover:bg-white border border-[#1a1a1a]/10'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>

            {/* Search Toggle Icon Button at Right End */}
            <button
              onClick={() => setIsSearchOpen(prev => !prev)}
              aria-label="Toggle search"
              className={`p-2.5 rounded-full transition-all cursor-pointer border flex items-center justify-center shrink-0 ml-auto ${
                isSearchOpen || searchQuery
                  ? 'bg-[#de2b2b] text-[#f8efdc] border-[#de2b2b] shadow-sm'
                  : 'bg-white/80 text-[#1a1a1a]/80 hover:bg-white border-[#1a1a1a]/10'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input Box appearing down of the filters row when clicked */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pb-2.5"
              >
                <div className="relative w-full">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${categories.length} categories (Biryani, Parotta, Al-Faham...)`}
                    className="w-full pl-10 pr-9 py-2 bg-white rounded-full border border-[#1a1a1a]/15 text-xs text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:outline-none focus:ring-2 focus:ring-[#de2b2b]/30 focus:border-[#de2b2b] shadow-inner"
                  />
                  {searchQuery ? (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
                    >
                      ✕
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories Bar (Desktop - Horizontal scroll / flex-wrap) */}
          <div className="hidden md:flex items-center gap-2 py-2 overflow-x-auto scrollbar-none border-t border-[#1a1a1a]/5">
            <button
              onClick={() => toggleCategory('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                selectedCategories.includes('all')
                  ? 'bg-[#1a1a1a] text-[#f8efdc] font-bold shadow-sm'
                  : 'bg-white/70 text-[#1a1a1a]/80 hover:bg-white border border-[#1a1a1a]/10'
              }`}
            >
              <span>All Dishes</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategories.includes('all') ? 'bg-white/20 text-[#f8efdc]' : 'bg-black/5 text-[#1a1a1a]/50'
              }`}>
                {menuItems.length}
              </span>
            </button>

            {categories.map((cat) => {
              const count = menuItems.filter(i => {
                const itemCatId = typeof i.categoryId === 'string' ? i.categoryId : (i.categoryId as ICategory)?._id;
                return itemCatId === cat._id;
              }).length;

              return (
                <button
                  key={cat._id}
                  onClick={() => toggleCategory(cat._id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    selectedCategories.includes(cat._id)
                      ? 'bg-[#1a1a1a] text-[#f8efdc] font-bold shadow-sm'
                      : 'bg-white/70 text-[#1a1a1a]/80 hover:bg-white border border-[#1a1a1a]/10'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategories.includes(cat._id) ? 'bg-white/20 text-[#f8efdc]' : 'bg-black/5 text-[#1a1a1a]/50'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Filter Button */}
          <div className="flex md:hidden py-2 items-center justify-between border-t border-[#1a1a1a]/5">
            <span className="text-xs font-bold text-[#1a1a1a]">
              {selectedCategories.includes('all') 
                ? 'All Categories' 
                : `${selectedCategories.length} Categories Selected`}
            </span>
            <button 
              onClick={() => setShowMobileCategoryFilter(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full border border-[#1a1a1a]/20 text-xs font-bold text-[#1a1a1a] shadow-sm cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* 4. Dish Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {filteredDishes.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-3xl border border-[#1a1a1a]/10">
            <Utensils className="w-12 h-12 text-[#de2b2b]/40 mx-auto mb-3" />
            <h3 className="text-xl font-bold font-serif">
              No dishes match your search
            </h3>
            <p className="text-sm text-[#1a1a1a]/60 mt-1">
              Try clearing filters or changing search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategories(['all']);
                setSelectedDiet('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#de2b2b] text-[#f8efdc] text-xs font-bold uppercase rounded-full cursor-pointer hover:bg-[#c42525] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-14">
            {categories.map((cat) => {
              const categoryDishes = filteredDishes.filter(d => {
                const itemCatId = typeof d.categoryId === 'string' ? d.categoryId : (d.categoryId as ICategory)?._id;
                return itemCatId === cat._id;
              });

              if (categoryDishes.length === 0) return null;

              return (
                <div key={cat._id} className="scroll-mt-24" id={`category-${cat._id}`}>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#1a1a1a] mb-4 border-b border-[#1a1a1a]/10 pb-2 flex items-center justify-between">
                    <span>{cat.name}</span>
                    <span className="text-xs sm:text-sm font-medium text-[#1a1a1a]/50 bg-white px-2.5 py-0.5 rounded-full border border-[#1a1a1a]/10">
                      {categoryDishes.length}
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 auto-rows-fr">
                    {categoryDishes.map((dish) => {
                      const isVeg = dish.foodType === 'VEG';
                      const isEgg = dish.foodType === 'EGG';
                      const isParcelOnly = cat.name.toUpperCase().includes('PARCEL') || (dish.description && dish.description.toUpperCase().includes('PARCEL'));
                      const isBucket = dish.name.toUpperCase().includes('BUCKET');

                      return (
                        <motion.div
                          key={dish._id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className="bg-white rounded-2xl border border-[#1a1a1a]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden h-full"
                        >
                          {/* Dish Image or Placeholder */}
                          <div className="w-full h-28 sm:h-48 overflow-hidden bg-[#f8efdc]/50 shrink-0 flex items-center justify-center relative">
                            {dish.image ? (
                              <img 
                                src={dish.image} 
                                alt={dish.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]/5">
                                <Utensils className="w-8 h-8 sm:w-12 sm:h-12 text-[#1a1a1a]/15" />
                              </div>
                            )}

                            {dish.isFeatured && (
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white shadow-sm flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-white" />
                                <span>Featured</span>
                              </span>
                            )}
                          </div>

                          <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                            <div>
                              {/* Top Badges Row */}
                              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                                <div className="flex items-center gap-1.5">
                                  {/* Veg / Non-Veg Indicator */}
                                  <span className={`w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 rounded-sm flex items-center justify-center shrink-0 ${
                                    isVeg ? 'border-green-600' : isEgg ? 'border-yellow-600' : 'border-red-600'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                      isVeg ? 'bg-green-600' : isEgg ? 'bg-yellow-600' : 'bg-red-600'
                                    }`} />
                                  </span>

                                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-[#1a1a1a]/50 truncate max-w-[120px]">
                                    {cat.name}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-1">
                                  {isParcelOnly && (
                                    <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-800 border border-amber-500/30">
                                      Only Parcel
                                    </span>
                                  )}

                                  {dish.isSpicy && (
                                    <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#de2b2b]/10 text-[#de2b2b] flex items-center gap-0.5">
                                      <Flame className="w-2.5 h-2.5 fill-[#de2b2b]" />
                                      Spicy
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Dish Name */}
                              <h3
                                className="text-sm sm:text-lg font-bold text-[#1a1a1a] group-hover:text-[#de2b2b] transition-colors leading-snug"
                                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                              >
                                {dish.name}
                              </h3>

                              {/* Special Free Bonus if Bucket */}
                              {isBucket && (
                                <div className="mt-2 py-1 px-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <span>Free Chicken 65 on Bucket!</span>
                                </div>
                              )}

                              {/* Description */}
                              {dish.description && (
                                <p className="text-xs text-[#1a1a1a]/70 font-light mt-2 line-clamp-2 leading-relaxed">
                                  {dish.description}
                                </p>
                              )}
                            </div>

                            {/* Bottom Price & Add */}
                            <div className="pt-3 mt-4 flex items-center justify-between border-t border-[#1a1a1a]/10">
                              <div>
                                <span className="text-[10px] uppercase font-bold text-[#1a1a1a]/40 block leading-none">
                                  Price
                                </span>
                                <div className="text-lg sm:text-xl font-black font-serif text-[#de2b2b]">
                                  {restaurant.currency || '₹'}{dish.price}
                                </div>
                              </div>

                              {dish.isAvailable !== false && (
                                <button
                                  onClick={() => handleAdd(dish)}
                                  className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#de2b2b] text-[#f8efdc] hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm flex items-center gap-1 cursor-pointer active:scale-95"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Sticky Added-to-Cart Notification */}
      <AnimatePresence>
        {addedItemNotice && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1a1a1a] text-[#f8efdc] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-6 h-6 rounded-full bg-[#de2b2b] text-[#f8efdc] flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <div>
              <p className="text-xs font-bold text-white">{addedItemNotice}</p>
              <p className="text-[11px] text-white/60">
                Added to your order
              </p>
            </div>
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                className="ml-2 px-3 py-1 bg-[#de2b2b] text-[#f8efdc] rounded-full text-xs font-bold hover:bg-white hover:text-[#de2b2b] transition-colors cursor-pointer flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call Us</span>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Category Filter Modal */}
      <AnimatePresence>
        {showMobileCategoryFilter && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#f8efdc]"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-[#1a1a1a]/10 bg-white shadow-sm z-10">
              <h2 className="text-lg font-bold font-serif text-[#1a1a1a]">Filter Categories</h2>
              <button onClick={() => setShowMobileCategoryFilter(false)} className="text-[#1a1a1a]/60 hover:text-[#1a1a1a] text-xl px-2 cursor-pointer">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#f8efdc]">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 transition-colors cursor-pointer shadow-sm">
                <input 
                  type="checkbox" 
                  checked={selectedCategories.includes('all')}
                  onChange={() => toggleCategory('all')}
                  className="w-5 h-5 rounded border-gray-300 text-[#de2b2b] focus:ring-[#de2b2b] cursor-pointer"
                />
                <span className={`text-sm flex-1 ${selectedCategories.includes('all') ? 'font-bold text-[#de2b2b]' : 'font-medium text-[#1a1a1a]'}`}>
                  All Dishes
                </span>
                <span className="text-xs font-bold text-[#1a1a1a]/50 bg-black/5 px-2 py-0.5 rounded-full">
                  {menuItems.length}
                </span>
              </label>

              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat._id);
                const count = menuItems.filter(i => {
                  const itemCatId = typeof i.categoryId === 'string' ? i.categoryId : (i.categoryId as ICategory)?._id;
                  return itemCatId === cat._id;
                }).length;
                  
                return (
                  <label key={cat._id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30 transition-colors cursor-pointer shadow-sm">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleCategory(cat._id)}
                      className="w-5 h-5 rounded border-gray-300 text-[#de2b2b] focus:ring-[#de2b2b] cursor-pointer"
                    />
                    <span className={`text-sm flex-1 ${isSelected ? 'font-bold text-[#de2b2b]' : 'font-medium text-[#1a1a1a]'}`}>
                      {cat.name}
                    </span>
                    <span className="text-xs font-bold text-[#1a1a1a]/50 bg-black/5 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="p-4 border-t border-[#1a1a1a]/10 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-10">
              <button 
                onClick={() => setShowMobileCategoryFilter(false)}
                className="w-full py-3.5 bg-[#de2b2b] text-[#f8efdc] font-bold uppercase rounded-full tracking-wider shadow-md hover:bg-[#c42525] transition-colors cursor-pointer"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 6. Restaurant Footer Details */}
      <footer className="bg-[#1a1a1a] text-[#f8efdc] border-t border-white/10 mt-16 pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
            {/* Logo & Description */}
            <div className="max-w-md flex flex-col items-center md:items-start">
              <div className="w-48 sm:w-56 mb-4">
                <img
                  src={restaurant.logo || "/adipozhi-logo.png"}
                  alt={restaurant.name}
                  className="w-full h-auto object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                />
              </div>
              <h3
                className="text-xl font-bold text-white tracking-wide mb-2"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                {restaurant.name}
              </h3>
              {restaurant.description && (
                <p className="text-xs sm:text-sm text-[#f8efdc]/70 leading-relaxed font-light">
                  {restaurant.description}
                </p>
              )}
            </div>

            {/* Quick Contact & Details */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#de2b2b]">
                Contact & Location
              </h4>

              {restaurant.address && (
                <div className="flex items-start gap-2.5 text-xs text-[#f8efdc]/90 max-w-xs">
                  <MapPin className="w-4 h-4 text-[#de2b2b] shrink-0 mt-0.5" />
                  <span>{restaurant.address}</span>
                </div>
              )}

              {restaurant.phone && (
                <a
                  href={`tel:${restaurant.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 text-xs text-[#f8efdc]/90 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#de2b2b] shrink-0" />
                  <span className="font-semibold">{restaurant.phone}</span>
                </a>
              )}

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function RegularMenuPage(props: RegularMenuPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8efdc]" />}>
      <RegularMenuPageContent {...props} />
    </Suspense>
  );
}

export default RegularMenuPage;
