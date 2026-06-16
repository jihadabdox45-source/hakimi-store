import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { currentPassword, newPassword } = await req.json();
    const userId = Number((session.user as any).id);

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
    return NextResponse.json({ success: true, message: "Password changed successfully" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
