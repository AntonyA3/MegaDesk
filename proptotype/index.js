import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx'
import Home from './home.jsx'
import MyRouter from './my_router.jsx';
import Rect from './rect.js';
const app = React.createElement(App, null, null);
const home = React.createElement(Home, null, null)
const router = React.createElement(MyRouter, null, null)
window.React = React;

ReactDOM.render(
    router,
    document.getElementById("root") 
)

