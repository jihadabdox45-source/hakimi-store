import { prisma } from "@/lib/prisma";
import OffersClient from "./OffersClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Offers | Hakimi Cosmetics",
  description: "Discover special offers and discounts on perfumes and accessories.",
};

export default async function OffersPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true, discountPrice: { not: null } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return <OffersClient products={products as any} />;
}
