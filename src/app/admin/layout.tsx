import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f0f14]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 lg:overflow-y-auto pt-16 lg:pt-0">
        {children}
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#22222f",
            color: "#e8e8f0",
            border: "1px solid #2e2e3d",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#f17011", secondary: "#fff" } },
          error: { iconTheme: { primary: "#f87171", secondary: "#fff" } },
        }}
      />
    </div>
  );
}
