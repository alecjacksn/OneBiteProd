import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import HttpsRedirect from 'react-https-redirect';



ReactDOM.render(
    <Provider store={store} >
        <HttpsRedirect>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HttpsRedirect>
    </Provider>
    , document.getElementById('root'));

