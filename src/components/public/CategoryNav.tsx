"use client";

import { useRef, useState, useEffect } from "react";
import type { ICategory } from "@/types";
import { Search, X } from "lucide-react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["500", "700"] });

interface Props {
  categories: ICategory[];
  activeCategories: string[];
  onToggleCategory: (id: string) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
}

export default function CategoryNav({ categories, activeCategories, onToggleCategory, searchValue, onSearchChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);


  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSearchOpen]);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-rose-100 shadow-sm relative">
      <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-3 w-full justify-between">
        <div className={`text-rose-900 text-xl sm:text-2xl whitespace-nowrap ${isSearchOpen || searchValue ? 'hidden md:block' : 'block'} ${dancingScript.className}`}>
          Where taste meets togetherness
        </div>

        {/* Search Area */}
        <div className="flex items-center gap-2 flex-1 justify-end" ref={searchRef}>
          {/* Inline Expanded Search Box */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen || searchValue ? 'max-w-full opacity-100 w-full' : 'max-w-0 opacity-0 w-0'
              }`}
          >
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-800" />
              <input
                type="text"
                autoFocus={isSearchOpen}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dishes..."
                className="w-full pl-9 pr-9 py-2 bg-rose-50/90 backdrop-blur-sm border border-rose-200 rounded-lg text-sm text-gray-900 placeholder:text-rose-900/50 focus:outline-none focus:border-rose-900 focus:ring-1 focus:ring-rose-900 transition-all shadow-sm"
              />
              {searchValue && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-rose-200 hover:bg-rose-300 text-rose-900 transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Search Button */}
          {!(isSearchOpen || searchValue) && (
            <div className="shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100"
              >
                <Search size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
