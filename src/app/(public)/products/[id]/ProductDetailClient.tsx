"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Share2, CheckCircle, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  discountPrice: number | null;
  image: string | null;
  isFeatured: boolean;
  category?: { id: number; name: string } | null;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, discountPrice: product.discountPrice, image: product.image }, 1);
    }
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const displayPrice = hasDiscount ? product.discountPrice! : product.price;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#17543A]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#17543A]">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image src={product.image || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"}
                  alt={product.name} width={500} height={500} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">KSh{displayPrice}</span>
                {hasDiscount && <span className="text-xl text-gray-500 line-through">KSh{product.price}</span>}
              </div>
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
                <ul className="space-y-2">
                  {["Premium quality fragrance", "Long-lasting scent", "Elegant packaging", "Perfect for gifting"].map((f) => (
                    <li key={f} className="flex items-center text-gray-600"><CheckCircle className="text-green-500 mr-2 w-4 h-4" />{f}</li>
                  ))}
                </ul>
              </div>
              {product.category && (
                <p className="text-sm text-gray-500">Category: <Link href={`/products?category=${product.category.name}`} className="text-[#17543A] hover:underline">{product.category.name}</Link></p>
              )}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Quantity</label>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex gap-3">
                <button onClick={handleAddToCart} className="flex-1 bg-[#17543A] hover:bg-[#144a33] text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2"><ShoppingCart className="w-5 h-5" /> Add to Cart</button>
                <button onClick={() => setIsWishlisted(!isWishlisted)} className={`px-4 py-3 rounded-lg font-medium ${isWishlisted ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"} hover:bg-gray-200`}><Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`} /></button>
                <button onClick={() => navigator.share?.({ title: product.name, url: window.location.href })} className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"><Share2 className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
