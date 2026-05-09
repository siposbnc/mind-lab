import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { useWorkspaceStore } from './store/workspace';

type Page = 'dashboard' | 'workspace' | 'history';

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const { init, loading } = useWorkspaceStore();

  useEffect(() => { init(); }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-text-muted text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex h-full bg-bg-base">
      <Sidebar page={page} onNavigate={setPage} />
      <main className="flex-1 overflow-hidden">
        {page === 'dashboard' && <Dashboard />}
        {page === 'workspace' && <Placeholder label="Workspace" />}
        {page === 'history' && <Placeholder label="History" />}
      </main>
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-full text-text-muted text-sm">
      {label} — coming soon
    </div>
  );
}
