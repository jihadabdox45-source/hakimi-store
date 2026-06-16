"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import HakimLogo from "./HakimLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.getCount());
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Our Products" },
    { path: "/offers", label: "Offers" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-xl bg-white ${
      isScrolled ? "shadow-xl border-b-2 border-[#f1e6c7]" : "border-b-2 border-[#fcf9f2]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <HakimLogo width={140} height={60} />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}
                className={`relative px-3 py-1.5 rounded-full text-base font-semibold transition-all duration-200 ${
                  pathname === item.path
                    ? "text-[#17543A] after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:w-2/3 after:h-0.5 after:bg-[#B89B4C] after:rounded-full"
                    : "text-gray-800 hover:text-[#B89B4C] hover:bg-[#fcf9f2]"
                }`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#fcf9f2] hover:bg-[#f8f3e3] text-[#17543A] transition-colors duration-200" title="Cart">
              <ShoppingCart size={20} />
              {mounted && count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B89B4C] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-full bg-[#fcf9f2] hover:bg-[#f8f3e3] text-[#17543A] transition-colors duration-200">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setIsOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col lg:hidden border-l-2 border-[#f1e6c7]">
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span className="text-lg font-bold text-[#17543A]">Hakimi Cosmetics</span>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-[#fcf9f2] hover:bg-[#f8f3e3] text-[#17543A]"><X size={18} /></button>
              </div>
              <div className="flex-1 flex flex-col gap-2 px-6 py-6">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-full text-base font-semibold transition-all ${
                      pathname === item.path ? "text-[#17543A] bg-[#fcf9f2]" : "text-gray-800 hover:text-[#B89B4C] hover:bg-[#fcf9f2]"
                    }`}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
