import React, { memo } from 'react';
import { SpinnerLoader } from '../icon';

import './button.scss';

type TFCButton = {
  loading?: boolean
  children: string
  className?: string
  onClick?: () => any
}

const Button: React.FC<TFCButton> = ({ loading = false, children, className = '', onClick }: TFCButton) => {
  return (
    <button
      className={`button ${className}`.trim()}
      onClick={onClick}
    >
      {loading ? <SpinnerLoader /> : children}
    </button>
  );
};

export default memo(Button);