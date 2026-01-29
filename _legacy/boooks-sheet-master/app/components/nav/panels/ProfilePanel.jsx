import { useState, useEffect } from "react";
import Progress from "../../ui/Progress";
import Level from "../Level";
import { StoryMap } from "./story-map";
import FallingUsername from "./FallingUsername";

const ProfilePanel = ({ closeProfile, storyActive }) => {
  const thisUser = true;
  const following = true;

  const [preArrived, setPreArrived] = useState(false);
  const [mapArrived, setMapArrived] = useState(false);

  useEffect(() => {
    if (!storyActive) {
      setPreArrived(false);
      setMapArrived(false);
    }
  }, [storyActive]);

  return (
    <div className="text-white">
      <div
        className={`
    pointer-events-none absolute top-3 left-3 z-[3]
    transition-opacity duration-700 ease-out
    ${mapArrived ? "opacity-100" : "opacity-0"}
  `}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4243 9.79244C18.4119 8.58141 16.1397 8.10579 13.8185 8.40377C14.3296 7.36657 14.5787 6.30262 14.5425 5.29599C14.4765 3.44125 13.4458 1.88258 11.6421 0.908411C9.35075 -0.329354 5.85832 -0.298793 3.33909 0.979085C1.20318 2.06213 0.0276816 3.85957 0.0276816 6.04285C0.0276816 7.44679 0.00851693 18.9878 0.00212836 21.9523L0 22.6438C0 23.2512 0.549416 23.7574 1.22661 23.7689L13.8952 23.9981C13.9889 24 14.0826 24 14.1762 24C18.9975 24 22.4324 22.0841 23.6015 18.7452C24.7451 15.4827 23.3481 11.5517 20.4243 9.79244ZM9.37417 9.9548C9.2677 10.0217 9.20594 10.0637 9.19103 10.0732C8.648 10.4476 8.53727 11.1295 8.94188 11.6262C9.34649 12.1228 10.1046 12.2374 10.6668 11.8879C10.7222 11.8535 10.7775 11.8172 10.8244 11.7866C11.5229 11.3607 15.2006 9.35502 19.0294 11.6586C21.0461 12.8716 22.0257 15.7482 21.2143 18.071C20.3838 20.4452 17.8901 21.7518 14.1912 21.7518C14.1102 21.7518 14.0272 21.7518 13.9484 21.7499L2.51284 21.5436V21.3124C2.51923 17.603 2.53627 7.36084 2.53627 6.04094C2.53627 4.32755 3.64575 3.40496 4.57422 2.93315C6.32682 2.04494 8.81198 2.00101 10.3516 2.83192C11.4334 3.41451 11.9999 4.26833 12.0403 5.36666C12.0978 6.96926 10.9734 8.8985 9.37417 9.9548Z"
            fill="#D91B24"
          />
        </svg>
      </div>

      {/* MAP / WORLD */}
      <div className="h-32 relative">
        <StoryMap
          latitude={55.707813}
          longitude={9.55368}
          zoom={14}
          pitch={54}
          bearing={-16}
          storyActive={storyActive}
          onArrive={() => {
            setPreArrived(true);
            setTimeout(() => setMapArrived(true), 400); // micro gap
          }}
          canvas={{ gl: { logarithmicDepthBuffer: true, antialias: true } }}
        />
        {/* SOFT ATMOSPHERIC PRE-VEIL */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.0) 80%,
                rgba(0,0,0,0.08) 85%,
                rgba(0,0,0,0.22) 90%,
                rgba(0,0,0,0.38) 95%,
                rgba(0,0,0,0.44) 100%
              )
            `,
          }}
        />

        {/* DARK VEIL */}
        <div
          className={`
            pointer-events-none absolute inset-0 z-[2]
            transition-opacity duration-1000 ease-out
            ${mapArrived ? "opacity-100" : "opacity-0"}
          `}
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.0) 80%,
                rgba(0,0,0,0.15) 85%,
                rgba(0,0,0,0.45) 90%,
                rgba(0,0,0,0.75) 95%,
                rgba(0,0,0,0.95) 100%
              )
            `,
          }}
        />
      </div>
      {/* IDENTITY COLUMN */}
      <div
        //animate this height also for full immersive experience! :D<3
        className={`
      relative z-10 flex flex-col items-center text-center
      transition-all duration-1000 ease-out
      ${mapArrived ? "-mt-16 " : "-mt-44"}
    `}
      >




        {/* Avatar + Name + Meta */}
        <div
          className={`
      flex flex-col items-center
      transition-all duration-1000 ease-out
      ${mapArrived ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
    `}
        >
          <div className="w-20 h-20 mt-[20px] bg-red-700/40 rounded-full p-1 shadow-lg mb-2">
            <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center text-3xl">
              👨‍💼
            </div>
          </div>
        </div>
        <div
          className={`
      text-xs text-white/70
      transition-all duration-700 ease-out
    `}
        >
          <FallingUsername
            storyActive={storyActive}
            mapArrived={mapArrived}
            text="Vejle, Denmark"
          />
        </div>
        <div
          className={`
        font-medium text-white/90 tracking-wide
        transition-all duration-700 ease-out
        ${mapArrived ? "opacity-100 text-base translate-y-0" : "opacity-0 text-xl translate-y-1"}
      `}
        >
          <div className="text-sm">
