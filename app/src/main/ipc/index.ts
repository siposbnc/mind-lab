import { registerWorkspaceHandlers } from './workspaces';
import { registerProjectHandlers } from './projects';
import { registerSessionHandlers } from './sessions';

export function registerAllHandlers() {
  registerWorkspaceHandlers();
  registerProjectHandlers();
  registerSessionHandlers();
}
