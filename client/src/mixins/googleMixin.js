import axios from 'axios';

export default {
  onSuccess(googleUser) {
    // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    const idToken = googleUser.getAuthResponse().id_token;
  },
  onFailure(error) {
    console.log(error);
  },
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 350,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  },
  signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
    });
  },
}