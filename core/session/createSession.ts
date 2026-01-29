// core/session/createSession.ts
import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Session } from '@/core/models/session';

export async function createSession(
  adapter: StorageAdapter,
  userId: string,
  deviceId: string
) {
  const sessions =
    (await adapter.get<Session[]>(
      storageKeys.sessions(),
      { type: 'global' }
    )) ?? [];

  const session: Session = {
    id: `session_${createId()}`,
    userId,
    deviceId,
    status: 'active',
    createdAt: Date.now(),
  };

  sessions.push(session);

  await adapter.set(
    storageKeys.sessions(),
    sessions,
    { type: 'global' }
  );

  return session;
}
