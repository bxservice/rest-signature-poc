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
import { orderConstants } from '../constants/orderActionTypes';
import { getURL, standardFilter } from '../../shared/baseData';

export const fetchOrders = (loginInfo) => (dispatch) => {

  if (loginInfo === null)
    return;

  let params = {
    filter: standardFilter.replace('?', loginInfo.clientId) + "AND isSOTrx='Y'",
    order: "DateOrdered desc",
  }

  let url = getURL('/api/v1/models/c_order', params);

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + loginInfo.token,
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
    let orders = response;
    dispatch(fetchDataSuccessfully(orders));
  })
  .catch(error => {
      console.log('FetchOrders', error.message);
       dispatch(requestFailed(error.message));
  });
};

export const fetchDataSuccessfully = (orders) => ({
  type: orderConstants.FETCH_SUCCESS,
  orders: orders
});

export const requestFailed = (errmsg) => ({
  type: orderConstants.REQUEST_FAILED,
  errMsg: errmsg
});

export const postSignature = (loginInfo, image, order) => (dispatch) => {

  if (loginInfo === null)
    return;

  const attachment= {
    name: 'signature.png',
    data: image
  }

  console.log(attachment)
  return fetch('/api/v1/models/c_order/'+order.id+'/attachments', {
    method: 'POST',
    body: JSON.stringify(attachment),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + loginInfo.token,
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
    console.log('Send susccessfull')
  })
  .catch(error => {
      console.log('FetchOrders', error.message);
      dispatch(requestFailed(error.message));
  });
};
