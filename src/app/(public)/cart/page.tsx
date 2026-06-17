"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft, ExternalLink } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getCount } = useCartStore();
  const [whatsapp, setWhatsapp] = useState("");
  const total = getTotal();
  const count = getCount();

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

  const handleWhatsAppCheckout = () => {
    if (!whatsapp) return;
    const itemList = items
      .map(
        (i) =>
          `• ${i.name} - ${i.quantity} piece(s) - KSh${
            (i.discountPrice || i.price) * i.quantity
          }`
      )
      .join("\n");
    const message = encodeURIComponent(
      `Hello, I would like to order:\n\n${itemList}\n\nTotal: KSh${total}`
    );
    window.open(`https://wa.me/${whatsapp}?text=${message}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven&apos;t added any products yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#17543A] text-white px-6 py-3 rounded-lg hover:bg-[#144a33] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items ({count})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-2xl text-gray-500">
                              🌸
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-[#17543A]">
                              KSh{item.discountPrice || item.price}
                            </span>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                >
                                  <Minus className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="text-lg font-semibold w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                >
                                  <Plus className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Clear Cart
                </button>
                <Link
                  href="/products"
                  className="text-[#17543A] hover:text-[#144a33] flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    KSh{total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-[#17543A]">
                      KSh{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-5 h-5" /> Checkout via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
