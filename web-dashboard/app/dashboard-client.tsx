'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR as dateLocale } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, PieChart, Pie
} from 'recharts';
import {
    MessageSquare, Users, Send, PhoneCall, Clock,
    Settings, ChevronRight, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import { DashboardClientProps, MetricWithInstance } from '@/lib/types';
import { t } from '@/lib/i18n';

/**
 * Dashboard principal do sistema de monitoramento.
 * Exibe KPIs, gráficos de atividade e lista de instâncias.
 */
export default function DashboardClient({ initialData }: DashboardClientProps) {
    const [data] = useState(initialData);
    const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);

    // Dados reais vindos do servidor filtrados por instância se selecionado
    const selectedMetric = selectedInstanceId
        ? data.dailyMetrics.find((m: MetricWithInstance) => m.instanceId === selectedInstanceId)
        : null;

    const currentTotals = selectedMetric || data.totals;
    const currentChartData = selectedInstanceId
        ? (data.hourlyByInstance[selectedInstanceId] || Array.from({ length: 24 }, (_, i) => ({ name: `${String(i).padStart(2, '0')}:00`, msgs: 0, calls: 0 })))
        : data.hourlyActivity;

    const pieData = [
        { name: t('dashboard.sent'), value: currentTotals.messagesSent, color: '#10b981' },
        { name: t('dashboard.received'), value: currentTotals.messagesReceived, color: '#3b82f6' },
    ];

    const selectedInstanceName = selectedMetric?.instance?.name || t('dashboard.generalView');

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] p-6 md:p-10 font-sans text-slate-900 dark:text-slate-100">
            {/* SEO & GEO: Dados Estruturados Localizados */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": t('dashboard.title'),
                        "description": t('dashboard.subtitle'),
                        "mainEntity": {
                            "@type": "Dataset",
                            "name": "Estatísticas de Chamadas WhatsApp",
                            "description": "Dados agregados de atendimento e produtividade por instância."
                        }
                    })
                }}
            />

            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                            {t('dashboard.title')}
                        </h1>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            <Clock size={16} />
                            <span>{format(new Date(data.date), "EEEE, dd 'de' MMMM", { locale: dateLocale })}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3"
                    >
                        <Link
                            href="/crm"
                            className="group flex items-center gap-2 px-6 py-4 bg-teal-600 text-white border border-teal-500 rounded-full text-sm font-bold hover:bg-teal-700 transition-all shadow-md active:scale-95 min-h-[44px]"
                            aria-label="Abrir CRM"
                        >
                            <Users size={20} className="group-hover:scale-110 transition-transform" />
                            CRM (Vendas)
                        </Link>

                        <Link
                            href="/settings"
                            className="group flex items-center gap-2 px-6 py-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full text-sm font-bold hover:border-slate-400 dark:hover:border-zinc-600 transition-all shadow-md active:scale-95 min-h-[44px]"
                            aria-label={t('dashboard.settings')}
                        >
                            <Settings size={20} className="group-hover:rotate-45 transition-transform" />
                            {t('dashboard.settings')}
                        </Link>
                    </motion.div>
                </header>

                {/* KPI Grid - Visão Geral com H2 para GEO */}
                <section aria-labelledby="kpi-heading">
                    <h2 id="kpi-heading" className="sr-only">{t('dashboard.subtitle')}</h2>
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <KPICard
                            title={t('dashboard.activeConversations') + (selectedInstanceId ? ` - ${selectedInstanceName}` : '')}
                            value={currentTotals.activeConversations}
                            icon={<MessageSquare className="text-blue-500" />}
                            trend={selectedInstanceId ? null : "+12%"}
                            delay={0.1}
                        />
                        <KPICard
                            title={t('dashboard.newContacts')}
                            value={currentTotals.newContacts}
                            icon={<Users className="text-emerald-500" />}
                            trend={selectedInstanceId ? null : "+5%"}
                            delay={0.2}
                        />
                        <KPICard
                            title={t('dashboard.totalMessages')}
                            value={currentTotals.messagesSent + currentTotals.messagesReceived}
                            icon={<Send className="text-teal-500" />}
                            subtitle={t('dashboard.sentReceived', { sent: currentTotals.messagesSent, received: currentTotals.messagesReceived })}
                            delay={0.3}
                        />
                        <KPICard
                            title={t('dashboard.calls')}
                            value={currentTotals.callsMade}
                            icon={<PhoneCall className="text-orange-500" />}
                            subtitle={t('dashboard.minInCall', { min: Math.round(currentTotals.callDuration / 60) })}
                            delay={0.4}
                        />
                    </motion.div>
                </section>

                {/* Charts & Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Chart - Atividade por Hora */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold tracking-tight">
                                {t('dashboard.activity')} {selectedInstanceId ? `: ${selectedInstanceName}` : t('dashboard.byInstances')}
                            </h2>
                            {selectedInstanceId && (
                                <button
                                    onClick={() => setSelectedInstanceId(null)}
                                    className="text-xs font-bold text-blue-500 hover:text-blue-700 underline"
                                >
                                    {t('dashboard.generalView')}
                                </button>
                            )}
                            <div className="flex gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                                <span className="flex items-center gap-1.5"><div className="w-[8px] h-[8px] rounded-full bg-blue-500" /> {t('dashboard.messages')}</span>
                                <span className="flex items-center gap-1.5"><div className="w-[8px] h-[8px] rounded-full bg-orange-500" /> {t('dashboard.calls')}</span>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={currentChartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="msgs" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                                    <Bar dataKey="calls" fill="#f97316" radius={[4, 4, 0, 0]} barSize={10} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Side Distribution - Mix de Mensagens */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center justify-center"
                    >
                        <h2 className="text-lg font-bold mb-6 self-start">{t('dashboard.messageMix')}</h2>
                        <div className="h-[200px] w-full relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {pieData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={pieData[index].color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xs text-slate-400">{t('dashboard.total')}</span>
                                <span className="text-2xl font-black">{currentTotals.messagesSent + currentTotals.messagesReceived}</span>
                            </div>
                        </div>
                        <div className="w-full mt-6 space-y-3">
                            {pieData.map((item) => (
                                <div key={item.name} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: item.color }} /> {item.name}
                                    </span>
                                    <span className="font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Instance List Section - Relatório Sintético */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden"
                >
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold">{t('dashboard.reportBySeller')}</h2>
                        <button
                            className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all min-h-[44px] px-2"
                            aria-label={t('dashboard.viewAll')}
                        >
                            {t('dashboard.viewAll')} <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50/50 dark:bg-zinc-800/30">
                                    <th className="px-8 py-4">{t('dashboard.instance')}</th>
                                    <th className="px-8 py-4 text-center">{t('dashboard.active')}</th>
                                    <th className="px-8 py-4 text-center">{t('dashboard.new')}</th>
                                    <th className="px-8 py-4 text-center">{t('dashboard.whatsapp')}</th>
                                    <th className="px-8 py-4 text-center">{t('dashboard.calls')}</th>
                                    <th className="px-8 py-4 text-right">{t('dashboard.efficacy')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                <AnimatePresence>
                                    {data.dailyMetrics.map((metric: MetricWithInstance, idx: number) => (
                                        <motion.tr
                                            key={metric.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + (idx * 0.05) }}
                                            className={`group cursor-pointer transition-colors ${selectedInstanceId === metric.instanceId ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50 dark:hover:bg-zinc-800/20'}`}
                                            onClick={() => setSelectedInstanceId(selectedInstanceId === metric.instanceId ? null : metric.instanceId)}
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-[40px] h-[40px] rounded-2xl flex items-center justify-center font-bold transition-colors ${selectedInstanceId === metric.instanceId ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:bg-blue-500 group-hover:text-white'}`}>
                                                        {metric.instance.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white leading-tight">{metric.instance.name}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <p className="text-[10px] text-slate-400 font-mono bg-slate-100 dark:bg-zinc-800 px-1 rounded">{metric.instance.instanceId}</p>
                                                            {metric.instance.phoneNumber && (
                                                                <p className="text-[10px] text-blue-500 font-bold">{metric.instance.phoneNumber}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center font-bold text-lg">{metric.activeConversations}</td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-black">
                                                    {metric.newContacts}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <div className="flex flex-col items-center">
                                                        <ArrowUpRight size={12} className="text-emerald-500" />
                                                        <span className="font-bold">{metric.messagesSent}</span>
                                                    </div>
                                                    <div className="flex flex-col items-center">
                                                        <ArrowDownLeft size={12} className="text-blue-500" />
                                                        <span className="font-bold">{metric.messagesReceived}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="inline-flex items-center gap-1 shadow-inner bg-slate-50 dark:bg-zinc-800 px-3 py-1.5 rounded-2xl">
                                                    <span className="font-black text-orange-500">{metric.callsMade}</span>
                                                    <span className="text-[10px] text-slate-400">/</span>
                                                    <span className="font-medium text-slate-500">{formatDuration(metric.callDuration)}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="w-16 h-[6px] bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden ml-auto">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                                        style={{ width: `${Math.min(100, (metric.activeConversations / Math.max(1, (metric.messagesSent + metric.messagesReceived) / 10)) * 100)}%` }}
                                                    />
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {data.dailyMetrics.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-slate-400 italic font-medium">
                                            {t('dashboard.waitingData')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

interface KPICardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ReactNode;
    trend?: string | null;
    delay: number;
}

/**
 * Cartão de KPI com animação e design premium.
 */
function KPICard({ title, value, subtitle, icon, trend, delay }: KPICardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-zinc-900 px-8 py-10 rounded-[2.5rem] border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl transition-all relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-8 text-slate-50/50 dark:text-zinc-800/10 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{title}</p>
            <div className="flex items-end gap-3">
                <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">{value}</h3>
                {trend && (
                    <span className="mb-2 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black rounded-md">
                        {trend}
                    </span>
                )}
            </div>
            {subtitle && <p className="text-xs text-slate-400 mt-4 font-medium">{subtitle}</p>}
        </motion.div>
    );
}

/**
 * Formata segundos em string amigável de duração.
 */
function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
}
