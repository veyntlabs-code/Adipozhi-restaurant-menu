"use client";

import type { ICategory } from "@/types";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["500", "700"] });

interface Props {
  categories: ICategory[];
  activeCategories: string[];
  onToggleCategory: (id: string) => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export default function CategoryNav({ }: Props) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-rose-100 shadow-sm relative">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-center w-full">
        <div className={`text-rose-900 text-xl sm:text-2xl whitespace-nowrap ${dancingScript.className}`}>
          Where taste meets togetherness
        </div>
      </div>
    </div>
  );
}
