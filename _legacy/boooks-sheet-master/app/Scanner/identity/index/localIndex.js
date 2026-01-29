// /identity/index/localIndex.js
export function createLocalIndex() {
  const byIsbn = new Map();     // isbn -> book
  const byCoverHash = new Map(); // hash -> [bookIds]
  const bySpineHash = new Map(); // hash -> [bookIds]
  const books = new Map();      // id -> book

  return {
    putBook(book) {
      books.set(book.id, book);
      if (book.isbn) byIsbn.set(book.isbn, book);

      if (book.coverHash) {
        const arr = byCoverHash.get(book.coverHash) || [];
        arr.push(book.id);
        byCoverHash.set(book.coverHash, arr);
      }

      if (book.spineHash) {
        const arr = bySpineHash.get(book.spineHash) || [];
        arr.push(book.id);
        bySpineHash.set(book.spineHash, arr);
      }
    },

    getByIsbn(isbn) {
      return byIsbn.get(isbn) || null;
    },

    // For aHash we need “nearest”, not exact. v1: scan all hashes (ok for small DB).
    // Later: BK-tree / LSH buckets.
    findNearestCoverHash(hash, maxDist = 10) {
      let best = null;
      for (const book of books.values()) {
        if (!book.coverHash) continue;
        // caller computes hamming; keep index minimal
        // we’ll do it in identifyBook for flexibility
      }
      return best;
    },

    listBooks() {
      return Array.from(books.values());
    },
  };
}
