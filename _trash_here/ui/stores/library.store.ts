import { ID } from '@/core/ids/id';

type LibraryActions = {
  openCreateBook: () => void;
  openEditBook: (bookId: ID) => void;
  closeEditor: () => void;
};
