"use client";

import { useBooksStore } from "../../src/stores/useBooksStore";
import { useAuthorsStore } from "../../src/stores/useAuthorsStore";
import { useBookTitle } from "@hooks/useBookTitle";
import { useAuthorField } from "@hooks/useAuthorField";

export default function DebugPage() {
  const upsertBook = useBooksStore((s) => s.upsertBook);
  const upsertAuthor = useAuthorsStore((s) => s.upsertAuthor);

  const bookId = "debug-book-1";
  const authorId = "debug-author-1";

  const bookTitle = useBookTitle(bookId);
  const authorName = useAuthorField(
    authorId,
    (a) => a?.name ?? "No author yet"
  );

  return (
    <div style={{ padding: 24 }}>
      <h1>Debug Page</h1>

      <button
        onClick={() => {
          upsertAuthor({
            id: authorId,
            source: "draft",
            name: "Debug Author",
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });

          upsertBook({
            id: bookId,
            source: "draft",
            title: "Debug Book",
            authorIds: [authorId],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });
        }}
        style={{ marginBottom: 16 }}
      >
        Add Book + Author
      </button>

      <div>
        <strong>Book title:</strong> {bookTitle || "—"}
      </div>

      <div>
        <strong>Author name:</strong> {authorName}
      </div>
    </div>
  );
}
