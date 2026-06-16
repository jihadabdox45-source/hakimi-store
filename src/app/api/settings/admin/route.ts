import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const setting = await getPrisma().setting.findFirst();
    return NextResponse.json({ success: true, data: setting });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const setting = await getPrisma().setting.update({
      where: { id: 1 },
      data: {
        siteName: body.siteName,
        siteDescription: body.siteDescription,
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        whatsappNumber: body.whatsappNumber,
        facebookUrl: body.facebookUrl,
        instagramUrl: body.instagramUrl,
        twitterUrl: body.twitterUrl,
        address: body.address,
        phone: body.phone,
        email: body.email,
        currency: body.currency,
        language: body.language,
        timezone: body.timezone,
        workingHours: body.workingHours,
      },
    });
    return NextResponse.json({ success: true, data: setting });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
