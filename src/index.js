import React from 'react';
import ReactDOM from 'react-dom';
import './support/css/style.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>   
    <BrowserRouter>     
        <App />   
    </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();