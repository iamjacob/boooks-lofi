// core/history/appendEvent.ts
import { StorageAdapter } from '@/core/storage/adapter';
import { storageKeys } from '@/core/storage/keys';
import { HistoryEvent } from './event';

export async function appendHistoryEvent<T>(
  adapter: StorageAdapter,
  userId: string,
  event: HistoryEvent<T>
) {
  await adapter.append(
    storageKeys.history(),
    event,
    { type: 'user', userId }
  );
}
