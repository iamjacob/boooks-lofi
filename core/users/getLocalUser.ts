import { IndexedDBAdapter } from "@/storage/idb";
import { storageKeys } from "@/storage/keys";
import { User } from "@/core/models/user";

export async function getLocalUserByUsername(
  rawUsername: string
): Promise<User | null> {
  const adapter = new IndexedDBAdapter();

  const users =
    (await adapter.get<User[]>(storageKeys.users)) ?? [];

  const needle = rawUsername
    .toLowerCase()
    .replace(/^@/, "")
    .trim();

  console.log("🔎 LOOKUP NEEDLE", needle);
  console.log(
    "🔎 HANDLES",
    users.map((u) => u.handle)
  );

  const found =
    users.find(
      (u) => u.handle.toLowerCase().trim() === needle
    ) ?? null;

  console.log("🔍 USER LOOKUP RESULT", found);

  return found;
}

