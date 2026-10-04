"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tag,
  QrCode,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ChefHat,
} from "lucide-react";
import toast from "react-hot-toast";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/menu", icon: UtensilsCrossed, label: "Menu" },
  { href: "/admin/categories", icon: Tag, label: "Categories" },

  { href: "/admin/qr", icon: QrCode, label: "QR Code" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#2e2e3d] ${collapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f17011] to-[#e25607] flex items-center justify-center flex-shrink-0">
          <ChefHat size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-[#e8e8f0] leading-tight">MenuCraft</p>
            <p className="text-xs text-[#8888a0]">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                ${active
                  ? "bg-gradient-to-r from-[#f17011]/20 to-[#f17011]/10 text-[#f17011] border border-[#f17011]/20"
                  : "text-[#8888a0] hover:text-[#e8e8f0] hover:bg-[#22222f]"
                } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={20} className={`flex-shrink-0 ${active ? "text-[#f17011]" : ""}`} />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
              {!collapsed && active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#f17011]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-[#2e2e3d] pt-4">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#8888a0] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-[#1a1a24] border-r border-[#2e2e3d] transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#2e2e3d] border border-[#3a3a4d] flex items-center justify-center text-[#8888a0] hover:text-[#e8e8f0] transition-colors z-10"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a1a24] border-b border-[#2e2e3d] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f17011] to-[#e25607] flex items-center justify-center">
            <ChefHat size={16} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[#e8e8f0]">MenuCraft</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0]"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 bottom-0 w-64 bg-[#1a1a24] z-50 shadow-2xl animate-slide-in">
            <div className="pt-16">
              <SidebarContent />
            </div>
          </aside>
        </>
      )}
    </>
  );
}
