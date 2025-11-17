import Link from 'next/link';
import { useRouter } from 'next/router';

const items = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/activities', label: 'Atividades' },
  { href: '/candidates', label: 'Candidatos' },
];

export default function Sidebar() {
  const router = useRouter();
  return (
    <aside className="hidden md:flex flex-col gap-2 w-56 px-4 py-6 border-r border-white/5 bg-surface/80 backdrop-blur-glass">
      {items.map((item) => {
        const active = router.pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-xl px-3 py-2 text-sm transition
              ${active ? 'bg-primary text-white' : 'text-muted hover:bg-elevated'}`}
          >
            {item.label}
          </Link>
        );
      })}
    </aside>
  );
}
