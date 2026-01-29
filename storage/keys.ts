// storage/keys.ts

export const storageKeys = {
  // global (device-wide)
  device: 'device',
  users: 'users',
  activeUserId: 'activeUserId',

  // per-user collections (scoped via StorageScope)
  sessions: () => 'sessions',
  shelves: () => 'shelves',
  books: () => 'books',
  history: () => 'history',
  clips: () => 'clips',
  tags: () => 'tags',
  assets: () => 'assets',
  categories: () => 'categories',
  tgd: () => 'tgd',
  collections: () => 'collections',




  // single entities
  book: (bookId: string) => `books:${bookId}`,
};
