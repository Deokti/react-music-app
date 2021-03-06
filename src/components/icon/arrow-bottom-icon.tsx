import React, { memo } from "react";

const ArrowBottomIcon = ({ color = '#131313' }) => {
  return (
    <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.0815625 0.643564L0.132187 0.69828L3.95719 4.77592C4.08656 4.91402 4.28062 5 4.49719 5C4.71375 5 4.90781 4.91141 5.03719 4.77592L8.85938 0.706097L8.92406 0.638353C8.97187 0.573215 9 0.49505 9 0.411673C9 0.184992 8.79187 0 8.53312 0H0.466875C0.208125 0 0 0.184992 0 0.411673C0 0.497655 0.0309375 0.578426 0.0815625 0.643564Z" fill={color} />
    </svg>
  )
};

export default memo(ArrowBottomIcon);
