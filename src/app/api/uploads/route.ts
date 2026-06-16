import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // For Vercel Blob (will be activated in production):
    // const { put } = await import("@vercel/blobs");
    // const blob = await put(file.name, file, { access: "public" });
    // return NextResponse.json({ success: true, url: blob.url });
    
    // For local dev: save to public/uploads/
    const fs = await import("fs/promises");
    const path = await import("path");
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filename = `${Date.now()}-${file.name}`;
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    
    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
