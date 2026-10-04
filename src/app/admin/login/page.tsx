"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please enter your email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success(`Welcome back, ${data.data.name}!`);
      setTimeout(() => router.push("/admin/dashboard"), 500);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center p-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#22222f", color: "#e8e8f0", border: "1px solid #2e2e3d", borderRadius: "12px" },
        }}
      />

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#f17011]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f17011] to-[#e25607] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#f17011]/20">
            <ChefHat size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#e8e8f0]">MenuCraft</h1>
          <p className="text-[#8888a0] text-sm mt-1">Sign in to your admin panel</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@restaurant.com"
                className="w-full px-4 py-3 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 focus:ring-1 focus:ring-[#f17011]/20 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#0f0f14] border border-[#2e2e3d] text-[#e8e8f0] placeholder:text-[#8888a0] focus:outline-none focus:border-[#f17011]/50 focus:ring-1 focus:ring-[#f17011]/20 transition-all text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8888a0] hover:text-[#e8e8f0] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              id="login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-2 shadow-lg shadow-[#f17011]/20"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-3 bg-[#1a1a24]/50 border border-[#2e2e3d]/50 rounded-xl text-center">
          <p className="text-xs text-[#8888a0]">
            Demo: <span className="text-[#f17011]">admin@royalrestaurant.com</span> / <span className="text-[#f17011]">Admin@123</span>
          </p>
          <p className="text-xs text-[#8888a0] mt-1">
            Run <code className="bg-[#22222f] px-1 rounded text-[#f17011]">POST /api/seed</code> to seed demo data
          </p>
        </div>
      </div>
    </div>
  );
}
