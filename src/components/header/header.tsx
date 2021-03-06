import React, { useState } from 'react';
import OpenLibrary from '../open-library';
import User from '../user';
import { TDatabaseSaveUser } from '../../types';

import './header.scss';
import UserMenu from '../user-menu';
import ToggleSwitch from '../toggle-switch';
import { database, databaseRef } from '../../config/firebase';

type TFCHeader = {
  logInUser: TDatabaseSaveUser | null | undefined
  libraryShow: boolean
  setLibraryShow: (state: boolean) => void
}

const Header: React.FC<TFCHeader> = ({ logInUser, libraryShow, setLibraryShow }: TFCHeader) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);


  const toggleTheme = () => {
    if (logInUser) {
      const { id, darkTheme } = logInUser;

      database.ref(databaseRef.USERS)
        .child(id)
        .update({ darkTheme: !darkTheme })
    }
  }

  return (
    <header className="header">
      <OpenLibrary open={libraryShow} onClick={() => setLibraryShow(!libraryShow)} />

      <div className="header__right">
        <div className="header__user">
          <User logInUser={logInUser} showMenu={showMenu} setShowMenu={setShowMenu} />
          {showMenu && <UserMenu setShowMenu={setShowMenu} />}
        </div>

        <ToggleSwitch checked={logInUser?.darkTheme} toggleTheme={toggleTheme} />
      </div>
    </header>
  )
};

export default Header;