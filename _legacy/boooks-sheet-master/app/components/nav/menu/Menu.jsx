import React, { useState } from "react";
import {
  Settings,
  HelpCircle,
  LogOut,
  Building,
  Zap,
  Users,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  BookOpen,
  LifeBuoy,
} from "lucide-react";
import FullScreen from "./../../Fullscreen";
const Menu = ({ isOpen, onClose, onOpenLogin }) => {
  const isLoggedIn = false;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);

  const userName = "InSideYou";

  return (
    <aside
      className={`absolute left-0 top-0 h-screen w-60 z-[1004] flex flex-col justify-between rounded-tr-lg rounded-br-lg border-r p-1 border-white/30 bg-black/70 text-white backdrop-blur shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="topBar flex items-center w-full fixed top-0 left-0 p-1">
        {/* <button
          onClick={onClose}
          aria-label="Close menu"
          className="rounded hover:bg-white/10 p-2"
        >
          <div className="flex w-[28px] h-[22px] justify-around radius-1 items-baseline">
            <div className="book w-[6px] h-[22px] border-[#D91B24] border rounded-[2px]"></div>
            <div className="book w-[6px] h-[16px] border-[#D91B24] border rounded-[2px]"></div>
            <div className="book w-[6px] h-[18px] border-[#D91B24] border rounded-[2px]"></div>
          </div>
        </button> */}
        <div className="p-2 flex justify-between w-full">
          <svg
            className="w-auto h-5.5"
            alt="Boooks"
            fill="#D91B24"
            viewBox="212 416 578 170"
            y="0px"
            x="0px"
            version="1.1"
            height="40"
            strokeWidth="1"
          >
            <g>
              <path
                d="M423.98,489.83c-3.86-3.86-8.44-6.93-13.62-9.14c-5.18-2.2-10.77-3.32-16.61-3.32&#10;&#9;&#9;c-5.84,0-11.43,1.12-16.61,3.32c-5.18,2.2-9.73,5.28-13.54,9.13c-3.8,3.86-6.85,8.45-9.06,13.63c-2.2,5.18-3.32,10.77-3.32,16.61&#10;&#9;&#9;c0,5.85,1.12,11.43,3.32,16.61c2.2,5.18,5.25,9.74,9.05,13.54c3.81,3.81,8.36,6.85,13.54,9.05c5.18,2.2,10.77,3.32,16.61,3.32&#10;&#9;&#9;c5.84,0,11.43-1.12,16.61-3.32c5.18-2.2,9.76-5.25,13.63-9.06c3.86-3.8,6.93-8.35,9.13-13.54c2.2-5.18,3.32-10.77,3.32-16.61&#10;&#9;&#9;c0-5.84-1.12-11.43-3.32-16.61C430.91,498.28,427.84,493.69,423.98,489.83z M421.43,531.7c-1.59,3.63-3.77,6.85-6.49,9.57&#10;&#9;&#9;c-2.72,2.72-5.94,4.91-9.57,6.49c-3.63,1.59-7.54,2.39-11.63,2.39c-4.09,0-8-0.81-11.63-2.39c-3.63-1.58-6.82-3.77-9.48-6.49&#10;&#9;&#9;c-2.66-2.72-4.82-5.94-6.4-9.56c-1.59-3.63-2.39-7.54-2.39-11.63c0-4.09,0.81-8,2.39-11.63c1.58-3.62,3.74-6.87,6.4-9.64&#10;&#9;&#9;c2.66-2.78,5.85-4.99,9.49-6.58c3.63-1.59,7.55-2.39,11.63-2.39c4.08,0,7.99,0.81,11.63,2.39c3.63,1.59,6.85,3.8,9.57,6.58&#10;&#9;&#9;c2.72,2.77,4.9,6.02,6.49,9.64c1.59,3.63,2.4,7.55,2.4,11.63C423.83,524.15,423.02,528.06,421.43,531.7z"
                fill="#D91B24"
              />
              <path
                d="M519.78,489.83c-3.86-3.86-8.44-6.93-13.62-9.14c-5.18-2.2-10.77-3.32-16.61-3.32&#10;&#9;&#9;c-5.84,0-11.43,1.12-16.61,3.32c-5.18,2.2-9.73,5.28-13.54,9.13c-3.8,3.86-6.85,8.45-9.06,13.63c-2.2,5.18-3.32,10.77-3.32,16.61&#10;&#9;&#9;c0,5.85,1.12,11.43,3.32,16.61c2.2,5.18,5.25,9.74,9.05,13.54c3.81,3.81,8.36,6.85,13.54,9.05c5.18,2.2,10.77,3.32,16.61,3.32&#10;&#9;&#9;c5.84,0,11.43-1.12,16.61-3.32c5.18-2.2,9.76-5.25,13.63-9.06c3.86-3.8,6.93-8.35,9.13-13.54c2.2-5.18,3.32-10.77,3.32-16.61&#10;&#9;&#9;c0-5.84-1.12-11.43-3.32-16.61C526.71,498.28,523.63,493.69,519.78,489.83z M517.23,531.7c-1.59,3.63-3.77,6.85-6.49,9.57&#10;&#9;&#9;c-2.72,2.72-5.94,4.91-9.57,6.49c-3.63,1.59-7.54,2.39-11.63,2.39c-4.09,0-8-0.81-11.63-2.39c-3.63-1.58-6.82-3.77-9.48-6.49&#10;&#9;&#9;c-2.66-2.72-4.82-5.94-6.4-9.56c-1.59-3.63-2.39-7.54-2.39-11.63c0-4.09,0.81-8,2.39-11.63c1.58-3.62,3.74-6.87,6.4-9.64&#10;&#9;&#9;c2.66-2.78,5.85-4.99,9.49-6.58c3.63-1.59,7.55-2.39,11.63-2.39c4.08,0,7.99,0.81,11.63,2.39c3.63,1.59,6.85,3.8,9.57,6.58&#10;&#9;&#9;c2.72,2.77,4.9,6.02,6.49,9.64c1.59,3.63,2.4,7.55,2.4,11.63C519.62,524.15,518.82,528.06,517.23,531.7z"
                fill="#D91B24"
              />
              <path
                d="M615.57,489.83c-3.86-3.86-8.44-6.93-13.62-9.14c-5.18-2.2-10.77-3.32-16.61-3.32&#10;&#9;&#9;c-5.84,0-11.43,1.12-16.61,3.32c-5.18,2.2-9.73,5.28-13.54,9.13c-3.8,3.86-6.85,8.45-9.06,13.63c-2.2,5.18-3.32,10.77-3.32,16.61&#10;&#9;&#9;c0,5.85,1.12,11.43,3.32,16.61c2.2,5.18,5.25,9.74,9.05,13.54c3.81,3.81,8.36,6.85,13.54,9.05c5.18,2.2,10.77,3.32,16.61,3.32&#10;&#9;&#9;c5.84,0,11.43-1.12,16.61-3.32c5.18-2.2,9.76-5.25,13.63-9.06c3.85-3.8,6.93-8.35,9.13-13.54c2.2-5.18,3.32-10.77,3.32-16.61&#10;&#9;&#9;c0-5.84-1.12-11.43-3.32-16.61C622.5,498.28,619.43,493.69,615.57,489.83z M613.02,531.7c-1.59,3.63-3.77,6.85-6.49,9.57&#10;&#9;&#9;c-2.72,2.72-5.94,4.91-9.57,6.49c-3.63,1.59-7.54,2.39-11.63,2.39c-4.09,0-8-0.81-11.63-2.39c-3.63-1.58-6.82-3.77-9.48-6.49&#10;&#9;&#9;c-2.67-2.72-4.82-5.94-6.4-9.56c-1.59-3.63-2.39-7.54-2.39-11.63c0-4.09,0.81-8,2.39-11.63c1.58-3.62,3.74-6.87,6.4-9.64&#10;&#9;&#9;c2.66-2.78,5.86-4.99,9.49-6.58c3.63-1.59,7.55-2.39,11.63-2.39c4.08,0,7.99,0.81,11.63,2.39c3.63,1.59,6.85,3.8,9.57,6.58&#10;&#9;&#9;c2.71,2.77,4.9,6.02,6.49,9.64c1.59,3.63,2.4,7.55,2.4,11.63C615.42,524.15,614.61,528.06,613.02,531.7z"
                fill="#D91B24"
              />
              <path
                d="M678.95,509.45l0.31-0.32l25.71-26.22c0.52-0.63,0.87-1.09,1.02-1.33c0.07-0.11,0.18-0.41,0.18-1.17&#10;&#9;&#9;c0-0.4,0-1.35-2.02-1.35h-11.76c-1.01,0-1.78,0.19-2.31,0.58c-0.59,0.43-1.22,0.98-1.87,1.63l-29.93,31.31v-72.51&#10;&#9;&#9;c0-0.98-0.33-1.73-1-2.31c-0.7-0.6-1.47-0.89-2.36-0.89h-6.89c-1.09,0-1.87,0.3-2.39,0.92c-0.54,0.64-0.81,1.39-0.81,2.28v117.31&#10;&#9;&#9;c0,2.18,1.02,3.2,3.2,3.2h6.89c2.3,0,3.37-1.02,3.37-3.2v-26.76l11.29-11.64l31.45,39.09c0.63,0.85,1.34,1.48,2.11,1.89&#10;&#9;&#9;c0.76,0.41,1.5,0.61,2.2,0.61h11.6c2.36,0,2.36-0.98,2.36-1.35c0-0.64-0.46-1.43-1.37-2.34L678.95,509.45z"
                fill="#D91B24"
              />
              <path
                d="M769.96,522.04c-5.01-4.35-12.04-7.68-20.88-9.89c-1.58-0.45-3.2-0.96-4.83-1.53&#10;&#9;&#9;c-1.66-0.57-3.2-1.32-4.57-2.24c-1.39-0.93-2.54-2.08-3.42-3.42c-0.89-1.36-1.34-2.95-1.34-4.73c0-2.83,1.33-5.41,3.95-7.69&#10;&#9;&#9;c2.6-2.26,6.02-3.4,10.16-3.4c3.11,0,5.87,0.85,8.19,2.53c2.27,1.65,4.23,3.64,5.83,5.92c0.76,0.97,1.48,1.84,2.14,2.55&#10;&#9;&#9;c0.34,0.38,0.82,0.67,1.69,0.02l6.9-4.88c0.57-0.46,0.5-0.8,0.47-0.91c-0.1-0.46-0.26-0.9-0.46-1.31&#10;&#9;&#9;c-2.85-4.93-6.23-8.9-10.02-11.76c-3.76-2.83-8.78-4.27-14.91-4.27c-3.96,0-7.61,0.58-10.84,1.74c-3.23,1.15-6.03,2.75-8.33,4.78&#10;&#9;&#9;c-2.29,2.02-4.08,4.48-5.33,7.31c-1.25,2.84-1.89,5.99-1.89,9.38c0,6.33,2.21,11.57,6.56,15.6c4.4,4.07,10.32,7.08,17.6,8.96&#10;&#9;&#9;c2.34,0.67,4.58,1.38,6.68,2.11c2.1,0.74,3.97,1.63,5.57,2.66c1.61,1.04,2.93,2.27,3.92,3.66c1.01,1.43,1.52,3.16,1.52,5.16&#10;&#9;&#9;c0,1.78-0.51,3.4-1.52,4.83c-0.99,1.4-2.28,2.6-3.84,3.58c-1.55,0.97-3.29,1.73-5.18,2.24c-1.88,0.51-3.82,0.77-5.76,0.77&#10;&#9;&#9;c-1.15,0-2.52-0.17-4.06-0.52c-1.55-0.34-3.11-0.89-4.65-1.63c-1.55-0.75-2.98-1.74-4.25-2.95c-1.28-1.22-2.28-2.72-2.98-4.46&#10;&#9;&#9;c-0.22-0.86-0.64-1.52-1.29-2.07c-0.33-0.28-0.67-0.41-1.03-0.41c-0.27,0-0.55,0.08-0.86,0.23l-8.44,3.38&#10;&#9;&#9;c-0.51,0.17-0.74,0.48-0.78,1c-0.05,0.65,0.02,1.22,0.22,1.71l0.02,0.05c0.87,2.95,2.25,5.58,4.11,7.81&#10;&#9;&#9;c1.86,2.24,4.1,4.12,6.67,5.6c2.58,1.49,5.4,2.63,8.36,3.39c2.98,0.77,5.99,1.16,8.95,1.16c4.29,0,8.28-0.56,11.87-1.66&#10;&#9;&#9;c3.56-1.1,6.68-2.68,9.25-4.71c2.56-2.02,4.61-4.53,6.08-7.48c1.47-2.94,2.22-6.26,2.22-9.86&#10;&#9;&#9;C777.43,531.85,774.92,526.35,769.96,522.04z"
                fill="#D91B24"
              />
              <path
                d="M318.46,488.75c-9.45-6.34-20.12-8.83-31.02-7.27c2.4-5.43,3.57-11,3.4-16.27&#10;&#9;&#9;c-0.31-9.71-5.15-17.87-13.62-22.97c-10.76-6.48-27.16-6.32-38.99,0.37c-10.03,5.67-15.55,15.08-15.55,26.51&#10;&#9;&#9;c0,7.35-0.09,67.77-0.12,83.29l-0.01,3.62c0,3.18,2.58,5.83,5.76,5.89l59.49,1.2c0.44,0.01,0.88,0.01,1.32,0.01&#10;&#9;&#9;c22.64,0,38.77-10.03,44.26-27.51C338.75,518.54,332.19,497.96,318.46,488.75z M266.57,489.6c-0.5,0.35-0.79,0.57-0.86,0.62&#10;&#9;&#9;c-2.55,1.96-3.07,5.53-1.17,8.13c1.9,2.6,5.46,3.2,8.1,1.37c0.26-0.18,0.52-0.37,0.74-0.53c3.28-2.23,20.55-12.73,38.53-0.67&#10;&#9;&#9;c9.47,6.35,14.07,21.41,10.26,33.57c-3.9,12.43-15.61,19.27-32.98,19.27c-0.38,0-0.77,0-1.14-0.01l-53.7-1.08l0-1.21&#10;&#9;&#9;c0.03-19.42,0.11-73.04,0.11-79.95c0-8.97,5.21-13.8,9.57-16.27c8.23-4.65,19.9-4.88,27.13-0.53c5.08,3.05,7.74,7.52,7.93,13.27&#10;&#9;&#9;C279.36,473.97,274.08,484.07,266.57,489.6z"
                fill="#D91B24"
              />
            </g>
          </svg>
        </div>
        <div className="mr-4">
          <FullScreen />
        </div>
      </div>

      <div className="overflow-y-auto">
        <ul className="mt-14 space-y-2 p-4 pt-0">
          <li>
            <a href="/" className="block p-2 rounded-lg hover:bg-white/10">
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
                className="lucide lucide-circle-icon lucide-circle"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
              Home
            </a>
          </li>

          <li>
            <a
              href="#section3"
              className="block p-2 rounded-lg hover:bg-white/10"
            >
              <svg
                width="24"
                height="19"
                viewBox="0 0 18 14"
                fill="none"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.65222 1.5C4.44707 1.5 3.44467 2.5009 3.44467 3.76725C3.44467 5.0336 4.44707 6.0345 5.65222 6.0345C6.85737 6.0345 7.85977 5.0336 7.85977 3.76725C7.85977 2.5009 6.85737 1.5 5.65222 1.5ZM1.94467 3.76725C1.94467 1.70085 3.59052 0 5.65222 0C7.71392 0 9.35977 1.70085 9.35977 3.76725C9.35977 5.83365 7.71392 7.5345 5.65222 7.5345C3.59052 7.5345 1.94467 5.83365 1.94467 3.76725ZM5.65222 10.1896C3.69227 10.1896 2.02237 11.5308 1.50071 13.3836C1.42587 13.6494 1.17139 13.8354 0.898907 13.7906L0.405532 13.7094C0.133052 13.6646 -0.0535932 13.4065 0.0138468 13.1388C0.655882 10.5894 2.92767 8.68965 5.65222 8.68965C8.37672 8.68965 10.6486 10.5894 11.2906 13.1388C11.358 13.4065 11.1714 13.6646 10.8989 13.7094L10.4055 13.7906C10.1331 13.8354 9.87857 13.6494 9.80372 13.3836C9.28207 11.5308 7.61217 10.1896 5.65222 10.1896Z"
                  fill="white"
                />
                <path
                  d="M13.1522 11.0185C12.7745 11.0185 12.4121 11.084 12.0746 11.2046C11.8145 11.2975 11.5117 11.2121 11.3797 10.9696L11.1407 10.5304C11.0087 10.2879 11.0976 9.9815 11.3527 9.8758C11.9087 9.6455 12.5165 9.51855 13.1522 9.51855C15.3799 9.51855 17.2319 11.0652 17.7875 13.1406C17.859 13.4074 17.6715 13.6654 17.399 13.7098L16.9055 13.7902C16.6329 13.8346 16.3795 13.6478 16.2969 13.3843C15.8631 12 14.6072 11.0185 13.1522 11.0185Z"
                  fill="white"
                />
                <path
                  d="M13.1522 4.5C12.4619 4.5 11.9022 5.05965 11.9022 5.75C11.9022 6.44035 12.4619 7 13.1522 7C13.8426 7 14.4022 6.44035 14.4022 5.75C14.4022 5.05965 13.8426 4.5 13.1522 4.5ZM10.4022 5.75C10.4022 4.2312 11.6334 3 13.1522 3C14.671 3 15.9022 4.2312 15.9022 5.75C15.9022 7.2688 14.671 8.5 13.1522 8.5C11.6334 8.5 10.4022 7.2688 10.4022 5.75Z"
                  fill="white"
                />
              </svg>
              Network
            </a>
          </li>

          <li>
            <a
              href="/scrolls"
              className="block p-2 rounded-lg hover:bg-white/10"
            >
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
                className="lucide lucide-scroll-text-icon lucide-scroll-text"
              >
                <path d="M15 12h-5" />
                <path d="M15 8h-5" />
                <path d="M19 17V5a2 2 0 0 0-2-2H4" />
                <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
              </svg>
              Scrolls
            </a>
          </li>
          <li>
            <a
              href="#section4"
              className="block p-2 rounded-lg hover:bg-white/10"
            >
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeWidth="1.5"
                  d="M9.55563 13.3232L9.43584 13.3123C7.90803 13.1735 7.14412 13.104 6.90146 12.5814C6.65881 12.0588 7.09869 11.4304 7.97846 10.1736L11.5612 5.05544C12.1424 4.22517 12.433 3.81003 12.6836 3.89831C12.9342 3.98658 12.9005 4.4922 12.8331 5.50343L12.6299 8.55194C12.5685 9.47214 12.5379 9.93224 12.8023 10.2419C13.0667 10.5515 13.5259 10.5933 14.4444 10.6768L14.5642 10.6877C16.092 10.8265 16.8559 10.896 17.0985 11.4186C17.3412 11.9412 16.9013 12.5696 16.0215 13.8264L12.4388 18.9446C11.8576 19.7748 11.567 20.19 11.3164 20.1017C11.0658 20.0134 11.0995 19.5078 11.1669 18.4966L11.3701 15.4481C11.4315 14.5279 11.4621 14.0678 11.1977 13.7581C10.9333 13.4485 10.4741 13.4067 9.55563 13.3232Z"
                  stroke="#fff"
                />
                <path
                  d="M18.5 4L17 6H19L17.5 8"
                  stroke="#f00"
                  strokeOpacity="0.5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.5 16L5 18H7L5.5 20"
                  stroke="#0f0"
                  strokeWidth="2"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Books
            </a>
          </li>
          <li>
            <a
              href="/#browse"
              className="block p-2 rounded-lg hover:bg-white/10"
            >
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
                className="lucide lucide-earth-icon lucide-earth"
              >
                <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Browse
            </a>
          </li>
          <li>
            <a href="/maps" className="block p-2 rounded-lg hover:bg-white/10">
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
                className="lucide lucide-map-icon lucide-map"
              >
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                <path d="M15 5.764v15" />
                <path d="M9 3.236v15" />
              </svg>
              Maps
            </a>
          </li>
          <li>
            <a
              href="/#quotes"
              className="block p-2 rounded-lg hover:bg-white/10"
            >
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
                className="lucide lucide-quote-icon lucide-quote"
              >
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" />
              </svg>
              Quotes
            </a>
          </li>
          <li>
            <a
              href="/scrolls"
              className="block p-2 rounded-lg hover:bg-white/10"
            >
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
                className="lucide lucide-newspaper-icon lucide-newspaper"
              >
                <path d="M15 18h-5" />
                <path d="M18 14h-8" />
                <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                <rect width="8" height="4" x="10" y="6" rx="1" />
              </svg>
              News
            </a>
          </li>
        </ul>
        <div className="">
          {!isLoggedIn ? (
            <button
              onClick={() => {
                onOpenLogin?.();
                onClose?.(); // optional: close menu when opening login
              }}
              className="m-[5%] w-[90%] box-sizing bg-[#fff] text-black font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4"
            >
              Log på
            </button>
          ) : (
            <div className="border-t border-gray-800 relative">
              {/* User Menu Popup */}
              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 mx-2 bg-gray-900 rounded-lg border border-gray-800 shadow-2xl overflow-hidden">
                  {!helpMenuOpen ? (
                    <>
                      {/* Main Menu */}
                      <div className="p-3 border-b border-gray-800 bg-gray-800/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                            JD
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white">
                              Jacob Dawad
                            </div>
                            <div className="text-xs text-gray-400">Plus</div>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <Building
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Find arbejdsområder
                          </span>
                        </button>

                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <Zap
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Opgrader abonnement
                          </span>
                        </button>

                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <Users
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Personlig tilpasning
                          </span>
                        </button>

                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <Settings
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Indstillinger
                          </span>
                        </button>
                      </div>

                      <div className="border-t border-gray-800 py-1">
                        <button
                          onClick={() => setHelpMenuOpen(true)}
                          className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group"
                        >
                          <HelpCircle
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Hjælp
                          </span>
                          <ChevronRight
                            size={16}
                            className="ml-auto text-gray-600"
                          />
                        </button>

                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <LogOut
                            size={18}
                            className="text-gray-400 group-hover:text-red-400 transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-red-400 transition-colors">
                            Log ud
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Help Submenu */}
                      <div className="p-3 border-b border-gray-800 bg-gray-800/50">
                        <button
                          onClick={() => setHelpMenuOpen(false)}
                          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <ChevronLeft size={18} />
                          <span className="text-sm font-semibold">Tilbage</span>
                        </button>
                      </div>

                      <div className="py-1">
                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <LifeBuoy
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Hjælpecenter
                          </span>
                        </button>

                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <MessageCircle
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Kontakt support
                          </span>
                        </button>

                        <button className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-800 transition-colors text-left group">
                          <BookOpen
                            size={18}
                            className="text-gray-400 group-hover:text-white transition-colors"
                          />
                          <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            Dokumentation
                          </span>
                        </button>
                      </div>

                      <div className="border-t border-gray-800 py-2 px-4">
                        <div className="text-xs text-gray-500">
                          Version 2.1.4
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="p-4">
                {/* Logged In User Button */}
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-gray-900 rounded-lg transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    JD
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      Jacob Dawad
                    </div>
                    <div className="text-xs text-gray-400">Plus</div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 group-hover:text-white transition-all ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Bottom User Section - Guest State */}

          {/* {!isLoggedIn && (
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                <button className="w-full px-6 py-4 text-center hover:bg-gray-50 transition-colors">
                  <span className="text-base font-medium text-gray-900">Log på</span>
                </button>
              </div>
            )}

            {isLoggedIn && (
              <div className="absolute bottom-0 left-0 right-0 bg-white/30 border-t border-gray-200">
                <button className="w-full px-6 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">JG</span>
                  </div>
                  <div className="flex flex-col items-start flex-1">
                    <span className="text-base font-medium text-gray-900">{userName}</span>
                    <span className="text-sm text-gray-600">Plus</span>
                  </div>
                </button>
              </div>
            )} */}
        </div>

        <footer className="py-12 px-6">
          <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 1;
            max-height: 500px;
          }
          to {
            opacity: 0;
            max-height: 0;
          }
        }
        
        details > div {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
        }
        
        details[open] > div {
          animation: slideDown 0.4s ease-out forwards;
        }
        
        details:not([open]) > div {
          animation: slideUp 0.3s ease-out forwards;
        }

        a:active, a:hover{
  border-bottom: 2px solid #D91B24;
  border-radius:0px;
  transition: border-bottom 0.2s ease-in-out;
}
      `}</style>
          <div className="max-w-6xl mx-auto">
            {/* Company Section */}
            <details className="mb-2 border-b border-gray-700 group">
              <summary className="flex items-center justify-between py-4 text-sm font-semibold hover:text-gray-700 cursor-pointer list-none">
                <span>Company</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-400 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div>
                <div className="grid grid-cols-1 gap-x-32 gap-y-4 pb-4 pt-2">
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    About
                  </a>
                  <a
                    href="#newsroom"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Newsroom
                  </a>
                  <a
                    href="#store"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Store
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Contact
                  </a>
                  <a
                    href="#careers"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Careers
                  </a>
                  <a
                    href="#partners"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Partners
                  </a>
                </div>
              </div>
            </details>

            {/* Programs Section */}
            <details className="mb-2 border-b border-gray-700 group">
              <summary className="flex items-center justify-between py-4 text-sm font-semibold hover:text-gray-700 cursor-pointer list-none">
                <span>Programs</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-400 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div>
                <div className="grid grid-cols-1 gap-x-32 gap-y-4 pb-4 pt-2">
                  <a
                    href="#reading-program"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Reading Program
                  </a>
                  <a
                    href="#for-authors"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    For Authors
                  </a>
                  <a
                    href="#book-clubs"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Book Clubs
                  </a>
                  <a
                    href="#advertise"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Advertise
                  </a>
                  <a
                    href="#browse"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Browse
                  </a>
                  <a
                    href="#embed"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Embed
                  </a>
                  <a
                    href="#rewards"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Rewards
                  </a>
                  <a
                    href="#publisher-rewards"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Publisher Rewards
                  </a>
                </div>
              </div>
            </details>

            {/* Resources Section */}
            <details className="border-b border-gray-700 group">
              <summary className="flex items-center justify-between py-4 text-sm font-semibold hover:text-gray-700 cursor-pointer list-none">
                <span>Resources</span>
                <svg
                  className="w-5 h-5 transform transition-transform duration-400 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div>
                <div className="grid grid-cols-1 gap-x-32 gap-y-4 pb-4 pt-2">
                  <a href="#help" className="text-gray-300 hover:text-gray-900">
                    Help Center
                  </a>
                  <a
                    href="#safety"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Safety Center
                  </a>
                  <a
                    href="#privacy"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Privacy Center
                  </a>
                  <a
                    href="#author-academy"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Author Academy
                  </a>
                  <a
                    href="#guidelines"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Community Guidelines
                  </a>
                  <a
                    href="#transparency"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Transparency
                  </a>
                  <a
                    href="#accessibility"
                    className="text-gray-300 hover:text-gray-900"
                  >
                    Accessibility
                  </a>
                </div>
              </div>
            </details>
          </div>
        </footer>
        {/* <div className="fixed bottom-0 flex w-full p-4 flex-wrap items-center justify-around text-xs bg-black/10 backdrop-blur">
          <div className="flex gap-2">
            <a href=""> Vision </a> | <a href=""> Privacy </a>
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default Menu;
