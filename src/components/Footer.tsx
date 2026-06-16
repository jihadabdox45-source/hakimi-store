import React from "react";
import Link from "next/link";
import HakimLogo from "./HakimLogo";

export default async function Footer() {
  const { getPrisma } = await import("@/lib/prisma");
  const setting = await getPrisma().setting.findFirst();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <HakimLogo width={140} height={60} />
            <p className="text-gray-400 mt-4 text-sm">Your trusted destination for premium cosmetics and beauty accessories.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/offers" className="hover:text-white transition-colors">Offers</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Search</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-400">
              {setting?.phone && <p>&#x1F4DE; {setting.phone}</p>}
              {setting?.whatsappNumber && <p>&#x1F4AC; {setting.whatsappNumber}</p>}
              {setting?.email && <p>&#x2709;&#xFE0F; {setting.email}</p>}
              {setting?.address && <p>&#x1F4CD; {setting.address}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Hakimi Cosmetics. All rights reserved.
      </div>
    </footer>
  );
}
