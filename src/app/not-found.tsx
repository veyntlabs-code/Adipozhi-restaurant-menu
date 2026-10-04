import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#f17011]/20 to-[#f17011]/5 border border-[#f17011]/20 flex items-center justify-center mx-auto mb-6">
          <UtensilsCrossed size={36} className="text-[#f17011]" />
        </div>
        <h1 className="text-4xl font-bold text-[#e8e8f0] mb-2">404</h1>
        <p className="text-[#8888a0] mb-6">Page not found</p>
        <Link
          href="/admin/login"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#f17011] to-[#e25607] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Go to Admin
        </Link>
      </div>
    </div>
  );
}
