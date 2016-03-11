'use strict';

// Channel all api requests here.
import _ from 'lodash';
import { hashHistory } from 'react-router';
import Axios from 'axios';
import Cookie from 'js-cookie';

let session = {};

if (Cookie.get('session')) {
  session = Cookie.getJSON('session');
}

let apiConfig = {
  baseURL: '/api/v1/',
};

function baseApi() {
  if (session) {
    apiConfig.headers = {
      'Authorization': session.session_id
    };
  }

  const axios = Axios.create(apiConfig);

  // If there is a 401 error, return the user to the login screen.
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status == 401) {
        Cookie.remove('session');
        hashHistory.push('/login');
      }
      return Promise.reject(error);
    }
  );
  return axios;
}

export default {
  isAuthenticated: isAuthenticated,
  login: login,
  register: register,
  graphQL: graphQL
};

/**
 * Check whether or not the user has a session_id.
 *
 * @return {Boolean}
 */
export function isAuthenticated() {
  return session.hasOwnProperty('session_id');
}

/**
 * This is the deleteUserSession callback.
 * @callback ApiCallBack
 * @param {Object} err - A response object.
 * @param {Object} response - A response object.
 */

/**
 * This will create a user Session after logging in the user.
 *
 * @param {String} uuid
 * @param {ApiCallBack} callBack
 */
export function login(loginData, callBack) {
  baseApi().post('users/login', loginData)
    .then( (response) => {
      sessionStorage.setItem('session', JSON.stringify(response.data));
      Cookie.set('session', response.data);
      session = response.data;
      callBack(null, response);
    })
    .catch( (response) => {
      callBack(response, null);
    });
};

/**
 * This will create a user.
 *
 * @param {String} uuid
 * @param {ApiCallBack} callBack
 */
export function register(registerData, callBack) {
  baseApi().post('users/register', registerData)
    .then( (response) => {
      callBack(null, response);
    })
    .catch( (response) => {
      callBack(reponse, null);
    });
};

export function graphQL(query, callBack) {
  baseApi().post('graphql', {query: query})
    .then( (response) => {
      callBack(null, response.data);
    })
    .catch( (response) => {
      callBack(response, null);
    });
};
