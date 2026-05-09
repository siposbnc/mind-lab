import React from 'react';
import { useWorkspaceStore } from '../../store/workspace';
import { StatsCards } from './StatsCards';
import { ProjectsGrid } from './ProjectsGrid';
import { RecentSessions } from './RecentSessions';
import type { Session } from '../../main/db/schema';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning.';
  if (h < 18) return 'Good afternoon.';
  return 'Good evening.';
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase();
}

export function Dashboard() {
  const { workspace, projects, sessions } = useWorkspaceStore();

  const activeSessions = sessions.filter(s => s.status === 'active' || s.status === 'waiting_input' || s.status === 'idle');
  const thinkingSessions = sessions.filter(s => s.status === 'active');
  const projectsWithSessions = new Set(activeSessions.map(s => s.projectId)).size;

  const tools = [...new Set(sessions.map(s => s.tool))];

  const subtitle = [
    activeSessions.length > 0 ? `${activeSessions.length} session${activeSessions.length !== 1 ? 's' : ''} running` : null,
    `${projects.length} project${projects.length !== 1 ? 's' : ''}`,
  ].filter(Boolean).join(' · ');

  const recentSessions = [...sessions]
    .sort((a, b) => {
      const ta = a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : new Date(a.createdAt).getTime();
      const tb = b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : new Date(b.createdAt).getTime();
      return tb - ta;
    })
    .slice(0, 8);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Title bar drag region */}
      <div className="h-9 drag-region shrink-0 flex items-center justify-center">
        <span className="text-xs text-text-muted no-drag select-none">
          {workspace?.name ?? 'Mind Lab'}
        </span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {/* Greeting */}
        <div className="pt-6 pb-6">
          <p className="text-[10px] font-semibold tracking-widest text-brand mb-1">{formatDate()}</p>
          <h1 className="text-2xl font-semibold text-text-primary">
            {greeting()} <span className="text-text-secondary font-normal">Your workspace is ready.</span>
          </h1>
          {subtitle && <p className="text-sm text-text-muted mt-1">{subtitle}</p>}
        </div>

        <StatsCards
          activeSessions={activeSessions.length}
          thinkingCount={thinkingSessions.length}
          projectCount={projects.length}
          projectsWithSessions={projectsWithSessions}
          todayActivity={sessions.length}
          tools={tools}
        />

        <ProjectsGrid projects={projects} sessions={sessions} />

        <RecentSessions sessions={recentSessions} projects={projects} />
      </div>

      {/* Bottom status bar */}
      <div className="shrink-0 border-t border-bg-border px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] text-text-muted">
          {activeSessions.length > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-done animate-pulse" />
              {activeSessions.length} active
            </span>
          )}
          <span>{projects.length} projects</span>
        </div>
        <span className="text-[10px] text-text-muted">Mind Lab v0.1.0</span>
      </div>
    </div>
  );
}
