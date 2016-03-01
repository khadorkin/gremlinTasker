// Channel all api requests here.
const Axios = require('axios');

let session = {};

if (document.cookie) {
  session = JSON.parse(document.cookie);
}


let apiConfig = {
  baseURL: '/api/v1/',
};

function baseApi() {
  if (session) {
    apiConfig.headers = {
      Authorization: session.session_id
    };
  }

  return Axios.create(apiConfig);
}

/**
 * Check whether or not the user has a session_id.
 *
 * @return {Boolean}
 */
exports.isAuthenticated = function() {
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
exports.login = function(loginData, callBack) {
  baseApi().post('users/login', loginData)
    .then((response) => {
      document.cookie = JSON.stringify(response.data);
      session = response.data;
      callBack(null, response);
    })
    .catch((response) => {
      callBack(response, null);
    });
};