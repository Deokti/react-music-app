import React from 'react';

import './audio-range.scss';


type TFCAudio = {
  className?: string
  min?: number
  value?: number
  max?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any
  trackAnimation?: number
}

const AudioRange: React.FC<TFCAudio> = ({ className = '', min = 0, max, value, onChange, trackAnimation }: TFCAudio) => {
  const animation = { transform: `translateX(${trackAnimation}%)` };

  return (
    <div className="audio-range">
      <input
        type="range"
        className={`audio-range__input ${className}`}
        min={min}
        value={value}
        max={max || 0}
        onChange={onChange}
      />
      <span
        className="audio-range__animate"
        style={animation} />
    </div>
  )
};

export default AudioRange;