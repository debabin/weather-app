import { createApp } from 'vue';

import naive from 'naive-ui';

import App from './App.vue';
import { router } from './utils/constants/router';

const app = createApp(App);
app.use(router).use(naive);

app.mount('#app');
