import React, { memo } from 'react';

import './auth-input.scss';

type TFCInput = {
  type?: 'text' | 'email' | 'password'
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputTitle: string
  value: string
}

const AuthInput: React.FC<TFCInput> = ({ type = 'text', name, onChange, inputTitle, value }: TFCInput) => {
  return (
    <label className="auth-input">
      <span className="auth-input__title">{inputTitle}</span>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        className="auth-input__input" />
      <span className="auth-input__focus"></span>
    </label>
  )
};

export default memo(AuthInput);