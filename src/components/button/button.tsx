import React, { memo } from 'react';
import { SpinnerLoader } from '../icon';

import './button.scss';

type TFCButton = {
  loading?: boolean
  children: string
  className?: string
  onClick?: (state?: any) => any
  backgroundColor?: string
  borderRadius?: number
  width?: number | string
  height?: number | string
  pseudoClassFocus?: boolean
  pseudoClassActive?: boolean
}


const Button: React.FC<TFCButton> = (
  { loading = false, children,
    className = '', onClick,
    backgroundColor = "#2376CA", borderRadius = 4,
    width = '100%', height = 40,
    pseudoClassFocus = false, pseudoClassActive = false
  }: TFCButton) => {

  const onFocus = pseudoClassFocus ? 'on-focus' : '';
  const onActive = pseudoClassActive ? 'on-active' : '';

  return (
    <button style={{ backgroundColor, borderRadius, width, height }}
      className={`button ${onFocus} ${onActive} ${className}`.trim()}
      onClick={onClick}
    >
      {loading ? <SpinnerLoader /> : children}
    </button>
  );
};

export default memo(Button);