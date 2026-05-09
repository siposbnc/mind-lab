import { ipcMain } from 'electron';
import { listProjects, getProject, createProject, updateProject, deleteProject } from '../services/project';
import type { NewProject } from '../db/schema';

export function registerProjectHandlers() {
  ipcMain.handle('projects:list', (_e, workspaceId: string) => {
    return listProjects(workspaceId);
  });

  ipcMain.handle('projects:get', (_e, id: string) => {
    return getProject(id);
  });

  ipcMain.handle('projects:create', (_e, data: Omit<NewProject, 'id'>) => {
    return createProject(data);
  });

  ipcMain.handle('projects:update', (_e, id: string, data: Partial<Omit<NewProject, 'id' | 'workspaceId'>>) => {
    return updateProject(id, data);
  });

  ipcMain.handle('projects:delete', (_e, id: string) => {
    deleteProject(id);
  });
}
