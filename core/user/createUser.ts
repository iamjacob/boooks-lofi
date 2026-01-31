import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { User } from '@/core/models/user';
import { Shelf } from '@/core/models/shelf';
import { logEvent } from '@/core/history/logEvent';
import { toHandle } from "@/core/users/handle";

/**
 * Create a new user AND a default shelf.
 * This guarantees every user has a valid home shelf.
 */
export async function createUser(
  adapter: StorageAdapter,
  input?: {
    displayName?: string;
    mode?: 'private' | 'social';
  }
): Promise<User> {
  const users =
    (await adapter.get<User[]>(
      storageKeys.users
    )) ?? [];

  const userId = `user_${createId()}`;
  const shelfId = `shelf_${createId()}`;

  const now = Date.now();

  const defaultShelf: Shelf = {
    id: shelfId,
    ownerId: userId,
    title: 'My Books',
    visibility: 'private',
    createdAt: now,
  };


const displayName = input?.displayName?.trim();
const handle = toHandle(displayName || userId);

const user: User = {
  id: userId,
  handle,                // ✅ REQUIRED
  displayName,
  mode: input?.mode ?? "private",
  defaultShelfId: shelfId,
  createdAt: Date.now(),
};


  // 1️⃣ Save user
  users.push(user);
  await adapter.set(storageKeys.users, users);

  // 2️⃣ Save default shelf
  const shelves =
    (await adapter.get<Shelf[]>(
      storageKeys.shelves(),
      { type: 'user', userId }
    )) ?? [];

  shelves.push(defaultShelf);

  await adapter.set(
    storageKeys.shelves(),
    shelves,
    { type: 'user', userId }
  );

  // 3️⃣ Log events
  await logEvent(adapter, userId, 'user.created', {
    userId,
  });

  await logEvent(adapter, userId, 'shelf.created', {
    shelfId,
    title: defaultShelf.title,
    isDefault: true,
  });

  return user;
}
