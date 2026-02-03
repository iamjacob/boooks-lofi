import { activeCacheAdapter } from "./activeAdapter";
import { generateLodVariants } from "@/core/lib/image/generateLod";
import type { BookImageRole } from "@/core/models/bookImage";

export async function cacheBookImage({
  file,
  bookId,
  role,
}: {
  file: File;
  bookId: string;
  role: BookImageRole;
}) {
  const baseKey = `books/${bookId}/${role}`;

  // 1️⃣ store original
  const original = await activeCacheAdapter.store(file, `${baseKey}/original`);

  // 2️⃣ async LOD generation (fire & forget)
  generateLodVariants(file).then(async (variants) => {
    for (const [size, blob] of Object.entries(variants)) {
      await activeCacheAdapter.store(
        new File([blob], `${size}.webp`, { type: "image/webp" }),
        `${baseKey}/${size}`
      );
    }
  });

  return { original };
}
