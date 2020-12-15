import React from 'react';
import { TSong } from '../../types';
import Button from '../button';
import LibraryItem from './library-item';

import './library.scss';

interface ILibrary {
  songs: Array<TSong> | null
  changeCurrentSong: (id: string) => void
  openNewAudio: () => void
}

const Library: React.FC<ILibrary> = ({ songs, changeCurrentSong, openNewAudio }: ILibrary) => (
  <div className="library">
    <div className="library-top">
      <h3 className="library__title">Библиотека</h3>
    </div>

    <ul className="library__list">
      {
        songs?.map((song) => (
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
      onClick={openNewAudio}
      borderRadius={0}
      height="5rem"
    >
      Добавить новую мелодию
    </Button>
  </div>
);

export default Library;