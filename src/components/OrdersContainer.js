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
import Orders from './OrdersComponent';
import Signature from './SignatureComponent';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchOrders } from '../redux/actions/ordersCreators';

const mapStateToProps = state => ({
  orders: state.orders,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (loginInfo) => dispatch(fetchOrders(loginInfo)),
});

class OrdersContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      selectedOrder: null
    }
    this.onClick = this.onClick.bind(this);
  }

  onClick(order) {
    this.setState({
      selectedOrder: order
    });
  }

  componentDidMount() {
    this.props.fetchOrders(this.props.users.loginInfo);
  }

  render() {

    if (this.props.users.currentUser === null)
    return <Redirect to="/login" />;

    if (this.state.selectedOrder === null) {
      return (
          <Orders orders={this.props.orders.orders}
              onClick={this.onClick}/>
                     );
    } else {
      return (
          <Signature order={this.state.selectedOrder}
                    loginInfo={this.props.users.loginInfo}/>
                     );
    }

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrdersContainer));
