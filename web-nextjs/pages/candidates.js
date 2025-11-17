import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Card from '@/components/Card';
import Button from '@/components/Button';

const statusOptions = ['PENDING', 'IN_REVIEW', 'SELECTED', 'REJECTED'];

export default function Candidates() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState([]);

  const load = async () => {
    const res = await fetch('/api/applications');
    const data = await res.json();
    setItems(data);
  };

  const loadMessages = async (applicationId) => {
    const res = await fetch('/api/messages?applicationId=' + applicationId);
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, status) => {
    await fetch('/api/applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  const deleteApplication = async (id) => {
    await fetch('/api/applications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setSelected(null);
    setMessages([]);
    load();
  };

  const sendMessage = async () => {
    if (!selected || !messageText.trim()) return;
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId: selected.id, text: messageText }),
    });
    setMessageText('');
    loadMessages(selected.id);
  };

  const selectCandidate = (app) => {
    setSelected(app);
    setMessages([]);
    loadMessages(app.id);
  };

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-3">Candidaturas</h2>
          <div className="space-y-2 text-sm">
            {items.map((a) => (
              <button
                key={a.id}
                onClick={() => selectCandidate(a)}
                className={`w-full text-left rounded-xl px-3 py-2 border text-xs
                  ${selected?.id === a.id ? 'border-primary bg-elevated' : 'border-white/5 bg-elevated/70 hover:bg-elevated'}`}
              >
                <div className="flex justify-between gap-2">
                  <div>
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-muted">
                      {a.email} · {a.phone}
                    </div>
                    <div className="mt-1 text-muted">
                      Para: {a.opportunity?.title || '—'}
                    </div>
                  </div>
                  <span className="text-[0.7rem] px-2 py-1 rounded-full bg-white/5">
                    {a.status}
                  </span>
                </div>
              </button>
            ))}
            {items.length === 0 && (
              <p className="text-muted">Nenhuma candidatura recebida ainda.</p>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-3">Detalhes & mensagens</h2>
          {!selected && (
            <p className="text-sm text-muted">
              Selecione uma candidatura para visualizar detalhes e enviar mensagens.
            </p>
          )}

          {selected && (
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold">{selected.name}</div>
                <div className="text-muted">{selected.email} · {selected.phone}</div>
                <div className="mt-1 text-muted">
                  Candidatou-se para: {selected.opportunity?.title || '—'}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {statusOptions.map((s) => (
                  <Button
                    key={s}
                    onClick={() => changeStatus(selected.id, s)}
                    className={selected.status === s ? 'bg-primary' : 'bg-elevated'}
                  >
                    {s}
                  </Button>
                ))}
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => deleteApplication(selected.id)}
                >
                  Excluir
                </Button>
              </div>

              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="text-xs text-muted mb-1">Mensagens</div>
                <div className="max-h-40 overflow-y-auto space-y-2 mb-3">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className="rounded-xl bg-elevated px-3 py-2 text-xs text-muted"
                    >
                      {m.text}
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="text-xs text-muted">
                      Nenhuma mensagem enviada ainda.
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-xl bg-elevated border border-white/10 px-3 py-2 text-xs"
                    placeholder="Escreva uma mensagem para este candidato..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <Button onClick={sendMessage}>Enviar</Button>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
