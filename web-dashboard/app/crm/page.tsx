import { getCRMData } from '../crm-actions';
import CRMClient from './crm-client';

export const dynamic = 'force-dynamic';

export default async function CRMPage() {
    const data = await getCRMData();

    return (
        <main className="min-h-screen bg-slate-50">
            <CRMClient initialData={data} />
        </main>
    );
}
