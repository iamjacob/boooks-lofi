"use client";

import { BookListItem } from "@/ui/models/bookListItem";
import { BookImageEditor } from "./BookImageEditor";

type Props = {
  book: BookListItem;
  onSave: (book: BookListItem) => void;
  onCancel: () => void;
};

export function BookEditor({ book, onSave, onCancel }: Props) {
  function update(patch: Partial<BookListItem>) {
    onSave({ ...book, ...patch });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-4">
      <div
        className="bg-neutral-900 rounded-lg p-4 max-w-md mx-auto space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">
          {book.title ? "Edit book" : "Add book"}
        </h2>

        <input
          className="w-full bg-neutral-800 p-2 rounded"
          placeholder="Title"
          value={book.title ?? ""}
          onChange={(e) => update({ title: e.target.value })}
        />

        <input
          className="w-full bg-neutral-800 p-2 rounded"
          placeholder="Author"
          value={book.authorName ?? ""}
          onChange={(e) => update({ authorName: e.target.value })}
        />

        <BookImageEditor book={book} onChange={onSave} />

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-neutral-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(book)}
            disabled={!book.title?.trim()}
            className="px-3 py-1.5 bg-white text-black rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
