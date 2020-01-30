<template>
    <div>
        <form class="mt-3 container" v-on:submit.prevent="login">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h3 class="font-weight-light mb-3">Login</h3>
                            <div class="form-row">
                                <div v-if="error" class="col-12 alert alert-danger px-3">
                                    {{ error }}
                                </div>
                                <div class="col-sm-12 form-group">
                                    <label for="email">Email</label>
                                    <input type="email" v-model="email" class="form-control">
                                </div>
                                <div class="col-sm-12 form-group">
                                    <label for="password">password</label>
                                    <input type="password" v-model="password" class="form-control">
                                </div>
                                <!-- <button class="btn btn-primary" v-on:click="checkLogin">Login</button> -->
                                <div class="col-sm-12 form-group">
                                    <button type="submit" class="btn btn-primary">login</button>
                                    <a class="btn btn-outline-primary" href="#" v-on:click="showRegister">register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            error: null,
            email: "",
            password: ""
        }
    },
    methods:{
        login(){
             axios.post('http://localhost:3000/miniwp/member/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                const user= {
                    id: response.data.userId,
                    name: response.data.name
                }
                this.$emit('isLogin', true)
                this.$emit('userData', user)
            })
            .catch((error) => {
                console.log(error.response.data.message)
                this.error = error.response.data.message
                this.email = null
                this.password = null
            })
        },
        showRegister(){
            this.$emit('showRegister', true)
        }
    }
}
</script>