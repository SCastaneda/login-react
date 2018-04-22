import LoginManager from '../login/LoginManager.js';
import $ from 'jquery';

class UserManager {

  constructor() {
    this.state = { user: undefined };
  }

  getUser(cb) {

    if(this.state.user !== undefined) {
      return cb(true, this.state.user);
    }
    let self = this;

    let success = function(data, cb) {
      self.state.user = data;
      cb(true, data);
    }

    let failure = function(error, cb) {
      console.error(error);
      if(error.status === 401) {
        LoginManager.logout();
        self.state.user = undefined;
      }
      cb(false, error);
    }

    let headers = { "Authorization": "Token " + LoginManager.getToken() }

    $.ajax({
      method: "GET",
      url: 'https://frontend-test.api.ksfmedia.fi/users/me',
      headers: headers,
      success: function(data) { success(data, cb); },
      error: function(error) { failure(error, cb); },
      dataType: 'json',
      contentType: 'application/json'
    });
  }

  updateAddress(address, cb) {

    let headers = { "Authorization": "Token " + LoginManager.getToken() }

    let self = this;
    let success = function(data, cb) {
      self.state.user = data;
      cb(true, data);
    }

    let failure = function(error, cb) {
      console.error(error);
      if(error.status === 401) {
        LoginManager.logout();
        this.state.user = undefined;
      }
      cb(false, error);
    }

    $.ajax({
      method: "PUT",
      url: `https://frontend-test.api.ksfmedia.fi/users/me/address?new-address=${address}`,
      headers: headers,
      success: function(data) { success(data, cb); },
      error: function(error) { failure(error, cb); },
      dataType: 'json',
    });
  }

}

export default UserManager;
