import React, { useCallback } from 'react';
import { TLogInUser } from '../../types';
import { ArrowBottomIcon } from '../icon';

import './user.scss';
import '../../assets/style/theme.scss';
import { themeDescriptionColor } from '../../theme';

interface TFCUser {
  showMenu: boolean
  setShowMenu: (state: boolean) => void
}

const User: React.FC<TFCUser & TLogInUser> = ({ logInUser, showMenu, setShowMenu }: TFCUser & TLogInUser) => {

  const toggleShowMenu = useCallback(() => setShowMenu(!showMenu), [setShowMenu, showMenu]);

  return (
    <div className="user">
      <div className="user__information">
        <h2 className="user__name">{logInUser?.username}</h2>

        <div className="user__description" onClick={toggleShowMenu}>
          <span className={themeDescriptionColor(logInUser?.darkTheme)}>подробнее</span>
          <ArrowBottomIcon color={logInUser?.darkTheme ? '#9F9DA3' : '#000'} />
        </div>
      </div>

      <div className="user__image">
        <img src={logInUser?.avatar} alt={logInUser?.username} />
      </div>
    </div>
  )
};

export default User;