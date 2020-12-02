import React from 'react';

import './player-button.scss';

type TFCPlayerButton = {
  Icon?: any
  left?: boolean
  color?: string
  onClick?: () => void
}

const PlayerButton: React.FC<TFCPlayerButton> = ({ Icon, left, color, onClick }: TFCPlayerButton) => {

  const direction = left ? 'player-button-left' : 'player-button-right';

  return (
    <button className={`player-button ${direction}`} onClick={onClick}>
      <Icon color={color} />
    </button>
  )
};

export default PlayerButton;