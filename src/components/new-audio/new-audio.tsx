import React, { useMemo, useRef, useState } from 'react';
import { database, databaseRef } from '../../config/firebase';
import { TSongDatabase, TSongInfo } from '../../types';
import Button from '../button';
import { PauseIcon, PlayIcon } from '../icon';
import Input from '../input';
import { v4 as uuidv4 } from "uuid";

import './new-audio.scss';
import AudioRange from '../../audio-range';
import { withAudioControl } from '../HOC/with-audio-control';

interface TFCNewAudit {
  closeNewAudio: () => void
  audioRef: React.MutableRefObject<any>
  songInfo: TSongInfo
  timeUpdateHandler: (event: any) => void
  dragHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

type TLinks = {
  poster: string
  audio: string
  name: string
  author: string
}

const NewAudio: React.FC<TFCNewAudit> = ({ closeNewAudio, audioRef, songInfo, timeUpdateHandler, dragHandler }: TFCNewAudit) => {
  const linksBase = useMemo(() => ({ name: '', author: '', poster: '', audio: '' }), []);

  const [onPlay, setOnPlay] = useState<boolean>(false);
  const [links, setLinks] = useState<TLinks>(linksBase);
  const [error, setError] = useState<string>('');

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

  const close = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    closeNewAudio();
  }

  const onInputEmpty = ({ name, author, poster, audio }: TLinks) => {
    return name.trim().length && author.trim().length &&
      poster.trim().length && audio.trim().length;
  }

  const linkСhecking = (link: string): boolean => {
    if (/^(ftp|http|https):\/\/[^ "]+$/.test(link)) return true;

    setError('Ссылка не соотвествует!');
    return false;
  }

  const fieldHandling = (links: TLinks): boolean => {
    if (!onInputEmpty(links)) {
      setError('Все поля должны заполнены!');
      return false;
    }

    return linkСhecking(links.audio) && linkСhecking(links.poster);
  }

  const saveAudio = ({ name, author, poster, audio }: TLinks): TSongDatabase => {
    return {
      id: uuidv4(),
      name,
      author,
      poster,
      audio
    };
  };

  const onDatabaseSave = (links: TLinks) => {
    const audioData = saveAudio(links);

    return database.ref(databaseRef.MUSICS).push().set(audioData);
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    event.preventDefault();
    setError('');

    if (fieldHandling(links)) {
      onDatabaseSave(links);
      setLinks(linksBase);
      closeNewAudio();
    }
  }

  return (
    <div className="new-audio">
      <form className="new-audio__body" onSubmit={onSubmit}>
        <div className="new-audio__info">
          <Input
            type="text"
            inputTitle="Название"
            onChange={inputHandler}
            name="name"
            color="#407fab"
            value={links.name}
          />
          <Input
            type="text"
            inputTitle="Автор"
            onChange={inputHandler}
            name="author"
            color="#407fab"
            value={links.author}
          />
        </div>
        <div className="new-audio__bottom">
          <div className="new-audio__inner">
            <div className="new-audio__left">
              <Input
                type="text"
                inputTitle="Ссылка на картинку"
                onChange={inputHandler}
                name="poster"
                color="#407fab"
                value={links.poster}
              />
              <Input
                type="text"
                inputTitle="Ссылка на аудио (MP3)"
                onChange={inputHandler}
                name="audio"
                color="#407fab"
                value={links.audio}
              />
            </div>

            <div className="new-audio__preview">
              <h4 className="new-audio__preview-title">Превью</h4>

              {/* Картика */}
              {
                links.poster && (
                  <div className="new-audio__image" style={{ backgroundImage: "url(" + links.poster + ")" }}></div>
                )
              }

              {/* Аудио */}
              {
                links.audio && (
                  <div className="new-audio__audio">
                    <AudioRange
                      value={songInfo.currentTimeSong}
                      max={songInfo.durationAudio}
                      trackAnimation={songInfo.trackAnimation}
                      onChange={dragHandler}
                    />
                    <audio
                      ref={audioRef}
                      src={links.audio}
                      onTimeUpdate={timeUpdateHandler}
                    />
                    <div className="new-audio__state" onClick={playSongHanlder}>
                      {onPlay ? <PauseIcon size={13} /> : <PlayIcon size={13} />}
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          {error.length > 0 && <span className="new-audio__error">{error}</span>}
        </div>

        <div className="new-audio__buttons">
          <Button
            width="19.7rem"
            height="4rem"
            backgroundColor="#159FED"
            borderRadius={0}
            className="new-audio__button"
            onClick={onSubmit}
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


export default withAudioControl()(NewAudio);