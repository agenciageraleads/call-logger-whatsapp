'use client';

import { Fragment, useState, useTransition } from 'react';

export default function SettingsPageClient({
    initialInstances,
    initialDevices,
    createInstance,
    linkDeviceToInstance,
    provisionEvolutionInstance,
    unlinkDevice
}: {
    initialInstances: any[];
    initialDevices: any[];
    createInstance: (formData: FormData) => Promise<any>;
    linkDeviceToInstance: (instanceId: string, deviceId: string) => Promise<any>;
    provisionEvolutionInstance: (evolutionInstanceDbId: string) => Promise<any>;
    unlinkDevice: (instanceId: string) => Promise<any>;
}) {
    const [instances, setInstances] = useState(initialInstances);
    const [devices, setDevices] = useState(initialDevices);
    const [isPending, startTransition] = useTransition();
    const [showAddModal, setShowAddModal] = useState(false);
    const [qrByInstanceId, setQrByInstanceId] = useState<Record<string, any>>({});
    const [error, setError] = useState<string | null>(null);

    // Optimistic updates could be added here, but for now we rely on revalidatePath on server actions
    // However, props come from server component, so they are fresh on reload.
    // To make it reactive without reload, we would need to fetch again or update local state.
    // For simplicity MVP, we just accept page refresh or implement a simple refresh logic.


    async function handleLink(instanceId: string, deviceId: string) {
        if (confirm('Vincular este dispositivo a esta instância?')) {
            startTransition(async () => {
                await linkDeviceToInstance(instanceId, deviceId);
            });
        }
    }

    async function handleUnlink(instanceId: string) {
        if (confirm('Desvincular dispositivo?')) {
            startTransition(async () => {
                await unlinkDevice(instanceId);
            });
        }
    }

    async function handleProvision(instanceDbId: string) {
        startTransition(async () => {
            setError(null);
            try {
                const res = await provisionEvolutionInstance(instanceDbId);
                const connect = res?.connect;
                setQrByInstanceId((prev) => ({ ...prev, [instanceDbId]: connect || null }));
                if (Array.isArray(res?.warnings) && res.warnings.length > 0) {
                    setError(res.warnings.join(' '));
                }
            } catch (e: any) {
                setError(e?.message || String(e));
            }
        });
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Configurações de Instâncias</h1>
                <button
                    onClick={() => setShowAddModal(!showAddModal)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                    + Adicionar Instância
                </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                “Adicionar Instância” cadastra no dashboard. “QR / Provisionar” cria/conecta na Evolution e retorna o QR. A comunicacao com a Evolution usa as variaveis do servidor (`EVOLUTION_SERVER_URL`/`EVOLUTION_API_KEY`), sem expor isso na tela.
            </p>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-200">
                    {error}
                </div>
            )}

            {/* Formulário de Adição Rápida */}
            {showAddModal && (
                <form
                    action={createInstance}
                    onSubmit={() => setShowAddModal(false)}
                    className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome da Instância</label>
                            <input name="name" placeholder="Ex: Vendas 01" className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-zinc-700" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">ID (Evolution API)</label>
                            <input name="instanceId" placeholder="Ex: comercial_01" className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-zinc-700" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">URL da Evolution API (Opcional)</label>
                            <input name="endpointUrl" placeholder="Ex: https://evo.seu-dominio.com" className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-zinc-700" />
                            <p className="text-[10px] text-gray-400 mt-1">Deixe vazio para usar a configuração padrão do servidor.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">API Key (Opcional)</label>
                            <input name="apiKey" type="password" placeholder="Sua Global API Key" className="w-full p-2 rounded bg-white dark:bg-black border border-gray-300 dark:border-zinc-700" />
                            <p className="text-[10px] text-gray-400 mt-1">A chave será armazenada de forma segura.</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancelar</button>
                        <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                            {isPending ? 'Salvando...' : 'Salvar Instância'}
                        </button>
                    </div>
                </form>
            )}

            {/* Tabela de Vínculos */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Mapeamento de Dispositivos</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Vincule os celulares Android (Devices) às instâncias do WhatsApp (Evolution) para unificar os relatórios.
                </p>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-black shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-zinc-900 text-gray-500 font-medium border-b border-gray-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">Instância (WhatsApp)</th>
                                <th className="px-6 py-4">ID Evolution</th>
                                <th className="px-6 py-4">Dispositivo Vinculado (Android)</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {instances.map((inst) => (
                                <Fragment key={inst.id}>
                                    <tr className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{inst.name}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{inst.instanceId}</td>
                                        <td className="px-6 py-4">
                                            {inst.device ? (
                                                <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full w-fit">
                                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                    {inst.device.name || inst.device.id}
                                                </div>
                                            ) : (
                                                <span className="text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full text-xs font-medium">
                                                    Sem vínculo
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {inst.device ? (
                                                <button
                                                    onClick={() => handleUnlink(inst.id)}
                                                    disabled={isPending}
                                                    className="text-red-500 hover:text-red-700 text-xs font-medium border border-red-200 dark:border-red-900/30 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                >
                                                    Desvincular
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleProvision(inst.id)}
                                                        disabled={isPending}
                                                        className="text-xs font-medium border border-gray-200 dark:border-zinc-800 px-3 py-1 rounded hover:bg-gray-50 dark:hover:bg-zinc-900/30 transition-colors"
                                                        title="Cria a instância na Evolution (se necessário), configura webhook e busca QR code"
                                                    >
                                                        QR / Provisionar
                                                    </button>
                                                    <select
                                                        onChange={(e) => handleLink(inst.id, e.target.value)}
                                                        disabled={isPending}
                                                        className="text-xs p-1 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black"
                                                        defaultValue=""
                                                    >
                                                        <option value="" disabled>Selecione um Android...</option>
                                                        {devices
                                                            .filter(d => !d.evolutionInstance) // Mostra apenas devices livres
                                                            .map(d => (
                                                                <option key={d.id} value={d.id}>
                                                                    {d.name || d.id} (Visto: {d.lastSeen ? new Date(d.lastSeen).toLocaleDateString() : 'Nunca'})
                                                                </option>
                                                            ))}
                                                    </select>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                    {(() => {
                                        const maybe = qrByInstanceId[inst.id];
                                        const qrcode = maybe?.qrcode || maybe;
                                        if (!qrcode?.base64) return null;
                                        return (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-4 bg-gray-50 dark:bg-zinc-900/30">
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                                            QR Code para <span className="font-semibold">{inst.name}</span>
                                                        </div>
                                                        <img
                                                            alt="QR Code"
                                                            className="w-44 h-44 bg-white p-2 rounded"
                                                            src={
                                                                String(qrcode.base64).startsWith('data:')
                                                                    ? qrcode.base64
                                                                    : `data:image/png;base64,${qrcode.base64}`
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })()}
                                </Fragment>
                            ))}
                            {instances.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        Nenhuma instância configurada. Adicione uma acima.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
