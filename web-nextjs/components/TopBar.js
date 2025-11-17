export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-glass bg-bg/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">
            S
          </div>
          <div>
            <div className="text-sm font-semibold">ShiftOS</div>
            <div className="text-xs text-muted">Painel do recrutador</div>
          </div>
        </div>
      </div>
    </header>
  );
}
