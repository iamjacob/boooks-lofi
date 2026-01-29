// ui/panels/BootInfo.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/storage/idb';
import { bootstrapUser } from '@/core/bootstrap/bootstrapUser';
import { Device } from '@/core/identity/device';
import { User } from '@/core/models/user';

/**
 * UI state MUST match what bootstrapUser returns
 */
type BootState = {
  device: Device | null;
  users: User[];
  activeUserId: string | null;
};

export function BootInfo() {
  // keep ONE adapter instance
  const adapterRef = useRef<IndexedDBAdapter | null>(null);

  const [boot, setBoot] = useState<BootState>({
    device: null,
    users: [],
    activeUserId: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!adapterRef.current) {
      adapterRef.current = new IndexedDBAdapter();
    }

    const adapter = adapterRef.current;

    async function init() {
      try {
        const result = await bootstrapUser(adapter);

        // IMPORTANT:
        // we set the WHOLE object, not just activeUserId
        setBoot({
          device: result.device,
          users: result.users,
          activeUserId: result.activeUserId,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Boot failed');
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) {
    return <div>Booting Boooks…</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: 16, border: '1px solid #444' }}>
      <h3>Boot Info</h3>

      <div>
        <strong>Device ID:</strong>{' '}
        {boot.device ? boot.device.id : '—'}
      </div>

      <div>
        <strong>Active User:</strong>{' '}
        {boot.activeUserId ?? '—'}
      </div>

      <div>
        <strong>Users on device:</strong>
        <ul>
          {boot.users.map((user) => (
            <li key={user.id}>{user.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
