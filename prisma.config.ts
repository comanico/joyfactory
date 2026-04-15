// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Load Next.js .env.local instead of plain .env
import { config } from "dotenv";
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});