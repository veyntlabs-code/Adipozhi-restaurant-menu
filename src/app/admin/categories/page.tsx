"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Tag } from "lucide-react";
import toast from "react-hot-toast";
import CategoryForm from "@/components/admin/CategoryForm";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { ICategory } from "@/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState<ICategory | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<ICategory | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const handleToggleActive = async (cat: ICategory) => {
    try {
      const res = await fetch(`/api/admin/categories/${cat._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !cat.isActive }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setCategories((prev) => prev.map((c) => c._id === cat._id ? { ...c, isActive: !c.isActive } : c));
      toast.success(`${cat.name} ${!cat.isActive ? "enabled" : "disabled"}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const handleReorder = async (cat: ICategory, direction: "up" | "down") => {
    const idx = categories.findIndex((c) => c._id === cat._id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= categories.length) return;

    const newOrder = [...categories];
    const swapCat = newOrder[swapIdx];
    [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
    setCategories(newOrder);

    try {
      await Promise.all([
        fetch(`/api/admin/categories/${cat._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayOrder: swapCat.displayOrder }),
        }),
        fetch(`/api/admin/categories/${swapCat._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ displayOrder: cat.displayOrder }),
        }),
      ]);
    } catch {
      toast.error("Failed to reorder");
      fetchCategories();
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;
    const res = await fetch(`/api/admin/categories/${deleteCategory._id}`, { method: "DELETE" });
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    toast.success("Category deleted");
    setDeleteCategory(null);
    fetchCategories();
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e8f0]">Categories</h1>
          <p className="text-[#8888a0] text-sm mt-1">{categories.length} categories</p>
        </div>
        <button
          id="add-category-btn"
          onClick={() => { setEditCategory(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[#f17011]/20"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="space-y-3 p-6">
            {[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-xl skeleton" />)}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#8888a0]">
            <Tag size={40} className="mb-3 opacity-40" />
            <p className="font-medium">No categories yet</p>
            <p className="text-sm mt-1">Create your first category to organize your menu</p>
          </div>
        ) : (
          <div className="divide-y divide-[#2e2e3d]">
            {categories.map((cat, idx) => (
              <div key={cat._id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#22222f]/50 transition-colors group animate-fade-in">
                {/* Reorder */}
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleReorder(cat, "up")}
                    disabled={idx === 0}
                    className="w-6 h-6 flex items-center justify-center rounded text-[#8888a0] hover:text-[#e8e8f0] hover:bg-[#2e2e3d] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => handleReorder(cat, "down")}
                    disabled={idx === categories.length - 1}
                    className="w-6 h-6 flex items-center justify-center rounded text-[#8888a0] hover:text-[#e8e8f0] hover:bg-[#2e2e3d] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Order badge */}
                <div className="w-8 h-8 rounded-lg bg-[#22222f] border border-[#2e2e3d] flex items-center justify-center text-xs font-bold text-[#8888a0] flex-shrink-0">
                  {idx + 1}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#e8e8f0]">{cat.name}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cat.isActive ? "bg-emerald-500/20 text-emerald-400" : "bg-[#2e2e3d] text-[#8888a0]"}`}>
                      {cat.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {cat.description && (
                    <p className="text-sm text-[#8888a0] truncate mt-0.5">{cat.description}</p>
                  )}
                </div>

                {/* Toggle Active */}
                <button
                  onClick={() => handleToggleActive(cat)}
                  className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${cat.isActive ? "bg-emerald-500" : "bg-[#2e2e3d]"}`}
                  title={cat.isActive ? "Disable category" : "Enable category"}
                >
                  <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform ${cat.isActive ? "translate-x-6" : "translate-x-1"}`} />
                </button>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditCategory(cat); setShowForm(true); }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteCategory(cat)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <CategoryForm
          category={editCategory}
          onClose={() => { setShowForm(false); setEditCategory(null); }}
          onSave={() => { setShowForm(false); setEditCategory(null); fetchCategories(); }}
        />
      )}

      {deleteCategory && (
        <ConfirmDialog
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteCategory.name}"? All menu items must be removed first.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setDeleteCategory(null)}
        />
      )}
    </div>
  );
}
