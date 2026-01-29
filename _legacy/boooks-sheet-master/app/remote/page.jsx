"use client";
import { useToastStore, Toasts } from "./../components/Toast/";
const page = () => {
  const { addToast } = useToastStore();

  return (
    <>
      <div>Remote</div>
      <Toasts />
      <button
        onClick={() => addToast("Hello, Toast!", "success")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show Toast
      </button>

      {/* Change this to bookmote! */}
      <div class="absolute pointer-events-auto z-1000">
        <div class="relative flex flex-col m-3 top-20 gap-1 z-1000">
          <div class=" bg-white/80 rounded-full  p-1 gap-2 flex flex-col">
            <div class="realtime">
              <button class="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-locate"
                  aria-hidden="true"
                >
                  <line x1="2" x2="5" y1="12" y2="12"></line>
                  <line x1="19" x2="22" y1="12" y2="12"></line>
                  <line x1="12" x2="12" y1="2" y2="5"></line>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                  <circle cx="12" cy="12" r="7"></circle>
                </svg>
              </button>
            </div>
          </div>
          <div class="relative bg-white/80 rounded-full  p-1 gap-2 flex flex-col">
            <div class="flex flex-col gap-2">
              <button class="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  class="lucide lucide-plus"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
              <button class="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-minus"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>
            </div>
            <div class="ui-panel">
              <button class="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-target"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circL cx="12" cy="12" r="2"></circL>
                </svg>
              </button>
            </div>
            <div class="flex flex-col items-center">
              <button class="mx-2 -mb-1 rounded-full bg-gray-100/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-up"
                  aria-hidden="true"
                >
                  <path d="m18 15-6-6-6 6"></path>
                </svg>
              </button>
              <button className="relative w-10 h-10 z-10 font-[500] text-[18px] rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none">
                3D
              </button>
              <button className="mx-2 -mt-1 rounded-full bg-gray-100/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform touch-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-chevron-down"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </div>
            <div className="flex w-10 h-10 justify-center">
              <div className="absolute flex">
                <button className="relative z-10 my-3 -mr-2 rounded-full bg-gray-100/50 flex items-center justify-center active:scale-90 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>
                <button className="z-5 py-1 px-1 rounded-full active:scale-90 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D91B24"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-navigation2 lucide-navigation-2"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
                  </svg>
                </button>
                <button class="relative z-10 my-3 -ml-2 rounded-full bg-gray-100/50 flex items-center justify-center active:scale-90 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
            <button className="p-2 rounded-full bg-white/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
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
                className="lucide lucide-ellipsis text-gray-700"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>
        <div class="hidden">
          <div class="flex flex-col gap-2">
            <button class="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-corner-right-up"
                aria-hidden="true"
              >
                <path d="m10 9 5-5 5 5"></path>
                <path d="M4 20h7a4 4 0 0 0 4-4V4"></path>
              </svg>
            </button>
            <button className="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-corner-right-down"
                aria-hidden="true"
              >
                <path d="m10 15 5 5 5-5"></path>
                <path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
              </svg>
            </button>
          </div>
          <div class="ui-panel">
            <button class="p-2 rounded-full bg-black/10 backdrop-blur   flex items-center justify-center shadow-lg   active:scale-90 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map-pin-plus"
                aria-hidden="true"
              >
                <path d="M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738"></path>
                <circle cx="12" cy="10" r="3"></circle>
                <path d="M16 18h6"></path>
                <path d="M19 15v6"></path>
              </svg>
            </button>
          </div>
          <div class="ui-panel">
            <button class="p-2 rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-camera"
                aria-hidden="true"
              >
                <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>
        <div class="fixed bottom-2 w-fit block-inline">
          <div class="text-center w-screen text-white">
            lat: 55.70707 lng: 9.55409
          </div>
        </div>
        <div class="fixed bottom-4 right-2 z-50">
          <button class="p-2 rounded-full bg-white/50 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1">
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
              className="lucide lucide-info text-gray-700"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
