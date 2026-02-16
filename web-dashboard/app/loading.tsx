import { t } from '@/lib/i18n';

export default function Loading() {
    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] p-6 md:p-10 animate-pulse">
            <h1 className="sr-only">{t('common.loading')}</h1>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-3">
                        <div className="h-[40px] w-48 bg-slate-200 dark:bg-zinc-800 rounded-lg"></div>
                        <div className="h-[16px] w-32 bg-slate-100 dark:bg-zinc-800/50 rounded"></div>
                    </div>
                    <div className="h-12 w-44 bg-slate-200 dark:bg-zinc-800 rounded-full"></div>
                </div>

                {/* KPI Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-44 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800"></div>
                    ))}
                </div>

                {/* Charts Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-[450px] bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800"></div>
                    <div className="h-[450px] bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800"></div>
                </div>

                {/* Table Skeleton */}
                <div className="h-96 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-100 dark:border-zinc-800"></div>
            </div>
        </div>
    );
}
