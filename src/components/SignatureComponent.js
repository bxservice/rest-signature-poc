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
import React from 'react'
import SignaturePad from 'react-signature-canvas'
import { Button, Jumbotron, Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { postSignature } from '../redux/actions/ordersCreators';

const mapDispatchToProps = dispatch => ({
  postSignature: (loginInfo, image, order) => dispatch(postSignature(loginInfo, image, order))
});

class Signature extends React.Component {

  state = {
    goBack: false,
    trimmedDataURL: null}
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
  trim = () => {
    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')
    })
    let image = this.sigPad.getTrimmedCanvas().toDataURL('image/png').substring(22)
    this.props.postSignature(this.props.loginInfo, image, this.props.order);
  }
  render () {
    return (
    <div className="container">
      <Jumbotron fluid className="menu-jumbotron mb-5">
       <Container fluid>
         <h2>Order: {this.props.order.documentNo}</h2>
       </Container>
      </Jumbotron>
      <div className="sigContainer">
        <SignaturePad  canvasProps={{ height: 400, className: 'sigPad' }}
          ref={(ref) => { this.sigPad = ref }} />
      </div>
      <div>
        <Button outline color="warning" size="lg" block onClick={this.clear}>
          Clear
        </Button>
        <Button outline color="success" size="lg" block onClick={this.trim}>
          Send
        </Button>
        <Button outline color="info" size="lg" block onClick={() => this.setState({goBack: true})}>
          Back
        </Button>
      </div>
      {this.state.goBack
        ? <Redirect to="/login" />
        : null}
    </div>);
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Signature));
