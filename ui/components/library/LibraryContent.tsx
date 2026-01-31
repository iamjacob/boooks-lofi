import { BookListMobile } from "@/ui/components/shelf/BookListMobile";
import { BookListItem } from "@/ui/models/bookListItem";
import { UserBook } from "@/core/models/userBook";

type Props = {
  books: BookListItem[];
  userBooks: UserBook[];
  onSelectBook: (id: string) => void;
  onSetReadingStatus: (
    bookId: string,
    status: UserBook["readingStatus"]
  ) => void;
};

export function LibraryContent({
  books,
  userBooks,
  onSelectBook,
  onSetReadingStatus,
}: Props) {
  return (
    <main className="flex-1 overflow-y-auto">
      <BookListMobile
        books={books}
        // userBooks={userBooks}
        onSelect={onSelectBook}
        // onSetReadingStatus={onSetReadingStatus}
      />
    </main>
  );
}
