import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-wmf-gray">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t border-wmf-border bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-wmf-muted text-center">
          Data source:{' '}
          <a href="https://meta.wikimedia.org" className="text-wmf-blue hover:underline" target="_blank" rel="noreferrer">
            Meta-Wiki
          </a>{' '}
          · Wikimedia Foundation Board of Trustees elections 2005–2025 · CC BY-SA 4.0
        </div>
      </footer>
    </div>
  );
}
