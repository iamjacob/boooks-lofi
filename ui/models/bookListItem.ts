// ui/models/bookListItem.ts
import { ID } from '@/core/ids/id';

export type BookListItem = {
  id: ID;

  title?: string;
  subtitle?: string;

  authorName?: string;
  coverUrl?: string;
  pageCount?: number;
};
