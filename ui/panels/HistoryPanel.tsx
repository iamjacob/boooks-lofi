// ui/panels/HistoryPanel.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/storage/idb';
import { storageKeys } from '@/storage/keys';
import { HistoryEvent } from '@/core/history/event';
import { HISTORY_UPDATED_EVENT } from '@/core/history/historyEvents';

export function HistoryPanel({ userId }: { userId: string }) {
  const adapterRef = useRef<IndexedDBAdapter | null>(null);
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!adapterRef.current) {
      adapterRef.current = new IndexedDBAdapter();
    }

    setLoading(true);

    const adapter = adapterRef.current;
    const history =
      (await adapter.get<HistoryEvent[]>(
        storageKeys.history(),
        { type: 'user', userId }
      )) ?? [];

    setEvents(history);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [userId]);

  useEffect(() => {
  function onHistoryUpdated(e: Event) {
    const detail = (e as CustomEvent).detail;
    if (detail?.userId === userId) {
      load();
    }
  }

  window.addEventListener(HISTORY_UPDATED_EVENT, onHistoryUpdated);
  return () => {
    window.removeEventListener(HISTORY_UPDATED_EVENT, onHistoryUpdated);
  };
}, [userId]);


  return (
    <div style={{ marginTop: 16 }}>
      <h4>History</h4>

      <button onClick={load} disabled={loading}>
        {loading ? 'Loading…' : 'Reload history'}
      </button>

      {events.length === 0 && !loading && (
        <div>No events yet</div>
      )}

      <ul>
        {events.map((e) => (
          <li key={e.id}>
            [{new Date(e.timestamp).toLocaleTimeString()}]{' '}
            <code>{e.type}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}
