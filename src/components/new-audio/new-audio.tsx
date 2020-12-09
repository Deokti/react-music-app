import React, { useRef, useState } from 'react';
import Button from '../button';
import { PauseIcon, PlayIcon } from '../icon';
import Input from '../input';


import './new-audio.scss';

type TLinks = {
  imageLink: string
  audioLink: string
}

const NewAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [onPlay, setOnPlay] = useState<boolean>(false);
  const [songInfo, setSongInfo] = useState(0);
  const [links, setLinks] = useState<TLinks>({
    imageLink: '',
    audioLink: ''
  });

  const timeUpdateHandler = (event: React.SyntheticEvent<HTMLAudioElement>): void => {
    const currentTimeSong = event.currentTarget.currentTime
    setSongInfo(currentTimeSong);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setLinks((prevState) => ({ ...prevState, [name]: value }));
  };

  const playSongHanlder = () => {
    const { current } = audioRef;

    // Если true - значти мелодия игрет и её нужно остановить
    if (onPlay) {
      current?.pause();
      setOnPlay(!onPlay);
      return false;
    }

    current?.play();
    setOnPlay(!onPlay);
  };

  return (
    <div className="new-audio">
      <form className="new-audio__body">
        <div className="new-audio__inner">
          <div className="new-audio__left">
            <Input
              type="text"
              inputTitle="Ссылка на картинку"
              onChange={inputHandler}
              name="imageLink"
              value={links.imageLink}
            />
            <Input
              type="text"
              inputTitle="Ссылка на аудио (MP3)"
              onChange={inputHandler}
              name="audioLink"
              value={links.audioLink}
            />
          </div>

          <div className="new-audio__preview">
            <h4 className="new-audio__preview-title">Превью</h4>

            {/* Картика */}
            {
              links.imageLink && (
                <div className="new-audio__image" style={{ backgroundImage: "url(" + links.imageLink + ")" }}></div>
              )
            }

            {/* Аудио */}

            {links.audioLink && (
              <div className="new-audio__audio">
                <input type="range" className="new-audio__range" />
                <div className="new-audio__state" onClick={playSongHanlder}>
                  {onPlay ? <PauseIcon size={13} /> : <PlayIcon size={13} />}
                </div>
              </div>
            )}
            <audio ref={audioRef} src={links.audioLink} />
          </div>
        </div>

        <div className="new-audio__buttons">
          <Button
            width="19.7rem"
            height="4rem"
            backgroundColor="#159FED"
            borderRadius={0}
            className="new-audio__button"
          >
            Добавить
              </Button>
          <Button
            width="19.7rem"
            height="4rem"
            backgroundColor="#FF4460"
            borderRadius={0}
            className="new-audio__button"
          >
            Отмена
            </Button>
        </div>
      </form>
    </div>
  )
};


export default NewAudio;