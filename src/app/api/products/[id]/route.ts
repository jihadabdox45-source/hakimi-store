import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) }, include: { category: true } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: product });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.discountPrice !== undefined && { discountPrice: body.discountPrice }),
        ...(body.categoryId !== undefined && { categoryId: body.categoryId || null }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
      },
    });
    return NextResponse.json({ success: true, data: product });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { id } = await params;
    await prisma.product.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
