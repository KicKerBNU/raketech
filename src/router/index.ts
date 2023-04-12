import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import CharacterDetail from '../views/CharacterDetail.vue';
import HomeView from '@/views/HomeView.vue';
const routes: RouteRecordRaw[] = [
  // other routes
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/characters/:id',
    name: 'character-detail',
    component: CharacterDetail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router