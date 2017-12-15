<template>
    <div id="nav-bar">
        <div class="title"><h3>日记</h3></div>
        <div class="user-info">
            <div class="avatar"><img :src="avatar" :alt="username"></div>
            <div class="username"><span>{{ username }}</span></div>
        </div>
        <div id="nav-list">
            <router-link to="/diary" class="nav-item" :class="{'current-page':currentPage=='diary'}">
                <i class="fa fa-book fa-fw"></i>
                <span class="text">diary</span>
            </router-link>            
            <router-link to="/calendar" class="nav-item" :class="{'current-page':currentPage=='calendar'}">
                <i class="fa fa-calendar fa-fw"></i>
                <span class="text">calendar</span>
            </router-link>            
            <router-link to="/overview" class="nav-item" :class="{'current-page':currentPage=='overview'}">
                <i class="fa fa-info fa-fw"></i>
                <span class="text">overview</span>
            </router-link>
        </div>
        <div class="nav-item logout" @click="logout">
            <i class="fa fa-sign-out fa-fw"></i>
            <span class="text">logout</span>
        </div>
    </div>
</template>

<script>
import Config from '../config/config.js'
export default {
    name:'NavBar',
    props:['currentPage'],
    data(){
        return {
            avatar:this.getAvatar(this.username),
        }
    },
    computed:{
        username:function(){
            return window.sessionStorage.getItem('username');
        },
    },
    methods:{
        getAvatar:function(username){
            let xhr = new XMLHttpRequest();
            xhr.open('post',Config.domain+'/userinfo',false);
            xhr.send('username='+username);
            let res = JSON.parse(xhr.responseText);
            if(res.statusCode == '200'){
                return res.avatar;
            }else{
                return './static/img/avatar-default.png';
            }
        },
        logout:function(){
            let xhr = new XMLHttpRequest();
            xhr.open('get',Config.domain+'/logout',false);
            xhr.send();
            if(JSON.parse(xhr.responseText).statusCode=='200'){
                window.sessionStorage.setItem('logged-in',false);
                window.sessionStorage.setItem('username','');
                window.sessionStorage.setItem('token','');
                this.$router.replace('/login');
            }
        },
    },
}
</script>

<style scoped>
#nav-bar{
    position:fixed;
    top: 0;
    width:150px;
    height:100%;
    background-color:#f0f0f0;
}
.title{
    text-align:center;
    margin:30px 0;
}
.user-info{
    text-align:center;
}
.avatar>img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin:15px 0;
}
.username{
    font-size:15px;
}
#nav-list{
    margin-top: 10px;
}
.nav-item{
    display:inline-block;
    line-height: 50px;
    width:100%;
    text-decoration: none;
    color:black;
    font-size:15px;
    padding-left:25px;
    box-sizing:border-box;
    cursor: pointer;
}
.nav-item:hover,
.current-page{
    background-color:#e1e1e1;
    color:#3FAAF9;
}
.logout{
    position: absolute;
    bottom:0;
}
</style>


