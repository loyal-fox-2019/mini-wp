var app = new Vue({
    el: '#app',
    data: {
        loginStatus: false,
        register: true,
        name:null,
        email: null,
        password: null,
        name
    },
    methods: {
        btnLoginRegister: function(){
            if(!this.register) {
                this.register = true
            }
            else{
                this.register = false    
            }
        },
        login : function (){
            axios.()
        }
    }
})