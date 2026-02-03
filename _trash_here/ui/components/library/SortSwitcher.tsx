"use client";

type Props = {
  value: string;
  onChange: (v: "title" | "status" | "added") => void;
};

export function SortSwitcher({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 px-4 py-2">
      {["title", "status", "added"].map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode as any)}
          className={`px-3 py-1 rounded text-sm ${
            value === mode
              ? "bg-white text-black"
              : "bg-neutral-800 text-neutral-300"
          }`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}
