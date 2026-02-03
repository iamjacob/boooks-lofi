// core/history/event.ts
// core/history/event.ts
import { ID } from '@/core/ids/id';
import { HistoryEventType } from './types';

export interface HistoryEvent<T = unknown> {
  id: ID;

  /** Semantic event identifier */
  type: HistoryEventType;

  /** Who caused the event (user, system, future agent) */
  actorId: ID;

  /** On which device */
  deviceId: ID;

  /** When it happened */
  timestamp: number;

  /** Event-specific data */
  payload?: T;
}



// const event: HistoryEvent = {
//   id: `event_${createId()}`,
//   type: 'BOOK_CREATED',
//   actorId: userId,
//   deviceId,
//   timestamp: Date.now(),
//   payload: {
//     bookId,
//     title: 'My Offline Draft'
//   }
// };
