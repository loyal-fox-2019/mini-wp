<template>
  <div id="my-signin2"></div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      width: 350,
    }
  },
  methods: {
    onSuccess(googleUser) {
      const idToken = googleUser.getAuthResponse().id_token;
      axios({
        method: 'POST',
        url: `${this.$baseUrl}/user/oauth`,
        data: {
          idToken
        }
      })
        .then(({data}) => {
          localStorage.token = data.token;
          localStorage.name = data.name;
          this.$emit('authenticated',true);
        }).catch((err) => {
          console.log(err);
          // this.$swal('Error',err,'error');
        });
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
  },
  mounted() {
    this.renderButton();
  }
};
</script>

<style scoped>

</style>