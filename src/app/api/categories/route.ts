import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const categories = await getPrisma().category.findMany({
    where: { isActive: true }, orderBy: { name: "asc" },
  });
  return NextResponse.json({ success: true, data: categories });
}

export async function POST(req: NextRequest) {
  try {
    const { requireAdmin } = await import("@/lib/auth");
    await requireAdmin();
    const body = await req.json();
    const category = await getPrisma().category.create({
      data: { name: body.name, description: body.description, image: body.image || null },
    });
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
