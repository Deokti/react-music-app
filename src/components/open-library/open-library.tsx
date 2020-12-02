import React, { memo } from 'react';

import { LibraryIcon } from '../icon';

import './open-library.scss';
import '../../assets/style/theme.scss';
import { iconTheme, themeColor } from '../../theme';

type TFCOpenLibrary = {
  open?: boolean
  darkMode: boolean | undefined
}

const OpenLibrary: React.FC<TFCOpenLibrary> = ({ darkMode, open }: TFCOpenLibrary) => {

  return (
    <div className="open-library">
      <LibraryIcon color={iconTheme(darkMode)} />
      <span className={`open-library__text ${themeColor(darkMode)}`}>Открыть библиотеку</span>
    </div>
  )
};

export default memo(OpenLibrary);