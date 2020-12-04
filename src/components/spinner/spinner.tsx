import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

import './spinner.scss';

const Spinner: React.FC = () => {

  return (
    <div className="spinner">
      <BounceLoader size="300" color="#1E2126" />
    </div>
  );
};

export default Spinner;