import { IndexedDBAdapter } from "@/storage/idb";
import { storageKeys } from "@/storage/keys";
import { User } from "@/core/models/user";

export async function getLocalUserByUsername(
  username: string
): Promise<User | null> {
  const adapter = new IndexedDBAdapter();

  const users = (await adapter.get<User[]>(storageKeys.users)) ?? [];

  const needle = username.trim().toLowerCase();

  return (
    users.find((u) => {
      // handle SHOULD exist, but we keep fallback for old records
      const handle = (u as any).handle ?? u.displayName ?? "";
      return String(handle).trim().toLowerCase() === needle;
    }) ?? null
  );
}
