import React from 'react';
import { themeBackground, themeColor, themeHeader } from '../../theme';
import { TDarkTheme, TSong } from '../../types';
import Button from '../button';
import LibraryItem from './library-item';

import './library.scss';

interface ILibrary {
  songs: Array<TSong>
  changeCurrentSong: (id: string) => void
}

const Library: React.FC<TDarkTheme & ILibrary> = ({ darkTheme, songs, changeCurrentSong }: TDarkTheme & ILibrary) => (
  <div className={`library ${themeHeader(darkTheme)}`}>
    <div className="library-top">
      <h3 className={`library__title ${themeBackground(darkTheme)} ${themeColor(darkTheme)}`}>Библиотека</h3>
    </div>

    <ul className="library__list">
      {
        songs.map((song) => (
          <li className="library__item" key={song.id}
            onClick={() => changeCurrentSong(song.id)}
          >
            <LibraryItem darkTheme={darkTheme} song={song} />
          </li>
        ))
      }
    </ul>

    <Button
      className="library__button"
      borderRadius={0}
      height="5rem"
      backgroundColor={darkTheme ? '#FF4460' : '#2376CA'}
    >
      Добавить новую мелодию
    </Button>
  </div>
);

export default Library;