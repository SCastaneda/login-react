import React, { Component } from 'react';
import './User.css'
import UserManager from './UserManager.js'

class UserView extends Component {

  constructor(props) {
    super(props);
    this.userManager = new UserManager();
    this.state = { loading: true, user: undefined, editingAddress: false, newAddress: undefined };
    this.enableEditingAddress = this.enableEditingAddress.bind(this);
    this.handleAddressSave = this.handleAddressSave.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  enableEditingAddress(e) {
    this.setState({editingAddress: true});
  }

  handleAddressChange(event) {
    this.setState({newAddress: event.target.value});
  }

  handleAddressSave(event) {
    let self = this;
    this.userManager.updateAddress(this.state.newAddress, function(success, user) {
      self.setState({user:user, editingAddress: false, loading: false, newAddress: user.address});
    });
  }

  render() {
    let self = this;

    let userPanel = function(address) {
      return (
        <div className="UserPanel">
          <h2>Your Profile</h2>
          <UserData label="Name" value={self.state.user.name} />
          <UserData label="Email" value={self.state.user.email} />
          {address}
        </div>
      )
    }

    let editAddressField = function() {
      return userPanel(
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Address</span>
          </div>
          <input className="form-control" type="text" value={self.state.newAddress}
            onChange={self.handleAddressChange}></input>
          <div className="input-group-append">
            <button className="btn btn-outline-success"
              onClick={self.handleAddressSave}>
              Save
            </button>
          </div>
        </div>
      );
    }

    let editAddressView = function() {
      return userPanel(
        <div>
          <UserData label="Address" value={self.state.user.address} >
            <div className="input-group-append">
              <button className="btn btn-outline-info" onClick={self.enableEditingAddress}>
                Edit
              </button>
            </div>
          </UserData>
        </div>
      );
    }

    if(this.state.loading) {
      this.userManager.getUser(function(success, data) {
          self.setState({loading: false, user: data, newAddress: data.address});
      });

      return (<h2>Fetching data, one moment please...</h2>);
    } else {
      if(this.state.editingAddress) {
        return editAddressField();
      } else {
        return editAddressView();
      }
    }
  }
}

class UserData extends Component {
  render() {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">{this.props.label}</span>
        </div>
        <input type="text" className="form-control" value={this.props.value} readOnly />
        {this.props.children}
      </div>
    );
  }
}

export default UserView;
