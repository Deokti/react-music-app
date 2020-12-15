import React, { memo } from 'react';

import { LibraryIcon } from '../icon';

import './open-library.scss';
import '../../assets/style/theme.scss';

type TFCOpenLibrary = {
  open?: boolean
}

const OpenLibrary: React.FC<TFCOpenLibrary> = ({ open }: TFCOpenLibrary) => {

  return (
    <div className="open-library">
      <LibraryIcon />
      <span className="open-library__text">Открыть библиотеку</span>
    </div>
  )
};

export default memo(OpenLibrary);