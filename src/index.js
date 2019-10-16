import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import reducer from './reducers'
import middleware from './middleware'
import App from './components/App';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ReactNotification />
            <App />
        </Router>
    </Provider>
, document.getElementById('root'));
