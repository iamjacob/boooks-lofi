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
import { applyTheme } from '@/ui/theme/applyTheme';
import { User } from '@/core/models/user';
import { UserThemePanel } from '@/ui/panels/UserThemePanel'
import { AddBookPanel } from '@/ui/panels/AddBookPanel'
import { LibraryPanel } from '@/ui/panels/LibraryPanel'


export default function ClientApp() {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const adapterRef = useRef<IndexedDBAdapter | null>(null);

  function handleSwitchUser(userId: string) {
    setActiveUserId(userId);
  }

useEffect(() => {
  if (!activeUserId || !adapterRef.current) return;

  async function applyUserTheme() {
    const users =
      (await adapterRef.current!.get<User[]>(
        storageKeys.users
      )) ?? [];

    const user = users.find(u => u.id === activeUserId);
    applyTheme(user?.theme);
  }

  applyUserTheme();
}, [activeUserId]);


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
    <div
  style={{
    padding: 24,
    background: 'var(--bg)',
    color: 'var(--text)',
    minHeight: '100vh',
  }}
>

      <div className="panel">
      <BootInfo />

      </div>
      <div className="panel">

      <OnlineStatus />
      </div>
      <div className="panel">

      <UserThemePanel userId={activeUserId} />
      </div>

<div className="panel">

      <UserSwitcher
        activeUserId={activeUserId}
        onSwitch={handleSwitchUser}
        />
        </div>
<div className="panel">

      <UserCreatePanel />
</div>
<div className="panel">

      <ShelvesPanel userId={activeUserId} />
</div>
<div className="panel">

      <ClipsPanel userId={activeUserId} />
</div>
<div className="panel">

      <AddQuotePanel userId={activeUserId} />
</div>
<div className="panel">

      <HistoryPanel userId={activeUserId} />
</div>

<div className="panels">
  <AddBookPanel userId={activeUserId} />

</div>

<div className="panels">
<LibraryPanel userId={activeUserId} />

</div>
    </div>
  );
}
