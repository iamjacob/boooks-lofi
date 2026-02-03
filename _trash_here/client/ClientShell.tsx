"use client";

import { LibraryShell } from "@/ui/shells/LibraryShell";

function normalizeUsername(raw: string) {
  return raw.startsWith("@") ? raw.slice(1) : raw;
}

export default function ClientApp({
  username,
  shelf,
  collection,
}: {
  username: string;
  shelf: string;
  collection: string | null;
}) {
  const normalizedUsername = normalizeUsername(username);

  return (
    <LibraryShell
      username={normalizedUsername}
      shelf={shelf}
      collection={collection}
    />
  );
}
