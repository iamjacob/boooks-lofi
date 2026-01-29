// ui/panels/ShelvesPanel.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/storage/idb';
import { getShelves } from '@/core/shelves/getShelves';
import { createShelf } from '@/core/shelves/createShelf';
import { Shelf } from '@/core/models/shelf';

export function ShelvesPanel({ userId }: { userId: string }) {
  const adapterRef = useRef<IndexedDBAdapter | null>(null);

  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!adapterRef.current) {
      adapterRef.current = new IndexedDBAdapter();
    }

    const adapter = adapterRef.current;

    async function load() {
      const result = await getShelves(adapter, userId);
      setShelves(result);
    }

    load();
  }, [userId]);

  async function handleCreate() {
    if (!title.trim()) return;

    const adapter = adapterRef.current!;
    const shelf = await createShelf(adapter, userId, title);

    setShelves((prev) => [...prev, shelf]);
    setTitle('');
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h4>Shelves</h4>

      {shelves.length === 0 && <div>No shelves yet</div>}

      <ul>
        {shelves.map((shelf) => (
          <li key={shelf.id}>{shelf.title}</li>
        ))}
      </ul>

      <div style={{ marginTop: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New shelf title"
        />
        <button onClick={handleCreate} style={{ marginLeft: 8 }}>
          Create shelf
        </button>
      </div>
    </div>
  );
}
