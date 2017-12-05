import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login.vue'
import Register from '@/components/register.vue'
import Diary from '@/components/Diary/diary.vue'
import Calendar from '@/components/Calendar/calendar.vue'
import Overview from '@/components/Overview/overview.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/login',
        name: 'Login',
        component: Login,
        alias: '/'
    }, {
        path: '/register',
        name: 'Register',
        component: Register,
    }, {
        path: '/diary',
        name: 'Diary',
        component: Diary
    }, {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar
    }, {
        path: '/overview',
        name: 'Overview',
        component: Overview
    }]
})