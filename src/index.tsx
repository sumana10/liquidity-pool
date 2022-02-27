import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './styles/global';


function getLibrary(provider: any){

  return new Web3(provider)

}
ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>
  </Web3ReactProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
