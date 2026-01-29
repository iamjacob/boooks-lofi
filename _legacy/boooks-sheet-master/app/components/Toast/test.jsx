'use client';
import { useToastStore } from './useToastStore.js';

export default function TestToast() {
  const { addToast } = useToastStore()

  return (
    <div className="p-8">
      <button
        onClick={() => addToast('Hello, Toast!', 'success')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Toast
      </button>
    </div>
  )
}

