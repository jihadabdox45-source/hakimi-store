import { auth as nextAuth } from "@/auth"

export async function getServerSession() {
  return await nextAuth()
}

export async function requireAdmin() {
  const session = await getServerSession()
  if (!session || (session.user as any)?.role !== "admin") {
    throw new Error("Unauthorized")
  }
  return session
}
