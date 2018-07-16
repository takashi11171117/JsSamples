import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  renderLinks = () => {
    if (this.props.authenticated) {
      return (
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/signout">Sign out</Link>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav navbar-nav">
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signin">Sign in</Link>
          </li>
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/signup">Sign up</Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Home</Link>
        {this.renderLinks()}
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return { authenticated: auth.authenticated };
}

export default connect(mapStateToProps)(Header);
