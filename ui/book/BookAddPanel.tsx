"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBook, createUserBook } from "@/core/library/actions";
import { ReadStatus } from "@/core/models/userBook";

type Props = {
  userId: string;
  onClose: () => void;
};

export function BookAddPanel({ userId, onClose }: Props) {
  const router = useRouter();

  const [draft, setDraft] = useState({
    title: "",
    author: "",
    pages: "",
    status: "unread" as ReadStatus,
  });

  function save() {
    if (!draft.title.trim()) return;

    const bookId = createBook({
      id: crypto.randomUUID(), // global ID for now
      title: draft.title.trim(),
      author: draft.author.trim() || undefined,
      pages: draft.pages ? Number(draft.pages) : undefined,
    });

    const userBookId = createUserBook({
      userId,
      bookId,
      status: draft.status,
    });

    onClose();
    router.push(`/book/${userBookId}`);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center"
      onClick={onClose}
    >
      <div
        className="bg-neutral-950 w-full sm:max-w-md sm:rounded-xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">Add book</h2>

        <input
          className="w-full mb-3 p-2 rounded bg-neutral-900"
          placeholder="Title"
          value={draft.title}
          onChange={(e) =>
            setDraft((d) => ({ ...d, title: e.target.value }))
          }
        />

        <input
          className="w-full mb-3 p-2 rounded bg-neutral-900"
          placeholder="Author"
          value={draft.author}
          onChange={(e) =>
            setDraft((d) => ({ ...d, author: e.target.value }))
          }
        />

        <input
          className="w-full mb-4 p-2 rounded bg-neutral-900"
          placeholder="Pages (optional)"
          type="number"
          value={draft.pages}
          onChange={(e) =>
            setDraft((d) => ({ ...d, pages: e.target.value }))
          }
        />

        {/* READ STATUS */}
        <div className="flex gap-2 mb-4">
          {(["unread", "reading", "finished"] as ReadStatus[]).map(
            (s) => (
              <button
                key={s}
                onClick={() =>
                  setDraft((d) => ({ ...d, status: s }))
                }
                className={`px-3 py-1 rounded-full text-xs ${
                  draft.status === s
                    ? "bg-white text-black"
                    : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {s}
              </button>
            )
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 text-sm text-neutral-400"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={!draft.title.trim()}
            className="px-4 py-2 text-sm bg-white text-black rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
