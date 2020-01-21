<template>
    <div class="row d-flex justify-content-center" id="signIn">
        <div class="col-3" id="signInCol">
            <input type="text" placeholder="Name" name="name" id="name" v-model="name">
            <small id="emailHelp" class="form-text text-muted">Required when register</small>
            <input type="text" placeholder="Email" name="email" id="email" v-model="email">
            <input type="password" placeholder="Password" name="password" id="password" v-model="password">
            <form action="" method="POST">
                <a href="" id="aLogin" v-on:click.prevent="login">Login</a>
            </form>
            <form action="" method="POST">
                <a href="" id="aRegister" v-on:click.prevent="register">Register</a>
            </form>
            <hr>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
        }
    },
    methods: {
        login: function() {
            axios({
                url: `http://localhost:3000/login`,
                method: 'post',
                data: {
                    email: this.email,
                    password: this.password
                },
            })
            .then(({data}) => {
                localStorage.setItem('token', data.token);
                this.$emit('afterLogin', true);
                this.$emit('email', this.email);
            })
            .catch(({response}) => {
                console.log(response);
            });
        },

    }

}
</script>

<style scoped>
#name, #email, #password {
    width: 100%;
    padding: 10px 20px;
    margin-top: 10px;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 10px;
}
#aLogin, #aRegister {
    border: none;
    outline: none;
    color: #fff;
    font-size: 15px;
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    display: block;
    text-align: center;
    text-decoration: none;
    top: 48px;
}
#aLogin {
    background: #ff9900;
    left: 370px;
}
#aRegister {
    left: 500px;
    background: #5900ff;
}

</style>