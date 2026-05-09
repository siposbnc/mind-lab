import { ipcMain } from 'electron';
import { getWorkspace } from '../services/workspace';

export function registerWorkspaceHandlers() {
  ipcMain.handle('workspaces:get', () => {
    return getWorkspace();
  });
}
