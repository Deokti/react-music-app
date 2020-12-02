import React, { useState } from 'react';
import OpenLibrary from '../open-library';
import User from '../user';
import { TDatabaseSaveUser } from '../../types';

import './header.scss';
import UserMenu from '../user-menu';
import ToggleSwitch from '../toggle-switch';
import { database, databaseRef } from '../../config/firebase';
import { themeHeader } from '../../theme';

type TFCHeader = {
  logInUser: TDatabaseSaveUser | null | undefined
}

const Header: React.FC<TFCHeader> = ({ logInUser }: TFCHeader) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);


  const toggleTheme = () => {
    if (logInUser) {
      const { id, darkTheme } = logInUser;

      database.ref(databaseRef.USERS)
        .child(id)
        .update({
          darkTheme: !darkTheme
        })
    }
  }

  return (
    <header className={`header ${themeHeader(logInUser?.darkTheme)}`}>
      <OpenLibrary darkMode={logInUser?.darkTheme} />

      <div className="header__right">
        <div className="header__user">
          <User logInUser={logInUser} showMenu={showMenu} setShowMenu={setShowMenu} />
          {showMenu && <UserMenu darkTheme={logInUser?.darkTheme} setShowMenu={setShowMenu} />}
        </div>

        <ToggleSwitch checked={logInUser?.darkTheme} toggleTheme={toggleTheme} />
      </div>
    </header>
  )
};

export default Header;