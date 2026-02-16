/**
 * @file types.ts
 * @description Definições de tipos globais para o dashboard para garantir segurança de tipos e remover 'any'.
 */

import { EvolutionInstance, Device, DailyMetric } from './generated/prisma';

export type { EvolutionInstance, Device, DailyMetric };

export interface KPIData {
    callsMade: number;
    callsReceived: number;
    callDuration: number;
    messagesSent: number;
    messagesReceived: number;
    activeConversations: number;
    newContacts: number;
}

export interface HourlyData {
    name: string;
    msgs: number;
    calls: number;
}

export interface MetricWithInstance extends DailyMetric {
    instance: EvolutionInstance;
}

export interface DashboardData {
    dailyMetrics: MetricWithInstance[];
    totals: KPIData;
    hourlyActivity: HourlyData[];
    hourlyByInstance: Record<string, HourlyData[]>;
    date: Date | string;
}

export interface InstanceWithDevice extends EvolutionInstance {
    device: Device | null;
}

export interface DeviceWithInstance extends Device {
    evolutionInstance: EvolutionInstance | null;
}

// Tipos para as props dos componentes cliente
export interface DashboardClientProps {
    initialData: DashboardData;
}

export interface SettingsPageClientProps {
    initialInstances: InstanceWithDevice[];
    initialDevices: DeviceWithInstance[];
    createInstance: (formData: FormData) => Promise<{ success: boolean }>;
    linkDeviceToInstance: (instanceId: string, deviceId: string) => Promise<{ success: boolean }>;
    provisionEvolutionInstance: (evolutionInstanceDbId: string) => Promise<{
        success: boolean;
        connect?: { qrcode: { base64: string } } | string | null;
        warnings?: string[];
    }>;
    unlinkDevice: (instanceId: string) => Promise<{ success: boolean }>;
    logoutInstance: (instanceId: string) => Promise<{ success: boolean }>;
    deleteInstance: (instanceId: string) => Promise<{ success: boolean }>;
}
