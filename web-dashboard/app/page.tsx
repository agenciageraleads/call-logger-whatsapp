import { getDashboardData } from './dashboard-actions';
import DashboardClient from './dashboard-client';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Home() {
  const data = await getDashboardData();

  return (
    <main>
      <DashboardClient initialData={data} />
    </main>
  );
}
