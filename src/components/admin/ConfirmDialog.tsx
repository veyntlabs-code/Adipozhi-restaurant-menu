"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  variant?: "danger" | "warning";
}

export default function ConfirmDialog({ title, message, confirmLabel = "Delete", onConfirm, onCancel, variant = "danger" }: Props) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-[#1a1a24] border border-[#2e2e3d] rounded-2xl shadow-2xl animate-fade-in">
        <div className="p-6 text-center">
          <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4 ${
            variant === "danger" ? "bg-red-500/10 text-red-400" : "bg-yellow-500/10 text-yellow-400"
          }`}>
            <AlertTriangle size={26} />
          </div>
          <h3 className="text-lg font-bold text-[#e8e8f0] mb-2">{title}</h3>
          <p className="text-sm text-[#8888a0]">{message}</p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-5 py-2.5 rounded-xl bg-[#22222f] text-[#8888a0] hover:text-[#e8e8f0] text-sm font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 ${
              variant === "danger" ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
