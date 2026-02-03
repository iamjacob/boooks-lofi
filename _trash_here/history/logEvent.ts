import { createId } from '@/core/models/ids/id';
import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { HistoryEvent } from './event';
import { HistoryEventType } from './types';

export async function logEvent<T = unknown>(
  adapter: StorageAdapter,
  userId: string,
  type: HistoryEventType,
  payload?: T
): Promise<void> {
  const event: HistoryEvent<T> = {
    id: `event_${createId()}`,
    type,
    actorId: userId,
    deviceId: 'device_local', // TEMP — you already planned device tracking
    timestamp: Date.now(),
    payload,
  };

  const history =
    (await adapter.get<HistoryEvent[]>(
      storageKeys.history()
    )) ?? [];

  history.push(event);

  await adapter.set(
    storageKeys.history(),
    history
  );

  // 🔔 notify UI listeners
  window.dispatchEvent(
    new CustomEvent('history.updated', {
      detail: { userId },
    })
  );
}
