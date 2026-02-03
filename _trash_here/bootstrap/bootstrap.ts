// core/bootstrap/bootstrap.ts
import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Device } from '@/core/models/identity/device';
import { User } from '@/core/models/user';

export async function bootstrap(adapter: StorageAdapter) {
  // 1. Device (global, never changes)
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

  // 2. Users list
  let users =
    (await adapter.get<User[]>(storageKeys.users, {
      type: 'global',
    })) ?? [];

  // 3. Active user
  let activeUserId = await adapter.get<string>(
    storageKeys.activeUserId,
    { type: 'global' }
  );

  // 4. First launch → create default user
  if (!activeUserId) {
    const userId = `user_${createId()}`;

    const user: User = {
      id: userId,
      createdAt: Date.now(),
    };

    users.push(user);

    await adapter.set(storageKeys.users, users, { type: 'global' });
    await adapter.set(storageKeys.activeUserId, userId, {
      type: 'global',
    });

    // Init user storage
    await adapter.set(storageKeys.shelves(userId), [], {
      type: 'user',
      userId,
    });
    await adapter.set(storageKeys.books(userId), [], {
      type: 'user',
      userId,
    });
    await adapter.set(storageKeys.history(userId), [], {
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
