"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] w-full overflow-hidden flex items-center justify-center rounded-b-3xl pt-20 md:pt-28 pb-8 md:pb-12">
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(23,84,58,0.88) 60%, rgba(184,155,76,0.68)), url(https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1200&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 flex flex-col items-center text-center px-4 h-full w-full justify-between">
        <div className="flex flex-col items-center mt-6 md:mt-8">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }} className="mb-4 text-center">
            <span className="block text-2xl md:text-4xl font-bold mb-1 tracking-wider"
              style={{ fontFamily: "Dancing Script, Pacifico, cursive", background: "linear-gradient(90deg, #fff 60%, #B89B4C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Welcome
            </span>
            <span className="block text-sm md:text-xl font-semibold text-white font-serif tracking-wide">
              to Hakimi Cosmetics Store
            </span>
          </motion.div>
        </div>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="text-lg md:text-2xl font-semibold text-white drop-shadow-lg max-w-2xl mx-auto mb-4"
          style={{ fontFamily: "Cormorant Garamond, serif", letterSpacing: "0.03em" }}>
          Discover your beauty with our premium collection of cosmetics and luxury care products.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mb-6 md:mb-10">
          <Link href="/products" className="bg-[#B89B4C] hover:bg-[#a1843e] text-white px-7 py-2 rounded-full text-base font-bold shadow-lg transition-colors border-2 border-[#d9b95c] tracking-wide">
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
