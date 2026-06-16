import { getPrisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getPrisma().product.findUnique({ where: { id: Number(id) } });
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} | Hakimi Cosmetics`, description: product.description || undefined };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getPrisma().product.findUnique({ where: { id: Number(id) }, include: { category: true } });
  if (!product) notFound();
  return <ProductDetailClient product={product as any} />;
}
