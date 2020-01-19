<template>
    <sui-form @submit.prevent="registration">
        <h1>Sign Up</h1>
        <p></p>
        <sui-form-field>
            <label>Full Name</label>
            <div class="ui left icon input">
                <input type="text"
                       placeholder="Full Name"
                       v-model="name"
                       minlength="5"
                       maxlength="30"
                       required>
                <i class="user icon"></i>
            </div>
            <sui-label pointing>
                5 - 30 character
            </sui-label>
        </sui-form-field>
        <sui-form-field>
            <label>Email</label>
            <div class="ui left icon input">
                <input type="email"
                       placeholder="Email"
                       v-model="email"
                       required>
                <i class="mail icon"></i>
            </div>
        </sui-form-field>
        <sui-form-field>
            <label>Password</label>
            <div class="ui left icon input">
                <input type="password"
                       placeholder="Password"
                       v-model="password"
                       minlength="8"
                       maxlength="30"
                       required>
                <i class="lock icon"></i>
            </div>
            <sui-label pointing>
                8 - 30 character
            </sui-label>
        </sui-form-field>
        <button type="submit" class="ui black labeled icon button">
            Sign Up
            <i class="user icon"></i>
        </button>
    </sui-form>
</template>

<script>
    import {instance} from "../../config/axiosConfig";

    export default {
        name: "registrationForm",
        data() {
            return {
                header: null,
                content: null,
                name: null,
                email: null,
                password: null,
                visible: false
            }
        },
        methods: {
            registration: function () {
                instance({
                    method: 'post',
                    url: '/authors',
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                }).then(({data}) => {
                    console.log(data);
                    this.$toast.success({
                        title: 'Success Sign Up',
                        message: data.message,
                        position: 'top left'
                    });
                    localStorage.token = data.token;
                    location.reload();
                }).catch(err => {
                    console.log(err);
                    this.$toast.error({
                        title: 'Error Sign Up',
                        message: err.response.data.message,
                        position: 'top left'
                    });
                });
            }
        }

    }
</script>

<style scoped>

</style>