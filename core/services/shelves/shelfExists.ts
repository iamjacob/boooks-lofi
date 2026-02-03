import { loadShelves } from "@/_trash_here/db/libraryDb";
import { ID } from "@/core/models/ids/id";

/**
 * Check if a shelf exists for a user by SLUG (routing segment).
 */
export async function shelfExists(
  userId: ID,
  shelfSlug: string
): Promise<boolean> {
  const shelves = await loadShelves(userId);
  return shelves.some((s) => s.slug === shelfSlug);
}
