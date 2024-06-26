import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import CharacterDetail from '../views/CharacterDetail.vue'
import HomeView from '@/views/HomeView.vue'
import CreateHeroView from '../views/CreateHeroView.vue'
import FavoriteView from '../views/FavoriteView.vue'
const routes: RouteRecordRaw[] = [
  // other routes
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create-hero',
    component: CreateHeroView
  },
  {
    path: '/characters/:id',
    name: 'character-detail',
    component: CharacterDetail,
    props: true
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoriteView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
