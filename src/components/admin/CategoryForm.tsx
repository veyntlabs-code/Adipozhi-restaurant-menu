"use client";

import { X, Loader2, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
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
    image: category?.image || "",
    displayOrder: category?.displayOrder?.toString() || "0",
    isActive: category?.isActive !== false,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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
      <div className="w-full max-w-md bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl shadow-2xl animate-fade-in max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2e2e3d]">
          <h2 className="text-lg font-bold text-[#e8e8f0]">
            {category ? "Edit Category" : "Add Category"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 admin-scrollbar">
          {/* Image upload */}
          <div>
            <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-2">Category Image</label>
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
        </form>
        <div className="flex gap-3 px-6 py-4 border-t border-[#2e2e3d]">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-5 py-2.5 rounded-xl bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0] text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {saving ? "Saving..." : category ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
