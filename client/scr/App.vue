<template>
<div>
    <signup
    v-if="signup"
    @signup="account($event)"
    v-bind:dt="used"
    >
    </signup>
    <login
    v-if="log"
    @signin="signin($event)"
    @regis="regis"
    @gg="ggle($event)"
    v-bind:data="faillog"
    >
    </login>
    <div v-if="login">
    <navbar 
    @find="find($event)" 
    @write="write" 
    @logout="signout"
    ></navbar>
        <b-row>
            <b-col md="2" id="profile">
                <profile 
                @srcTag="findTag($event)"
                v-bind:name="userName"
                ></profile>
            </b-col>
            <b-col md="10" id="contain">
                <b-row>
                    <b-col md="9">
                        <post v-if="form_post" 
                        @cancel="cancel" 
                        @send="send($event)"
                        class="animated zoomIn delay-.1s"
                        ></post>
                        <posted 
                        @even="elr($event)" 
                        v-for="(article, i) in fltr"
                        v-bind:userid="userId" 
                        v-bind:key="i" 
                        v-bind:data="article"
                        @del="del($event)"
                        @edit="edt($event)"
                        class="animated zoomIn delay-.1s"
                        ></posted>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>


</div>
</template>

<script>
import card from './assets/card.vue'
import navbar from './assets/navbar.vue'
import profile from './assets/profile.vue'
import form from './assets/form.vue'
import login from './assets/login.vue'
import signup from './assets/signup.vue'
import axios from 'axios'

export default {
    data(){
        return {
            message: 'hello world',
            articles: null,
            form_post: false,
            login: false,
            log: true,
            signup:false,
            wrd: '',
            tag: '',
            faillog: false,
            used: false,
            userName: '',
            userId: ''
        };
    },
    methods:{
        findTag:function(params){
            this.tag = params
        },
        find: function(params){
            this.wrd = params
        },
        write: function(){
            this.form_post = true
        },
        cancel: function(){
            this.form_post = false
        },
        send: function(params){
            axios({
                method: 'POST',
                url: 'http://35.240.217.140:3000/articles',
                data: params,
                headers:{token: localStorage.getItem('token')}
            })
            .then((data)=>{
                this.form_post = false
                let dta = data.data
                dta.author={
                    '_id': this.userId
                }
                this.articles.push(dta)
            })
        },
        del: function(params){
            axios({
                method: "DELETE",
                url: 'http://35.240.217.140:3000/articles/'+params,
                headers:{token: localStorage.getItem('token')}
            })
            .then((data)=>{
                this.articles = this.articles.filter(arc => arc['_id'] != params) 
            })
        },
        ggle: function(params){
            axios({
                method:"POST",
                url:"http://35.240.217.140:3000/users/googlesignin",
                data: params
            })
            .then((data)=>{
                localStorage.setItem('token', data.data.token)
                this.userName = localStorage.getItem('firstName') + ' '+ localStorage.getItem('lastName')
                this.log = false
                this.login = true
                this.signup = false
                this.getdat()
            })
        },
        signin: function(params){
            axios.post('http://35.240.217.140:3000/users/signin', {    
                password: params.password,
                email: params.email})
            .then((data)=>{ 
                localStorage.setItem('token', data.data.token)
                let name = data.data.user['first_name'] + ' '+ data.data.user['last_name']
                this.userName = name
                this.userId = data.data.user['_id']
                this.log = false
                this.login = true
                this.signup = false
                this.getdat()
            })
            .catch((err)=>{
                this.faillog = true
            })
        },
        regis: function(){
            this.signup = true
            this.log = false
        },
        account: function(params){
            axios.post('http://35.240.217.140:3000/users/signup', params)
            .then((data)=>{
                if(data.data === null){
                    this.used = true
                } else {
                    this.signin({password: params.password, email: params.email})
                }
            })
            .catch((err)=>{
                this.used = true
            })
        },
        getdat:function(){
            let arti = this
            axios({
                url:'http://35.240.217.140:3000/articles',
                headers:{token: localStorage.getItem('token')}
            })
            .then(function(data){
                arti.articles = data.data
            })
        },
        edt:function(params){
            let arcId = params.id
            delete params.id
            axios({
                url:'http://35.240.217.140:3000/articles/'+arcId,
                method: 'PUT',
                headers:{token: localStorage.getItem('token')},
                data: params
            })
            .then((data)=>{
                this.articles = this.articles.filter(el => el['_id'] != data.data["_id"])
                let dta = data.data
                dta.author={
                    '_id': this.userId
                }
                this.articles.push(dta)
            })
        },
        signout: function(){
            localStorage.clear()
            this.login = false
            this.log = true
            this.signup = false
        }
    },
    components:{
        posted : card,
        navbar: navbar,
        post: form,
        login: login,
        signup: signup,
        profile: profile,
    },
    created(){
       
    },
    computed:{
        fltr: function(){
            if(this.tag === null || this.tag === ''|| this.tag === undefined){
                let data  = this.articles
                if(this.wrd === '' || this.wrd === undefined || this.wrd === null){
                    return this.articles
                }else{
                    return data.filter(a => a.title.includes(this.wrd))
                }
            }
            return this.articles.filter(arc => arc.tag.some(tg => tg === this.tag))
        }
    }
};
</script>

<style>
#contain{
    background: #f5f0f0;
    min-height: 100vh
}

#profile{
    background: rgb(66, 63, 63);
}

</style>