Founder, Boooks
          {/* <FallingUsername
            storyActive={storyActive}
            mapArrived={!mapArrived}
            text="CFO Boooks · Vejle, Denmark"
            /> */}
            </div>
        </div>
        
      </div>
<div className="relative w-full h-0">
<div
  className={`
    absolute left-0 top-1/2 -translate-y-1/2
    flex gap-1
    transition-all duration-700 ease-out delay-200
    ${mapArrived ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}
  `}
>
  {["./assets/books/reading/devops.jpg", "./assets/books/reading/strength.jpg", "./assets/books/reading/chickensoup.webp"].map((i) => (
     <img
    key={i}
      className="w-6 h-auto rounded-sm bg-red-700 border border-green-400/20"
            
            src={i} alt={i}/>
  ))}
</div>
<div
  className={`
    absolute right-0 top-1/2 -translate-y-1/2
    flex gap-1
    transition-all duration-700 ease-out delay-200
    ${mapArrived ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}
  `}
>
  {["./assets/books/reading/taoteching.jpg", "./assets/books/reading/shaolin.png", "./assets/books/reading/actionable.jpg"].map((i) => (

    <img
    key={i}
      className="w-6 h-auto rounded-sm bg-red-700 border border-green-400/20"
            
            src={i} alt={i}/>

  ))}
</div>
</div>
      <Progress progress={0.2}>
        <g transform="translate(5,5)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#eee"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shield-icon lucide-shield"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>
        </g>
      </Progress>

      {/* <Progress progress={0.8}>
      <g transform="translate(5,5)">

        <Level/>
        </g>
      </Progress> */}

      <div className="hidden">
        {/* IDENTITY SPACE */}
        <div className="relative z-10 -mt-10 flex flex-col items-center text-center">
          {/* Handle (always visible) */}
          <div className="text-xs text-white/60 tracking-wide">@iamjacob</div>

          {/* Avatar + Name + Meta */}
          <div
            className={`
            mt-3 flex flex-col items-center
            transition-all duration-700 ease-out
            ${
              mapArrived
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            }
          `}
          >
            {/* Avatar */}
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg mb-2">
              <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center text-3xl">
                👨‍💼
              </div>
            </div>

            {/* Name */}
            <div
              className={`
              text-lg font-semibold text-white
              transition-opacity duration-700 delay-100
              ${mapArrived ? "opacity-100" : "opacity-0"}
            `}
            >
              Jacob
            </div>

            {/* Role · Location */}
            <div
              className={`
              text-xs text-white/70
              transition-opacity duration-700 delay-200
              ${mapArrived ? "opacity-100" : "opacity-0"}
            `}
            >
              Author · Vejle, Denmark
            </div>
          </div>
        </div>

        {/* SPACING */}
        <div className="h-24" />

        {/* ACTION */}
        <a className="flex flex-col items-center text-white text-xs">
          Wishlist
        </a>

        <div className="flex justify-between w-screen px-4">
          {!thisUser && !following ? (
            <button>Follow</button>
          ) : (
            <button>Following</button>
          )}
          {!thisUser ? <button>Manage</button> : <button>Donate</button>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
