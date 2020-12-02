import React, { memo } from 'react';

const PlayIcon = ({ color = "#000" }) => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0)">
        <path d="M23.1124 11.4101L3.11249 0.160108C2.725 -0.0573909 2.2525 -0.0523909 1.87 0.170108C1.485 0.395108 1.25 0.805106 1.25 1.25011V23.75C1.25 24.195 1.485 24.605 1.87 24.83C2.065 24.9425 2.2825 25 2.5 25C2.71 25 2.92249 24.9475 3.11249 24.84L23.1124 13.5901C23.5049 13.3676 23.7499 12.9526 23.7499 12.5001C23.7499 12.0476 23.5049 11.6326 23.1124 11.4101Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="25" height="25" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
};

export default memo(PlayIcon);

