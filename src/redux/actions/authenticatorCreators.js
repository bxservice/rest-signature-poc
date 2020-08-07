/**********************************************************************
* Copyright (C) Contributors                                          *
*                                                                     *
* This program is free software; you can redistribute it and/or       *
* modify it under the terms of the GNU General Public License         *
* as published by the Free Software Foundation; either version 2      *
* of the License, or (at your option) any later version.              *
*                                                                     *
* This program is distributed in the hope that it will be useful,     *
* but WITHOUT ANY WARRANTY; without even the implied warranty of      *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the        *
* GNU General Public License for more details.                        *
*                                                                     *
* You should have received a copy of the GNU General Public License   *
* along with this program; if not, write to the Free Software         *
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,          *
* MA 02110-1301, USA.                                                 *
*                                                                     *
* Contributors:                                                       *
* - Diego Ruiz - BX Service GmbH                                      *
**********************************************************************/
import { authenticatorConstants } from '../constants/authenticatorActionTypes';
import { fetchToken } from './userActionCreators';

export const verifyLogin = (username, password) => (dispatch) => {

  const credentials = {
      userName: username,
      password: password
  }

  return fetch('/api/v1/auth/tokens', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok)
      return response;
    else {
      let error = new Error('Error: ' + response.status + ': ' + response.statusText)
      error.response = response;
      throw error;
    }
  },
  error => { //When an error is not from the server
    let errormsg = new Error(error.message);
    throw errormsg;
  })
  .then(response => response.json())
  .then(response => {
    const user = {
      clientId: response.clients[0].id,
      name: response.clients[0].name,
      username: username,
    }
    dispatch(loginSuccessful(response.token));
    dispatch(fetchToken(user, response.token));
  })
  .catch(error => {
      console.log('VerifyLogin', error.message);
      let errorMessage = error.message;
      if (error.response && error.response.status === 401) {
        errorMessage = 'Wrong password or username';
      }
       dispatch(loginFailed(errorMessage));
  });
}

export const loginSuccessful = (token) => ({
    type: authenticatorConstants.LOGIN_SUCCESS,
    authenticationToken: token
});

export const loginFailed = (errMsg) => ({
    type: authenticatorConstants.LOGIN_FAILURE,
    errMsg: errMsg
});

export const loginLoading = () => ({
    type: authenticatorConstants.LOGIN_LOADING
});

export const logout = () => ({
  type: authenticatorConstants.LOGOUT
});
