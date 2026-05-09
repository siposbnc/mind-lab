import React from 'react';
import type { Project, Session } from '../../main/db/schema';

const PROJECT_COLORS = ['#818cf8', '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa'];

function timeAgo(date: Date | string | null): string {
  if (!date) return 'Never';
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface Props {
  projects: Project[];
  sessions: Session[];
}

export function ProjectsGrid({ projects, sessions }: Props) {
  if (projects.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-semibold tracking-widest text-text-muted uppercase">Projects</h2>
          <div className="h-px flex-1 bg-bg-border w-16" />
        </div>
        <button className="text-xs text-brand hover:text-brand-light transition-colors">+ New project</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {projects.map((p, i) => {
          const color = p.color ?? PROJECT_COLORS[i % PROJECT_COLORS.length];
          const projectSessions = sessions.filter(s => s.projectId === p.id && s.status !== 'exited');
          const isActive = projectSessions.some(s => s.status === 'active' || s.status === 'waiting_input');
          const lastSession = sessions
            .filter(s => s.projectId === p.id)
            .sort((a, b) => {
              const ta = a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : new Date(a.createdAt).getTime();
              const tb = b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : new Date(b.createdAt).getTime();
              return tb - ta;
            })[0];

          return (
            <div key={p.id} className="bg-bg-card border border-bg-border rounded-xl p-5 relative overflow-hidden hover:border-bg-elevated transition-colors group">
              <div className="absolute top-0 left-0 w-full h-0.5 rounded-t-xl" style={{ background: color }} />
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-primary">{p.name}</h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-status-done/15 text-status-done' : 'bg-bg-elevated text-text-muted'
                }`}>
                  {isActive ? 'ACTIVE' : 'IDLE'}
                </span>
              </div>
              {p.codebasePath && (
                <p className="text-[11px] text-text-muted font-mono mb-3 truncate">{p.codebasePath.replace(/\\/g, '/')}</p>
              )}
              <div className="flex items-center gap-3 text-[11px] text-text-muted mb-4">
                <span className="flex items-center gap-1">
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>
                  {projectSessions.length} session{projectSessions.length !== 1 ? 's' : ''}
                </span>
                {lastSession && (
                  <span className="flex items-center gap-1">
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>
                    {timeAgo(lastSession.lastActiveAt ?? lastSession.createdAt)}
                  </span>
                )}
              </div>
              <button className="text-[11px] text-brand hover:text-brand-light font-medium transition-colors flex items-center gap-1">
                Open <span>→</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
