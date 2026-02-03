import { loadCollections } from "@/_trash_here/db/libraryDb";
import { ID } from "@/core/ids/id";

export async function collectionExists(
  userId: ID,
  shelfId: ID,
  collectionId: string
): Promise<boolean> {
  const collections = await loadCollections(userId, shelfId);
  return collections.some((c) => c.id === collectionId);
}
