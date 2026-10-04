"use client";

import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { ICategory } from "@/types";

interface Props {
  category?: ICategory | null;
  onClose: () => void;
  onSave: () => void;
}

export default function CategoryForm({ category, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    name: category?.name || "",
    description: category?.description || "",
    displayOrder: category?.displayOrder?.toString() || "0",
    isActive: category?.isActive !== false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Category name is required");

    setSaving(true);
    try {
      const url = category ? `/api/admin/categories/${category._id}` : "/api/admin/categories";
      const method = category ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, displayOrder: Number(form.displayOrder) }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success(category ? "Category updated!" : "Category created!");
      onSave();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2e3d]">
          <h2 className="text-lg font-bold text-[#e8e8f0]">
            {category ? "Edit Category" : "Add Category"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
              Category Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Starters, Biryani, Desserts"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this category..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm resize-none"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Display Order</label>
              <input
                type="number"
                min="0"
                value={form.displayOrder}
                onChange={(e) => setForm((f) => ({ ...f, displayOrder: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Active</label>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                className={`mt-0.5 relative inline-flex items-center h-9 w-16 rounded-xl transition-colors ${
                  form.isActive ? "bg-emerald-500" : "bg-[#2e2e3d]"
                }`}
              >
                <span className={`inline-block w-6 h-6 bg-white rounded-lg shadow transition-transform ${
                  form.isActive ? "translate-x-9" : "translate-x-1"
                }`} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-5 py-2.5 rounded-xl bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0] text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving..." : category ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
