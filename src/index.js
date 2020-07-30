import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// context API
import { GlobalProvider } from './context/globalState';


ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
