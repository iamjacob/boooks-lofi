// core/cache/adapters/browserCache.adapter.ts

import type { CacheAdapter } from "../CacheAdapter";
import type { BookImageVariant } from "@/core/models/bookImage";

export const browserCacheAdapter: CacheAdapter = {
  async store(file: File, key: string): Promise<BookImageVariant> {
    const uri = URL.createObjectURL(file);

    return {
      uri,
      status: "local",
      source: "file",
      capturedAt: Date.now(),
    };
  },

  async get(uri: string): Promise<BookImageVariant | null> {
    // browser object URLs are assumed valid if referenced
    return {
      uri,
      status: "local",
    };
  },

  async delete(uri: string): Promise<void> {
    // cleanup browser memory
    URL.revokeObjectURL(uri);
  },
};
