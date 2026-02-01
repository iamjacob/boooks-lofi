// core/library/shelfInstanceCrud.ts

import { ID } from "@/core/ids/id";
import { ShelfInstance } from "@/core/models/shelfInstance";
import { IndexedDBAdapter } from "@/storage/idb";
import { storageKeys } from "@/storage/keys";

export async function saveOnShelf(
  userId: ID,
  userBookId: ID,
  shelfId: ID
): Promise<void> {
  console.log("📦 CRUD: saveOnShelf called", {
    userId,
    userBookId,
    shelfId,
  });

  console.log(
    "🧱 STUB: auto-placement not implemented yet (position/rotation will be added later)"
  );

  const adapter = new IndexedDBAdapter();

  const key = storageKeys.shelfInstances(userId);

  const list =
    (await adapter.get<ShelfInstance[]>(key)) ?? [];

  const exists = list.find(
    (x) => x.userBookId === userBookId && x.shelfId === shelfId
  );

  if (exists) {
    console.log("📦 CRUD: shelfInstance already exists", exists);
    return;
  }

  const instance: ShelfInstance = {
    id: crypto.randomUUID(),
    userBookId,
    shelfId,
    position: [0, 0, 0], // placeholder
    rotation: [0, 0, 0], // placeholder
    visibility: "private",
    state: "local",
    createdAt: Date.now(),
  };

  list.push(instance);

  await adapter.set(key, list);

  console.log("📦 CRUD: shelfInstance created", instance);
}
