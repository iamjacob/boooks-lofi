import React from "react";
import { BookOpen } from "lucide-react";

const Book2d = () => {
  return (
    <div>
      <div className="w-40 h-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-sm shadow-2xl flex items-center justify-center">
        <BookOpen className="w-16 h-16 text-white/20" />
        <img
          className="w-40 h-60"
          src="https://www.williamdam.dk/products/4299625/midnight-library.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Book2d;
