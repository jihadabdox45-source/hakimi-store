import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminExists = await prisma.user.findUnique({ where: { username: "admin" } });
  if (!adminExists) {
    const hashed = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: { username: "admin", password: hashed, email: "admin@store.com", role: "admin" },
    });
    console.log("✅ Admin user created: admin / admin123");
  }

  const settingsExist = await prisma.setting.findFirst();
  if (!settingsExist) {
    await prisma.setting.create({
      data: {
        siteName: "Hakimi Cosmetics",
        siteDescription: "Best cosmetics, perfumes, and accessories at competitive prices",
        whatsappNumber: "+254701234567",
        phone: "+254701234567",
        email: "info@hakimi-cosmetics.com",
        currency: "KES",
      },
    });
    console.log("✅ Default settings created");
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
