export default function Card({ children, className = '' }) {
  return (
    <section className={`card p-4 md:p-5 ${className}`}>
      {children}
    </section>
  );
}
