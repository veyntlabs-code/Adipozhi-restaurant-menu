"use client";

import { useEffect, useState, useRef } from "react";
import { Loader2, Save, Upload, Copy, ExternalLink, ImageIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { slugify } from "@/lib/slugify";
import type { IRestaurant } from "@/types";

export default function SettingsPage() {
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [form, setForm] = useState({
    name: "", slug: "", logo: "", description: "", phone: "", address: "", currency: "₹",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
  const publicUrl = form.slug ? `${appUrl}/menu/${form.slug}` : "";

  useEffect(() => {
    fetch("/api/admin/restaurant")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setRestaurant(data.data);
          setForm({
            name: data.data.name || "",
            slug: data.data.slug || "",
            logo: data.data.logo || "",
            description: data.data.description || "",
            phone: data.data.phone || "",
            address: data.data.address || "",
            currency: data.data.currency || "₹",
          });
        }
        setLoading(false);
      });
  }, []);

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }));
  };

  const handleLogoUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setForm((f) => ({ ...f, logo: data.data.url }));
      toast.success("Logo uploaded!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Restaurant name is required");
    if (!form.slug.trim()) return toast.error("Slug is required");

    setSaving(true);
    try {
      const res = await fetch("/api/admin/restaurant", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setRestaurant(data.data);
      setForm((f) => ({ ...f, slug: data.data.slug }));
      toast.success("Settings saved!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      toast.success("URL copied!");
    } catch {
      toast.error("Failed to copy");
    }
  };

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[#f17011]" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#e8e8f0]">Restaurant Settings</h1>
        <p className="text-[#8888a0] text-sm mt-1">Update your restaurant information</p>
      </div>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Logo Upload */}
          <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-[#e8e8f0] mb-4">Restaurant Logo</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-xl border-2 border-dashed border-[#2e2e3d] flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#f17011]/40 transition-colors bg-[#0f0f14]"
                onClick={() => fileRef.current?.click()}
              >
                {form.logo ? (
                  <Image src={form.logo} alt="Logo" width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={28} className="text-[#8888a0]" />
                )}
              </div>
              <div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f); }} />
                <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22222f] border border-[#2e2e3d] text-sm text-[#8888a0] hover:text-[#e8e8f0] hover:border-[#f17011]/40 transition-all disabled:opacity-50">
                  {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                  {uploading ? "Uploading..." : "Upload Logo"}
                </button>
                <p className="text-xs text-[#8888a0] mt-1.5">PNG, JPG, WebP · Recommended: 200×200</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[#e8e8f0]">Basic Information</h3>

            <div>
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
                Restaurant Name <span className="text-red-400">*</span>
              </label>
              <input type="text" value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Royal Restaurant"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 text-sm" required />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
                URL Slug <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8888a0] whitespace-nowrap">/menu/</span>
                <input type="text" value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                  placeholder="royal-restaurant"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 text-sm font-mono" required />
              </div>
              <p className="text-xs text-[#8888a0] mt-1">Only lowercase letters, numbers, and hyphens</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Description</label>
              <textarea value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3} placeholder="Tell customers about your restaurant..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 text-sm resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Phone</label>
                <input type="tel" value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Currency Symbol</label>
                <input type="text" value={form.currency}
                  onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                  placeholder="₹"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">Address</label>
              <input type="text" value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="123 Food Street, City - 000001"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 text-sm" />
            </div>
          </div>

          {/* Public URL Display */}
          {publicUrl && (
            <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-[#e8e8f0] mb-3">Public Catalog URL</h3>
              <div className="flex items-center gap-2 p-3 bg-[#0f0f14] rounded-xl border border-[#2e2e3d]">
                <p className="flex-1 text-xs text-[#f17011] font-mono break-all">{publicUrl}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={handleCopyUrl}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22222f] border border-[#2e2e3d] text-sm text-[#8888a0] hover:text-[#e8e8f0] transition-all">
                  <Copy size={14} /> Copy URL
                </button>
                <a href={publicUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22222f] border border-[#2e2e3d] text-sm text-[#8888a0] hover:text-[#e8e8f0] transition-all">
                  <ExternalLink size={14} /> Open Catalog
                </a>
              </div>
            </div>
          )}

          {/* Save */}
          <div className="flex justify-end">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-[#f17011]/20">
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
