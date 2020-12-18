import React, { memo } from 'react';

import { LibraryIcon } from '../icon';

import './open-library.scss';
import '../../assets/style/theme.scss';

type TFCOpenLibrary = {
  open?: boolean
  onClick: () => void
}

const OpenLibrary: React.FC<TFCOpenLibrary> = ({ open, onClick }: TFCOpenLibrary) => {

  return (
    <div className="open-library" onClick={onClick}>
      <LibraryIcon />
      <span className="open-library__text">{open ? 'Закрыть' : 'Открыть'} библиотеку</span>
    </div>
  )
};

export default memo(OpenLibrary);