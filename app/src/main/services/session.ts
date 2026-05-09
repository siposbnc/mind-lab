import { eq, and } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import path from 'node:path';
import { getDb } from '../db';
import { sessions, projects, type Session, type NewSession } from '../db/schema';
import { paths } from '../paths';
import { getProject } from './project';

function resolveLogPath(sessionId: string, projectId?: string | null): string {
  if (projectId) {
    const project = getProject(projectId);
    if (project?.codebasePath) {
      return path.join(project.codebasePath, '.mind-lab', 'logs', `${sessionId}.log`);
    }
  }
  return path.join(paths.logs, `${sessionId}.log`);
}

export function listSessions(workspaceId: string, projectId?: string): Session[] {
  const db = getDb();
  if (projectId) {
    return db.select().from(sessions)
      .where(and(eq(sessions.workspaceId, workspaceId), eq(sessions.projectId, projectId)))
      .all();
  }
  return db.select().from(sessions).where(eq(sessions.workspaceId, workspaceId)).all();
}

export function getSession(id: string): Session | undefined {
  return getDb().select().from(sessions).where(eq(sessions.id, id)).get();
}

export function createSession(data: Omit<NewSession, 'id' | 'logFilePath'>): Session {
  const db = getDb();
  const id = createId();
  const logFilePath = resolveLogPath(id, data.projectId);
  db.insert(sessions).values({ ...data, id, logFilePath }).run();
  return db.select().from(sessions).where(eq(sessions.id, id)).get()!;
}

export function updateSession(id: string, data: Partial<Omit<NewSession, 'id' | 'workspaceId'>>): Session | undefined {
  const db = getDb();
  db.update(sessions).set(data).where(eq(sessions.id, id)).run();
  return getSession(id);
}

export function deleteSession(id: string): void {
  getDb().delete(sessions).where(eq(sessions.id, id)).run();
}
