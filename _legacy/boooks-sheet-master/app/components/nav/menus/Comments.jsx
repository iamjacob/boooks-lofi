import React from "react";

const Comments = ({onCommentsClick}) => {
  return (
    <button onClick={onCommentsClick} aria-label="Open comments" className="p-[8px] rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1">
      <svg
        width="24"
        height="24"
        viewBox="0 0 41 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.04909 27.577C5.29722 28.203 5.35246 28.8888 5.20771 29.5464L3.41053 35.0982C3.35262 35.3798 3.36759 35.6715 3.45402 35.9456C3.54045 36.2197 3.69548 36.4673 3.9044 36.6647C4.11332 36.8621 4.36921 37.0029 4.6478 37.0737C4.92639 37.1445 5.21845 37.143 5.49628 37.0692L11.2557 35.3851C11.8762 35.262 12.5189 35.3158 13.1103 35.5404C16.7137 37.2232 20.7958 37.5792 24.6362 36.5456C28.4765 35.5121 31.8285 33.1553 34.1006 29.8912C36.3727 26.6271 37.4189 22.6654 37.0547 18.7051C36.6905 14.7448 34.9393 11.0403 32.1099 8.24537C29.2806 5.45041 25.5551 3.74454 21.5906 3.42874C17.6261 3.11293 13.6775 4.20749 10.4414 6.51929C7.20529 8.8311 4.88967 12.2116 3.9031 16.0643C2.91652 19.917 3.32239 23.9944 5.04909 27.577Z"
          stroke="#fff"
          strokeWidth="2.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="text-white text-[11px]">1111</div>
    </button>
  );
};

export default Comments;
