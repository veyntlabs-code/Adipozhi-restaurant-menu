"use client";

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="sticky top-[60px] z-10 bg-transparent py-3 px-4">
      <div className="max-w-3xl mx-auto relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-800" />
        <input
          id="public-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search dishes..."
          className="w-full pl-11 pr-10 py-3 bg-white/95 backdrop-blur-md border border-rose-200 rounded-2xl text-sm text-gray-900 placeholder:text-rose-900/50 focus:outline-none focus:border-rose-900 focus:ring-2 focus:ring-rose-200 transition-all shadow-sm"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-rose-100 hover:bg-rose-200 text-rose-900 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
