<template>
  <section id='register'>
      <div class="hero-image"></div>
      
      <div class="register-wrapper">      
        <div class="form-wrapper">
          <img id="logo-img" src="/assets/images/logo.png" alt="" srcset="">
          <form action="" @submit.prevent="requestAjax(form)">
            
            <header class="text-center mb-4">
              <h4 class="header-font">- MIDIUM -</h4>
              <span><em>mini wordpress platform</em></span>
            </header>

            <div class="input-group mb-3" v-show="toggleForm">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="far fa-user"></i></div>
              </div>
              <input type="text" class="form-control" placeholder="Full Name">
            </div>
            
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="far fa-envelope"></i></div>
              </div>
              <input type="text" class="form-control" placeholder="Email">
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fas fa-lock"></i></div>
              </div>
              <input type="password" class="form-control" placeholder="Password">
            </div>

            <div class="form-group">
              <input class="btn btn-custom full-size" type="submit" :value="toggleButton">
              <div v-show="toggleForm" class="text-center mt-2 mb-2">Or</div>
              <button class="full-size" v-show="toggleForm">ceritanya google signin</button>
            </div>

            <div class="form-group text-center mt-4">
              <a href="" @click.prevent="changeForm(false)"  v-show="toggleForm">Already have an account?</a>
              <a href="" @click.prevent="changeForm(true)"  v-show="!toggleForm">Don't have an account yet?</a>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        toggleForm: true,
        toggleButton: 'Sign Up',
        form: 'register'
      }
    },
    methods: {
      changeForm(status) {
        this.toggleForm = status
        this.form = 'login'
        status ? this.toggleButton = 'Sign Up': this.toggleButton = 'Sign In'
      },
      requestAjax(a) {
        console.log(a)
      }
    }
  }
</script>

<style>
  #register {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hero-image {
    background-image: url('/assets/images/hero-image-2.jpg');
    position: fixed; 
    top: 0; 
    left: 0; 
    min-width: 100%;
    min-height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -100;
  }
  .form-wrapper {
    position: relative;
    width: 280px;
    padding: 2rem 2rem;
    background-color: #ffffff;
    border-top: 4px solid #0f0f0f;
    border-radius: 8px;
    box-shadow: 0px -2px 20px -8px rgba(0, 0, 0, 0.6);
  }
  /* .form-wrapper header h4 {
    font-family: 'Fugaz One', cursive;
  } */
  #logo-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    animation: bounce 4s infinite;
  }
  .full-size {
    width: 100%;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translate(-50%, -42%);
    }
    50% {
      transform: translate(-50%, -54%);
    }
  }
</style>