import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

type MariaPoolConfig = ConstructorParameters<typeof PrismaMariaDb>[0];

/**
 * Prefer DATABASE_URL for Railway (and local): host, port, SSL in one string.
 * Split DATABASE_* vars need DATABASE_PORT or MYSQLPORT (defaults to 3306).
 */
function poolConfigFromEnv(): MariaPoolConfig {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    return databaseUrl;
  }

  const portEnv =
    process.env.DATABASE_PORT ??
    process.env.MYSQLPORT ??
    process.env.MYSQL_TCP_PORT;
  const port = portEnv ? Number.parseInt(portEnv, 10) : 3306;

  const connectTimeout = Number.parseInt(
    process.env.DATABASE_CONNECT_TIMEOUT_MS ?? "15000",
    10,
  );
  const acquireTimeout = Number.parseInt(
    process.env.DATABASE_ACQUIRE_TIMEOUT_MS ?? "20000",
    10,
  );
  const connectionLimit = Number.parseInt(
    process.env.DATABASE_CONNECTION_LIMIT ?? "5",
    10,
  );

  const config: Exclude<MariaPoolConfig, string> = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port,
    connectionLimit,
    connectTimeout,
    acquireTimeout,
  };

  const sslFlag = process.env.DATABASE_SSL;
  if (sslFlag === "true" || sslFlag === "1") {
    config.ssl = {
      rejectUnauthorized:
        process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== "false",
    };
  }

  return config;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaMariaDb(poolConfigFromEnv()),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
