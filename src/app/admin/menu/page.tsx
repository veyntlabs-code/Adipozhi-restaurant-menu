"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";
import MenuItemTable from "@/components/admin/MenuItemTable";
import MenuItemForm from "@/components/admin/MenuItemForm";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { IMenuItem, ICategory } from "@/types";

export default function MenuPage() {
  const [items, setItems] = useState<IMenuItem[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");
  const [filterFoodType, setFilterFoodType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<IMenuItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<IMenuItem | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory) params.set("categoryId", filterCategory);
      if (filterAvailability) params.set("availability", filterAvailability);
      if (filterFoodType) params.set("foodType", filterFoodType);

      const [itemsRes, catsRes] = await Promise.all([
        fetch(`/api/admin/menu?${params}`),
        fetch("/api/admin/categories"),
      ]);
      const [itemsData, catsData] = await Promise.all([itemsRes.json(), catsRes.json()]);
      if (itemsData.success) setItems(itemsData.data);
      if (catsData.success) setCategories(catsData.data);
    } catch {
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterAvailability, filterFoodType]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleToggleAvailability = async (item: IMenuItem) => {
    try {
      const res = await fetch(`/api/admin/menu/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !item.isAvailable }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setItems((prev) => prev.map((i) => i._id === item._id ? { ...i, isAvailable: !i.isAvailable } : i));
      toast.success(`${item.name} marked as ${!item.isAvailable ? "available" : "unavailable"}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update availability");
    }
  };

  const handleDelete = async () => {
    if (!deleteItem) return;
    const res = await fetch(`/api/admin/menu/${deleteItem._id}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    toast.success("Item deleted");
    setDeleteItem(null);
    fetchData();
  };

  const filteredItems = items.filter((item) =>
    !search || item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e8f0]">Menu Management</h1>
          <p className="text-[#8888a0] text-sm mt-1">{items.length} total items</p>
        </div>
        <button
          id="add-menu-item-btn"
          onClick={() => { setEditItem(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[#f17011]/20"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8888a0]" />
            <input
              id="menu-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu items..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#8888a0] flex-shrink-0" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] focus:outline-none focus:border-[#f17011]/50 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>

            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] focus:outline-none focus:border-[#f17011]/50 text-sm"
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <select
              value={filterFoodType}
              onChange={(e) => setFilterFoodType(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] focus:outline-none focus:border-[#f17011]/50 text-sm"
            >
              <option value="">All Types</option>
              <option value="VEG">Veg</option>
              <option value="NON_VEG">Non-Veg</option>
              <option value="EGG">Egg</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="space-y-3 p-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl skeleton" />
            ))}
          </div>
        ) : (
          <MenuItemTable
            items={filteredItems}
            onEdit={(item) => { setEditItem(item); setShowForm(true); }}
            onDelete={(item) => setDeleteItem(item)}
            onToggleAvailability={handleToggleAvailability}
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <MenuItemForm
          categories={categories}
          item={editItem}
          onClose={() => { setShowForm(false); setEditItem(null); }}
          onSave={() => { setShowForm(false); setEditItem(null); fetchData(); }}
        />
      )}

      {/* Delete Confirm */}
      {deleteItem && (
        <ConfirmDialog
          title="Delete Menu Item"
          message={`Are you sure you want to delete "${deleteItem.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
}
