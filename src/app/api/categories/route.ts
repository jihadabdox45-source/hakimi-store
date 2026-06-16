import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { isActive: true }, orderBy: { name: "asc" },
  });
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(req: NextRequest) {
  try {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const body = await req.json();
    const category = await prisma.category.create({
      data: { name: body.name, description: body.description, image: body.image || null },
    });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
