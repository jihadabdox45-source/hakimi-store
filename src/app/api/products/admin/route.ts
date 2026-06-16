import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    const where: any = {};
    if (search) where.name = { contains: search, mode: "insensitive" };
    if (category) where.categoryId = parseInt(category);

    const products = await getPrisma().product.findMany({
      where, include: { category: true }, orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: products });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
