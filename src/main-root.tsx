import React, { useCallback, useEffect, useState } from 'react';

import { Route, withRouter, Switch } from 'react-router-dom';
import App from './components/app';
import { Login, Register } from './components/auth';
import Spinner from './components/spinner';
import { auth, database, databaseRef } from './config/firebase';

import { routePath } from './config/router-path';
import { TDatabaseSaveUser, TSong } from './types';

interface TFCMainRoot {
  history: any
}

interface TLoggedUser {
  isLoaded: boolean
  logInUser: TDatabaseSaveUser | null
}

const MainRoot: React.FC<TFCMainRoot> = ({ history }: TFCMainRoot) => {
  const [songs, setSongs] = useState<Array<TSong>>([]);
  const [loggedUser, setLoggedUser] = useState<TLoggedUser>({
    isLoaded: true,
    logInUser: null
  });

  const getDataUserDatabase = useCallback((uid: string) => {
    return database.ref("USERS")
      .child(uid)
      .on('value', (snap) => {
        setLoggedUser({
          isLoaded: false,
          logInUser: snap.val()
        });
      });
  }, [])

  const getDataSong = () => {
    database.ref(databaseRef.MUSICS).on('child_added', snap => {
      setSongs((prevState) => [...prevState, snap.val()]);
    });
  }


  const onAuthStateChanged = useCallback(() => {
    auth.onAuthStateChanged((currentUser: any) => {
      if (currentUser) {
        const uid = currentUser.uid;
        getDataUserDatabase(uid);
        history.push(routePath.main);
        getDataSong();
      } else {
        setLoggedUser({
          isLoaded: false,
          logInUser: null
        });
        history.push(routePath.login)
      }
    });
  }, [getDataUserDatabase, history]);


  useEffect(() => {
    onAuthStateChanged();

    return () => {
      onAuthStateChanged();
    }
  }, [onAuthStateChanged]);

  return (
    <main className="main-root">
      {
        loggedUser.isLoaded
          ? <Spinner />
          : (<Switch>
            <Route path={routePath.main} exact render={() => (
              <App
                logInUser={loggedUser.logInUser}
                songs={songs}
                firstSong={songs[0]}
              />
            )} />
            <Route path={routePath.login} component={Login} />
            <Route path={routePath.register} component={Register} />
          </Switch>)
      }
    </main>
  )
};


export default withRouter(MainRoot);

