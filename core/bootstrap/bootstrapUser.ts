// core/bootstrap/bootstrapUser.ts

import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Device } from '@/core/identity/device';
import { User } from '@/core/models/user';

export async function bootstrapUser(adapter: StorageAdapter) {
  // 1. Ensure device exists (GLOBAL, never changes)
  let device = await adapter.get<Device>(storageKeys.device, {
    type: 'global',
  });

  if (!device) {
    device = {
      id: `device_${createId()}`,
      platform: 'web',
      createdAt: Date.now(),
    };

    await adapter.set(storageKeys.device, device, { type: 'global' });
  }

  // 2. Load users list (GLOBAL)
  let users =
    (await adapter.get<User[]>(storageKeys.users, {
      type: 'global',
    })) ?? [];

  // 3. Load active user (GLOBAL)
  let activeUserId = await adapter.get<string>(
    storageKeys.activeUserId,
    { type: 'global' }
  );

  // 4. First launch → create default local user
  if (!activeUserId) {
    const userId = `user_${createId()}`;

    const user: User = {
      id: userId,
      createdAt: Date.now(),
    };

    users.push(user);

    // persist global state
    await adapter.set(storageKeys.users, users, { type: 'global' });
    await adapter.set(storageKeys.activeUserId, userId, {
      type: 'global',
    });

    // initialize per-user storage
    await adapter.set(storageKeys.shelves(), [], {
      type: 'user',
      userId,
    });

    await adapter.set(storageKeys.books(), [], {
      type: 'user',
      userId,
    });

    await adapter.set(storageKeys.history(), [], {
      type: 'user',
      userId,
    });

    activeUserId = userId;
  }

  return {
    device,
    users,
    activeUserId,
  };
}
