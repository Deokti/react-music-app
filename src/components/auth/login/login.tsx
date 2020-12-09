import React, { useMemo, useState } from 'react';
import Input from '../../input';
import Button from '../../button';
import AuthRedirect from '../auth-redirect';

import { routePath } from '../../../config/router-path';
import { auth } from '../../../config/firebase';
import { TLoginUser } from '../../../types';

import '../auth.scss';

const Login: React.FC = () => {
  const defaultStateUserLogin = useMemo<TLoginUser>(() => ({ email: '', password: '' }), []);
  const [loginUser, setLoginUser] = useState<TLoginUser>(defaultStateUserLogin);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setLoginUser((prevState) => ({ ...prevState, [name]: value }));
  }

  const fieldHandling = ({ email, password }: TLoginUser) => {
    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    if (!emailTrim && !passwordTrim) {
      setError('Все поля должны быть заполнены');
      return false;
    }

    return emailTrim && passwordTrim;
  }

  const logIn = ({ email, password }: TLoginUser) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Пользователь вошёл в систему');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      })
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fieldHandling(loginUser)) {
      setLoading(true);
      setError('');
      logIn(loginUser);
    }
  }

  return (
    <section className="auth">
      <div className="auth__wrapper">
        <header className="auth-header">
          <h2 className="auth__title">Войти в аккаунт</h2>
        </header>

        <form className="auth-form" onSubmit={onSubmitHandler}>
          <Input
            value={loginUser.email}
            name="email" type="email"
            inputTitle="Email"
            onChange={inputChangeHandler}
          />
          <Input
            value={loginUser.password}
            name="password"
            type="password"
            inputTitle="Пароль"
            onChange={inputChangeHandler}
          />

          <Button
            loading={loading}
            pseudoClassActive={true}
            pseudoClassFocus={true}
          >
            Войти
          </Button>

          <AuthRedirect path={routePath.register} />
          {error && <span className="auth-error">{error}</span>}
        </form>
      </div>
    </section>
  )
};

export default Login;
