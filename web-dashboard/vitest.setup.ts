import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock global fetch if needed
global.fetch = vi.fn();

// Mock console.error to keep logs clean
console.error = vi.fn();
