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
      <div class="calendar-content">
        <div class="calendar-week">
          <div class="calendar-item" v-for="week in range(0,7)" :key="week" :id="'calendar-week'+week">
            <div>{{ '星期' + parseDayOfWeek(week) }}</div>
          </div>
        </div>
        <div class="calendar-days">
          <div class="calendar-item" v-for="day in range(0,42)" :key="day">
            <div v-show="currentMonthDays[day]" 
                :class="{'selected':currentDate == currentMonthDays[day],'has-diary':hasDiary(day)}" 
                @click="currentDate=currentMonthDays[day]">{{ currentMonthDays[day] }}</div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import NavBar from '@/components/nav-bar.vue'
import Config from '../../config/config.js'

export default {
  name:'Calendar',
  data(){
    return {
      currentYear: '',
      currentMonth: '',
      currentDate: '',
      // currentDay: '',
      // 选中月份的日期
      currentMonthDays: [],
      calendarData: {},
    }
  },

  // 检查登录状态
  beforeCreate:function(){
    if(window.sessionStorage.getItem('logged-in')!='true'){
      this.$router.replace('/login');
    }
  },

  // 初始化
  created: function(){
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth()+1;
    this.currentDate = new Date().getDate();

    this.updateCurrentMonthDays();
  },
  components: {
    'nav-bar':NavBar,
  },
  watch: {
    currentMonth: function(val){
      let thisYear = new Date().getFullYear();
      if(val<1){
        this.currentMonth = 12;
        this.currentYear -= 1;
      }else if(val>12){
        if(this.currentYear == thisYear){
          this.currentMonth = 12;
          return;
        }
        this.currentMonth = 1;
        this.currentYear += 1;
      }
      this.updateCurrentMonthDays();
    },
    currentYear: function(val){
      let thisYear = new Date().getFullYear();
      if(val>thisYear){
        this.currentYear = thisYear;
      }
      this.updateCurrentMonthDays();      
    },
  },
  computed: {
    currentDay: function(){
      let date = new Date(this.currentYear, this.currentMonth-1, this.currentDate);
      return this.parseDayOfWeek(date.getDay());
    },
  },
  methods: {
    range: function(start, stop){
      let result = [];
      for(var i = start; i < stop; i++){
        result.push(i);
      }
      return result;
    },
    parseDayOfWeek: function(day){
      let dayOfWeek = '';
      switch(day){
        case 1:
          dayOfWeek = '一';
          break;
        case 2:
          dayOfWeek = '二';
          break;        
        case 3:
          dayOfWeek = '三';
          break;        
        case 4:
          dayOfWeek = '四';
          break;        
        case 5:
          dayOfWeek = '五';
          break;
        case 6:
          dayOfWeek = '六';
          break;
        case 0:
          dayOfWeek = '日';
          break;
      }
      return dayOfWeek;
    },
    updateCalendarData: function(){
      let xhr = new XMLHttpRequest();
      xhr.open('post', Config.domain+'/calendar',false);
      // token and date ...
      xhr.send();
      let res = JSON.parse(xhr.responseText).days;
      let data = {};
      res.forEach(day => {
        data[day.date] = day;
      });
      this.calendarData = data;

    },
    updateCurrentMonthDays: function(){
      // 当前月的第一天和最后一天
      let firstDay = new Date(this.currentYear, this.currentMonth-1, 1);
      let lastDay = new Date(this.currentYear, this.currentMonth, 0);
      // 月第一天星期数
      let dayOfWeek = firstDay.getDay();

      let days = new Array(42);
      let i = 1;
      while(i<=lastDay.getDate()){
        days[dayOfWeek++] = i++;
      }
      this.currentMonthDays = days;
      this.updateCalendarData(); 
    },
    hasDiary: function(day){
      try {
        if(this.calendarData[this.currentMonthDays[day]].diary!=0 )return true;
      } catch (error) {
        return false;
      }
    },
  },
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

.calendar-content{
  max-width: 700px;
  min-width: 500px;
  margin: 40px auto;
  background-color: white;
  padding: 50px;
  font-size: 13px;
}

.calendar-days,
.calendar-week{
  display: grid;
  grid-template-columns: repeat(7,1fr);
  grid-auto-rows: 50px;
  text-align: center;
}

.calendar-item{
  display: inline-block;
}
.calendar-item>div{
  display: inline-block;
  width: 2em;
  height: 2em;
  margin: calc((50px - 2em)/2);
  line-height: 2em;
  box-sizing: content-box;
}
.calendar-week>.calendar-item>div{
  width: 3em;
}
.calendar-days>.calendar-item>div{
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 15px;
}
.calendar-days>.calendar-item>div:hover{
  box-shadow: 0 0 0 2px #3FAAF9;
}
.selected{
  color: white;
  background-color: #3FAAF9 !important;
}
.has-diary{
  background-color: #e1e1e1;  
}
</style>
