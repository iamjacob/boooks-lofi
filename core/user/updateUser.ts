import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { User } from '@/core/models/user';
import { logEvent } from '@/core/history/logEvent';

/**
 * Update an existing user (e.g. rename, change mode, theme, etc)
 */
export async function updateUser(
  adapter: StorageAdapter,
  userId: string,
  patch: Partial<User>
): Promise<User> {
  const users =
    (await adapter.get<User[]>(storageKeys.users)) ?? [];

  const index = users.findIndex(u => u.id === userId);
  if (index === -1) {
    throw new Error('User not found');
  }

  const updated: User = {
    ...users[index],
    ...patch,
    updatedAt: Date.now(),
  };

  users[index] = updated;

  await adapter.set(
    storageKeys.users,
    users
  );

  await logEvent(
    adapter,
    userId,
    'user.updated',
    { fields: Object.keys(patch) }
  );

  return updated;
}
