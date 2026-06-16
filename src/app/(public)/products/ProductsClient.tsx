"use client";
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  image: string | null;
  isFeatured: boolean;
  isActive: boolean;
  description: string | null;
  createdAt: Date;
  category?: { id: number; name: string } | null;
  categoryName?: string | null;
}

export default function ProductsClient({ products, categories }: { products: Product[]; categories: { id: number; name: string }[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.category?.name.toLowerCase().includes(q));
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category?.name === selectedCategory || p.categoryName === selectedCategory);
    }

    if (priceRange !== "all") {
      switch (priceRange) {
        case "0-50": result = result.filter((p) => p.price <= 50); break;
        case "51-100": result = result.filter((p) => p.price > 50 && p.price <= 100); break;
        case "101-200": result = result.filter((p) => p.price > 100 && p.price <= 200); break;
        case "201+": result = result.filter((p) => p.price > 200); break;
      }
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "name": return a.name.localeCompare(b.name);
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const activeCategories = categories.filter((c) => products.some((p) => p.category?.name === c.name || p.categoryName === c.name));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-semibold text-[#17543A] mb-1">Search</label>
              <div className="relative">
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A] text-sm" />
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div className="min-w-[120px]">
              <label className="block text-xs font-semibold text-[#17543A] mb-1">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A] text-sm">
                <option value="all">All Categories</option>
                {activeCategories.map((c) => <option key={c.id || c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="min-w-[110px]">
              <label className="block text-xs font-semibold text-[#17543A] mb-1">Price</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A] text-sm">
                <option value="all">All Prices</option>
                <option value="0-50">KSh 0 - 50</option>
                <option value="51-100">KSh 51 - 100</option>
                <option value="101-200">KSh 101 - 200</option>
                <option value="201+">KSh 201+</option>
              </select>
            </div>
            <div className="min-w-[110px]">
              <label className="block text-xs font-semibold text-[#17543A] mb-1">Sort</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A] text-sm">
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setPriceRange("all"); setSortBy("name"); }}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-semibold">
              Clear
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">Showing {filtered.length} of {products.length} products</p>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🔍</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}
