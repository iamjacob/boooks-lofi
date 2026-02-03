import { ID } from "@/core/models/ids/id";
import { ShelfInstance } from "@/core/models/shelfInstance";
import {
  loadShelfInstances,
  saveShelfInstance,
} from "@/_trash_here/db/shelfInstanceDb";

/**
 * Domain action: place a UserBook on a Shelf.
 * This is where we later add auto-placement logic.
 */
export async function saveOnShelf(
  userId: ID,
  userBookId: ID,
  shelfId: ID
): Promise<ShelfInstance> {
  console.log("📐 SHELF: saveOnShelf called", {
    userId,
    userBookId,
    shelfId,
  });

  const instances = await loadShelfInstances(userId);

  const existing = instances.find(
    (x) =>
      x.userBookId === userBookId &&
      x.shelfId === shelfId
  );

  if (existing) {
    console.log("📐 SHELF: instance already exists", {
      shelfInstanceId: existing.id,
    });
    return existing;
  }

  console.log(
    "🧱 STUB: auto-placement algorithm not implemented yet"
  );

  const instance: ShelfInstance = {
    id: crypto.randomUUID(),
    userBookId,
    shelfId,

    index: instances.length, // naive ordering for now

    position: [0, 0, 0], // placeholder
    rotation: [0, 0, 0], // placeholder

    isSynced: false,
    createdAt: Date.now(),
  };

  await saveShelfInstance(userId, instance);

  console.log("📐 SHELF: instance created", instance);

  return instance;
}
