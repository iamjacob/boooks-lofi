// core/clips/createClip.ts
import { createId } from '@/core/ids/id';
import { StorageAdapter } from '@/storage/adapter';
import { storageKeys } from '@/storage/keys';
import { Clip } from '@/core/models/clip';
import { appendHistoryEvent } from '@/core/history/appendEvent';
import { logEvent } from '@/core/history/logEvent';

export async function createClip(
  adapter: StorageAdapter,
  userId: string,
  deviceId: string,
  input: {
    type: 'quote' | 'news' | 'article' | 'note';
    text: string;
    source?: any;
    bookId?: string;
    shelfId?: string;
  }
) {
  const clips =
    (await adapter.get<Clip[]>(
      storageKeys.clips(),
      { type: 'user', userId }
    )) ?? [];

  const clip: Clip = {
    id: `clip_${createId()}`,
    createdBy: userId,
    createdAt: Date.now(),
    ...input,
  };

  clips.push(clip);

  await adapter.set(
    storageKeys.clips(),
    clips,
    { type: 'user', userId }
  );

  // await appendHistoryEvent(adapter, userId, {
  //   id: `event_${createId()}`,
  //   type: 'clip.created',
  //   actorId: userId,
  //   deviceId,
  //   timestamp: Date.now(),
  //   payload: {
  //     clipId: clip.id,
  //   },
  // });

  await logEvent(
  adapter,
  userId,
  'device_local', // TEMP
  'clip.created',
  { clipId: clip.id, type: clip.type }
);

  return clip;
}
