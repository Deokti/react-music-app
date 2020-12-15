import React from 'react';
import { TSong } from '../../types';


import './song.scss';

type TFCSong = {
  currentSong: TSong | undefined
}

const Song: React.FC<TFCSong> = ({ currentSong }: TFCSong) => {

  return (
    <div className="song">
      <div className="song__cover" style={{ backgroundImage: "url(" + currentSong?.poster + ")" }} />
      <h2 className={`song__name`}> {currentSong?.name} </h2>
      <span className="song__artist"> {currentSong?.author} </span>
    </div>
  )
};

export default Song;