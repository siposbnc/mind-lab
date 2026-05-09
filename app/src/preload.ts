import { contextBridge, ipcRenderer } from 'electron';
import type { Workspace, Project, NewProject, Session, NewSession } from './main/db/schema';

const api = {
  workspaces: {
    get: (): Promise<Workspace | undefined> =>
      ipcRenderer.invoke('workspaces:get'),
  },

  projects: {
    list: (workspaceId: string): Promise<Project[]> =>
      ipcRenderer.invoke('projects:list', workspaceId),
    get: (id: string): Promise<Project | undefined> =>
      ipcRenderer.invoke('projects:get', id),
    create: (data: Omit<NewProject, 'id'>): Promise<Project> =>
      ipcRenderer.invoke('projects:create', data),
    update: (id: string, data: Partial<Omit<NewProject, 'id' | 'workspaceId'>>): Promise<Project | undefined> =>
      ipcRenderer.invoke('projects:update', id, data),
    delete: (id: string): Promise<void> =>
      ipcRenderer.invoke('projects:delete', id),
  },

  sessions: {
    list: (workspaceId: string, projectId?: string): Promise<Session[]> =>
      ipcRenderer.invoke('sessions:list', workspaceId, projectId),
    get: (id: string): Promise<Session | undefined> =>
      ipcRenderer.invoke('sessions:get', id),
    create: (data: Omit<NewSession, 'id' | 'logFilePath'>): Promise<Session> =>
      ipcRenderer.invoke('sessions:create', data),
    update: (id: string, data: Partial<Omit<NewSession, 'id' | 'workspaceId'>>): Promise<Session | undefined> =>
      ipcRenderer.invoke('sessions:update', id, data),
    delete: (id: string): Promise<void> =>
      ipcRenderer.invoke('sessions:delete', id),
  },
};

contextBridge.exposeInMainWorld('api', api);

export type API = typeof api;
