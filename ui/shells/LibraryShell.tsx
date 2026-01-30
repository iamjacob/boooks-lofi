// ui/shells/LibraryShell.tsx
"use client";

import { useState } from "react";
import { LibraryHeader } from "@/ui/components/library/LibraryHeader";
import { ShelfSwitcher } from "@/ui/components/library/ShelfSwitcher";
import { LibraryContent } from "@/ui/components/library/LibraryContent";
import { mockShelves } from "@/ui/mocks/shelves.mock";
import { ID } from "@/core/ids/id";

export function LibraryShell() {
  const [activeShelfId, setActiveShelfId] = useState<ID>(
    mockShelves[0].id
  );

  return (
    <div className="h-full flex flex-col">
      <LibraryHeader />

      <ShelfSwitcher
        shelves={mockShelves}
        activeShelfId={activeShelfId}
        onSelectShelf={setActiveShelfId}
      />

      <LibraryContent activeShelfId={activeShelfId} />
    </div>
  );
}
