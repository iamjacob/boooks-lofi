'use client';

import { useEffect } from 'react';

import { createId, UserID } from '@/core/ids/id';
import { userRepo } from '@/core/repo';
import { setActiveUser, getActiveUser } from '@/core/session/getActiveUser';
import { ensureBookAndAddToLibrary } from '@/core/services';

export default function TestPage() {
  useEffect(() => {
    async function boot() {
      console.clear();
      console.log('=== BOOOKS TEST BOOT ===');

      // --------------------------------------------------
      // 1. Ensure user exists (app boundary)
      // --------------------------------------------------
      const userId = createId<'UserID'>();

      await userRepo.insert({
        id: userId,
        handle: 'emperor',
        displayName: 'The Emperor',
        mode: 'private',
        defaultShelfId: createId<'ShelfID'>(),
        isSynced: false,
        createdAt: Date.now(),
      });

      await setActiveUser(userId);

      console.log('Active user set:', userId);

      // --------------------------------------------------
      // 2. App flow starts here
      // --------------------------------------------------
      const user = await getActiveUser();
      console.log('Active user loaded:', user);

      // --------------------------------------------------
      // 3. User intent: add book to library
      // --------------------------------------------------
      const result = await ensureBookAndAddToLibrary(user.id, {
        title: 'The Emperor Builds Offline Systems',
        authorName: 'Jacob',
        language: 'en',
      });

      console.log('Book ensured:', result.book);
      console.log('UserBook created:', result.userBook);

      console.log('=== BOOOKS TEST DONE ===');
    }

    boot();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Boooks – Test Page</h1>
      <p className="opacity-70">
        Open the console to see the real app flow.
      </p>
    </div>
  );
}
