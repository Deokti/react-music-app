import { url } from 'inspector';
import React from 'react';
import { themeColor } from '../../theme';
import { TDarkTheme, TSong } from '../../types';

import './song.scss';

type TFCSong = {
  currentSong: TSong
}

const Song: React.FC<TFCSong & TDarkTheme> = ({ currentSong, darkTheme }: TFCSong & TDarkTheme) => {
  const { name, cover, artist } = currentSong;

  return (
    <div className="song">
      <div className="song__cover" style={{ backgroundImage: "url(" + cover + ")" }} />
      <h2 className={`song__name ${themeColor(darkTheme)}`}> {name} </h2>
      <span className="song__artist"> {artist} </span>
    </div>
  )
};

export default Song;