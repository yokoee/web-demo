<template>
<div id="overview">
    <nav-bar currentPage="overview"></nav-bar>
    <div id="overview-container">
    </div>
</div>
</template>
<script>
import NavBar from '@/components/nav-bar.vue'

export default {
  name:'Overview',
  data(){
    return {

    }
  },
  beforeCreate:function(){
    if(window.sessionStorage.getItem('logged-in')!='true'){
      this.$router.replace('/login');
    }
  },
  components:{
    'nav-bar':NavBar,
  },
}
</script>

<style>

</style>
