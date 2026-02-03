// core/session/revokeSession.ts
import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { Session } from '@/core/models/session';

export async function revokeSession(
  adapter: StorageAdapter,
  sessionId: string
) {
  const sessions =
    (await adapter.get<Session[]>(
      storageKeys.sessions(),
      { type: 'global' }
    )) ?? [];

  const updated = sessions.map(s =>
    s.id === sessionId
      ? { ...s, status: 'revoked', revokedAt: Date.now() }
      : s
  );

  await adapter.set(
    storageKeys.sessions(),
    updated,
    { type: 'global' }
  );
}
