'use client'

import React, { useState } from 'react';
import { CRMData, LeadWithContact } from '@/lib/types';
import { LeadStatus } from '@/lib/interpreter';
import { updateLeadStatusAction, addNote, updateLeadValueAction, toggleIgnoreContactAction, updateLeadDetailsAction, uploadAttachmentAction } from '../crm-actions';
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
    ShieldOff,
    X,
    Upload,
    Paperclip,
    Pencil,
    LogOut
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/login/actions';

interface CRMClientProps {
    initialData: CRMData;
    insights: {
        averageResponseTimeMinutes: number;
    }
}

const STATUS_COLUMNS: { id: LeadStatus; label: string; icon: any; color: string }[] = [
    { id: 'NOVO', label: 'Novo Lead', icon: Users, color: 'bg-blue-500' },
    { id: 'ATENDIMENTO', label: 'Em Atendimento', icon: MessageSquare, color: 'bg-yellow-500' },
    { id: 'FECHADO', label: 'Venda Fechada', icon: CheckCircle2, color: 'bg-emerald-500' },
    { id: 'PERDIDO', label: 'Lead Perdido', icon: XCircle, color: 'bg-slate-500' },
];

export default function CRMClient({ initialData, insights }: CRMClientProps) {
    const [leads, setLeads] = useState<LeadWithContact[]>(initialData.leads);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedLead, setSelectedLead] = useState<LeadWithContact | null>(null);
    const router = useRouter();

    const handleLogout = async () => {
        await logoutAction();
        router.push('/login');
    };

    const filteredLeads = leads.filter(lead =>
        (lead.contact.pushName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.contact.jid.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.contextSummary?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleMoveLead = async (leadId: string, newStatus: LeadStatus) => {
        setIsUpdating(true);
        try {
            await updateLeadStatusAction(leadId, newStatus);
            setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
            if (selectedLead?.id === leadId) {
                setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
            }
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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !selectedLead) return;
        const file = e.target.files[0];

        // Convert to Base64 for simplicity in local DB
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64String = reader.result as string;
            try {
                await uploadAttachmentAction(selectedLead.id, {
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                    fileUrl: base64String
                });

                // Refresh local state 
                const newAttachment = {
                    id: Date.now().toString(),
                    leadId: selectedLead.id,
                    contactId: null,
                    fileName: file.name,
                    fileUrl: base64String,
                    fileType: file.type,
                    fileSize: file.size,
                    createdAt: new Date()
                };

                const updatedLead = {
                    ...selectedLead,
                    attachments: [...(selectedLead.attachments || []), newAttachment]
                } as LeadWithContact;

                setSelectedLead(updatedLead);
                setLeads(prev => prev.map(l => l.id === selectedLead.id ? updatedLead : l));
            } catch (error) {
                console.error("Erro no upload", error);
            }
        };
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
                        <p className="text-slate-500 text-sm">SLA Médio de Resposta Local: <strong>{insights.averageResponseTimeMinutes} min</strong></p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="group flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-all shadow-sm active:scale-95"
                        aria-label="Sair"
                    >
                        <LogOut size={16} />
                        <span className="hidden md:inline">Sair</span>
                    </button>

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
                            placeholder="Buscar nome, JID ou resumo..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4">
                {STATUS_COLUMNS.map(col => (
                    <div
                        key={col.id}
                        className="flex flex-col gap-4 min-w-[280px]"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const leadId = e.dataTransfer.getData('leadId');
                            if (leadId) handleMoveLead(leadId, col.id);
                        }}
                    >
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
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData('leadId', lead.id);
                                    }}
                                    onClick={() => setSelectedLead(lead)}
                                    className="group relative bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                                                {lead.contact.pushName ? lead.contact.pushName.charAt(0) : <User className="w-4 h-4" />}
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className="text-sm font-semibold text-slate-700 truncate w-32">
                                                    {lead.contact.pushName || lead.contact.jid.split('@')[0]}
                                                </span>
                                                <span className="text-[10px] text-slate-400">{lead.contact.instance.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                            {/* Tag de Ociosidade */}
                                            {lead.messages && lead.messages.length > 0 && !lead.messages[0].fromMe && col.id !== 'FECHADO' && col.id !== 'PERDIDO' && (
                                                <span className="text-[9px] font-bold bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded uppercase animate-pulse">
                                                    Ag. Resposta
                                                </span>
                                            )}
                                            <button
                                                onClick={() => handleIgnoreContact(lead.contact.jid)}
                                                className="p-1 text-slate-300 hover:text-red-500 rounded-md hover:bg-red-50 transition-all"
                                                title="Ignorar Contato Globalmente"
                                            >
                                                <ShieldOff className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Campo de Valor */}
                                    <div className="relative mb-3 group/value" onClick={(e) => e.stopPropagation()}>
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

                                    {lead.contextSummary && lead.contextSummary !== 'Inconclusivo via Regex' && (
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
                                        {lead.attachments?.length > 0 && (
                                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                                                <Paperclip className="w-3 h-3" />
                                                {lead.attachments.length}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {filteredLeads.filter(l => l.status === col.id).length === 0 && (
                                <div className="flex flex-col items-center justify-center h-24 text-slate-400 opacity-50 border-2 border-dashed border-slate-200 rounded-xl">
                                    <p className="text-xs">Solte aqui ou Vazio</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Detalhes do Lead */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col pt-0">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg uppercase">
                                    {selectedLead.contact.pushName ? selectedLead.contact.pushName.charAt(0) : <User className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 leading-tight">
                                        {selectedLead.contact.pushName || 'Contato Desconhecido'}
                                    </h3>
                                    <p className="text-xs text-slate-500 font-mono">{selectedLead.contact.jid.split('@')[0]}</p>
                                </div>
                            </div>
                            <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-slate-100 text-slate-500 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Bloco de Valor e Status */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Valor (R$)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500"
                                        value={selectedLead.value}
                                        onChange={(e) => handleUpdateValue(selectedLead.id, parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Estágio</label>
                                    <select
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500"
                                        value={selectedLead.status}
                                        onChange={(e) => handleMoveLead(selectedLead.id, e.target.value as LeadStatus)}
                                    >
                                        {STATUS_COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Resumo de Contexto */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
                                    Resumo da IA
                                    <button
                                        onClick={async () => {
                                            const newSum = prompt("Editar resumo:", selectedLead.contextSummary || '');
                                            if (newSum !== null && newSum !== selectedLead.contextSummary) {
                                                await updateLeadDetailsAction(selectedLead.id, { contextSummary: newSum });
                                                const updated = { ...selectedLead, contextSummary: newSum } as LeadWithContact;
                                                setSelectedLead(updated);
                                                setLeads(prev => prev.map(l => l.id === selectedLead.id ? updated : l));
                                            }
                                        }}
                                        className="text-blue-500 flex items-center gap-1 hover:underline"
                                    >
                                        <Pencil className="w-3 h-3" /> Editar
                                    </button>
                                </label>
                                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg min-h-[40px] italic">
                                    {selectedLead.contextSummary || 'Nenhum contexto capturado.'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                                {/* Anexos */}
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between border-b pb-2">
                                        <span>Planilhas / Orçamentos</span>
                                        <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 transition-colors">
                                            <Upload className="w-3 h-3" />
                                            Subir Arquivo
                                            <input type="file" className="hidden" onChange={handleFileUpload} />
                                        </label>
                                    </label>
                                    {selectedLead.attachments && selectedLead.attachments.length > 0 ? (
                                        <ul className="space-y-2">
                                            {selectedLead.attachments.map(att => (
                                                <li key={att.id} className="flex items-center gap-3 p-2 border border-slate-100 rounded-lg hover:bg-slate-50">
                                                    <div className="p-2 bg-slate-100 text-slate-500 rounded-md">
                                                        <Paperclip className="w-4 h-4" />
                                                    </div>
                                                    <div className="flex flex-col flex-1 overflow-hidden">
                                                        <a href={att.fileUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline truncate" title={att.fileName}>
                                                            {att.fileName}
                                                        </a>
                                                        <span className="text-[10px] text-slate-400 capitalize">{att.fileType || 'Arquivo'}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-lg dashed border border-slate-200">
                                            Nenhum anexo salvo para este lead.
                                        </p>
                                    )}
                                </div>

                                {/* Notas Rápidas */}
                                <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 h-full">
                                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center justify-between border-b pb-2">
                                        <span>Anotações Extras</span>
                                        <button
                                            onClick={() => {
                                                const content = prompt('Nova nota:');
                                                if (content) {
                                                    addNote(selectedLead.id, content).then(() => {
                                                        const newNote = { id: Date.now().toString(), leadId: selectedLead.id, content, createdAt: new Date() };
                                                        const updated = { ...selectedLead, notes: [...selectedLead.notes, newNote] } as LeadWithContact;
                                                        setSelectedLead(updated);
                                                        setLeads(prev => prev.map(l => l.id === selectedLead.id ? updated : l));
                                                    });
                                                }
                                            }}
                                            className="text-blue-500 flex items-center gap-1 text-xs font-bold hover:underline"
                                        >
                                            <Plus className="w-3 h-3" /> Adicionar
                                        </button>
                                    </label>
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                        {selectedLead.notes && selectedLead.notes.length > 0 ? (
                                            selectedLead.notes.map(note => (
                                                <div key={note.id} className="p-3 bg-yellow-50 text-slate-700 text-sm rounded-lg border border-yellow-100">
                                                    {note.content}
                                                    <div className="text-[10px] text-yellow-600/60 mt-1 font-medium italic">
                                                        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true, locale: ptBR })}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-400 text-center py-4">Nenhuma nota adicionada.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
