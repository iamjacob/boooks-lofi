// ui/lib/pickImage.ts
import type {
  BookImageSet,
  BookImageRole,
  ImageSize,
} from "@/core/models/bookImage";

/**
 * NEVER FAILS:
 * - returns best possible uri
 * - falls back to original
 */
export function pickImageUri(
  images: BookImageSet | undefined,
  rolesToTry: BookImageRole[],
  preferredSizes: ImageSize[] = ["xs", "small", "medium", "large"]
): string | undefined {
  if (!images) return;

  for (const role of rolesToTry) {
    const entry = images.roles?.[role];
    if (!entry) continue;

    // 1️⃣ Preferred size
    if (
      entry.preferredSize &&
      entry.variants?.[entry.preferredSize]?.uri
    ) {
      return entry.variants[entry.preferredSize]!.uri;
    }

    // 2️⃣ Any available LOD
    for (const size of preferredSizes) {
      const v = entry.variants?.[size];
      if (v?.uri) return v.uri;
    }

    // 3️⃣ FALLBACK — ORIGINAL (ALWAYS EXISTS)
    if (entry.original?.uri) {
      return entry.original.uri;
    }
  }
}
