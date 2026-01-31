"use client";

import { LibraryShell } from "@/ui/shells/LibraryShell";
import {
  decodeUsernameFromUrl,
} from "@/core/routing/username";

export default function ClientApp({
  username: rawUsername,
  shelf,
  collection,
}: {
  username: string;
  shelf: string;
  collection: string | null;
}) {
  const { username, hasAt } = decodeUsernameFromUrl(rawUsername);

  // Enforce UX contract: must use @ in URL
  if (!hasAt) {
    return (
      <div style={{ padding: 24 }}>
        <h1>@{username}</h1>
        <p style={{ opacity: 0.6 }}>
          Please use <code>@{username}</code> in the URL.
        </p>
      </div>
    );
  }

  return (
    <LibraryShell
      username={username}
      shelf={shelf}
      collection={collection}
    />
  );
}
