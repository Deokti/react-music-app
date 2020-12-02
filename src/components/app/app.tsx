import React, { useState } from 'react';
import Header from '../header';
import Song from '../song';
import Player from '../player';


import { TLogInUser, TSong } from '../../types';
import { themeBackground } from '../../theme';
import { songsData } from '../utils/songData';

import './app.scss';

const App: React.FC<TLogInUser> = ({ logInUser }: TLogInUser) => {
  const [songs, setSongs] = useState<Array<TSong>>(songsData());
  const [currentSong, setCurrentSong] = useState<TSong>(songs[3]);
  const [onSongPlay, setOnSongPlay] = useState<boolean>(false);

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
      </div>
    </section>
  )
};

export default App;
