// ui/components/library/BookImageEditor.tsx
"use client";

import { useMemo, useState } from "react";
import type { BookListItem } from "@/ui/models/bookListItem";
import type { BookImageRole } from "@/core/models/bookImage";
import { cacheBookImage } from "@/core/cache/cacheBookImage";
import { upsertImageRole } from "@/ui/lib/upsertImageRole";
import { pickImageUri } from "@/ui/lib/pickImage";
import { ResolvedImage } from "@/ui/components/images/ResolvedImage";

type Props = {
  book: BookListItem;
  onChange: (next: BookListItem) => void;
};

const ROLE_OPTIONS: { label: string; value: BookImageRole }[] = [
  { label: "Cover · Front", value: "cover.front" },
  { label: "Cover · Spine", value: "cover.spine" },
  { label: "Cover · Back", value: "cover.back" },

  { label: "Jacket · Front", value: "jacket.front" },
  { label: "Jacket · Spine", value: "jacket.spine" },
  { label: "Jacket · Back", value: "jacket.back" },
  { label: "Jacket · Flap Front", value: "jacket.flap.front" },
  { label: "Jacket · Flap Back", value: "jacket.flap.back" },
  { label: "Jacket · Full Wrap", value: "jacket.full_wrap" },

  { label: "Custom", value: "custom" },
];

export function BookImageEditor({ book, onChange }: Props) {
  const [role, setRole] = useState<BookImageRole>("cover.front");
  const [busy, setBusy] = useState(false);

  const previewUri = useMemo(() => {
    // Prefer the currently selected role, then fall back to nice defaults
    return pickImageUri(book.images, [
      role,
      "cover.front",
      "jacket.front",
      "marketing.3d",
      "custom",
    ]);
  }, [book.images, role]);

  async function onPickFile(file: File) {
    setBusy(true);
    try {
      const res = await cacheBookImage({
        file,
        bookId: String(book.id),
        role,
      });

      const nextImages = upsertImageRole(book.images, role, res.original);
      onChange({ ...book, images: nextImages });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-xs text-neutral-400">Image role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as BookImageRole)}
          className="bg-neutral-800 rounded px-2 py-1 text-sm"
        >
          {ROLE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-20 aspect-[2/3] rounded bg-neutral-800 overflow-hidden flex items-center justify-center">
          {previewUri ? (
            <ResolvedImage
              uri={previewUri}
              className="w-full h-full object-cover"
              alt=""
            />
          ) : (
            <div className="text-xs text-neutral-500">No image</div>
          )}
        </div>

        <div className="flex-1">
          <label className="block">
            <span className="text-xs text-neutral-400">
              {busy ? "Uploading..." : "Upload image"}
            </span>
            <input
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onPickFile(file);
                e.currentTarget.value = ""; // allow picking same file again
              }}
              className="block w-full text-sm mt-1"
            />
          </label>

          <div className="text-xs text-neutral-500 mt-2">
            Tip: Start with <span className="text-neutral-300">cover.front</span>,
            then spine/back. Jackets/flaps later.
          </div>
        </div>
      </div>
    </div>
  );
}
