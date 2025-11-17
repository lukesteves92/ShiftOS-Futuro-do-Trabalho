import TopBar from '@/components/TopBar';
import Sidebar from '@/components/Sidebar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex bg-bg text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="max-w-6xl w-full mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
