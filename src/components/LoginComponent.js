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
import { Card, CardHeader, CardBody, Button, Label, Row, Jumbotron } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyLogin } from '../redux/actions/authenticatorCreators';

const required = (val) => val && val.length;

const mapStateToProps = state => ({
  authenticator: state.authenticator,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  verifyLogin: (username, password) => dispatch(verifyLogin(username, password))
})

class Login extends React.Component {

  handleSubmit(values) {
    this.props.verifyLogin(values.username, values.password);
  }

  render() {
    //If user has successfully login
    if (this.props.users.currentUser !== null) {
      return <Redirect to="/orders" />;
    }

    return(
      <>
        <Jumbotron className="header">
          <div className="container">
                <h1>Freibier</h1>
          </div>
        </Jumbotron>
        <div className="login-page">
          <Card outline color="secondary">
            <CardHeader className="center" tag="h4">
                Login
            </CardHeader>
            <CardBody>
              <Form model="authenticator" onSubmit={(values) => this.handleSubmit(values)}>
                  <Row className="form-group">
                    <Label htmlFor="username">Username</Label>
                    <Control.text model="authenticator.username"
                        id="username" name="username"
                        className="form-control"
                        validators= {{
                          required,
                        }} />
                    <Errors
                        className="text-danger"
                        model="authenticator.username"
                        show="touched"
                        messages={{
                        required: 'This field is required'
                        }}
                    />
                  </Row>
                  <Row className="form-group">
                    <Label htmlFor="password">Password</Label>
                    <Control.text type="password" model="authenticator.password"
                      id="password" name="password"
                      className="form-control"
                      validators= {{
                        required,
                      }} />
                      <Errors
                          className="text-danger"
                          model="authenticator.password"
                          show="touched"
                          messages={{
                          required: 'This field is required '
                          }}
                      />
                  </Row>
                  {this.props.authenticator.errMsg && <div className="text-danger"><span>{this.props.authenticator.errMsg}</span></div>}
                  <Button type="submit"
                    className="mt-3 float-right" color="primary">Login</Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
