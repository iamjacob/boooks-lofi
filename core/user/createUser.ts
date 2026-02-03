import { createId } from "@/core/ids/id";
import { StorageAdapter } from "@/storage/adapter";
import { storageKeys } from "@/storage/keys";
import { User } from "@/core/models/user";
import { Shelf } from "@/core/models/shelf";
import { logEvent } from "@/_trash_here/history/logEvent";
import { toHandle } from "@/core/users/handle";

/**
 * Create a new user AND a default shelf.
 *
 * INVARIANT:
 * - Every user ALWAYS has exactly one default shelf
 * - The default shelf has slug "home"
 */
export async function createUser(
  adapter: StorageAdapter,
  input?: {
    displayName?: string;
    mode?: "private" | "social";
  }
): Promise<User> {
  const users =
    (await adapter.get<User[]>(storageKeys.users)) ?? [];

  const userId = `user_${createId()}`;
  const shelfId = `shelf_${createId()}`;
  const now = Date.now();

  /* ─────────────────────────────
     DEFAULT SHELF (CANONICAL)
     ───────────────────────────── */

  const defaultShelf: Shelf = {
    id: shelfId,
    ownerId: userId,

    title: "home",
    slug: "home", // 🔑 ROUTING SLUG

    visibility: "private",

    settings: {
      layout: "spatial",
      theme: "bw",
      showCovers: true,
    },

    books: 0,
    createdAt: now,
  };

  /* ─────────────────────────────
     USER
     ───────────────────────────── */

  const displayName = input?.displayName?.trim();
  const handle = toHandle(displayName || userId);

  const user: User = {
    id: userId,
    handle, // REQUIRED for routing
    displayName,
    mode: input?.mode ?? "private",
    defaultShelfId: shelfId,
    createdAt: now,
  };

  /* ─────────────────────────────
     PERSIST
     ───────────────────────────── */

  // 1️⃣ Save user (GLOBAL)
  users.push(user);
  await adapter.set(storageKeys.users, users);

  // 2️⃣ Save default shelf (USER)
  await adapter.set(
    storageKeys.shelves(),
    [defaultShelf],
    { type: "user", userId }
  );

  /* ─────────────────────────────
     HISTORY
     ───────────────────────────── */

  await logEvent(adapter, userId, "user.created", {
    userId,
  });

  await logEvent(adapter, userId, "shelf.created", {
    shelfId,
    slug: defaultShelf.slug,
    title: defaultShelf.title,
    isDefault: true,
  });

  return user;
}
