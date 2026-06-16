import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  const where: any = { isActive: true };
  if (search) where.name = { contains: search, mode: "insensitive" };
  if (category) where.category = { name: category };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ success: true, data: products });
}

export async function POST(req: NextRequest) {
  try {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        discountPrice: body.discountPrice || null,
        categoryId: body.categoryId || null,
        image: body.image || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured || false,
      },
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message || "Server error" }, { status: 500 });
  }
}
