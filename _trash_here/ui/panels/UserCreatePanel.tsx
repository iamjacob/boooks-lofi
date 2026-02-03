// ui/panels/UserCreatePanel.tsx
'use client';

import { useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/core/storage/idb';
import { createUser } from '@/core/user/createUser';

export function UserCreatePanel() {
  const adapterRef = useRef<IndexedDBAdapter | null>(null);

  const [mode, setMode] = useState<'private' | 'social'>('private');
  const [name, setName] = useState('');

  if (!adapterRef.current) {
    adapterRef.current = new IndexedDBAdapter();
  }

  async function handleCreate() {
    const adapter = adapterRef.current!;

    await createUser(adapter, {
      mode,
      displayName: name || undefined,
    });

    window.location.reload(); // TEMP: re-bootstrap
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h4>Create user</h4>

      <div>
        <label>
          <input
            type="radio"
            checked={mode === 'private'}
            onChange={() => setMode('private')}
          />
          Private / Offline
        </label>

        <label style={{ marginLeft: 12 }}>
          <input
            type="radio"
            checked={mode === 'social'}
            onChange={() => setMode('social')}
          />
          Social / Online
        </label>
      </div>

      <div style={{ marginTop: 8 }}>
        <input
          placeholder="Display name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <button onClick={handleCreate} style={{ marginTop: 8 }}>
        Create user
      </button>
    </div>
  );
}
