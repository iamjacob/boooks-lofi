import Level from "../Level";
import Read from "./bottomnav/Read";
// import AddBook from "../menus/AddBook";

const BottomNav = ({
  onReadClick,
  onSearchClick,
  onWishListClick,
  onAddClick,
}) => {
  const isThisUserLoggedIn = true; // Replace with actual authentication logic

  const books = ["", ""];
  //const books = [];
  const hasBooks = books.length > 0;

  const lastActiveBook = "/assets/books/reading/wealth.webp";

  const AddBook = ({ onAddClick }) => {
    return (
      <button
        onClick={()=>{onAddClick(true)}}
        className="flex flex-col items-center text-white text-xs mb-[12px] active:scale-90 transition-transform cursor-pointer"
      >
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>

        <div className="text-white text-[11px]">Add</div>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 md:bottom-8 left-0 right-0 h-[42px] w-screen flex items-center justify-center z-[1000]">
      <div className="w-full md:gap-12 md:w-auto md:max-w-2xl md:rounded-full bg-black/10 backdrop-blur flex items-center justify-around h-full md:px-12">
        {/* Your nav content goes here */}
        {/* <a
        href="#wishlist!"
        onClick={(e) => {
          e.preventDefault();
          onWishListClick?.();
        }}
        className="flex flex-col items-center text-white text-xs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-gift-icon lucide-gift"
        >
          <rect x="3" y="8" width="18" height="4" rx="1" />
          <path d="M12 8v13" />
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
        </svg>
        Wishlist
      </a> */}
        <a
          href="#wishlist!"
          onClick={(e) => {
            e.preventDefault();
            onWishListClick?.();
          }}
          className="flex flex-col items-center text-white text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466V6.50448C2 7.54232 2 8.06124 2.2596 8.49142C2.5192 8.9216 2.99347 9.18858 3.94202 9.72255L6.85504 11.3624C7.49146 11.7206 7.80967 11.8998 8.03751 12.0976C8.51199 12.5095 8.80408 12.9935 8.93644 13.5872C9 13.8722 9 14.2058 9 14.8729L9 17.5424C9 18.452 9 18.9067 9.25192 19.2613C9.50385 19.6158 9.95128 19.7907 10.8462 20.1406C12.7248 20.875 13.6641 21.2422 14.3321 20.8244C15 20.4066 15 19.4519 15 17.5424V14.8729C15 14.2058 15 13.8722 15.0636 13.5872C15.1959 12.9935 15.488 12.5095 15.9625 12.0976C16.1903 11.8998 16.5085 11.7206 17.145 11.3624L20.058 9.72255C21.0065 9.18858 21.4808 8.9216 21.7404 8.49142C22 8.06124 22 7.54232 22 6.50448V5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3Z"
              stroke="#fff"
              strokeWidth="1"
            />
          </svg>
          Filter
        </a>

        <a
          href="#Shelf!"
          className="flex flex-col items-center text-white text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-library-icon lucide-library"
          >
            <path d="m16 6 4 14" />
            <path d="M12 6v14" />
            <path d="M8 8v12" />
            <path d="M4 4v16" />
          </svg>
          Shelf
        </a>

        {/* <a
        href="#read!"
        className="flex flex-col items-center text-white text-xs mb-[12px]"
        onClick={(e) => {
          e.preventDefault();
          onReadClick?.();
        }}
      >
        <svg
          width="33"
          height="37"
          viewBox="0 0 33 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.971 8.48848C29.9706 8.32497 29.8704 8.20421 29.7523 8.15587L29.6305 8.13315C24.7597 8.29038 21.8677 9.14374 17.8583 11.3148V32.5221C19.3801 31.7346 20.825 31.1256 22.3409 30.6813C24.5441 30.0361 26.8322 29.7543 29.6407 29.7124L29.7626 29.6855C29.8791 29.6337 29.971 29.511 29.971 29.357V8.48848ZM2.81094 29.3591C2.81094 29.5622 2.97297 29.7096 3.14115 29.7124L4.18752 29.7392C7.87393 29.8842 10.663 30.5091 13.6192 31.8383C12.3433 29.9813 10.4236 28.4272 8.3771 27.7394C7.08554 27.3048 6.24144 26.0903 6.24104 24.752V8.44097C5.60453 8.33316 5.04637 8.25285 4.36915 8.19926L3.19688 8.1352C2.97158 8.1278 2.81122 8.30419 2.81094 8.49055V29.3591ZM32.782 29.357C32.782 30.9561 31.586 32.3179 30.004 32.5034L29.6821 32.5263C27.0455 32.5656 25.0236 32.8273 23.1315 33.3816C21.2352 33.937 19.4044 34.8052 17.1649 36.1232C16.7255 36.3815 16.1802 36.3813 15.7409 36.1232C11.6229 33.6998 8.67514 32.7279 4.04717 32.551L3.09988 32.5263C1.36274 32.5005 0 31.067 0 29.3591V8.49055C0.000274737 6.67465 1.51695 5.26397 3.29182 5.32339L4.61474 5.3957C5.20969 5.44339 5.72244 5.51172 6.24104 5.59197V3.1975C6.24104 0.953044 8.61267 -0.7474 10.7691 0.334027L10.7711 0.331975C13.8888 1.896 16.5915 4.93174 17.5839 8.28397C21.4393 6.32592 24.629 5.47779 29.5397 5.31927L29.874 5.32752C31.518 5.44802 32.7816 6.84612 32.782 8.48848V29.357ZM9.05198 24.752C9.05238 24.9075 9.14951 25.0287 9.2728 25.0702L10.0344 25.3594C11.9143 26.1478 13.6659 27.4722 15.0474 29.0906V9.69503C14.5254 7.14793 12.5146 4.56477 10.024 3.12519L9.5122 2.84834C9.43183 2.80794 9.33866 2.8055 9.23153 2.87519C9.11836 2.94888 9.05198 3.06701 9.05198 3.1975V24.752Z"
            fill="white"
            strokeWidth="1"
          />
        </svg>
        Read
      </a> */}

        {/* <Read onReadClick={onReadClick} /> */}

        <div className="relative h-[64px] flex items-center justify-center">
          {/* ADD */}
          <div
            className={`absolute transition-all duration-200 ease-out
      ${
        !hasBooks
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
          >
            <AddBook onAddClick={()=>{onAddClick(true)}} />
          </div>

          {/* READ */}
          <div
            className={`absolute transition-all duration-200 ease-out
      ${
        hasBooks
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
          >
            <Read onReadClick={onReadClick} lastBook={lastActiveBook} />
          </div>
        </div>

        <a
          href="#Search!"
          onClick={(e) => {
            e.preventDefault();
            onSearchClick?.();
          }}
          className="flex flex-col items-center text-white text-xs"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 9.75C19.5 4.36522 15.1348 0 9.75 0C4.36522 0 0 4.36522 0 9.75C0 15.1348 4.36522 19.5 9.75 19.5C12.1726 19.5 14.3888 18.6164 16.094 17.154L22.0836 23.1443L22.1677 23.2169C22.4614 23.4348 22.878 23.4106 23.1443 23.1443C23.4372 22.8514 23.4372 22.3765 23.1443 22.0836L17.154 16.094C18.6164 14.3888 19.5 12.1726 19.5 9.75ZM1.5 9.75C1.5 5.19365 5.19365 1.5 9.75 1.5C14.3063 1.5 18 5.19365 18 9.75C18 14.3063 14.3063 18 9.75 18C5.19365 18 1.5 14.3063 1.5 9.75Z"
              fill="#F9F9F9"
            />
          </svg>
          Search
        </a>

        {/* // <Level/> */}
        <a
          href="#Profile!"
          className="flex flex-col items-center text-white text-xs"
        >
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#fff"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Profile
        </a>
      </div>
    </nav>
  );
};

export default BottomNav;
