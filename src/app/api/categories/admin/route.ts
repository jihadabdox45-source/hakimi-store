import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json({ success: true, data: categories });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
