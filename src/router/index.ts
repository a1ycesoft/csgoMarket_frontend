import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Index from '@/views/Index.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import SearchByName from '@/components/SearchByName.vue'
import Details from '@/components/Details.vue'
import SearchByCategory from '@/components/SearchByCategory.vue'
import Ranking from '@/components/Ranking.vue'
import Setting from '@/components/Setting.vue'
import Concern from '@/components/Concern.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/index/login' },
    {
      path: '/index', component: Index, children: [
        { path: 'login', component: Login },
        { path: 'register', component: Register },
      ]
    },
    {
      path: '/home', component: Home, children: [
        { path: 'ranking', component: Ranking },
        { path: 'searchbyname', component: SearchByName },
        { path: 'searchbycategory', component: SearchByCategory },
        { path: 'details/:id', component: Details },
        { path: 'setting', component: Setting },
        { path: 'concern', component: Concern },
      ]
    },


  ]
})

export default router
