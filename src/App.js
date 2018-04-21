import React, { Component } from 'react';
import './App.css';
import LoginView from './login/LoginView.js'
import LoginManager from './login/LoginManager.js'
import UserView from './user/UserView.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { loggedIn: LoginManager.isLoggedIn() }
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogout(event) {
    LoginManager.logout();
    this.setState({loggedIn: false});
  }

  handleLogin(event) {
    if(LoginManager.isLoggedIn()) {
      this.setState({loggedIn: true});
    }
  }

  page(content) {
    return (
      <div className="Page">
        <Navbar onLogout={this.handleLogout} />
        <Banner />
        {content}
      </div>
    )
  }

  render() {
    if(!this.state.loggedIn) {
      return this.page(<LoginView onLogin={this.handleLogin} />);
    } else {
      return this.page(<UserView />);
    }
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
          <button onClick={this.logout}>Logout</button>
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
    console.log("Logging out -- from Navbar!");
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
        <h1>Welcome to the KSF Profile Manger</h1>
      </div>
    )
  }
}

export default App;
