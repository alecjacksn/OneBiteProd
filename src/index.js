import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import HttpsRedirect from 'react-https-redirect';



ReactDOM.render(
    <Provider store={store} >
        {/* <HttpsRedirect> */}
            <HashRouter>
                <App />
            </HashRouter>
        {/* </HttpsRedirect> */}
    </Provider>
    , document.getElementById('root'));

