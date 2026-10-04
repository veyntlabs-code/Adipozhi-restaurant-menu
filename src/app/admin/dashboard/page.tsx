"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, UtensilsCrossed, QrCode, Eye, ImageIcon } from "lucide-react";
import DashboardCards from "@/components/admin/DashboardCards";
import type { DashboardStats, IMenuItem, ICategory } from "@/types";

function SkeletonCard() {
  return (
    <div className="h-24 rounded-2xl skeleton" />
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [restaurant, setRestaurant] = useState<{ name: string; slug: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/dashboard").then((r) => r.json()),
      fetch("/api/admin/restaurant").then((r) => r.json()),
    ]).then(([statsData, restaurantData]) => {
      if (statsData.success) setStats(statsData.data);
      if (restaurantData.success) setRestaurant(restaurantData.data);
      setLoading(false);
    });
  }, []);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const publicUrl = restaurant ? `${appUrl}/menu/${restaurant.slug}` : "";

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#e8e8f0]">
          {restaurant ? `Welcome, ${restaurant.name}` : "Dashboard"}
        </h1>
        <p className="text-[#8888a0] text-sm mt-1">Manage your restaurant menu and catalog</p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : stats ? (
        <div className="mb-8">
          <DashboardCards stats={stats} />
        </div>
      ) : null}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { href: "/admin/menu", icon: Plus, label: "Add Item", desc: "Add new menu item", color: "from-[#f17011]/20 to-[#f17011]/10 border-[#f17011]/20 text-[#f17011]" },
          { href: "/admin/menu", icon: UtensilsCrossed, label: "Manage Menu", desc: "Edit your menu items", color: "from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-400" },
          { href: "/admin/qr", icon: QrCode, label: "Generate QR", desc: "Get your QR code", color: "from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400" },
          { href: publicUrl || "/menu", icon: Eye, label: "Preview Catalog", desc: "See public view", color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-400", external: true },
        ].map(({ href, icon: Icon, label, desc, color, external }) => (
          <Link
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            className={`bg-gradient-to-br ${color} border rounded-2xl p-4 hover:opacity-80 transition-all group`}
          >
            <Icon size={22} className="mb-2" />
            <p className="text-sm font-semibold text-[#e8e8f0]">{label}</p>
            <p className="text-xs text-[#8888a0] mt-0.5">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Items */}
      {stats?.recentItems && stats.recentItems.length > 0 && (
        <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#2e2e3d] flex items-center justify-between">
            <h2 className="font-semibold text-[#e8e8f0]">Recently Added Items</h2>
            <Link href="/admin/menu" className="text-xs text-[#f17011] hover:underline">View all →</Link>
          </div>
          <div className="divide-y divide-[#2e2e3d]">
            {stats.recentItems.map((item: IMenuItem) => {
              const cat = item.categoryId as ICategory;
              return (
                <div key={item._id} className="flex items-center gap-4 px-6 py-3 hover:bg-[#22222f]/50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#22222f] border border-[#2e2e3d] overflow-hidden flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={16} className="text-[#8888a0]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#e8e8f0] truncate">{item.name}</p>
                    <p className="text-xs text-[#8888a0]">{cat?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#e8e8f0]">₹{item.price}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.isAvailable ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
