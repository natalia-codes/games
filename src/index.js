import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const isOnePlayer = window.confirm('Play against the computer?')

const game = isOnePlayer ? <Game isOnePlayer='true' /> : <Game isOnePlayer='false' />

root.render(
  <React.StrictMode>
    <Game game/>
  </React.StrictMode>
);

reportWebVitals();
