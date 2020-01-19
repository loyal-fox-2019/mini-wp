<template>
  <g-signin-button
    :params="params"
    @success="onSignInSuccess"
    @error="onSignInError"
  >Sign in with Google</g-signin-button>
</template>

<script>
import axios from "axios";
import GSignInButton from "vue-google-signin-button";
export default {
  name: "g-signin-button",
  props: ["params"],
  data() {
    return {
      params: params.param,
      googleSignInParams: {
        client_id:
          "885358018440-gprtot1dl0975m0ertfs9q5g8ghgpe93.apps.googleusercontent.com"
      },
      hai: "halo"
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("user signed in");
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    }
  }
};
</script>