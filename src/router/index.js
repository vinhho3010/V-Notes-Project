import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: '/',
      name: 'login',
      component: ()=>import('@/views/LoginForm.vue'),
      alias: "/login"
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('@/views/Home.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: ()=>import('@/views/SignUpForm.vue')
    },
  ]
})

export default router
