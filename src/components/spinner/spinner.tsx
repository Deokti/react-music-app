import React from 'react';
import { SpinnerLoader } from '../icon';

import './spinner.scss';

const Spinner = () => {

  return (
    <div className="spinner">
      <SpinnerLoader size='20%' color='#000' />
      <span className="spinner-text">Идёт загрузка...</span>
    </div>
  );
};

export default Spinner;