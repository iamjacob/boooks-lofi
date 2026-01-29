// core/history/historyEvents.ts

export const HISTORY_UPDATED_EVENT = 'boooks:history-updated';

export function notifyHistoryUpdated(userId: string) {
  window.dispatchEvent(
    new CustomEvent(HISTORY_UPDATED_EVENT, {
      detail: { userId },
    })
  );
}
