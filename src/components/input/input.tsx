import React, { memo } from 'react';

import './input.scss';

type TFCInput = {
  type?: 'text' | 'email' | 'password'
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputTitle: string
  value: string
}

const Input: React.FC<TFCInput> = ({ type = 'text', name, onChange, inputTitle, value }: TFCInput) => {
  return (
    <label className="input">
      <span className="input__title">{inputTitle}</span>
      <input
        type={type}
        onChange={onChange}
        name={name}
        value={value}
        className="input__input" />
      <span className="input__focus"></span>
    </label>
  )
};

export default memo(Input);