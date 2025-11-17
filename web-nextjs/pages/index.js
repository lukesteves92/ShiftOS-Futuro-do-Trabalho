import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-lg font-semibold">Atividades</h2>
          <p className="text-sm text-muted mt-2">
            Crie oportunidades que aparecerão para os candidatos no app mobile.
          </p>
          <div className="mt-4">
            <Button onClick={() => router.push('/activities')}>
              Gerenciar atividades
            </Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Candidatos</h2>
          <p className="text-sm text-muted mt-2">
            Acompanhe candidaturas, status e mensagens enviadas.
          </p>
          <div className="mt-4">
            <Button onClick={() => router.push('/candidates')}>
              Ver candidatos
            </Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <p className="text-sm text-muted mt-2">
            Visão geral do movimento da sua empresa no ShiftOS.
          </p>
          <div className="mt-4">
            <Button onClick={() => router.push('/dashboard')}>
              Abrir dashboard
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
