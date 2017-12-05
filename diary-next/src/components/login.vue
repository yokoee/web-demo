<template>
    <div id="login">
        <div id="form-container">
            <h2>登录</h2>
            <div class="form-item">
                <div class="form-item-content">
                    <i class="fa fa-user fa-fw"></i>
                    <input type="text" placeholder="用户名" v-model="username" @keyup.enter="login" autofocus>
                </div>
                <div class="form-message">{{ userErrMsg }}</div>
            </div>
            <div class="form-item">
                <div class="form-item-content">
                    <i class="fa fa-lock fa-fw"></i>
                    <input type="password" placeholder="密码" v-model="password"  @keyup.enter="login">
                </div>
                <div class="form-message">{{ passwordErrMsg }}</div>
            </div>
            <div class="form-submit">
                <input type="submit" value="登录" :disabled="submitDisabled" @click.prevent="login">
            </div>
            <router-link class="register" to="/register">注册账号</router-link>
        </div>
    </div>
</template>

<script>
import Config from '../config/config.js'

export default {
    name:'Login',
    data(){
        return {
            username:'',
            password:'',

            userErr:true,
            passwordErr:true,
            userErrMsg:'',
            passwordErrMsg:'',

            submitDisabled:true,
        }
    },
    watch:{
        username:function(val){
            if(val.length<4){
                this.userErrMsg = '用户名不能小于4个字符';
                this.userErr = true;
            }else{
                this.userErrMsg = '';
                this.userErr = false;
            }
        },
        password:function(val){
            if(val.length<6){
                this.passwordErrMsg = '密码不能小于6个字符';
                this.passwordErr = true;
            }else{
                this.passwordErrMsg = '';
                this.passwordErr = false;
            }
        },
        inputValidated:function(val){
            if(val==true){
                this.submitDisabled = false;
            }
        }
    },
    computed:{
        inputValidated:function(){
            return !(this.userErr || this.passwordErr);
        },
    },
    methods:{
        login:function(){
            let username = this.username.replace(/\s/g,'');
            let password = this.password.replace(/\s/g,'');

            let xhr = new XMLHttpRequest();
            xhr.open('post',Config.domain+'/login',false);
            xhr.send('username='+username+'&password='+password);

            let res = JSON.parse(xhr.responseText);
            if(res.statusCode == '200'){
                window.sessionStorage.setItem('logged-in',true);
                window.sessionStorage.setItem('username',username);
                window.sessionStorage.setItem('token',res.token);
                this.$router.replace('/diary');
            }else if(res.statusCode == '401'){
                this.passwordErrMsg = '用户名或密码错误';
            }
            return true;
        },
    },
}
</script>

<style src="../assets/css/login-register.css"></style>

