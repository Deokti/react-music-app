import React from 'react';
import { TSong } from '../../types';


import './song.scss';

type TFCSong = {
  currentSong: TSong
}

const Song: React.FC<TFCSong> = ({ currentSong }: TFCSong) => {
  const { name, cover, artist } = currentSong;

  return (
    <div className="song">
      <div className="song__cover" style={{ backgroundImage: "url(" + cover + ")" }} />
      <h2 className={`song__name`}> {name} </h2>
      <span className="song__artist"> {artist} </span>
    </div>
  )
};

export default Song;