import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {name: 'MyAccount'}
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: {name: 'MyAccount'}
      },
      {
        path: 'account',
        name: 'MyAccount',
        component: () => import('@/views/MyAccount.vue')
      },
      {
        path: 'day',
        name: 'DayObjectives',
        component: () => import('@/views/DayObjectives.vue')
      },
      {
        path: 'plan',
        name: 'Plan',
        component: () => import('@/views/Plan.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
