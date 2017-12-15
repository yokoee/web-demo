<template>
<div id="diary">
    <nav-bar currentPage="diary"></nav-bar>
    <div id="diary-container">
      <div class="diary-top">
        <div class="diary-filter">
          <select name="diary-year" v-model="yearSelected">
            <option value="all">*</option>
            <option v-for="year in yearOption" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="diary-filter">
          <select name="diary-month" v-model="monSelected">
            <option value="all">*</option>
            <option v-for="mon in monthOption" :key="mon" :value="mon">{{ mon+' 月' }}</option>            
          </select>
          </div>
        <div class="btn btn-hide-diary" @click="hide"><i class="fa fa-eye fa-fw" :class="hideDiary ? 'fa-eye-slash' : 'fa-eye'"></i></div>
        <div class="btn btn-add-diary" @click="showAddDiary = !showAddDiary"><i class="fa fa-plus fa-fw"></i></div>
      </div>
      <transition-group tag="div" class="diary-list" name="diary-list">
        <div class="diary-item" v-if="showAddDiary" key="textarea" :style="addDiaryBorderLeft">
          <textarea class="diary-text" id="add-diary-textarea" v-model="newDiary" placeholder="添加新日记"></textarea>
          <div class="diary-footer">
            <span>mood: </span>
            <select v-model="newDiaryMood">
              <option value="happy">happy</option>
              <option value="calm">calm</option>
              <option value="sad">sad</option>
            </select>
            <i class="fa fa-check fa-fw btn-delete" @click="newDiarySubmit"></i>
          </div>
        </div>
        <div class="diary-item" v-for="item in diary.diaries" :key="item.id" :style="{'border-left':'5px solid ' + item.moodColor}">
          <div class="diary-text"  :class="{'hide-diary':hideDiary}">{{ item.text }}</div>
          <div class="diary-footer">
            <span class="diary-date">{{ parseDate(item.date) }}</span>
            <span class="diary-time">{{ parseTime(item.date) }}</span>
            <i class="fa fa-close fa-fw btn-delete" @click="deleteDiary(item)"></i>
          </div>
        </div>
      </transition-group>
    </div>
</div>
</template>
<script>
import NavBar from '@/components/nav-bar.vue'
import Config from '../../config/config.js'

export default {
  name:'Diary',
  data(){
    return {
      diary: this.getDiary(),

      yearSelected: 'all',
      monSelected: 'all',

      hideDiary: false,
      showAddDiary: false,
      newDiary: '',
      newDiaryMood: 'happy',
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
  watch:{
    yearSelected: function(val){ 
      this.diary = this.getDiary('year='+val+'&month='+this.monSelected);
    },
    monSelected: function(val){
      this.diary = this.getDiary('year='+this.yearSelected+'&month='+val);
    }
  },
  computed:{
    yearOption: function(){
      return this.diary.dates.years;
    },
    monthOption: function(){
      return this.diary.dates.months;
    },
    addDiaryBorderLeft: function(){
      let color= '';
        switch(this.newDiaryMood){
          case 'happy':
            color = '#11A5F7';
            break;
          case 'calm' :
            color = '#A3A9A0';
            break;
          case 'sad':
            color = '#DD2C00';
            break;
      }
      return {
        'border-left': '5px solid '+ color,
      }
    }
  },
  methods:{
    getDiary: function(param){
      let xhr = new XMLHttpRequest();

      let username = window.sessionStorage.getItem('username');
      let token = window.sessionStorage.getItem('token');
      xhr.open('post',Config.domin+'/diary',false);
      xhr.send(param+'&username='+username+'&token='+token);
      let res = JSON.parse(xhr.responseText);
      if(res.statusCode == '401'){
        this.$router.replace('/login');
      }else if(res.statusCode == '200'){
        return res;
      }
    },
    parseDate: function(val){
      let date = new Date(parseInt(val));
      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      if(month<10) month = '0'+month;
      if(day<10) day = '0'+day;
      return year+'/'+month+'/'+day;
    },
    parseTime: function(val){
      let date = new Date(parseInt(val));
      let hour = date.getHours();
      let min = date.getMinutes();
      if(hour<10) hour = '0'+hour;
      if(min<10) min = '0'+min;
      return hour+':'+min
    },
    hide: function(){
      this.hideDiary = !this.hideDiary;
    },
    deleteDiary: function(item){
      let xhr = new XMLHttpRequest();
      xhr.open('delete', Config.domin+'/diary/'+item.id);
      // token and others
      xhr.send();
      this.diary.diaries.splice(this.diary.diaries.indexOf(item), 1);
    },
    newDiarySubmit: function(){
      if(this.newDiary.length == 0){
        return;
      }
      let xhr = new XMLHttpRequest();
      xhr.open('post', Config.domain+'/diary/add', false);
      // token and new diary
      xhr.send('');
      alert('添加日记成功');
      this.newDiary = '';
      this.showAddDiary = false;
      // ...
    },

  },
}
</script>

<style>
#diary-container{
  width: calc(100% - 150px);
  transform: translateX(150px);
}
.diary-top{
  width: calc(100% - 100px);
  height: 40px;
  background-color: #f0f0f0;
  margin: 30px auto;
}
.diary-filter,
#diary .btn{
  display: inline-block;
  line-height: 40px;
}
.diary-filter>select{
  background-color: white;
  border: 0;
  outline: none;
  margin-left: 20px;
  vertical-align: middle;
}
#diary .btn{
  float: right;
  width: 40px;
  cursor: pointer;
  border-radius: 50%;
}
#diary .btn i{
  width: 40px;
}
#diary .btn:active{
  color: #3FAAF9;
  background-color: #e0e0e0;
}
.diary-list{
  width: 100%;
}
.diary-item{
  font-size: 15px;
  width: calc(100% - 201px);
  margin: auto;
  margin-bottom: 30px;
  background-color: white;
  border-left: 5px solid #f0f0f0;

}
#add-diary-textarea{
  border: 0;
  outline: none;
  width: 100%;
  height: 100px;
  resize: vertical;
  box-sizing: border-box;
}
.diary-item select{
  background-color: white;
  border: 0;
  outline: none;
  vertical-align: middle;
}
.diary-text{
  text-indent: 2em;
  padding: 20px;
}

.diary-footer{
  font-size: 12px;
  width: 100%;
  vertical-align: middle;
  padding-left: 20px;
  box-sizing: border-box;
}
.diary-time{
  margin-left: 5px;
}
.btn-delete{
  position: relative;
  float: right;
  margin-right: 10px;
  transition: transform 0.1s ease-out;
}
.btn-delete::after{
  content: '';
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: -10px;
  right: -10px;
  cursor: pointer;

}
/* .btn-delete:hover{
  transform: scale(2);
} */
.btn-delete:active{
  color: #F91538;
}

.hide-diary{
   /* color: transparent;
   text-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
   filter: blur(0.3em);
   user-select: none;
}
/* .hide-diary::selection{
  color: transparent;
  background-color: transparent;
} */

.diary-list-leave-to{
  transform: scale(0.1);
  opacity: 0;
}

.diary-list-leave-active{
  position: absolute;
  transition: all 0.5s;
}
.diary-list-move{
  transition: all 0.5s;
}
</style>
