// ui/models/bookListItem.ts
import { ID } from "@/core/models/ids/id";
import type { BookImageSet } from "@/core/models/bookImage";

export type BookListItem = {
  id: ID;

  title?: string;
  subtitle?: string;
  authorName?: string;

  images?: BookImageSet;

  pageCount?: number;
};
