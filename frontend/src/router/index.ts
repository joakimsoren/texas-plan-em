import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '@/views/Overview.vue'
import Planning from '../views/Planning.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/overview' },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
  },
  {
    path: '/planning/:sessionId/:iterationId',
    name: 'Planning',
    component: Planning,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
