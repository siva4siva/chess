import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { applyMiddleware,createStore } from 'redux'
import logger from 'redux-logger'
import rootReducer from './reducer/index';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(rootReducer,applyMiddleware(logger));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
