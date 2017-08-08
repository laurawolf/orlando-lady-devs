import * as Cookies from 'js-cookie';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
 } from './types';

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    name: user.name
  }
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    error
  }
});

export const fetchUser = () => dispatch => {
  const accessToken = Cookies.get('accessToken');
  return fetch('api/auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then(response => {
    return response.json();
  })
  .then(user => {
    console.log(user);
    dispatch(fetchUserSuccess(user));
  })
  .catch(error => {
    console.log(error);
    dispatch(fetchUserFailure());
  });
};
