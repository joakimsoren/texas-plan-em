import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '@/views/Overview.vue'
import NewPlayer from '@/views/NewPlayer.vue'
import Planning from '../views/Planning.vue'
import store from '@/store/index.ts'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/overview' },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview,
  },
  {
    path: '/planning/:sessionId/:iterationId/:name',
    name: 'Planning',
    component: Planning,
  },
  {
    path: '/newplayer/:sessionId/:iterationId',
    name: 'NewPlayer',
    component: NewPlayer,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (!to.path.includes('planning')) {
    next()
    return
  }
  const overviewName: string = store.state['overview'].name
  if (!overviewName || overviewName !== to.params['name']) {
    next({
      name: 'NewPlayer',
      params: {
        sessionId: to.params['sessionId'],
        iterationId: to.params['iterationId'],
      },
    })
    return
  }
  next()
})

export default router
