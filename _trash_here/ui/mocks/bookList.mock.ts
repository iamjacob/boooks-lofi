// ui/mocks/bookList.mock.ts
import { BookListItem } from "@/ui/models/bookListItem";

export const mockBooks: BookListItem[] = [
  {
    id: "1",
    title: "Meditations",
    subtitle: "Thoughts of Marcus Aurelius",
    authorName: "Marcus Aurelius",
    pageCount: 254,
  },
  {
    id: "2",
    title: "The Stranger",
    authorName: "Albert Camus",
    pageCount: 123,
  },
  {
    id: "3",
    title: "Notes from Underground",
    authorName: "Fyodor Dostoevsky",
    pageCount: 187,
  },
];
