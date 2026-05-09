import { create } from 'zustand';
import type { Workspace, Project, Session } from '../main/db/schema';

interface WorkspaceStore {
  workspace: Workspace | null;
  projects: Project[];
  sessions: Session[];
  loading: boolean;

  init: () => Promise<void>;
  refreshProjects: () => Promise<void>;
  refreshSessions: () => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  workspace: null,
  projects: [],
  sessions: [],
  loading: true,

  init: async () => {
    const workspace = await window.api.workspaces.get();
    set({ workspace: workspace ?? null, loading: false });
    if (workspace) {
      await get().refreshProjects();
      await get().refreshSessions();
    }
  },

  refreshProjects: async () => {
    const { workspace } = get();
    if (!workspace) return;
    const projects = await window.api.projects.list(workspace.id);
    set({ projects });
  },

  refreshSessions: async () => {
    const { workspace } = get();
    if (!workspace) return;
    const sessions = await window.api.sessions.list(workspace.id);
    set({ sessions });
  },
}));
