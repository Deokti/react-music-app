import React from 'react';

import PlayerButton from './player-button';
import { ArrowIcon, PlayIcon, PauseIcon } from '../icon';
import { getAudioTime } from '../utils/getAudioTime';
import { TSongInfo } from '../../types';
import AudioRange from '../../audio-range';

import './player.scss';

type TFCPlayer = {
  currentAudioSong: string | undefined
  onSongPlay: boolean
  setOnSongPlay: (state: boolean) => void
  nextAudioSong: (state: string) => void
  prevAudioSong: (state: string) => void
  currentSongId: string | undefined

  audioRef: React.RefObject<HTMLAudioElement>
  songInfo: TSongInfo
  timeUpdateHandler: (event: any) => void
  dragHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Player: React.FC<TFCPlayer> = (
  { audioRef, currentAudioSong, onSongPlay, setOnSongPlay, nextAudioSong,
    currentSongId, prevAudioSong, songInfo, timeUpdateHandler, dragHandler
  }: TFCPlayer) => {

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

  const onTimeUpdateHandler = (event: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const currentTime = event.currentTarget.currentTime;
    const durationTime = event.currentTarget.duration;

    timeUpdateHandler(event);
    timeEnded(currentTime === durationTime);
  }

  return (
    <div className="player">
      <div className="player-time">
        <span
          className="player-time__item player-current-time">
          {getAudioTime(songInfo.currentTimeSong)}
        </span>
        <AudioRange
          value={songInfo.currentTimeSong}
          max={songInfo.durationAudio}
          trackAnimation={songInfo.trackAnimation}
          onChange={dragHandler}
        />
        <span className="player-time__item player-duration">
          {getAudioTime(songInfo.durationAudio || 0)}
        </span>
      </div>

      <div className="player-control">
        <PlayerButton
          title="Назад"
          Icon={ArrowIcon}
          left
          onClick={() => prevAudioSong(currentSongId!)}
        />
        <PlayerButton
          title={onSongPlay ? 'Пауза' : 'Продолжить'}
          Icon={onSongPlay ? PauseIcon : PlayIcon}
          onClick={playSongHanlder}
        />
        <PlayerButton
          title="Вперёд"
          Icon={ArrowIcon}
          onClick={() => nextAudioSong(currentSongId!)}
        />
      </div>

      <audio
        src={currentAudioSong}
        ref={audioRef}
        onTimeUpdate={onTimeUpdateHandler}
        onLoadedMetadata={onTimeUpdateHandler}
      />
    </div>
  )
};

export default Player;