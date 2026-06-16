"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string | null;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group mx-auto w-full max-w-xs h-full flex flex-col">
      <div className="h-56 sm:h-64 md:h-72 bg-gradient-to-br from-[#e3ede7] to-[#f8f3e3] flex items-center justify-center overflow-hidden">
        {category.image ? (
          <Image src={category.image} alt={category.name} width={300} height={300} className="h-full w-full object-cover" />
        ) : (
          <span className="text-4xl sm:text-5xl">🌸</span>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="text-sm sm:text-lg font-bold text-[#17543A] mb-3 text-center">{category.name}</h3>
        <Link href={`/products?category=${category.name}`}
          className="mt-auto bg-[#f3f7f5] hover:bg-[#e3ede7] text-[#17543A] font-semibold px-4 py-2 rounded-lg text-xs sm:text-sm text-center transition-colors">
          Shop Now →
        </Link>
      </div>
    </div>
  );
}
