"use client";
import React from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function OffersClient({ products }: { products: any[] }) {
  const discounted = products.filter((p) => p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Discounted Products</h2>
        <p className="text-gray-600 mb-6">Showing {discounted.length} discounted products</p>

        {discounted.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🎁</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No offers available at the moment</h3>
            <Link href="/products" className="inline-block bg-[#17543A] text-white px-6 py-3 rounded-lg hover:bg-[#144a33]">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {discounted.map((p: any) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
