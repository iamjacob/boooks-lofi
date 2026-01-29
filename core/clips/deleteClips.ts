import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Clip } from '@/core/models/clip';

export async function deleteClip(
  adapter: StorageAdapter,
  userId: string,
  clipId: string
) {
  const clips =
    (await adapter.get<Clip[]>(
      storageKeys.clips(),
      { type: 'user', userId }
    )) ?? [];

  await adapter.set(
    storageKeys.clips(),
    clips.filter(c => c.id !== clipId),
    { type: 'user', userId }
  );
}
