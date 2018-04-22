import React, { Component } from 'react';
import LoginManager from '../login/LoginManager.js';
import './Page.css';

class Page extends Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.onLogout(true);
  }

  render() {
    return (
      <div className="Page">
        <Navbar onLogout={this.handleLogout} />
        <Banner />
        {this.props.children}
      </div>
    );
  }
}

class LogoutButton extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.onLogout(true);
  }

  render() {
    if(LoginManager.isLoggedIn()) {
      return (
        <div className="Logout">
          <button type="button" className="btn btn-info btn-sm" onClick={this.logout}>
            <span className="oi oi-person"></span> Logout
          </button>
        </div>
      )
    } else {
      return null;
    }
  }
};

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {loggingOut: false}
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    this.props.onLogout(true);
  }

  render() {
    return (
      <div className="Navbar">
        <div className="Navbar-panel"></div>
        <LogoutButton onLogout={this.handleLogout} />
      </div>
    )
  }
}

class Banner extends Component {
  render() {
    return (
      <div className="Banner">
        <h1>Welcome to the KSF Profile Manager</h1>
      </div>
    )
  }
}

export default Page;
