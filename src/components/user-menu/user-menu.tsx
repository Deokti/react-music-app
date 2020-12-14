import React, { useCallback, useEffect, useRef } from 'react';
import { LogoutIcon, UserIcon } from '../icon';
import { auth } from '../../config/firebase';

import './user-menu.scss';
import '../../assets/style/theme.scss';

interface TFCUserMenu {
  setShowMenu: (state: boolean) => void
}

const UserMenu: React.FC<TFCUserMenu> = ({ setShowMenu }: TFCUserMenu) => {
  const userModalRef = useRef<HTMLUListElement>(null);

  // Если произошёл клик не по элементу, то активируется функция и закроет окно
  const onClickNotControlPanel = useCallback((event) => {
    if (event.path && !event.path.includes(userModalRef.current)) {
      setShowMenu(false);
    }
  }, [setShowMenu]);

  const signOut = () => auth.signOut();


  useEffect(() => {
    document.body.addEventListener('click', onClickNotControlPanel);
    return () => document.body.removeEventListener('click', onClickNotControlPanel);
  }, [onClickNotControlPanel]);

  return (
    <ul className="user-modal" ref={userModalRef}>
      <li className="user-modal__item">
        <UserIcon />
        <span className="user-modal__text">Изменить аватар</span>
      </li>
      <li className="user-modal__item" onClick={signOut}>
        <LogoutIcon />
        <span className="user-modal__text">Выйти из учётной записи</span>
      </li>
    </ul>
  );
};

export default UserMenu;