<template>
    <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        Sign in with Google
    </g-signin-button>
</template>
 
<script>
import axiosReq from "../../config/axiosReq";
export default {
  data () {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object} 
       */
      googleSignInParams: {
        client_id: '531177750068-9sq7maainmm2tsm70koodhldt17tt1v5.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile();
      // The ID token you need to pass to your backend:
      console.log(profile.getEmail());
      const email = profile.getEmail();
      
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
      
      axiosReq({
        url: "http://localhost:3000/api/gsignin",
        method: "POST",
        data: {
            username: email,
            id_token: id_token
        }
      })
      .then(({data}) => {
          this.$cookies.set('token',data.token);
          this.$cookies.set('username',email);
          this.$emit('isLogin');
      })
      .catch((err) => {
        console.log(err); 
      })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log(error)
    }
  }
}
</script> 
 
<style>
.g-signin-button {
    width: 100% !important;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
}

.g-signin-button:hover {
    background-color: #0046be;
    transition: 500ms;
}
</style> 