import React from 'react';


import PlayerButton from './player-button';
import { ArrowIcon, PlayIcon, PauseIcon } from '../icon';
import { getAudioTime } from '../utils/getAudioTime';
import { TSongInfo } from '../../types';

import './player.scss';

type TFCPlayer = {
  audioRef: any
  songInfo: TSongInfo
  currentAudioSong: string | undefined
  onSongPlay: boolean
  setOnSongPlay: (state: boolean) => void
  setSongInfo: (state: any) => void
}

const Player: React.FC<TFCPlayer> = (
  { audioRef, songInfo, currentAudioSong, onSongPlay, setOnSongPlay, setSongInfo }: TFCPlayer) => {

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

  const timeUpdateHandler = (event: React.SyntheticEvent<HTMLAudioElement>): void => {
    const currentTimeSong = event.currentTarget.currentTime
    const durationAudio = event.currentTarget.duration;

    setSongInfo({ currentTimeSong, durationAudio })
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
          max={songInfo.durationAudio}
          onChange={dragHandler} />
        <span className="player-time__item player-duration">
          {0 || getAudioTime(songInfo.durationAudio)}
        </span>
      </div>

      <div className="player-control">
        <PlayerButton Icon={ArrowIcon} left />
        <PlayerButton Icon={onSongPlay ? PauseIcon : PlayIcon} onClick={playSongHanlder} />
        <PlayerButton Icon={ArrowIcon} />
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