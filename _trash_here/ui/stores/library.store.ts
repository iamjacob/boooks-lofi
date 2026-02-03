import { ID } from '@/core/models/ids/id';

type LibraryActions = {
  openCreateBook: () => void;
  openEditBook: (bookId: ID) => void;
  closeEditor: () => void;
};
