
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prevent Prisma initialization during build time
const createPrismaClient = () => {
    // During build (when collecting page data), return a mock that won't be used
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
        return null as any; // Build-time placeholder
    }
    return new PrismaClient();
};

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


