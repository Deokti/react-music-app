import React, { useEffect, useRef, useState } from 'react';
import Header from '../header';
import Song from '../song';
import Player from '../player';
import Library from '../library';
import NewAudio from '../new-audio';

import { TLogInUser, TSong, TSongInfo } from '../../types';

import './app.scss';
import { withAudioControl } from '../HOC/with-audio-control';

type TApp = {
  songs: Array<TSong>
  firstSong: TSong
  audioRef: React.MutableRefObject<any>
  songInfo: TSongInfo
  timeUpdateHandler: (event: any) => void
  dragHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const App: React.FC<TLogInUser & TApp> = (
  { logInUser, songs, firstSong, audioRef, songInfo, timeUpdateHandler, dragHandler }: TLogInUser & TApp) => {

  const appRef = useRef<HTMLDivElement>(null);
  const [currentSong, setCurrentSong] = useState<TSong>(firstSong);
  const [onSongPlay, setOnSongPlay] = useState<boolean>(false);
  const [newAudioState, setNewAudioState] = useState<boolean>(false);
  const [libraryShow, setLibraryShow] = useState<boolean>(false);

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

    if (songIndex > 0) {
      const selected = songs[songIndex - 1];
      await setCurrentSong(selected);
      await audioPrimisePlay();
      return false;
    }

    const endSong = songs[songs.length - 1];
    await setCurrentSong(endSong);
    await audioPrimisePlay();
  }

  const nextAudioSong = async (id: string) => {
    const songIndex = songs.findIndex((item) => item.id === id);
    const arraySongs = songs.length === (songIndex + 1);

    if (arraySongs) {
      await setCurrentSong(songs[0]);
      await audioPrimisePlay();
      return false;
    }

    // Несмотря на то, что написано
    // Данный код влияет на работоспособность
    const selected = songs[songIndex + 1];
    await setCurrentSong(selected);
    await audioPrimisePlay();
  }

  const changeCurrentSong = (id: string) => {
    const selected = songs.find((item) => item.id === id);

    if (selected) {
      if (selected?.id !== currentSong.id) {
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
      <Library
        songs={songs}
        changeCurrentSong={changeCurrentSong}
        openNewAudio={openNewAudio}
        libraryShow={libraryShow}
        currentSong={currentSong}
      />

      <div className="app-content">
        <Header
          logInUser={logInUser}
          libraryShow={libraryShow}
          setLibraryShow={setLibraryShow}
        />
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          currentSongId={currentSong?.id}
          currentAudioSong={currentSong?.audio}
          songInfo={songInfo}
          timeUpdateHandler={timeUpdateHandler}
          dragHandler={dragHandler}
          onSongPlay={onSongPlay}
          setOnSongPlay={setOnSongPlay}
          nextAudioSong={nextAudioSong}
          prevAudioSong={prevAudioSong}
        />

        {newAudioState && <NewAudio closeNewAudio={closeNewAudio} />}
      </div>
    </section>
  )
};

export default withAudioControl()(App);
