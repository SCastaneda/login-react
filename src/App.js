import React, { Component } from 'react';
import './App.css';
import LoginView from './login/LoginView.js'
import LoginManager from './login/LoginManager.js'
import UserView from './user/UserView.js'
import Page from './page/Page.js'

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

  render() {
    if(!this.state.loggedIn) {
      return (<Page onLogout={this.handleLogout}><LoginView onLogin={this.handleLogin} /></Page>);
    } else {
      return (<Page onLogout={this.handleLogout}><UserView /></Page>);
    }
  }
}

export default App;
