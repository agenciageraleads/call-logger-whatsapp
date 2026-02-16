'use client'

import React, { useState } from 'react';
import { CRMData, LeadWithContact, LeadStatus } from '@/lib/types';
import { updateLeadStatusAction, addNote, updateLeadValueAction, toggleIgnoreContactAction } from '../crm-actions';
import {
    Users,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Clock,
    Search,
    Plus,
    MoreHorizontal,
    Phone,
    User,
    ArrowLeft,
    DollarSign,
    Trash2,
    ShieldOff
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

interface CRMClientProps {
    initialData: CRMData;
}

const STATUS_COLUMNS: { id: LeadStatus; label: string; icon: any; color: string }[] = [
    { id: 'NOVO', label: 'Novo Lead', icon: Users, color: 'bg-blue-500' },
    { id: 'ATENDIMENTO', label: 'Em Atendimento', icon: MessageSquare, color: 'bg-yellow-500' },
    { id: 'FECHADO', label: 'Venda Fechada', icon: CheckCircle2, color: 'bg-emerald-500' },
    { id: 'PERDIDO', label: 'Lead Perdido', icon: XCircle, color: 'bg-slate-500' },
];

export default function CRMClient({ initialData }: CRMClientProps) {
    const [leads, setLeads] = useState<LeadWithContact[]>(initialData.leads);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const filteredLeads = leads.filter(lead =>
        (lead.contact.jid.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.contextSummary?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleMoveLead = async (leadId: string, newStatus: LeadStatus) => {
        setIsUpdating(true);
        try {
            await updateLeadStatusAction(leadId, newStatus);
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        } catch (error) {
            console.error('Erro ao mover lead:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdateValue = async (leadId: string, value: number) => {
        try {
            await updateLeadValueAction(leadId, value);
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, value } : l));
        } catch (error) {
            console.error('Erro ao atualizar valor:', error);
        }
    };

    const handleIgnoreContact = async (jid: string) => {
        if (!confirm('Deseja ignorar este contato em todas as instâncias? Ele será removido do CRM.')) return;

        try {
            await toggleIgnoreContactAction(jid, true);
            setLeads(prev => prev.filter(l => l.contact.jid !== jid));
        } catch (error) {
            console.error('Erro ao ignorar contato:', error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-white rounded-full transition-colors border">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestão de Leads (CRM)</h1>
                        <p className="text-slate-500 text-sm">Acompanhe a vida dos seus leads de forma automatizada</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Plus className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Pipeline Aberto</p>
                            <p className="text-sm font-black text-slate-900">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(initialData.financialMetrics.pipelineTotal)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-400">Vendas Fechadas</p>
                            <p className="text-sm font-black text-slate-900">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(initialData.financialMetrics.revenueTotal)}
                            </p>
                        </div>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar JID ou resumo..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
                {STATUS_COLUMNS.map(col => (
                    <div key={col.id} className="flex flex-col gap-4 min-w-[280px]">
                        <div className="flex flex-col gap-2 px-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${col.color}`} />
                                    <h2 className="font-semibold text-slate-700">{col.label}</h2>
                                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                                        {filteredLeads.filter(l => l.status === col.id).length}
                                    </span>
                                </div>
                            </div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Total: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                                    filteredLeads.filter(l => l.status === col.id).reduce((acc, curr) => acc + (curr.value || 0), 0)
                                )}
                            </div>
                        </div>

                        <div className="flex-1 space-y-3 p-3 bg-slate-100/50 rounded-xl min-h-[500px] border border-dashed border-slate-300">
                            {filteredLeads.filter(l => l.status === col.id).map(lead => (
                                <div
                                    key={lead.id}
                                    className="group relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-default"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                <User className="w-4 h-4 text-slate-500" />
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-xs font-mono text-slate-500 truncate w-32">{lead.contact.jid}</span>
                                                <span className="text-xs text-slate-400">{lead.contact.instance.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() => handleIgnoreContact(lead.contact.jid)}
                                                className="p-1 text-slate-300 hover:text-red-500 rounded-md hover:bg-red-50 transition-all"
                                                title="Ignorar Contato Globalmente"
                                            >
                                                <ShieldOff className="w-3.5 h-3.5" />
                                            </button>
                                            <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Campo de Valor */}
                                    <div className="relative mb-3 group/value">
                                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400 pointer-events-none">
                                            <span className="text-[10px] font-bold">R$</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="w-full pl-8 pr-2 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-500 transition-all placeholder:text-slate-300"
                                            placeholder="0,00"
                                            value={lead.value || ''}
                                            onChange={(e) => handleUpdateValue(lead.id, parseFloat(e.target.value) || 0)}
                                        />
                                    </div>

                                    {lead.contextSummary && (
                                        <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-lg mb-3 italic">
                                            "{lead.contextSummary}"
                                        </p>
                                    )}

                                    {/* Notas Detalhadas */}
                                    {lead.notes.length > 0 && (
                                        <div className="mb-3 space-y-1">
                                            {lead.notes.slice(-2).map(note => (
                                                <div key={note.id} className="text-[10px] text-slate-500 border-l-2 border-slate-200 pl-2">
                                                    {note.content}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                            <Clock className="w-3 h-3" />
                                            {formatDistanceToNow(new Date(lead.lastInteraction), { addSuffix: true, locale: ptBR })}
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    const content = prompt('Nova nota:');
                                                    if (content) addNote(lead.id, content).then(() => window.location.reload());
                                                }}
                                                className="p-1.5 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                                title="Adicionar Nota"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                            {STATUS_COLUMNS.filter(c => c.id !== lead.status).map(targetCol => (
                                                <button
                                                    key={targetCol.id}
                                                    onClick={() => handleMoveLead(lead.id, targetCol.id)}
                                                    className={`p-1.5 rounded-md hover:scale-110 transition-transform ${targetCol.color} text-white`}
                                                    title={`Mover para ${targetCol.label}`}
                                                    disabled={isUpdating}
                                                >
                                                    <targetCol.icon className="w-3 h-3" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredLeads.filter(l => l.status === col.id).length === 0 && (
                                <div className="flex flex-col items-center justify-center h-24 text-slate-400 opacity-50">
                                    <p className="text-xs">Vazio</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
