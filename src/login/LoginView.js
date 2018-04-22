import React, { Component } from 'react';
import './Login.css'
import LoginManager from './LoginManager.js'

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', error: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let self = this;
    LoginManager.login(this.state.username, this.state.password, function(loggedIn) {
      self.props.onLogin(loggedIn);
    });
    event.preventDefault();
  }

  render() {
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><span className="oi oi-person"></span></span>
          </div>
          <input name="username" type="text" className="form-control Login-input"
            placeholder="Enter Username"
            value={this.state.username} onChange={this.handleChange} />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text"><span className="oi oi-key"></span></span>
          </div>
          <input name="password" type="password" className="form-control Login-input"
            placeholder="Password"
            value={this.state.password} onChange={this.handleChange} />
          <div className="input-group-append">
            <input className="btn btn-outline-secondary" type="submit" value="Login" />
          </div>
        </div>
      </form>
    );
  }
}

export default LoginView;
