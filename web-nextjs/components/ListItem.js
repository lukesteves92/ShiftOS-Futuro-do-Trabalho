export default function ListItem({ title, description, meta, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left rounded-2xl px-4 py-3 bg-elevated hover:bg-elevated/80 border border-white/5 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {description && (
            <p className="text-xs text-muted mt-1">{description}</p>
          )}
        </div>
        {meta && <div className="text-xs text-primary font-semibold">{meta}</div>}
      </div>
    </button>
  );
}
