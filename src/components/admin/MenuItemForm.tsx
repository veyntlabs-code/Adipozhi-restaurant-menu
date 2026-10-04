"use client";

import { X, Upload, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import type { ICategory, IMenuItem } from "@/types";

interface Props {
  categories: ICategory[];
  item?: IMenuItem | null;
  onClose: () => void;
  onSave: () => void;
}



export default function MenuItemForm({ categories, item, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    name: item?.name || "",
    description: item?.description || "",
    categoryId: (typeof item?.categoryId === "object" ? (item.categoryId as ICategory)._id : item?.categoryId) || "",
    price: item?.price?.toString() || "",
    image: item?.image || "",
    foodType: item?.foodType || "VEG",
    isSpicy: item?.isSpicy || false,
    isFeatured: item?.isFeatured || false,
    isAvailable: item?.isAvailable !== false,
    displayOrder: item?.displayOrder?.toString() || "0",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setForm((f) => ({ ...f, image: data.data.url }));
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Item name is required");
    if (!form.categoryId) return toast.error("Please select a category");
    if (!form.price || isNaN(Number(form.price))) return toast.error("Valid price is required");
    if (Number(form.price) < 0) return toast.error("Price cannot be negative");

    setSaving(true);
    try {
      const url = item ? `/api/admin/menu/${item._id}` : "/api/admin/menu";
      const method = item ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price), displayOrder: Number(form.displayOrder) }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success(item ? "Item updated!" : "Item created!");
      onSave();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl shadow-2xl max-h-[90vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2e3d]">
          <h2 className="text-lg font-bold text-[#e8e8f0]">
            {item ? "Edit Menu Item" : "Add Menu Item"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 admin-scrollbar">
          {/* Image upload */}
          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-2">Food Image</label>
            <div className="flex gap-3">
              <div
                className="w-24 h-24 rounded-xl border-2 border-dashed border-[#2e2e3d] flex items-center justify-center cursor-pointer hover:border-[#f17011]/50 transition-colors overflow-hidden flex-shrink-0"
                onClick={() => fileRef.current?.click()}
              >
                {form.image ? (
                  <Image src={form.image} alt="Preview" width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={28} className="text-[#8888a0]" />
                )}
              </div>
              <div className="flex-1">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                  }}
                />
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#22222f] border border-[#2e2e3d] text-sm text-[#8888a0] hover:text-[#e8e8f0] hover:border-[#f17011]/40 transition-all disabled:opacity-50"
                >
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
                <p className="text-xs text-[#8888a0] mt-1.5">JPEG, PNG, WebP · Max 5MB</p>
                {form.image && (
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    placeholder="Or paste image URL..."
                    className="mt-2 w-full px-3 py-1.5 rounded-lg bg-[#0f0f14] border border-[#2e2e3d] text-xs text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
              Item Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Chicken Biryani"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Describe the dish..."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm resize-none"
            />
          </div>

          {/* Category + Price row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
                Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="0.00"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm"
                required
              />
            </div>
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-2">
              Food Type <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "VEG", label: "Veg", color: "#10b981" },
                { id: "NON_VEG", label: "Non-Veg", color: "#ef4444" },
                { id: "EGG", label: "Egg", color: "#eab308" },
              ].map((ft) => (
                <button
                  key={ft.id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, foodType: ft.id }))}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2 ${
                    form.foodType === ft.id
                      ? "bg-[#f17011]/20 border-[#f17011]/40 text-[#f17011]"
                      : "bg-[#0f0f14] border-[#2e2e3d] text-[#8888a0] hover:border-[#f17011]/30 hover:text-[#e8e8f0]"
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ft.color }} />
                  {ft.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "isSpicy" as const, label: "🌶 Spicy" },
              { key: "isFeatured" as const, label: "⭐ Featured" },
              { key: "isAvailable" as const, label: "✅ Available" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  form[key]
                    ? "bg-[#f17011]/20 border-[#f17011]/40 text-[#f17011]"
                    : "bg-[#0f0f14] border-[#2e2e3d] text-[#8888a0] hover:border-[#2e2e3d]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Display Order</label>
            <input
              type="number"
              min="0"
              value={form.displayOrder}
              onChange={(e) => setForm((f) => ({ ...f, displayOrder: e.target.value }))}
              className="w-32 px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] focus:outline-none focus:border-[#f17011]/50 transition-colors text-sm"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#2e2e3d]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0] text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {saving ? "Saving..." : item ? "Update Item" : "Add Item"}
          </button>
        </div>
      </div>
    </div>
  );
}
