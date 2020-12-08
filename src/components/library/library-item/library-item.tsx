import React from 'react';
import { themeColor, themeHover } from '../../../theme';
import { TDarkTheme, TSong } from '../../../types';

import './library-item.scss';

interface ILibraryItem {
  song: TSong
}

const LibraryItem: React.FC<TDarkTheme & ILibraryItem> = ({ darkTheme, song }: TDarkTheme & ILibraryItem) => {

  return (
    <div className={`library-item ${themeHover(darkTheme)}`}>
      <div className="library-item__cover" style={{ backgroundImage: "url(" + song.cover + ")" }} />

      <div className="library-item__description">
        <h2 className={`library-item__name ${themeColor(darkTheme)}`}> {song.name} </h2>
        <span className="library-item__artist"> {song.artist} </span>
      </div>

    </div>
  )
};

export default LibraryItem;

