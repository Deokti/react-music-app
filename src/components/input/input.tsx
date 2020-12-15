import React, { memo } from 'react';

import './input.scss';

type TFCInput = {
  type?: 'text' | 'email' | 'password'
  name: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputTitle: string
  value: string
  border?: string
  color?: string
}

const Input: React.FC<TFCInput> = ({
  type = 'text', name, onChange,
  inputTitle, value,
  border = '1px solid #EDEDED', color = '#225171'
}: TFCInput) => {

  return (
    <label className="input" style={{ color }}>
      <span className="input__title">{inputTitle}</span>
      <input
        style={{ border, color }}
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