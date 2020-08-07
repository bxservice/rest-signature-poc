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
import { Table, Jumbotron, Container, Badge } from 'reactstrap';

class Orders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDesktop: false
    }
    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    //991 is tablet
    this.setState({ isDesktop: window.innerWidth > 991 });
  }

  render() {

    const DesktopOrderList = () => {
      const renderOrder = this.props.orders.map((order) => {
        return (
          <tr onClick={() => this.props.onClick(order)}>
            <td>{order.documentNo}</td>
            <td className="d-none d-md-table-cell"> {order.dateOrdered}</td>
            <td>{order.C_BPartner_ID.identifier}</td>
            <td className="d-none d-md-table-cell">{order.SalesRep_ID.identifier}</td>
            <td>{order.grandTotal} €</td>
            <td>{order.docStatus.identifier}</td>
          </tr>
        );
      });
      return (
        <>
          <Table striped responsive hover>
            <thead>
              <tr>
                <th>No.</th>
                <th className="d-none d-md-table-cell">Date Ordered</th>
                <th>Customer</th>
                <th className="d-none d-md-table-cell">Sales Representative</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {renderOrder}
            </tbody>
          </Table>
        </>
        );
    }

    const MobileOrderList = () => {
      const renderOrder = this.props.orders.map((order) => {
        const badgeColor = order.docStatus.id === 'CO' ? 'success' : 'secondary';
        return (
          <>
          <div className="order-card" onClick={() => this.props.onClick(order)}>
            <div className="order-card-top mb-2">
              <div className="order-title"><strong>{order.C_BPartner_ID.identifier}</strong></div>
            </div>
            <div className="order-card-bottom mt-2">
              <div className="order-summary">{order.documentNo}</div>
              <div className="order-doc">
                <Badge color={badgeColor} pill>{order.Bill_Location_ID.identifier}</Badge>
              </div>
            </div>
          </div>
          <hr/>
          </>
        );
      });
      return (
        <div className="order-view">
          {renderOrder}
        </div>
        );
    }

    const OrderComponent = () => {
      if (this.state.isDesktop) {
        return(
          <DesktopOrderList />
        );
      } else {
        return(
          <MobileOrderList />
        );
      }
    };

    return(
      <div className="container-fluid main-menu">
        <Jumbotron fluid className="menu-jumbotron">
         <Container fluid>
           <p className="menu-title">Sales Orders</p>
         </Container>
        </Jumbotron>
        <OrderComponent />
      </div>
    );
  }
}


export default Orders;
