// core/ids/id.ts

export type ID = string;

/**
 * Generate a lexicographically sortable, offline-safe ID (ULID-like).
 * No crypto, no dependencies, works everywhere.
 */
export function createId(): ID {
  const time = Date.now().toString(36).padStart(8, '0');

  let random = '';
  for (let i = 0; i < 16; i++) {
    random += Math.floor(Math.random() * 36).toString(36);
  }

  return `${time}${random}`.toUpperCase();
}
