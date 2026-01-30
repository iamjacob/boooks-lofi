// ui/components/library/LibraryHeader.tsx
type Props = {
  onAddBook: () => void;
};

export function LibraryHeader({ onAddBook }: Props) {
  return (
    <header className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Library</h1>

      <button
        onClick={onAddBook}
        className="px-3 py-1.5 rounded-md bg-white text-black text-sm"
      >
        + Add
      </button>
    </header>
  );
}
