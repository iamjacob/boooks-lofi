'use client';

import { useEffect, useState } from 'react';
import { createId } from '@/core/ids/id';
import { userRepo, userBookRepo, shelfRepo, shelfInstanceRepo } from '@/core/repo';
import { setActiveUser, getActiveUser } from '@/core/session/getActiveUser';
import { ensureBookAndAddToLibrary, placeUserBookOnShelf } from '@/core/services';

export default function TestPage() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [userBooks, setUserBooks] = useState<any[]>([]);
  const [shelfId, setShelfId] = useState<any>(null);

  useEffect(() => {
    async function boot() {
      console.clear();
      console.log('=== BOOOKS TEST BOOT ===');

      const userId = createId<'UserID'>();
      const shelfId = createId<'ShelfID'>();

      await userRepo.insert({
        id: userId,
        handle: 'emperor',
        displayName: 'The Emperor',
        mode: 'private',
        defaultShelfId: shelfId,
        isSynced: false,
        createdAt: Date.now(),
      });

      await shelfRepo.insert({
        id: shelfId,
        userId,
        title: 'My First Shelf',
        slug: 'default',
        visibility: 'private',
        isSynced: false,
        createdAt: Date.now(),
      });

      await setActiveUser(userId);
      const active = await getActiveUser();

      setUser(active);
      setShelfId(shelfId);
      setUserBooks(await userBookRepo.getByUser(userId));
    }

    boot();
  }, []);

  async function handleAddBook() {
    if (!user || !title) return;

    const result = await ensureBookAndAddToLibrary(user.id, {
      title,
      authorName: author || undefined,
      language: 'en',
    });

    setTitle('');
    setAuthor('');
    setUserBooks(await userBookRepo.getByUser(user.id));
  }

  async function handlePlace(userBookId: any) {
    await placeUserBookOnShelf(userBookId, shelfId);
    alert('Placed on shelf ✅');
  }

  return (
    <div className="p-6 space-y-4 max-w-md">
      <h1 className="text-xl font-bold">Boooks – Mini App</h1>

      {user && (
        <p className="opacity-70">
          Logged in as <b>{user.displayName}</b>
        </p>
      )}

      <div className="space-y-2">
        <input
          className="w-full border px-2 py-1"
          placeholder="Book title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="w-full border px-2 py-1"
          placeholder="Author (optional)"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <button
          onClick={handleAddBook}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Add book
        </button>
      </div>

      <div>
        <h2 className="font-semibold mt-4">Your Library</h2>
        <ul className="space-y-1">
          {userBooks.map(ub => (
            <li key={ub.id} className="flex justify-between">
              <span>{ub.bookId}</span>
              <button
                onClick={() => handlePlace(ub.id)}
                className="text-sm underline"
              >
                Place on shelf
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

