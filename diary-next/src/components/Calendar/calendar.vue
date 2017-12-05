<template>
<div id="calendar">
    <nav-bar currentPage="calendar"></nav-bar>
    <div id="calendar-container">
      <div class="calendar-top">
        <div class="top-item selected-year">
          <i class="btn fa fa-caret-left fa-fw" @click.prevent="currentYear -= 1"></i>
          <span class="text">{{ currentYear + '年' }}</span>
          <i class="btn fa fa-caret-right fa-fw" @click="currentYear += 1"></i>
        </div>
        <div class="top-item selected-day">
          <span class="text">{{ currentDate + '日/周' + currentDay }}</span>
        </div>
        <div class="top-item selected-month">
          <i class="btn fa fa-caret-left fa-fw" @click="currentMonth -= 1"></i>
          <span class="text">{{ currentMonth + '月' }}</span>
          <i class="btn fa fa-caret-right fa-fw" @click="currentMonth += 1"></i>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import NavBar from '@/components/nav-bar.vue'

export default {
  name:'Calendar',
  data(){
    return {
      currentYear: '2017',
      currentMonth: '12',
      currentDate: '4',
      currentDay: '一',
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
  watch: {
    currentMonth: function(val){
      if(val<1){
        this.currentMonth = 12;
        this.currentYear -= 1;
      }else if(val>12){
        this.currentMonth = 1;
        this.currentYear += 1;        
      }
    },
    currentYear: function(val){
      let thisYear = new Date().getFullYear();
      if(val>thisYear){
        this.currentYear = thisYear;
      }
    },
  }
}
</script>

<style>
#calendar-container{
  width: calc(100% - 150px);
  transform: translateX(150px);
}
.calendar-top{
  width: 400px;
  height: 30px;
  margin: auto;
  margin-top: 50px;
  text-align: center;
  background-color: white;
  user-select: none;

}
.top-item{
  display: inline-block;
  margin: 0 15px;
  line-height: 30px;
  vertical-align: middle;
}
#calendar .btn{
  color: #3FAAF9;
  cursor: pointer;
}


</style>
