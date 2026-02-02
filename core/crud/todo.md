dev/
└─ crud-test.html

core/
└─ crud/
   ├─ book/
   │  ├─ createBook.ts
   │  ├─ loadBooks.ts
   │  ├─ updateBook.ts
   │  ├─ deleteBook.ts
   │  └─ index.ts
   │
   ├─ userBook/
   │  ├─ createUserBook.ts
   │  ├─ loadUserBooks.ts
   │  ├─ updateUserBook.ts
   │  ├─ setReadingStatus.ts
   │  ├─ assignLibraryGroup.ts
   │  ├─ assignShelf.ts
   │  └─ index.ts
   │
   ├─ shelf/
   │  ├─ createShelf.ts
   │  ├─ loadShelves.ts
   │  ├─ updateShelf.ts
   │  ├─ deleteShelf.ts
   │  └─ index.ts
   │
   ├─ shelfInstance/
   │  ├─ createShelfInstance.ts
   │  ├─ loadShelfInstances.ts
   │  ├─ updateShelfInstance.ts
   │  ├─ deleteShelfInstance.ts
   │  └─ index.ts
   │
   ├─ libraryGroup/
   │  ├─ createLibraryGroup.ts
   │  ├─ loadLibraryGroups.ts
   │  ├─ assignUserBookToGroup.ts
   │  ├─ removeUserBookFromGroup.ts
   │  └─ index.ts
   │
   ├─ shelfGroup/
   │  ├─ createShelfGroup.ts
   │  ├─ loadShelfGroups.ts
   │  ├─ assignShelfInstanceToGroup.ts
   │  ├─ moveShelfGroup.ts
   │  └─ index.ts
   │
   ├─ collection/
   │  ├─ createCollection.ts
   │  ├─ loadCollections.ts
   │  ├─ updateCollection.ts
   │  ├─ deleteCollection.ts
   │  └─ index.ts
   │
   ├─ collectionItem/
   │  ├─ createCollectionItem.ts
   │  ├─ loadCollectionItems.ts
   │  ├─ updateCollectionItem.ts
   │  ├─ deleteCollectionItem.ts
   │  └─ index.ts
   │
   └─ index.ts   ← optional barrel (kun re-exports)

core/
└─ services/
   ├─ addBookToShelf.ts
   ├─ moveBookBetweenShelves.ts
   ├─ addBookToCollection.ts
   └─ …



📦 Hvad et CRUD-modul må gøre

Et CRUD-modul:

✅ læser/skriver via IndexedDBAdapter

✅ bruger kun:

storageKeys

egne modeller

✅ logger ALT (din debug-regel)

✅ er deterministisk

✅ er testbar uden UI






Book (global, canonical)
   ↓
BlockchainEntry (global, shared, slow, authoritative)
   ↓
UserBook (local, fast, offline-first, mutable)
