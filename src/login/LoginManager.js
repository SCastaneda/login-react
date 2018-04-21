import Cookies from 'js-cookie';
import $ from 'jquery'

class LoginManager {

  static isLoggedIn() {
    return Cookies.get('token') !== null && Cookies.get('token') !== undefined;
  }

  static logout() {
    console.log("Logout called!")
    Cookies.remove('token');
    // TODO: navigate back to login page
  }

  static login(username, password, cb) {

    let requestBody = {
      "username": username,
      "password": password
    }

    let success = function(data) {
      Cookies.set('token', data.token, { expires: 1});
      cb(true);
    }

    let failure = function(error) {
      console.log(error.responseText);
      cb(false);
    }

    $.ajax({
      type: "POST",
      url: 'https://frontend-test.api.ksfmedia.fi/login',
      data: JSON.stringify(requestBody),
      success: success,
      error: failure,
      dataType: 'json',
      contentType: 'application/json'
    });
  }

}

export default LoginManager;
