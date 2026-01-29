// core/user/createUser.ts
import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { User } from '@/core/models/user';
import { logEvent } from '@/core/history/logEvent';

export async function createUser(
  adapter: StorageAdapter,
  input: {
    mode: 'private' | 'social';
    displayName?: string;
    language?: string;
  }
) {
  const users =
    (await adapter.get<User[]>(
      storageKeys.users,
      { type: 'global' }
    )) ?? [];

  const user: User = {
    id: `user_${createId()}`,
    mode: input.mode,
    displayName: input.displayName,
    uiLanguage: input.language,
    createdAt: Date.now(),
  };

  users.push(user);

  await adapter.set(storageKeys.users, users, { type: 'global' });

  // init per-user collections
  await adapter.set(storageKeys.shelves(), [], {
    type: 'user',
    userId: user.id,
  });

  await adapter.set(storageKeys.books(), [], {
    type: 'user',
    userId: user.id,
  });

  await adapter.set(storageKeys.clips(), [], {
    type: 'user',
    userId: user.id,
  });

  await logEvent(
  adapter,
  user.id,
  'device_local', // TEMP: until device is injected properly
  'user.created',
  { mode: user.mode }
);


  return user;
}
