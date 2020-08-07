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
import React from 'react';
import { Navbar, NavLink, NavbarBrand, Nav, Button } from 'reactstrap';

class Header extends React.Component {

  render() {
    return (
      <Navbar className="my-navbar" dark expand="md">
        <div className="container">
          <NavLink to="/orders" className="nav-link">
            <NavbarBrand className="mr-auto">
              <img src="assets/images/bxlogo.png" height="50" width="50"
                alt="Freibier" />
            </NavbarBrand>
          </NavLink>
          {this.props.user &&
            <Nav className="ml-auto" navbar>
              <Button onClick={this.props.onLogout}>
                <span className="fa fa-sign-out fa-lg"></span> Logout
              </Button>
            </Nav>}
        </div>
      </Navbar>
    );
  }
}

export default Header;
