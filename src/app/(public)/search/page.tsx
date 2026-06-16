"use client";
import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data.data || []);
    } catch { setProducts([]); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input type="text" placeholder="Type product name..." value={query} onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#17543A]" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button type="submit" className="bg-[#17543A] hover:bg-[#144a33] text-white px-6 py-3 rounded-lg font-medium">Search</button>
          </div>
        </form>

        {loading && <p className="text-center text-gray-600 py-8">Searching...</p>}

        {searched && !loading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map((p: any) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
