const Progress = ({ onComplete,progress = 0, children, radius = 11 }) => {
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      role="progressbar"
      viewBox="0 0 24 24"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={1}
      className="shrink-0 text-fd-primary w-22 h-22"
      style={{
        "--circumference": circumference,
      }}
    >
      {/* Background */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        strokeWidth="1.5"
        stroke="#D91B2420"
      />

      {/* Progress */}
      <circle
        cx="12"
        cy="12"
        r="11"
        fill="none"
        strokeWidth="1.5"
        stroke="#D91B24"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        strokeLinecap="round"
        transform="rotate(-90 12 12)"
        className="progress-ring"
          onAnimationEnd={onComplete}
        // onAnimationEnd={() => {
        //     onAnimationEnd={onComplete}
        //   console.log("📍 HOLD COMPLETE (CSS)");
        // }}
      />

      {children}
    </svg>
  );
};

export default Progress;
