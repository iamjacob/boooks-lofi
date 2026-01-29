import Progress from "./Progress";

const Read = ({
  onReadClick,
  lastBook = "/assets/books/reading/wealth.webp",
}) => {
  return (
  <>
  <div className="bg-white translate-y-14 -translate-x-3.5">
        {/* <div className="scale-90">
          <Progress progress={0.6} />
        </div> */}

        <div className="scale-100">
          <Progress   strokeColor={"green"}  strokeColorFade={"#0E0"} progress={0.3} />
        </div>

        <div className="scale-105">
          <Progress  strokeColor={"blue"}  strokeColorFade={"#53F)"} progress={0.9} />
        </div>

        <div className="scale-110">
          <Progress  strokeColor={"#D91"}  strokeColorFade={"#D81"} progress={0.7} />
        </div>
        <div className="scale-115">
          <Progress  strokeColor={"#F04"}  strokeColorFade={"#A04"} progress={0.8} />
        </div>
        <div className="scale-120 ">
          <Progress  strokeColor={"#D91B24"}  strokeColorFade={"#F91B20"} progress={0.9} />
        </div>
      </div>
    <a
      href="#read!"
      className="relative flex flex-col items-center text-white text-xs mb-[20px]"
      onClick={(e) => {
        e.preventDefault();
        onReadClick?.();
      }}
    >
      

      <div className="border-t-4 pt-[6px] border-pink-500 rounded">
        <div className="relative -mt-2 flex items-center justify-center">
          {/* Ghost layer (forced visible) */}
          <img
            src={lastBook}
            width="36"
            alt=""
            className="
      absolute
      opacity-40
      blur-md
      scale-150
    "
          />

          {/* Real book */}
          <img
            src={lastBook}
            width="50"
            alt=""
            className="relative rounded-xs"
          />
        </div>
      </div>
      Read
    </a>
    </>
  );
};

export default Read;
