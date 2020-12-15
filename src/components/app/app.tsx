import React, { useEffect, useRef, useState } from 'react';
import Header from '../header';
import Song from '../song';
import Player from '../player';
import Library from '../library';
import NewAudio from '../new-audio';

import { TLogInUser, TSong, TSongInfo } from '../../types';

import './app.scss';

type TApp = {
  songs: Array<TSong>
  firstSong: TSong
}

const App: React.FC<TLogInUser & TApp> = ({ logInUser, songs, firstSong }: TLogInUser & TApp) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState<TSong>(firstSong);
  const [onSongPlay, setOnSongPlay] = useState<boolean>(false);
  const [newAudioState, setNewAudioState] = useState<boolean>(false);
  const [songInfo, setSongInfo] = useState<TSongInfo>({
    currentTimeSong: 0,
    durationAudio: 0
  });

  useEffect(() => {
    setCurrentSong(firstSong);
  }, [firstSong]);

  const openNewAudio = () => setNewAudioState(true);
  const closeNewAudio = () => setNewAudioState(false);

  const changeCurrentSong = (id: string) => {
    const selected = songs.find((item) => item.id === id);

    if (selected) {
      if (selected?.id !== currentSong.id) {
        const audioPrimise = audioRef.current?.play();

        setCurrentSong(selected);
        setOnSongPlay(false);

        // При переключении проверяем на существование и запускаем
        audioPrimise?.then(() => {
          audioRef.current?.play();
          setOnSongPlay(true);
        });
      }
    };
  }

  const changeTheme = (currentTheme: string): void => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  };

  useEffect(() => {
    const darkTheme = logInUser?.darkTheme

    if (darkTheme) changeTheme('dark');
    else changeTheme('light');

  }, [logInUser?.darkTheme])

  return (
    <section className="app">
      <Header logInUser={logInUser} />

      <div className="app-content">
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          currentAudioSong={currentSong?.audio}
          onSongPlay={onSongPlay}
          setOnSongPlay={setOnSongPlay}
        />
        <Library
          songs={songs}
          changeCurrentSong={changeCurrentSong}
          openNewAudio={openNewAudio}
        />

        {newAudioState && <NewAudio closeNewAudio={closeNewAudio} />}
      </div>
    </section>
  )
};

export default App;
