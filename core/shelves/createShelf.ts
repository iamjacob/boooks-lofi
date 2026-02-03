import { createId } from "@/core/ids/id";
import { StorageAdapter } from "@/storage/adapter";
import { storageKeys } from "@/storage/keys";
import { Shelf } from "@/core/models/shelf";
import { logEvent } from "@/_trash_here/history/logEvent";

/**
 * Create a new shelf for a user.
 * Slug is derived from title and must be unique per user.
 */
export async function createShelf(
  adapter: StorageAdapter,
  userId: string,
  title: string
): Promise<Shelf> {
  const shelves =
    (await adapter.get<Shelf[]>(storageKeys.shelves(), {
      type: "user",
      userId,
    })) ?? [];

  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // ensure slug uniqueness per user
  let slug = baseSlug;
  let i = 1;
  while (shelves.some((s) => s.slug === slug)) {
    slug = `${baseSlug}-${i++}`;
  }

  const shelf: Shelf = {
    id: `shelf_${createId()}`,
    ownerId: userId,

    title,
    slug, // ✅ ROUTING USES THIS

    visibility: "private",

    settings: {
      layout: "spatial",
      theme: "bw",
      showCovers: true,
    },

    books: 0,
    createdAt: Date.now(),
  };

  shelves.push(shelf);

  await adapter.set(storageKeys.shelves(), shelves, {
    type: "user",
    userId,
  });

  await logEvent(adapter, userId, "shelf.created", {
    shelfId: shelf.id,
    slug: shelf.slug,
    title: shelf.title,
  });

  return shelf;
}
