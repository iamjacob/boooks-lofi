import { ShelfInstance } from "@/core/models/shelfInstance";
import { ID } from "@/core/ids/id";
import { IndexedDBAdapter } from "@/storage/idb";
import { storageKeys } from "@/storage/keys";

/**
 * Low-level persistence for ShelfInstances.
 * NO business logic here.
 */

export async function loadShelfInstances(
  userId: ID
): Promise<ShelfInstance[]> {
  const adapter = new IndexedDBAdapter();

  const list =
    (await adapter.get<ShelfInstance[]>(
      storageKeys.shelfInstances(userId)
    )) ?? [];

  console.log("📦 DB: loadShelfInstances", {
    userId,
    count: list.length,
  });

  return list;
}

export async function saveShelfInstance(
  userId: ID,
  instance: ShelfInstance
): Promise<void> {
  const adapter = new IndexedDBAdapter();

  const list = await loadShelfInstances(userId);
  const index = list.findIndex((x) => x.id === instance.id);

  if (index >= 0) {
    list[index] = {
      ...instance,
      updatedAt: Date.now(),
    };
  } else {
    list.push(instance);
  }

  await adapter.set(
    storageKeys.shelfInstances(userId),
    list
  );

  console.log("📦 DB: saveShelfInstance", {
    userId,
    shelfInstanceId: instance.id,
    shelfId: instance.shelfId,
  });
}

export async function deleteShelfInstance(
  userId: ID,
  shelfInstanceId: ID
): Promise<void> {
  const adapter = new IndexedDBAdapter();

  const list = await loadShelfInstances(userId);
  const next = list.filter((x) => x.id !== shelfInstanceId);

  await adapter.set(
    storageKeys.shelfInstances(userId),
    next
  );

  console.log("📦 DB: deleteShelfInstance", {
    userId,
    shelfInstanceId,
  });
}
