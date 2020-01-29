<template>
     <div>
        <div class="container mt-3">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h3 class="font-weight-light mb-3">Register</h3>
                            <div v-if="error" class="col-12 alert alert-danger px3">
                                {{ error }}
                            </div>
                            <form v-on:submit.prevent="createMember">
                                <section class="col-sm-12 form-group">
                                    <label class="form-control-label sr-only" for="displayName" >Name:</label>
                                    <input 
                                        class="form-control" 
                                        type="text"
                                        id="displayName"
                                        placeholder="Name"
                                        name="displayName"
                                        required
                                        v-model="name"
                                    >
                                </section>
                                <section class="col-sm-12 form-group">
                                    <label class="form-control-label sr-only" for="displayEmail">Email:</label>
                                    <input
                                        class="form-control" 
                                        type="email"
                                        id="displayEmail"
                                        placeholder="email"
                                        name="displayEmail"
                                        required
                                        v-model="email"
                                    >
                                </section>
                                <section class="col-sm-12 form-group">
                                    <label class="form-control-label sr-only" for="displayPassword">Password:</label>
                                    <input 
                                        class="form-control" 
                                        type="password"
                                        id="displayPassword"
                                        placeholder="password"
                                        name="displayPassword"
                                        required
                                        v-model="password"
                                    >
                                </section>
                                <section class="col-sm-12 form-group">
                                    <a class="btn btn-primary" >Register</a>
                                    <a class="btn btn-outline-primary" v-on:click="btnLoginRegister">back</a>
                                </section>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
</template>
<script>
export default {
    data(){
        return {
            name: null,
            email: null,
            password: null,
            error: null
        }
    },
    methods: {
        createMember(){
            axios.post('http://localhost:3000/miniwp/member/register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            .then(response => {
                this.register = false
                this.name = null
                this.email = null
                this.password = null
            })
            .catch(error => {
                this.error = error.response.data.message
            })
        }
    }
}
</script>