export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium
        bg-primary hover:bg-primary-soft text-white transition shadow-soft
        disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
