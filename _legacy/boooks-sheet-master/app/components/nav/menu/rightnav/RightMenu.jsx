import Share from "../../menus/Share";
import Love from "../../menus/Love";
import ReadingNow from "../../ReadingNow";
import Comments from "../../menus/Comments";
import User from "../../menus/User";
import AddBook from "../../menus/AddBook";
import {useUI} from '../../../../ui/store/ui.store'



// const books = ["",""];
const books = [];

const RightMenu = ({
  onAddClick,
  onCommentsClick,
  onShareClick,
  onProfileClick,
  setAdding
}) => {


  const canvasActive = useUI((s) => s.canvasActive);

  const hasBooks = books.length > 0;


  return (

    <div className={`absolute w-[44px] flex flex-col items-center gap-2
    right-[8px] top-1/2 -translate-y-1/2 z-50
    transition-all duration-400 ease-out
    ${
      canvasActive
        ? "opacity-0 translate-x-6 pointer-events-none"
        : "opacity-100 translate-x-0"
    }
  `}>
      <User progress={0.9} onProfileClick={onProfileClick} />
      <Love />
      <Comments onCommentsClick={onCommentsClick} />
      <Share onShareClick={onShareClick} />

      {/* {should we move this to side menu?} */}
      {/* <button
        aria-label="Open filter"
        className="text-white text-[11px] p-[8px] rounded-full bg-black/10 backdrop-blur flex items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><path d="M10 5H3"/><path d="M12 19H3"/><path d="M14 3v4"/><path d="M16 17v4"/><path d="M21 12h-9"/><path d="M21 19h-5"/><path d="M21 5h-7"/><path d="M8 10v4"/><path d="M8 12H3"/></svg>
      Filter
      </button> */}

      {/*Scanner*/}
      <button
        onClick={setAdding}
        aria-label="Open Scanner"
        className="text-white text-[11px] p-2 rounded-full bg-black/10 backdrop-blur items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1"
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 13H9"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 10L12 16"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21Z"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <path
            d="M19 10H18"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Scan
      </button>

      {/* {if is not this user} */}
    {(!hasBooks) && <AddBook onAddClick={onAddClick} />}

      <ReadingNow />

    </div>
  );
};
export default RightMenu;
