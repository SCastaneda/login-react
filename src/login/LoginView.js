import React, { Component } from 'react';
import './Login.css'

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    console.log('Logging in with ' + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input id="email" type="email" className="form-control Login-input"
            placeholder="Enter email"
            value={this.state.username} onChange={this.handleUsernameChange} />
        </div>

        <div className="form-group">
            <input id="password" type="password" className="form-control Login-input"
              placeholder="Password"
              value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginView;
