import Model from "./Model";
import ScanSettings from "./ScanSettings";

const Header = ({ handleClose }) => {
  return (
    <div className="flex p-2 justify-between fixed w-screen top-0 z-2000">
      <button
        onClick={handleClose}
        className="p-2 rounded-full bg-black/10 backdrop-blur items-center justify-center shadow-lg active:scale-90 transition-transform flex flex-col gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <Model />

      <ScanSettings />
    </div>
  );
};

export default Header;
