import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';

import naive from 'naive-ui';

import App from './App.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('./pages/Home/Home.vue')
  // },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('./pages/Auth/Auth.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router).use(naive);

app.mount('#app');
