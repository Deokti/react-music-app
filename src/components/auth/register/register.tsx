import React, { useMemo, useState } from 'react';
import { routePath } from '../../../config/router-path';
import Button from '../../button';
import AuthInput from '../auth-input';

import md5 from 'md5';

import { auth, database } from '../../../config/firebase';
import AuthRedirect from '../auth-redirect';
import { TDatabaseSaveUser, TRegisterUser } from '../../../types';

const Register: React.FC = () => {
  const defaultStateUserRegister = useMemo<TRegisterUser>(() => ({ login: '', email: '', password: '' }), [])
  const [registerUser, setRegisterUser] = useState<TRegisterUser>(defaultStateUserRegister);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setRegisterUser((prevState) => ({ ...prevState, [name]: value }))
  };

  const fieldHandling = ({ login, email, password }: TRegisterUser) => {
    const loginTrim = login.trim();
    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    if (!loginTrim || !emailTrim || !passwordTrim) {
      setError('Все поля должны быть заполнены');
      return false;
    } else if (password.length < 6) {
      setError('Длина пароля должна быть более 6-ти символов!');
      return false;
    }

    return loginTrim && emailTrim && passwordTrim;
  }

  const saveUser = (createdUser: any): TDatabaseSaveUser => {
    return {
      id: createdUser.user.uid,
      username: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      email: registerUser.email,
      password: registerUser.password,
      darkTheme: false
    }
  }

  const saveUserToDatabase = async (createdUser: any) => {
    const userId = createdUser.user.uid;
    const getSaveUser = saveUser(createdUser)

    return database.ref('USERS').child(userId).set(getSaveUser);
  }

  const onCreatedUser = async ({ login, email, password }: TRegisterUser) => {
    try {
      const createdUser = await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser?.updateProfile({
        displayName: login,
        photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
      });
      await saveUserToDatabase(createdUser)

      setRegisterUser(defaultStateUserRegister);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      setLoading(false);
    }
  }

  const onSumbmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (fieldHandling(registerUser)) {
      setLoading(true);
      setError('');
      onCreatedUser(registerUser);
    }
  };


  return (
    <section className="auth">
      <div className="auth__wrapper">
        <header className="auth-header">
          <h2 className="auth__title">Регистрация аккаунта</h2>
        </header>

        <form className="auth-form" onSubmit={onSumbmitHandler}>

          <AuthInput
            name="login"
            type="text"
            inputTitle="Логин"
            value={registerUser.login}
            onChange={inputChangeHandler}
          />
          <AuthInput
            name="email"
            type="email"
            inputTitle="Email"
            value={registerUser.email}
            onChange={inputChangeHandler}
          />
          <AuthInput
            name="password"
            type="password"
            inputTitle="Пароль"
            value={registerUser.password}
            onChange={inputChangeHandler}
          />

          <Button loading={loading}>Регистрация</Button>
          <AuthRedirect path={routePath.login} />

          {error && <span className="auth-error">{error}</span>}
        </form>
      </div>
    </section>
  )
};

export default Register;
