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
      const handle = u.handle || "";
      return handle.toLowerCase() === needle;
    }) ?? null
  );
}
