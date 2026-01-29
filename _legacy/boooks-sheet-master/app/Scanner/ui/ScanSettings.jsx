import { useRef, useState } from "react";

export default function ScanSettings() {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const [captureMode, setCaptureMode] = useState("Live");
  const [resolution, setResolution] = useState("Auto");
  const [inputMode, setInputMode] = useState("Camera");

  const openDialog = () => {
    const trigger = triggerRef.current;
    const dialog = dialogRef.current;
    if (!trigger || !dialog) return;

    const rect = trigger.getBoundingClientRect();
    dialog.showModal();

    requestAnimationFrame(() => {
      const dialogWidth = dialog.offsetWidth;
      const viewportPadding = 12;

      // Ideal centered position
      let left = rect.left + rect.width / 2 - dialogWidth / 2;

      // Clamp to viewport
      const minLeft = viewportPadding;
      const maxLeft = window.innerWidth - dialogWidth - viewportPadding;

      left = Math.max(minLeft, Math.min(left, maxLeft));

      dialog.style.left = `${left}px`;
      dialog.style.top = `${rect.bottom + 8}px`;
    });
  };

  const closeDialog = () => dialogRef.current?.close();

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={openDialog}
        aria-haspopup="menu"
        aria-label="Scan settings"
        className="p-[8px] rounded-full bg-black/10 backdrop-blur items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="3" stroke="#fff" stroke-width="1.5" />
          <path
            d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
            stroke="#fff"
            stroke-width="1.5"
          />
        </svg>
      </button>

      {/* Dialog */}
      <dialog
        ref={dialogRef}
        className="absolute rounded-xl w-72 p-0 backdrop:bg-black/30"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
      >
        <div className="p-3 space-y-3">
          {/* Input Mode */}

          {/* <Section title="Input">
            <Option
              title="Camera"
              desc="Use device camera for live scanning"
              selected={inputMode === "Camera"}
              onSelect={() => {
                setInputMode("Camera");
                //closeDialog();
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="13"
                    r="3"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 13.3636C2 10.2994 2 8.76721 2.74902 7.6666C3.07328 7.19014 3.48995 6.78104 3.97524 6.46268C4.69555 5.99013 5.59733 5.82123 6.978 5.76086C7.63685 5.76086 8.20412 5.27068 8.33333 4.63636C8.52715 3.68489 9.37805 3 10.3663 3H13.6337C14.6219 3 15.4728 3.68489 15.6667 4.63636C15.7959 5.27068 16.3631 5.76086 17.022 5.76086C18.4027 5.82123 19.3044 5.99013 20.0248 6.46268C20.51 6.78104 20.9267 7.19014 21.251 7.6666C22 8.76721 22 10.2994 22 13.3636C22 16.4279 22 17.9601 21.251 19.0607C20.9267 19.5371 20.51 19.9462 20.0248 20.2646C18.9038 21 17.3433 21 14.2222 21H9.77778C6.65675 21 5.09624 21 3.97524 20.2646C3.48995 19.9462 3.07328 19.5371 2.74902 19.0607C2.53746 18.7498 2.38566 18.4045 2.27673 18"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19 10H18"
                    stroke="#1C274C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />

            <Option
              title="Text"
              desc="Type or paste content manually"
              selected={inputMode === "Text"}
              onSelect={() => {
                setInputMode("Text");
                //closeDialog();
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-form-icon lucide-form"
                >
                  <path d="M4 14h6" />
                  <path d="M4 2h10" />
                  <rect x="4" y="18" width="16" height="4" rx="1" />
                  <rect x="4" y="6" width="16" height="4" rx="1" />
                </svg>
              }
            />
          </Section> */}
          {inputMode == "Camera" && (
            <>
              {/* Capture Mode */}
              <Section title="How should I capture?">
                {/* <Option
              title="Live (Smart)"
              desc="Continuous smart scanning"
              selected={captureMode === "Live"}
              onSelect={() => {
                setCaptureMode("Live");
                closeDialog();
              }}
            /> */}
                <Option
                  title="Video"
                  desc="Record and scan frames"
                  selected={captureMode === "Video"}
                  onSelect={() => {
                    setCaptureMode("Video");
                    //closeDialog();
                  }}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="800px"
                      height="800px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 9C2 6.79086 3.79086 5 6 5H13C15.2091 5 17 6.79086 17 9V9.07171L20.202 7.23108C21.0019 6.77121 22 7.34868 22 8.27144V15.7488C22 16.6203 21.1003 17.2012 20.306 16.8424L16.9855 15.3425C16.8118 17.3913 15.0938 19 13 19H6C3.79086 19 2 17.2091 2 15V9ZM17 13.1544L20 14.5096V9.65407L17 11.3786V13.1544ZM15 9C15 7.89543 14.1046 7 13 7H6C4.89543 7 4 7.89543 4 9V15C4 16.1046 4.89543 17 6 17H13C14.1046 17 15 16.1046 15 15V9Z"
                        fill="#000000"
                      />
                    </svg>
                  }
                />
                <Option
                  title="Photo"
                  desc="Single high-quality capture"
                  selected={captureMode === "Photo"}
                  onSelect={() => {
                    setCaptureMode("Photo");
                    //closeDialog();
                  }}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="800px"
                      height="800px"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M8 11C9.10457 11 10 10.1046 10 9C10 7.89543 9.10457 7 8 7C6.89543 7 6 7.89543 6 9C6 10.1046 6.89543 11 8 11Z"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.56055 21C12.1305 8.89998 16.7605 6.77998 22.0005 14.63"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18 3H6C3.79086 3 2 4.79086 2 7V17C2 19.2091 3.79086 21 6 21H18C20.2091 21 22 19.2091 22 17V7C22 4.79086 20.2091 3 18 3Z"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </Section>

              {/**
               *
               * SMART IS AUTO!
               *
               */}
              {/* Resolution */}
              <Section title="Resolution">
                <Option
                  title="Smart"
                  desc="Adaptive quality and speed"
                  selected={resolution === "Auto"}
                  onSelect={() => {
                    setResolution("Auto");
                    //closeDialog();
                  }}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M479-359q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-57 222-85-85q-12-12-11.5-28.5T338-279q12-12 28.5-12t28.5 12l85 86 85-85q11-11 28-11t28 11q11 11 11 28t-11 28l-85 85q-12 12-27 18t-30 6q-15 0-30-6t-27-18ZM221-337l-85-85q-12-12-18-27t-6-30q0-15 6-30t18-27l85-85q12-12 28.5-12t28.5 12q12 12 12 28.5T278-564l-86 86 85 85q11 11 11 28t-11 28q-11 11-28 11t-28-11Zm116-401 85-85q12-12 27-18t30-6q15 0 30 6t27 18l85 85q12 12 12 28t-12 28q-12 12-28.5 12T564-682l-86-85-85 85q-11 11-28 11t-28-11q-11-11-11-28t11-28Zm344 343 85-85-85-85q-11-11-11-28t11-28q11-11 28-11t28 11l85 85q12 12 18 27t6 30q0 15-6 30t-18 27l-85 85q-12 12-28 11.5T681-338q-12-12-12-28.5t12-28.5Z" />
                    </svg>
                  }
                />

                <Option
                  title="High"
                  desc="Sharper detail, slightly slower"
                  selected={resolution === "Ultra"}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M300-440h80v50q0 13 8.5 21.5T410-360q13 0 21.5-8.5T440-390v-180q0-13-8.5-21.5T410-600q-13 0-21.5 8.5T380-570v70h-80v-70q0-13-8.5-21.5T270-600q-13 0-21.5 8.5T240-570v180q0 13 8.5 21.5T270-360q13 0 21.5-8.5T300-390v-50Zm240 80h140q17 0 28.5-11.5T720-400v-160q0-17-11.5-28.5T680-600H540q-8 0-14 6t-6 14v200q0 8 6 14t14 6Zm40-60v-120h80v120h-80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
                    </svg>
                  }
                  onSelect={() => {
                    setResolution("Ultra");
                    closeDialog();
                  }}
                />
                <Option
                  title="Max"
                  desc="Maximum detail, slowest"
                  selected={resolution === "Max"}
                  onSelect={() => {
                    setResolution("Max");
                    //closeDialog();
                  }}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f"
                    >
                      <path d="M180-220h60v-80h24l36 80h60l-36-84q15-9 25.5-23.5T360-360v-40q0-25-17.5-42.5T300-460H180v240Zm220 0h160v-60H460v-30h80v-60h-80v-30h100v-60H400v240Zm200 0h140q17 0 28.5-11.5T780-260v-60q0-17-11.5-28.5T740-360h-80v-40h120v-60H640q-17 0-28.5 11.5T600-420v60q0 17 11.5 28.5T640-320h80v40H600v60ZM240-360v-40h60v40h-60Zm60-140h60v-90h60v90h60v-240h-60v90h-60v-90h-60v240Zm280 0h60v-240h-60v240ZM120-120q-33 0-56.5-23.5T40-200v-560q0-33 23.5-56.5T120-840h720q33 0 56.5 23.5T920-760v560q0 33-23.5 56.5T840-120H120Zm0-80h720v-560H120v560Zm0 0v-560 560Z" />
                    </svg>
                  }
                />
              </Section>
            </>
          )}
        </div>
      </dialog>

      {/* Animation */}
      <style jsx>{`
        dialog[open] {
          animation: scaleIn 0.12s ease-out;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            scale: 0.98;
          }
          to {
            opacity: 1;
            scale: 1;
          }
        }

        dialog {
          position: fixed;
          margin: 0;
        }
      `}</style>
    </>
  );
}

/* ---------- helpers ---------- */

function Section({ title, children, layout = "col" }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-semibold text-gray-600 mb-1">{title}</div>

      <div className={layout === "row" ? "flex gap-2" : "flex flex-col gap-1"}>
        {children}
      </div>
    </div>
  );
}

function Option({ title, desc, selected, onSelect, icon }) {
  return (
    <button
      onClick={onSelect}
      className={`
        flex-1 w-full text-left p-2 rounded text-sm transition
        flex gap-3 items-center
        ${
          selected
            ? "border-2 border-gray-300 text-gray-800"
            : "hover:bg-gray-100"
        }
      `}
    >
      {icon && (
        <div className="w-6 h-6 flex items-center justify-center shrink-0 text-gray-700">
          {icon}
        </div>
      )}

      <div className="flex-1">
        <div
          className={`leading-tight ${selected ? "font-bold" : "font-medium"}`}
        >
          {title}
        </div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
    </button>
  );
}
