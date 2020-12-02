import React from 'react';

import lightTheme from '../../assets/icon/light-theme.svg';
import darkTheme from '../../assets/icon/dark-theme.svg';

import './toggle-switch.scss';

type TFCToggleSwitch = {
  checked?: boolean
  toggleTheme: () => void
}

const ToggleSwitch: React.FC<TFCToggleSwitch> = ({ checked, toggleTheme }: TFCToggleSwitch) => {

  return (
    <div className={`toggle-switch ${checked && 'toggle-switch-active'}`} onClick={toggleTheme}>
      <span className="toggle-switch__circle">
        <img src={checked ? darkTheme : lightTheme} alt="theme" />
      </span>
    </div>
  );
};

export default ToggleSwitch;