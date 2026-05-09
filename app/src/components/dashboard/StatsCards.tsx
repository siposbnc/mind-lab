import React from 'react';

interface Props {
  activeSessions: number;
  thinkingCount: number;
  projectCount: number;
  projectsWithSessions: number;
  todayActivity: number;
  tools: string[];
}

export function StatsCards({ activeSessions, thinkingCount, projectCount, projectsWithSessions, todayActivity, tools }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3 mb-8">
      <StatCard
        label="ACTIVE SESSIONS"
        value={activeSessions}
        badge={thinkingCount > 0 ? { text: `${thinkingCount} thinking now`, color: 'brand' } : undefined}
        accent="#818cf8"
      />
      <StatCard
        label="PROJECTS"
        value={projectCount}
        badge={projectsWithSessions > 0 ? { text: `${projectsWithSessions} with active sessions`, color: 'muted' } : undefined}
        accent="#34d399"
      />
      <StatCard
        label="TODAY'S ACTIVITY"
        value={todayActivity}
        badge={activeSessions > 0 ? { text: `${activeSessions} still running`, color: 'muted' } : undefined}
        accent="#fbbf24"
      />
      <StatCard
        label="CLI TOOLS"
        value={tools.length || 0}
        badge={tools.length > 0 ? { text: tools.join('  '), color: 'muted' } : undefined}
        accent="#f87171"
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  badge?: { text: string; color: 'brand' | 'muted' };
  accent: string;
}

function StatCard({ label, value, badge, accent }: StatCardProps) {
  return (
    <div className="bg-bg-card rounded-xl border border-bg-border p-5 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: accent, opacity: 0.5 }} />
      <p className="text-[10px] font-semibold tracking-widest text-text-muted mb-3">{label}</p>
      <p className="text-3xl font-semibold text-text-primary mb-3">{value}</p>
      {badge && (
        <div className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
          badge.color === 'brand'
            ? 'bg-brand/15 text-brand-light'
            : 'bg-bg-elevated text-text-muted'
        }`}>
          {badge.color === 'brand' && <span className="w-1.5 h-1.5 rounded-full bg-brand-light animate-pulse" />}
          {badge.text}
        </div>
      )}
    </div>
  );
}
