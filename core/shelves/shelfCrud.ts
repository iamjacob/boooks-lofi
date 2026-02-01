import { ID } from "@/core/ids/id";
import { Shelf } from "@/core/models/shelf";
import { IndexedDBAdapter } from "@/storage/idb";
import { storageKeys } from "@/storage/keys";

export async function loadShelves(userId: ID): Promise<Shelf[]> {
  const adapter = new IndexedDBAdapter();
  return (
    (await adapter.get<Shelf[]>(
      storageKeys.shelves(userId)
    )) ?? []
  );
}

export async function createShelf(
  userId: ID,
  title: string
): Promise<Shelf> {
  const adapter = new IndexedDBAdapter();
  const shelves = await loadShelves(userId);

  const shelf: Shelf = {
    id: crypto.randomUUID(),
    ownerId: userId,
    title,
    slug: title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-"),
    visibility: "private",
    createdAt: Date.now(),
    isSynced:false,
  };

  shelves.push(shelf);

  await adapter.set(
    storageKeys.shelves(userId),
    shelves
  );

  console.log("📐 SHELF: created", shelf);

  return shelf;
}
