import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true, discountPrice: { not: null } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  const filtered = products.filter((p) => p.discountPrice && p.discountPrice > 0 && p.discountPrice < p.price);
  return NextResponse.json({ success: true, data: filtered });
}
