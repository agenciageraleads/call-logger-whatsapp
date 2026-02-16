'use client';

import { Fragment, useState, useTransition } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { SettingsPageClientProps, InstanceWithDevice } from '@/lib/types';
import { t } from '@/lib/i18n';

/**
 * Página de configurações para gerenciamento de instâncias e vínculos.
 */
export default function SettingsPageClient({
    initialInstances,
    initialDevices,
    createInstance,
    linkDeviceToInstance,
    provisionEvolutionInstance,
    unlinkDevice,
    logoutInstance,
    deleteInstance
}: SettingsPageClientProps) {
    // Usamos as props diretamente para garantir reatividade total com o servidor após revalidatePath
    const instances = initialInstances;
    const devices = initialDevices;

    const [isPending, startTransition] = useTransition();
    const [showAddModal, setShowAddModal] = useState(false);
    const [qrByInstanceId, setQrByInstanceId] = useState<Record<string, { qrcode: { base64: string } } | string | null>>({});
    const [error, setError] = useState<string | null>(null);

    async function handleLink(instanceId: string, deviceId: string) {
        if (confirm(t('settings.confirm.link'))) {
            setError(null);
            startTransition(async () => {
                const res = await linkDeviceToInstance(instanceId, deviceId);
                if (!res.success) setError((res as any).error || 'Erro ao vincular');
            });
        }
    }

    async function handleUnlink(instanceId: string) {
        if (confirm(t('settings.confirm.unlink'))) {
            setError(null);
            startTransition(async () => {
                const res = await unlinkDevice(instanceId);
                if (!res.success) setError((res as any).error || 'Erro ao desvincular');
            });
        }
    }

    async function handleLogout(instanceId: string) {
        if (confirm(t('settings.confirm.logout'))) {
            setError(null);
            startTransition(async () => {
                try {
                    const res = await logoutInstance(instanceId);
                    if (!res.success) {
                        setError((res as any).error || 'Erro ao desconectar');
                        return;
                    }
                    // Limpa QR Code se houver
                    setQrByInstanceId((prev) => {
                        const next = { ...prev };
                        delete next[instanceId];
                        return next;
                    });
                } catch (e: unknown) {
                    setError((e as Error)?.message || String(e));
                }
            });
        }
    }

    async function handleDelete(instanceId: string) {
        if (confirm(t('settings.confirm.delete'))) {
            setError(null);
            startTransition(async () => {
                try {
                    const res = await deleteInstance(instanceId);
                    if (!res.success) {
                        setError((res as any).error || 'Erro ao excluir');
                        return;
                    }
                } catch (e: unknown) {
                    setError((e as Error)?.message || String(e));
                }
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
            } catch (e: unknown) {
                setError((e as Error)?.message || String(e));
            }
        });
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12">
            {/* SEO & GEO Segment */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": t('settings.title'),
                        "description": t('settings.description'),
                        "breadcrumb": "Home > Settings"
                    })
                }}
            />

            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors flex items-center justify-center min-h-[44px] min-w-[44px]"
                        aria-label={t('common.backToDashboard')}
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
                </div>
                <button
                    onClick={() => setShowAddModal(!showAddModal)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                    + {t('settings.addInstance')}
                </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('settings.description')}
            </p>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-200">
                    {error}
                </div>
            )}

            {/* Formulário de Adição Rápida */}
            {showAddModal && (
                <form
                    action={async (formData: FormData) => {
                        await createInstance(formData);
                        setShowAddModal(false);
                    }}
                    className="bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-4"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="instance-name" className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                {t('settings.instName')}
                            </label>
                            <input
                                id="instance-name"
                                name="name"
                                placeholder={t('settings.instNamePlaceholder')}
                                className="w-full p-3 rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                required
                            />
                            <p className="text-[10px] text-slate-400 mt-2 font-medium">{t('settings.instNameDesc')}</p>
                        </div>
                        <div>
                            <label htmlFor="instance-id" className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                {t('settings.identifier')}
                            </label>
                            <input
                                id="instance-id"
                                name="instanceId"
                                placeholder={t('settings.identifierPlaceholder')}
                                className="w-full p-3 rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            <p className="text-[10px] text-slate-400 mt-2 font-medium">{t('settings.identifierDesc')}</p>
                        </div>
                        <div>
                            <label htmlFor="phone-number" className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                {t('settings.phone')}
                            </label>
                            <input
                                id="phone-number"
                                name="phoneNumber"
                                placeholder={t('settings.phonePlaceholder')}
                                className="w-full p-3 rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                            <p className="text-[10px] text-slate-400 mt-2 font-medium">{t('settings.phoneDesc')}</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowAddModal(false)}
                            className="px-6 py-2.5 text-slate-500 hover:text-slate-700 font-bold min-h-[44px]"
                        >
                            {t('settings.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 text-white px-8 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 font-bold shadow-lg shadow-blue-500/20 transition-all min-h-[44px]"
                        >
                            {isPending ? t('settings.saving') : t('settings.save')}
                        </button>
                    </div>
                </form>
            )}

            {/* Tabela de Vínculos com H2 Segmentado para GEO */}
            <section className="space-y-4" aria-labelledby="mapping-heading">
                <h2 id="mapping-heading" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {t('settings.deviceMapping')}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t('settings.deviceMappingDesc')}
                </p>

                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-black shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-zinc-900 text-gray-500 font-medium border-b border-gray-200 dark:border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">{t('settings.instTable.whatsapp')}</th>
                                <th className="px-6 py-4">{t('settings.instTable.phone')}</th>
                                <th className="px-6 py-4">{t('settings.instTable.evolutionId')}</th>
                                <th className="px-6 py-4">{t('settings.instTable.deviceLinked')}</th>
                                <th className="px-6 py-4 text-right">{t('settings.instTable.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {instances.map((inst: InstanceWithDevice) => (
                                <Fragment key={inst.id}>
                                    <tr className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">{inst.name}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {inst.phoneNumber || '-'}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{inst.instanceId}</td>
                                        <td className="px-6 py-4">
                                            {inst.device ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full w-fit">
                                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                                        {inst.device.name || inst.device.id}
                                                    </div>
                                                    <button
                                                        onClick={() => handleUnlink(inst.id)}
                                                        disabled={isPending}
                                                        className="text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-wider"
                                                        title={t('settings.instTable.unlink')}
                                                    >
                                                        [x]
                                                    </button>
                                                </div>
                                            ) : (
                                                <select
                                                    onChange={(e) => handleLink(inst.id, e.target.value)}
                                                    disabled={isPending}
                                                    className="text-xs p-1 rounded border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black w-full max-w-[150px]"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>{t('settings.instTable.selectAndroid')}</option>
                                                    {devices
                                                        .filter(d => !d.evolutionInstance || d.evolutionInstance.id === inst.id)
                                                        .map(d => (
                                                            <option key={d.id} value={d.id}>
                                                                {d.name || d.id}
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleProvision(inst.id)}
                                                    disabled={isPending}
                                                    className="text-xs font-bold text-blue-600 border border-blue-200 dark:border-blue-900/30 px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
                                                    title="Busca QR code e sincroniza Webhook"
                                                >
                                                    {t('settings.instTable.connectQR')}
                                                </button>
                                                <button
                                                    onClick={() => handleLogout(inst.id)}
                                                    disabled={isPending}
                                                    className="text-xs font-medium text-amber-600 border border-amber-200 dark:border-amber-900/30 px-3 py-1 rounded hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors"
                                                    title="Desconecta o WhatsApp"
                                                >
                                                    {t('settings.instTable.disconnect')}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(inst.id)}
                                                    disabled={isPending}
                                                    className="text-xs font-medium text-red-600 border border-red-200 dark:border-red-200 px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                                    title="Excluir do dashboard"
                                                >
                                                    {t('settings.instTable.delete')}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {(() => {
                                        const maybe = qrByInstanceId[inst.id];
                                        // Garante acesso seguro ao QR Code (pode ser objeto com qrcode.base64 ou string base64 direta)
                                        const qrcode = (maybe && typeof maybe === 'object' && 'qrcode' in maybe) ? (maybe as any).qrcode : maybe;
                                        const status = (maybe as any)?.status;

                                        if (status === 'open') {
                                            return (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-4 bg-green-50 dark:bg-green-900/10">
                                                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold">
                                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                                            CONECTADO: WhatsApp vinculado com sucesso à instância {inst.name}!
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        if (!qrcode || typeof qrcode !== 'object' || !('base64' in qrcode)) return null;

                                        const base64Content = qrcode.base64;
                                        return (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-4 bg-gray-50 dark:bg-zinc-900/30">
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                                            {t('settings.instTable.qrCodeFor')} <span className="font-semibold">{inst.name}</span>
                                                        </div>
                                                        <img
                                                            alt="QR Code"
                                                            className="w-44 h-44 bg-white p-2 rounded"
                                                            src={
                                                                String(base64Content).startsWith('data:')
                                                                    ? base64Content
                                                                    : `data:image/png;base64,${base64Content}`
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
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        {t('settings.instTable.noInstances')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
