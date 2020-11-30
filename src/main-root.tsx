import React, { useCallback, useEffect, useState } from 'react';

import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import App from './components/app';
import { Login, Register } from './components/auth';
import { auth, database } from './config/firebase';

import { routePath } from './config/router-path';
import { TDatabaseSaveUser } from './types';

const MainRoot: React.FC = ({ history }: any) => {
  const [logInUser, setLogInUser] = useState<TDatabaseSaveUser | null>();

  const getDataUserDatabase = async (uid: string) => {
    return database.ref("USERS")
      .child(uid)
      .on('value', (snap) => setLogInUser(snap.val()));
  }

  const onAuthStateChanged = useCallback(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        getDataUserDatabase(uid);
        history.push(routePath.main);
      } else {
        history.push(routePath.login)
      }
    });
  }, [history]);


  useEffect(() => {
    onAuthStateChanged();

    return () => {
      onAuthStateChanged();
    }
  }, [onAuthStateChanged]);

  return (
    <main className="main-root">
      <Switch>
        <Route path={routePath.main} exact render={() => (<App logInUser={logInUser} />)} />
        <Route path={routePath.login} component={Login} />
        <Route path={routePath.register} component={Register} />
      </Switch>
    </main>
  )
};

export default withRouter(MainRoot);