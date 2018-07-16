import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Header from './components/header';
import App from './components/app';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import Feature from './components/feature';
import reducers from './reducers';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import {
  AUTH_USER
} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/feature" component={RequireAuth(Feature)} />
                <Route path="/signout" component={SignOut} /> 
                <Route path="/signup" component={SignUp} /> 
                <Route path="/signin" component={SignIn} /> 
                <Route path="/" component={App} /> 
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
