export function toHandle(input: string) {
  // super LO-FI slugify (no packages)
  return input
    .trim()
    .toLowerCase()
    .replace(/@/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24);
}
