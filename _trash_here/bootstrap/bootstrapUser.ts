import { createId } from "@/core/models/ids/id";
import { StorageAdapter } from "@/core/storage/adapter";
import { storageKeys } from "@/core/storage/keys";
import { Device } from "@/core/models/identity/device";
import { User } from "@/core/models/user";
import { Shelf } from "@/core/models/shelf";
import { toHandle } from "@/core/users/handle";

export async function bootstrapUser(adapter: StorageAdapter) {
  /* ─────────────────────────────
     1. Ensure device exists
     ───────────────────────────── */
  let device = await adapter.get<Device>(storageKeys.device, {
    type: "global",
  });

  if (!device) {
    device = {
      id: `device_${createId()}`,
      platform: "web",
      createdAt: Date.now(),
    };

    await adapter.set(storageKeys.device, device, { type: "global" });
  }

  /* ─────────────────────────────
     2. Load users
     ───────────────────────────── */
  let users =
    (await adapter.get<User[]>(storageKeys.users, {
      type: "global",
    })) ?? [];

  /* ─────────────────────────────
     3. Active user
     ───────────────────────────── */
  let activeUserId = await adapter.get<string>(
    storageKeys.activeUserId,
    { type: "global" }
  );

  /* ─────────────────────────────
     4. First launch
     ───────────────────────────── */
  if (!activeUserId) {
    const userId = `user_${createId()}`;
    const defaultShelfId = `shelf_${createId()}`;

    const defaultShelf: Shelf = {
      id: defaultShelfId,
      ownerId: userId,
      title: "My Library",
      slug: "home",              // ✅ ROUTING SLUG
      visibility: "private",
      settings: {
        layout: "spatial",
        theme: "bw",
        showCovers: true,
      },
      books: 0,
      createdAt: Date.now(),
    };

    const handle = toHandle(userId);

    const user: User = {
      id: userId,
      handle,
      mode: "private",
      defaultShelfId,
      createdAt: Date.now(),
    };

    users.push(user);

    await adapter.set(storageKeys.users, users, { type: "global" });
    await adapter.set(storageKeys.activeUserId, userId, {
      type: "global",
    });

    await adapter.set(
      storageKeys.shelves(),
      [defaultShelf],
      { type: "user", userId }
    );

    await adapter.set(
      storageKeys.userBooks(),
      [],
      { type: "user", userId }
    );

    await adapter.set(
      storageKeys.history(),
      [],
      { type: "user", userId }
    );

    activeUserId = userId;
  }

  return {
    device,
    users,
    activeUserId,
  };
}
