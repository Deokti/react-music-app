import React from 'react';
import { TDatabaseSaveUser } from '../../types';

import './app.scss';

type TFCApp = {
  logInUser: TDatabaseSaveUser | null | undefined
}

const App: React.FC<TFCApp> = ({ logInUser }: TFCApp) => {

  return (
    <section className="app">
      <h1 style={{ fontSize: '10rem', textAlign: 'center' }}>Главная страница</h1>
    </section>
  )
};

export default App;
