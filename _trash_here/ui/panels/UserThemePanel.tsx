'use client';

import { useEffect, useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/core/storage/idb';
import { updateUser } from '@/core/user/updateUser';
import { ThemePreference, User } from '@/core/models/user';
import { storageKeys } from '@/core/storage/keys';
import { applyTheme } from '@/ui/theme/applyTheme';

export function UserThemePanel({
  userId,
}: {
  userId: string;
}) {
  const adapterRef = useRef<IndexedDBAdapter | null>(null);
  const [theme, setTheme] = useState<ThemePreference>('bw');

  // 🔥 ALWAYS sync theme from storage when userId changes
  useEffect(() => {
    adapterRef.current = new IndexedDBAdapter();

    async function syncFromUser() {
      const users =
        (await adapterRef.current!.get<User[]>(
          storageKeys.users
        )) ?? [];

      const user = users.find(u => u.id === userId);

      const nextTheme: ThemePreference =
        user?.theme ?? 'bw';

      setTheme(nextTheme);
    }

    syncFromUser();
  }, [userId]);

  async function changeTheme(next: ThemePreference) {
    if (!adapterRef.current) return;

    // update local UI immediately
    setTheme(next);

    // persist
    await updateUser(adapterRef.current, userId, {
      theme: next,
    });

    // apply globally
    applyTheme(next);
  }

  return (
    <div style={{ marginTop: 16 }} className="panel">
      <h4>Theme</h4>

      <div style={{ marginBottom: 8, opacity: 0.7 }}>
        Current theme: <b>{theme}</b>
      </div>

      {(['bw', 'light', 'dark', 'system'] as ThemePreference[]).map(t => (
        <button
          key={t}
          onClick={() => changeTheme(t)}
          style={{
            marginRight: 8,
            fontWeight: theme === t ? 'bold' : 'normal',
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
