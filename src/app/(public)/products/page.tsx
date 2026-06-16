import { getPrisma } from "@/lib/prisma";
import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products | Hakimi Cosmetics",
  description: "Browse all perfumes and luxury accessories at Hakimi Cosmetics.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getPrisma().product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    getPrisma().category.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return <ProductsClient products={products as any} categories={categories} />;
}
