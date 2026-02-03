// ui/panels/AddQuotePanel.tsx
'use client';

import { useRef, useState } from 'react';
import { IndexedDBAdapter } from '@/core/storage/idb';
import { createClip } from '@/_trash_here/clips/createClip';

export function AddQuotePanel({ userId }: { userId: string }) {
  const adapterRef = useRef<IndexedDBAdapter | null>(null);
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  if (!adapterRef.current) {
    adapterRef.current = new IndexedDBAdapter();
  }

  async function saveQuote() {
    if (!text.trim()) return;

    setSaving(true);

    await createClip(
      adapterRef.current!,
      userId,
      'device_local', // TEMP device id (correct for now)
      {
        type: 'quote',
        text,
      }
    );

    setText('');
    setSaving(false);
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h4>Add quote</h4>

      <textarea
        rows={3}
        placeholder="Write a quote…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%' }}
      />

      <button onClick={saveQuote} disabled={saving}>
        {saving ? 'Saving…' : 'Save quote'}
      </button>
    </div>
  );
}
