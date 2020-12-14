import React, { useRef, useState } from 'react';

import './player.scss';

import PlayerButton from './player-button';
import { ArrowIcon, PlayIcon, PauseIcon } from '../icon';
import { getAudioTime } from '../utils/getAudioTime';

type TFCPlayer = {
  currentAudioSong: string
  onSongPlay: boolean
  setOnSongPlay: (state: boolean) => void
}

type TSongInfo = {
  currentTimeSong: number
  durationAudio: number
}

const Player: React.FC<TFCPlayer> = ({ currentAudioSong, onSongPlay, setOnSongPlay }: TFCPlayer) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songInfo, setSongInfo] = useState<TSongInfo>({
    currentTimeSong: 0,
    durationAudio: 0
  });

  const playSongHanlder = () => {
    const { current } = audioRef;

    // Если true - значти мелодия игрет и её нужно остановить
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

    audioRef.current!.currentTime = currentTimeSong;
    setSongInfo((prevState) => {
      return {
        ...prevState,
        currentTimeSong
      }
    })
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
        onLoadedData={timeUpdateHandler}
      />
    </div>
  )
};

export default Player;