import React from 'react';


import PlayerButton from './player-button';
import { ArrowIcon, PlayIcon, PauseIcon } from '../icon';
import { getAudioTime } from '../utils/getAudioTime';
import { TSongInfo } from '../../types';

import './player.scss';

type TFCPlayer = {
  audioRef: React.RefObject<HTMLAudioElement>
  songInfo: TSongInfo
  currentAudioSong: string | undefined
  onSongPlay: boolean
  setOnSongPlay: (state: boolean) => void
  setSongInfo: (state: any) => void
  nextAudioSong: (state: string) => void
  prevAudioSong: (state: string) => void
  currentSongId: string | undefined
}

const Player: React.FC<TFCPlayer> = (
  { audioRef, songInfo, currentAudioSong, onSongPlay, setOnSongPlay, setSongInfo, nextAudioSong, currentSongId, prevAudioSong }: TFCPlayer) => {

  const playSongHanlder = () => {
    const { current } = audioRef;

    // Если true - значит мелодия игрет и её нужно остановить
    if (onSongPlay) {
      current?.pause();
      setOnSongPlay(!onSongPlay);
      return false;
    }

    current?.play();
    setOnSongPlay(!onSongPlay);
  }

  // Если песня закончилась
  const timeEnded = (endAudio: boolean) => {
    if (endAudio) {
      setOnSongPlay(false);
      nextAudioSong(currentSongId!);
      console.log('Песня закончилась');
    }
  }

  const timeUpdateHandler = (event: React.SyntheticEvent<HTMLAudioElement>): void => {
    const currentTimeSong = event.currentTarget.currentTime
    const durationAudio = event.currentTarget.duration;

    setSongInfo({ currentTimeSong, durationAudio });
    timeEnded(currentTimeSong === durationAudio);
  }

  const dragHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentTimeSong = Number(event.target.value);

    // Установка времени при перетаскивании ползунка
    audioRef.current!.currentTime = currentTimeSong;
    setSongInfo((prevState: TSongInfo) => ({ ...prevState, currentTimeSong }));
  }

  return (
    <div className="player">
      <div className="player-time">
        <span
          className="player-time__item player-current-time">
          {getAudioTime(songInfo.currentTimeSong)}
        </span>
        <input
          type="range"
          className="player-time__lenght"
          min={0}
          value={songInfo.currentTimeSong}
          max={songInfo.durationAudio || 0}
          onChange={dragHandler} />
        <span className="player-time__item player-duration">
          {getAudioTime(songInfo.durationAudio || 0)}
        </span>
      </div>

      <div className="player-control">
        <PlayerButton Icon={ArrowIcon} left onClick={() => prevAudioSong(currentSongId!)} />
        <PlayerButton Icon={onSongPlay ? PauseIcon : PlayIcon} onClick={playSongHanlder} />
        <PlayerButton Icon={ArrowIcon} onClick={() => nextAudioSong(currentSongId!)} />
      </div>

      <audio
        src={currentAudioSong}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
      />
    </div>
  )
};

export default Player;