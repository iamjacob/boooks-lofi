// ui/net/connectivityLogger.ts
'use client';

import { createId } from '@/core/models/ids/id';
import { isOnline } from '@/core/net/isOnline';
import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { HistoryEvent } from '@/_trash_here/history/event';
import { HistoryEventType } from '@/_trash_here/history/types';

type ConnectivityPayload = {
  durationMs?: number;
};

export function startConnectivityLogging(
  adapter: StorageAdapter,
  userId: string,
  deviceId: string
) {
  let offlineSince: number | null = null;

  function log<T>(
    type: HistoryEventType,
    payload?: T
  ) {
    const event: HistoryEvent<T> = {
      id: `event_${createId()}`,
      type,
      actorId: userId,        // ✅ actor, not userId
      deviceId,
      timestamp: Date.now(),
      payload,
    };

    adapter.append(
      storageKeys.history(),
      event,
      { type: 'user', userId } // ✅ storage scope only
    );
  }

  window.addEventListener('offline', () => {
    offlineSince = Date.now();
    log('connectivity.offline');
  });

  window.addEventListener('online', () => {
    const now = Date.now();
    const duration =
      offlineSince ? now - offlineSince : undefined;

    log<ConnectivityPayload>('connectivity.restored', {
      durationMs: duration,
    });

    offlineSince = null;
  });
}
