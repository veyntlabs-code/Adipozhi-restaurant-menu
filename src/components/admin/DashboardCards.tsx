"use client";

import { UtensilsCrossed, CheckCircle, XCircle, Tag } from "lucide-react";
import type { DashboardStats } from "@/types";

interface Props {
  stats: DashboardStats;
}

const cards = [
  {
    key: "totalItems" as const,
    label: "Total Items",
    icon: UtensilsCrossed,
    gradient: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
    valueColor: "text-blue-300",
  },
  {
    key: "availableItems" as const,
    label: "Available",
    icon: CheckCircle,
    gradient: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
    valueColor: "text-emerald-300",
  },
  {
    key: "unavailableItems" as const,
    label: "Unavailable",
    icon: XCircle,
    gradient: "from-red-500/20 to-red-600/10",
    border: "border-red-500/20",
    iconColor: "text-red-400",
    valueColor: "text-red-300",
  },
  {
    key: "totalCategories" as const,
    label: "Categories",
    icon: Tag,
    gradient: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-500/20",
    iconColor: "text-purple-400",
    valueColor: "text-purple-300",
  },
];

export default function DashboardCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, gradient, border, iconColor, valueColor }) => (
        <div
          key={key}
          className={`bg-gradient-to-br ${gradient} border ${border} rounded-2xl p-5 animate-fade-in`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-[#8888a0] uppercase tracking-wider mb-1">{label}</p>
              <p className={`text-3xl font-bold ${valueColor}`}>{stats[key]}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl bg-[#1a1a24]/50 flex items-center justify-center ${iconColor}`}>
              <Icon size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
