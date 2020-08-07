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
import { userConstants } from '../constants/userActionTypes';
import { getURL } from '../../shared/baseData';

export const fetchToken = (user, authenticationToken) => (dispatch) => {

  let loginInfo = {
    clientId: user !== null ? user.clientId : -1,
  }

  let params = {
    client: loginInfo.clientId
  }
  let url = getURL('/api/v1/auth/roles', params);
  // Get the available roles
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + authenticationToken,
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
  .then(response => { //Get the available organizations
    loginInfo.roleId=response[0].id;
    params = {
      client: loginInfo.clientId,
      role: loginInfo.roleId,
    }
    let url = getURL('/api/v1/auth/organizations', params);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + authenticationToken,
      },
      credentials: 'same-origin'
    })
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
  .then(response => { //Get the available correct token
    loginInfo.organizationId=response[0].id;
    return fetch('/api/v1/auth/tokens', {
      method: 'PUT',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + authenticationToken,
      },
      credentials: 'same-origin'
    })
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
    loginInfo.token=response.token;
    dispatch(login(user, loginInfo));
  })
  .catch(error => {
    console.log('fetchToken: ', error.message);
    dispatch(logout());
  });
}

export const login = (user, loginInfo) => ({
    type: userConstants.USERS_LOGIN_SUCCESS,
    currentUser: user,
    loginInfo: loginInfo,
});

export const logout = () => ({
  type: userConstants.USERS_LOGOUT,
  currentUser: null,
});
