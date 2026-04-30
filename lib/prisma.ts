import "dotenv/config";
import { PrismaMysql2 } from "@prisma/adapter-mysql2";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMysql2({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };