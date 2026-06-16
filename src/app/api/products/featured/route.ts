import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { category: true },
    take: 8,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, data: products });
}
