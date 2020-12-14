import React, { useState } from 'react';
import Header from '../header';
import Song from '../song';
import Player from '../player';
import Library from '../library';


import { TLogInUser, TSong } from '../../types';
import { themeBackground } from '../../theme';
import { songsData } from '../utils/songData';

import './app.scss';
import NewAudio from '../new-audio';

const App: React.FC<TLogInUser> = ({ logInUser }: TLogInUser) => {
  const [songs, setSongs] = useState<Array<TSong>>(songsData());
  const [currentSong, setCurrentSong] = useState<TSong>(songs[0]);
  const [onSongPlay, setOnSongPlay] = useState<boolean>(false);
  const [libraryState, setLibraryState] = useState<boolean>(false);

  const openLibrary = () => setLibraryState(true);
  const closeLibrary = () => setLibraryState(false);

  const changeCurrentSong = (id: string) => {
    const selected = songs.find((item) => item.id === id);

    if (selected) {
      if (selected?.id !== currentSong.id) {
        setCurrentSong(selected);
        setOnSongPlay(false);
      }
    };
  }

  return (
    <section className={`app ${themeBackground(logInUser?.darkTheme)}`}>
      <Header logInUser={logInUser} />

      <div className="app-content">
        <Song currentSong={currentSong} darkTheme={logInUser?.darkTheme} />
        <Player
          currentAudioSong={currentSong.audio}
          onSongPlay={onSongPlay}
          setOnSongPlay={setOnSongPlay}
          darkTheme={logInUser?.darkTheme}
        />
        <Library
          darkTheme={logInUser?.darkTheme}
          songs={songs}
          changeCurrentSong={changeCurrentSong}
          openLibrary={openLibrary}
        />

        {libraryState && <NewAudio closeLibrary={closeLibrary} darkTheme={logInUser?.darkTheme} />}
      </div>
    </section>
  )
};

export default App;
