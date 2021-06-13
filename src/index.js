import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import AppState from './app_state';
import './app.css'

window.React = React;
ReactDOM.render(
    React.createElement(App, new AppState(),null),
    document.getElementById("root") 
)


