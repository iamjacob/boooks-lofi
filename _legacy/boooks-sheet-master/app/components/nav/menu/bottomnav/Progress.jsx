import { useMemo } from "react";

const Progress = ({
  gap = 0.5,
  progress = 0.02, // 0 → 1
  size = 56,
  stroke = 1,
  strokeColor="#D91B24",
  strokeColorFade="rgba(255,255,255,0.25)",
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const visibleLength = circumference * (1 - gap);
  const progressLength = visibleLength * progress;

  const dashArray = `${progressLength} ${circumference}`;
  const dashOffset = visibleLength - progressLength;
const remainingLength = visibleLength - progressLength

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="pointer-events-none -rotate-90 absolute bottom-2 "
    >
      {/* Track (åben ring) */}
    {/* Remaining (gray) */}
<circle
  cx={size / 2}
  cy={size / 2}
  r={radius}
  fill="none"
  stroke={strokeColorFade}
  strokeWidth={stroke}
  strokeDasharray={`${remainingLength} ${circumference}`}
  strokeDashoffset={-(progressLength)}
  strokeLinecap="round"
  transform={`rotate(-90 ${size / 2} ${size / 2})`}
/>

      {/* Progress */}
      {/* Progress (red) */}
<circle
  cx={size / 2}
  cy={size / 2}
  r={radius}
  fill="none"
  stroke={strokeColor}
  strokeWidth={stroke}
  strokeDasharray={`${progressLength-2} ${circumference}`}
  strokeDashoffset={0}
  strokeLinecap="round"
  transform={`rotate(-94 ${size / 2} ${size / 2})`}
  className="
    transition-[stroke-dashoffset]
    duration-300
    ease-out
    drop-shadow-[0_0_6px_rgba(217,27,36,0.35)]
  "
/>

    </svg>
  );
};

export default Progress;
