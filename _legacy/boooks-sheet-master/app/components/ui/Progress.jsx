import { useMemo } from "react";

const Progress = ({ progress = 0.9, children }) => {
  const radius = 11;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = useMemo(
    () => circumference * (1 - progress),
    [progress, circumference]
  );

  return (

    <svg
      role="progressbar"
      viewBox="0 0 24 24"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={1}
      className="shrink-0 text-fd-primary w-[40px] h-[40px] scale-50"
    >
      {/* Background */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        strokeWidth="1"
        stroke="#333"
      />

      {/* Progress */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        strokeWidth="1"
        stroke="#eee"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform="rotate(-90 12 12)"
        className="transition-all"
      />

    {children}
    </svg>
  );
}

export default Progress

