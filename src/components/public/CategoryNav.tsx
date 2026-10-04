"use client";

import { useRef, useState, useEffect } from "react";
import type { ICategory } from "@/types";
import { Filter, ChevronDown, Check, Search, X } from "lucide-react";

interface Props {
  categories: ICategory[];
  activeCategories: string[];
  onToggleCategory: (id: string) => void;
  searchValue: string;
  onSearchChange: (val: string) => void;
}

export default function CategoryNav({ categories, activeCategories, onToggleCategory, searchValue, onSearchChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    if (isDropdownOpen || isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen, isSearchOpen]);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-rose-100 shadow-sm relative">
      <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Buttons Container */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Dropdown Filter */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-rose-50 border border-rose-200 text-rose-900 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors"
            >
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
              {activeCategories.length > 0 && (
                <span className="bg-rose-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ml-1">
                  {activeCategories.length}
                </span>
              )}
              <ChevronDown size={16} className={`transition-transform ml-1 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-rose-100 shadow-lg rounded-xl z-20 py-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    onToggleCategory("all");
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm transition-colors text-gray-700 hover:bg-gray-50"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${activeCategories.length === 0 ? "bg-rose-600 border-rose-600 text-white" : "border-gray-300"}`}>
                    {activeCategories.length === 0 && <Check size={12} />}
                  </div>
                  All Categories
                </button>
                {categories.map((cat) => {
                  const isSelected = activeCategories.includes(cat._id);
                  return (
                    <button
                      key={cat._id}
                      onClick={() => {
                        onToggleCategory(cat._id);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm transition-colors text-gray-700 hover:bg-gray-50"
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${isSelected ? "bg-rose-600 border-rose-600 text-white" : "border-gray-300"}`}>
                        {isSelected && <Check size={12} />}
                      </div>
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="shrink-0" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${isSearchOpen || searchValue
                ? "bg-rose-900 border-rose-900 text-white"
                : "bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100"
                }`}
            >
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal List */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto py-1 scrollbar-hide flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            onClick={() => onToggleCategory("all")}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategories.length === 0
              ? "bg-rose-900 text-white shadow-md shadow-rose-200"
              : "bg-white text-rose-900 border border-rose-200 hover:bg-rose-50"
              }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onToggleCategory(cat._id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategories.includes(cat._id)
                ? "bg-rose-900 text-white shadow-md shadow-rose-200"
                : "bg-white text-rose-900 border border-rose-200 hover:bg-rose-50"
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Expanded Search Box */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isSearchOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="max-w-3xl mx-auto px-4 pb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-800" />
              <input
                type="text"
                autoFocus={isSearchOpen}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search dishes..."
                className="w-full pl-9 pr-9 py-2.5 bg-rose-50/90 backdrop-blur-sm border border-rose-200 rounded-lg text-sm text-gray-900 placeholder:text-rose-900/50 focus:outline-none focus:border-rose-900 focus:ring-1 focus:ring-rose-900 transition-all shadow-sm"
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
        </div>
      </div>
    </div>
  );
}
