import React from 'react';
import { TDarkTheme } from '../../../types';

import './new-sound.scss';

const NewSound: React.FC<TDarkTheme> = ({ darkTheme }: TDarkTheme) => {

  const bgButton = darkTheme ? '#FF4460' : '#2376CA'

  return (
    <button className="new-sound" style={{ backgroundColor: bgButton }}>
      Добавить новую мелодию
    </button>
  );
};

export default NewSound;