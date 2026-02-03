import { loadUserBooks } from "@/_trash_here/db/libraryDb";

/**
 * LO-FI user existence check.
 * A user exists if we have any local UserBooks.
 * (Later: add online public profile lookup)
 */
export async function userExistsOffline(
  username: string
): Promise<boolean> {
  const userBooks = await loadUserBooks();
  return userBooks.length > 0;
}
