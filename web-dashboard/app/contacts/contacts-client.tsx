'use client';

import React, { useState, useEffect, useTransition } from 'react';
import {
    Users, Search, Filter, Download, Upload,
    MoreHorizontal, ChevronLeft, ChevronRight,
    ArrowLeft, User, Phone, CheckCircle2, MessageSquare,
    Clock, RefreshCcw
} from 'lucide-react';
import Link from 'next/link';
import { getContactsAction } from './actions';
import ContactSidebar from './components/contact-sidebar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ContactsClient() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        fetchContacts();
    }, [page, searchTerm]);

    const fetchContacts = async () => {
        setLoading(true);
        const res = await getContactsAction({
            page,
            pageSize: 15,
            search: searchTerm
        });
        if (res.success) {
            setContacts(res.contacts || []);
            setTotal(res.total || 0);
            setTotalPages(res.totalPages || 1);
        }
        setLoading(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchContacts();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'FECHADO': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            case 'ATENDIMENTO': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'PERDIDO': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400';
            default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
            {/* Header / Nav */}
            <header className="p-6 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors border border-slate-200 dark:border-zinc-800">
                        <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Users size={24} className="text-blue-500" />
                            Contatos
                        </h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{total} Clientes no Banco</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    {/* Search Field */}
                    <form onSubmit={handleSearch} className="relative flex-1 md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome ou número..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>

                    <button className="p-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all text-slate-600 dark:text-slate-400">
                        <Filter size={18} />
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200 dark:bg-zinc-800 mx-2 hidden md:block" />

                    <button
                        onClick={() => alert('Em breve: Importação de CSV')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
                    >
                        <Upload size={16} />
                        <span className="hidden sm:inline">Importar</span>
                    </button>

                    <button
                        onClick={() => alert('Em breve: Exportação de CSV')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Download size={16} />
                        <span className="hidden sm:inline">Exportar</span>
                    </button>

                    <button
                        onClick={() => fetchContacts()}
                        className={`p-2.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all ${loading ? 'animate-spin' : ''}`}
                    >
                        <RefreshCcw size={18} className="text-slate-400" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-zinc-950 rounded-[2rem] border border-slate-200 dark:border-zinc-900 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-zinc-900/50 text-[10px] uppercase font-black tracking-widest text-slate-400 border-b border-slate-100 dark:border-zinc-900">
                                    <th className="px-8 py-5">Nome / Contato</th>
                                    <th className="px-8 py-5 hidden md:table-cell">WhatsApp JID</th>
                                    <th className="px-8 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-center hidden sm:table-cell">Vendedor / Instância</th>
                                    <th className="px-8 py-5 text-right">Data Inclusão</th>
                                    <th className="px-8 py-5"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-zinc-900">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td className="px-8 py-5"><div className="h-10 w-40 bg-slate-100 dark:bg-zinc-900 rounded-lg"></div></td>
                                            <td className="px-8 py-5"><div className="h-6 w-32 bg-slate-100 dark:bg-zinc-900 rounded-lg"></div></td>
                                            <td className="px-8 py-5"><div className="h-6 w-20 mx-auto bg-slate-100 dark:bg-zinc-900 rounded-full"></div></td>
                                            <td className="px-8 py-5"><div className="h-6 w-24 mx-auto bg-slate-100 dark:bg-zinc-900 rounded-lg"></div></td>
                                            <td className="px-8 py-5"><div className="h-6 w-24 ml-auto bg-slate-100 dark:bg-zinc-900 rounded-lg"></div></td>
                                            <td className="px-8 py-5"></td>
                                        </tr>
                                    ))
                                ) : (
                                    contacts.map((contact) => (
                                        <tr
                                            key={contact.id}
                                            onClick={() => setSelectedContactId(contact.id)}
                                            className="group hover:bg-blue-50/30 dark:hover:bg-zinc-900/50 transition-all cursor-pointer"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600 flex items-center justify-center font-bold text-sm uppercase group-hover:bg-blue-500 group-hover:text-white transition-all">
                                                        {contact.pushName ? contact.pushName.charAt(0) : <User size={18} />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                                            {contact.pushName || 'Contato'}
                                                        </p>
                                                        <p className="text-[10px] text-slate-400 font-medium">Ver Detalhes</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 hidden md:table-cell font-mono text-xs text-slate-500">
                                                {contact.jid}
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${getStatusColor(contact.lead?.status)}`}>
                                                    {contact.lead?.status || 'NOVO'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center hidden sm:table-cell">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                        {contact.instance?.name || '-'}
                                                    </span>
                                                    <span className="text-[9px] text-slate-400 font-mono opacity-60">
                                                        #{contact.instance?.instanceId}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right text-xs text-slate-500 font-medium">
                                                {format(new Date(contact.firstSeen), 'dd/MM/yyyy', { locale: ptBR })}
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2 text-slate-300 hover:text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all focus:outline-none">
                                                    <ChevronRight size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                {!loading && contacts.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                                            Nenhum contato encontrado para os termos buscados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Footer */}
                        <div className="px-8 py-6 bg-slate-50/30 dark:bg-zinc-900/10 border-t border-slate-100 dark:border-zinc-900 flex justify-between items-center">
                            <p className="text-xs text-slate-400 font-medium italic">
                                Mostrando {contacts.length} de {total} contatos.
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                    disabled={page === 1 || loading}
                                    className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex items-center gap-1.5 px-3">
                                    <span className="text-sm font-black text-blue-600">{page}</span>
                                    <span className="text-xs text-slate-300">/</span>
                                    <span className="text-sm font-bold text-slate-500">{totalPages}</span>
                                </div>
                                <button
                                    onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={page === totalPages || loading}
                                    className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Slide-over Detail Sidebar */}
            <ContactSidebar
                contactId={selectedContactId}
                onClose={() => setSelectedContactId(null)}
            />

            {/* Overlay background when sidebar is open (Mobile) */}
            {selectedContactId && (
                <div
                    onClick={() => setSelectedContactId(null)}
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 transition-opacity md:hidden"
                />
            )}
        </div>
    );
}
