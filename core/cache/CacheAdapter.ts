// core/cache/CacheAdapter.ts
import type { BookImageVariant } from "@/core/models/bookImage";

export interface CacheAdapter {
  store(file: File, key: string): Promise<BookImageVariant>;
  get(uri: string): Promise<BookImageVariant | null>;
  delete(uri: string): Promise<void>;
}
