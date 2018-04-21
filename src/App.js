import React, { Component } from 'react';
import './App.css';
import LoginView from './login/LoginView.js'

class App extends Component {
  render() {
    return (
      <div className="Page">
        {navbar}
        {banner}
        <LoginView />
      </div>
    );
  }
}

// move to navbar module
const navbar = (
  <div className="Navbar">
    <div className="Navbar-panel"></div>
  </div>
);

const banner = (
  <div className="Banner">
    <h1>Welcome to the KSF Profile Manger</h1>
  </div>
);

export default App;
