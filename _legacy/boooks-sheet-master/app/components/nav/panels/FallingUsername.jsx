export default function FallingUsername({ text, storyActive,mapArrived }) {
  if (!storyActive) return null; // 🔑 animation trigger

  return (
    <div
    className={`
        text-white/90 tracking-wide
        transition-all duration-700 ease-out
        ${mapArrived ? "text-base translate-y-0" : "translate-y-1"}
      `}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="fall-letter inline-block"
          style={{ "--delay": `${i * 70}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
