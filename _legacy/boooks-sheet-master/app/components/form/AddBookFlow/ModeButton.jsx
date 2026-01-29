import React from "react";

export const ModeButton = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col  items-center gap-4 group transition-transform active:scale-95"
  >
    {/* Icon Container */}
    <div className="size-16 flex items-center justify-center rounded-2xl backdrop-blur-xl text-slate-600 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm">
      {/* Clone the icon to ensure it sizes correctly inside the container */}
      {React.cloneElement(icon, { 
        className: "size-6 stroke-[1] stroke-[#eee]" 
      })}
    </div>

    {/* Label */}
    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-slate-900 transition-colors">
      {label}
    </span>
  </button>
);