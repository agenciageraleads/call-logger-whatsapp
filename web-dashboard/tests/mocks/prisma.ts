import { vi } from 'vitest';

export const prismaMock = {
    evolutionInstance: {
        findUnique: vi.fn(),
        findMany: vi.fn(),
    },
    processedMessage: {
        findUnique: vi.fn(),
        create: vi.fn(),
        count: vi.fn(),
        findMany: vi.fn(),
    },
    contact: {
        findUnique: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
    },
    dailyConversation: {
        findUnique: vi.fn(),
        create: vi.fn(),
    },
    dailyMetric: {
        upsert: vi.fn(),
        findMany: vi.fn(),
    },
    lead: {
        findMany: vi.fn(),
        findFirst: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        deleteMany: vi.fn(),
        aggregate: vi.fn(),
    },
    user: {
        findUnique: vi.fn(),
    },
    saleRecord: {
        create: vi.fn(),
        aggregate: vi.fn(),
    },
    callLog: {
        findMany: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback(prismaMock)),
};

