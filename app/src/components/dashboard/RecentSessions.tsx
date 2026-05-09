import React from 'react';
import type { Session, Project } from '../../main/db/schema';

const TOOL_LABELS: Record<string, string> = {
  claude: 'CLAUDE',
  codex: 'CODEX',
  gemini: 'GEMINI',
  copilot: 'COPILOT',
};

const TOOL_INITIALS: Record<string, string> = {
  claude: 'CL',
  codex: 'CX',
  gemini: 'GM',
  copilot: 'CP',
};

const TOOL_COLORS: Record<string, string> = {
  claude: '#818cf8',
  codex: '#34d399',
  gemini: '#60a5fa',
  copilot: '#f87171',
};

function timeAgo(date: Date | string | null): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; dot: string }> = {
    active:        { label: 'Thinking...', color: 'bg-brand/15 text-brand-light', dot: 'bg-brand animate-pulse' },
    waiting_input: { label: 'Waiting for input', color: 'bg-status-waiting/15 text-status-waiting', dot: 'bg-status-waiting' },
    idle:          { label: 'Idle', color: 'bg-bg-elevated text-text-muted', dot: 'bg-status-idle' },
    exited:        { label: 'Done', color: 'bg-status-done/15 text-status-done', dot: 'bg-status-done' },
    error:         { label: 'Error', color: 'bg-status-error/15 text-status-error', dot: 'bg-status-error' },
  };
  const s = map[status] ?? map.idle;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

interface Props {
  sessions: Session[];
  projects: Project[];
}

export function RecentSessions({ sessions, projects }: Props) {
  if (sessions.length === 0) return null;

  const projectMap = Object.fromEntries(projects.map(p => [p.id, p]));

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-semibold tracking-widest text-text-muted uppercase">Recent Sessions</h2>
          <div className="h-px bg-bg-border w-16" />
        </div>
        <button className="text-xs text-text-muted hover:text-text-secondary transition-colors">View all</button>
      </div>
      <div className="space-y-1">
        {sessions.map(s => {
          const project = s.projectId ? projectMap[s.projectId] : null;
          const color = TOOL_COLORS[s.tool] ?? '#6b7280';
          return (
            <div key={s.id} className="flex items-center gap-4 bg-bg-card border border-bg-border rounded-lg px-4 py-3 hover:border-bg-elevated transition-colors">
              {/* Tool avatar */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: `${color}20`, color }}>
                {TOOL_INITIALS[s.tool] ?? s.tool.slice(0, 2).toUpperCase()}
              </div>

              {/* Name + project */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{s.name}</p>
                {project && <p className="text-[11px] text-text-muted truncate">● {project.name}</p>}
              </div>

              {/* Tool badge */}
              <span className="text-[10px] font-bold text-text-muted bg-bg-elevated px-2 py-0.5 rounded shrink-0">
                {TOOL_LABELS[s.tool] ?? s.tool.toUpperCase()}
              </span>

              {/* Status */}
              <div className="shrink-0"><StatusBadge status={s.status} /></div>

              {/* Time */}
              <span className="text-[11px] text-text-muted shrink-0 w-16 text-right">
                {timeAgo(s.lastActiveAt ?? s.createdAt)}
              </span>

              {/* Action */}
              <button className="text-[11px] text-brand hover:text-brand-light font-medium transition-colors shrink-0 flex items-center gap-1">
                Resume <span>→</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
