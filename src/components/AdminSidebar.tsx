"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Box, Tags, ShoppingCart, Settings, LogOut, Menu, X, User } from "lucide-react";

export default function AdminSidebar({ user }: { user: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Products", href: "/admin/products", icon: Box },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Offers", href: "/admin/offers", icon: ShoppingCart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/admin/login" });
  };

  return (
    <>
      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md">
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#17543A] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-gray-600 hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive(item.href) ? "bg-[#e3ede7] text-[#17543A] font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}>
              <item.icon className="w-5 h-5" /> {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3 px-3">
            <div className="w-8 h-8 bg-[#e3ede7] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-[#17543A]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.username || "Admin"}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
