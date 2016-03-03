// Channel all api requests here.
const Axios = require('axios');
const Cookie = require('js-cookie');

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

  return Axios.create(apiConfig);
}

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
 * This will delete a user Session.
 *
 * @param {String} uuid
 * @param {ApiCallBack} callBack
 */
export function login(loginData, callBack) {
  baseApi().post('users/login', loginData)
    .then( (response) => {
      Cookie.set('session', response.data);
      session = response.data;
      callBack(null, response);
    })
    .catch( (response) => {
      callBack(response, null);
    });
};

export function register(registerData, callBack) {
  baseApi().post('users/register', registerData)
    .then( (response) => {
      callBack(null, response);
    })
    .catch( (response) => {
      callBack(reponse, null);
    });
};

export function graphiQLFetcher(graphQLParams) {
  return baseApi().post('graphql', graphQLParams)
    .then( (response) => {
      return response.data;
    });
}