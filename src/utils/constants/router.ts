import { useLocalStorage } from '@vueuse/core';
import { createRouter, createWebHistory } from 'vue-router';
import { LOCAL_STORAGE_KEYS } from '.';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home/Home.vue')
  },
  {
    path: '/city/:id',
    name: 'city',
    component: () => import('@/pages/City/City.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/Auth/Auth.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/Profile/Profile.vue')
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to) => {
  const token = useLocalStorage(LOCAL_STORAGE_KEYS.TOKEN, null);
  const isAuthenticated = token.value;

  if (isAuthenticated && to.name === 'auth') return { name: 'home' };
  if (!isAuthenticated && to.name !== 'auth') return { name: 'auth' };

  return true;
});
