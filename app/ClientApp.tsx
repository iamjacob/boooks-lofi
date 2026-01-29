'use client';

import { useEffect, useRef, useState } from 'react';
import { BootInfo } from '@/ui/panels/BootInfo';
import { OnlineStatus } from '@/ui/panels/OnlineStatus';
import { HistoryPanel } from '@/ui/panels/HistoryPanel';
import { ShelvesPanel } from '@/ui/panels/ShelvesPanel';
import { IndexedDBAdapter } from '@/storage/idb';
import { bootstrapUser } from '@/core/bootstrap/bootstrapUser';
import { UserCreatePanel } from '@/ui/panels/UserCreatePanel';
import { ClipsPanel } from '@/ui/panels/ClipsPanel';
import { AddQuotePanel } from '@/ui/panels/AddQuotePanel';
import { UserSwitcher } from '@/ui/panels/UserSwitcher';
import { storageKeys } from '@/storage/keys';

export default function ClientApp() {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const adapterRef = useRef<IndexedDBAdapter | null>(null);

  function handleSwitchUser(userId: string) {
    setActiveUserId(userId);
  }

  // 🔹 BOOTSTRAP + RESTORE ACTIVE USER
  useEffect(() => {
    let cancelled = false;

    if (!adapterRef.current) {
      adapterRef.current = new IndexedDBAdapter();
    }

    const adapter = adapterRef.current;

    async function init() {
      // 1. Restore previously active user (device-wide)
      const storedUserId = await adapter.get<string>(
        storageKeys.activeUserId
      );

      // 2. Bootstrap system
      const result = await bootstrapUser(adapter);

      // 3. Activate user
      if (!cancelled) {
        setActiveUserId(result.activeUserId);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  // 🔹 PERSIST ACTIVE USER (Netflix-style)
  useEffect(() => {
    if (!activeUserId) return;
    if (!adapterRef.current) return;

    adapterRef.current.set(
      storageKeys.activeUserId,
      activeUserId
    );
  }, [activeUserId]);

  if (!activeUserId) {
    return <div>Booting…</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <BootInfo />
      <OnlineStatus />

      <UserSwitcher
        activeUserId={activeUserId}
        onSwitch={handleSwitchUser}
      />

      <UserCreatePanel />

      <ShelvesPanel userId={activeUserId} />
      <ClipsPanel userId={activeUserId} />
      <AddQuotePanel userId={activeUserId} />
      <HistoryPanel userId={activeUserId} />
    </div>
  );
}
