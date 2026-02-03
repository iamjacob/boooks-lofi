'use client';

import { useEffect, useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/core/storage/idb';
import { storageKeys } from '@/core/storage/keys';
import { HistoryEvent } from '@/_trash_here/history/event';
import { HISTORY_UPDATED_EVENT } from '@/_trash_here/history/historyEvents';
import { eventLabels } from '@/ui/history/eventLabels';

export function HistoryPanel({ userId }: { userId: string }) {
  const adapterRef = useRef<IndexedDBAdapter | null>(null);
  const [events, setEvents] = useState<HistoryEvent[]>([]);

  async function load() {
    if (!adapterRef.current) {
      adapterRef.current = new IndexedDBAdapter();
    }

    const history =
      (await adapterRef.current.get<HistoryEvent[]>(
        storageKeys.history()
      )) ?? [];

    setEvents(
      history
        .filter(e => e.actorId === userId)
        .sort((a, b) => b.timestamp - a.timestamp)
    );
  }

  useEffect(() => {
    load();
  }, [userId]);

  useEffect(() => {
    function onUpdate(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail?.userId === userId) {
        load();
      }
    }

    window.addEventListener(HISTORY_UPDATED_EVENT, onUpdate);
    return () =>
      window.removeEventListener(HISTORY_UPDATED_EVENT, onUpdate);
  }, [userId]);

  return (
    <div style={{ marginTop: 24 }}>
      <h4>Activity</h4>

      {events.length === 0 && (
        <div>No activity yet</div>
      )}

      <ul>
        {events.map(e => (
          <li key={e.id} style={{ marginBottom: 6 }}>
            <span style={{ opacity: 0.6 }}>
              {new Date(e.timestamp).toLocaleTimeString()}
            </span>{' '}
            {eventLabels[e.type] ?? e.type}
          </li>
        ))}
      </ul>
    </div>
  );
}
