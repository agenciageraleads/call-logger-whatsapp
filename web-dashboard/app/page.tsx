'use client';

import { useEffect, useState } from 'react';

type CallLog = {
  id: string;
  person: string;
  duration: number;
  type: string;
  status: string;
  timestamp: string;
  device: {
    id: string;
    name: string | null;
  };
};

export default function Home() {
  const [logs, setLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error('Failed to fetch logs', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000); // Auto refresh every 5s
    return () => clearInterval(interval);
  }, []);

  // Agrupar por dispositivo
  const devices = Array.from(new Set(logs.map(l => l.device.id)));

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">WhatsApp Call Monitor</h1>
            <p className="text-gray-500">Painel de Controle Centralizado</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <span className="text-sm text-gray-500">Dispositivos Ativos:</span>
            <span className="ml-2 font-bold text-green-600">{devices.length}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm font-medium uppercase">Total de Chamadas</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">{logs.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm font-medium uppercase">Tempo Total</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {Math.round(logs.reduce((acc, curr) => acc + curr.duration, 0) / 60)} <span className="text-lg text-gray-400 font-normal">min</span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-sm font-medium uppercase">Chamadas Recentes</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {logs.filter(l => new Date(l.timestamp).toDateString() === new Date().toDateString()).length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Histórico de Chamadas</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Carregando...</div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nenhuma chamada registrada ainda.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-3 font-medium">Data/Hora</th>
                    <th className="px-6 py-3 font-medium">Dispositivo</th>
                    <th className="px-6 py-3 font-medium">Contato</th>
                    <th className="px-6 py-3 font-medium">Tipo</th>
                    <th className="px-6 py-3 font-medium">Duração</th>
                    <th className="px-6 py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {log.device.name || log.device.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {log.person}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.type === 'INCOMING' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                          }`}>
                          {log.type === 'INCOMING' ? 'Recebida' : 'Efetuada'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.duration}s
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${log.status === 'MISSED' ? 'bg-red-100 text-red-700' :
                            log.status === 'RECEIVED' ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
