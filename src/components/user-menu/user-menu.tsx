import React, { useCallback, useEffect, useRef } from 'react';
import { LogoutIcon, UserIcon } from '../icon';
import { auth } from '../../config/firebase';

import './user-menu.scss';
import { themeDescriptionColor, themeHeader, themeHover } from '../../theme';
import '../../assets/style/theme.scss';

type TFCUserMenu = {
  setShowMenu: (state: boolean) => void
  darkTheme: boolean | undefined
}

const UserMenu: React.FC<TFCUserMenu> = ({ setShowMenu, darkTheme }: TFCUserMenu) => {
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

  const currentColor = themeDescriptionColor(darkTheme);
  const currentHover = themeHover(darkTheme);
  const iconColor = darkTheme ? '#9F9DA3' : '#000'

  return (
    <ul className={`user-modal ${themeHeader(darkTheme)}`} ref={userModalRef}>
      <li className={`user-modal__item ${currentColor} ${currentHover}`}>
        <UserIcon color={iconColor} />
        <span className="user-modal__text">Изменить аватар</span>
      </li>
      <li className={`user-modal__item ${currentColor} ${currentHover}`} onClick={signOut}>
        <LogoutIcon color={iconColor} />
        <span className="user-modal__text">Выйти из учётной записи</span>
      </li>
    </ul>
  );
};

export default UserMenu;