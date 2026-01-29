import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Clip } from '@/core/models/clip';

export async function getClips(
  adapter: StorageAdapter,
  userId: string
): Promise<Clip[]> {
  return (
    (await adapter.get<Clip[]>(
      storageKeys.clips(),
      { type: 'user', userId }
    )) ?? []
  );
}
