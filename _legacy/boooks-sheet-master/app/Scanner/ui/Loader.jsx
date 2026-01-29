import { useState, useEffect } from "react";


const Loader = ({ speed = 80, customFrames = ["⠖", "⠴", "⠦", "⠲"] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % customFrames.length);
    }, speed);
    return () => clearInterval(timer);
  }, [speed, customFrames.length]);

  return <span className="text-[#D91B24]">{customFrames[index]}</span>;
};

export default Loader