import { HistoryEventType } from '@/core/history/types';

/**
 * Human-friendly labels for selected history events.
 * This is intentionally PARTIAL.
 */
export const eventLabels: Partial<
  Record<HistoryEventType, string>
> = {
  // connectivity
  'connectivity.online': '🟢 Online',
  'connectivity.offline': '🔴 Offline',
  'connectivity.restored': '🟡 Connection restored',

  // users
  'user.created': '👤 User created',
  'user.updated': '✏️ User updated',
  'user.pin_set': '🔐 PIN set',
  'user.unlocked': '🔓 User unlocked',
  'user.logged_out': '🚪 Logged out',

  // shelves
  'shelf.created': '📚 Shelf created',
  'shelf.updated': '📚 Shelf updated',

  // clips
  'clip.created': '📝 Clip added',

  // system
  'sync.merged': '🔄 Sync merged',
};
