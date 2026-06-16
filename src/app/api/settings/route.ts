import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const setting = await prisma.setting.findFirst();
  if (!setting) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: setting });
}
