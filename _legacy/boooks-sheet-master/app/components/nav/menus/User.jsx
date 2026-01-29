import { useMemo } from "react";

const Profile = ({ progress = 0.9, onProfileClick }) => {
  const radius = 11;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = useMemo(
    () => circumference * (1 - progress),
    [progress, circumference]
  );

  return (
    <button onClick={onProfileClick} className="p-[4px] rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1">
      <svg
        role="progressbar"
        viewBox="0 0 24 24"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={1}
        className="shrink-0 text-fd-primary w-[40px] h-[40px]"
      >
        {/* Background */}
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          strokeWidth="1"
          stroke="#ff000030"
        />

        {/* Progress */}
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="none"
          strokeWidth="1"
          stroke="#D91B24"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 12 12)"
          className="transition-all"
        />

        <image
          href="./assets/books/billeder/000.jpg"
          x="0"
          y="0"
          width="24"
          height="24"
          preserveAspectRatio="xMidYMid slice"
          clipPath="circle(10 at 12 12)"
        />
      </svg>
    </button>
  );
};

export default Profile;
