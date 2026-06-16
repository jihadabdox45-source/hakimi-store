import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, ".env.local") });
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
