import { ID } from '@/core/ids/id';

export interface Collection {
  id: ID;

  shelfId: ID;
  title: string;

  bookIds: ID[];

  createdAt: number;
}
