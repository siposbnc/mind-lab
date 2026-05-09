import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { getDb } from '../db';
import { projects, type Project, type NewProject } from '../db/schema';

export function listProjects(workspaceId: string): Project[] {
  return getDb().select().from(projects).where(eq(projects.workspaceId, workspaceId)).all();
}

export function getProject(id: string): Project | undefined {
  return getDb().select().from(projects).where(eq(projects.id, id)).get();
}

export function createProject(data: Omit<NewProject, 'id'>): Project {
  const db = getDb();
  const id = createId();
  db.insert(projects).values({ ...data, id }).run();
  return db.select().from(projects).where(eq(projects.id, id)).get()!;
}

export function updateProject(id: string, data: Partial<Omit<NewProject, 'id' | 'workspaceId'>>): Project | undefined {
  const db = getDb();
  db.update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .run();
  return getProject(id);
}

export function deleteProject(id: string): void {
  getDb().delete(projects).where(eq(projects.id, id)).run();
}
