"use client";

import LibraryShell from "@/ui/shells/LibraryShell";
import { decodeUsernameFromUrl } from "@/_trash_here/routing/username";
import { userExistsOffline } from "@/core/users/userExists";

export default function ClientApp({
  rawUsername,
  shelf,
  collection,
}: {
  rawUsername: string;
  shelf: string;
  collection: string | null;
}) {
  // 🔑 ÉN GANG
  const { username, hasAt } = decodeUsernameFromUrl(rawUsername);

  // UX rule: must use @
  if (!hasAt) {
    return (
      <div style={{ padding: 24 }}>
        <h1>@{username}</h1>
        <p>Please use <code>@{username}</code> in the URL.</p>
      </div>
    );
  }

  return (
    <LibraryShell
      username={username}   // ← ALT HERFRA ER "jacob"
      shelf={shelf}
      // collection={collection}
    />
  );
}
