import React, { useRef, useState } from 'react';
import { convertTimeToPercent } from '../utils/convert-time-to-percent';

// Компонент высшего порядка, который занимается 
// управлением состояния аудио.
// Отвечает за обновление времени текущей песни, 
// конвентировании времени в проценты 
// и изминение текущего времени при перетаскивании ползунка
const withAudioControl = () => (Wrapper) => {
  return (props) => {
    const audioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
      currentTimeSong: 0,
      durationAudio: 0,
      trackAnimation: 0,
    });

    const timeUpdateHandler = (event) => {
      const currentTimeSong = event.currentTarget.currentTime
      const durationAudio = event.currentTarget.duration;
      const trackAnimation = convertTimeToPercent(currentTimeSong, durationAudio);

      setSongInfo({ currentTimeSong, durationAudio, trackAnimation });
    }

    const dragHandler = (event) => {
      const currentTimeSong = Number(event.target.value);

      // Установка времени при перетаскивании ползунка
      audioRef.current.currentTime = currentTimeSong;
      setSongInfo((prevState) => ({ ...prevState, currentTimeSong }));
    }

    return (
      <Wrapper
        audioRef={audioRef}
        songInfo={songInfo}
        timeUpdateHandler={timeUpdateHandler}
        dragHandler={dragHandler}
        {...props}
      />
    );
  }
};

export { withAudioControl };
