import React from 'react';
import { TDarkTheme, TSong } from '../../types';
import Button from '../button';
import LibraryItem from './library-item';

import './library.scss';

interface ILibrary {
  songs: Array<TSong>
  changeCurrentSong: (id: string) => void
  openLibrary: () => void
}

const Library: React.FC<TDarkTheme & ILibrary> = ({ darkTheme, songs, changeCurrentSong, openLibrary }: TDarkTheme & ILibrary) => (
  <div className="library">
    <div className="library-top">
      <h3 className="library__title">Библиотека</h3>
    </div>

    <ul className="library__list">
      {
        songs.map((song) => (
          <li className="library__item" key={song.id}
            onClick={() => changeCurrentSong(song.id)}
          >
            <LibraryItem song={song} />
          </li>
        ))
      }
    </ul>

    <Button
      className="library__button"
      onClick={openLibrary}
      borderRadius={0}
      height="5rem"
    >
      Добавить новую мелодию
    </Button>
  </div>
);

export default Library;