"use client";

import Image from "next/image";
import { Pencil, Trash2, ImageIcon } from "lucide-react";
import type { IMenuItem, ICategory } from "@/types";
import toast from "react-hot-toast";

interface Props {
  items: IMenuItem[];
  onEdit: (item: IMenuItem) => void;
  onDelete: (item: IMenuItem) => void;
  onToggleAvailability: (item: IMenuItem) => void;
}

export default function MenuItemTable({ items, onEdit, onDelete, onToggleAvailability }: Props) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-[#8888a0]">
        <ImageIcon size={40} className="mb-3 opacity-40" />
        <p className="font-medium">No menu items found</p>
        <p className="text-sm mt-1">Add your first item to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#2e2e3d]">
            {["Image", "Item Name", "Category", "Price", "Type", "Status", "Featured", "Actions"].map((h) => (
              <th key={h} className="text-left text-xs font-medium text-[#8888a0] uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#2e2e3d]">
          {items.map((item) => {
            const categoryName = typeof item.categoryId === "object"
              ? (item.categoryId as ICategory).name
              : "—";

            return (
              <tr key={item._id} className="hover:bg-[#22222f]/50 transition-colors group">
                <td className="px-4 py-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#22222f] border border-[#2e2e3d] flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={18} className="text-[#8888a0]" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-[#e8e8f0]">{item.name}</p>
                    {item.description && (
                      <p className="text-xs text-[#8888a0] truncate max-w-xs">{item.description}</p>
                    )}
                    {item.isSpicy && <span className="text-xs">🌶</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-[#8888a0]">{categoryName}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-[#e8e8f0]">₹{item.price}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium border bg-gray-500/20 text-gray-400 border-gray-500/30">
                    {item.foodType || "Unknown"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => onToggleAvailability(item)}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                      item.isAvailable ? "bg-emerald-500" : "bg-[#2e2e3d]"
                    }`}
                    title={item.isAvailable ? "Click to mark unavailable" : "Click to mark available"}
                  >
                    <span
                      className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        item.isAvailable ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3">
                  {item.isFeatured ? (
                    <span className="text-yellow-400 text-sm">⭐</span>
                  ) : (
                    <span className="text-[#8888a0] text-sm">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
