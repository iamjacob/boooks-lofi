// ui/components/library/LibraryContent.tsx
import { BookListMobile } from "@/ui/components/shelf/BookListMobile";
import { BookListItem } from "@/ui/models/bookListItem";
import { ID } from "@/core/ids/id";

type Props = {
  activeShelfId: ID;
  books: BookListItem[];
  onDeleteBook: (id: ID) => void;
};

export function LibraryContent({
  activeShelfId,
  books,
  onDeleteBook,
}: Props) {
  return (
    <main className="flex-1 overflow-y-auto">
      <BookListMobile
        books={books}
        onSelect={(id) => onDeleteBook(id)}
      />
    </main>
  );
}
