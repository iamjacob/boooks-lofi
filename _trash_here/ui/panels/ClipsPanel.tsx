// ui/panels/ClipsPanel.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/core/storage/idb';
import { storageKeys } from '@/core/storage/keys';
import { Clip } from '@/core/models/clip';
import { HISTORY_UPDATED_EVENT } from '@/_trash_here/history/historyEvents';

export function ClipsPanel({ userId }: { userId: string }) {
  const adapterRef = useRef<IndexedDBAdapter | null>(null);
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    if (!adapterRef.current) {
      adapterRef.current = new IndexedDBAdapter();
    }

    setLoading(true);

    const adapter = adapterRef.current;
    const result =
      (await adapter.get<Clip[]>(
        storageKeys.clips(),
        { type: 'user', userId }
      )) ?? [];

    setClips(result);
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
      <h4>Quotes / Clips</h4>

      {clips.length === 0 && !loading && (
        <div>No quotes yet</div>
      )}

      <ul>
        {clips.map((clip) => (
          <li key={clip.id}>
            “{clip.text}”
          </li>
        ))}
      </ul>
    </div>
  );
}
