/**
 * Generate a safe public handle for routing (@username)
 * LO-FI, no deps, deterministic
 */
export function toHandle(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24);
}
