"use client";
import { useRef, useLayoutEffect, useState } from "react";

const AutoWidthInput = ({
  value,
  placeholder,
  minWidth = 155,
  maxWidth = 320,
  className = "",
  ...props
}) => {
  const inputRef = useRef(null);
  const mirrorRef = useRef(null);
  const [width, setWidth] = useState(minWidth);

  useLayoutEffect(() => {
    if (!inputRef.current || !mirrorRef.current) return;

    const text = value || placeholder || "";
    mirrorRef.current.textContent = text;

    const mirrorWidth =
      mirrorRef.current.getBoundingClientRect().width;

    const styles = getComputedStyle(inputRef.current);
    const padding =
      parseFloat(styles.paddingLeft) +
      parseFloat(styles.paddingRight);

    const nextWidth = Math.min(
      Math.max(mirrorWidth + padding, minWidth),
      maxWidth
    );

    setWidth(nextWidth);
  }, [value, placeholder, minWidth, maxWidth]);

  return (
    <span className="relative inline-block font-inherit text-inherit">
      <input
        ref={inputRef}
        {...props}
        value={value}
        placeholder={placeholder}
        style={{ width }}
        className={`bg-transparent outline-none box-content px-2 ${className}`}
      />

      {/* Mirror: same text, same font, zero layout impact */}
      <span
        ref={mirrorRef}
        aria-hidden
        className={`
          absolute invisible whitespace-pre pointer-events-none
          font-inherit text-inherit
          ${className}
        `}
      />
    </span>
  );
};

export default AutoWidthInput;
