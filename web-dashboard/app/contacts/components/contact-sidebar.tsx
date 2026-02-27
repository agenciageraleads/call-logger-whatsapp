'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { X, User, Phone, MessageSquare, Clock, ShieldOff, DollarSign, Plus, Paperclip, ExternalLink, Calendar } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getContactDetailsAction } from '../actions';
import { addNote, updateLeadStatusAction, updateLeadValueAction } from '../../crm-actions';

interface ContactSidebarProps {
    contactId: string | null;
    onClose: () => void;
}

export default function ContactSidebar({ contactId, onClose }: ContactSidebarProps) {
    const [contact, setContact] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [newNote, setNewNote] = useState('');
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (contactId) {
            fetchDetails();
        } else {
            setContact(null);
        }
    }, [contactId]);

    const fetchDetails = async () => {
        setLoading(true);
        const res = await getContactDetailsAction(contactId!);
        if (res.success) {
            setContact(res.contact);
        }
        setLoading(false);
    };

    const handleAddNote = async () => {
        if (!newNote.trim() || !contact?.lead?.id) return;
        startTransition(async () => {
            const res = await addNote(contact.lead.id, newNote);
            if (res.success) {
                setNewNote('');
                fetchDetails(); // Recarrega para ver a nota nova
            }
        });
    };

    const handleUpdateStatus = async (status: string) => {
        if (!contact?.lead?.id) return;
        startTransition(async () => {
            await updateLeadStatusAction(contact.lead.id, status as any);
            fetchDetails();
        });
    };

    if (!contactId) return null;

    return (
        <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white dark:bg-zinc-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 dark:border-zinc-800 ${contactId ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 dark:border-zinc-900 flex justify-between items-center bg-white dark:bg-zinc-950 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg uppercase">
                            {contact?.pushName ? contact.pushName.charAt(0) : <User className="w-5 h-5" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">
                                {contact?.pushName || 'Contato'}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-mono">{contact?.jid}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            {/* Status and Value Section */}
                            <section className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estágio Atual</label>
                                        <select
                                            disabled={isPending}
                                            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            value={contact?.lead?.status || 'NOVO'}
                                            onChange={(e) => handleUpdateStatus(e.target.value)}
                                        >
                                            <option value="NOVO">Novo Lead</option>
                                            <option value="ATENDIMENTO">Em Atendimento</option>
                                            <option value="FECHADO">Venda Fechada</option>
                                            <option value="PERDIDO">Lead Perdido</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Estimado</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                                            <input
                                                type="text"
                                                readOnly
                                                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm font-black text-emerald-600 dark:text-emerald-400"
                                                value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(contact?.lead?.value || 0)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Summary / AI Insights */}
                            <section className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <MessageSquare size={14} />
                                    <span>Resumo de Contexto (IA)</span>
                                </div>
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl italic text-sm text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
                                    "{contact?.lead?.contextSummary || 'Nenhum contexto capturado ainda através das mensagens.'}"
                                </div>
                            </section>

                            {/* Notes Section */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-900 pb-2">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Paperclip size={14} />
                                        <span>Anotações do Vendedor</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <textarea
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        placeholder="Digite uma nova anotação aqui..."
                                        className="w-full p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-none"
                                    />
                                    <button
                                        onClick={handleAddNote}
                                        disabled={isPending || !newNote.trim()}
                                        className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {contact?.lead?.notes?.map((note: any) => (
                                        <div key={note.id} className="p-4 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl shadow-sm text-sm">
                                            <p className="text-slate-700 dark:text-slate-300">{note.content}</p>
                                            <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-medium italic">
                                                <Calendar size={10} />
                                                {format(new Date(note.createdAt), 'dd MMM yyyy, HH:mm', { locale: ptBR })}
                                            </div>
                                        </div>
                                    ))}
                                    {(!contact?.lead?.notes || contact.lead.notes.length === 0) && (
                                        <p className="text-center text-xs text-slate-400 py-4 opacity-60">Nenhuma nota registrada.</p>
                                    )}
                                </div>
                            </section>

                            {/* History Snippet */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <Clock size={14} />
                                    <span>Últimas Mensagens</span>
                                </div>
                                <div className="space-y-2 border-l-2 border-slate-100 dark:border-zinc-900 ml-2 pl-4">
                                    {contact?.lead?.messages?.slice(0, 5).map((msg: any) => (
                                        <div key={msg.id} className="text-xs">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`font-bold ${msg.fromMe ? 'text-blue-500' : 'text-slate-500'}`}>
                                                    {msg.fromMe ? 'Vendedor' : (contact.pushName || 'Lead')}
                                                </span>
                                                <span className="text-[10px] text-slate-300">
                                                    {format(new Date(msg.createdAt), 'HH:mm')}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-zinc-900/50 p-2 rounded-lg">
                                                {msg.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Footer / Meta */}
                            <footer className="pt-8 border-t border-slate-100 dark:border-zinc-900 space-y-2">
                                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                    <span>Instância</span>
                                    <span className="text-slate-600 dark:text-slate-300">{contact?.instance?.name}</span>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                    <span>Primeiro Contato</span>
                                    <span className="text-slate-600 dark:text-slate-300">{format(new Date(contact?.firstSeen || Date.now()), 'dd/MM/yyyy HH:mm')}</span>
                                </div>
                            </footer>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
