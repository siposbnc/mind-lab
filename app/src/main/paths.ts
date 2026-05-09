import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs';

const userData = app.getPath('userData');

export const paths = {
  userData,
  db: path.join(userData, 'mind-lab.db'),
  logs: path.join(userData, 'logs'),
};

export function ensureDirs() {
  fs.mkdirSync(paths.logs, { recursive: true });
}
