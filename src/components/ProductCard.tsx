"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, MessageCircle } from "lucide-react";
import { useCartStore } from "@/stores/cart";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    discountPrice: number | null;
    image: string | null;
    isFeatured: boolean;
    category?: { name: string } | null;
    categoryName?: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data?.whatsappNumber) {
          setWhatsapp(res.data.whatsappNumber.replace("+", ""));
        }
      })
      .catch(() => {});
  }, []);

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPct = hasDiscount ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) : 0;
  const displayPrice = hasDiscount ? product.discountPrice! : product.price;

  const handleWhatsApp = () => {
    if (!whatsapp) return;
    const msg = encodeURIComponent(`Hello, I want to order: ${product.name} - KSh${displayPrice}`);
    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 group w-full max-w-sm mx-auto"
      style={{ background: "linear-gradient(135deg, #f8fafc 60%, #f3ecd9 100%)" }}>
      <Link href={`/products/${product.id}`}>
        <div className="h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center overflow-hidden relative">
          <Image src={product.image || "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"}
            alt={product.name} width={400} height={400} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.isFeatured && (
              <div className="bg-green-700 p-1.5 rounded-full shadow-md">
                <Star className="w-3 h-3 text-yellow-300" />
              </div>
            )}
            {hasDiscount && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">{discountPct}%</div>
            )}
          </div>
        </div>
      </Link>
      <div className="p-3 sm:p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-extrabold text-[#17543A] mb-1 leading-tight">{product.name}</h3>
        </Link>
        <p className="text-gray-700 text-xs mb-2 font-[Cormorant_Garamond]">{product.category?.name || product.categoryName || "Uncategorized"}</p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm font-extrabold text-[#17543A]">KSh{displayPrice}</span>
            {hasDiscount && <span className="text-xs text-gray-400 line-through ml-1">KSh{product.price}</span>}
          </div>
          <div className="flex items-center gap-1.5">
            {whatsapp && (
              <button onClick={handleWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-all" title="Order via WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </button>
            )}
            <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, discountPrice: product.discountPrice, image: product.image }, 1)}
              className="bg-[#17543A] hover:bg-[#144a33] text-white p-2 rounded-full transition-all" title="Add to Cart">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
