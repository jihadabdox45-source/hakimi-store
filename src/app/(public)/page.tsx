import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakimi Cosmetics | Best perfumes and accessories",
  description: "Discover the finest perfumes and luxury accessories at Hakimi Cosmetics. Shop now for the best prices.",
};

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17543A] mb-2 sm:mb-4">Featured Products</h2>
            <p className="text-sm sm:text-base text-gray-600">Discover our most popular and trending products</p>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-4xl mb-4">⭐</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No featured products available</h3>
              <Link href="/products" className="inline-block bg-[#17543A] text-white px-6 py-3 rounded-lg hover:bg-[#144a33] transition-colors">
                View All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:mt-10">
            <Link href="/products" className="inline-block bg-[#17543A] hover:bg-[#144a33] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17543A] mb-2 sm:mb-4">Shop by Category</h2>
              <p className="text-sm sm:text-base text-gray-600">Explore our diverse collection of perfumes and accessories</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
