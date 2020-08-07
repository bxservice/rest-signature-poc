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

const initialState = {
  username: '',
  password: '',
  authenticationToken: '',
  errMsg: ''
}

export const Authentication = (state =  initialState, action) => {
  switch(action.type) {
    case authenticatorConstants.LOGIN_SUCCESS:
      return {...state, username: action.username, password: '', errMsg: '', authenticationToken: action.authenticationToken};
    case authenticatorConstants.LOGIN_FAILURE:
      return {...state, username: '', password: '', errMsg: action.errMsg, authenticationToken: ''};
    case authenticatorConstants.LOGOUT:
      return {...state, username: '', password: '', errMsg: '', authenticationToken: ''};

    default:
        return state;
  }
}
