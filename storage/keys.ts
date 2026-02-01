export const storageKeys = {
  // ─────────────────────────────
  // GLOBAL (device-wide)
  // ─────────────────────────────
  device: 'device',
  users: 'users',
  activeUserId: 'activeUserId',

  /** Global canonical books (shared conceptually) */
  books: 'books',

  // ─────────────────────────────
  // PER-USER (scoped via StorageScope)
  // ─────────────────────────────
  sessions: () => 'sessions',
  // shelves: () => 'shelves',
  history: () => 'history',
  clips: () => 'clips',
  tags: () => 'tags',
  assets: () => 'assets',
  categories: () => 'categories',
  tgd: () => 'tgd',
  collections: () => 'collections',

  /** User ↔ Book relationship (Library) */
  userBooks: (userId: string) => `userBooks:${userId}`,
shelves: (userId: string) => `user:${userId}:shelves`,


  /** Shelf projections (expressions) */
  shelfInstances: (userId: string) =>
  `user:${userId}:shelfInstances`,


  // ─────────────────────────────
  // OPTIONAL: single-entity helpers
  // (use later if you want)
  // ─────────────────────────────
  bookById: (bookId: string) => `book:${bookId}`,
};
