// ui/models/bookListItem.ts
import { ID } from "@/core/ids/id";
import { BookImageSet } from "./bookImage";

export type BookListItem = {
  id: ID;

  title?: string;
  subtitle?: string;
  authorName?: string;

  images?: BookImageSet;

  pageCount?: number;
};
