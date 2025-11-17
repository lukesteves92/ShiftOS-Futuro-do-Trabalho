import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import ListItem from '@/components/ListItem';
import Button from '@/components/Button';

export default function Activities() {
  const [ops, setOps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pay, setPay] = useState('');
  const [image, setImage] = useState('/company/acme.svg');

  const refresh = () =>
    fetch('/api/opportunities')
      .then((r) => r.json())
      .then(setOps)
      .catch(() => {});

  useEffect(() => {
    refresh();
  }, []);

  const createActivity = async () => {
    if (!title.trim()) return;
    await fetch('/api/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, pay, image }),
    });
    setShowModal(false);
    setTitle('');
    setDescription('');
    setPay('');
    setImage('/company/acme.svg');
    refresh();
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Atividades</h2>
        <Button onClick={() => setShowModal(true)}>Criar atividade</Button>
      </div>

      <Card>
        {ops.length === 0 && (
          <p className="text-sm text-muted">Nenhuma atividade criada ainda.</p>
        )}
        <div className="space-y-3">
          {ops.map((o) => (
            <ListItem
              key={o.id}
              title={o.title}
              description={o.description}
              meta={o.pay}
            />
          ))}
        </div>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-surface border border-white/10 rounded-2xl p-5 w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-4">Nova atividade</h3>
            <div className="space-y-3 text-sm">
              <input
                className="w-full rounded-xl bg-elevated border border-white/10 px-3 py-2"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full rounded-xl bg-elevated border border-white/10 px-3 py-2"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="w-full rounded-xl bg-elevated border border-white/10 px-3 py-2"
                placeholder="Pagamento (ex: R$ 120/noite)"
                value={pay}
                onChange={(e) => setPay(e.target.value)}
              />
              <input
                className="w-full rounded-xl bg-elevated border border-white/10 px-3 py-2"
                placeholder="Imagem (ex: /company/acme.svg ou URL)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setShowModal(false)}>Cancelar</Button>
              <Button onClick={createActivity}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
