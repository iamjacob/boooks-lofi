// core/history/appendEvent.ts
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
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
