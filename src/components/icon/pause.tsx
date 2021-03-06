import React, { memo } from 'react';

const PauseIcon = ({ color = "#000", size = 25 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.44771 21.5178C9.44771 23.4409 7.88859 25 5.96555 25C4.04252 25 2.4834 23.4409 2.4834 21.5178V3.48216C2.4834 1.55912 4.04252 0 5.96555 0C7.88859 0 9.44771 1.55912 9.44771 3.48216V21.5178Z" fill={color} />
      <path d="M22.5161 21.5178C22.5161 23.4409 20.957 25 19.0339 25C17.1109 25 15.5518 23.4409 15.5518 21.5178V3.48216C15.5523 1.55912 17.1114 0 19.0339 0C20.957 0 22.5161 1.55912 22.5161 3.48216V21.5178Z" fill={color} />
    </svg>
  )
};

export default memo(PauseIcon);

