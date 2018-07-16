import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(res => {
        dispatch({type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        history.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({ email, password }, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(res => {
        dispatch({type: AUTH_USER });
        localStorage.setItem('token', res.data.token);
        history.push('/feature');
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error));
      });
  }
}

export function authError(err) {
  return {
    type: AUTH_ERROR,
    payload: err
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => {
        console.log(res);
      })
  }
}