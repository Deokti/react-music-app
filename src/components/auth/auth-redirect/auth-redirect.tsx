import React, { memo } from 'react';

import { Link } from 'react-router-dom';

import '../auth.scss';

type TFCAuthRedirect = {
  path: string
}

const AuthRedirect: React.FC<TFCAuthRedirect> = ({ path }: TFCAuthRedirect) => {

  return (
    <div className="auth-redirect">
      <Link to={path} className="auth-redirect__link">Ещё не зарегистрированы?</Link>
    </div>
  )
};

export default memo(AuthRedirect);