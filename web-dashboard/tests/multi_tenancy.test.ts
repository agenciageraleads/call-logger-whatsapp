import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prismaMock } from './mocks/prisma';

// Mocks globais
vi.mock('@/lib/prisma', () => ({
    prisma: prismaMock,
}));

// Mock do auth-helpers para controlar o usuário logado
const mockGetCurrentUser = vi.fn();
vi.mock('@/lib/auth-helpers', () => ({
    getCurrentUser: () => mockGetCurrentUser(),
}));

import { getCRMData } from '@/app/crm-actions';
import { getDashboardData } from '@/app/dashboard-actions';

describe('Multi-tenant Data Isolation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('CRM Logic Isolation', () => {
        it('deve filtrar leads pelo companyId do usuário logado', async () => {
            // Setup: Usuário da Empresa "A"
            mockGetCurrentUser.mockResolvedValue({
                id: 'user_A',
                companyId: 'company_A',
                role: 'ADMIN'
            });

            // Mock de retorno do Prisma
            prismaMock.lead.findMany.mockResolvedValue([
                { id: 'lead_1', companyId: 'company_A', name: 'Lead A1' }
            ]);
            prismaMock.lead.aggregate.mockResolvedValue({ _count: { id: 0 }, _sum: { value: 0 } });
            prismaMock.saleRecord.aggregate.mockResolvedValue({ _sum: { value: 0 } });

            const data = await getCRMData();

            // Verificação: O filtro 'where' deve conter o companyId correto via relação contact -> instance
            expect(prismaMock.lead.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        contact: expect.objectContaining({
                            instance: expect.objectContaining({
                                companyId: 'company_A'
                            })
                        })
                    })
                })
            );
            expect(data.leads[0].id).toBe('lead_1');
        });

        it('deve impedir acesso se não houver usuário logado', async () => {
            mockGetCurrentUser.mockResolvedValue(null);

            await expect(getCRMData()).rejects.toThrow('Não autorizado');
        });
    });

    describe('Dashboard Logic Isolation', () => {
        it('deve filtrar métricas diárias pelo companyId', async () => {
            mockGetCurrentUser.mockResolvedValue({
                id: 'user_B',
                companyId: 'company_B',
                role: 'USER'
            });

            prismaMock.dailyMetric.findMany.mockResolvedValue([]);
            prismaMock.processedMessage.count.mockResolvedValue(0);
            prismaMock.processedMessage.findMany.mockResolvedValue([]);
            prismaMock.callLog.findMany.mockResolvedValue([]);

            await getDashboardData();

            // Verificação: O filtro de métricas deve usar a company do usuário B
            expect(prismaMock.dailyMetric.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.objectContaining({
                        instance: {
                            companyId: 'company_B'
                        }
                    })
                })
            );
        });
    });
});
