import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import MainRoot from './main-root';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoot />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
