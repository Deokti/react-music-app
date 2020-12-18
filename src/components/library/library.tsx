import React from 'react';
import { TSong } from '../../types';
import Button from '../button';
import LibraryItem from './library-item';

import './library.scss';

interface ILibrary {
  songs: Array<TSong> | null
  changeCurrentSong: (id: string) => void
  openNewAudio: () => void
  currentSong: TSong
  libraryShow: boolean
}

const Library: React.FC<ILibrary> = ({ songs, changeCurrentSong, openNewAudio, currentSong, libraryShow }: ILibrary) => (
  <div className={`library ${libraryShow && 'library-open'}`}>
    <div className="library-top">
      <h3 className="library__title">Библиотека</h3>
    </div>

    <ul className="library__list">
      {
        songs?.map((song) => {
          const active = currentSong?.id === song?.id;

          return (
            <li key={song.id}
              className={`library__item ${active && 'active'}`.trim()}
              onClick={() => changeCurrentSong(song.id)}
            >
              <LibraryItem song={song} />
            </li>
          )
        })
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