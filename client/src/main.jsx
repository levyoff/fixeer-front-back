import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { TokenProvider } from './TokenContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenProvider>
          <App className='App'/>
      </TokenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
