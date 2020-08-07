import React from 'react';
import Header from './HeaderComponent';
import { logout } from '../redux/actions/userActionCreators';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  logout: (loginInfo) => dispatch(logout(loginInfo))
})

class HeaderContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout(this.props.users.loginInfo)
  }

  render() {
    return(
      <Header onLogout={this.handleLogout}
              user={this.props.users.currentUser} />
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
