import { vi } from 'vitest';

export const prismaMock = {
    evolutionInstance: {
        findUnique: vi.fn(),
    },
    processedMessage: {
        findUnique: vi.fn(),
        create: vi.fn(),
    },
    contact: {
        findUnique: vi.fn(),
        create: vi.fn(),
    },
    dailyConversation: {
        findUnique: vi.fn(),
        create: vi.fn(),
    },
    dailyMetric: {
        upsert: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback(prismaMock)),
};

