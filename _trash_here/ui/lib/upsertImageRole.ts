// ui/lib/upsertImageRole.ts
import type {
  BookImageSet,
  BookImageRole,
  BookImageVariant,
} from "@/core/models/bookImage";

export function upsertImageRole(
  images: BookImageSet | undefined,
  role: BookImageRole,
  original: BookImageVariant
): BookImageSet {
  const now = Date.now();

  const set: BookImageSet =
    images ?? {
      id: crypto.randomUUID(),
      roles: {},
      version: 1,
    };

  return {
    ...set,
    roles: {
      ...set.roles,
      [role]: {
        original,
        variants: set.roles[role]?.variants,
        preferredSize: set.roles[role]?.preferredSize,
        updatedAt: now,
      },
    },
  };
}
