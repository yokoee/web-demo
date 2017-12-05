<template>
  <div id="register">
      <div id="form-container">
          <h2>注册</h2>
          <div class="form-item">
              <div class="form-item-content">
                  <i class="fa fa-user fa-fw"></i>
                  <input type="text" placeholder="用户名" v-model="username" autofocus @keyup.enter="register">
              </div>
              <div class="form-message">{{ userErrMsg }}</div>
          </div>          
          <div class="form-item">
              <div class="form-item-content">
                  <i class="fa fa-lock fa-fw"></i>
                  <input type="password" placeholder="密码" v-model="password" @keyup.enter="register">
              </div>
              <div class="form-message">{{ passwordErrMsg }}</div>
          </div>          
          <div class="form-item">
              <div class="form-item-content">
                  <i class="fa fa-lock fa-fw"></i>
                  <input type="password" placeholder="确认密码" v-model="repassword" @keyup.enter="register">
              </div>
              <div class="form-message">{{ repasswordErrMsg }}</div>
          </div>
          <div class="form-submit">
              <input type="submit" value="注册" @click.prevent="register" :disabled="submitDisabled">
          </div>
          <router-link class="login" to="/login">登录</router-link>
      </div>
  </div>
</template>

<script>
import Config from '../config/config.js'

export default {
    name:'Register',
    data(){
        return {
            username:'',
            password:'',
            repassword:'',

            userErr:true,
            passwordErr:true,
            repasswordErr:true,

            userErrMsg:'',
            passwordErrMsg:'',
            repasswordErrMsg:'',

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
        repassword:function(val){
            if(val != this.password){
                this.repasswordErrMsg = '两次密码输入不一致';
                this.repasswordErr = true;
            }else{
                this.repasswordErrMsg = '';
                this.repasswordErr = false;
            }
        },
        inputValidated:function(val){
            if(val==true){
                this.submitDisabled = false;
            }
        },
    },
    computed:{
        inputValidated:function(){
            return !(this.userErr || this.passwordErr || this.repasswordErr);
        },
    },
    methods:{
        register:function(){
            let username = this.username.replace(/\s/g,'');
            let password = this.password.replace(/\s/g,'');
            let repassword = this.repassword.replace(/\s/g,'');

            let xhr = new XMLHttpRequest();
            xhr.open('post',Config.domain+'/register',false);
            xhr.send('username='+username+'&password='+password+'&repassword='+repassword);

            let res = JSON.parse(xhr.responseText);
            if(res.statusCode == '200'){
                alert('注册成功');
                this.$router.push('/login');
            }
            return true;
        },
    },
}
</script>

<style src="../assets/css/login-register.css"></style>

