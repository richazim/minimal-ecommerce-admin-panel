// src/db/db.ts

import { PrismaClient } from "@/generated/prisma"

const createPrismaClient = () => new PrismaClient()

const db = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db
}

export default db
