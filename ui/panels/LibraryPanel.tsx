'use client';

import { useEffect, useState } from 'react';
import { IndexedDBAdapter } from '@/storage/idb';
import { storageKeys } from '@/storage/keys';
import { UserBook } from '@/core/models/userBook';

import { Shelf } from '@/core/models/shelf';
import { addBookToShelf } from '@/core/shelves/addBookToShelf';


export function LibraryPanel({ userId }: { userId: string }) {
  const [books, setBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(false);

const [shelves, setShelves] = useState<Shelf[]>([]);
const [selectedShelfId, setSelectedShelfId] = useState<string>('');

async function handleAddToShelf(userBookId: string) {
  if (!selectedShelfId) return;

  const adapter = new IndexedDBAdapter();

  await addBookToShelf(adapter, userId, {
    userBookId,
    shelfId: selectedShelfId,
  });

  alert('Added to shelf');
}


 async function loadLibrary() {
  setLoading(true);
  const adapter = new IndexedDBAdapter();

  // 1️⃣ Load UserBooks (library)
  const userBooks =
    (await adapter.get<UserBook[]>(
      storageKeys.userBooks(),
      { type: 'user', userId }
    )) ?? [];

  // 2️⃣ Load Shelves (PER USER)
  const shelvesList =
    (await adapter.get<Shelf[]>(
      storageKeys.shelves(),
      { type: 'user', userId }
    )) ?? [];

  setBooks(userBooks);
  setShelves(shelvesList);
  setLoading(false);
  console.log('Shelves loaded:', shelvesList);

}


  useEffect(() => {
    loadLibrary();
  }, [userId]);

  
  return (
    <div className="panel">
      <h4>Library</h4>

      <button onClick={loadLibrary} disabled={loading}>
        {loading ? 'Loading…' : 'Reload library'}
      </button>

      {books.length === 0 && !loading && (
        <div style={{ marginTop: 8 }}>
          No books in library yet
        </div>
      )}

      <ul style={{ marginTop: 12 }}>
        {books.map(b => (
          <li key={b.id} style={{ marginBottom: 12 }}>
            <div>
              <strong>UserBook</strong>: {b.id}
            </div>

            <div>
              <code>bookId:</code> {b.bookId}
            </div>

            <div>
              <code>library position:</code>{' '}
              [{b.libraryPlacement.position.join(', ')}]
            </div>

            <div>
              <code>library rotation:</code>{' '}
              [{b.libraryPlacement.rotation.join(', ')}]
            </div>

            <div>
              <code>created:</code>{' '}
              {new Date(b.createdAt).toLocaleString()}
            </div>
            <div style={{ marginTop: 6 }}>
  <select
    value={selectedShelfId}
    onChange={e => setSelectedShelfId(e.target.value)}
  >
    <option value="">Select shelf</option>
    {shelves.map(s => (
      <option key={s.id} value={s.id}>
        {s.title}
      </option>
    ))}
  </select>

  <button
    style={{ marginLeft: 6 }}
    onClick={() => handleAddToShelf(b.id)}
  >
    Add to shelf
  </button>
</div>

          </li>
        ))}
      </ul>
      <button onClick={loadLibrary}>
  Reload library & shelves
</button>

    </div>
  );
}
