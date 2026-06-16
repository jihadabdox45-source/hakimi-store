import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getPrisma().category.findUnique({ where: { id: Number(id) } });
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: category });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const category = await getPrisma().category.update({
      where: { id: Number(id) },
      data: { ...(body.name && { name: body.name }), ...(body.description !== undefined && { description: body.description }), ...(body.image !== undefined && { image: body.image }) },
    });
    return NextResponse.json({ success: true, data: category });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const { id } = await params;
    const count = await getPrisma().product.count({ where: { categoryId: Number(id) } });
    if (count > 0) return NextResponse.json({ error: "Cannot delete category with products" }, { status: 400 });
    await getPrisma().category.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true, message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
