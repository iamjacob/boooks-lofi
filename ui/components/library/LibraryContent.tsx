import { BookListMobile } from "@/ui/components/shelf/BookListMobile";
import { BookListItem } from "@/ui/models/bookListItem";
import { ID } from "@/core/ids/id";

type Props = {
  books: BookListItem[];
  onSelectBook: (id: ID) => void;
};

export function LibraryContent({ books, onSelectBook }: Props) {
  return (
    <main className="flex-1 overflow-y-auto">
      <BookListMobile books={books} onSelect={onSelectBook} />
    </main>
  );
}
