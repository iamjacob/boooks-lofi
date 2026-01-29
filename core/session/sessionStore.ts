import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Session } from './session';

export async function getSession(
  adapter: StorageAdapter,
  userId: string
): Promise<Session | null> {
  const sessions =
    (await adapter.get<Session[]>(
      storageKeys.sessions()
    )) ?? [];

  return sessions.find(s => s.userId === userId) ?? null;
}

export async function createSession(
  adapter: StorageAdapter,
  session: Session
) {
  const sessions =
    (await adapter.get<Session[]>(
      storageKeys.sessions()
    )) ?? [];

  // remove old session for user
  const next = sessions.filter(
    s => s.userId !== session.userId
  );

  next.push(session);

  await adapter.set(
    storageKeys.sessions(),
    next
  );
}

export async function clearSession(
  adapter: StorageAdapter,
  userId: string
) {
  const sessions =
    (await adapter.get<Session[]>(
      storageKeys.sessions()
    )) ?? [];

  const next = sessions.filter(
    s => s.userId !== userId
  );

  await adapter.set(
    storageKeys.sessions(),
    next
  );
}
