import { eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { getDb } from '../db';
import { workspaces, type Workspace } from '../db/schema';

export function getWorkspace(): Workspace | undefined {
  const db = getDb();
  return db.select().from(workspaces).limit(1).get();
}

export function initDefaultWorkspace(): Workspace {
  const db = getDb();
  const existing = getWorkspace();
  if (existing) return existing;

  const id = createId();
  db.insert(workspaces).values({ id, name: 'My Workspace' }).run();
  return db.select().from(workspaces).where(eq(workspaces.id, id)).get()!;
}
