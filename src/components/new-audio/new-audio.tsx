import React, { useRef, useState } from 'react';
import { iconTheme, themeBackground } from '../../theme';
import Button from '../button';
import { PauseIcon, PlayIcon } from '../icon';
import Input from '../input';


import './new-audio.scss';


interface TFCNewAudit {
  closeLibrary: () => void
  darkTheme: undefined | boolean
}

type TLinks = {
  imageLink: string
  audioLink: string
  name: string
  author: string
}

const NewAudio: React.FC<TFCNewAudit> = ({ closeLibrary, darkTheme }: TFCNewAudit) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [onPlay, setOnPlay] = useState<boolean>(false);
  const [songInfo, setSongInfo] = useState(0);
  const [links, setLinks] = useState<TLinks>({
    name: '',
    author: '',
    imageLink: '',
    audioLink: ''
  });

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setLinks((prevState) => ({ ...prevState, [name]: value }));
  };

  const playSongHanlder = () => {
    const { current } = audioRef;

    // Если true - значит мелодия игрет и её нужно остановить
    if (onPlay) {
      current?.pause();
      setOnPlay(!onPlay);
      return false;
    }

    current?.play();
    setOnPlay(!onPlay);
  };

  const close = (event: React.FormEvent) => {
    event.preventDefault();
    closeLibrary();
  }


  const colorIcon = iconTheme(darkTheme);
  const previewColor = darkTheme ? '#407fab' : '#225171';
  return (
    <div className="new-audio">
      <form className={`new-audio__body ${themeBackground(darkTheme)}`}>
        <div className="new-audio__inner">
          <div className="new-audio__left">
            <Input
              type="text"
              inputTitle="Название"
              onChange={inputHandler}
              name="name"
              color="#407fab"
              border="1px solid #1E2126"
              value={links.name}
            />
            <Input
              type="text"
              inputTitle="Автор"
              onChange={inputHandler}
              border="1px solid #1E2126"
              name="author"
              color="#407fab"
              value={links.author}
            />
            <Input
              type="text"
              inputTitle="Ссылка на картинку"
              border="1px solid #1E2126"
              onChange={inputHandler}
              name="imageLink"
              color="#407fab"
              value={links.imageLink}
            />
            <Input
              type="text"
              inputTitle="Ссылка на аудио (MP3)"
              border="1px solid #1E2126"
              onChange={inputHandler}
              name="audioLink"
              color="#407fab"
              value={links.audioLink}
            />
          </div>

          <div className="new-audio__preview">
            <h4 className="new-audio__preview-title" style={{ color: previewColor }}>Превью</h4>

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
                  {onPlay ? <PauseIcon size={13} color={colorIcon} /> : <PlayIcon size={13} color={colorIcon} />}
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
            onClick={close}
          >
            Отмена
            </Button>
        </div>
      </form>
    </div>
  )
};


export default NewAudio;