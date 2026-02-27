// i18n.locale: pt-BR
import { Metadata } from 'next';
import ContactsClient from './contacts-client';

export const metadata: Metadata = {
    title: 'Contatos | CRM WhatsApp',
    description: 'Gestão centralizada de contatos e histórico de leads.',
};

export default function ContactsPage() {
    return <ContactsClient />;
}
