// ui/panels/OnlineStatus.tsx
'use client';

import { useEffect, useState } from 'react';
import { webOnlineAdapter } from '@/core/net/webOnlineAdapter';

export function OnlineStatus() {
  const [online, setOnline] = useState<boolean>(
    webOnlineAdapter.isOnline()
  );

  useEffect(() => {
    if (!webOnlineAdapter.subscribe) return;

    const unsubscribe = webOnlineAdapter.subscribe(setOnline);
    return unsubscribe;
  }, []);

  return (
    <div style={{ marginTop: 12 }}>
      <strong>Status:</strong>{' '}
      {online ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
}
