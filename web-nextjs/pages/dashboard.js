import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [opsCount, setOpsCount] = useState(0);
  const [appsCount, setAppsCount] = useState(0);
  const [msgCount, setMsgCount] = useState(0);

  const load = async () => {
    try {
      setLoading(true);
      const [opsRes, appsRes, msgsRes] = await Promise.all([
        fetch('/api/opportunities'),
        fetch('/api/applications'),
        fetch('/api/messages'),
      ]);
      const [ops, apps, msgs] = await Promise.all([
        opsRes.json(),
        appsRes.json(),
        msgsRes.json(),
      ]);
      setOpsCount(ops.length || 0);
      setAppsCount(apps.length || 0);
      setMsgCount(msgs.length || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const onFocus = () => load();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
        <Button onClick={load}>Atualizar</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-sm text-muted">Oportunidades abertas</div>
          <div className="text-3xl font-bold mt-1">{loading ? '—' : opsCount}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted">Candidaturas</div>
          <div className="text-3xl font-bold mt-1">{loading ? '—' : appsCount}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted">Mensagens trocadas</div>
          <div className="text-3xl font-bold mt-1">{loading ? '—' : msgCount}</div>
        </Card>
      </div>
    </Layout>
  );
}
