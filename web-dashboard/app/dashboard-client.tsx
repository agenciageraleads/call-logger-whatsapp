'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, PieChart, Pie
} from 'recharts';
import {
    MessageSquare, Users, Send, PhoneCall, Clock,
    Settings, ChevronRight, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';

export default function DashboardClient({ initialData }: { initialData: any }) {
    const [data] = useState(initialData);

    // Mock data para o gráfico (enquanto não temos histórico)
    const chartData = [
        { name: '08:00', msgs: 12, calls: 2 },
        { name: '10:00', msgs: 45, calls: 5 },
        { name: '12:00', msgs: 30, calls: 1 },
        { name: '14:00', msgs: 65, calls: 8 },
        { name: '16:00', msgs: 82, calls: 12 },
        { name: '18:00', msgs: 40, calls: 4 },
    ];

    const pieData = [
        { name: 'Enviadas', value: data.totals.messagesSent, color: '#10b981' },
        { name: 'Recebidas', value: data.totals.messagesReceived, color: '#3b82f6' },
    ];

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] p-6 md:p-10 font-sans text-slate-900 dark:text-slate-100">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                            Insight Hub
                        </h1>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            <Clock size={16} />
                            <span>{format(new Date(data.date), "EEEE, dd 'de' MMMM", { locale: ptBR })}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3"
                    >
                        <Link
                            href="/settings"
                            className="group flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full text-sm font-semibold hover:border-slate-400 dark:hover:border-zinc-600 transition-all shadow-sm"
                        >
                            <Settings size={18} className="group-hover:rotate-45 transition-transform" />
                            Configurações
                        </Link>
                    </motion.div>
                </header>

                {/* KPI Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <KPICard
                        title="Conversas Ativas"
                        value={data.totals.activeConversations}
                        icon={<MessageSquare className="text-blue-500" />}
                        trend="+12%"
                        delay={0.1}
                    />
                    <KPICard
                        title="Novos Contatos"
                        value={data.totals.newContacts}
                        icon={<Users className="text-emerald-500" />}
                        trend="+5%"
                        delay={0.2}
                    />
                    <KPICard
                        title="Mensagens Totais"
                        value={data.totals.messagesSent + data.totals.messagesReceived}
                        icon={<Send className="text-violet-500" />}
                        subtitle={`${data.totals.messagesSent} env / ${data.totals.messagesReceived} rec`}
                        delay={0.3}
                    />
                    <KPICard
                        title="Ligações"
                        value={data.totals.callsMade}
                        icon={<PhoneCall className="text-orange-500" />}
                        subtitle={`${Math.round(data.totals.callDuration / 60)} min em chamada`}
                        delay={0.4}
                    />
                </motion.div>

                {/* Charts & Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold tracking-tight">Atividade nas Instâncias</h3>
                            <div className="flex gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Mensagens</span>
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500" /> Ligações</span>
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
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

                    {/* Side Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center justify-center"
                    >
                        <h3 className="text-lg font-bold mb-6 self-start">Mix de Mensagens</h3>
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
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-xs text-slate-400">Total</span>
                                <span className="text-2xl font-black">{data.totals.messagesSent + data.totals.messagesReceived}</span>
                            </div>
                        </div>
                        <div className="w-full mt-6 space-y-3">
                            {pieData.map((item) => (
                                <div key={item.name} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500 font-medium flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} /> {item.name}
                                    </span>
                                    <span className="font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Instance List Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 overflow-hidden"
                >
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Relatório Individual</h2>
                        <button className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            Ver Todos <ChevronRight size={16} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-50/50 dark:bg-zinc-800/30">
                                    <th className="px-8 py-4">Instância</th>
                                    <th className="px-8 py-4 text-center">Conv. Ativas</th>
                                    <th className="px-8 py-4 text-center">Novos</th>
                                    <th className="px-8 py-4 text-center">WhatsApp</th>
                                    <th className="px-8 py-4 text-center">Chamadas</th>
                                    <th className="px-8 py-4 text-right">Eficácia</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                <AnimatePresence>
                                    {data.dailyMetrics.map((metric: any, idx: number) => (
                                        <motion.tr
                                            key={metric.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 + (idx * 0.05) }}
                                            className="group hover:bg-slate-50 dark:hover:bg-zinc-800/20 transition-colors"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                        {metric.instance.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white leading-tight">{metric.instance.name}</p>
                                                        <p className="text-xs text-slate-400 font-mono mt-0.5">{metric.instance.instanceId}</p>
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
                                                <div className="w-16 h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden ml-auto">
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
                                            Aguardando fluxo de dados para hoje...
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

function KPICard({ title, value, subtitle, icon, trend, delay }: any) {
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

function formatDuration(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
}
