import React from 'react';
import Header from '../header';


import { TLogInUser } from '../../types';
import './app.scss';
import { themeBackground } from '../../theme';

const App: React.FC<TLogInUser> = ({ logInUser }: TLogInUser) => {

  return (
    <section className={`app ${themeBackground(logInUser?.darkTheme)}`}>
      <Header logInUser={logInUser} />
    </section>
  )
};

export default App;
