import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Device } from '@/core/identity/device';
import { User } from '@/core/models/user';
import { Shelf } from '@/core/models/shelf';
import { toHandle } from '@/core/users/handle';

export async function bootstrapUser(adapter: StorageAdapter) {
  // ─────────────────────────────
  // 1. Ensure device exists (GLOBAL)
  // ─────────────────────────────
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

  // ─────────────────────────────
  // 2. Load users list (GLOBAL)
  // ─────────────────────────────
  let users =
    (await adapter.get<User[]>(storageKeys.users, {
      type: 'global',
    })) ?? [];

  // ─────────────────────────────
  // 3. Load active user id (GLOBAL)
  // ─────────────────────────────
  let activeUserId = await adapter.get<string>(
    storageKeys.activeUserId,
    { type: 'global' }
  );

  // ─────────────────────────────
  // 4. First launch → create user + default shelf
  // ─────────────────────────────
  if (!activeUserId) {
    const userId = `user_${createId()}`;
    const defaultShelfId = `shelf_${createId()}`;

    const defaultShelf: Shelf = {
      id: defaultShelfId,
      ownerId: userId,
      title: 'My Library',
      visibility: 'private',
      settings: {
        layout: 'spatial',
        theme: 'bw',
        showCovers: true,
      },
      books: 0,
      createdAt: Date.now(),
    };

    // 👇 IMPORTANT: handle is REQUIRED
    const handle = toHandle(userId); // dummy but stable (e.g. user_abcd123)

    const user: User = {
      id: userId,
      handle,                // ✅ REQUIRED FOR ROUTING
      mode: 'private',
      defaultShelfId,
      createdAt: Date.now(),
    };

    // ── persist global state
    users.push(user);

    await adapter.set(storageKeys.users, users, { type: 'global' });
    await adapter.set(storageKeys.activeUserId, userId, {
      type: 'global',
    });

    // ── initialize per-user storage
    await adapter.set(storageKeys.shelves(), [defaultShelf], {
      type: 'user',
      userId,
    });

    await adapter.set(storageKeys.userBooks(), [], {
      type: 'user',
      userId,
    });

    await adapter.set(storageKeys.history(), [], {
      type: 'user',
      userId,
    });

    activeUserId = userId;
  }

  // ─────────────────────────────
  // 5. Return boot info
  // ─────────────────────────────
  return {
    device,
    users,
    activeUserId,
  };
}
