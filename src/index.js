import React from 'react';
import ReactDOM from 'react-dom';
import "./css/jplayer.flat.css" ;
import "./css/bootstrap.css" ;
import "./css/animate.css" ;
import "./css/font-awesome.min.css" ;
import "./css/simple-line-icons.css" ;
import "./css/font.css" ;
import "./css/app.css" ;
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider> 
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
