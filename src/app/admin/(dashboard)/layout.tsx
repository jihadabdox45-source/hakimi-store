import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || (session.user as any)?.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="admin-layout" style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <AdminSidebar user={session.user as any} />
      <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }} className="lg:ml-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
