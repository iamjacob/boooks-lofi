'use client';

import { useEffect, useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/storage/idb';
import { storageKeys } from '@/storage/keys';
import { User } from '@/core/models/user';
import { updateUser } from '@/core/user/updateUser';
import { setUserPin, unlockUser } from '@/core/user/lockUser';

export function UserSwitcher({
  activeUserId,
  onSwitch,
}: {
  activeUserId: string;
  onSwitch: (userId: string) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState('');

  // ✅ single adapter instance
  const adapterRef = useRef<IndexedDBAdapter | null>(null);

  async function loadUsers() {
    if (!adapterRef.current) {
      adapterRef.current = new IndexedDBAdapter();
    }

    const list =
      (await adapterRef.current.get<User[]>(
        storageKeys.users
      )) ?? [];

    setUsers(list);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function saveName(userId: string) {
    if (!adapterRef.current) return;

    await updateUser(adapterRef.current, userId, {
      displayName: nameDraft,
    });

    setEditingId(null);
    setNameDraft('');
    loadUsers();
  }

  async function handleSwitch(user: User) {
    if (!adapterRef.current) return;

    // 🔒 user is locked
    if (user.pinHash) {
      const pin = prompt('Enter PIN');
      if (!pin) return;

      const ok = await unlockUser(
        adapterRef.current,
        user.id,
        pin
      );

      if (!ok) {
        alert('Wrong PIN');
        return;
      }
    }

    onSwitch(user.id);
  }

  async function handleSetPin(userId: string) {
    if (!adapterRef.current) return;

    const pin = prompt('Set a PIN');
    if (!pin) return;

    await setUserPin(adapterRef.current, userId, pin);
    loadUsers();
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <h4>Users</h4>

      <ul>
        {users.map(user => {
          const isActive = user.id === activeUserId;

          return (
            <li key={user.id} style={{ marginBottom: 8 }}>
              {editingId === user.id ? (
                <>
                  <input
                    value={nameDraft}
                    onChange={e =>
                      setNameDraft(e.target.value)
                    }
                    placeholder="Display name"
                  />
                  <button onClick={() => saveName(user.id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleSwitch(user)}
                    style={{
                      fontWeight: isActive
                        ? 'bold'
                        : 'normal',
                    }}
                  >
                    {user.pinHash ? '🔒 ' : ''}
                    {user.displayName || user.id}
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(user.id);
                      setNameDraft(user.displayName ?? '');
                    }}
                    style={{ marginLeft: 8 }}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => handleSetPin(user.id)}
                    style={{ marginLeft: 8 }}
                  >
                    🔐 Set PIN
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
