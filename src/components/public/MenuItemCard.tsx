"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Flame, Star, ImageIcon, X } from "lucide-react";
import type { IMenuItem } from "@/types";

interface Props {
  item: IMenuItem;
  currency: string;
  priority?: boolean;
}

export default function MenuItemCard({ item, currency, priority = false }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsMounted(true);
    // Wait for the next frame to trigger the CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  const closeModal = () => {
    setIsVisible(false);
    // Wait for the transition duration before unmounting
    setTimeout(() => {
      setIsMounted(false);
    }, 300);
  };

  const color = item.foodType === "NON_VEG" ? "#ef4444" : item.foodType === "EGG" ? "#eab308" : "#10b981";

  return (
    <>
      <div
        onClick={openModal}
        className="bg-white/95 backdrop-blur-sm rounded-2xl border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all overflow-hidden flex flex-col h-full group cursor-pointer"
      >
        {/* Image */}
        <div className="w-full h-32 sm:h-40 bg-rose-50 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <ImageIcon size={28} className="text-rose-200" />
          )}
          
          {/* Veg/Non-veg indicator overlay */}
          <div className="absolute top-2 right-2 z-10 w-4 h-4 border-2 rounded-sm flex items-center justify-center bg-white/90 shadow-sm backdrop-blur-sm" style={{ borderColor: color }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col">
          {/* Food type indicator */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">

            {item.isSpicy && (
              <span className="flex items-center gap-0.5 text-[10px] sm:text-xs text-rose-700 font-medium bg-rose-50 px-1.5 py-0.5 rounded-full whitespace-nowrap border border-rose-100">
                <Flame size={10} className="text-rose-500" />
                Spicy
              </span>
            )}
            {item.isFeatured && (
              <span className="flex items-center gap-0.5 text-[10px] sm:text-xs text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded-full whitespace-nowrap border border-amber-100">
                <Star size={10} className="fill-amber-500 text-amber-500" />
                Pick
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-sm sm:text-base font-bold text-rose-950 leading-snug line-clamp-2 group-hover:text-rose-800 transition-colors">{item.name}</h3>

          {/* Description */}
          {item.description && (
            <p className="text-xs sm:text-sm text-rose-900/60 mt-1 line-clamp-2 leading-relaxed flex-1">{item.description}</p>
          )}

          <div className="flex-1" /> {/* Push price to bottom if description is short/missing */}

          {/* Price */}
          <p className="text-base sm:text-lg font-bold text-rose-800 mt-2 sm:mt-3">
            {currency}{item.price}
          </p>
        </div>
      </div>

      {/* Popup Modal */}
      {isMounted && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className={`relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-out ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div className="w-full h-48 sm:h-64 bg-rose-50 flex items-center justify-center relative">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
              ) : (
                <ImageIcon size={48} className="text-rose-200" />
              )}
            </div>

            {/* Modal Details */}
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="w-4 h-4 border-2 rounded-sm flex items-center justify-center flex-shrink-0" style={{ borderColor: color }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                </div>
                {item.isSpicy && (
                  <span className="flex items-center gap-1 text-xs text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                    <Flame size={12} className="text-rose-500" />
                    Spicy
                  </span>
                )}
                {item.isFeatured && (
                  <span className="flex items-center gap-1 text-xs text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                    <Star size={12} className="fill-amber-500 text-amber-500" />
                    Chef&apos;s Pick
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-rose-950 leading-tight mb-2">{item.name}</h2>

              {item.description && (
                <p className="text-sm sm:text-base text-rose-900/70 leading-relaxed mb-6">{item.description}</p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-rose-100">
                <p className="text-2xl font-bold text-rose-800">
                  {currency}{item.price}
                </p>
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 bg-rose-900 hover:bg-rose-800 text-white font-medium rounded-full transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
