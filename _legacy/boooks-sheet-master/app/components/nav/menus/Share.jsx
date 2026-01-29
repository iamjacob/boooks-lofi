const Share = ({onShareClick}) => {
  return (
    <button onClick={onShareClick} aria-label="Open share" className="p-[8px] rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1">
      <svg
        width="24"
        height="24"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.3125 28.6875L33.75 20.25L25.3125 11.8125"
          stroke="#fff"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.75 30.375V27C6.75 25.2098 7.46116 23.4929 8.72703 22.227C9.9929 20.9612 11.7098 20.25 13.5 20.25H33.75"
          stroke="#fff"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="text-white text-[11px]">Share</div>
    </button>
  );
};
export default Share;
