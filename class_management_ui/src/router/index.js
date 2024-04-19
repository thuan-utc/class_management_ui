import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'DashBoard',
      component: () => import('../components/Dashboard.vue')
    },
    {
      path: '/all-classroom',
      name: 'AllClassroom',
      component: () => import('../components/AllClassroom.vue')
    }
  ]
})

export default router
