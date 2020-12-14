import React from 'react';
import { TSong } from '../../../types';

import './library-item.scss';

interface ILibraryItem {
  song: TSong
}

const LibraryItem: React.FC<ILibraryItem> = ({ song }: ILibraryItem) => {

  return (
    <div className="library-item">
      <div className="library-item__cover" style={{ backgroundImage: "url(" + song.cover + ")" }} />

      <div className="library-item__description">
        <h2 className="library-item__name"> {song.name} </h2>
        <span className="library-item__artist"> {song.artist} </span>
      </div>

    </div>
  )
};

export default LibraryItem;

