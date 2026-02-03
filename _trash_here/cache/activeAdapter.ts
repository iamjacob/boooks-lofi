// core/cache/activeAdapter.ts

import type { CacheAdapter } from "./CacheAdapter";
import { indexedDbAdapter } from "./adapters/indexedDb.adapter";
import { browserCacheAdapter } from "./adapters/browserCache.adapter";

/**
 * Browser default:
 * - Use IndexedDB when available (persistent)
 * - Fall back to browser object URLs (temporary) if something is off
 */
export const activeCacheAdapter: CacheAdapter =
  typeof indexedDB !== "undefined" ? indexedDbAdapter : browserCacheAdapter;
