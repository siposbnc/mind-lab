import { ipcMain } from 'electron';
import { listSessions, getSession, createSession, updateSession, deleteSession } from '../services/session';
import type { NewSession } from '../db/schema';

export function registerSessionHandlers() {
  ipcMain.handle('sessions:list', (_e, workspaceId: string, projectId?: string) => {
    return listSessions(workspaceId, projectId);
  });

  ipcMain.handle('sessions:get', (_e, id: string) => {
    return getSession(id);
  });

  ipcMain.handle('sessions:create', (_e, data: Omit<NewSession, 'id' | 'logFilePath'>) => {
    return createSession(data);
  });

  ipcMain.handle('sessions:update', (_e, id: string, data: Partial<Omit<NewSession, 'id' | 'workspaceId'>>) => {
    return updateSession(id, data);
  });

  ipcMain.handle('sessions:delete', (_e, id: string) => {
    deleteSession(id);
  });
}
