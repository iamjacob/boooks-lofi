"use client";

import { useEffect, useState } from "react";
import { BookListItem } from "@/ui/models/bookListItem";
import { BookImageEditor } from "./BookImageEditor";

type Props = {
  book: BookListItem;
  onSave: (book: BookListItem) => void;
  onCancel: () => void;
};

export function BookEditor({ book, onSave, onCancel }: Props) {
  // 🧠 LOCAL DRAFT STATE
  const [draft, setDraft] = useState<BookListItem>(book);

  // If a different book is opened, reset draft
  useEffect(() => {
    setDraft(book);
  }, [book.id]);

  function update(patch: Partial<BookListItem>) {
    setDraft((d) => ({ ...d, ...patch }));
  }

  function save() {
    onSave(draft); // 💾 COMMIT ONCE
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-4">
      <div
        className="bg-neutral-900 rounded-lg p-4 max-w-md mx-auto space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">
          {draft.title ? "Edit book" : "Add book"}
        </h2>

        <input
          className="w-full bg-neutral-800 p-2 rounded"
          placeholder="Title"
          value={draft.title ?? ""}
          onChange={(e) => update({ title: e.target.value })}
        />

        <input
          className="w-full bg-neutral-800 p-2 rounded"
          placeholder="Author"
          value={draft.authorName ?? ""}
          onChange={(e) => update({ authorName: e.target.value })}
        />

        <BookImageEditor book={draft} onChange={setDraft} />

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-neutral-400"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={!draft.title?.trim()}
            className="px-3 py-1.5 bg-white text-black rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
