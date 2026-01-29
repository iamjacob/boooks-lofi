'use client';

import { useState } from 'react';
import { IndexedDBAdapter } from '@/storage/idb';
import { addBook } from '@/core/library/addBook';

export function AddBookPanel({ userId }: { userId: string }) {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!title) return;

    setLoading(true);
    const adapter = new IndexedDBAdapter();

    await addBook(adapter, userId, {
      title,
      language,
    });

    setTitle('');
    setLoading(false);
  }

  return (
    <div>
      <h4>Add book</h4>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Language"
        value={language}
        onChange={e => setLanguage(e.target.value)}
        style={{ marginLeft: 8 }}
      />

      <button
        onClick={handleAdd}
        disabled={loading}
        style={{ marginLeft: 8 }}
      >
        {loading ? 'Adding…' : 'Add'}
      </button>
    </div>
  );
}
