// import { normalizeUsername } from "@/core/domain/username";

/**
 * Server-side user existence check.
 * NOT used yet – reserved for online mode.
 */
export async function fetchUserServer(rawUsername: string) {
  // const { username } = normalizeUsername(rawUsername);

  // FUTURE:
  // const user = await db.users.findByUsername(username)
  // return user ?? null

  return null;
}
