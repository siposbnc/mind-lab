import React from 'react';
import { Logo } from './Logo';
import { useWorkspaceStore } from '../store/workspace';

type Page = 'dashboard' | 'workspace' | 'history';

interface SidebarProps {
  page: Page;
  onNavigate: (page: Page) => void;
}

const PROJECT_COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa'];

export function Sidebar({ page, onNavigate }: SidebarProps) {
  const { projects, sessions } = useWorkspaceStore();

  const sessionCountByProject = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.id] = sessions.filter(s => s.projectId === p.id && s.status !== 'exited').length;
    return acc;
  }, {});

  return (
    <aside className="flex flex-col w-52 shrink-0 bg-bg-surface border-r border-bg-border h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 drag-region">
        <div className="no-drag shrink-0">
          <Logo size={26} />
        </div>
        <span className="font-semibold text-text-primary text-sm tracking-tight no-drag">Mind Lab</span>
      </div>

      {/* Nav */}
      <nav className="px-2 space-y-0.5">
        <NavItem icon={<IconDashboard />} label="Dashboard" active={page === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<IconWorkspace />} label="Workspace" active={page === 'workspace'} onClick={() => onNavigate('workspace')} />
        <NavItem icon={<IconHistory />} label="History" active={page === 'history'} onClick={() => onNavigate('history')} />
      </nav>

      {/* Projects */}
      <div className="mt-5 px-4">
        <p className="text-[10px] font-semibold tracking-widest text-text-muted uppercase mb-2">Projects</p>
        <div className="space-y-0.5">
          {projects.length === 0 ? (
            <p className="text-xs text-text-muted py-1">No projects yet</p>
          ) : (
            projects.map((p, i) => (
              <div key={p.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-bg-elevated cursor-pointer group">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color ?? PROJECT_COLORS[i % PROJECT_COLORS.length] }} />
                <span className="text-xs text-text-secondary truncate flex-1">{p.name}</span>
                {sessionCountByProject[p.id] > 0 && (
                  <span className="text-[10px] text-text-muted bg-bg-border rounded px-1">{sessionCountByProject[p.id]}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* New Session */}
      <div className="p-3">
        <button className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-light text-white text-xs font-medium py-2 rounded-md transition-colors no-drag">
          <span>+</span>
          <span>New Session</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
        active
          ? 'bg-brand/15 text-brand-light'
          : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function IconDashboard() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
}
function IconWorkspace() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="12" y1="9" x2="12" y2="21"/></svg>;
}
function IconHistory() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>;
}
