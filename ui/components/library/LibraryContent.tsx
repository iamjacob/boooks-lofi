// ui/components/library/LibraryContent.tsx
import { BookListMobile } from "@/ui/components/shelf/BookListMobile";
import { mockBooks } from "@/ui/mocks/bookList.mock";
import { ID } from "@/core/ids/id";

type Props = {
  activeShelfId: ID;
};

export function LibraryContent({ activeShelfId }: Props) {
  // midlertidig "filter"
  const books =
    activeShelfId === "reading"
      ? mockBooks.slice(0, 1)
      : activeShelfId === "finished"
      ? mockBooks.slice(1)
      : mockBooks;

  return (
    <main className="flex-1 overflow-y-auto">
      <BookListMobile books={books} />
    </main>
  );
}
