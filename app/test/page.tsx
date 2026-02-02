'use client';

import { useEffect, useMemo, useState } from 'react';

import { createId } from '@/core/ids/id';
import {
  userRepo,
  shelfRepo,
  userBookRepo,
  shelfInstanceRepo,
  bookRepo,
} from '@/core/repo';

import { setActiveUser, getActiveUser } from '@/core/session/getActiveUser';

import {
  createDefaultShelfForUser,
  createShelf,
  updateShelf,
  deleteShelfWithInstances,
  ensureBookAndAddToLibrary,
  placeUserBookOnShelf,
  removeUserBook,
} from '@/core/services';

export default function TestPage() {
  const [user, setUser] = useState<any>(null);

  // shelves
  const [shelves, setShelves] = useState<any[]>([]);
  const [activeShelfId, setActiveShelfId] = useState<any>(null);
  const [targetShelfId, setTargetShelfId] = useState<any>(null);

  // data
  const [books, setBooks] = useState<any[]>([]);
  const [userBooks, setUserBooks] = useState<any[]>([]);
  const [instances, setInstances] = useState<any[]>([]);
  const [allInstances, setAllInstances] = useState<any[]>([]);

  // inputs
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [newShelfTitle, setNewShelfTitle] = useState('');

  // edit shelf
  const [editingShelfId, setEditingShelfId] = useState<any>(null);
  const [editingTitle, setEditingTitle] = useState('');

  // --------------------------------------------------
  // helpers
  // --------------------------------------------------
  const booksById = useMemo(
    () => new Map(books.map(b => [b.id, b])),
    [books]
  );

  const userBooksById = useMemo(
    () => new Map(userBooks.map(ub => [ub.id, ub])),
    [userBooks]
  );

  function bookTitleByBookId(bookId: any) {
    return booksById.get(bookId)?.title ?? String(bookId);
  }

  function bookTitleByUserBookId(userBookId: any) {
    const ub = userBooksById.get(userBookId);
    return ub ? bookTitleByBookId(ub.bookId) : String(userBookId);
  }

  function getInstancesForShelf(shelfId: any) {
    return allInstances.filter(i => i.shelfId === shelfId);
  }

  // --------------------------------------------------
  // boot
  // --------------------------------------------------
  useEffect(() => {
    async function boot() {
      console.clear();

      const userId = createId<'UserID'>();

      await userRepo.insert({
        id: userId,
        handle: 'emperor',
        displayName: 'The Emperor',
        mode: 'private',
        isSynced: false,
        createdAt: Date.now(),
      });

      await setActiveUser(userId);
      const activeUser = await getActiveUser();

      const homeShelf = await createDefaultShelfForUser(userId);

      const updatedUser = {
        ...activeUser,
        defaultShelfId: homeShelf.id,
      };

      await userRepo.update(updatedUser);
      await setActiveUser(updatedUser.id);
      setUser(updatedUser);

      const loadedShelves = await shelfRepo.getByOwner(updatedUser.id);
      setShelves(loadedShelves);
      setActiveShelfId(homeShelf.id);
      setTargetShelfId(homeShelf.id);

      await refresh(homeShelf.id);
    }

    boot();
  }, []);

  // --------------------------------------------------
  // refresh
  // --------------------------------------------------
  async function refresh(nextShelfId?: any) {
    if (!user) return;

    const shelfId = nextShelfId ?? activeShelfId;

    setShelves(await shelfRepo.getByOwner(user.id));
    setBooks(await bookRepo.getAll());
    setUserBooks(await userBookRepo.getByUser(user.id));

    const all = await shelfInstanceRepo.getAll();
    setAllInstances(all);

    if (shelfId) {
      setInstances(all.filter(i => i.shelfId === shelfId));
    }
  }

  // --------------------------------------------------
  // book actions
  // --------------------------------------------------
  async function handleAddBook() {
    if (!user || !title) return;

    try {
      await ensureBookAndAddToLibrary(user.id, {
        title,
        authorName: author || undefined,
        language: 'en',
      });
    } catch (err: any) {
      alert(err.message);
    }

    setTitle('');
    setAuthor('');
    await refresh();
  }

  async function handlePlace(userBookId: any) {
    const shelf = shelves.find(s => s.id === targetShelfId);
    if (!shelf || shelf.ownerId !== user.id) {
      alert('Invalid shelf');
      return;
    }

    await placeUserBookOnShelf(userBookId, targetShelfId);
    setActiveShelfId(targetShelfId);
    await refresh(targetShelfId);
  }

  async function handleRemoveFromShelf(instanceId: any) {
    await shelfInstanceRepo.delete(instanceId);
    await refresh();
  }

  async function handleRemoveUserBook(userBookId: any) {
    await removeUserBook(userBookId);
    await refresh();
  }

  // --------------------------------------------------
  // shelf actions
  // --------------------------------------------------
  async function handleCreateShelf() {
    if (!user || !newShelfTitle) return;

    await createShelf(user.id, {
      title: newShelfTitle,
      visibility: 'private',
    });

    setNewShelfTitle('');
    await refresh();
  }

  function startEditShelf(shelf: any) {
    setEditingShelfId(shelf.id);
    setEditingTitle(shelf.title);
  }

  async function saveShelfName(shelf: any) {
    await updateShelf({
      ...shelf,
      title: editingTitle,
      slug: editingTitle.toLowerCase().replace(/\s+/g, '-'),
    });

    setEditingShelfId(null);
    setEditingTitle('');
    await refresh();
  }

  async function handleDeleteShelf(shelf: any) {
    if (shelf.slug === 'home') {
      alert('Home shelf cannot be deleted');
      return;
    }

    await deleteShelfWithInstances(shelf.id, user.id);
    await refresh(user.defaultShelfId);
    setActiveShelfId(user.defaultShelfId);
    setTargetShelfId(user.defaultShelfId);
  }

  // --------------------------------------------------
  // render
  // --------------------------------------------------
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Boooks – Full Test Page</h1>

      {/* CREATE SHELF */}
      <div>
        <input
          className="border px-2 py-1 mr-2"
          placeholder="New shelf"
          value={newShelfTitle}
          onChange={e => setNewShelfTitle(e.target.value)}
        />
        <button
          onClick={handleCreateShelf}
          className="bg-black text-white px-3 py-1"
        >
          Create Shelf
        </button>
      </div>

      {/* SHELVES */}
      <div>
        <h2 className="font-semibold">Shelves</h2>
        <ul>
          {shelves.map(shelf => (
            <li key={shelf.id} className="flex justify-between">
              {editingShelfId === shelf.id ? (
                <input
                  value={editingTitle}
                  onChange={e => setEditingTitle(e.target.value)}
                  onBlur={() => saveShelfName(shelf)}
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => {
                    setActiveShelfId(shelf.id);
                    setTargetShelfId(shelf.id);
                    setInstances(
                      allInstances.filter(i => i.shelfId === shelf.id)
                    );
                  }}
                  onDoubleClick={() => startEditShelf(shelf)}
                  className="cursor-pointer"
                >
                  {shelf.title}
                </span>
              )}

              <button
                className="text-xs text-red-600"
                onClick={() => handleDeleteShelf(shelf)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* CREATE BOOK */}
      <div>
        <input
          className="border px-2 py-1 mr-2"
          placeholder="Book title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="border px-2 py-1 mr-2"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <button
          onClick={handleAddBook}
          className="bg-black text-white px-3 py-1"
        >
          Add Book
        </button>
      </div>

      {/* TARGET SHELF */}
      <select
        className="border px-2 py-1"
        value={targetShelfId ?? ''}
        onChange={e => setTargetShelfId(e.target.value)}
      >
        {shelves.map(s => (
          <option key={s.id} value={s.id}>
            {s.title}
          </option>
        ))}
      </select>

      {/* LIBRARY */}
      <div>
        <h2 className="font-semibold">Library</h2>
        <ul>
          {userBooks.map(ub => (
            <li key={ub.id} className="flex justify-between">
              {bookTitleByBookId(ub.bookId)}
              <span>
                <button
                  className="mr-2 underline"
                  onClick={() => handlePlace(ub.id)}
                >
                  Place
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleRemoveUserBook(ub.id)}
                >
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ACTIVE SHELF */}
      <div>
        <h2 className="font-semibold">Active Shelf</h2>
        <ul>
          {instances.map(i => (
            <li key={i.id} className="flex justify-between">
              {bookTitleByUserBookId(i.userBookId)}
              <button
                className="text-red-600"
                onClick={() => handleRemoveFromShelf(i.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ALL SHELVES OVERVIEW */}
      <div className="border-t pt-4">
        <h2 className="font-semibold text-lg">All Shelves Overview</h2>

        {shelves.map(shelf => {
          const shelfItems = getInstancesForShelf(shelf.id);

          return (
            <div key={shelf.id} className="border p-2 mt-2">
              <h3 className="font-semibold">
                {shelf.title} ({shelfItems.length})
              </h3>

              {shelfItems.length === 0 ? (
                <p className="opacity-60 text-sm">Empty</p>
              ) : (
                <ul>
                  {shelfItems.map(i => (
                    <li key={i.id} className="flex justify-between">
                      {bookTitleByUserBookId(i.userBookId)}
                      <button
                        className="text-red-600"
                        onClick={() => handleRemoveFromShelf(i.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
