'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Building2,
    Users,
    Zap,
    Plus,
    Trash2,
    ExternalLink,
    ShieldCheck,
    ArrowUpRight,
    TrendingUp,
    MoreVertical
} from 'lucide-react';
import { getMasterData, createCompanyWithAdminAction, deleteCompanyAction } from './actions';
import { logoutAction } from '../login/actions';
import { useRouter } from 'next/navigation';

export default function MasterDashboard() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        const res = await getMasterData();
        setData(res);
        setIsLoading(false);
    };

    const handleLogout = async () => {
        await logoutAction();
        router.push('/login');
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja remover esta empresa? Todos os dados vinculados serão APAGADOS.')) {
            await deleteCompanyAction(id);
            fetchData();
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium animate-pulse">Carregando Painel Master...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-10 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 w-fit border border-blue-100">
                            <ShieldCheck size={12} />
                            Master Control Center
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900">Olá, Lucas Master</h1>
                        <p className="text-slate-500 mt-1 font-medium">Gerencie seu ecossistema SaaS em tempo real.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            <Plus size={20} />
                            Nova Empresa
                        </button>
                        <button
                            onClick={handleLogout}
                            className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 rounded-2xl transition-all shadow-sm"
                        >
                            Sair
                        </button>
                    </div>
                </header>

                {/* Global Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Empresas Ativas"
                        value={data.stats.totalCompanies}
                        icon={<Building2 className="text-blue-500" />}
                        trend="+2 essa semana"
                    />
                    <StatCard
                        title="Usuários Totais"
                        value={data.stats.totalUsers}
                        icon={<Users className="text-emerald-500" />}
                        trend="+12%"
                    />
                    <StatCard
                        title="Instâncias WA"
                        value={data.stats.totalInstances}
                        icon={<Zap className="text-orange-500" />}
                        trend="Crescimento estável"
                    />
                    <StatCard
                        title="Msgs Processadas"
                        value={data.stats.totalMessages.toLocaleString()}
                        icon={<TrendingUp className="text-purple-500" />}
                        trend="Alta carga"
                    />
                </div>

                {/* Companies List */}
                <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-white">
                        <h2 className="text-xl font-bold text-slate-800">Clientes Ativos</h2>
                        <div className="flex items-center gap-4">
                            <div className="text-xs text-slate-400 font-medium">Buscando em {data.companies.length} registros</div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 bg-slate-50/50">
                                    <th className="px-8 py-4">Empresa / Identificador</th>
                                    <th className="px-8 py-4">Plano</th>
                                    <th className="px-8 py-4 text-center">Instâncias</th>
                                    <th className="px-8 py-4 text-center">Usuários</th>
                                    <th className="px-8 py-4">Data de Criação</th>
                                    <th className="px-8 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {data.companies.map((company: any) => (
                                    <tr key={company.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                                    {company.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{company.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{company.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${company.plan === 'MASTER' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                company.plan === 'GOLD' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                                    'bg-slate-100 text-slate-600 border border-slate-200'
                                                }`}>
                                                {company.plan}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className="font-bold text-slate-700">{company._count.instances} <span className="text-slate-300 font-medium text-xs">/ {company.maxInstances}</span></div>
                                        </td>
                                        <td className="px-8 py-5 text-center font-bold text-slate-700">
                                            {company._count.users}
                                        </td>
                                        <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                                            {new Date(company.createdAt).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
                                                    <ExternalLink size={18} />
                                                </button>
                                                {company.plan !== 'MASTER' && (
                                                    <button
                                                        onClick={() => handleDelete(company.id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* Modal Simples para Novo Client */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl"
                    >
                        <h3 className="text-2xl font-bold mb-6">Cadastrar Nova Empresa</h3>
                        <form action={async (formData) => {
                            const name = formData.get('name') as string;
                            const cnpj = formData.get('cnpj') as string;
                            const plan = formData.get('plan') as string;
                            const maxInstances = parseInt(formData.get('maxInstances') as string);
                            const adminEmail = formData.get('adminEmail') as string;
                            const adminName = formData.get('adminName') as string;
                            const adminPass = formData.get('adminPass') as string;

                            await createCompanyWithAdminAction({
                                name, cnpj, plan, maxInstances,
                                adminEmail, adminName, adminPass
                            });
                            setIsModalOpen(false);
                            fetchData();
                        }} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black uppercase text-slate-400 mb-1 block">Nome Comercial</label>
                                    <input name="name" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-black uppercase text-slate-400 mb-1 block">CNPJ (Opcional)</label>
                                    <input name="cnpj" placeholder="00.000.000/0001-00" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black uppercase text-slate-400 mb-1 block">Limite Instâncias</label>
                                    <input name="maxInstances" type="number" defaultValue="3" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-black uppercase text-slate-400 mb-1 block">Plano</label>
                                    <select name="plan" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm">
                                        <option value="BRONZE">Bronze</option>
                                        <option value="SILVER">Silver</option>
                                        <option value="GOLD">Gold</option>
                                    </select>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 my-4" />
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Credenciais Administrativas</p>

                            <div>
                                <label className="text-xs font-black uppercase text-slate-400 mb-1 block">Nome do Admin</label>
                                <input name="adminName" required placeholder="Ex: Gestor Acme" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black uppercase text-slate-400 mb-1 block">E-mail de Acesso</label>
                                    <input name="adminEmail" type="email" required placeholder="admin@empresa.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-black uppercase text-slate-400 mb-1 block">Senha Provisória</label>
                                    <input name="adminPass" type="password" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-sm" />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all">Cancelar</button>
                                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">Ativar Onboarding</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, icon, trend }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-2xl">
                    {icon}
                </div>
                <div className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ArrowUpRight size={10} />
                    {trend}
                </div>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-400 mb-1">{title}</p>
            <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        </motion.div>
    );
}
