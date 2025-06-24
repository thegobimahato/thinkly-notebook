import React from "react";

export default function Logo() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[30px] w-[30px] md:h-[40px] md:w-[40px]"
    >
      <title>Thinkly</title>
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeWidth="4"
        fill="currentColor"
      />
      <image
        href="/logo.svg"
        x="7.5"
        y="7.5"
        width="25"
        height="25"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
