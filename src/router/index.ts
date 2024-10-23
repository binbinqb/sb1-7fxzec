import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/apps',
      name: 'Apps',
      component: () => import('../views/Apps.vue')
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('../views/Videos.vue')
    },
    {
      path: '/library',
      name: 'Library',
      component: () => import('../views/Library.vue')
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('../views/Help.vue')
    }
  ]
})

export default router