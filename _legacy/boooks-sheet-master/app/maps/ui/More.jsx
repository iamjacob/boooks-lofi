import React, { useState } from "react";
import { Ellipsis, X } from "lucide-react";

const More = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Info Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
         className="p-2 rounded-full bg-black/10 backdrop-blur
 flex items-center justify-center shadow-lg active:scale-90 transition-transform flex-col gap-1"

      >
        {isOpen ? <X className="w-5 h-5 text-gray-700" /> : <Ellipsis className="text-gray-700" />}
      </button>

      {/* Info Panel */}
      {isOpen && (
        <div className="fixed overflow-y-auto z-2000 h-32 left-1/2 -translate-x-1/2 bottom-18 w-80 bg-white/50 backdrop-blur rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
        {/* <div className="fixed overflow-y-auto z-100 h-[320px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-80 bg-white/50 backdrop-blur rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"> */}
       

         </div>
      )}
      </>
  );
};

export default More;