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
  const appRef = useRef<HTMLDivElement>(null);
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

  const audioPrimisePlay = () => {
    const audioPrimise = audioRef.current?.play();

    audioPrimise?.then(() => {
      audioRef.current?.play();
      setOnSongPlay(true);
    });
  }

  const prevAudioSong = async (id: string) => {
    const songIndex = songs.findIndex((item) => item.id === id);
    const selected = songs[songIndex - 1];

    if (songIndex > 0) {
      await setCurrentSong(selected);
      await audioPrimisePlay();
    }
  }

  const nextAudioSong = async (id: string) => {
    const songIndex = songs.findIndex((item) => item.id === id);
    const arraySongs = songs.length === (songIndex + 1);
    const selected = songs[songIndex + 1];

    if (arraySongs) {
      await setCurrentSong(songs[0]);
      await audioPrimisePlay();
    } else {
      // Несмотря на то, что написано
      // Данный код влияет на работоспособность
      await setCurrentSong(selected);
      await audioPrimisePlay();
    }
  }

  const changeCurrentSong = (id: string) => {
    const selected = songs.find((item) => item.id === id);

    if (selected) {
      if (selected?.id !== currentSong.id) {
        const audioPrimise = audioRef.current?.play();

        setCurrentSong(selected);
        setOnSongPlay(false);

        // При переключении проверяем на существование и запускаем
        audioPrimisePlay();
      }
    };
  }

  const changeTheme = (currentTheme: string): void => {
    appRef.current?.setAttribute('data-theme', currentTheme)
  };

  useEffect(() => {
    const darkTheme = logInUser?.darkTheme

    if (darkTheme) changeTheme('dark');
    else changeTheme('light');

  }, [logInUser?.darkTheme])

  return (
    <section className="app" ref={appRef}>
      <Header logInUser={logInUser} />

      <div className="app-content">
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          currentSongId={currentSong?.id}
          currentAudioSong={currentSong?.audio}
          onSongPlay={onSongPlay}
          setOnSongPlay={setOnSongPlay}
          nextAudioSong={nextAudioSong}
          prevAudioSong={prevAudioSong}
        />
        <Library
          songs={songs}
          changeCurrentSong={changeCurrentSong}
          openNewAudio={openNewAudio}
          currentSong={currentSong}
        />

        {newAudioState && <NewAudio closeNewAudio={closeNewAudio} />}
      </div>
    </section>
  )
};

export default App;
